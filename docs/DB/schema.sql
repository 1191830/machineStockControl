-- Tabela Marcas
CREATE TABLE Marcas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
);

CREATE TABLE TIPO (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
)

-- Tabela Eletrodomesticos
CREATE TABLE Eletrodomesticos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_compra DATE NOT NULL,
    preco_compra DECIMAL(10, 2) NOT NULL,
    preco_anunciado_atual DECIMAL(10, 2),
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('VENDA', 'ARRANJO')),
    finalizado BOOLEAN NOT NULL DEFAULT FALSE,
    marca_id INTEGER REFERENCES Marcas(id),
    tipo_id INTEGER REFERENCES TIPO(id)
);

-- Tabela Historico_Precos_Anunciados
CREATE TABLE Historico_Precos_Anunciados (
    id SERIAL PRIMARY KEY,
    eletrodomestico_id INTEGER REFERENCES Eletrodomesticos(id),
    preco_anunciado DECIMAL(10, 2) NOT NULL,
    data_alteracao DATE NOT NULL
);

-- Tabela Vendas
CREATE TABLE Vendas (
    id SERIAL PRIMARY KEY,
    eletrodomestico_id INTEGER REFERENCES Eletrodomesticos(id),
    data_venda DATE NOT NULL,
    preco_venda DECIMAL(10, 2) NOT NULL,
    garantia_meses INTEGER NOT NULL,
    contacto_comprador VARCHAR(100) NOT NULL -- Já existia, mas garantimos que é VARCHAR
);

-- Tabela Arranjos
CREATE TABLE Arranjos (
    id SERIAL PRIMARY KEY,
    eletrodomestico_id INTEGER REFERENCES Eletrodomesticos(id),
    data_arranjo DATE NOT NULL,
    descricao TEXT,
    preco_pago DECIMAL(10, 2) NOT NULL
);

-- Tabela Arranjos_Realizados
CREATE TABLE Arranjos_Realizados (
    id SERIAL PRIMARY KEY,
    eletrodomestico_id INTEGER REFERENCES Eletrodomesticos(id),
    data_arranjo DATE NOT NULL,
    descricao TEXT,
    custo_materiais DECIMAL(10, 2) NOT NULL,
    preco_pago_cliente DECIMAL(10, 2) NOT NULL
);