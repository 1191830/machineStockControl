"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Vendas", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      data_venda: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      preco_venda: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      garantia_meses: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contacto_comprador: {
        type: Sequelize.STRING(100),
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
    await queryInterface.dropTable("Vendas");
  },
};
