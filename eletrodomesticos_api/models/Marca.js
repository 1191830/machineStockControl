module.exports = (sequelize, DataTypes) => {
  const Marca = sequelize.define("Marca", {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    categoria: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  Marca.associate = function (models) {
    // Relacionamento de um para muitos com Eletrodomestico
    Marca.hasMany(models.Eletrodomestico, { foreignKey: "marca_id" });
  };

  return Marca;
};
