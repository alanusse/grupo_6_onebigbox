CREATE SCHEMA BDONEBIGBOX;

USE  BDONEBIGBOX;

CREATE TABLE USERS (
	id int unsigned primary key auto_increment,
    name VARCHAR (255),
    lastname VARCHAR (255),
    email VARCHAR (50) NOT NULL,
	password VARCHAR (255) NOT NULL,
    avatar VARCHAR (255),
    rolId INT UNSIGNED NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME, -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
    
    FOREIGN KEY (rolId) REFERENCES role(id)
)

-- DROP TABLE USERS;

CREATE TABLE ROLE(
	id int unsigned primary key auto_increment,
    description VARCHAR (255)
)

CREATE TABLE PLAN (
	id int unsigned primary key auto_increment,
	plan VARCHAR (255),
	description TEXT,
	image VARCHAR (255),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
)

CREATE TABLE RECIPE (
	id int unsigned primary key auto_increment,
    titulo VARCHAR (255),
    description TEXT,
    tiempopreparacion SMALLINT DEFAULT 0,
    pasos TEXT,
    precio DECIMAL (8,2),
    planId INT UNSIGNED NOT NULL,
    image VARCHAR (255),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME, -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
    
    FOREIGN KEY (planId) REFERENCES plan(id)
)

CREATE TABLE INSTRUCTION (
	id int unsigned primary key auto_increment,
    instruction VARCHAR (255),
    description text,
    image VARCHAR (255)
)


ALTER TABLE USERS
	ADD FOREIGN KEY(rolId) REFERENCES role (id);
