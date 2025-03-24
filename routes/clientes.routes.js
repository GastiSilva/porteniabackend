import express from "express";
import { registrarCliente } from "../controllers/ClienteController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerCliente", registrarCliente);


export default router;
