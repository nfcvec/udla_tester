from sqlalchemy.orm import Session
from app.models.so import SO
from app.schemas.so import SOCreate, SOUpdate

def get_so(db: Session, so_id: int):
    return db.query(SO).filter(SO.id == so_id).first()

def get_sos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(SO).offset(skip).limit(limit).all()

def create_so(db: Session, so: SOCreate):
    db_so = SO(**so.dict())
    db.add(db_so)
    db.commit()
    db.refresh(db_so)
    return db_so

def update_so(db: Session, so_id: int, so: SOUpdate):
    db_so = db.query(SO).filter(SO.id == so_id).first()
    if db_so is None:
        return None
    for key, value in so.dict().items():
        setattr(db_so, key, value)
    db.commit()
    db.refresh(db_so)
    return db_so

def delete_so(db: Session, so_id: int):
    db_so = db.query(SO).filter(SO.id == so_id).first()
    if db_so is None:
        return None
    db.delete(db_so)
    db.commit()
    return db_so