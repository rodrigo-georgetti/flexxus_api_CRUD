import { DataTypes } from "sequelize";
// En otro archivo donde necesites la instancia de Sequelize
import sequelize from '../config/db.js';


const Article = sequelize.define("Article", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notEmpty: true, // Evita cadenas vacías
    },
  },
  brand: {
    type: DataTypes.STRING(80),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  activation_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  modification_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Establece la fecha de modificación por defecto
  },
}, {
  timestamps: false, // Si no deseas `createdAt` y `updatedAt`
  tableName: "article", // Asegura que el nombre de la tabla sea el esperado
});

(async () => {
    try {
      await Article.sync({ force: false }); // Cambiar 'force' a true para reiniciar la tabla
      console.log('Modelo sincronizado con la base de datos');
    } catch (error) {
      console.error('Error al sincronizar el modelo:', error);
    }
  })();

  export default Article;


