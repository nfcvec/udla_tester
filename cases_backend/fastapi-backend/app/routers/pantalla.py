from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Pantalla)
def create_pantalla(pantalla: schemas.PantallaCreate, db: Session = Depends(get_db)):
    return crud.create_pantalla(db=db, pantalla=pantalla)

@router.get("/", response_model=list[schemas.Pantalla])
def read_pantallas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    pantallas = crud.get_pantallas(db=db, skip=skip, limit=limit)
    return pantallas

@router.get("/{pantalla_id}", response_model=schemas.Pantalla)
def read_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    db_pantalla = crud.get_pantalla(db=db, pantalla_id=pantalla_id)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla

@router.put("/{pantalla_id}", response_model=schemas.Pantalla)
def update_pantalla(pantalla_id: int, pantalla: schemas.PantallaUpdate, db: Session = Depends(get_db)):
    db_pantalla = crud.update_pantalla(db=db, pantalla_id=pantalla_id, pantalla=pantalla)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla

@router.delete("/{pantalla_id}", response_model=schemas.Pantalla)
def delete_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    db_pantalla = crud.delete_pantalla(db=db, pantalla_id=pantalla_id)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla