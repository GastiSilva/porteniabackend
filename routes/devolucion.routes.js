import express from "express";
import { guardarEnDevolucion, exportarExcellDevolucion, eliminarDeDevolucion, modificarCantidadDevolucion, obtenerDevolucion } from "../controllers/DevolucionController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarEnDevolucion", guardarEnDevolucion);
router.post("/ExportarExcellDevolucion", exportarExcellDevolucion);
router.delete("/eliminarDeDevolucion/:id/:cantidad", eliminarDeDevolucion);
router.put("/devolucion/:id", modificarCantidadDevolucion);
router.get("/devolucion", obtenerDevolucion);

export default router;
