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
        recipeImage: {
            type: DataTypes.STRING
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
        },
        state: {
            type: DataTypes.TINYINT
        }
    };

    let config = {
        tableName: 'items', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const Item = sequelize.define(alias, cols, config);

    Item.associate = function(models) {
        Item.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'users'
        });
    }
    Item.associate = function(models) {
        Item.belongsTo(models.Purchases, {
            foreignKey: 'purchaseId',
            as: 'purcharse',
            allowNull: true
        });
    };

    return Item;
}