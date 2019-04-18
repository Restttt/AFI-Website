require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, STRIPE_SECRET, STRIPE_PUBLIC } = process.env;
const stripe = require("stripe")(STRIPE_SECRET);

// MIDDLEWARE APPLIED TO ALL //
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

// STIPE CHECKOUT //
app.set("view engine", "pug");
app.get("/", (req, res) =>
  res.render("index.pug", {STRIPE_PUBLIC}));

app.post("/charge", (req, res) => {
  let amount = 500;

  stripe.customers.create({
     email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer =>
    stripe.charges.create({
      amount,
      description: "Sample Charge",
         currency: "usd",
         customer: customer.id
    }))
  .then(charge => res.render("charge.pug"));
});


// MIDDLEWARE IMPORT FILES //
const authMiddle = require('./Authentication/AuthenticatorMiddle'); // Authentication middleware


// CONTROLLER IMPORT FILES //
const storeCtrl = require('./controllers/storeController'); // Store controller
const userCtrl = require('./controllers/accountController'); // User controller
const cartCtrl = require('./controllers/cartController'); // Cart controller
const orderCtrl = require('./controllers/orderController'); // ORDER CONTROLLER


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
app.post('/api/store/addItem', cartCtrl.addToCart); //ADD ITEM TO CART ON SESSION
app.post('/api/store/removeItem', cartCtrl.removeFromCart); //REMOVE ITEM ON CART ON SESSION
// END STORE //


// ADMIN //


// ADMIN SERVER REQUEST // 
app.delete(`/admin/delete/:id`) // DELETE PRODUCT
app.post(`/admin/updateProduct/:id`) // UPDATE ANY PRODUCT FIELD
app.put('/admin/newProduct') // ADD NEW PRODUCT
app.get('/admin/getOrders', orderCtrl.getAllOrders); //GET ALL ORDERS
// END ADMIN //