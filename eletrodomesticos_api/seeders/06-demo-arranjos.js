"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Arranjos",
      [
        {
          eletrodomestico_id: 1, // Relacionado com a Samsung
          data_arranjo: new Date("2021-06-20"),
          descricao: "Troca de suspensao",
          preco_pago: 100.0,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Arranjos", null, {});
  },
};
