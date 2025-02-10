"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Marcas",
      [
        {
          nome: "Samsung",
          categoria: "WW90T554DAN",
        },
        {
          nome: "LG",
          categoria: "GBF61PZJZN",
        },
        {
          nome: "Whirpool",
          categoria: "WFC 3C26",
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Marcas", null, {});
  },
};
