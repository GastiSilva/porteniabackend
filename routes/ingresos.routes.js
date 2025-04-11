import express from "express";
import {exportarExcellIngresos, modificarIngreso} from "../controllers/IngresosController.js";

const router = express.Router();

router.post("/ExportarExcellIngresos", exportarExcellIngresos);
router.put('/ingresos/:id_Ingreso', modificarIngreso);


export default router;
