import express from "express";
import {registrarVendedor, eliminarVendedor, obtenerTodosVendedores} from "../controllers/VendedoresController.js";
import { validate } from "../middleware/validate.js";
import { vendedorSchema } from "../validators/entidadSimple.schema.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerVendedor", validate(vendedorSchema), registrarVendedor);
router.delete("/removeVendedor", eliminarVendedor);
router.get("/vendedores", obtenerTodosVendedores);

export default router;
