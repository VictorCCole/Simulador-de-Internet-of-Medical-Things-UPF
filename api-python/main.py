from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.dados_coletados import router as dados_coletados_router
from db.database import criar_tabelas

criar_tabelas()

app = FastAPI()

app.include_router(dados_coletados_router, prefix="/dadosColetados")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
