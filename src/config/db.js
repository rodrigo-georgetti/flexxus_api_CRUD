import pg from "pg";
import {config} from "dotenv"
import {DATABASE_URL, DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT} from "./config.js"

config()

export const pool = new pg.Pool({

  connectionString: DATABASE_URL,
  ssl: true
  // user: DB_USER,
  // host: DB_HOST,
  // password: DB_PASSWORD,
  // database: DB_DATABASE,
  // port: DB_PORT,
});
