"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Arranjos_Realizados",
      [
        {
          eletrodomestico_id: 2, // Relacionado com o frigorifico LG
          data_arranjo: new Date("2021-06-22"),
          descricao: "Troca do compressor",
          custo_materiais: 200.0,
          preco_pago_cliente: 600.0,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Arranjos_Realizados", null, {});
  },
};
