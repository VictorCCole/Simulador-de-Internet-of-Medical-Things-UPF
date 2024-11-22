from fastapi import FastAPI
from routes.dados_coletados import router as dados_coletados_router
from db.database import criar_tabelas
from starlette.middleware.cors import CORSMiddleware

criar_tabelas()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dados_coletados_router, prefix="/dadosColetados")
