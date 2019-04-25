module.exports = {
    addToCart: async (req, res) => {
        const db = req.app.get('db');
        const {id, quantity, name, price, image} = req.body;
        const checking = await db.checkInventory(quantity, id);
        if (!checking[0]) {
            res.sendStatus(500);
        } else {
            await req.session.cart.push({
                id,
                name,
                quantity,
                price,
                image
            });
            res.status(200).send(req.session.cart);
        }
    },
    removeFromCart: async (req, res) => {
        const {index} = req.body;
        req.session.cart.splice(index, 1); 
        res.status(200).send(req.session.cart);
    },
    getCart: (req, res) => {
        res.status(200).send(req.session.cart);
    },
}