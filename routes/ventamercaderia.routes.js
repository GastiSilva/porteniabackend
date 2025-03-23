import express from "express";
import { guardarVentaMercaderia, eliminarDeVentaMercaderia } from "../controllers/VentaMercaderiaController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/guardarVentaMercaderia", guardarVentaMercaderia);
router.delete("/eliminarDeVentaMercaderia/:id/:cantidad", eliminarDeVentaMercaderia);

export default router;
