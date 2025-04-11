import express from "express";
import { guardarEnDevolucion, exportarExcellDevolucion, eliminarDeDevolucion } from "../controllers/DevolucionController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarEnDevolucion", guardarEnDevolucion);
router.post("/ExportarExcellDevolucion", exportarExcellDevolucion);
router.delete("/eliminarDeDevolucion/:id/:cantidad", eliminarDeDevolucion);

export default router;
