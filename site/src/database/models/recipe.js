module.exports = (sequelize, DataTypes) => {
    
    let alias = 'recipes';

    let cols = {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        tiempopreparacion: {
            type: DataTypes.INTEGER
        },
        pasos: {
            type: DataTypes.TEXT
        },
        ingredientes: {
            type: DataTypes.STRING
        },
        precio: {
            type: DataTypes.DECIMAL(8,2)
        },
        image: {
            type: DataTypes.STRING
        },
        planId: {
            type: DataTypes.INTEGER
        }
    };

    let config = {
        tableName: 'recipes', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const receipes = sequelize.define(alias, cols, config);

    return receipes;
}