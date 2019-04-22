require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING, STRIPE_SECRET, STRIPE_PUBLIC, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;
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
const chartCtrl = require('./controllers/chartController'); // CHART CONTROLLER
const inventoryCtrl = require('./controllers/inventoryController'); // INVENTORY CONTROLLER


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

// AWS //
app.get('/sign-s3', (req, res) => {

  aws.config = {
    region: 'us-east-2',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});
// END AWS //

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
app.post('/admin/updateInventory', inventoryCtrl.updateInventory); // UPDATES INVENTORY BY NAME OF PRODUCT //
app.get('/admin/inventory/productDisplay', inventoryCtrl.getProductsAndDisplay); // GETS PRODUCTS AND CURRENT DISPLAY // 
// END INVENTORY MANAGEMENT //
