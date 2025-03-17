import Estado from "../models/Estados.js";
// import sequelize from "../config.js";

export const obtenerEstados = async (req, res) => {
  try {
    const estados = await Estado.findAll();
    res.json(estados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los estados", details: error.message });
  }
}

export default { obtenerEstados };