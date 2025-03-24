import express from "express";
import {registrarVendedor} from "../controllers/VendedoresController.js";

const router = express.Router();

// Ruta para guardar los datos
router.post("/registerVendedor", registrarVendedor);


export default router;
