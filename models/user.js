module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        name: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        // address: {
        //     type: DataTypes.STRING(15),
        //     allowNull: true,
        // },
        // age: {
        //     type: DataTypes.BIGINT(11),
        //     allowNull: true,
        // },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);