module.exports = (sequelize, DataTypes) => {
    let alias = 'carts';

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
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updateAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        deleteAt: {
            type: DataTypes.DATE       
        }
    };

    let config = {
        tableName: 'carts', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    return Cart;
};