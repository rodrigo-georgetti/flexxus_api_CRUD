// import pg from "pg";
// import {config} from "dotenv"
 import {DATABASE_URL, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT} from "./config.js"

// config()

// export const pool = new pg.Pool({

//   connectionString: DATABASE_URL,
//   ssl: true
//   // user: DB_USER,
//   // host: DB_HOST,
//   // password: DB_PASSWORD,
//   // database: DB_DATABASE,
//   // port: DB_PORT,
// });

import Sequelize from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Para evitar errores con certificados en Render
    },
  },
  logging: false, // Desactiva logs de SQL en consola
});

export default sequelize;



