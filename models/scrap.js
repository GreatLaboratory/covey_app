module.exports= (sequelize, DataTypes) => (
    sequelize.define("scrap", {

    }, {
        timestamps: true,
        paranoid: true,
    })
);