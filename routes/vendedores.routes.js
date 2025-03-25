import express from "express";
import {registrarVendedor, eliminarVendedor} from "../controllers/VendedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerVendedor", registrarVendedor);
router.delete("/removeVendedor", eliminarVendedor);

export default router;
