require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const app = express();
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

// MIDDLEWARE APPLIED TO ALL //
massive(CONNECTION_STRING).then(db => { // SET THE DB, STARTS THE SERVER
    app.set('db', db);
    app.listen(SERVER_PORT, () => console.log(`live at :${SERVER_PORT}`, 'and db is set'));
})
app.use(express.json());
app.use(session({ // SESSION CREATOR
    resave: true,
    saveUninitialized: false,
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


// LOGIN // 
app.post('/auth/login', userCtrl.login); // LOGIN TO WEBSITE
app.post('/auth/register', userCtrl.register); // REGISTER NEW ACCOUNT 
app.delete('/auth/logout'); // DELETE SESSION 
// END STORE //


// STORE //
app.get('/api/store/getAll', storeCtrl.getAll); // GET ALL PRODUCTS 
app.post('/api/store/product', storeCtrl.getByID); //GET PRODUCT BY ID
app.post('/api/store/getByCategory', storeCtrl.getByCategory);
// END STORE //


// ADMIN //


// ADMIN SERVER REQUEST // 
app.delete(`/admin/delete/:id`) // DELETE PRODUCT
app.post(`/admin/updateProduct/:id`) // UPDATE ANY PRODUCT FIELD
app.put('/admin/newProduct') // ADD NEW PRODUCT
// END ADMIN //