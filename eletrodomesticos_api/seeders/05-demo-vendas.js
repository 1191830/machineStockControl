"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Vendas",
      [
        {
          eletrodomestico_id: 1, // Relacionado com o primeiro Eletrodoméstico
          data_venda: new Date("2021-08-01"),
          preco_venda: 500.0,
          garantia_meses: 12,
          contacto_comprador: "marega@batatas.com",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Vendas", null, {});
  },
};
