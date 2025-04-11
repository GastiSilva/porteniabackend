import express from "express";
import {guardarGasto} from "../controllers/GastosController.js";

const router = express.Router();

router.post("/GuardarGastos", guardarGasto);

export default router;

