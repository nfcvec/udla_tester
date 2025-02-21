from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from typing import List, Dict, Optional
from fastapi.params import Query
from ..database import get_db

router = APIRouter()

@router.post("/pantalla/", response_model=schemas.Pantalla)
def create_pantalla(pantalla: schemas.PantallaCreate, db: Session = Depends(get_db)):
    return crud.create_pantalla(db=db, pantalla=pantalla)

@router.get("/pantalla/", response_model=dict)
def read_pantallas(
    skip: int = 0,
    limit: int = 10,
    sort_by: str = 'id',
    sort_order: str = 'asc',
    filters: Optional[Dict[str, str]] = Query(None),
    db: Session = Depends(get_db)
):
    pantallas, total = crud.get_pantallas(db, skip=skip, limit=limit, sort_by=sort_by, sort_order=sort_order, filters=filters)
    return {"data": [schemas.Pantalla.model_validate(pantalla) for pantalla in pantallas], "total": total}

@router.get("/pantalla/{pantalla_id}", response_model=schemas.Pantalla)
def read_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    db_pantalla = crud.get_pantalla(db=db, pantalla_id=pantalla_id)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla

@router.put("/pantalla/{pantalla_id}", response_model=schemas.Pantalla)
def update_pantalla(pantalla_id: int, pantalla: schemas.PantallaUpdate, db: Session = Depends(get_db)):
    db_pantalla = crud.update_pantalla(db=db, pantalla_id=pantalla_id, pantalla=pantalla)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla

@router.delete("/pantalla/{pantalla_id}", response_model=schemas.Pantalla)
def delete_pantalla(pantalla_id: int, db: Session = Depends(get_db)):
    db_pantalla = crud.delete_pantalla(db=db, pantalla_id=pantalla_id)
    if db_pantalla is None:
        raise HTTPException(status_code=404, detail="Pantalla not found")
    return db_pantalla