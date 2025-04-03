import {
  registerUserService,
  loginUserService,
} from "../services/users.services.js";

// Controlador para registrar un usuario
export const registerUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const user = await registerUserService(user_name, password);
    res.status(201).json({
      message: "Usuario creado exitosamente",
      user,
    });
  } catch (error) {
    console.error("Error en el registro:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    const token = await loginUserService(user_name, password);
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error.message);
    res.status(400).json({ message: error.message });
  }
};
