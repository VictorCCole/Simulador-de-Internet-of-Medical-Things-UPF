from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services.usuarios_service import (
    create_usuario_service,
    get_usuarios_service,
    get_usuario_service,
    update_usuario_service,
    delete_usuario_service
)
from models.usuario_model import Usuario
from schemas.usuario_schema import Usuario

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

@router.get("/{seq}")
async def obter_usuario_por_seq(seq: int, db: Session = Depends(get_db)):
    try:
        return get_usuario_service(db, seq)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/")
async def criar_usuario(dado: Usuario, db: Session = Depends(get_db)):
    try:
        return create_usuario_service(db, dado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{seq}")
async def atualizar_usuario(seq: int, dado_atualizado: Usuario, db: Session = Depends(get_db)):
    try:
        return update_usuario_service(db, seq, dado_atualizado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{seq}")
async def deletar_usuario(seq: int, db: Session = Depends(get_db)):
    try:
        return delete_usuario_service(db, seq)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
