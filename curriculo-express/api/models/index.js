import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
