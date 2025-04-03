import { Router } from "express";
import userRoutes from "./users.routes.js";
import articleRoutes from "./articles.routes.js";
import { users, articles } from "../config/helper.js";

const router = Router();

// tenemos separadas las rutas para cada model
router.use(users, userRoutes);
router.use(articles, articleRoutes);

export default router;
