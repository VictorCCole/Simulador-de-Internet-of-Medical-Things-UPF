# API

As tabelas são criadas automaticamente pela API.

Antes de executar, é necessário instalar a biblioteca **FastAPI**. Para isso, execute o seguinte comando:

```bash
pip install "fastapi[all]"
```

Pode ser necessário instalar a biblioteca SQLAlchemy caso ela não venha por padrão:

```bash
pip install sqlalchemy
```

Para rodar a API use:

```Bash
uvicorn main:app --reload
```

## Usuarios

Esta API fornece acesso a informações sobre usuários cadastrados, permitindo operações de **GET**, **POST**, **PUT** e **DELETE**. Abaixo estão as instruções detalhadas sobre como usar os diferentes endpoints disponíveis para interagir com os usuários.

### Endpoints

A base URL da API em fase de teste é:  
`http://127.0.0.1:8000/usuarios/`  
IDs fornecidos devem ser do tipo inteiro.

#### 1. **GET /usuarios/**

Este endpoint retorna todos os usuários cadastrados.

**Exemplo de resposta bem-sucedida (200):**
```json
[
    {
        "Nome": "João da Silva Quinto",
        "Nascimento": "2000-05-15",
        "codigo": 5,
        "Latitude": -11.685,
        "Sexo": "M",
        "Longitude": -11.803
    },
    {
        "Nome": "João da Silva Qceiro",
        "Nascimento": "1990-05-15",
        "codigo": 4,
        "Latitude": -11.685,
        "Sexo": "M",
        "Longitude": -11.803
    },
    {
        "Nome": "João da Silva 4",
        "Nascimento": "1990-05-15",
        "codigo": 6,
        "Latitude": -29.685,
        "Sexo": "M",
        "Longitude": -53.803
    }
]
```

Caso não haja usuários cadastrados, a resposta será:
```json
200 []
```

#### 2. **GET /usuarios/{id}**

Este endpoint retorna um único usuário com base no ID fornecido.

**Exemplo de resposta bem-sucedida (200):**
```json
{
    "Nome": "João da Silva Qceiro",
    "Nascimento": "1990-05-15",
    "codigo": 4,
    "Latitude": -11.685,
    "Sexo": "M",
    "Longitude": -11.803
}
```

**Caso o usuário não seja encontrado, a resposta será:**
```json
{
    "detail": "Usuário não encontrado"
}
```
Resposta com código de status **404**.

#### 3. **DELETE /usuarios/{id}**

Este endpoint permite deletar um usuário com base no ID fornecido.

**Exemplo de resposta bem-sucedida (200) após deletar um usuário:**
```json
{
    "Nome": "João da Silva Qceiro",
    "Nascimento": "1990-05-15",
    "codigo": 6,
    "Latitude": -11.685,
    "Sexo": "M",
    "Longitude": -11.803
}
```

**Caso o usuário não seja encontrado para deletar, a resposta será:**
```json
{
    "detail": "Usuário não encontrado para deletar"
}
```
Resposta com código de status **404**.

#### 4. **PUT /usuarios/{id}**

Este endpoint permite atualizar um usuário com base no ID fornecido. Apenas os campos especificados no corpo da requisição serão atualizados.

**Exemplo de corpo de requisição (JSON):**
```json
{
    "Nome": "João da Silva Terceiro",
    "Sexo": "M",
    "Nascimento": "1990-05-15",
    "Latitude": -11.685,
    "Longitude": -11.803
}
```

**Exemplo de resposta bem-sucedida (200) após atualização:**
```json
{
    "Nome": "João da Silva Terceiro",
    "Nascimento": "1990-05-15",
    "codigo": 4,
    "Latitude": -11.685,
    "Sexo": "M",
    "Longitude": -11.803
}
```

**Caso o usuário não seja encontrado para atualizar, a resposta será:**
```json
{
    "detail": "Usuário não encontrado para atualizar"
}
```
Resposta com código de status **404**.

#### 5. **POST /usuarios/**

Este endpoint permite adicionar um novo usuário ao sistema.

**Exemplo de corpo de requisição (JSON):**
```json
{
    "Nome": "João da Silva 4",
    "Sexo": "M",
    "Nascimento": "1990-05-15",
    "Latitude": -29.685,
    "Longitude": -53.803
}
```

**Exemplo de resposta bem-sucedida (200):**
```json
{
    "Nome": "João da Silva 4",
    "Nascimento": "1990-05-15",
    "codigo": 6,
    "Latitude": -29.685,
    "Sexo": "M",
    "Longitude": -53.803
}
```

Caso os dados não estejam de acordo com a especificação, será retornado um erro **422 - Unprocessable Entity**.

## Dados Coletados

