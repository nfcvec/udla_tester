from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Boolean, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session
from pydantic import BaseModel
from typing import List

DATABASE_URL = "sqlite:///./test_cases.db"  # Base de datos para la API de gestión de casos de prueba

# Configuración de SQLAlchemy
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos de la Base de Datos para gestión de casos de prueba
class CasoPrueba(Base):
    __tablename__ = "casos_prueba"
    id = Column(Integer, primary_key=True, index=True)
    pantalla = Column(String, index=True)
    funcionalidad = Column(String, index=True)
    tipo_prueba = Column(String)
    sistema_operativo = Column(String)
    tipo_usuario = Column(String)
    descripcion = Column(Text)

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Modelos de Pydantic para la serialización
class CasoPruebaBase(BaseModel):
    pantalla: str
    funcionalidad: str
    tipo_prueba: str
    sistema_operativo: str
    tipo_usuario: str
    descripcion: str

class CasoPruebaCreate(CasoPruebaBase):
    pass

class CasoPruebaUpdate(CasoPruebaBase):
    pass

class CasoPruebaResponse(CasoPruebaBase):
    id: int

    class Config:
        orm_mode = True

# Dependencia para la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Instancia de FastAPI para la gestión de casos de prueba
app = FastAPI(title="API de Gestión de Casos de Prueba")

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todos los orígenes
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos
    allow_headers=["*"],  # Permitir todos los encabezados
)

# Endpoints de CRUD para Casos de Prueba
@app.post("/casos/", response_model=CasoPruebaResponse)
def create_caso(caso: CasoPruebaCreate, db: Session = Depends(get_db)):
    nuevo_caso = CasoPrueba(**caso.dict())
    db.add(nuevo_caso)
    db.commit()
    db.refresh(nuevo_caso)
    return nuevo_caso

@app.get("/casos/", response_model=List[CasoPruebaResponse])
def get_casos(db: Session = Depends(get_db)):
    return db.query(CasoPrueba).all()

@app.get("/casos/{caso_id}", response_model=CasoPruebaResponse)
def get_caso(caso_id: int, db: Session = Depends(get_db)):
    caso = db.query(CasoPrueba).filter(CasoPrueba.id == caso_id).first()
    if not caso:
        raise HTTPException(status_code=404, detail="Caso de prueba no encontrado")
    return caso

@app.put("/casos/{caso_id}", response_model=CasoPruebaResponse)
def update_caso(caso_id: int, caso_data: CasoPruebaUpdate, db: Session = Depends(get_db)):
    caso = db.query(CasoPrueba).filter(CasoPrueba.id == caso_id).first()
    if not caso:
        raise HTTPException(status_code=404, detail="Caso de prueba no encontrado")
    for key, value in caso_data.dict().items():
        setattr(caso, key, value)
    db.commit()
    db.refresh(caso)
    return caso

@app.delete("/casos/{caso_id}", response_model=dict)
def delete_caso(caso_id: int, db: Session = Depends(get_db)):
    caso = db.query(CasoPrueba).filter(CasoPrueba.id == caso_id).first()
    if not caso:
        raise HTTPException(status_code=404, detail="Caso de prueba no encontrado")
    db.delete(caso)
    db.commit()
    return {"mensaje": "Caso de prueba eliminado"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)