import socket
import json
import signal
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Date, Float, Boolean, DateTime, ForeignKey, select
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker

executando = True

HOST = '127.0.0.1'
PORTA = 65432

DATABASE_URL = "postgresql://username:password@localhost:5432/dbname"

engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
Base = declarative_base()

def criar_tabelas():
    Base.metadata.create_all(bind=engine)

class Usuario(Base):
    __tablename__ = "Usuario"
    codigo = Column(Integer, primary_key=True, index=True)
    Nome = Column(String(50), nullable=False)
    Nascimento = Column(Date, nullable=False)
    Sexo = Column(String(1), nullable=False)
    Latitude = Column(Float, nullable=True)
    Longitude = Column(Float, nullable=True)

class DadosColetadosDB(Base):
    __tablename__ = "DadosColetados"
    seq = Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer, ForeignKey("Usuario.codigo"), nullable=False)
    DataHora = Column(DateTime, default=datetime.now, nullable=False)
    Tipo = Column(Integer, nullable=False)
    Valor1 = Column(Float, nullable=False)
    Valor2 = Column(Float, nullable=True)
    EmCasa = Column(Boolean, default=False)

def interromper_servidor(sig, frame):
    global executando
    print(f"\n[Receptor: {datetime.now().strftime('%H:%M:%S')}] Servidor encerrado pelo usuário.")
    executando = False

class DadosColetados:
    def __init__(self, Valor1, codigo, EmCasa, DataHora, Tipo, seq, Valor2=None):
        self.Valor1 = Valor1
        self.codigo = codigo
        self.EmCasa = EmCasa
        self.DataHora = datetime.fromisoformat(DataHora)
        self.Tipo = Tipo
        self.seq = seq
        self.Valor2 = Valor2

def validar_dados(dado: DadosColetados):
    if dado.Tipo not in {1, 2, 3}:
        raise ValueError("Tipo inválido. Deve ser 1, 2 ou 3.")
    if dado.Tipo == 1:
        if not (0 <= dado.Valor1 <= 300):
            raise ValueError("Valor1 deve estar entre 0 e 300 para Tipo 1.")
        if dado.Valor2 is None or not (0 <= dado.Valor2 <= 300):
            raise ValueError("Valor2 deve estar entre 0 e 300 para Tipo 1.")
    elif dado.Tipo == 2:
        if not (0 <= dado.Valor1 <= 100):
            raise ValueError("Valor1 deve estar entre 0 e 100 para Tipo 2.")
        if dado.Valor2 is None or not (0 <= dado.Valor2 <= 200):
            raise ValueError("Valor2 deve estar entre 0 e 200 para Tipo 2.")
    elif dado.Tipo == 3:
        if not (30 <= dado.Valor1 <= 45):
            raise ValueError("Valor1 deve estar entre 30 e 45 para Tipo 3.")
        if dado.Valor2 is not None:
            raise ValueError("Valor2 deve ser None para Tipo 3.")
    if dado.EmCasa is None:
        raise ValueError("O campo EmCasa não pode ser None.")

def usuario_existe(session, codigo):
    stmt = select(Usuario).where(Usuario.codigo == codigo)
    return session.scalar(stmt) is not None

def inserir_dado(dado: DadosColetados, session):
    if not usuario_existe(session, dado.codigo):
        raise ValueError(f"Usuário com código {dado.codigo} não existe.")
    dado_db = DadosColetadosDB(
        Valor1=dado.Valor1,
        codigo=dado.codigo,
        EmCasa=dado.EmCasa,
        DataHora=dado.DataHora,
        Tipo=dado.Tipo,
        seq=dado.seq,
        Valor2=dado.Valor2
    )
    session.add(dado_db)
    session.commit()

def processar_dados(json_data):
    try:
        dado = DadosColetados(**json_data)
        validar_dados(dado)
        with Session() as session:
            inserir_dado(dado, session)
        print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Dado inserido com sucesso no banco: {json_data}")
    except (ValueError, KeyError, TypeError) as e:
        print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Erro ao validar/inserir os dados: {e}")
    except Exception as e:
        print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Erro inesperado: {e}")

def iniciar_servidor(host=HOST, port=PORTA):
    global executando
    servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    servidor.bind((host, port))
    servidor.listen()
    print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Servidor iniciado em {host}:{port}")

    try:
        while executando:
            try:
                servidor.settimeout(1)
                conn, addr = servidor.accept()
                print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Conexão estabelecida com {addr}")
                with conn:
                    while executando:
                        data = conn.recv(1024)
                        if not data:
                            break
                        try:
                            json_data = json.loads(data.decode())
                            processar_dados(json_data)
                        except json.JSONDecodeError:
                            print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Dados recebidos não estão no formato JSON.")
            except socket.timeout:
                continue
            except ConnectionResetError:
                print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Conexão encerrada abruptamente.")
    finally:
        servidor.close()
        print(f"[Receptor: {datetime.now().strftime('%H:%M:%S')}] Servidor encerrado.")

if __name__ == "__main__":
    criar_tabelas()
    signal.signal(signal.SIGINT, interromper_servidor)
    iniciar_servidor()