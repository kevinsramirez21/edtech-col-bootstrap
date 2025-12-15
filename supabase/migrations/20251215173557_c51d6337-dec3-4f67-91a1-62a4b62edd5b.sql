-- Paso 1: Eliminar Aula Planeta
DELETE FROM asociados WHERE id = 'add9bc04-a37c-4c50-8f2d-bbeb0c626212';

-- Paso 2: Insertar las 24 nuevas EdTechs
INSERT INTO asociados (nombre_empresa, descripcion, pagina_web, segmento, ubicacion, estado, servicios, linkedin) VALUES

-- 1. Alice
('Alice', 'Plataforma de IA para estudiar con notas inteligentes, flashcards, quizzes y simulador de exámenes. +100,000 estudiantes la usan en universidades como Oxford, MIT y Stanford.', 'https://alice.tech', 'edtech_tools', 'Dinamarca', 'activo', ARRAY['Notas inteligentes', 'Flashcards', 'Quizzes', 'Simulador de exámenes', 'IA educativa'], NULL),

-- 2. AV Integración
('AV Integración', 'Soluciones tecnológicas audiovisuales para educación: aulas interactivas, auditorios inteligentes y centros de simulación médica. Ganadores CALA Awards 2024.', 'https://integracionav.com', 'infrastructure', 'Colombia', 'activo', ARRAY['Aulas interactivas', 'Auditorios inteligentes', 'Integración AV', 'Centros de simulación'], NULL),

-- 3. BecaLab
('BecaLab', 'Plataforma de gestión de becas reconocida por MIT Innovators Under 35 LATAM 2025. Facilita el acceso a educación superior mediante tecnología.', NULL, 'edtech_tools', 'Guatemala', 'activo', ARRAY['Gestión de becas', 'Acceso a educación superior'], NULL),

-- 4. Change Americas
('Change Americas', 'Consultoría en transformación organizacional con +25 años de experiencia y +1200 clientes en LATAM. Ofrece certificaciones, HR Suite y formación empresarial.', 'https://changeamericas.com', 'capacitacion_empresarial', 'Colombia', 'activo', ARRAY['Consultoría organizacional', 'Certificaciones', 'HR Suite', 'Formación empresarial'], NULL),

-- 5. Click Clack
('Click Clack', 'Laboratorio de aprendizaje que une entretenimiento y educación (edutainment) para niños y jóvenes. Crea experiencias educativas innovadoras y memorables.', 'https://clickclack.co', 'educacion_basica', 'Colombia', 'activo', ARRAY['Edutainment', 'Experiencias educativas', 'Aprendizaje creativo', 'Contenido para niños'], NULL),

-- 6. Cronoleo
('Cronoleo', 'Red social de aprendizaje + LMS ligero + biblioteca digital. Unifica creación de cursos, tareas, foros y biblioteca de ebooks/audiolibros en streaming. Incluye módulo Tutor-Pupilo para seguimiento académico.', NULL, 'edtech_tools', 'Colombia', 'activo', ARRAY['LMS', 'Red social educativa', 'Biblioteca digital', 'Ebooks', 'Audiolibros', 'Actividades interactivas', 'Analíticas docentes'], 'https://www.linkedin.com/company/cronoleo'),

-- 7. Ecosistema de Innovación Educativa
('Ecosistema de Innovación Educativa', 'Red que conecta actores del sistema educativo para la transformación de la educación. Facilita sinergias entre instituciones, empresas y organizaciones comprometidas con la innovación educativa.', 'https://ecosistemadeinnovacioneducativa.com', 'capacitacion_empresarial', 'Colombia', 'activo', ARRAY['Networking educativo', 'Transformación educativa', 'Conexión de actores', 'Innovación educativa'], NULL),

-- 8. Edutechnia
('Edutechnia', 'La feria de educación, tecnología y empleo más grande de Colombia, realizada en Corferias. Punto de encuentro para el ecosistema EdTech nacional e internacional.', NULL, 'other', 'Colombia', 'activo', ARRAY['Feria educativa', 'Eventos EdTech', 'Networking', 'Exposición tecnológica'], NULL),

-- 9. Enyoi
('Enyoi', 'Bootcamp de programación y tecnología con formación en FullStack Developer, Python para IA, Ciberseguridad y UX Design. Programas para personas y empresas.', 'https://enyoi.co', 'educacion_continua', 'Colombia', 'activo', ARRAY['FullStack Developer', 'Python para IA', 'Ciberseguridad', 'UX Design', 'Ciencia de datos'], NULL),

-- 10. ETB
('ETB', 'Empresa de Telecomunicaciones de Bogotá. Ofrece conectividad, formación empresarial y soluciones de infraestructura tecnológica para el sector educativo.', 'https://etb.com', 'infrastructure', 'Colombia', 'activo', ARRAY['Conectividad', 'Formación empresarial', 'Infraestructura telecomunicaciones'], NULL),

-- 11. Femmapp
('Femmapp', 'Plataforma de alertas tempranas y rutas de seguimiento para prevención de bullying y violencias basadas en género en instituciones educativas. Permite reportes multimedia con enfoque pedagógico en tiempo real, adaptándose al manual de convivencia de cada colegio.', 'https://femmapp.co', 'edtech_tools', 'Colombia', 'activo', ARRAY['Alertas tempranas', 'Prevención de bullying', 'Convivencia escolar', 'Reportes multimedia', 'Rutas de seguimiento', 'Prevención VBG'], 'https://www.linkedin.com/company/femmapp'),