Esta API fornece acesso a informações sobre dados coletados, permitindo operações de **GET**, **POST**, **PUT** e **DELETE**. Abaixo estão as instruções detalhadas sobre como usar os diferentes endpoints disponíveis para interagir com os dados coletados.

### Endpoints

A base URL da API em fase de teste é:  
`http://127.0.0.1:8000/dadosColetados/`
IDs fornecidos devem ser do tipo inteiro.
#### 1. **GET /dadosColetados/**

Este endpoint retorna todos os dados coletados cadastrados.

**Exemplo de resposta bem-sucedida (200):**
```json
[
    {
        "Valor1": 98.0,
        "codigo": 1,
        "EmCasa": false,
        "DataHora": "2024-11-15T15:00:00",
        "Tipo": 1,
        "seq": 3,
        "Valor2": 60.0
    },
    {
        "Valor1": 120.0,
        "codigo": 1,
        "EmCasa": false,
        "DataHora": "2024-11-14T10:30:00",
        "Tipo": 1,
        "seq": 7,
        "Valor2": 80.0
    },
    {
        "Valor1": 120.0,
        "codigo": 1,
        "EmCasa": true,
        "DataHora": "2024-11-14T10:30:00",
        "Tipo": 1,
        "seq": 8,
        "Valor2": 80.0
    },
    {
        "Valor1": 98.0,
        "codigo": 1,
        "EmCasa": false,
        "DataHora": "2024-11-15T15:00:00",
        "Tipo": 1,
        "seq": 4,
        "Valor2": 60.0
    }
]
```

Caso não haja dados cadastrados, a resposta será:
```json
200 []
```

#### 2. **GET /dadosColetados/{id}**

Este endpoint retorna um único dado coletado com base no ID fornecido.

**Exemplo de resposta bem-sucedida (200):**
```json
{
    "Valor1": 300.0,
    "codigo": 1,
    "EmCasa": true,
    "DataHora": "2024-11-14T10:30:00",
    "Tipo": 1,
    "seq": 11,
    "Valor2": 60.0
}
```

**Caso o dado não seja encontrado, a resposta será:**
```json
{
    "detail": "Dado não encontrado"
}
```
Resposta com código de status **404**.

#### 3. **DELETE /dadosColetados/{id}**

Este endpoint permite deletar um dado coletado com base no ID fornecido.

**Exemplo de resposta bem-sucedida (200) após deletar um dado:**
```json
{
    "Valor1": 300.0,
    "codigo": 1,
    "EmCasa": true,
    "DataHora": "2024-11-14T10:30:00",
    "Tipo": 1,
    "seq": 11,
    "Valor2": 60.0
}
```

**Caso o dado não seja encontrado para deletar, a resposta será:**
```json
{
    "detail": "Dado não encontrado para deletar"
}
```
Resposta com código de status **404**.

#### 4. **PUT /dadosColetados/{id}**

Este endpoint permite atualizar um dado coletado com base no ID fornecido. Apenas os campos especificados no corpo da requisição serão atualizados.

**Exemplo de corpo de requisição (JSON):**
```json
{
    "Tipo": 1,
    "Valor1": 0,
    "Valor2": 60,
    "EmCasa": true
}
```

**Exemplo de resposta bem-sucedida (200) após atualização:**
```json
{
    "Valor1": 0.0,
    "EmCasa": true,
    "DataHora": "2024-11-14T10:30:00",
    "Tipo": 1,
    "codigo": 1,
    "seq": 10,
    "Valor2": 60.0
}
```

Caso o dado não seja encontrado ou os dados fornecidos não sejam válidos, será retornado um erro **400 - BadRequest**.

#### 5. **POST /dadosColetados/**

Este endpoint permite adicionar um novo dado coletado ao sistema.

**Exemplo de corpo de requisição (JSON):**
```json
{
    "codigo": 1,
    "DataHora": "2024-11-14T10:30:00",
    "Tipo": 1,
    "Valor1": 120,
    "Valor2": 80,
    "EmCasa": true
}
```

**Exemplo de resposta bem-sucedida (200):**
```json
{
    "Valor1": 120.0,
    "codigo": 1,
    "EmCasa": true,
    "DataHora": "2024-11-14T10:30:00",
    "Tipo": 1,
    "seq": 9,
    "Valor2": 80.0
}
```

Caso os dados não estejam de acordo com a especificação, será retornado um erro **422 - Unprocessable Entity**.

---

### Configuração do Banco de Dados

No arquivo `db/database.py`, você encontrará a variável `DATABASE_URL` com o seguinte valor:

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

### Erros Comuns

- **404 Not Found**: O dado não foi encontrado.
- **400 BadRequest**: Erro na requisição, como falta de campos obrigatórios ou dados inválidos.
- **422 Unprocessable Entity**: Dados fornecidos não atendem à especificação necessária para criar um novo dado.
