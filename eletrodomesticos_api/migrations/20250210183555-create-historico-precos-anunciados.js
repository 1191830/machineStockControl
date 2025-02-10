"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Historico_Precos_Anunciados", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      preco_anunciado: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data_alteracao: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      eletrodomestico_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Eletrodomesticos",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Historico_Precos_Anunciados");
  },
};
