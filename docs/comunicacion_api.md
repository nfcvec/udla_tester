# **📡 Comunicación con la API**

## **📌 Endpoints Principales**

La API de UDLA Tester proporciona varios endpoints para gestionar las entidades del sistema. A continuación, se describen los endpoints principales y cómo utilizarlos.

### **1. Aplicaciones**

- **Crear Aplicación**
  - **POST** `/aplicaciones`
  - **Body**: `{ "nombre": "Nombre de la aplicación", "descripcion": "Descripción de la aplicación" }`

- **Obtener Aplicación por ID**
  - **GET** `/aplicaciones/{id}`

- **Actualizar Aplicación**
  - **PUT** `/aplicaciones/{id}`
  - **Body**: `{ "nombre": "Nuevo nombre", "descripcion": "Nueva descripción" }`

- **Eliminar Aplicación**
  - **DELETE** `/aplicaciones/{id}`

### **2. Pantallas**

- **Crear Pantalla**
  - **POST** `/pantallas`
  - **Body**: `{ "nombre": "Nombre de la pantalla", "aplicacion_id": 1 }`

- **Obtener Pantalla por ID**
  - **GET** `/pantallas/{id}`

- **Actualizar Pantalla**
  - **PUT** `/pantallas/{id}`
  - **Body**: `{ "nombre": "Nuevo nombre", "aplicacion_id": 1 }`

- **Eliminar Pantalla**
  - **DELETE** `/pantallas/{id}`

### **3. Funcionalidades**

- **Crear Funcionalidad**
  - **POST** `/funcionalidades`
  - **Body**: `{ "nombre": "Nombre de la funcionalidad", "aplicacion_id": 1 }`

- **Obtener Funcionalidad por ID**
  - **GET** `/funcionalidades/{id}`

- **Actualizar Funcionalidad**
  - **PUT** `/funcionalidades/{id}`
  - **Body**: `{ "nombre": "Nuevo nombre", "aplicacion_id": 1 }`

- **Eliminar Funcionalidad**
  - **DELETE** `/funcionalidades/{id}`

### **4. Casos de Prueba**

- **Crear Caso de Prueba**
  - **POST** `/casos_prueba`
  - **Body**: `{ "paso_a_paso": "Descripción del caso", "funcionalidad_id": 1, "so_id": 1, "tipo_prueba_id": 1, "pantalla_id": 1, "aplicacion_id": 1, "tipo_usuario_id": 1 }`

- **Obtener Caso de Prueba por ID**
  - **GET** `/casos_prueba/{id}`

- **Actualizar Caso de Prueba**
  - **PUT** `/casos_prueba/{id}`
  - **Body**: `{ "paso_a_paso": "Nueva descripción", "funcionalidad_id": 1, "so_id": 1, "tipo_prueba_id": 1, "pantalla_id": 1, "aplicacion_id": 1, "tipo_usuario_id": 1 }`

- **Eliminar Caso de Prueba**
  - **DELETE** `/casos_prueba/{id}`

### **5. Versionamiento**

- **Obtener Versión de Pantalla por ID**
  - **GET** `/pantallas_versiones/{id}`

- **Obtener Versión de Funcionalidad por ID**
  - **GET** `/funcionalidades_versiones/{id}`

- **Obtener Versión de Tipo de Prueba por ID**
  - **GET** `/tipos_prueba_versiones/{id}`

- **Obtener Versión de Tipo de Usuario por ID**
  - **GET** `/tipos_usuario_versiones/{id}`

- **Obtener Versión de Sistema Operativo por ID**
  - **GET** `/sistemas_operativos_versiones/{id}`

- **Obtener Versión de Caso de Prueba por ID**
  - **GET** `/casos_prueba_versiones/{id}`

---

## **📌 Ordenar, Filtrar y Paginar Resultados**

### **Ordenar Resultados**

Para ordenar los resultados, se puede utilizar el parámetro `sorts` en las solicitudes GET. Ejemplo:

- **GET** `/aplicaciones?sorts=[{"field":"nombre","sort":"asc"}]`

### **Filtrar Resultados**

Para filtrar los resultados, se puede utilizar el parámetro `filters` en las solicitudes GET. Ejemplo:

- **GET** `/aplicaciones?filters=[{"field":"nombre","operator":"contains","value":"test"}]`

### **Paginar Resultados**

Para paginar los resultados, se puede utilizar el parámetro `pagination` en las solicitudes GET. Ejemplo:

- **GET** `/aplicaciones?pagination={"pageSize":5,"page":0}`

---

## **📌 Ejemplo Completo**

Un ejemplo completo de una solicitud GET con ordenación, filtrado y paginación:

- **GET** `/aplicaciones?sorts=[{"field":"nombre","sort":"asc"}]&filters=[{"field":"nombre","operator":"contains","value":"test"}]&pagination={"pageSize":5,"page":0}`

Este ejemplo ordena las aplicaciones por nombre en orden ascendente, filtra las aplicaciones cuyo nombre contiene "test" y devuelve los primeros 5 resultados de la primera página.
