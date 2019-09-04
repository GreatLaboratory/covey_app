module.exports= (sequelize, DataTypes) => (
    sequelize.define("apply", {
        matching : {
            type: DataTypes.Boolean,
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);