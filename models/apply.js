module.exports= (sequelize, DataTypes) => (
    sequelize.define("apply", {}, {
        timestamps: true,
        paranoid: true,
        tableName: 'apply',
        freezeTableName: true,
        charset : 'utf8',
        collate : 'utf8_general_ci'
    })
);