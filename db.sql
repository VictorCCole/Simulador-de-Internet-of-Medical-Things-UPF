-- Tabela para armazenar informações dos usuários
CREATE TABLE Usuario (
    codigo INT PRIMARY KEY,          -- Chave primária para identificar o usuário
    Nome VARCHAR(50) NOT NULL,       -- Nome do usuário
    Nascimento DATE NOT NULL,        -- Data de nascimento
    Sexo CHAR(1) NOT NULL,           -- Sexo (ex.: 'M' para masculino, 'F' para feminino)
    Latitude FLOAT,                  -- Latitude da localização do usuário
    Longitude FLOAT                  -- Longitude da localização do usuário
);

-- Tabela para armazenar os dados coletados pelos sensores
CREATE TABLE DadosColetados (
    seq INT PRIMARY KEY,             -- Chave primária para identificar a coleta de dados
    codigo INT,                      -- Código do usuário associado (chave estrangeira)
    DataHora DATETIME NOT NULL,      -- Data e hora da coleta
    Tipo INT NOT NULL,               -- Tipo de dado coletado (1: Pressão Arterial, 2: SPO2, 3: Temperatura)
    Valor1 FLOAT NOT NULL,           -- Valor principal (ex.: pressão sistólica, SpO2, temperatura corporal)
    Valor2 FLOAT,                    -- Valor secundário (ex.: pressão diastólica, frequência cardíaca)
    EmCasa BOOLEAN,                  -- Indica se a coleta foi feita em casa (true ou false)
    FOREIGN KEY (codigo) REFERENCES Usuario(codigo)  -- Relaciona a coleta com o usuário
);