// -- Imports -- //
    const router = require('express').Router();
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

// -- Models -- //
    const auth_model = require('./auth-model');

    
// Went ahead and made the connections here make sure evrything works fine on your end.
const secrets = require('../config/secrets.js')
// const project_DB = require('../data/dbConfig.js');


// -- GET -- //
    router.get('/', async(req,res) => {
        console.log('authRouter get/')
        res.status(200).json( {message: 'successful test GET/ route'});
    })


// -- POST -- //
    // Register endpoint
        /* Accepted Shape
            {
                "username":"testUser",
                "password":"testUser",
                "email": "testUser@gmail.com",
            }
        */

    router.post('/register', (req, res) => {
        let user = req.body;
        console.log('user', user)

        console.log('user', user)
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
        console.log('user', user)

        try {
            auth_model.add(user)
                .then(user => {
                    res.status(201).json(user);
                })
                .catch(err => {
                    res.status(500).json(err);
                });
        } catch {
            res.status(500).json( { error: 'FAILURE'});
        }
    });

    // Login endpoint
    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        auth_model.findBy({ username })
            .first()
            .then(user => {

                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user);
                

                    res.status(200).json({ message: `Welcome ${user.username}!`, token, user });
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