from sqlalchemy.orm import Session
from app.models.tipo_prueba import TipoPrueba
from app.schemas.tipo_prueba import TipoPruebaCreate, TipoPruebaUpdate

def get_tipo_prueba(db: Session, tipo_prueba_id: int):
    return db.query(TipoPrueba).filter(TipoPrueba.id == tipo_prueba_id).first()

def get_tipos_prueba(db: Session, skip: int = 0, limit: int = 10):
    return db.query(TipoPrueba).offset(skip).limit(limit).all()

def create_tipo_prueba(db: Session, tipo_prueba: TipoPruebaCreate):
    db_tipo_prueba = TipoPrueba(**tipo_prueba.model_dump())
    db.add(db_tipo_prueba)
    db.commit()
    db.refresh(db_tipo_prueba)
    return db_tipo_prueba

def update_tipo_prueba(db: Session, tipo_prueba_id: int, tipo_prueba: TipoPruebaUpdate):
    db_tipo_prueba = db.query(TipoPrueba).filter(TipoPrueba.id == tipo_prueba_id).first()
    if db_tipo_prueba:
        for key, value in tipo_prueba.model_dump().items():
            setattr(db_tipo_prueba, key, value)
        db.commit()
        db.refresh(db_tipo_prueba)
    return db_tipo_prueba

def delete_tipo_prueba(db: Session, tipo_prueba_id: int):
    db_tipo_prueba = db.query(TipoPrueba).filter(TipoPrueba.id == tipo_prueba_id).first()
    if db_tipo_prueba:
        db.delete(db_tipo_prueba)
        db.commit()
    return db_tipo_prueba