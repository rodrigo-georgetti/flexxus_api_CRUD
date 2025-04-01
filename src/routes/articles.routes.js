import { Router } from "express";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articles.controllers.js";

const router = Router();
const JWT_SECRET = 'tu_clave_secreta'
// Ruta para obtener artículos con filtros

router.get('/', (req, res) => {
  res.send('¡Hola, Mundo!');
});

// Endpoint para registro de usuarios
router.post('/register', async (req, res) => {
  const { user_name, password } = req.body;

  // Validar que se proporcionaron los datos necesarios
  if (!user_name || !password) {
    return res.status(400).json({ message: "El nombre de usuario y la contraseña son requeridos" });
  }

  try {
    // Verificar si el nombre de usuario ya existe
    const existingUser = await User.findOne({ where: { user_name } });
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({ user_name, password });
    return res.status(201).json({
      message: "Usuario creado exitosamente",
      user: {
        id: newUser.id,
        user_name: newUser.user_name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al registrar el usuario" });
  }
});

router.post('/login', async (req, res) => {
  const { user_name, password } = req.body;

  // Validar que se proporcionaron los datos necesarios
  if (!user_name || !password) {
    return res.status(400).json({ message: "El nombre de usuario y la contraseña son requeridos" });
  }

  try {
    // Buscar al usuario por nombre de usuario
    const user = await User.findOne({ where: { user_name } });
    if (!user) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Usuario o contraseña incorrectos" });
    }

    // Si las credenciales son correctas, generar el JWT
    const token = jwt.sign(
      { id: user.id, user_name: user.user_name },  // Datos del usuario que queremos incluir en el JWT
      JWT_SECRET,  // Clave secreta para firmar el token
      { expiresIn: '1h' }  // Expiración del token (opcional)
    );

    // Responder con el token
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,  // El token generado
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error al procesar la solicitud" });
  }
});





 router.get("/article", getArticles);


// // Ruta para crear un nuevo artículo
// router.post("/article", createArticle);

// // Ruta para actualizar un artículo
// router.put("/article/:id", updateArticle);

// // Ruta para desactivar (eliminar) un artículo
// router.delete("/article/:id", deleteArticle);

export default router;

