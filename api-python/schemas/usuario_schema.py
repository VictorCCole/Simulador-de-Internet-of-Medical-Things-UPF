from pydantic import BaseModel
from datetime import date

class Usuario(BaseModel):
    codigo: int
    Nome: str
    Nascimento: date
    Sexo: str
    Latitude: float = None
    Longitude: float = None

    class Config:
        from_attributes = True
