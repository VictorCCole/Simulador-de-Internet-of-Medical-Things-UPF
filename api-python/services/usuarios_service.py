from sqlalchemy.orm import Session
from models.usuario_model import Usuario
from schemas.usuario_schema import Usuario
from repositories.usuarios_repository.py import (
    obter_usuarios,
    obter_usuario_por_seq,
    criar_usuario,
    atualizar_usuario,
    deletar_usuario
)

def create_usuario_service(db: Session):
    return criar_usuario(db)

def get_usuarios_service(db: Session, skip: int, limit: int):
    return obter_usuarios(db, skip, limit)

def get_usuario_service(db: Session, usuario_id: int):
    return obter_usuario_por_seq(db, usuario_id)

def update_usuario_service(db: Session, usuario_id: int):
    return atualizar_usuario(db, usuario_id)

def delete_usuario_service(db: Session, usuario_id: int):
    return deletar_usuario(db, usuario_id)
