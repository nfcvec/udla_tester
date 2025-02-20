from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routers import aplicacion, pantalla, funcionalidad, so, tipo_prueba, tipo_usuario, caso_prueba
from fastapi.middleware.cors import CORSMiddleware

# Create the FastAPI app instance
app = FastAPI()
# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Create the database tables
Base.metadata.create_all(bind=engine)

# Include routers for different entities
app.include_router(aplicacion.router)
app.include_router(pantalla.router)
app.include_router(funcionalidad.router)
app.include_router(so.router)
app.include_router(tipo_prueba.router)
app.include_router(tipo_usuario.router)
app.include_router(caso_prueba.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Test Case Management API"}
