import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import sequelize from "sequelize";

export async function guardarEnProduccion(req, res) {
    try {
        const { productos } = req.body;

        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const registrosProduccion = [];

        for (const producto of productos) {
            const { nombre, cantidad, fecha } = producto;

            const productoEncontrado = await Producto.findOne({
                where: sequelize.where(
                    sequelize.fn('LOWER', sequelize.col('Nombre')),
                    nombre.toLowerCase()
                ),
                attributes: ["Id_Producto"],
            });

            if (!productoEncontrado) {
                console.error(`Producto no encontrado: ${nombre}`);
                return res.status(404).json({
                    message: `El producto con nombre "${nombre}" no existe.`,
                });
            }

            registrosProduccion.push({
                Id_Producto: productoEncontrado.Id_Producto,
                Cantidad: cantidad,
                Fecha: fecha,
            });
        }

        const resultados = await Produccion.bulkCreate(registrosProduccion);

        return res.status(201).json({
            message: "Productos guardados exitosamente en Producción.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarEnProduccion };