"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Tipo",
      [
        {
          nome: "Maquina Lavar Roupa",
        },
        {
          nome: "Maquina Lavar Louça",
        },
        {
          nome: "Frigorifico",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("TIPO", null, {});
  },
};
