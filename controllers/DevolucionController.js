import Produccion from "../models/Produccion.js";
import Producto from "../models/Producto.js";
import Devolucion from "../models/Devolucion.js";
import sequelize from "sequelize";

export async function guardarEnDevolucion(req, res) {
    try {
        const { productos } = req.body;
        if (!productos || !Array.isArray(productos)) {
            console.error("Datos inválidos:", productos);
            return res.status(400).json({ message: "Datos inválidos" });
        }
        const registrosDevolucion = [];

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

            registrosDevolucion.push({
                id_Producto: productoEncontrado.Id_Producto,
                Cantidad: cantidad,
                Fecha: fecha,
            });
        }

        const resultados = await Devolucion.bulkCreate(registrosDevolucion);
        
        for (const registro of registrosDevolucion) {
            const { id_Producto, Cantidad } = registro;
            const productos = await Produccion.findAll({
                where: { id_Producto },
                order: [['Fecha', 'ASC']], 
            });
            console.log('🟢 Productos encontrados:', productos);
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
            message: "Productos guardados exitosamente en Producción.",
            data: resultados,
        });
    } catch (error) {
        console.error("Error al guardar en Devolucion:", error);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export default { guardarEnDevolucion };