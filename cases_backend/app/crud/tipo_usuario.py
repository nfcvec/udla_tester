from sqlalchemy.orm import Session
from app.models.tipo_usuario import TipoUsuario
from app.schemas.tipo_usuario import TipoUsuarioCreate, TipoUsuarioUpdate

def get_tipo_usuario(db: Session, tipo_usuario_id: int):
    return db.query(TipoUsuario).filter(TipoUsuario.id == tipo_usuario_id).first()

def get_tipos_usuario(db: Session, skip: int = 0, limit: int = 10):
    return db.query(TipoUsuario).offset(skip).limit(limit).all()

def create_tipo_usuario(db: Session, tipo_usuario: TipoUsuarioCreate):
    db_tipo_usuario = TipoUsuario(**tipo_usuario.model_dump())
    db.add(db_tipo_usuario)
    db.commit()
    db.refresh(db_tipo_usuario)
    return db_tipo_usuario

def update_tipo_usuario(db: Session, tipo_usuario_id: int, tipo_usuario: TipoUsuarioUpdate):
    db_tipo_usuario = db.query(TipoUsuario).filter(TipoUsuario.id == tipo_usuario_id).first()
    if db_tipo_usuario:
        for key, value in tipo_usuario.model_dump().items():
            setattr(db_tipo_usuario, key, value)
        db.commit()
        db.refresh(db_tipo_usuario)
    return db_tipo_usuario

def delete_tipo_usuario(db: Session, tipo_usuario_id: int):
    db_tipo_usuario = db.query(TipoUsuario).filter(TipoUsuario.id == tipo_usuario_id).first()
    if db_tipo_usuario:
        db.delete(db_tipo_usuario)
        db.commit()
    return db_tipo_usuario