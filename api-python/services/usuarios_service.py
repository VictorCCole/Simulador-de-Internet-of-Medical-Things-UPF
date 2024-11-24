from sqlalchemy.orm import Session
from models.usuario_model import UsuarioDB
from schemas.usuario_schema import Usuario, UsuarioAddUpdate
from repositories.usuarios_repository import (
    obter_usuarios,
    obter_usuario_por_seq,
    criar_usuario,
    atualizar_usuario,
    deletar_usuario_e_dados
)

def create_usuario_service(db: Session, dados: Usuario):
    return criar_usuario(db, dados)

def get_usuarios_service(db: Session):
    return obter_usuarios(db)

def get_usuario_service(db: Session, usuario_id: int):
    usuario = obter_usuario_por_seq(db, usuario_id)
    if not usuario:
        raise ValueError("Usuário não encontrado")
    return usuario

def update_usuario_service(db: Session, usuario_id: int, usuario: UsuarioAddUpdate):
    usuario_existente = obter_usuario_por_seq(db, usuario_id)
    if not usuario_existente:
        raise ValueError("Usuário não encontrado para atualizar")
        
    return atualizar_usuario(db, usuario_id, usuario)

def deletar_usuario(db: Session, usuario_id: int):
    usuario = deletar_usuario_e_dados(db, usuario_id)
    if not usuario:
        raise ValueError("Usuário não encontrado para deletar")
    return usuario
