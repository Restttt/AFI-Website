module.exports = {
    checkIfAdmin: (req, res, next) => { //CHECKS IF USER IS ADMIN BEFORE ALLOWING REQUEST TO THE SERVER
        if (!req.session.user.isAdmin) { // IF USER ISN'T ADMIN DENY REQUEST
            res.status(401).send('You are not an admin');
        };
        next(); // IF USER IS AN ADMIN ALLOW REQUEST
    }
};