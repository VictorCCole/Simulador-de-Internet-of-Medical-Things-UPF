from sqlalchemy.orm import Session
from models.usuario_model import UsuarioDB
from schemas.usuario_schema import Usuario
from repositories.usuarios_repository.py import (
    obter_usuarios,
    obter_usuario_por_seq,
    criar_usuario,
    atualizar_usuario,
    deletar_usuario
)

def create_usuario_service(db: Session, dados: Usuario):
    return criar_usuario(db, dados)

def get_usuarios_service(db: Session):
    return obter_usuarios(db)

def get_usuario_service(db: Session, usuario_id: int):
    return obter_usuario_por_seq(db, usuario_id)

def update_usuario_service(db: Session, usuario_id: int, dados: Usuario):
    return atualizar_usuario(db, usuario_id, dados)

def delete_usuario_service(db: Session, usuario_id: int):
    return deletar_usuario(db, usuario_id)
