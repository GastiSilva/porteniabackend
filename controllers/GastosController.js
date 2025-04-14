import { Egresos, Gastos, TipoGastos } from '../models/EgresoGastosAsosiaciones.js';

export const guardarGasto = async (req, res) => {
    try {
        const { descripcion, Importe, Id_TipoGastos, Id_Egresos } = req.body;

        const tipoGasto = await TipoGastos.findByPk(Id_TipoGastos);
        if (!tipoGasto) {
            return res.status(404).json({ error: 'El tipo de gasto no existe' });
        }

        const egreso = await Egresos.findByPk(Id_Egresos);
        if (!egreso) {
            return res.status(404).json({ error: 'El egreso no existe' });
        }

        const gastoExistente = await Gastos.findOne({
            where: {
                Id_TipoGastos,
                Id_Egresos
            }
        });
        if (gastoExistente) {
            gastoExistente.Importe = parseFloat(gastoExistente.Importe) + parseFloat(Importe);
            await gastoExistente.save();
            return res.status(200).json(gastoExistente);
        }

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


export const modificarImporteGasto = async (req, res) => {
    try {
        const { id } = req.params;
        const { Importe } = req.body;

        const gasto = await Gastos.findByPk(id);
        if (!gasto) {
            return res.status(404).json({ error: 'El gasto no existe' });
        }

        gasto.Importe = Importe;
        await gasto.save();

        res.status(200).json(gasto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al modificar el importe del gasto' });
    }
};
export default {guardarGasto, modificarImporteGasto};