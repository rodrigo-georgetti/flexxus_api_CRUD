import express, { json } from "express";
import {PORT} from "./config/config.js"
import articlesRoutes from "./routes/articles.routes.js"
import morgan from "morgan";

const app = express();

app.use(morgan('dev'));
app.use(json());
app.use("/api", articlesRoutes);

app.listen(PORT);
console.log("server on port: ", PORT)