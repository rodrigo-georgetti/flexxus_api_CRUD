import express, { json } from "express";
import {PORT} from "./config/config.js"
import articlesRoutes from "./routes/articles.routes.js"
import morgan from "morgan";
import jwt from"jsonwebtoken";


const SECRET_KEY = 'tu_clave_secreta'
//cambiar por una cadena de 256 bits
const app = express();

app.use(morgan('dev'));
app.use(json());
app.use("/api", articlesRoutes);

app.listen(PORT);
console.log("server on port: ", PORT)