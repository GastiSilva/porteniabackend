import express from "express";
import { registrarProveedor, eliminarProveedor, obtenerProveedores } from "../controllers/ProveedoresController.js";
import { validate } from "../middleware/validate.js";
import { proveedorSchema } from "../validators/entidadSimple.schema.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerProveedor", validate(proveedorSchema), registrarProveedor);
router.delete("/removeProveedor", eliminarProveedor);
router.get("/proveedores", obtenerProveedores);

export default router;
