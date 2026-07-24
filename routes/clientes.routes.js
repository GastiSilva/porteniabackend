import express from "express";
import { registrarCliente, eliminarCliente, exportarExcellClientes, obtenerClientes} from "../controllers/ClienteController.js";
import { validate } from "../middleware/validate.js";
import { clienteSchema } from "../validators/entidadSimple.schema.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerCliente", validate(clienteSchema), registrarCliente);
router.delete("/removeCliente", eliminarCliente);
router.get("/ExportarExcellClientes", exportarExcellClientes);
router.get("/clientes", obtenerClientes);

export default router;
