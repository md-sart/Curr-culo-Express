const getEducationModel = (sequelize, { DataTypes }) => {
  const Education = sequelize.define("Education", {
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
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

  Education.associate = (models) => {
    Education.belongsTo(models.User, { foreignKey: "userId", as: "usuario" });
  };

  return Education;
};

export default getEducationModel;
