module.exports = (sequelize, DataTypes) => {
    let alias = 'Purchases';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderNumber: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        total: {
            type: DataTypes.DECIMAL
        }
    };

    let config = {
        tableName: 'purchases', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = function(models) {
        Purchase.hasMany(models.Items, {
            foreignKey: 'purchaseId',
            as: 'item-purchase'
        });
    };


    return Purchase;
};