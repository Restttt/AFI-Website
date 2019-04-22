const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { email, password, name, company } = req.body;

        const checkUser = await db.getUserByEmail(email);

        if (checkUser[0]) {
            res.status(409).send('Email is already in use. Please use another email');
        } else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const createUser = await db.registerNewUser(email, hash, name, company);
            if (!createUser[0]) {
                res.status(409).send('Failed to create account. Please make sure all forms are filled correctly');
            } else {
                const {address1, address2, city, state, zipcode} = req.body;
                await db.registerAddress(address1, address2, city, state, zipcode, createUser[0].customerid);
                delete createUser[0].customer_hash;
                req.session.user = createUser[0];
                res.status(200).send(req.session.user);
            };
        };
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const { email, password } = req.body;

        const checkUser = await db.getUserByEmail(email);
        if (!checkUser[0]) {
            res.status(401).send('Unable to find an account with that email. Email is case sensitive');
        } else {
            const authenticated = bcrypt.compareSync(password, checkUser[0].customer_hash);
            if (!authenticated) {
                res.status(403).send('Incorrect password.');
            } else {
                delete checkUser[0].customer_hash;
                req.session.user = checkUser[0];
                res.status(200).send(req.session.user);
            };
        };       
    },
    logout: async (req, res) => {
        await req.session.destroy();
        return res.sendStatus(200);
    },
    getAccount: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user);
        } else {
            res.sendStatus(200);
        }
    },
    getAccountAndAddress: async (req, res) => {
        const { email } = req.body;
        const db = req.app.get('db');
        const getAddress = await db.getAddressAndCustomer(email);
        if (!getAddress[0]) {
            res.status(401).send('unable to pull account info');
        } else {
            delete getAddress[0].customer_hash;
            delete getAddress[0].addressid;
            delete getAddress[0].customerid;
            res.status(200).send(getAddress[0]);
        }
    }
};