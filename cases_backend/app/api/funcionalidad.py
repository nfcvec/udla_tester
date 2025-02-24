from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import caso_prueba as crud_caso_prueba
from app.schemas.caso_prueba import CasoPruebaCreate, CasoPruebaUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{caso_prueba_id}")
def read_caso_prueba(caso_prueba_id: int, db: Session = Depends(get_db)):
    return crud_caso_prueba.get_caso_prueba(db, caso_prueba_id)

@router.get("/")
def read_casos_prueba(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_caso_prueba.get_casos_prueba(db, skip, limit)

@router.post("/")
def create_caso_prueba(caso_prueba: CasoPruebaCreate, db: Session = Depends(get_db)):
    return crud_caso_prueba.create_caso_prueba(db, caso_prueba)

@router.put("/{caso_prueba_id}")
def update_caso_prueba(caso_prueba_id: int, caso_prueba: CasoPruebaUpdate, db: Session = Depends(get_db)):
    return crud_caso_prueba.update_caso_prueba(db, caso_prueba_id, caso_prueba)

@router.delete("/{caso_prueba_id}")
def delete_caso_prueba(caso_prueba_id: int, db: Session = Depends(get_db)):
    return crud_caso_prueba.delete_caso_prueba(db, caso_prueba_id)