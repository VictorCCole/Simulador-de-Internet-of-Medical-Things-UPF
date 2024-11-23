# Servidor TCP/IP em Python

As tabelas serão criadas automaticamente pelo servidor, caso não existam.
Implementação de um servidor/receptor em Python que utiliza o protocolo TCP/IP para comunicação. 

## Pré-requisitos

Antes de executar o servidor, é necessário instalar a biblioteca **SQLAlchemy**. Para isso, execute o seguinte comando:

```bash
pip install sqlalchemy
```

## Configuração

O servidor utiliza duas variáveis para determinar o **host** e a **porta**:

- **HOST**: O endereço IP do servidor (por padrão, está configurado como `'127.0.0.1'` para rodar localmente).
- **PORTA**: O número da porta para a comunicação (por padrão, está configurada como `65432`).

Você pode modificar essas variáveis diretamente no código do servidor conforme necessário:

```python
HOST = '127.0.0.1'  # Endereço IP do servidor
PORTA = 65432       # Número da porta
```

## Executar

1. Acesse o diretório do projeto:
   ```bash
   cd nome_do_diretorio
   ```

2. Execute o servidor Python:
   ```bash
   python servidor.py
   ```

   Após iniciar o servidor, ele começará a escutar na porta configurada e ficará aguardando conexões dos cliente(s)/simulador(es).

## Interrompendo o Servidor

Para interromper o servidor enquanto ele está em execução, basta pressionar **CTRL + C** no terminal onde o servidor está rodando. 
Isso interromperá a execução do servidor de forma segura.

---

### Configuração do Banco de Dados

No arquivo `servidor.py`, você encontrará a variável `DATABASE_URL` com o seguinte valor:

```python
DATABASE_URL = "postgresql://username:password@localhost:5432/dbname"
```

Para usar a API em produção ou em outro ambiente, você precisa modificar essa variável com as credenciais corretas do seu banco de dados. Altere `username`, `password`, `localhost`, `5432` (porta) e `dbname` (nome do banco de dados) para os valores adequados ao seu ambiente.

Exemplo de configuração para banco de dados em nuvem:

```python
DATABASE_URL = "postgresql://myuser:mypassword@mydbhost:5432/mydatabase"
```

Adicione o parâmetro `?sslmode=require` à URL se o banco exigir conexões seguras (caso em Nuvem):

```python
DATABASE_URL = "postgresql://username:password@db-instance-endpoint:5432/dbname?sslmode=require"
```

Se usarmos variáveis de ambiente em vez de codificar diretamente:

```python
import os

DATABASE_URL = os.getenv("DATABASE_URL")
```

---
