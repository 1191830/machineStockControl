"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Eletrodomesticos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      data_compra: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      preco_compra: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      preco_anunciado_atual: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      tipo: {
        type: Sequelize.STRING(10),
        allowNull: false,
        validate: {
          isIn: [["VENDA", "ARRANJO"]],
        },
      },
      marca_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Marcas",
          key: "id",
        },
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tipo",
          key: "id",
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Eletrodomesticos");
  },
};
