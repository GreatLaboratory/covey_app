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
        isDue: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        },
        workingTime: {
            type: DataTypes.STRING(20),
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
            type: DataTypes.ENUM("식당", "카페", "술집", "편의점", "잡화매장", "독서실", "PC방", "기타"),
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