import { Router } from "express";
import Producto from "../models/Producto.js";

const router = Router();


router.post('/FetchProducts', async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);

    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
})

export default router;
