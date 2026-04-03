CREATE TABLE recursos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    descripcion TEXT,
    tipo VARCHAR(50),
    edad_min INT,
    edad_max INT,
    imagen VARCHAR(255),
    archivo_url VARCHAR(255)
);
