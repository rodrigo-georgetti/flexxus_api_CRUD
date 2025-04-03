import User from "../models/user.js";
import { signToken } from "../middlewares/auth.middleware.js";

// Servicio para registrar un usuario
export const registerUserService = async (user_name, password) => {
  if (!user_name || !password) {
    throw new Error("El nombre de usuario y la contraseña son requeridos");
  }
  // Validamos que estén ambos campos
  const existingUser = await User.findOne({ where: { user_name } });
  if (existingUser) {
    throw new Error("El nombre de usuario ya está en uso");
  }
  // Vemos si existe el usuario en la db
  const newUser = await User.create({ user_name, password });

  return {
    id: newUser.id,
    user_name: newUser.user_name,
  };
};

// Servicio para iniciar sesión
export const loginUserService = async (user_name, password) => {
  if (!user_name || !password) {
    throw new Error("El nombre de usuario y la contraseña son requeridos");
  }
  // Validamos que estén ambos campos
  const user = await User.findOne({ where: { user_name } });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Usuario o contraseña incorrectos");
  }
  // Validamos que los campos sean correctos

  return signToken({ id: user.id, user_name: user.user_name });
};
