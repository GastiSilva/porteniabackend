import express from "express";
import { registrarProveedor } from "../controllers/ProveedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerProveedor", registrarProveedor);


export default router;
