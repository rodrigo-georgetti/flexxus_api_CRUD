import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

// Función para firmar el token

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

export const authenticateJWT = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // Obtener el token del encabezado Authorization, desde Bearer
  if (!token) {
    return res
      .status(401)
      .json({ message: "Acceso no autorizado, token no proporcionado" });
  }
  // validamos el token recibido
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Verificamos el token
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
