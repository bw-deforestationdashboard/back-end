const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById
};

async function add(user) {
    const id = await db('users').insert(user);
    return id;
}

function get() {
    return db('users')
        .select('id', 'username', 'email');
}

function getBy(filter) {
    return db('users')
        .where(filter);
}

function getById(id) {
    return db('users')
        .where({ id })
        .first();
}