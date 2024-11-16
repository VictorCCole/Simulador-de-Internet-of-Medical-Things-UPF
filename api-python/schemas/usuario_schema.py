from sqlalchemy import Column, Integer, String, Date, Float
from db.database import Base
from pydantic import BaseModel
from datetime import date

class UsuarioDB(Base):
    __tablename__ = "Usuario"

    codigo = Column(Integer, primary_key=True, index=True)
    Nome = Column(String(50), nullable=False)
    Nascimento = Column(Date, nullable=False)
    Sexo = Column(String(1), nullable=False)
    Latitude = Column(Float, nullable=True)
    Longitude = Column(Float, nullable=True)

class Usuario(BaseModel):
    codigo: int
    Nome: str
    Nascimento: date
    Sexo: str
    Latitude: float = None
    Longitude: float = None

    class Config:
        from_attributes = True
