const router = require('express').Router();
const Users = require('./user-model.js');

router.get('/users', (req, res) => {
    Users.get()
        .then(users => {
            res.json({ users});
        })
        .catch(err => {
            res.send(err);
        })
})

module.exports = router;