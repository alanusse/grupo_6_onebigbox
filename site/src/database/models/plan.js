
module.exports = (sequelize, DataTypes) =>{

    let alias = 'plans';

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

    const plan = sequelize.define(alias, cols, config);

    return plan;

}