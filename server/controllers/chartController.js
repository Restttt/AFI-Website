module.exports = {
    getProductSales: async (req, res) => {
        const db = req.app.get('db');
        const productSales = await db.getProductSales();
        let products = [];
        let quantities = [];
        await productSales.map(product => {
            products.push(product.productname);
            quantities.push(+product.quantitycount);
            return;
        })
        res.status(200).send([quantities, products]);
    },
    search5Products: async (req, res) => {
        const db = req.app.get('db');
        const {one, two, three, four, five} = req.body;
        const fiveProducts = await db.get5ProductsByName(one, two, three, four, five);
        if (fiveProducts) {
            let products = [];
            let quantities = [];
            await fiveProducts.map(product => {
                products.push(product.productname);
                quantities.push(+product.quantitycount);
                return;
            })
            res.status(200).send([quantities, products]);
        } else {
            res.status(401).send('could not find any of those products. Please check your spelling');
        };
    },
    topCustomers: async (req, res) => {
        const db = req.app.get('db');
        const topCustomers = await db.getTop5Customers();
        if (topCustomers) {
            let customer = [];
            let total = [];
            await topCustomers.map(person => {
                customer.push(person.name);
                total.push(+person.total);
            return;
            })
            res.status(200).send([total, customer]);
        } else {
            res.status(400).send('could not get top customers');
        };
    },
    getProductNames: async (req, res) => {
        const db = req.app.get('db');
        const productNames = await db.getAllProductNames();
        if (productNames) {
            res.status(200).send(productNames);
        } else {
            res.status(400).send('unable to get product names');
        };
    }
};