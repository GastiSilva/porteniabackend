import express from "express";
import {agregarMateriaPrima} from "../controllers/MateriaPrimaController.js";

const router = express.Router();

router.post("/GuardarEnMateriaPrima", agregarMateriaPrima);

export default router;