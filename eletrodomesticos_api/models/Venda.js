module.exports = (sequelize, DataTypes) => {
  const Venda = sequelize.define("Venda", {
    data_venda: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    preco_venda: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    garantia_meses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contacto_comprador: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  Venda.associate = function (models) {
    // Relacionamento
    Venda.belongsTo(models.Eletrodomestico, {
      foreignKey: "eletrodomestico_id",
    });
  };

  return Venda;
};
