import express from "express";
import { guardarIVACompra } from "../controllers/IVAComprasController.js";

const router = express.Router();

router.post("/GuardarIvaCompras", guardarIVACompra);

export default router;