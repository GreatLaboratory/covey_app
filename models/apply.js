module.exports= (sequelize, DataTypes) => (
    sequelize.define("apply", {
        matching : {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);