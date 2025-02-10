"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Arranjos_Realizados", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data_arranjo: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      custo_materiais: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      preco_pago_cliente: {
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable("Arranjos_Realizados");
  },
};
