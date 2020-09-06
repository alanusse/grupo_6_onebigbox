
/*
module.exports = {
  "development": {
      "username": "root",
      "password": "root",
      "database": "BDONEBIGBOX",
      "host":     "127.0.0.1",
      "port":     "8889",
      "dialect":  "mysql"
  },
  "test": {
      "username": "root",
      "password": "root",
      "database": "database_test",
      "host":     "127.0.0.1",
      "port":     "8889",
      "dialect":  "mysql"
  },
  "production": {
      "username": "root",
      "password": "root",
      "database": "database_production",
      "host":     "127.0.0.1",
      "port":     "8889",
      "dialect":  "mysql"
  }
}
*/
/** CONFIGURACIÓN WINDOWS */

module.exports = {
    "development": {
    "username": "root",
    "password": "",
    "database": "bdonebigbox",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql",
    "define": {
        "underscored": false,
        "paranoid": true
    }
    },
    "test": {
    "username": "root",
    "password": "",
    "database": "database_test",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql"
    },
    "production": {
    "username": "root",
    "password": "",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
    }
 }