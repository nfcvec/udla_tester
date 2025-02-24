from sqlalchemy.orm import Session
from app.models.caso_prueba import CasoPrueba
from app.schemas.caso_prueba import CasoPruebaCreate, CasoPruebaUpdate

def get_caso_prueba(db: Session, caso_prueba_id: int):
    return db.query(CasoPrueba).filter(CasoPrueba.id == caso_prueba_id).first()

def get_casos_prueba(db: Session, skip: int = 0, limit: int = 100):
    return db.query(CasoPrueba).offset(skip).limit(limit).all()

def create_caso_prueba(db: Session, caso_prueba: CasoPruebaCreate):
    db_caso_prueba = CasoPrueba(**caso_prueba.dict())
    db.add(db_caso_prueba)
    db.commit()
    db.refresh(db_caso_prueba)
    return db_caso_prueba

def update_caso_prueba(db: Session, caso_prueba_id: int, caso_prueba: CasoPruebaUpdate):
    db_caso_prueba = db.query(CasoPrueba).filter(CasoPrueba.id == caso_prueba_id).first()
    if db_caso_prueba is None:
        return None
    for key, value in caso_prueba.dict().items():
        setattr(db_caso_prueba, key, value)
    db.commit()
    db.refresh(db_caso_prueba)
    return db_caso_prueba

def delete_caso_prueba(db: Session, caso_prueba_id: int):
    db_caso_prueba = db.query(CasoPrueba).filter(CasoPrueba.id == caso_prueba_id).first()
    if db_caso_prueba is None:
        return None
    db.delete(db_caso_prueba)
    db.commit()
    return db_caso_prueba