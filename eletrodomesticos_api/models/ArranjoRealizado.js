module.exports = (sequelize, DataTypes) => {
  const ArranjoRealizado = sequelize.define("ArranjoRealizado", {
    data_arranjo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    custo_materiais: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    preco_pago_cliente: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  ArranjoRealizado.associate = function (models) {
    // Relacionamento
    ArranjoRealizado.belongsTo(models.Eletrodomestico, {
      foreignKey: "eletrodomestico_id",
    });
  };

  return ArranjoRealizado;
};
