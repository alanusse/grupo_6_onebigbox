-- INSERT USUARIO ADMIN

USE  BDONEBIGBOX;

-- Creo un usuario administrador con Password "admin" para que la primera vez puedan entrar al backoffice
INSERT INTO users (name, lastname, email, password, avatar, admin)
VALUES('admin', 'admin', 'admin@gmail.com', '$2a$10$ewU/1QJnk19oV5fDnUNfl.Ddg.qdjzuEW3GDPeYMNEWgi.OTkJ5r6','default.png', 1);

-- select * from users


