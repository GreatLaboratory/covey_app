module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
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
            allowNull: true,
        },
        img1 : {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        img2 : {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
        img3 : {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'post',
        freezeTableName: true,
    })
);