from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import pantalla as crud_pantalla
from app.schemas.pantalla import PantallaCreate, PantallaUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{pantalla_id}")
def read_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    return crud_pantalla.get_pantalla(db, pantalla_id)

@router.get("/")
def read_pantallas(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_pantalla.get_pantallas(db, skip, limit)

@router.post("/")
def create_pantalla(pantalla: PantallaCreate, db: Session = Depends(get_db)):
    return crud_pantalla.create_pantalla(db, pantalla)

@router.put("/{pantalla_id}")
def update_pantalla(pantalla_id: int, pantalla: PantallaUpdate, db: Session = Depends(get_db)):
    return crud_pantalla.update_pantalla(db, pantalla_id, pantalla)

@router.delete("/{pantalla_id}")
def delete_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    return crud_pantalla.delete_pantalla(db, pantalla_id)