-- Archivo para create e insert de las tablas

-- Creacion de la tabla user

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(80) NOT NULL,
  password VARCHAR(255) NOT NULL,
  modification_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Creacion de la tabla article

CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    brand VARCHAR(80) NOT NULL,
    activation_status BOOLEAN DEFAULT TRUE,
    modification_date TIMESTAMP
);

-- Cargas de ejemplo para user

INSERT INTO "user" (user_name, password) 
    VALUES ('Flexxus','admin'),
        ('Rodrigo','pass1234');

-- Cargas de ejemplo para article

INSERT INTO article (name, brand) 
    VALUES ('SMART TV','SAMSUNG'),
        ('SMART TV','LG'),
        ('MOUSE','LOGITECH'),
        ('KEYBOARD','LOGITECH'),
        ('VIDEO CARD','NVIDIA'),
        ('VIDEO CARD','AMD');
