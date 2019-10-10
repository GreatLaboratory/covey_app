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
        period: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
    }, {
        tableName: 'career',
        freezeTableName: true,
    })
);