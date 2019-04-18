module.exports = {
    getAllOrders: async (req, res) => {
        const db = req.app.get('db');
        let orders = await db.getAllOrders();
        console.log(orders);
        res.status(200).send(orders);
    }
}