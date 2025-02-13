from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine

# Crear las tablas en la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuración de CORS (Permitir todos los orígenes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas las conexiones
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos
    allow_headers=["*"],  # Permite todos los encabezados
)

# Dependencia para obtener sesión de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD Endpoints

@app.post("/sistemas/", response_model=schemas.Sistema)
def create_sistema(sistema: schemas.SistemaCreate, db: Session = Depends(get_db)):
    db_sistema = models.Sistema(nombre=sistema.nombre)
    db.add(db_sistema)
    db.commit()
    db.refresh(db_sistema)
    return db_sistema

@app.get("/sistemas/{id_sistema}", response_model=schemas.Sistema)
def get_sistema(id_sistema: int, db: Session = Depends(get_db)):
    sistema = db.query(models.Sistema).filter(models.Sistema.id_sistema == id_sistema).first()
    if sistema is None:
        raise HTTPException(status_code=404, detail="Sistema no encontrado")
    return sistema

@app.get("/sistemas/")
def get_all_sistemas(db: Session = Depends(get_db)):
    return db.query(models.Sistema).all()

@app.put("/sistemas/{id_sistema}", response_model=schemas.Sistema)
def update_sistema(id_sistema: int, sistema_update: schemas.SistemaCreate, db: Session = Depends(get_db)):
    sistema = db.query(models.Sistema).filter(models.Sistema.id_sistema == id_sistema).first()
    if sistema is None:
        raise HTTPException(status_code=404, detail="Sistema no encontrado")
    sistema.nombre = sistema_update.nombre
    db.commit()
    return sistema

@app.delete("/sistemas/{id_sistema}")
def delete_sistema(id_sistema: int, db: Session = Depends(get_db)):
    sistema = db.query(models.Sistema).filter(models.Sistema.id_sistema == id_sistema).first()
    if sistema is None:
        raise HTTPException(status_code=404, detail="Sistema no encontrado")
    db.delete(sistema)
    db.commit()
    return {"message": "Sistema eliminado"}