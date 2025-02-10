module.exports = (sequelize, DataTypes) => {
  const Arranjo = sequelize.define("Arranjo", {
    data_arranjo: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    preco_pago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  Arranjo.associate = function (models) {
    // Relacionamento
    Arranjo.belongsTo(models.Eletrodomestico, {
      foreignKey: "eletrodomestico_id",
    });
  };

  return Arranjo;
};
