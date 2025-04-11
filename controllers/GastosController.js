import { Egresos, Gastos, TipoGastos } from '../models/EgresoGastosAsosiaciones.js';

export const guardarGasto = async (req, res) => {
    try {
        const { descripcion, Importe, Id_TipoGastos, Id_Egresos } = req.body;

        // Verificar que el tipo de gasto exista
        const tipoGasto = await TipoGastos.findByPk(Id_TipoGastos);
        if (!tipoGasto) {
            return res.status(404).json({ error: 'El tipo de gasto no existe' });
        }

        // Verificar que el egreso exista
        const egreso = await Egresos.findByPk(Id_Egresos);
        if (!egreso) {
            return res.status(404).json({ error: 'El egreso no existe' });
        }

        // Crear el gasto
        const nuevoGasto = await Gastos.create({
            descripcion,
            Importe,
            Id_TipoGastos,
            Id_Egresos
          });
          

        res.status(201).json(nuevoGasto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el gasto' });
    }
};

export default {guardarGasto};