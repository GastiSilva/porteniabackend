import express from "express";
import {obtenerTipoGastos} from "../controllers/TipoGastosController.js";

const router = express.Router();

router.get("/tipogastos", obtenerTipoGastos);

export default router;
