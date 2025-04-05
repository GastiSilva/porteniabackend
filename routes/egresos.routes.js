import express from "express";
import {exportarExcellEgresos} from "../controllers/EgresosController.js";

const router = express.Router();

router.get("/ExportarExcellEgresos", exportarExcellEgresos);

export default router;