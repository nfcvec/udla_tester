from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/aplicacion/", response_model=schemas.Aplicacion)
def create_aplicacion(aplicacion: schemas.AplicacionCreate, db: Session = Depends(get_db)):
    return crud.create_aplicacion(db=db, aplicacion=aplicacion)

@router.get("/aplicacion/", response_model=dict)
def read_aplicaciones(skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None, db: Session = Depends(get_db)):
    aplicaciones, total = crud.get_aplicaciones(db, skip=skip, limit=limit, sort_by=sort_by, sort_order=sort_order, filter_column=filter_column, filter_value=filter_value)
    return {"data": [schemas.Aplicacion.model_validate(aplicacion) for aplicacion in aplicaciones], "total": total}

@router.get("/aplicacion/{aplicacion_id}", response_model=schemas.Aplicacion)
def read_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    aplicacion = crud.get_aplicacion(db, aplicacion_id=aplicacion_id)
    if aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return aplicacion

@router.put("/aplicacion/{aplicacion_id}", response_model=schemas.Aplicacion)
def update_aplicacion(aplicacion_id: int, aplicacion: schemas.AplicacionUpdate, db: Session = Depends(get_db)):
    db_aplicacion = crud.get_aplicacion(db, aplicacion_id=aplicacion_id)
    if db_aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return crud.update_aplicacion(db=db, aplicacion_id=aplicacion_id, aplicacion=aplicacion)

@router.delete("/aplicacion/{aplicacion_id}", response_model=schemas.Aplicacion)
def delete_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    db_aplicacion = crud.get_aplicacion(db, aplicacion_id=aplicacion_id)
    if db_aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return crud.delete_aplicacion(db=db, aplicacion_id=aplicacion_id)