# **📌 Aspectos Técnicos del Módulo de Administración**

## **Lenguaje y Framework**

El módulo de administración está desarrollado en **Python** utilizando el framework **FastAPI**. FastAPI es conocido por su alto rendimiento y facilidad de uso para construir APIs modernas y robustas.

## **Protocolos**

La comunicación con la API se realiza a través de **HTTP/HTTPS** utilizando métodos estándar como **GET**, **POST**, **PUT** y **DELETE**.

## **Base de Datos**

El sistema utiliza **SQLite** como base de datos para almacenar la información de las aplicaciones, funcionalidades, casos de prueba y otras entidades relacionadas.

## **ORM (Object-Relational Mapping)**

Para interactuar con la base de datos, se utiliza **SQLAlchemy** como ORM. SQLAlchemy permite mapear las clases de Python a tablas de la base de datos y proporciona una abstracción de alto nivel para realizar operaciones CRUD.

## **Estructura del Proyecto**

El proyecto sigue una estructura modular para mantener el código organizado y fácil de mantener. Los principales componentes del módulo de administración incluyen:

- **Modelos**: Definición de las entidades y sus relaciones en la base de datos.
- **Esquemas**: Definición de los esquemas de datos utilizando Pydantic para validación y serialización.
- **CRUD**: Implementación de las operaciones CRUD para cada entidad.
- **Rutas**: Definición de los endpoints de la API y su lógica de negocio.

## **Manejo de Errores**

Se implementa un manejo de errores robusto para capturar y responder adecuadamente a las excepciones que puedan ocurrir durante la ejecución de las operaciones de la API.

## **Documentación**

La documentación de la API se genera automáticamente utilizando **Swagger** y **Redoc**, facilitando a los desarrolladores la comprensión y el uso de los endpoints disponibles.

## **Versionamiento**

El sistema de versionamiento se implementa para mantener un historial de cambios en las entidades. Cada vez que se realiza una modificación en una entidad, se crea una nueva versión en las tablas de versionamiento correspondientes. Esto asegura que los datos históricos se mantengan intactos y que las pruebas pasadas reflejen correctamente los datos originales.

Las tablas de versionamiento incluyen:

- `pantallas_versiones`
- `funcionalidades_versiones`
- `tipos_prueba_versiones`
- `tipos_usuario_versiones`
- `sistemas_operativos_versiones`
- `casos_prueba_versiones`
- `asignacion_funcionalidades_versiones`
- `asignacion_testers_versiones`
- `asignacion_casos_versiones`
