import express from "express";
import { obtenerEstructuraCompras, exportarExcellCompras } from "../controllers/CompraController.js";

const router = express.Router();

router.get("/compras", obtenerEstructuraCompras);
router.get("/ExportarExcellCompras", exportarExcellCompras);

export default router;