import MateriaPrimaPorProducto from "../models/MateriaPrimaPorProducto.js";
import MateriaPrima from "../models/MateriaPrima.js";
import Producto from "../models/Producto.js";

export const agregarMateriaPrimaPorProducto = async (req, res) => {
    try {
        const { materiaPrimaId, productoId, cantidadNecesaria } = req.body;
        console.log(req.body);
        const materiaPrima = await MateriaPrima.findByPk(materiaPrimaId);
        if (!materiaPrima) {
            return res.status(404).json({ mensaje: "Materia prima no encontrada" });
        }
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const nuevaRelacion = await MateriaPrimaPorProducto.create({
            id_MateriaPrima: materiaPrimaId,
            id_Producto: productoId,
            cantidadNecesaria,
        });

        res.status(201).json(nuevaRelacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al agregar la relación" });
    }
};

export default {agregarMateriaPrimaPorProducto};