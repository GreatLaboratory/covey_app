module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        // 여기까진 sns로그인으로 맏은 req.profile정보들
        // 아래부턴 추가로 받을 회원 정보
        // 일단 전부 allowNull처리해놓고 기입할 때 userRouter에서 Joi패키지로 무조건 값받게끔 구현
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        gender : {
            type : DataTypes.BOOLEAN,
            allowNull: true
        },
        age: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        intro : {
            type : DataTypes.STRING(50),
            allowNull: true
        },
        address: { // 수정해야함
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        phoneNum : {
            type : DataTypes.STRING(20),
            allowNull: true
        },
        phoneNumAuth : {
            type : DataTypes.BOOLEAN,
            allowNull: true
        },
        verifyCode : {
            type : DataTypes.STRING(30),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'user',
        freezeTableName: true,
    })
);