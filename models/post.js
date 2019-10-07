module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        address: {  // 수정해야함
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        pay: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        description: {
            type : DataTypes.STRING(50),
            allowNull: true,
        },
        category: {
            type: DataTypes.ENUM("CAFE", "RESTAURANT", "PC", "ETC"),
            allowNull: false,
        },
        img: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'post',
        freezeTableName: true,
    })
);