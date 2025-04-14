import express from "express";
import { guardarIVACompra, modificarIVACompras } from "../controllers/IVAComprasController.js";

const router = express.Router();

router.post("/GuardarIvaCompras", guardarIVACompra);
router.put("/ivacompras/:Id_IvaCompras", modificarIVACompras);

export default router;