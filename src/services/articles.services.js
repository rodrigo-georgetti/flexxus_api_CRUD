import { Sequelize } from "sequelize";
import Article from "../models/article.js";

// Servicio para buscar por estado de activación
export const findArticleByActivationStatus = async (activation_status) => {
  return await Article.findAll({
    where: { activation_status: activation_status === "true" },
    order: [["modification_date", "DESC"]],
  });
};

// Servicio para buscar por nombre exacto
export const findArticleByExactName = async (name) => {
  return await Article.findAll({
    where: { name },
    order: [["modification_date", "DESC"]],
  });
};

// Servicio para buscar por nombre parcial
export const findArticleByPartialName = async (name) => {
  return await Article.findAll({
    where: { name: { [Sequelize.Op.iLike]: `%${name}%` } },
    order: [["modification_date", "DESC"]],
  });
};

// En este servicio se evaluan los params recibidos en la ruta para aplicar segun sea el caso
export const getArticlesService = async (name, activation_status, exact) => {
  if (activation_status !== undefined && !name) {
    return await findArticleByActivationStatus(activation_status);
  }
  if (name && exact === "true") {
    return await findArticleByExactName(name);
  }
  if (name) {
    return await findArticleByPartialName(name);
  }
  return await Article.findAll({ order: [["modification_date", "DESC"]] });
};

// Servicio para crear un artículo
export const createArticleService = async (name, brand) => {
  return await Article.create({
    name,
    brand,
    activation_status: true,
  });
};

// Servicio para actualizar un artículo
export const updateArticleService = async (
  id,
  name,
  brand,
  activation_status
) => {
  const article = await Article.findByPk(id);
  if (!article) throw new Error("Artículo no encontrado");

  await article.update({
    name,
    brand,
    activation_status,
    modification_date: new Date(),
  });

  return article;
};

// Servicio para desactivar un artículo
export const deleteArticleService = async (id) => {
  const article = await Article.findByPk(id);
  if (!article) throw new Error("Artículo no encontrado");

  await article.update({ activation_status: false });

  return article;
};
