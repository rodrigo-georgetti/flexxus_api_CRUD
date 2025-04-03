import express, { json } from "express";
import { PORT } from "./config/config.js";
import router from "./routes/index.routes.js";
import morgan from "morgan";
import { setupSwagger } from "./documentation/swagger.js";

const app = express();

app.use(morgan("dev"));
app.use(json());

app.use("/api", router);
setupSwagger(app);

app.listen(PORT, () => {
  console.log("Server on port:", PORT);
});
