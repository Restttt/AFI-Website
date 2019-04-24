require('dotenv').config();
const {STRIPE_SECRET} = process.env;
const stripe = require("stripe")(STRIPE_SECRET);

module.exports = {
    submitPayment: async (req, res) => {
        const {id} = req.body.token;
        const {total} = req.body

        const charge = await stripe.charges.create({
            amount: total, // create a charge for 1700 cents USD ($17)
            currency: 'USD',
            description: 'AFI PAINT & SUPPLY',
            source: id,
        }, 
        function(err, charge) {
            if (err) {
            console.warn(err) 
            } else {
            res.status(200).send(charge)
            };
        });
    },
    updateInventory: async (req, res) => {
        const db = req.app.get('db');
        const {products} = req.body;
        for (let i = 0; i < products.length; i++) {
            await db.updateInventory(+products[i].quantity, +products[i].id);
        };
        res.status(200).send('updated inventory');
    },
    addOrder: async (req, res) => {
        const db = req.app.get('db');
        const {userID, total} = req.body;
        const {products} = req.body.products
        const addedOrder = await db.addOrder(userID, total);
        for (let i = 0; i < products.length; i++) {
            db.addOrderLine(addedOrder[0].orderid, +products[i].id, +products[i].quantity);
        };
        res.status(200).send('completed adding order to database');
    }
}