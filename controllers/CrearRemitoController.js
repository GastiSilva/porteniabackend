import Remito from "../models/Remito.js";
import RemitoProducto from "../models/RemitoProducto.js";
import sequelize from "../config.js";

export const crearRemito = async (req, res) => {
  const { Senior, Domicilio, Fecha, Id_Estado , Productos } = req.body;

  if (!Senior || !Domicilio || !Fecha || !Productos || Productos.length === 0) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  const transaction = await sequelize.transaction();

  try {
    // Guardar remito en la base de datos
    const nuevoRemito = await Remito.create(
      { Senior, Domicilio, Fecha, Id_Estado },
      { transaction }
    );

    // Asociar productos al remito
    const remitoProductos = Productos.map((prod) => ({
      Id_Remito: nuevoRemito.Id_Remito,
      Id_Producto: prod.Id_Producto || null,
      Cantidad: prod.Cantidad,
      PrecioUnit: prod.PrecioUnit,
      PrecioTotal: prod.PrecioUnit * prod.Cantidad,
    }));

    await RemitoProducto.bulkCreate(remitoProductos, { transaction });

    await transaction.commit();
    res.status(201).json({ message: "Remito guardado con éxito", remito: nuevoRemito });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: "Error al guardar el remito", details: error.message });
  }
};

export default { crearRemito };
