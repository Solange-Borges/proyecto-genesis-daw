-- TABLA TIPOS
CREATE TABLE tipos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

-- TABLA RECURSOS
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

-- INSERTAR TIPOS
INSERT INTO tipos (nombre) VALUES
('Lección'),
('Actividad'),
('Guía'),
('Descargable');

-- INSERTAR RECURSOS
INSERT INTO recursos (titulo, descripcion, edad_min, edad_max, imagen, archivo_url, id_tipo)
VALUES 
('La creación del mundo',
'Lección visual sobre Génesis 1 con actividades para niños de 3 a 5 años',
3, 5,
'imagenes/creacion.png',
'recursos/creacion.pdf',
1),

('El arca de Noé',
'Historia bíblica con dinámica y actividad imprimible',
6, 7,
'imagenes/noe.png',
'recursos/noe.pdf',
2),

('Identidad en Dios',
'Actividad creativa para enseñar que fuimos creados a imagen de Dios',
8, 9,
'imagenes/identidad.png',
'recursos/identidad.pdf',
2);
