from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DadosColetados(BaseModel):
    codigo: int
    DataHora: datetime
    Tipo: int
    Valor1: float
    Valor2: Optional[float] = None
    EmCasa: Optional[bool] = False

    class Config:
        from_attributes = True

class DadosColetadosUpdate(BaseModel):
    Tipo: Optional[int]
    Valor1: Optional[float]
    Valor2: Optional[float]
    EmCasa: Optional[bool]

    class Config:
        orm_mode = True
