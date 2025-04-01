import express from "express";
import { guardarEnProduccion, eliminarDeProduccion, exportarExcellProduccion } from "../controllers/ProduccionControler.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", guardarEnProduccion);
router.delete("/EliminarDeProduccion/:id/:cantidad", eliminarDeProduccion);
router.get("/ExportarExcellProduccion", exportarExcellProduccion);

export default router;
