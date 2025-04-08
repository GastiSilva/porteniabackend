import express from "express";
import {exportarExcellEgresos, guardarEgreso, obtenerTodosEgresos} from "../controllers/EgresosController.js";

const router = express.Router();

router.post("/ExportarExcellEgresos", exportarExcellEgresos);
router.post("/GuardarEgreso", guardarEgreso);
router.get("/egresos", obtenerTodosEgresos);

export default router;