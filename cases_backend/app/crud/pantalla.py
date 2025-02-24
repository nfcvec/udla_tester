from sqlalchemy.orm import Session
from app.models.pantalla import Pantalla
from app.schemas.pantalla import PantallaCreate, PantallaUpdate

def get_pantalla(db: Session, pantalla_id: int):
    return db.query(Pantalla).filter(Pantalla.id == pantalla_id).first()

def get_pantallas(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Pantalla).offset(skip).limit(limit).all()

def create_pantalla(db: Session, pantalla: PantallaCreate):
    db_pantalla = Pantalla(**pantalla.dict())
    db.add(db_pantalla)
    db.commit()
    db.refresh(db_pantalla)
    return db_pantalla

def update_pantalla(db: Session, pantalla_id: int, pantalla: PantallaUpdate):
    db_pantalla = db.query(Pantalla).filter(Pantalla.id == pantalla_id).first()
    if db_pantalla is None:
        return None
    for key, value in pantalla.dict().items():
        setattr(db_pantalla, key, value)
    db.commit()
    db.refresh(db_pantalla)
    return db_pantalla

def delete_pantalla(db: Session, pantalla_id: int):
    db_pantalla = db.query(Pantalla).filter(Pantalla.id == pantalla_id).first()
    if db_pantalla is None:
        return None
    db.delete(db_pantalla)
    db.commit()
    return db_pantalla