import express from "express";
import { guardarEnProduccion } from "../controllers/ProduccionControler.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/SaveInProduccion", guardarEnProduccion);

export default router;
