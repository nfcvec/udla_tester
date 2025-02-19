from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/caso_prueba/", response_model=schemas.CasoPrueba)
def create_caso_prueba(caso_prueba: schemas.CasoPruebaCreate, db: Session = Depends(get_db)):
    return crud.create_caso_prueba(db=db, caso_prueba=caso_prueba)

@router.get("/caso_prueba/", response_model=list[schemas.CasoPrueba])
def read_casos_prueba(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    casos_prueba = crud.get_casos_prueba(db=db, skip=skip, limit=limit)
    return casos_prueba

@router.get("/caso_prueba/{caso_prueba_id}", response_model=schemas.CasoPrueba)
def read_caso_prueba(caso_prueba_id: int, db: Session = Depends(get_db)):
    caso_prueba = crud.get_caso_prueba(db=db, caso_prueba_id=caso_prueba_id)
    if caso_prueba is None:
        raise HTTPException(status_code=404, detail="CasoPrueba not found")
    return caso_prueba

@router.put("/caso_prueba/{caso_prueba_id}", response_model=schemas.CasoPrueba)
def update_caso_prueba(caso_prueba_id: int, caso_prueba: schemas.CasoPruebaUpdate, db: Session = Depends(get_db)):
    updated_caso_prueba = crud.update_caso_prueba(db=db, caso_prueba_id=caso_prueba_id, caso_prueba=caso_prueba)
    if updated_caso_prueba is None:
        raise HTTPException(status_code=404, detail="CasoPrueba not found")
    return updated_caso_prueba

@router.delete("/caso_prueba/{caso_prueba_id}", response_model=schemas.CasoPrueba)
def delete_caso_prueba(caso_prueba_id: int, db: Session = Depends(get_db)):
    deleted_caso_prueba = crud.delete_caso_prueba(db=db, caso_prueba_id=caso_prueba_id)
    if deleted_caso_prueba is None:
        raise HTTPException(status_code=404, detail="CasoPrueba not found")
    return deleted_caso_prueba