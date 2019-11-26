require('dotenv').config();

module.exports = {
  development : {
      username : 'root',
      password : "1234",
      database : 'covey',
      host : '127.0.0.1',
      dialect : 'mysql',
  },
  production : {
      username : 'root',
      password : process.env.SEQUELIZE_PASSWORD,
      database : 'covey',
      host : '106.10.43.250',
      dialect : 'mysql',
      operatorsAliases : 'false',
      logging : 'false'
  },
    test: {
        username: "root",
        password: "1234",
        database: "covey-test",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: 'false'
    },
};