import { Router } from "express";
import { Productos } from "../models/Producto.js";

const router = Router();

// Ruta para guardar productos
router.post("/", async (req, res) => {
    try {
        const { productos } = req.body;

        if (!Array.isArray(productos)) {
            return res.status(400).json({ message: "Formato de datos incorrecto" });
        }

        const createdProducts = await Product.bulkCreate(productos);
        res.status(201).json(createdProducts);
    } catch (error) {
        console.error("Error al guardar productos:", error);
        res.status(500).json({ message: "Error al guardar productos" });
    }
});

export default router;
