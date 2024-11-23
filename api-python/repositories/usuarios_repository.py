from sqlalchemy.orm import Session
from models.usuario_model import UsuarioDB
from schemas.usuario_schema import Usuario
from schemas.usuario_schema import UsuarioDB


def obter_usuarios(db: Session):
    return db.query(UsuarioDB).all()

def obter_usuario_por_seq(db: Session, seq: int):
    return db.query(UsuarioDB).filter(UsuarioDB.seq == seq).first()

def criar_usuario(db: Session, dados: Usuario):
    novo_dado = UsuarioDB(**dados.model_dump())
    db.add(novo_dado)
    db.commit()
    db.refresh(novo_dado)
    return novo_dado

def atualizar_usuario(db: Session, seq: int, dados_atualizados: Usuario):
    dado = db.query(UsuarioDB).filter(UsuarioDB.seq == seq).first()
    if not dado:
        return None

    for key, value in dados_atualizados.model_dump(exclude_unset=True).items():
        setattr(dado, key, value)

    db.commit()
    db.refresh(dado)
    return dado

def deletar_usuario(db: Session, seq: int):
    dado = obter_usuario_por_seq(db, seq)
    if not dado:
        return None
    db.delete(dado)
    db.commit()
    return dado
