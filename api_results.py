from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Date, Boolean, Text
from sqlalchemy.orm import sessionmaker, declarative_base, relationship, Session

DATABASE_URL = "sqlite:///./test_results.db"  # Base de datos para la API de gestión de resultados

# Configuración de SQLAlchemy
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Modelos de la Base de Datos para gestión de resultados de prueba
class Tester(Base):
    __tablename__ = "testers"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True)

class UsuarioPrueba(Base):
    __tablename__ = "usuarios_prueba"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, unique=True)
    tipo_usuario = Column(String)

class ResultadoPrueba(Base):
    __tablename__ = "resultados_prueba"
    id = Column(Integer, primary_key=True, index=True)
    id_caso_prueba = Column(Integer, index=True)
    id_tester = Column(Integer, ForeignKey("testers.id"))
    id_usuario_prueba = Column(Integer, ForeignKey("usuarios_prueba.id"))
    fecha_realizacion = Column(Date)
    exito_funcion = Column(Boolean)
    exito_diseño = Column(Boolean)
    caso_exitoso = Column(String)
    observaciones = Column(Text)
    tester = relationship("Tester")
    usuario_prueba = relationship("UsuarioPrueba")

# Crear las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# Dependencia para la sesión de la base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Instancia de FastAPI para la gestión de resultados de prueba
app = FastAPI(title="API de Gestión de Resultados de Prueba")

# Endpoint para asignar un caso de prueba a un tester
@app.post("/asignar-caso/")
def asignar_caso(id_caso_prueba: int, id_tester: int, db: Session = Depends(get_db)):
    resultado = ResultadoPrueba(id_caso_prueba=id_caso_prueba, id_tester=id_tester)
    db.add(resultado)
    db.commit()
    return {"mensaje": "Caso de prueba asignado al tester"}

# Endpoint para que un tester registre un resultado
@app.put("/resultados/{resultado_id}")
def registrar_resultado(resultado_id: int, datos: dict, db: Session = Depends(get_db)):
    resultado = db.query(ResultadoPrueba).filter(ResultadoPrueba.id == resultado_id).first()
    if not resultado:
        raise HTTPException(status_code=404, detail="Resultado no encontrado")
    for key, value in datos.items():
        setattr(resultado, key, value)
    db.commit()
    db.refresh(resultado)
    return {"mensaje": "Resultado registrado"}

# Endpoint para descargar el reporte de resultados
@app.get("/reporte/", response_model=list)
def obtener_reporte(db: Session = Depends(get_db)):
    return db.query(ResultadoPrueba).all()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
