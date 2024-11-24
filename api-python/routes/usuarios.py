from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services.usuarios_service import (
    create_usuario_service,
    get_usuarios_service,
    get_usuario_service,
    update_usuario_service,
    deletar_usuario
)
from schemas.usuario_schema import Usuario, UsuarioAddUpdate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def obter_usuarios(db: Session = Depends(get_db)):
    return get_usuarios_service(db)

@router.get("/{codigo}")
async def obter_usuario_por_seq(codigo: int, db: Session = Depends(get_db)):
    try:
        return get_usuario_service(db, codigo)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/")
async def criar_usuario(dado: UsuarioAddUpdate, db: Session = Depends(get_db)):
    try:
        return create_usuario_service(db, dado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{codigo}")
async def atualizar_usuario(codigo: int, dado_atualizado: UsuarioAddUpdate, db: Session = Depends(get_db)):
    try:
        return update_usuario_service(db, codigo, dado_atualizado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{codigo}")
async def excluir_usuario(codigo: int, db: Session = Depends(get_db)):
    try:
        usuario = deletar_usuario(db, codigo)
        if not usuario:
            raise HTTPException(status_code=404, detail="Usuário não encontrado para deletar")
        return usuario
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))