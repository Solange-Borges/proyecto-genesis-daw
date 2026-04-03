CREATE TABLE recursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    edad_min INT,
    edad_max INT,
    imagen VARCHAR(255),
    archivo_url VARCHAR(255),
    id_tipo INT,
    FOREIGN KEY (id_tipo) REFERENCES tipos(id)
);

CREATE TABLE tipos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

