from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.TipoPrueba)
def create_tipo_prueba(tipo_prueba: schemas.TipoPruebaCreate, db: Session = Depends(get_db)):
    return crud.create_tipo_prueba(db=db, tipo_prueba=tipo_prueba)

@router.get("/", response_model=list[schemas.TipoPrueba])
def read_tipo_pruebas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tipo_pruebas = crud.get_tipo_pruebas(db=db, skip=skip, limit=limit)
    return tipo_pruebas

@router.get("/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def read_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    tipo_prueba = crud.get_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id)
    if tipo_prueba is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba

@router.put("/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def update_tipo_prueba(tipo_prueba_id: int, tipo_prueba: schemas.TipoPruebaUpdate, db: Session = Depends(get_db)):
    tipo_prueba_updated = crud.update_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id, tipo_prueba=tipo_prueba)
    if tipo_prueba_updated is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba_updated

@router.delete("/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def delete_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    tipo_prueba_deleted = crud.delete_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id)
    if tipo_prueba_deleted is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba_deleted