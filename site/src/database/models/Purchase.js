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
        }
    };

    let config = {
        tableName: 'purchases', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: true
    };

    const Purchase = sequelize.define(alias, cols, config);

    Purchase.associate = models => {
        Purchase.belongsTo(models.users, {
            alias: 'userPurchase',
            foreignKey: 'userId'
        })
    };

    return Purchase;
};