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
//db.Hashtag = require('./hashtag')(sequelize, Sequelize);

// user & post 연관관계 (user : post = 1 : N)
// 시퀄라이즈는 자동으로 POST모델에 userId컬럼을 추가한다.
//db.User.hasMany(db.Post);
//db.Post.belongsTo(db.User);

// post & hashtag 연관관계 (post : hashtag = N : N)
// 시퀄라이즈는 자동으로 PostHashtag라는 연결테이블을 자동으로 추가한다.
// 연결테이블엔 각 테이블의 pk인 postId와 hashTagId가 컬럼으로 들어온다.
//db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
//db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });

// user & user 연관관계 (user : user = N : N)
// 시퀄라이즈는 Follow라는 연결테이블을 만들고 userId라는 컬럼을 두 개 만들 수 없으니까 구분하기위해
// followingId, followerId라는 컬럼을 만들고 조인하기 쉽게 각각 별칭을 준다.
// db.User.belongsToMany(db.User, {
//   foreignKey: 'followingId',
//   as: 'Followers',
//   through: 'Follow',
// });
// db.User.belongsToMany(db.User, {
//   foreignKey: 'followerId',
//   as: 'Followings',
//   through: 'Follow',
// });

// 셋팅이 끝난 db를 수출한다.
// require("../models")이걸로 쓰면 됨.
module.exports = db;