import express from "express";
import { obtenerEstructuraIVAVentas, guardarIVAVenta } from "../controllers/IVAVentasController.js";

const router = express.Router();

router.get("/ivaVentas", obtenerEstructuraIVAVentas);
router.post("/GuardarIvaVentas", guardarIVAVenta);

export default router;