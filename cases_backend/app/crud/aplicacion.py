from sqlalchemy.orm import Session
from app.models.aplicacion import Aplicacion
from app.schemas.aplicacion import AplicacionCreate, AplicacionUpdate

def get_aplicacion(db: Session, aplicacion_id: int):
    return db.query(Aplicacion).filter(Aplicacion.id == aplicacion_id).first()

def get_aplicaciones(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Aplicacion).offset(skip).limit(limit).all()

def create_aplicacion(db: Session, aplicacion: AplicacionCreate):
    db_aplicacion = Aplicacion(**aplicacion.model_dump())
    db.add(db_aplicacion)
    db.commit()
    db.refresh(db_aplicacion)
    return db_aplicacion

def update_aplicacion(db: Session, aplicacion_id: int, aplicacion: AplicacionUpdate):
    db_aplicacion = db.query(Aplicacion).filter(Aplicacion.id == aplicacion_id).first()
    if db_aplicacion:
        for key, value in aplicacion.model_dump().items():
            setattr(db_aplicacion, key, value)
        db.commit()
        db.refresh(db_aplicacion)
    return db_aplicacion

def delete_aplicacion(db: Session, aplicacion_id: int):
    db_aplicacion = db.query(Aplicacion).filter(Aplicacion.id == aplicacion_id).first()
    if db_aplicacion:
        db.delete(db_aplicacion)
        db.commit()
    return db_aplicacion