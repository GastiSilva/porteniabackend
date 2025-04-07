import express from "express";
import { registrarProveedor, eliminarProveedor, obtenerProveedores } from "../controllers/ProveedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerProveedor", registrarProveedor);
router.delete("/removeProveedor", eliminarProveedor);
router.get("/proveedores", obtenerProveedores);

export default router;
