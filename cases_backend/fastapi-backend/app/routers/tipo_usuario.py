from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.TipoUsuario)
def create_tipo_usuario(tipo_usuario: schemas.TipoUsuarioCreate, db: Session = Depends(get_db)):
    return crud.create_tipo_usuario(db=db, tipo_usuario=tipo_usuario)

@router.get("/", response_model=list[schemas.TipoUsuario])
def read_tipo_usuarios(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tipo_usuarios = crud.get_tipo_usuarios(db, skip=skip, limit=limit)
    return tipo_usuarios

@router.get("/{tipo_usuario_id}", response_model=schemas.TipoUsuario)
def read_tipo_usuario(tipo_usuario_id: int, db: Session = Depends(get_db)):
    tipo_usuario = crud.get_tipo_usuario(db, tipo_usuario_id=tipo_usuario_id)
    if tipo_usuario is None:
        raise HTTPException(status_code=404, detail="TipoUsuario not found")
    return tipo_usuario

@router.put("/{tipo_usuario_id}", response_model=schemas.TipoUsuario)
def update_tipo_usuario(tipo_usuario_id: int, tipo_usuario: schemas.TipoUsuarioUpdate, db: Session = Depends(get_db)):
    tipo_usuario_updated = crud.update_tipo_usuario(db=db, tipo_usuario_id=tipo_usuario_id, tipo_usuario=tipo_usuario)
    if tipo_usuario_updated is None:
        raise HTTPException(status_code=404, detail="TipoUsuario not found")
    return tipo_usuario_updated

@router.delete("/{tipo_usuario_id}", response_model=schemas.TipoUsuario)
def delete_tipo_usuario(tipo_usuario_id: int, db: Session = Depends(get_db)):
    tipo_usuario_deleted = crud.delete_tipo_usuario(db=db, tipo_usuario_id=tipo_usuario_id)
    if tipo_usuario_deleted is None:
        raise HTTPException(status_code=404, detail="TipoUsuario not found")
    return tipo_usuario_deleted