module.exports = (sequelize, DataTypes) =>{

    let alias = 'instructions';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        instruction: {
            type: DataTypes.STRING
         },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
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
        },

    };

    let config = {
        tableName: 'instructions', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const instruction = sequelize.define(alias, cols, config);

    return instruction;

}