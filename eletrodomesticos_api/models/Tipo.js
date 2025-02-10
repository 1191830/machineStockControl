module.exports = (sequelize, DataTypes) => {
  const Tipo = sequelize.define("Tipo", {
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  });

  return Tipo;
};
