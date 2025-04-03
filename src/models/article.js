import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      // validación para que name no pueda ser vacío
    },
    brand: {
      type: DataTypes.STRING(80),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      // validación para que brand no pueda ser vacío
    },
    activation_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    modification_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "article",
  }
);

(async () => {
  try {
    await Article.sync({ force: false });
    console.log("Modelo sincronizado con la base de datos");
    // Sincronización entre deploy y modelo local
  } catch (error) {
    console.error("Error al sincronizar el modelo:", error);
  }
})();

export default Article;
