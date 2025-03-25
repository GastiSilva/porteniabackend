import express from "express";
import { registrarCliente, eliminarCliente} from "../controllers/ClienteController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerCliente", registrarCliente);
router.delete("/removeCliente", eliminarCliente);


export default router;
