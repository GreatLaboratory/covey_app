import Sequelize from "sequelize"

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Apply = require("./apply")(sequelize, Sequelize);

// user & post 연관관계 (user : post = 1 : N)
// 시퀄라이즈는 자동으로 Posts 테이블에 userId 컬럼을 추가한다.
db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

// user & apply 연관관계 (user : apply = 1 : N)
// 시퀄라이즈는 자동으로 Scraps 테이블에 userId 컬럼을 추가한다.
db.User.hasMany(db.Apply);
db.Apply.belongsTo(db.User);

// apply & post 연관관계 (apply : post = 1 : 1)
// 시퀄라이즈는 자동으로 Scraps 테이블에 postId컬럼을 추가한다.
db.Post.hasOne(db.Apply);
db.Apply.belongsTo(db.Post);


// 셋팅이 끝난 db를 수출한다.
// require("../models")이걸로 쓰면 됨.
module.exports = db;