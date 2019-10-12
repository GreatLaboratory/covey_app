module.exports = (sequelize, DataTypes) => (
    sequelize.define("career", {
        name: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        job: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        periodNum: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        periodUnit: {
            type: DataTypes.ENUM("주", "개월", "년", "기타"),
            allowNull: true,
        },
    }, {
        tableName: 'career',
        freezeTableName: true,
    })
);