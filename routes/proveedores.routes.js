import express from "express";
import { registrarProveedor, eliminarProveedor } from "../controllers/ProveedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerProveedor", registrarProveedor);
router.delete("/removeProveedor", eliminarProveedor);

export default router;
