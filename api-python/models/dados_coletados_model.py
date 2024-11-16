from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from sqlalchemy import Column, Integer, Float, DateTime, Boolean, ForeignKey
from db.database import Base

class DadosColetadosDB(Base):
    __tablename__ = "DadosColetados"

    seq = Column(Integer, primary_key=True, index=True)
    codigo = Column(Integer, ForeignKey("Usuario.codigo"), nullable=False)
    DataHora = Column(DateTime, default=datetime.now, nullable=False)
    Tipo = Column(Integer, nullable=False)
    Valor1 = Column(Float, nullable=False)
    Valor2 = Column(Float, nullable=True)
    EmCasa = Column(Boolean, default=False)

class DadosColetados(BaseModel):
    codigo: int
    DataHora: datetime
    Tipo: int
    Valor1: float
    Valor2: Optional[float] = None
    EmCasa: Optional[bool] = False

    class Config:
        orm_mode = True
