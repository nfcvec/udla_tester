# FastAPI Backend Project

This project is a FastAPI application designed to manage a SQLite database for testing cases. It provides a structured way to handle various entities related to test cases, including applications, screens, functionalities, operating systems, test types, user types, and test cases.

## Project Structure

```
fastapi-backend
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── crud.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── routers
│       ├── __init__.py
│       ├── aplicacion.py
│       ├── pantalla.py
│       ├── funcionalidad.py
│       ├── so.py
│       ├── tipo_prueba.py
│       ├── tipo_usuario.py
│       └── caso_prueba.py
├── alembic
│   ├── env.py
│   ├── script.py.mako
│   └── versions
│       └── .gitkeep
├── alembic.ini
├── requirements.txt
└── README.md
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fastapi-backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install the required packages:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application:**
   ```bash
   uvicorn app.main:app --reload
   ```

## Usage

Once the application is running, you can access the API documentation at `http://127.0.0.1:8000/docs`. This will provide you with an interactive interface to test the various endpoints for managing applications, screens, functionalities, operating systems, test types, user types, and test cases.

## Endpoints

The application includes the following endpoints for each model:

- **Aplicacion**: CRUD operations and filtering
- **Pantalla**: CRUD operations and filtering
- **Funcionalidad**: CRUD operations and filtering
- **SO**: CRUD operations and filtering
- **TipoPrueba**: CRUD operations and filtering
- **TipoUsuario**: CRUD operations and filtering
- **CasoPrueba**: CRUD operations and filtering

## Database

The application uses SQLite as the database backend. The database schema is defined in the `app/models.py` file, and migrations can be managed using Alembic.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.