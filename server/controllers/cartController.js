module.exports = {
    addToCart: async (req, res) => {
        const {id, quantity, name, price, image} = req.body;
        await req.session.cart.push({
            id,
            name,
            quantity,
            price,
            image
        });
        res.status(200).send(req.session.cart);
    },
    removeFromCart: async (req, res) => {
        const {index} = req.body;
        console.log(index);
        console.log(req.session.cart);
        if (index > 0) {
            req.session.cart.splice(index, 1); 
            res.status(200).send(req.session.cart);
        } else {
            req.session.cart = [];
            res.status(200).send(req.session.cart);
        }
    },
    getCart: (req, res) => {
        res.status(200).send(req.session.cart);
    }
}