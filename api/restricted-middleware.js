const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {

        console.log(secrets.jwtSecret);
        console.log(token);
        
        if (err) {
            res.status(401).json({ message: "You shall not pass son!" })
            //console.log(token);
        } else {
            req.decodedToken = decodedToken;

            next();
        }
    });
};