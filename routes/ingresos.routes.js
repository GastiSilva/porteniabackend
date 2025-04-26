import express from "express";
import {exportarExcellIngresos, modificarIngreso, agregarIngreso} from "../controllers/IngresosController.js";

const router = express.Router();

router.post("/ExportarExcellIngresos", exportarExcellIngresos);
router.put('/ingresos/:id_Ingreso', modificarIngreso);
router.post('/Guardaringresos', agregarIngreso);


export default router;
