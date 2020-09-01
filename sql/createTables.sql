CREATE SCHEMA BDONEBIGBOX;

-- USE  BDONEBIGBOX;

CREATE TABLE users (
	id int unsigned primary key auto_increment,
    name VARCHAR (255),
    lastname VARCHAR (255),
    email VARCHAR (50) NOT NULL,
	password VARCHAR (255) NOT NULL,
    avatar VARCHAR (255),
    admin TINYINT, -- USER o ADMIN
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deletedAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
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
    planId INT UNSIGNED,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deletedAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);

CREATE TABLE plans (
	id int unsigned primary key auto_increment,
	plan VARCHAR (255),
	description TEXT,
	image VARCHAR (255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deletedAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
    
);

CREATE TABLE items(
	id int unsigned primary key auto_increment,
    userId	INT UNSIGNED,
	recipeId INT UNSIGNED,
    recipeTitulo VARCHAR (255),
	recipePrecio DECIMAL (8,2),
	recipeImage VARCHAR (255),
    recipeCant SMALLINT,
	planId int unsigned , -- Cuando este ID es CERO, quiere decir que el usuario compró un PLAN custom
	planTitulo VARCHAR (255),
	planDescription TEXT,
	planImage VARCHAR (255),
    totalPrice DECIMAL (8,2),
    purchaseId INT UNSIGNED DEFAULT NULL,
	state 	TINYINT, -- 1: Abierto o 0: Cerrato
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deletedAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);

CREATE TABLE  purchases(
	id int unsigned primary key auto_increment,
    orderNumber INT UNSIGNED,
    userId INT UNSIGNED,
	total DECIMAL (8,2), 
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Fecha de Alta
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, -- Fecha de Modificación
    deletedAt DATETIME -- Fecha de borrado del registro. Cuando se haga un select * from user where deleteAt is not null
);


ALTER TABLE recipes
ADD FOREIGN KEY (planId) REFERENCES plans(id);

ALTER TABLE items
ADD FOREIGN KEY (userId) REFERENCES users(id);

ALTER TABLE items
ADD FOREIGN KEY (purchaseId) REFERENCES purchases(id);

ALTER TABLE purchases
ADD FOREIGN KEY (userId) REFERENCES users(id);

-- items - user
-- items - purchases
-- users - purchases