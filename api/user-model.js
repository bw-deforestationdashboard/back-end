const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById, 
    update,
    remove
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

function update(id, changes) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return getById(id);
            } else {
                return null;
            }
        });
}

function remove(id) {
    return db('users')
        .where({ id })
        .del();
}