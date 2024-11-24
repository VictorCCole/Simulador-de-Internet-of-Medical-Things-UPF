from pydantic import BaseModel
from datetime import date
from typing import Optional

class Usuario(BaseModel):
    codigo: int
    Nome: str
    Nascimento: date
    Sexo: str
    Latitude: float = None
    Longitude: float = None

    class Config:
        from_attributes = True

class UsuarioAddUpdate(BaseModel):
    Nome: str
    Nascimento: date
    Sexo: str
    Latitude: float = None
    Longitude: float = None
    class Config:
        orm_mode = True