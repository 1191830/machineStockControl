module.exports = (sequelize, DataTypes) => {
  const Eletrodomestico = sequelize.define("Eletrodomestico", {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_compra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    preco_compra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    preco_anunciado_atual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        isIn: [["VENDA", "ARRANJO"]],
      },
    },
  });

  Eletrodomestico.associate = function (models) {
    // Relacionamentos
    Eletrodomestico.belongsTo(models.Marca, { foreignKey: "marca_id" });
    Eletrodomestico.belongsTo(models.Tipo, { foreignKey: "tipo_id" });
  };

  return Eletrodomestico;
};
