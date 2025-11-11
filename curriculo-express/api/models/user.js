const getUserModel = (sequelize, { DataTypes }) => {
  const User = sequelize.define("User", {
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    resumo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Experience, { foreignKey: "userId", as: "experiencias" });
    User.hasMany(models.Education, { foreignKey: "userId", as: "educacoes" });
    User.hasMany(models.Skill, { foreignKey: "userId", as: "habilidades" });
  };

  return User;
};

export default getUserModel;
