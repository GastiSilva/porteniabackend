import express from "express";
import { obtenerEstructuraIVAVentas, guardarIVAVenta, modificarIVAVentas } from "../controllers/IVAVentasController.js";

const router = express.Router();

router.get("/ivaVentas", obtenerEstructuraIVAVentas);
router.post("/GuardarIvaVentas", guardarIVAVenta);
router.put("/ivaventas/:Id_IvaVentas", modificarIVAVentas);

export default router;