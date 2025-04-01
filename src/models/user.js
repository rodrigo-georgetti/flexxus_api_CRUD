import { DataTypes } from "sequelize";
import sequelize from '../config/db.js';
import bcrypt from 'bcryptjs'; // Para manejar contraseñas cifradas

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notEmpty: true, // Evita cadenas vacías
    },
  },
  password: {
    type: DataTypes.STRING(255), // Aumenta la longitud para el hash
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  
  modification_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Establece la fecha de modificación por defecto
  },
}, {
  timestamps: false, // Si no deseas `createdAt` y `updatedAt`
  tableName: "user", // Asegura que el nombre de la tabla sea el esperado
});

// Encriptar la contraseña antes de guardar el usuario
User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Método para comparar la contraseña con el hash almacenado
User.prototype.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Sincronización del modelo
(async () => {
  try {
    await User.sync({ force: false }); // Cambiar 'force' a true para reiniciar la tabla
    console.log('Modelo sincronizado con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo:', error);
  }
})();

export default User;
