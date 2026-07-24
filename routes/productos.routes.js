import { Router } from "express";
import {exportarExcellProductos, crearProducto} from "../controllers/ProductosController.js";
import Producto from "../models/Producto.js";
import { validate } from "../middleware/validate.js";
import { productoSchema } from "../validators/entidadSimple.schema.js";

const router = Router();


router.post("/FetchProducts", async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);

    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
})
router.get("/ExportarExcellProductos", exportarExcellProductos);
router.post("/CrearProducto", validate(productoSchema), crearProducto);



export default router;
