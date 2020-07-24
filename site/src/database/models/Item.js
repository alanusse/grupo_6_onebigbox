module.exports = (sequelize, DataTypes) => {
    let alias = 'Items';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER
        },
        recipeId: {
            type: DataTypes.INTEGER
        },
        recipeTitulo: {
            type: DataTypes.STRING
        },
        recipePrecio: {
            type: DataTypes.DECIMAL
        },
        recipeCant: {
            type: DataTypes.INTEGER
        },
        planId: {
            type: DataTypes.INTEGER
        },
        planTitulo: {
            type: DataTypes.STRING
        },
        planDescription: {
            type: DataTypes.STRING
        },
        planImage: {
            type: DataTypes.STRING
        },
        totalPrice: {
            type: DataTypes.DECIMAL
        },
        purchaseId: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'items', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: true
    };

    const Items = sequelize.define(alias, cols, config);

    Items.associate = models => {
        Items.hasMany(models.users, {
            alias: 'userItems',
            foreignKey: 'userId'
        })

        Items.hasMany(models.Purchases, {
            alias: 'purchasedItems',
            foreignKey: 'purchaseId'
        })
    };

    return Items;
};