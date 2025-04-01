import { Router } from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articles.controllers.js";

const router = Router();

// Ruta para obtener artículos con filtros
router.get("/article", getArticles);
router.get("/", (req, res) =>{
    res.send("hola mundo")
})
// Ruta para crear un nuevo artículo
router.post("/article", createArticle);

// Ruta para actualizar un artículo
router.put("/article/:id", updateArticle);

// Ruta para desactivar (eliminar) un artículo
router.delete("/article/:id", deleteArticle);

export default router;

