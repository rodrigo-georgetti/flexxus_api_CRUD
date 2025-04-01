import Article from '../models/article.js';

// Obtener artículos con filtros
export const getArticles = async (req, res) => {
    try {
        const { name, activation_status, exact } = req.query;
        
        const where = {}; // Objeto para condiciones dinámicas

        // Si se ha enviado un filtro de estado de activación
        if (activation_status !== undefined) {
            where.activation_status = activation_status === "true"; // Convierte a booleano
        }

        // Si se ha enviado un filtro de nombre
        if (name) {
            if (exact === "true") {
                where.name = name; // Búsqueda exacta
            } else {
                where.name = { [Sequelize.Op.iLike]: `%${name}%` }; // Coincidencia parcial (case insensitive)
            }
        }

        // Buscar los artículos
        const articles = await Article.findAll({
            where,
            order: [["modification_date", "DESC"]],
        });

        res.json(articles);
    } catch (error) {
        console.error("Error al obtener artículos:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Crear un nuevo artículo
export const createArticle = async (req, res) => {
    const { name, brand } = req.body;
    if (!name || !brand) {
        return res.status(400).json({ message: "Nombre y Marca son requeridos" });
    }

    try {
        // Crear el artículo con Sequelize
        const article = await article.create({
            name,
            brand,
            activation_status: true, // Por defecto, activado
        });

        res.status(201).json({ message: "Artículo creado", article });
    } catch (error) {
        console.error("Error al crear artículo:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Actualizar un artículo
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { name, brand, activation_status } = req.body;
    const modification_date = new Date();

    try {
        // Buscar el artículo por ID
        const article = await article.findByPk(id);
        
        if (!article) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }

        // Actualizar el artículo con Sequelize
        await article.update({
            name,
            brand,
            activation_status,
            modification_date,
        });

        res.json({ message: "Artículo actualizado", article });
    } catch (error) {
        console.error("Error al actualizar artículo:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

// Eliminar un artículo (desactivarlo)
export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    try {
        // Buscar el artículo por ID
        const article = await artcle.findByPk(id);

        if (!article) {
            return res.status(404).json({ message: "Artículo no encontrado" });
        }

        // Desactivar el artículo (actualizar el estado de activación)
        await article.update({ activation_status: false });

        res.json({
            message: "Artículo desactivado correctamente",
            article,
        });
    } catch (error) {
        console.error("Error al desactivar artículo:", error);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
};

