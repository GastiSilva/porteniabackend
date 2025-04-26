import MateriaPrima from "../models/MateriaPrima.js";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

export const agregarMateriaPrima = async (req, res) => {
    try {
        const { Nombre, Fecha } = req.body;

        if (!Nombre || !Fecha) {
            return res.status(400).json({ message: "Todos los campos son obligatorios" });
        }

        const nuevaMateriaPrima = await MateriaPrima.create({
            Nombre,
            Fecha: dayjs(Fecha).utc().format(),
        });

        res.status(201).json({ message: "Materia prima agregada exitosamente", data: nuevaMateriaPrima });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al agregar materia prima" });
    }
};

export const obtenerMateriasPrimas = async (req, res) => {
    try {
        const materiasPrimas = await MateriaPrima.findAll();
        res.status(200).json({ data: materiasPrimas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener materias primas" });
    }
};

export default {agregarMateriaPrima, obtenerMateriasPrimas};