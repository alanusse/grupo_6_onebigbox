-- CREATE SCHEMA BDONEBIGBOX;

USE  BDONEBIGBOX;

CREATE TABLE user (
	id int unsigned primary key auto_increment,
    name VARCHAR (255),
    lastname VARCHAR (255),
    email VARCHAR (50) NOT NULL,
	password VARCHAR (255) NOT NULL,
    avatar VARCHAR (255),
    rolDescription varchar (50), -- USER o ADMIN
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);

CREATE TABLE recipes (
	id int unsigned primary key auto_increment,
    titulo VARCHAR (255),
    description TEXT,
    pasos TEXT,
    ingredientes varchar (255),
    tiempopreparacion SMALLINT DEFAULT 0,
    precio DECIMAL (8,2),
    image VARCHAR (255),
    planId INT UNSIGNED DEFAULT NULL, -- Cuando no tiene plan asociado, va a ser NULL
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);

CREATE TABLE plans (
	id int unsigned primary key auto_increment,
	plan VARCHAR (255),
	description TEXT,
	image VARCHAR (255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
    
);

CREATE TABLE instructions (
	id int unsigned primary key auto_increment,
    instruction VARCHAR (255),
    description text,
    image VARCHAR (255)
);

CREATE TABLE carts(
	id int unsigned primary key auto_increment,
    userId	INT,
	recipeId INT UNSIGNED ,
    recipeTitulo VARCHAR (255),
	recipePrecio DECIMAL (8,2),
    recipeCant SMALLINT,
	planId int unsigned , -- Cuando este ID es CERO, quiere decir que el usuario compró un PLAN custom
	planTitulo VARCHAR (255),
	planDescription TEXT,
	planImage VARCHAR (255),
    totalPrice DECIMAL (8,2),
    purchaseId INT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);

CREATE TABLE  purchases(
	id int unsigned primary key auto_increment,
    orderNumber INT, 
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updateAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deleteAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);