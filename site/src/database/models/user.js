module.exports = (sequelize, DataTypes) =>{

    let alias = 'users';

    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
         },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING
        },
        rolDescription: {
            type: DataTypes.TINYINT
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
        tableName: 'users', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const user = sequelize.define(alias, cols, config);

    return user;

}