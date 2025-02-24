from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import tipo_usuario as crud_tipo_usuario
from app.schemas.tipo_usuario import TipoUsuarioCreate, TipoUsuarioUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{tipo_usuario_id}")
def read_tipo_usuario(tipo_usuario_id: int, db: Session = Depends(get_db)):
    return crud_tipo_usuario.get_tipo_usuario(db, tipo_usuario_id)

@router.get("/")
def read_tipos_usuario(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_tipo_usuario.get_tipos_usuario(db, skip, limit)

@router.post("/")
def create_tipo_usuario(tipo_usuario: TipoUsuarioCreate, db: Session = Depends(get_db)):
    return crud_tipo_usuario.create_tipo_usuario(db, tipo_usuario)

@router.put("/{tipo_usuario_id}")
def update_tipo_usuario(tipo_usuario_id: int, tipo_usuario: TipoUsuarioUpdate, db: Session = Depends(get_db)):
    return crud_tipo_usuario.update_tipo_usuario(db, tipo_usuario_id, tipo_usuario)

@router.delete("/{tipo_usuario_id}")
def delete_tipo_usuario(tipo_usuario_id: int, db: Session = Depends(get_db)):
    return crud_tipo_usuario.delete_tipo_usuario(db, tipo_usuario_id)