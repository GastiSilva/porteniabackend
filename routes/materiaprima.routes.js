import express from "express";
import {agregarMateriaPrima, obtenerMateriasPrimas} from "../controllers/MateriaPrimaController.js";
import { agregarMateriaPrimaPorProducto } from "../controllers/MateriaPrimaxProductoController.js";

const router = express.Router();

router.post("/GuardarEnMateriaPrima", agregarMateriaPrima);
router.get("/ObtenerMateriaPrima", obtenerMateriasPrimas);
router.post("/GuardarMateriaPrimaPorProducto", agregarMateriaPrimaPorProducto);

export default router;