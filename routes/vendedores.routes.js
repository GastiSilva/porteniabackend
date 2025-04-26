import express from "express";
import {registrarVendedor, eliminarVendedor, obtenerTodosVendedores} from "../controllers/VendedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerVendedor", registrarVendedor);
router.delete("/removeVendedor", eliminarVendedor);
router.get("/vendedores", obtenerTodosVendedores);

export default router;
