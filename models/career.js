module.exports = (sequelize, DataTypes) => (
    sequelize.define("career", {
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        job: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        period: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
    }, {
        tableName: 'career',
        freezeTableName: true,
    })
);