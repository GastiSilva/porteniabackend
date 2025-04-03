import express from "express";
import { obtenerEstructuraCompras } from "../controllers/CompraController.js";

const router = express.Router();

router.get("/compras", obtenerEstructuraCompras);

export default router;