import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import VentasMercaderia from "../models/VentasMercaderia.js";
import sequelize from "sequelize";

export async function guardarVentaMercaderia(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const registrosVentaMercaderia = [];

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

            registrosVentaMercaderia.push({
                id_Producto: productoEncontrado.Id_Producto,
                Cantidad: cantidad,
                Fecha: fecha,
            });
        }

        const resultados = await VentasMercaderia.bulkCreate(registrosVentaMercaderia);
        
        for (const registro of registrosVentaMercaderia) {
            const { id_Producto, Cantidad } = registro;
            const productos = await Produccion.findAll({
                where: { id_Producto },
                order: [['Fecha', 'ASC']], 
            });
            let cantidadRestante = Cantidad;
        
            for (const producto of productos) {
                if (cantidadRestante <= 0) break;    
                if (producto.Cantidad <= cantidadRestante) {
                    await producto.destroy();
                    cantidadRestante -= producto.Cantidad;
                } else {
                    await producto.update({
                        Cantidad: producto.Cantidad - cantidadRestante,
                    });
                    cantidadRestante = 0;
                }
            }
        }
        

        return res.status(201).json({
            message: "Productos guardados exitosamente en Ventas.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Ventas:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}


export async function eliminarDeVentaMercaderia(req, res) {
    try {
        const { id, cantidad } = req.params;
        console.log('ID:', id, 'Cantidad:', cantidad);

        if (!id || !cantidad) {
            console.error("Datos inválidos:", { id, cantidad });
            return res.status(400).json({ message: "Datos inválidos" });
        }

        const ventaEncontrada = await VentasMercaderia.findOne({
            where: { Id_VentaMercaderia: id },
        });

        if (!ventaEncontrada) {
            console.error(`Venta no encontrada: ${id}`);
            return res.status(404).json({
                message: `La venta con ID "${id}" no existe.`,
            });
        }

        if (ventaEncontrada.Cantidad < cantidad) {
            console.error(`Cantidad a eliminar excede la cantidad disponible: ${cantidad}`);
            return res.status(400).json({
                message: `La cantidad a eliminar excede la cantidad disponible en ventas de mercaderia.`,
            });
        }

        ventaEncontrada.Cantidad -= cantidad;

        if (ventaEncontrada.Cantidad === 0) {
            await Produccion.destroy({
                where: { Id_VentaMercaderia: id },
            });
            return res.status(200).json({
                message: "Venta de mercaderia eliminada exitosamente.",
            });
        } else {
            await ventaEncontrada.save();
            return res.status(200).json({
                message: "Cantidad eliminada exitosamente de las ventas.",
                data: ventaEncontrada,
            });
        }
    } catch (error) {
        console.error("Error al eliminar de Ventas de Mercaderia:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarVentaMercaderia, eliminarDeVentaMercaderia };