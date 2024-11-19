from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.database import SessionLocal
from services.dados_coletados_service import (
    obter_todos_dados_service,
    obter_dado_por_seq_service,
    criar_dado_service,
    atualizar_dado_service,
    deletar_dado_service
)
from models.dados_coletados_model import DadosColetados
from schemas.dados_coletados_schema import DadosColetadosUpdate

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
async def obter_todos_dados(db: Session = Depends(get_db)):
    return obter_todos_dados_service(db)

@router.get("/{seq}")
async def obter_dado_por_seq(seq: int, db: Session = Depends(get_db)):
    try:
        return obter_dado_por_seq_service(db, seq)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.post("/")
async def criar_dado(dado: DadosColetados, db: Session = Depends(get_db)):
    try:
        return criar_dado_service(db, dado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{seq}")
async def atualizar_dado(seq: int, dado_atualizado: DadosColetadosUpdate, db: Session = Depends(get_db)):
    try:
        return atualizar_dado_service(db, seq, dado_atualizado)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{seq}")
async def deletar_dado(seq: int, db: Session = Depends(get_db)):
    try:
        return deletar_dado_service(db, seq)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
