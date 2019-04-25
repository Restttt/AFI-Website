require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env;


// MIDDLEWARE APPLIED TO ALL //
app.use( express.static( `${__dirname}/../build` ) );
massive(CONNECTION_STRING).then(db => { // SET THE DB, STARTS THE SERVER
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`live at :${SERVER_PORT}`, 'and db is set'));
})
app.use(express.json());
app.use(session({ // SESSION CREATOR
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 3
    }
}));

// MIDDLEWARE IMPORT FILES //
const authMiddle = require('./Authentication/AuthenticatorMiddle'); // Authentication middleware


// CONTROLLER IMPORT FILES //
const storeCtrl = require('./controllers/storeController'); // Store controller
const userCtrl = require('./controllers/accountController'); // User controller
const cartCtrl = require('./controllers/cartController'); // Cart controller
const orderCtrl = require('./controllers/orderController'); // ORDER CONTROLLER
const checkoutCtrl = require('./controllers/checkoutController'); // CHECKOUT CONTROLLER
const chartCtrl = require('./controllers/chartController'); // CHART CONTROLLER
const inventoryCtrl = require('./controllers/inventoryController'); // INVENTORY CONTROLLER
const amazonCtrl = require('./controllers/amazonController'); // AMAZON CONTROLLER
const emailCtrl = require('./controllers/emailController') //EMAIL CONTROLLER


// LOGIN // 
app.post('/auth/login', userCtrl.login); // LOGIN TO WEBSITE
app.post('/auth/register', userCtrl.register); // REGISTER NEW ACCOUNT 
app.delete('/auth/logout', userCtrl.logout); // DELETE SESSION 
app.get('/auth/getAccount', userCtrl.getAccount); // Gets session user if they refresh or return
app.post('/auth/getCustomerAddress', userCtrl.getAccountAndAddress)
// END STORE //

// STORE //
app.get('/api/store/getAll', storeCtrl.getAll); // GET ALL PRODUCTS 
app.post('/api/store/product', storeCtrl.getByID); //GET PRODUCT BY ID
app.post('/api/store/getByCategory', storeCtrl.getByCategory); //GET PRODUCTS BY CATEGORY
app.use(authMiddle.addCart); // Checks if the user already has a cart property on session, if they don't adds a cart
app.get('/api/store/getCart', cartCtrl.getCart); // GETS ALL ITEMS IN CART ON SESSION
app.post('/api/store/addItem', cartCtrl.addToCart); // CHECKS INVENTORY OF DATABASE THEN ADDS ITEM TO CART ON SESSION
app.post('/api/store/removeItem', cartCtrl.removeFromCart); //REMOVE ITEM ON CART ON SESSION
// END STORE //

// CHECKOUT //
app.post('/checkout/pay', checkoutCtrl.submitPayment); // STRIPE SUBMIT PAYMENT
app.post('/checkout/updateInventory', checkoutCtrl.updateInventory); // UPDATES INVENTORY COUNT IN DATABASE FOR EACH ITEM BOUGHT
app.put('/checkout/addOrder', checkoutCtrl.addOrder); // ADDS THE ORDER TO THE DATA BASE
// END CHECKOUT //

// EMAILS
app.post('/api/sendContact', emailCtrl.sendEmail); // SENDS EMAIL TO COMPANY THROUGH CONTACT FORM
// END EMAILS

// ADMIN //

// ADMIN MANAGEMENT REQUEST // 
app.delete(`/admin/delete/:id`) // DELETE PRODUCT
app.post(`/admin/updateProduct/:id`) // UPDATE ANY PRODUCT FIELD
app.put('/admin/newProduct') // ADD NEW PRODUCT
app.get('/admin/getOrders', orderCtrl.getAllOrders); //GET ALL ORDERS
// END ADMIN MANAGEMENT//

// CHART MANAGEMENT REQUEST //
app.get('/admin/chart/top5Products', chartCtrl.getProductSales); //GETS TOP 5 PRODUCTS SOLD
app.post('/admin/chart/5Products', chartCtrl.search5Products); //GETS 5 PRODUCTS DATA DETERMINED BY FRONT END USER
app.get('/admin/chart/top5Customers', chartCtrl.topCustomers); //GETS TOP 5 CUSTOMERS
app.get('/admin/chart/getProductNames', chartCtrl.getProductNames); //GETS ALL PRODUCT NAMES FOR SEARCH QUERY
// END CHART MANAGEMENT //

// INVENTORY MANAGEMENT REQUEST //
app.get('/admin/getInventory', inventoryCtrl.getInventory); // GETS PRODUCT NAMES AND STOCK //
app.post('/admin/updateInventory', inventoryCtrl.updateInventory); // SUBTRACTS INVENTORY BY ID OF PRODUCT AFTER PURCHASE //
app.post('/admin/changeInventory', inventoryCtrl.changeInventory); // CHANGES INVENTORY OF ITEM BY PRODUCT NAME // 
app.get('/admin/inventory/productDisplay', inventoryCtrl.getProductsAndDisplay); // GETS PRODUCTS AND CURRENT DISPLAY // 
app.post('/admin/inventory/changeDisplay', inventoryCtrl.changeDisplay); // CHANGES ITEM DISPLAY IN STORE //
app.put('/aws/getLink', amazonCtrl.getAWS); // GETS AWS LINK
app.put('/api/newProduct', inventoryCtrl.addToDataBase); // ADDS PRODUCT TO DATABASE 
// END INVENTORY MANAGEMENT //
