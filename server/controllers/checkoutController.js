require('dotenv').config();
const moment = require('moment');
const {STRIPE_SECRET} = process.env;
const stripe = require("stripe")(STRIPE_SECRET);

module.exports = {
    submitPayment: async (req, res) => {
        const {id} = req.body.token;
        const {total} = req.body
        total *= 100;

        const charge = await stripe.charges.create({
            amount: total,
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
        let date = new Date();
        date = await moment(date).format("YYYY-MM-DD HH:mm:ss");
        const addedOrder = await db.addOrder(userID, total, date);
        for (let i = 0; i < products.length; i++) {
            db.addOrderLine(addedOrder[0].orderid, +products[i].id, +products[i].quantity);
        };
        res.status(200).send('completed adding order to database');
    }
}