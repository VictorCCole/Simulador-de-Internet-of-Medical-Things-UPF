from sqlalchemy.orm import Session
from models.dados_coletados_model import DadosColetados
from schemas.dados_coletados_schema import DadosColetadosUpdate
from repositories.dados_coletados_repository import (
    obter_todos_dados,
    obter_dado_por_seq,
    criar_dado,
    atualizar_dado,
    deletar_dado,
    usuario_existe  
)

def validar_dados(dado: DadosColetados):
    if dado.Tipo not in {1, 2, 3}:
        raise ValueError("Tipo inválido. Deve ser 1, 2 ou 3.")

    if dado.Tipo == 1:
        if not (0 <= dado.Valor1 <= 300):
            raise ValueError("Valor1 deve estar entre 0 e 300 para Tipo 1.")
        if not (0 <= dado.Valor2 <= 300):
            raise ValueError("Valor2 deve estar entre 0 e 300 para Tipo 1.")
    elif dado.Tipo == 2:
        if not (0 <= dado.Valor1 <= 100):
            raise ValueError("Valor1 deve estar entre 0 e 100 para Tipo 2.")
        if not (0 <= dado.Valor2 <= 200):
            raise ValueError("Valor2 deve estar entre 0 e 200 para Tipo 2.")
    elif dado.Tipo == 3:
        if not (30 <= dado.Valor1 <= 45):
            raise ValueError("Valor1 deve estar entre 30 e 45 para Tipo 3.")
        if dado.Valor2 is not None:
            raise ValueError("Valor2 deve ser None para Tipo 3.")

    if dado.EmCasa is None:
        raise ValueError("O campo EmCasa não pode ser None.")

def obter_todos_dados_service(db: Session):
    return obter_todos_dados(db)

def obter_dado_por_seq_service(db: Session, seq: int):
    dado = obter_dado_por_seq(db, seq)
    if not dado:
        raise ValueError("Dado não encontrado")
    return dado

def criar_dado_service(db: Session, dado: DadosColetados):
    if not usuario_existe(db, dado.codigo):
        raise ValueError("Usuário não encontrado para o código fornecido.")
    validar_dados(dado)
    return criar_dado(db, dado)

def atualizar_dado_service(db: Session, seq: int, dado_atualizado: DadosColetadosUpdate):
    dado_existente = obter_dado_por_seq(db, seq)
    if not dado_existente:
        raise ValueError("Dado não encontrado para atualizar")

    dado_atualizado_dict = dado_atualizado.model_dump(exclude_unset=True)
    if not dado_atualizado_dict:
        raise ValueError("Nenhum campo válido enviado para atualização")
    
    dado_temp = DadosColetados(
        Tipo=dado_atualizado_dict.get("Tipo", dado_existente.Tipo),
        Valor1=dado_atualizado_dict.get("Valor1", dado_existente.Valor1),
        Valor2=dado_atualizado_dict.get("Valor2", dado_existente.Valor2),
        EmCasa=dado_atualizado_dict.get("EmCasa", dado_existente.EmCasa),
        codigo=dado_existente.codigo,
        DataHora=dado_existente.DataHora,
    )

    validar_dados(dado_temp)

    return atualizar_dado(db, seq, dado_atualizado)

def deletar_dado_service(db: Session, seq: int):
    dado = deletar_dado(db, seq)
    if not dado:
        raise ValueError("Dado não encontrado para deletar")
    return dado
