from sqlalchemy.orm import Session
from models.dados_coletados_model import DadosColetadosDB
from schemas.dados_coletados_schema import DadosColetados
from schemas.dados_coletados_schema import DadosColetadosUpdate
from models.usuario_model import UsuarioDB

def dadoColetado_existe(db: Session, seq: int):
    return db.query(DadosColetadosDB).filter(DadosColetadosDB.seq == seq).first() is not None

def usuario_existe(db: Session, codigo: int):
    return db.query(UsuarioDB).filter(UsuarioDB.codigo == codigo).first() is not None

def obter_todos_dados(db: Session):
    return db.query(DadosColetadosDB).all()

def obter_dado_por_seq(db: Session, seq: int):
    return db.query(DadosColetadosDB).filter(DadosColetadosDB.seq == seq).first()

def criar_dado(db: Session, dados: DadosColetados):
    novo_dado = DadosColetadosDB(**dados.model_dump())
    db.add(novo_dado)
    db.commit()
    db.refresh(novo_dado)
    return novo_dado

def atualizar_dado(db: Session, seq: int, dados_atualizados: DadosColetadosUpdate):
    dado = db.query(DadosColetadosDB).filter(DadosColetadosDB.seq == seq).first()
    if not dado:
        return None

    for key, value in dados_atualizados.model_dump(exclude_unset=True).items():
        setattr(dado, key, value)

    db.commit()
    db.refresh(dado)
    return dado

def deletar_dado(db: Session, seq: int):
    dado = obter_dado_por_seq(db, seq)
    if not dado:
        return None
    db.delete(dado)
    db.commit()
    return dado
