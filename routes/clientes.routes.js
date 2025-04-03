import express from "express";
import { registrarCliente, eliminarCliente, exportarExcellClientes} from "../controllers/ClienteController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerCliente", registrarCliente);
router.delete("/removeCliente", eliminarCliente);
router.get("/ExportarExcellClientes", exportarExcellClientes);


export default router;
