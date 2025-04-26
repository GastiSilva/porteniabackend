import express from "express";
import { obtenerEstructuraCompras, exportarExcelCompras, guardarCompra, obtenerStock, modificarCompra } from "../controllers/CompraController.js";

const router = express.Router();

router.get("/compras", obtenerEstructuraCompras);
router.post("/ExportarExcellCompras", exportarExcelCompras);
router.post("/GuardarCompra", guardarCompra);
router.put("/ModificarCompra", modificarCompra);
router.get("/Obtenerstock", obtenerStock);

export default router;