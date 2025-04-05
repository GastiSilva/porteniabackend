import express from "express";
import { guardarVentaMercaderia, eliminarDeVentaMercaderia, exportarExcellVentas } from "../controllers/VentaMercaderiaController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarVentaMercaderia", guardarVentaMercaderia);
router.delete("/eliminarDeVentaMercaderia/:id/:cantidad", eliminarDeVentaMercaderia);
router.get("/ExportarExcellVentas", exportarExcellVentas);

export default router;
