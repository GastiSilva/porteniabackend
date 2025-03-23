import express from "express";
import { guardarEnProduccion, eliminarDeProduccion } from "../controllers/ProduccionControler.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", guardarEnProduccion);
router.delete("/EliminarDeProduccion/:id/:cantidad", eliminarDeProduccion);

export default router;
