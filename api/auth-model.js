const db = require('../data/dbConfig');

module.exports = {
    add,
    find,
    findBy,
    findById
};

// Add email
function find() {
    return db('users').select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users').where(filter);
}

async function add(user) {
    console.log('inside auth-model.js')
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}