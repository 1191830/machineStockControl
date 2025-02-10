"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Eletrodomesticos",
      [
        {
          nome: "MLR 10kg Samsung",
          descricao: "Maquina lavar roupa 10Kg 1200 RPM Samsung",
          data_compra: new Date("2021-05-10"),
          preco_compra: 200.0,
          preco_anunciado_atual: 500.0,
          tipo: "VENDA",
          marca_id: 1, // Relacionado com Samsung
          tipo_id: 1, // Tipo "Maquina Lavar Roupa"
        },
        {
          nome: "Frigorifico encastrar LG",
          descricao: "Frigorifico escangalhado LG",
          data_compra: new Date("2021-06-15"),
          preco_compra: null,
          preco_anunciado_atual: null,
          tipo: "ARRANJO",
          marca_id: 2, // Relacionado com LG
          tipo_id: 3, // Tipo "ARRANJO"
        },
        {
          nome: "MLL Americana Whirpool",
          descricao: "Maquina lavar Louça whirpool muito jeitosa",
          data_compra: new Date("2021-05-10"),
          preco_compra: 100.0,
          preco_anunciado_atual: 150.0,
          tipo: "VENDA",
          marca_id: 3, // Relacionado com Whirpool
          tipo_id: 2, // Tipo "Maquina Lavar Louça"
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Eletrodomesticos", null, {});
  },
};
