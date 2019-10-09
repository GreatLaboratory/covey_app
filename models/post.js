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
        address1 : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        address2 : {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        address3 : {
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
        img1 : {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        img2 : {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        img3 : {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'post',
        freezeTableName: true,
    })
);