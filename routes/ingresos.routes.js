import express from "express";
import {exportarExcellIngresos} from "../controllers/IngresosController.js";

const router = express.Router();

router.get("/ExportarExcellIngresos", exportarExcellIngresos);

export default router;
