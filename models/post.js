module.exports = (sequelize, DataTypes) => (
    sequelize.define('post', {
        title: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
         workingDate: {
             type: DataTypes.STRING(50),
             allowNull: true,
         },
        workingTime: {
             type: DataTypes.STRING(50),
             allowNull: true,
         },
        pay: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        dueDate: {
            type : DataTypes.STRING(15),
            allowNull: true
        },
        description: {
            type : DataTypes.STRING(50),
            allowNull: true
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);