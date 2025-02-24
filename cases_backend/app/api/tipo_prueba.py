from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import tipo_prueba as crud_tipo_prueba
from app.schemas.tipo_prueba import TipoPruebaCreate, TipoPruebaUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{tipo_prueba_id}")
def read_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    return crud_tipo_prueba.get_tipo_prueba(db, tipo_prueba_id)

@router.get("/")
def read_tipos_prueba(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud_tipo_prueba.get_tipos_prueba(db, skip, limit)

@router.post("/")
def create_tipo_prueba(tipo_prueba: TipoPruebaCreate, db: Session = Depends(get_db)):
    return crud_tipo_prueba.create_tipo_prueba(db, tipo_prueba)

@router.put("/{tipo_prueba_id}")
def update_tipo_prueba(tipo_prueba_id: int, tipo_prueba: TipoPruebaUpdate, db: Session = Depends(get_db)):
    return crud_tipo_prueba.update_tipo_prueba(db, tipo_prueba_id, tipo_prueba)

@router.delete("/{tipo_prueba_id}")
def delete_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    return crud_tipo_prueba.delete_tipo_prueba(db, tipo_prueba_id)