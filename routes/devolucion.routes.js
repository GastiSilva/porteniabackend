import express from "express";
import { guardarEnDevolucion, exportarExcellDevolucion } from "../controllers/DevolucionController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarEnDevolucion", guardarEnDevolucion);
router.get("/exportarExcellDevolucion", exportarExcellDevolucion);

export default router;
