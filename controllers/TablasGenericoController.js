const db = require('../models'); // Assuming you are using Sequelize for database operations

class TablasGenericoController {
    constructor(modelName) {
        this.model = db[modelName];
    }

    async agregar(req, res) {
        try {
            const newItem = await this.model.create(req.body);
            res.status(201).json(newItem);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async editar(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await this.model.update(req.body, {
                where: { id: id }
            });
            if (updated) {
                const updatedItem = await this.model.findOne({ where: { id: id } });
                res.status(200).json(updatedItem);
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async eliminar(req, res) {
        try {
            const { id } = req.params;
            const deleted = await this.model.destroy({
                where: { id: id }
            });
            if (deleted) {
                res.status(204).json();
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = TablasGenericoController;