from fastapi import FastAPI
from routes.dados_coletados import router as dados_coletados_router
from db.database import criar_tabelas

criar_tabelas()

app = FastAPI()

app.include_router(dados_coletados_router, prefix="/dadosColetados")