from sqlalchemy import Column, Integer, String, Date, Float
from db.database import Base

class UsuarioDB(Base):
    __tablename__ = "Usuario"

    codigo = Column(Integer, primary_key=True, index=True)
    Nome = Column(String(50), nullable=False)
    Nascimento = Column(Date, nullable=False)
    Sexo = Column(String(1), nullable=False)  # 'M' ou 'F'
    Latitude = Column(Float, nullable=True)
    Longitude = Column(Float, nullable=True)
