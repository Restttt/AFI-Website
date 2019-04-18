module.exports = {
    checkForLoggedIn: (req, res, next) => { //Checks if user is logged in, if they are adds cart to session
        if (req.session.user) {
            next();
        } else {
            res.status(401).send('You are not logged in');
        }
    },
    addCart: (req, res, next) => {
        if (!req.session.cart) {
            req.session.cart = [];
            next();
        } else {
            next();
        };
    },
    checkIfAdmin: (req, res, next) => { //CHECKS IF USER IS ADMIN BEFORE ALLOWING REQUEST TO THE SERVER
        if (!req.session.user.isAdmin) { // IF USER ISN'T ADMIN DENY REQUEST
            res.status(401).send('You are not an admin');
        };
        next(); // IF USER IS AN ADMIN ALLOW REQUEST
    }
};