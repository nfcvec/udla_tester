from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import aplicacion as crud_aplicacion
from app.schemas.aplicacion import AplicacionCreate, AplicacionUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{aplicacion_id}")
def read_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    return crud_aplicacion.get_aplicacion(db, aplicacion_id)

@router.get("/")
def read_aplicaciones(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_aplicacion.get_aplicaciones(db, skip, limit)

@router.post("/")
def create_aplicacion(aplicacion: AplicacionCreate, db: Session = Depends(get_db)):
    return crud_aplicacion.create_aplicacion(db, aplicacion)

@router.put("/{aplicacion_id}")
def update_aplicacion(aplicacion_id: int, aplicacion: AplicacionUpdate, db: Session = Depends(get_db)):
    return crud_aplicacion.update_aplicacion(db, aplicacion_id, aplicacion)

@router.delete("/{aplicacion_id}")
def delete_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    return crud_aplicacion.delete_aplicacion(db, aplicacion_id)