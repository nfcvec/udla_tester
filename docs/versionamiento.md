# **📜 Versionamiento de Datos**  

Para evitar que cambios en la aplicación afecten pruebas pasadas, se crean versiones de cada entidad al momento de la asignación.

### **Tablas de Versionamiento**  
Cada asignación genera una versión de las siguientes entidades:

| Entidad Original | Tabla de Versionamiento |
|------------------|------------------------|
| **Pantallas** | `pantallas_versiones` |
| **Funcionalidades** | `funcionalidades_versiones` |
| **Tipos de prueba** | `tipos_prueba_versiones` |
| **Tipos de usuario** | `tipos_usuario_versiones` |
| **Sistemas operativos** | `sistemas_operativos_versiones` |
| **Casos de prueba** | `casos_prueba_versiones` |

Cada versión almacena la información vigente en ese momento, asegurando que las asignaciones pasadas sigan reflejando correctamente los datos originales.

### **Versionamiento por Módulo**

#### **Administrar Casos de Prueba**
Cada cambio en las entidades de casos de prueba se versiona para mantener un historial de modificaciones.

#### **Administrar Proceso de Prueba (Asignaciones)**
Las asignaciones y sus elementos relacionados se versionan para asegurar la integridad de las pruebas asignadas.

#### **Ejecutar Pruebas (Testers)**
Los resultados de las pruebas ejecutadas por los testers se versionan para mantener un registro histórico de los resultados.

#### **Ver Resultados (Administrador)**
Los resultados visibles para los administradores se versionan para proporcionar un historial completo de las pruebas y sus resultados.
