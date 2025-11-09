const getExperienceModel = (sequelize, { DataTypes }) => {
  const Experience = sequelize.define("Experience", {
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    data_fim: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Experience.associate = (models) => {
    Experience.belongsTo(models.User, { foreignKey: "userId", as: "usuario" });
  };

  return Experience;
};

export default getExperienceModel;
