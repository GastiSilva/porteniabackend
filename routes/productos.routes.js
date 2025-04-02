import { Router } from "express";
import {exportarExcellProductos , cargarProductos} from "../controllers/ProductosController.js";

const router = Router();


router.post('/FetchProducts', cargarProductos );
router.get("/ExportarExcellProductos", exportarExcellProductos);



export default router;
