import TipoGastos from "../models/TipoGastos.js";

export const obtenerTipoGastos = async (req, res) => {
    try {
        const tipoGastos = await TipoGastos.findAll();
        res.status(200).json(tipoGastos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los tipos de gastos" });
    }
};

export default {
    obtenerTipoGastos
};