-- 12. Fundación Nave Eureka
('Fundación Nave Eureka', 'Fundación enfocada en educación consciente para niños y jóvenes vulnerables de Colombia. Ofrece becas, bibliotecas y programas educativos transformadores.', 'https://naveeureka.org', 'educacion_basica', 'Colombia', 'activo', ARRAY['Becas educativas', 'Bibliotecas', 'Programas educativos', 'Voluntariado', 'Educación vulnerable'], NULL),

-- 13. Grupo NODS
('Grupo NODS', 'Empresa de tecnología experta en soluciones digitales para instituciones educativas. Presencia en 12 países de LATAM y Europa con servicios de marketing, growth y analytics para educación.', 'https://gruponods.com', 'edtech_tools', 'Argentina', 'activo', ARRAY['Marketing educativo', 'Growth', 'Analytics', 'Tecnología educativa', 'Soluciones digitales'], NULL),

-- 14. Ignite Copilot
('Ignite Copilot', 'Plataforma de IA para docentes que facilita la creación de proyectos, situaciones de aprendizaje y experiencias didácticas. En expansión a LATAM.', 'https://ignitecopilot.ai', 'edtech_tools', 'España', 'activo', ARRAY['IA para docentes', 'Planificación educativa', 'Situaciones de aprendizaje', 'Proyectos educativos'], NULL),

-- 15. Nucba
('Nucba', 'Bootcamp online de programación con clases en vivo. Formación en FullStack Developer, React y Backend con certificación universitaria e internacional.', 'https://nucba.com.ar', 'educacion_continua', 'Argentina', 'activo', ARRAY['Programación FullStack', 'React', 'Backend', 'Diseño Web', 'Clases en vivo'], NULL),

-- 16. Phidias
('Phidias', 'Software de gestión académica en la nube para colegios. +400 colegios, +400,000 usuarios en 15 países. Fundado en Colombia en 2004.', 'https://phidias.com', 'edtech_tools', 'Colombia', 'activo', ARRAY['Gestión académica', 'Administración escolar', 'Matrículas', 'Comunicación escolar'], NULL),

-- 17. POK
('POK', 'Plataforma de credenciales digitales como NFTs para certificaciones educativas verificables. Permite a instituciones emitir, gestionar y verificar credenciales de forma segura.', 'https://www.pok.tech', 'edtech_tools', 'México', 'activo', ARRAY['Credenciales digitales', 'NFTs educativos', 'Certificaciones verificables', 'Blockchain educativo'], NULL),

-- 18. TeachersPro
('TeachersPro', 'Comunidad de aprendizaje y desarrollo docente con plataforma adaptativa, colaborativa y gamificada. +50,000 docentes. Alianzas con UNICEF y gobiernos de LATAM.', 'https://teacherspro.com', 'capacitacion_empresarial', 'España', 'activo', ARRAY['Formación docente', 'Desarrollo profesional', 'Cursos gamificados', 'Comunidad docente'], NULL),

-- 19. The Mindsellerz
('The Mindsellerz', 'Academia de ventas conscientes y desarrollo comercial con enfoque en mindset, propósito y técnicas de venta éticas.', NULL, 'capacitacion_empresarial', 'Colombia', 'activo', ARRAY['Ventas conscientes', 'Desarrollo comercial', 'Mindset', 'Capacitación en ventas'], NULL),

-- 20. Ticmas
('Ticmas', 'Plataforma educativa integral que acompaña el aprendizaje en cada etapa de la vida con tecnología y pedagogía innovadora impulsada por IA.', 'https://ticmas.com', 'edtech_tools', 'Argentina', 'activo', ARRAY['Plataforma educativa', 'IA educativa', 'Contenidos digitales', 'Aprendizaje adaptativo'], NULL),

-- 21. Universidad Digital de Emprendedores
('Universidad Digital de Emprendedores', 'Plataforma educativa 100% online para emprendedores. Formación en negocios digitales, marketing, ventas y automatización.', 'https://udemprendedores.com', 'educacion_continua', 'Colombia', 'activo', ARRAY['Negocios digitales', 'Marketing', 'Ventas', 'Automatización', 'Emprendimiento'], NULL),

-- 22. Universidad ICESI
('Universidad ICESI', 'Universidad privada de Cali reconocida por su calidad educativa. Ofrece pregrados, posgrados y formación continua con énfasis en innovación y emprendimiento.', 'https://icesi.edu.co', 'educacion_superior', 'Colombia', 'activo', ARRAY['Pregrados', 'Posgrados', 'Educación continua', 'Innovación educativa', 'Emprendimiento'], NULL),

-- 23. Universidad Pontificia Bolivariana
('Universidad Pontificia Bolivariana', 'Una de las universidades privadas más importantes de Colombia. 74 pregrados, 228 posgrados, múltiples sedes. Ofrece Maestría en Innovación Educativa.', 'https://upb.edu.co', 'educacion_superior', 'Colombia', 'activo', ARRAY['Pregrados', 'Posgrados', 'Formación continua', 'Innovación educativa'], NULL),

-- 24. Val-U
('Val-U', 'EdTech de educación financiera para escuelas. +4500 estudiantes, +20 colegios. Programa "Finanzas en mi Escuela" para jóvenes en Venezuela y México.', 'https://myval-u.com', 'educacion_basica', 'Venezuela', 'activo', ARRAY['Educación financiera', 'Finanzas para jóvenes', 'Programas escolares'], NULL);