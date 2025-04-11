import express from "express";
import { obtenerEstructuraCompras, exportarExcellCompras, guardarCompra } from "../controllers/CompraController.js";

const router = express.Router();

router.get("/compras", obtenerEstructuraCompras);
router.post("/ExportarExcellCompras", exportarExcellCompras);
router.post("/GuardarCompra", guardarCompra);

export default router;