-- Creacion de la tabla article

CREATE TABLE article (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    brand VARCHAR(80) NOT NULL,
    activation_status BOOLEAN DEFAULT TRUE,
    modification_date TIMESTAMP
);

-- Cargas de ejemplo

INSERT INTO article (name, brand) 
    VALUES ('SMART TV','SAMSUNG'),
        ('SMART TV','LG'),
        ('MOUSE','LOGITECH'),
        ('KEYBOARD','LOGITECH'),
        ('VIDEO CARD','NVIDIA'),
        ('VIDEO CARD','AMD');


        CREATE TABLE user (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(80) NOT NULL,
    password VARCHAR(80) NOT NULL,
    modification_date TIMESTAMP
);
