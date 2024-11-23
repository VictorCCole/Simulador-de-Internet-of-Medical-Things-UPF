from sqlalchemy.orm import Session
from models.usuario_model import UsuarioDB
from schemas.usuario_schema import Usuario
from models.dadoscoletados_model import DadosColetados

def obter_usuarios(db: Session):
    return db.query(UsuarioDB).all()

def obter_usuario_por_seq(db: Session, codigo: int):
    return db.query(UsuarioDB).filter(UsuarioDB.codigo == codigo).first()

def criar_usuario(db: Session, dados: Usuario):
    novo_dado = UsuarioDB(**dados.model_dump())
    db.add(novo_dado)
    db.commit()
    db.refresh(novo_dado)
    return novo_dado

def atualizar_usuario(db: Session, codigo: int, dados_atualizados: Usuario):
    dado = db.query(UsuarioDB).filter(UsuarioDB.codigo == codigo).first()
    if not dado:
        return None

    for key, value in dados_atualizados.model_dump(exclude_unset=True).items():
        setattr(dado, key, value)

    db.commit()
    db.refresh(dado)
    return dado

from sqlalchemy.orm import Session
from app.models.user_model import Usuario
from app.models.dadoscoletados_model import DadosColetados

def deletar_usuario_e_dados(db: Session, codigo: int):
    usuario = db.query(Usuario).filter(Usuario.codigo == codigo).first()        
    if not usuario:
        return None
    dados = db.query(DadosColetadosDB).filter(DadosColetadosDB.codigo == codigo).all()     
    if dados:
        db.query(DadosColetadosDB).filter(DadosColetadosDB.codigo == codigo).delete()
    db.delete(usuario)
    db.commit()
    return usuario   
