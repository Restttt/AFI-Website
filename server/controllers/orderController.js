module.exports = {
    getAllOrders: async (req, res) => {
        const db = req.app.get('db');
        let orders = await db.getAllOrders();
        res.status(200).send(orders);
    }
}