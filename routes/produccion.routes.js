import express from "express";
import sequelize from "../config.js";
import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js"; // Asegúrate de importar el modelo Producto

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", async (req, res) => {
    try {
        const { productos } = req.body;

        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }

        // Array para guardar los registros de Producción
        const registrosProduccion = [];

        for (const producto of productos) {
            const { nombre, cantidad, fecha } = producto;

            // Buscar el producto en la tabla Producto
            const productoEncontrado = await Producto.findOne({
                where: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('Nombre')),
                    nombre.toLowerCase()
                ),
                attributes: ["Id_Producto"], // Solo obtenemos el Id_Producto
            });

            // Si no se encuentra el producto, devolver un error
            if (!productoEncontrado) {
                console.error(`Producto no encontrado: ${nombre}`);
                return res.status(404).json({
                    message: `El producto con nombre "${nombre}" no existe.`,
                });
            }

            // Crear un objeto con los datos para insertarlos en la tabla Producción
            registrosProduccion.push({
                Id_Producto: productoEncontrado.Id_Producto, // Relacionamos con el Id_Producto
                Cantidad: cantidad,
                Fecha: fecha,
            });
        }

        // Insertar los registros en la tabla Producción
        const resultados = await Produccion.bulkCreate(registrosProduccion);

        return res.status(201).json({
            message: "Productos guardados exitosamente en Producción.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
});

export default router;
