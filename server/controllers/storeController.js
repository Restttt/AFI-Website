module.exports = {
    getAll: async (req, res) => { // GETS ALL PRODUCTS 
        const db  = req.app.get('db');
        const products = await db.getAllProducts(); // REQUEST TO THE DATABASE FOR ALL PRODUCTS
        if (products) {
            res.status(200).send(products);
        } else {
            res.status(404).send('Could not get all products')
        }
    },
    getByID: async (req, res) => {
        const { id } = req.body;
        const db = req.app.get('db');
        const product = await db.getProductByID(id)
        if (product[0]) {
            res.status(200).send(product[0])
        } else {
            res.status(400).send('unable to pull product');
        };
    },
    getByCategory: async (req, res) => {
        const { category } = req.body;
        const db = req.app.get('db');
        const products = await db.getAllByCategory(category);
        if (products[0]) {
            res.status(200).send(products)
        } else {
            res.status(400).send('unable to pull products in that category');
        };
    }
};