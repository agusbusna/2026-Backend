CREATE TABLE usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE espacios_trabajo (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL,
    descripcion TEXT(1000),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE membresias (
	id INT AUTO_INCREMENT PRIMARY KEY,
    rol ENUM ('user', 'admin', 'owner') DEFAULT 'user',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_id_usuario INT NOT NULL, 
    fk_id_espacio_trabajo INT NOT NULL,
    CONSTRAINT fk_membresias_ususarios FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id),
    CONSTRAINT fk_membresias_espacio_trabajo FOREIGN KEY (fk_id_espacio_trabajo) REFERENCES espacios_trabajo(id)
)

CREATE TABLE canales(
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50) NOT NULL, 
    descripcion TEXT(100), 
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_id_espacio INT NOT NULL,
    CONSTRAINT fk_canales_espacios FOREIGN KEY(fk_id_espacio) REFERENCES espacios_trabajo(id)
)

CREATE TABLE mensajes(
	id INT PRIMARY KEY AUTO_INCREMENT, 
    contenido TEXT (2000) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_id_canal INT NOT NULL,
    fk_id_membresia INT NOT NULL,
    CONSTRAINT fk_mensajes_canales FOREIGN KEY(fk_id_canal)REFERENCES canales(id),
    CONSTRAINT fk_mensajes_membresia FOREIGN KEY (fk_id_membresia) REFERENCES membresias(id)
)