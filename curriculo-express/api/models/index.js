import Sequelize from "sequelize";
import pg from "pg"; // ✅ Corrige o erro do require()

import getUserModel from "./user.js";
import getExperienceModel from "./experience.js";
import getEducationModel from "./education.js";
import getSkillModel from "./skill.js";

// ✅ Conexão com o banco (NeonDB ou outro PostgreSQL)
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false, // opcional: desativa logs SQL
  dialectModule: pg, // ✅ Substitui require("pg")
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// ✅ Inicializa os models
const models = {
  User: getUserModel(sequelize, Sequelize),
  Experience: getExperienceModel(sequelize, Sequelize),
  Education: getEducationModel(sequelize, Sequelize),
  Skill: getSkillModel(sequelize, Sequelize),
};

// ✅ Define as associações entre os models
Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

// ✅ Exporta a instância e os models
export { sequelize };
export default models;
