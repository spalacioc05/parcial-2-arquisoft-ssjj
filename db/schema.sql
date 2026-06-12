DROP TABLE IF EXISTS empleado_proyecto;
DROP TABLE IF EXISTS proyectos;
DROP TABLE IF EXISTS empleados;

CREATE TABLE empleados (
    id BIGSERIAL PRIMARY KEY,
    cedula VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) NOT NULL UNIQUE,
    cargo VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE proyectos (
    id BIGSERIAL PRIMARY KEY,
    codigo VARCHAR(30) NOT NULL UNIQUE,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    estado VARCHAR(30) NOT NULL DEFAULT 'ACTIVO',
    presupuesto NUMERIC(12,2) NOT NULL DEFAULT 0,
    creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_estado_proyecto
        CHECK (estado IN ('ACTIVO', 'EN_PAUSA', 'FINALIZADO', 'CANCELADO')),

    CONSTRAINT chk_fechas_proyecto
        CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
);

CREATE TABLE empleado_proyecto (
    id BIGSERIAL PRIMARY KEY,
    empleado_id BIGINT NOT NULL,
    proyecto_id BIGINT NOT NULL,
    rol_en_proyecto VARCHAR(100) NOT NULL,
    fecha_asignacion DATE NOT NULL DEFAULT CURRENT_DATE,

    CONSTRAINT fk_empleado
        FOREIGN KEY (empleado_id)
        REFERENCES empleados(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_proyecto
        FOREIGN KEY (proyecto_id)
        REFERENCES proyectos(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_empleado_proyecto
        UNIQUE (empleado_id, proyecto_id)
);

CREATE INDEX idx_empleados_cedula ON empleados(cedula);
CREATE INDEX idx_proyectos_estado ON proyectos(estado);
CREATE INDEX idx_empleado_proyecto_empleado ON empleado_proyecto(empleado_id);
CREATE INDEX idx_empleado_proyecto_proyecto ON empleado_proyecto(proyecto_id);
