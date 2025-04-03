import {
  getArticlesService,
  createArticleService,
  updateArticleService,
  deleteArticleService,
} from "../services/articles.services.js";

// Controlador para obtener artículos con filtros
export const getArticles = async (req, res) => {
  try {
    const { name, activation_status, exact } = req.query;
    const articles = await getArticlesService(name, activation_status, exact);
    res.json(articles);
  } catch (error) {
    console.error("Error al obtener artículos:", error.message);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Controlador para crear un nuevo artículo
export const createArticle = async (req, res) => {
  try {
    const { name, brand } = req.body;
    if (!name || !brand)
      return res.status(400).json({ message: "Nombre y Marca son requeridos" });

    const article = await createArticleService(name, brand);
    res.status(201).json({ message: "Artículo creado", article });
  } catch (error) {
    console.error("Error al crear artículo:", error.message);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Controlador para actualizar un artículo
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, activation_status } = req.body;

    const article = await updateArticleService(
      id,
      name,
      brand,
      activation_status
    );
    res.json({ message: "Artículo actualizado", article });
  } catch (error) {
    console.error("Error al actualizar artículo:", error.message);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

// Controlador para desactivar un artículo
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await deleteArticleService(id);
    res.json({ message: "Artículo desactivado correctamente", article });
  } catch (error) {
    console.error("Error al desactivar artículo:", error.message);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
