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

            const produccionExistente = await Produccion.findOne({
                where: { id_Producto: productoEncontrado.Id_Producto },
            });

            if (produccionExistente) {
                produccionExistente.Cantidad += cantidad;
                await produccionExistente.save();
                registrosProduccion.push(produccionExistente);
            } else {
                const nuevoRegistro = await Produccion.create({
                    id_Producto: productoEncontrado.Id_Producto,
                    Cantidad: cantidad,
                });
                registrosProduccion.push(nuevoRegistro);
            }
        }

        return res.status(201).json({
            message: "Productos guardados exitosamente en Producción.",
            data: registrosProduccion,
        });
    } catch (error) {
        console.error("Error al guardar en Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}


export async function eliminarDeProduccion(req, res) {
    try {
        const { id, cantidad } = req.params;
        console.log("body: ", req.params);

        if (!id || !cantidad) {
            console.error("Datos inválidos:", { id, cantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const produccionEncontrada = await Produccion.findOne({
            where: { id_Produccion: id },
        });

        if (!produccionEncontrada) {
            console.error(`Producción no encontrada: ${id}`);
            return res.status(404).json({
                message: `La producción con ID "${id}" no existe.`,
            });
        }

        if (produccionEncontrada.Cantidad < cantidad) {
            console.error(`Cantidad a eliminar excede la cantidad disponible: ${cantidad}`);
            return res.status(400).json({
                message: `La cantidad a eliminar excede la cantidad disponible en producción.`,
            });
        }

        produccionEncontrada.Cantidad -= cantidad;

        if (produccionEncontrada.Cantidad === 0) {
            await Produccion.destroy({
                where: { id_Produccion: id },
            });
            return res.status(200).json({
                message: "Producción eliminada exitosamente.",
            });
        } else {
            await produccionEncontrada.save();
            return res.status(200).json({
                message: "Cantidad eliminada exitosamente de la producción.",
                data: produccionEncontrada,
            });
        }
    } catch (error) {
        console.error("Error al eliminar de Producción:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarEnProduccion, eliminarDeProduccion };