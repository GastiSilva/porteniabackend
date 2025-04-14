import express from "express";
import { guardarVentaMercaderia, eliminarDeVentaMercaderia, exportarExcellVentas, modificarCantidadVenta } from "../controllers/VentaMercaderiaController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarVentaMercaderia", guardarVentaMercaderia);
router.delete("/eliminarDeVentaMercaderia/:id/:cantidad", eliminarDeVentaMercaderia);
router.post("/ExportarExcellVentas", exportarExcellVentas);
router.put("/ventasMercaderia/:id", modificarCantidadVenta);

export default router;
