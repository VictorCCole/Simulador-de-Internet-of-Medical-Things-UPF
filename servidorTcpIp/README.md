# Servidor TCP/IP em Python

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
