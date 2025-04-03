import Sequelize from "sequelize";
import { DATABASE_URL } from "./config.js";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Sirve evitar errores con certificados en Render
    },
  },
  logging: false,
});

export default sequelize;
