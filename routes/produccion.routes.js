import express from "express";
import { guardarEnProduccion, modificarProduccion, exportarExcellProduccion, obtenerProduccion } from "../controllers/ProduccionControler.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", guardarEnProduccion);
router.put("/produccion/:id/:cantidad", modificarProduccion);
router.post("/ExportarExcellProduccion", exportarExcellProduccion);
router.get("/produccion", obtenerProduccion);

export default router;
