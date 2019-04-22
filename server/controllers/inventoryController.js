module.exports = {
    getInventory: async (req, res) => {
        const db = req.app.get('db');
        const inventory = await db.getInventory();
        res.status(200).send(inventory);
    },
    updateInventory: async (req, res) => {
        const db = req.app.get('db');
        const {name, inventory} = req.body;
        await db.updateInventory(inventory, name);
        res.sendStatus(200)
    },
    getProductsAndDisplay: async (req, res) => {
        const db = req.app.get('db');
        const products = await db.getProductsAndDisplay();
        products ? res.status(200).send(products) : res.status(400).send(`couldn't get at this time`);
    }
}