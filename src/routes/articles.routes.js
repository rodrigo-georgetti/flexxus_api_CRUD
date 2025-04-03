import { Router } from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articles.controllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: API para gestionar artículos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Articles:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del artículo
 *         brand:
 *           type: string
 *           description: Marca del artículo
 *         activation_status:
 *           type: boolean
 *           description: Estado activado/desactivado
 *         modification_date:
 *           type: date
 *           description: fecha de modificación del usuario
 *       example:
 *         name: TV
 *         brand: SAMSUNG
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Obtener artículos con filtros
 *     description: Devuelve una lista de artículos según los filtros proporcionados.
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: activation_status
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Estado de activación del artículo (true/false). Si se proporciona, filtra por este estado.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Nombre del artículo. Si se usa junto con `exact=true`, la búsqueda es exacta; de lo contrario, busca coincidencias parciales.
 *       - in: query
 *         name: exact
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Si es `true`, buscará el nombre exacto. Si es `false` o no está presente, buscará coincidencias parciales.
 *     responses:
 *       200:
 *         description: Lista de artículos encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Parámetros inválidos o faltantes.
 *       500:
 *         description: Error en el servidor.
 */
router.get("/", authenticateJWT, getArticles);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Crear un nuevo artículo
 *     description: Crea un nuevo artículo con nombre y marca.
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - brand
 *             properties:
 *               name:
 *                 type: string
 *                 example: "TV"
 *               brand:
 *                 type: string
 *                 example: "PHILIPS"
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado (falta el token o es inválido).
 *       500:
 *         description: Error en el servidor.
 */
router.post("/", authenticateJWT, createArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Actualizar un artículo
 *     description: Modifica los datos de un artículo existente.
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nuevo Nombre"
 *               brand:
 *                 type: string
 *                 example: "Nueva Marca"
 *               activation_status:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado (falta el token o es inválido).
 *       404:
 *         description: Artículo no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.put("/:id", authenticateJWT, updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Desactivar un artículo
 *     description: Desactiva un artículo cambiando su estado de activación a `false`.
 *     tags: [Articles]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del artículo a desactivar.
 *     responses:
 *       200:
 *         description: Artículo desactivado exitosamente.
 *       401:
 *         description: No autorizado (falta el token o es inválido).
 *       404:
 *         description: Artículo no encontrado.
 *       500:
 *         description: Error en el servidor.
 */
router.delete("/:id", authenticateJWT, deleteArticle);

export default router;
