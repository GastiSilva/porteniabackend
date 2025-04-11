import express from "express";
import {exportarExcellEgresos, guardarEgreso, obtenerTodosEgresos, modificarEgreso} from "../controllers/EgresosController.js";

const router = express.Router();

router.post("/ExportarExcellEgresos", exportarExcellEgresos);
router.post("/GuardarEgreso", guardarEgreso);
router.get("/egresos", obtenerTodosEgresos);
router.put('/egresos/:Id_Egresos', modificarEgreso);

export default router;