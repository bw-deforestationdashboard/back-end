    
module.exports = {
  development: {
    client: 'sqlite3' ,

    useNullAsDefault: true,

    connection: {
      filename: './data/project.sqlite3'
    },

    migrations: {
      directory: './migrations'
    },
    seeds: {

    }
  },
}