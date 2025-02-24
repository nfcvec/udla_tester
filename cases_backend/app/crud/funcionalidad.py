from sqlalchemy.orm import Session
from app.models.funcionalidad import Funcionalidad
from app.schemas.funcionalidad import FuncionalidadCreate, FuncionalidadUpdate

def get_funcionalidad(db: Session, funcionalidad_id: int):
    return db.query(Funcionalidad).filter(Funcionalidad.id == funcionalidad_id).first()

def get_funcionalidades(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Funcionalidad).offset(skip).limit(limit).all()

def create_funcionalidad(db: Session, funcionalidad: FuncionalidadCreate):
    db_funcionalidad = Funcionalidad(**funcionalidad.dict())
    db.add(db_funcionalidad)
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def update_funcionalidad(db: Session, funcionalidad_id: int, funcionalidad: FuncionalidadUpdate):
    db_funcionalidad = db.query(Funcionalidad).filter(Funcionalidad.id == funcionalidad_id).first()
    if db_funcionalidad is None:
        return None
    for key, value in funcionalidad.dict().items():
        setattr(db_funcionalidad, key, value)
    db.commit()
    db.refresh(db_funcionalidad)
    return db_funcionalidad

def delete_funcionalidad(db: Session, funcionalidad_id: int):
    db_funcionalidad = db.query(Funcionalidad).filter(Funcionalidad.id == funcionalidad_id).first()
    if db_funcionalidad is None:
        return None
    db.delete(db_funcionalidad)
    db.commit()
    return db_funcionalidad