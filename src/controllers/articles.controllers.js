import { pool } from "../config/db.js";

// Obtener artículos con filtros
export const getArticles = async (req, res) => {
    try {
        const { name, activation_status, exact } = req.query;
        let query = "SELECT * FROM article WHERE 1=1"; // Base de la consulta
        let values = [];
        let index = 1;

        // Si no se envía ningún filtro, retorna un array vacío
        if (!name && activation_status === undefined) {
            return res.json([]); // No devuelve ningún artículo
        }

        // Filtrar por estado de actividad (true o false)
        if (activation_status !== undefined) {
            query += ` AND activation_status = $${index}`;
            values.push(activation_status === "true"); // Convierte string a booleano
            index++;
        }

        // Filtrar por nombre (coincidencia parcial o exacta)
        if (name) {
            if (exact === "true") {
                query += ` AND name = $${index}`; // Búsqueda exacta
                values.push(name);
            } else {
                query += ` AND name ILIKE $${index}`; // Coincidencia parcial
                values.push(`%${name}%`);
            }
            index++;
        }

        query += " ORDER BY modification_date DESC";

        const { rows } = await pool.query(query, values);
        res.json(rows);
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

    // Insertar el artículo en la base de datos
    const result = await pool.query(
        "INSERT INTO article (name, brand, activation_status) VALUES ($1, $2, $3) RETURNING *",
        [name, brand, true] // Se asume que activation_status es booleano
    );

    res.status(201).json({ message: "Artículo creado", article: result.rows[0] });
};

// Actualizar un artículo
export const updateArticle = async (req, res) => {
    const { id } = req.params;
    const { name, brand, activation_status } = req.body;
    const modification_date = new Date(); // Fecha y hora actual

    // Validar que al menos un campo haya sido enviado
    if (
        name === undefined &&
        brand === undefined &&
        activation_status === undefined
    ) {
        return res
            .status(400)
            .json({ message: "Debe enviar al menos un campo para actualizar" });
    }
    
    // Construir la consulta dinámicamente
    let query = "UPDATE article SET modification_date = $1";
    let values = [modification_date];
    let index = 2;

    if (name !== undefined) {
        query += `, name = $${index}`;
        values.push(name);
        index++;
    }
    if (brand !== undefined) {
        query += `, brand = $${index}`;
        values.push(brand);
        index++;
    }
    if (activation_status !== undefined) {
        query += `, activation_status = $${index}`;
        values.push(activation_status);
        index++;
    }

    query += ` WHERE id = $${index} RETURNING *`;
    values.push(id);

    // Ejecutar la consulta
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json({ message: "Artículo actualizado", article: result.rows[0] });
};

// Eliminar un artículo (desactivarlo)
export const deleteArticle = async (req, res) => {
    const { id } = req.params;

    // Actualizar el estado de activación en la base de datos
    const result = await pool.query(
        "UPDATE article SET activation_status = false WHERE id = $1 RETURNING *",
        [id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }

    res.json({
        message: "Artículo desactivado correctamente",
        article: result.rows[0],
    });
};
