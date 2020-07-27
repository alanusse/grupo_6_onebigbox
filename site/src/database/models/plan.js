module.exports = (sequelize, DataTypes) =>{

    let alias = 'Plans';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        plan: {
            type: DataTypes.STRING
        }, 
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        }
    };

    let config = {
        tableName: 'plans', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const Plan = sequelize.define(alias, cols, config);

    //Hago la asociación con la tabla relacionada. En la foreignKey va el nombre de la columna de la clave de la tabla asociada
    Plan.associate = function(models) {
        Plan.hasMany(models.Recipes, {
            foreignKey: 'planId',
            as: 'receta'
        });
    };

    return Plan;
}