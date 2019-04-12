const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const { email, password, name, company } = req.body;
        console.log(email, password, name, company);

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
                res.status(200).send('Created an account. Please login');
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
                console.log(checkUser[0]);
                res.status(200).send(req.session.user);
            };
        };       
    },
    logout: async (req, res) => {
        await req.session.destroy();
        return res.sendStatus(200);
    }
};