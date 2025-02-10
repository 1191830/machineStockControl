module.exports = (sequelize, DataTypes) => {
  const HistoricoPrecoAnunciado = sequelize.define("HistoricoPrecoAnunciado", {
    preco_anunciado: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    data_alteracao: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  HistoricoPrecoAnunciado.associate = function (models) {
    // Relacionamento
    HistoricoPrecoAnunciado.belongsTo(models.Eletrodomestico, {
      foreignKey: "eletrodomestico_id",
    });
  };

  return HistoricoPrecoAnunciado;
};
