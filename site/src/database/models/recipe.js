module.exports = (sequelize, DataTypes) => {
    
    let alias = 'Recipes';

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

    const Receipe = sequelize.define(alias, cols, config);

    //Hago la asociación con la tabla asociada. En la foreignKey va el nombre de la columna de la clave de la tabla asociada
    Receipe.associate = function(models) {
        Receipe.belongsTo(models.Plans, {
            foreignKey: 'planId',
            as: 'planes'
        });
    };


    return Receipe;
}