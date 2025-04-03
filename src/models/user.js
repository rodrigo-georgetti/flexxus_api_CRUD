import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      // validación para que user_name no pueda ser vacío
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      // validación para que password no pueda ser vacío
    },

    modification_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "user",
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
  // Encriptamos la contraseña antes de guardar el usuario
});

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
  // Con este método comparamos la contraseña con el hash almacenado
};

(async () => {
  try {
    await User.sync({ force: false });
    console.log("Modelo sincronizado con la base de datos");
    // Sincronización entre deploy y modelo local
  } catch (error) {
    console.error("Error al sincronizar el modelo:", error);
  }
})();

export default User;
