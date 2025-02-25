#ER para Administrar casos de prueba
    Aplicacion {
        int id PK
        string nombre
    }

    Pantalla {
        int id PK
        string nombre
        int aplicacion_id FK
    }

    Funcionalidad {
        int id PK
        string nombre
        int aplicacion_id FK
    }

    SO {
        int id PK
        string nombre
        int aplicacion_id FK
    }

    TipoPrueba {
        int id PK
        string nombre
        int aplicacion_id FK
    }

    TipoUsuario {
        int id PK
        int aplicacion_id FK
        string nombre
    }

    CasoPrueba {
        int id PK
        text paso_a_paso
        int funcionalidad_id FK
        int so_id FK
        int tipo_prueba_id FK
        int pantalla_id FK
        int aplicacion_id FK
    }

Consideraciones para crear un backend
- Python ya incluye la libreria sqlite, por lo que no se la agrega a requirements.txt