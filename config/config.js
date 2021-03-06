require('dotenv').config();

module.exports = {
  development : {
      username : 'root',
      password : process.env.SEQUELIZE_PASSWORD,
      database : 'covey',
      host : '127.0.0.1',
      dialect : 'mysql',
  },
  production : {
      username : 'root',
      password : process.env.SEQUELIZE_PASSWORD,
      database : 'covey',
      host : 'localhost',
      dialect : 'mysql',
      operatorsAliases : 'false'
  },
    test: {
        username: "root",
        password: process.env.SEQUELIZE_PASSWORD,
        database: "covey-test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: 'false'
    },
};