import express from "express";
import { eliminarUsuario } from "../controllers/UsuarioController.js";

const router = express.Router();

router.delete("/removeUsuario", eliminarUsuario);

export default router;

