import { Router } from "express";
import { registerUser, loginUser } from "../controllers/users.controllers.js";
import { register, login } from "../config/helper.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints relacionados con la autenticación de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - user_name
 *         - password
 *       properties:
 *         user_name:
 *           type: string
 *           description: Nombre del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *         modification_date:
 *           type: date
 *           description: fecha de modificación del usuario
 *       example:
 *         user_name: juan
 *         password: "123456"
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post(register, registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario autenticado correctamente
 *       401:
 *         description: Credenciales incorrectas
 */
router.post(login, loginUser);

export default router;
