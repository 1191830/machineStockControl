import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1739224383596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      -- Criando a tabela Marcas
      CREATE TABLE Marcas (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        categoria VARCHAR(100) NOT NULL
      );

      -- Criando a tabela Tipo_Eletrodomestico
      CREATE TABLE Tipo_Eletrodomestico (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL
      );

      -- Criando a tabela Eletrodomesticos
      CREATE TABLE Eletrodomesticos (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        descricao TEXT,
        data_compra DATE NOT NULL,
        preco_compra DECIMAL(10,2),
        preco_anunciado_atual DECIMAL(10,2),
        tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('VENDA', 'ARRANJO')),
        marca_id INTEGER NOT NULL,
        tipo_eletrodomestico_id INTEGER NOT NULL,
        CONSTRAINT fk_marca FOREIGN KEY (marca_id) REFERENCES Marcas(id) ON DELETE CASCADE,
        CONSTRAINT fk_tipo FOREIGN KEY (tipo_eletrodomestico_id) REFERENCES Tipo_Eletrodomestico(id) ON DELETE CASCADE
      );

      -- Criando a tabela Historico_Precos_Anunciados
      CREATE TABLE Historico_Precos_Anunciados (
        id SERIAL PRIMARY KEY,
        eletrodomestico_id INTEGER NOT NULL,
        preco_anunciado DECIMAL(10,2) NOT NULL,
        data_alteracao DATE NOT NULL,
        CONSTRAINT fk_historico_eletrodomestico FOREIGN KEY (eletrodomestico_id) REFERENCES Eletrodomesticos(id) ON DELETE CASCADE
      );

      -- Criando a tabela Vendas
      CREATE TABLE Vendas (
        id SERIAL PRIMARY KEY,
        eletrodomestico_id INTEGER NOT NULL,
        data_venda DATE NOT NULL,
        preco_venda DECIMAL(10,2) NOT NULL,
        garantia_meses INTEGER NOT NULL,
        contacto_comprador VARCHAR(100) NOT NULL,
        CONSTRAINT fk_venda_eletrodomestico FOREIGN KEY (eletrodomestico_id) REFERENCES Eletrodomesticos(id) ON DELETE CASCADE
      );

      -- Criando a tabela Arranjos
      CREATE TABLE Arranjos (
        id SERIAL PRIMARY KEY,
        eletrodomestico_id INTEGER NOT NULL,
        data_arranjo DATE NOT NULL,
        descricao TEXT,
        preco_pago DECIMAL(10,2) NOT NULL,
        CONSTRAINT fk_arranjo_eletrodomestico FOREIGN KEY (eletrodomestico_id) REFERENCES Eletrodomesticos(id) ON DELETE CASCADE
      );

      -- Criando a tabela Arranjos_Realizados
      CREATE TABLE Arranjos_Realizados (
        id SERIAL PRIMARY KEY,
        eletrodomestico_id INTEGER NOT NULL,
        data_arranjo DATE NOT NULL,
        descricao TEXT,
        custo_materiais DECIMAL(10,2) NOT NULL,
        preco_pago_cliente DECIMAL(10,2) NOT NULL,
        CONSTRAINT fk_arranjo_realizado_eletrodomestico FOREIGN KEY (eletrodomestico_id) REFERENCES Eletrodomesticos(id) ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE IF EXISTS Arranjos_Realizados;
      DROP TABLE IF EXISTS Arranjos;
      DROP TABLE IF EXISTS Vendas;
      DROP TABLE IF EXISTS Historico_Precos_Anunciados;
      DROP TABLE IF EXISTS Eletrodomesticos;
      DROP TABLE IF EXISTS Tipo_Eletrodomestico;
      DROP TABLE IF EXISTS Marcas;
    `);
  }
}
