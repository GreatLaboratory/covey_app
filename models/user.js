module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },   // 여기까진 sns로그인으로 맏은 req.profile정보들
        // 아래부턴 추가로 받을 회원 정보
        // 일단 전부 allowNull처리해놓고 기입할 때 userRouter에서 Joi패키지로 무조건 값받게끔 구현
        address: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        age: {
            type: DataTypes.BIGINT(11),
            allowNull: true,
        },
        career : {
            type : DataTypes.STRING(15),
            allowNull: true
        },
        nickname : {
            type : DataTypes.STRING(15),
            allowNull: true
        },
        gender : {
            type : DataTypes.STRING(10),
            allowNull: true
        },
        univ : {
            type : DataTypes.STRING(15),
            allowNull: true
        },
        phoneNumber : {
            type : DataTypes.STRING(15),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);