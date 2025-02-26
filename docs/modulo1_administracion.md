# **🛠️ Módulo 1: Administración de Casos de Prueba**  

## **📌 Funcionalidad General**  
Este módulo permite a los administradores gestionar las aplicaciones y sus respectivos elementos de prueba.  

Cada aplicación en el sistema incluye las siguientes entidades:  
- **Pantallas**  
- **Funcionalidades**  
- **Tipos de prueba**  
- **Tipos de usuario**  
- **Sistemas operativos**  
- **Casos de prueba**  

El administrador tiene permisos para realizar **CRUD** en todas estas entidades.

---

## **📑 Estructura de Datos del Módulo de Administración**  

### **1. Tabla: `aplicaciones`**  
Representa cada aplicación que será sometida a pruebas.

| Campo | Tipo | Descripción |
|--------|------|-------------|
| `id` (PK) | INT | Identificador único de la aplicación |
| `nombre` | VARCHAR(255) | Nombre de la aplicación |
| `descripcion` | TEXT | Descripción general de la aplicación |

### **2. Tablas Relacionadas con `aplicaciones`**  

| Entidad | Atributos |
|---------|----------|
| **Pantallas** | `id` (PK), `aplicacion_id` (FK), `nombre` |
| **Funcionalidades** | `id` (PK), `aplicacion_id` (FK), `nombre` |
| **Tipos de prueba** | `id` (PK), `aplicacion_id` (FK), `nombre` |
| **Tipos de usuario** | `id` (PK), `aplicacion_id` (FK), `nombre` |
| **Sistemas operativos** | `id` (PK), `aplicacion_id` (FK), `nombre` |
| **Casos de prueba** | `id` (PK), `aplicacion_id` (FK), `pantalla_id` (FK), `funcionalidad_id` (FK), `tipo_prueba_id` (FK), `tipo_usuario_id` (FK), `so_id` (FK), `paso_a_paso` (TEXT) |

---

## **📜 Versionamiento en el Módulo de Administración**

Cada cambio en las entidades de casos de prueba se versiona para mantener un historial de modificaciones. Las tablas de versionamiento incluyen:

- `pantallas_versiones`
- `funcionalidades_versiones`
- `tipos_prueba_versiones`
- `tipos_usuario_versiones`
- `sistemas_operativos_versiones`
- `casos_prueba_versiones`
