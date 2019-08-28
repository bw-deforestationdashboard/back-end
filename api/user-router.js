const router = require('express').Router();
const Users = require('./user-model.js');

const restricted = require('./restricted-middleware.js');

router.get('/users', restricted, (req, res) => {
    Users.get()
        .then(users => {
            res.json({ users, decodedToken: req.decodedToken });
        })
        .catch(error => {
            res.send(error);
        });
});

router.put('/users/:id', (req, res) => {
    Users.update(req.params.id, req.body)

        .then(updated => {
            res.status(201).json(updated);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});

// delete contacts
router.delete('/users/:id', (req, res) => {
    let deleteUser = req.params.id;

    Contacts.remove(deleteUser)
        .then(deleted => {
            res.status(201).json(deleted);
        })
        .catch(err => {
            res.status(404).json(err);
        });
});


module.exports = router;