module.exports = {
    getAll: async (req, res) => { // GETS ALL PRODUCTS 
        const db  = req.app.get('db');
        const products = await db.getAllProducts(); // REQUEST TO THE DATABASE FOR ALL PRODUCTS
        if (products) {
            res.status(200).send(products);
        } else {
            res.status(404).send('Could not get all products')
        }
    }
}