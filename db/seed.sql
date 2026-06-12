INSERT INTO empleados (cedula, nombre, apellido, correo, cargo, area) VALUES
('1001234567', 'Santiago', 'Palacio', 'santiago.palacio@empresa.com', 'Desarrollador Backend', 'Tecnologia'),
('1002345678', 'Sarai', 'Restrepo', 'sarai.restrepo@empresa.com', 'Analista QA', 'Calidad'),
('1003456789', 'Juan Pablo', 'Herrera', 'juan.herrera@empresa.com', 'Arquitecto Junior', 'Tecnologia'),
('1004567890', 'Jimena', 'Munoz', 'jimena.munoz@empresa.com', 'Disenadora Frontend', 'Producto');

INSERT INTO proyectos (codigo, nombre, descripcion, fecha_inicio, fecha_fin, estado, presupuesto) VALUES
('PRY-001', 'Sistema de Gestion de Inventario', 'Sistema para controlar productos, entradas, salidas y existencias.', '2026-06-01', '2026-08-30', 'ACTIVO', 15000000),
('PRY-002', 'Portal de Empleados', 'Aplicacion web para consultar informacion interna de empleados.', '2026-05-15', '2026-07-31', 'ACTIVO', 10000000),
('PRY-003', 'Automatizacion de Pruebas', 'Proyecto para automatizar pruebas funcionales de servicios web.', '2026-06-10', NULL, 'EN_PAUSA', 7000000);

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'Lider Backend', '2026-06-02'
FROM empleados e, proyectos p
WHERE e.cedula = '1001234567' AND p.codigo = 'PRY-001';

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'Analista de Pruebas', '2026-06-03'
FROM empleados e, proyectos p
WHERE e.cedula = '1002345678' AND p.codigo = 'PRY-001';

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'Arquitecto de Solucion', '2026-05-16'
FROM empleados e, proyectos p
WHERE e.cedula = '1003456789' AND p.codigo = 'PRY-002';

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'Frontend Developer', '2026-05-17'
FROM empleados e, proyectos p
WHERE e.cedula = '1004567890' AND p.codigo = 'PRY-002';

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'QA Automation', '2026-06-11'
FROM empleados e, proyectos p
WHERE e.cedula = '1002345678' AND p.codigo = 'PRY-003';

INSERT INTO empleado_proyecto (empleado_id, proyecto_id, rol_en_proyecto, fecha_asignacion)
SELECT e.id, p.id, 'Apoyo Tecnico', '2026-06-12'
FROM empleados e, proyectos p
WHERE e.cedula = '1001234567' AND p.codigo = 'PRY-003';
