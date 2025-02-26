# **📝 Módulo 2: Asignación de Pruebas**  

## **📌 Funcionalidad General**  
Este módulo permite al administrador organizar pruebas específicas, asignarlas a testers y controlar la ejecución.

Cada **asignación de pruebas** contiene los siguientes elementos:  
- **Aplicación a probar**  
- **Funcionalidades afectadas**  
- **Casos de prueba a ejecutar**  
- **Testers asignados**  

El administrador puede ver un listado de todas las asignaciones activas e históricas y realizar las siguientes acciones:  
- **Crear una nueva asignación**  
- **Editar o eliminar asignaciones**  
- **Seleccionar testers y asignarles casos de prueba específicos**  
- **Monitorear el estado de las pruebas asignadas**  

---

## **📑 Estructura de Datos del Módulo de Asignación**  

### **1. Tabla: `asignaciones`**  
Define cada asignación de prueba creada.

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` (PK) | INT | Identificador único de la asignación |
| `nombre` | VARCHAR(255) | Nombre de la asignación |
| `descripcion` | TEXT | Descripción breve |
| `aplicacion_id` (FK) | INT | Referencia a la aplicación |
| `fecha_creacion` | TIMESTAMP | Fecha de creación |
| `estado` | ENUM('pendiente', 'en_progreso', 'completada') | Estado de la asignación |

---

### **2. Tablas Relacionadas con `asignaciones`**  

#### **`asignacion_funcionalidades`**  
Relaciona la asignación con las funcionalidades que serán probadas.

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` (PK) | INT | Identificador único |
| `asignacion_id` (FK) | INT | Referencia a la asignación |
| `funcionalidad_id` (FK) | INT | Funcionalidad en evaluación |

#### **`asignacion_testers`**  
Relaciona la asignación con los testers involucrados (extraídos de **Graph/Users**).

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` (PK) | INT | Identificador único |
| `asignacion_id` (FK) | INT | Referencia a la asignación |
| `tester_id` | VARCHAR(255) | ID del tester |

#### **`asignacion_casos`**  
Asocia los casos de prueba con los testers dentro de la asignación.

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` (PK) | INT | Identificador único |
| `asignacion_id` (FK) | INT | Referencia a la asignación |
| `caso_prueba_version_id` (FK) | INT | Versión del caso de prueba asignado |
| `tester_id` | VARCHAR(255) | ID del tester asignado |
| `estado` | ENUM('pendiente', 'en_progreso', 'completado') | Estado del caso de prueba |

---

## **📜 Versionamiento en el Módulo de Asignación**

Cada asignación y sus elementos relacionados se versionan para asegurar la integridad de las pruebas asignadas. Las tablas de versionamiento incluyen:

- `asignacion_funcionalidades_versiones`
- `asignacion_testers_versiones`
- `asignacion_casos_versiones`
