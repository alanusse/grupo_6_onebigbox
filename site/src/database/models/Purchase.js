module.exports = (sequelize, DataTypes) => {
    let alias = 'purchases';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orderNumber: {
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
        tableName: 'purchases', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const Purchase = sequelize.define(alias, cols, config);

    return Purchase;
};