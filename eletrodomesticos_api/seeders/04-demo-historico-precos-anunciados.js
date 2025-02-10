"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Historico_Precos_Anunciados",
      [
        {
          eletrodomestico_id: 1, // Relacionado com o primeiro Eletrodoméstico
          preco_anunciado: 300.0,
          data_alteracao: new Date("2021-07-01"),
        },
        {
          eletrodomestico_id: 3, // Relacionado com o terceiro Eletrodoméstico
          preco_anunciado: 700.0,
          data_alteracao: new Date("2021-07-05"),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Historico_Precos_Anunciados", null, {});
  },
};
