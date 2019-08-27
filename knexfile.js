    
module.exports = {

  development: {
    client: 'sqlite3' ,

    useNullAsDefault: true,

    connection: {
      filename: './api/project.sqlite3'
    }
  } ,

  migrations: {
    directory: './migrations'
  } ,
}