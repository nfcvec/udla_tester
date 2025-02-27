from fastapi import FastAPI
from app.database import engine
from app.models import Base
from app.routers import router  # Importar el router desde __init__.py
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

# Incluir el router principal.ve    
app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Test Case Management API"}
