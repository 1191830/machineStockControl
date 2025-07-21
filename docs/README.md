# Sistema de Controlo de Stock de Eletrodomésticos

## Descrição

Este projeto visa o desenvolvimento de um sistema para controlo de stock de eletrodomésticos, com funcionalidades para:

- Gerir informações de eletrodomésticos, incluindo nome, descrição, preços, datas de compra, alterações no preço e marca.
- Registar vendas de eletrodomésticos, com informações sobre preço, data de venda, garantia e contacto do comprador.
- Gerir a manutenção e arranjos realizados nos eletrodomésticos, com possibilidade de armazenar os custos e descrições dos arranjos.
- Manter o histórico de preços anunciados, com o registro das datas e preços de alterações.

## Funcionalidades

1. **Cadastro de Eletrodomésticos**

   - Registra os eletrodomésticos com informações como nome, descrição, preço de compra, e tipo de operação ("VENDA" ou "ARRANJO").
   - O preço anunciado pode ser alterado e o histórico de alterações é guardado.
   - Relacionamento com a marca do produto, incluindo nome da marca e categoria.

2. **Gestão de Vendas**

   - Cada venda registra a data de venda, o preço de venda, o contacto do comprador e a garantia do produto.

3. **Gestão de Arranjos**

   - Registra os arranjos feitos, com data, descrição e o custo do arranjo.

4. **Histórico de Preços Anunciados**
   - Registra todas as alterações no preço anunciado do eletrodoméstico com a data de alteração.

## Estrutura de Dados

- **Tabela `Marcas`**: Contém informações sobre as marcas, incluindo nome e categoria.
- **Tabela `Eletrodomesticos`**: Contém informações básicas sobre os eletrodomésticos e referencia a tabela de marcas.
- **Tabela `Historico_Precos_Anunciados`**: Guarda o histórico de alterações no preço anunciado de cada eletrodoméstico.
- **Tabela `Vendas`**: Registra os dados relacionados à venda dos produtos.
- **Tabela `Arranjos`**: Registra os arranjos realizados nos eletrodomesticos comprados.
- **Tabela `Arranjos_Realizados`**: Contém informações sobre os arranjos realizados pela sua empresa, incluindo custos e preços pagos.

## Tecnologias Utilizadas

- **Banco de Dados**: PostgreSQL (utilizando SQL para definir as tabelas e relacionamentos)
- **Linguagem de Programação**: React e Python (app simples para uso interno nao necessitando de grande escalabiliade por isso optou-se por linguagem simples)

## How to

Run docker compose to get the postgres db and pg admin
Access pgadmin through port 5050 enter username and password to pgadmin and select the bd eletrodomesticos.
Run node with command npm run dev

# BE + DB containeraised

Inside eletrodomesticos-api we got a docker-compose that containerises both our API and database including seeds.
We can run docker compose with command docker-compose up --build inside the api folder to initiate API
