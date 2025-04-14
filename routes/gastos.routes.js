import express from "express";
import {guardarGasto, modificarImporteGasto} from "../controllers/GastosController.js";

const router = express.Router();

router.post("/GuardarGastos", guardarGasto);
router.put("/gastosImporte/:id", modificarImporteGasto);

export default router;

