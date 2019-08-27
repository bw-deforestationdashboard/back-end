const router = require('express').Router();
const Auth = require('./auth-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Went ahead and made the connections here make sure evrything works fine on your end.
const secrets = require('../config/secrets.js')
//const db = require('../data/dbConfig.js');


// Register endpoint
router.post('/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Auth.add(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Auth.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user);

                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch(error => {
            res.status(500).json({ message: "We ran into an error retreving the specified request." });
        });
});

// Token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        email: user.email,
    };
    const options = {
        expiresIn: '1h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;