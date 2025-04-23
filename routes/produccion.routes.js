import express from "express";
import { guardarEnProduccion, modificarProduccion, exportarExcellProduccion } from "../controllers/ProduccionControler.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", guardarEnProduccion);
router.put("/produccion/:id/:cantidad", modificarProduccion);
router.post("/ExportarExcellProduccion", exportarExcellProduccion);

export default router;
