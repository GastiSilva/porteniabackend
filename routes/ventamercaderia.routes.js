import express from "express";
import { guardarVentaMercaderia, exportarExcellVentas, modificarCantidadVenta, obtenerVentasMercaderia } from "../controllers/VentaMercaderiaController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarVentaMercaderia", guardarVentaMercaderia);
router.post("/ExportarExcellVentas", exportarExcellVentas);
router.put("/ventasMercaderia/:id", modificarCantidadVenta);
router.get("/ventasMercaderia", obtenerVentasMercaderia);

export default router;
