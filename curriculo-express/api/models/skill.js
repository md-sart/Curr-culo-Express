const getSkillModel = (sequelize, { DataTypes }) => {
  const Skill = sequelize.define("Skill", {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivel: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [["Básico", "Intermediário", "Avançado"]],
      },
    },
  });

  Skill.associate = (models) => {
    Skill.belongsTo(models.User, { foreignKey: "userId", as: "usuario" });
  };

  return Skill;
};

export default getSkillModel;
