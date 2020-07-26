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
        admin: {
            type: DataTypes.BOOLEAN // USER: 0 o ADMIN:1
        }
    };

    let config = {
        tableName: 'users', // El nombre de la tabla hay que ponerlo acá solo si no coincide con el nombre anteriormente usado. En este caso coincide pero lo pongo por buena práctica
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    return User;

}