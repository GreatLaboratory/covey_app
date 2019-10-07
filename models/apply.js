module.exports= (sequelize, DataTypes) => (
    sequelize.define("apply", {}, {
        timestamps: true,
        paranoid: true,
        tableName: 'apply',
        freezeTableName: true,
    })
);