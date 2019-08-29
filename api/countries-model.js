const db = require('../data/dbConfig');

module.exports = {
    add,
    get,
    getBy,
    getById,
    update,
    remove
};

async function add(country) {
    const [id] = await db('country').insert(country);
}