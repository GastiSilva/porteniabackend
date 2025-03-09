import { Router } from "express";
import  sequelize  from "../config.js";

const router = Router();

router.get('/tablasTodas', async (req, res) => {
    try {
        const query = "SELECT tablename as table_name FROM pg_catalog.pg_tables WHERE schemaname = 'public'";
        console.log("Consulta SQL:", query);

        // Ejecuta la consulta y guarda el resultado
        const [result] = await sequelize.query(query);
        console.log("Resultado completo:", JSON.stringify(result, null, 2));

        // Envía el resultado directamente sin modificaciones
        res.json(result);
    } catch (error) {
        console.error("Error al obtener las tablas:", error);
        res.status(500).json({ error: "Error al obtener las tablas" });
    }
});

export default router;
