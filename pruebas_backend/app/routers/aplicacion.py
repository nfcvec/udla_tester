from fastapi import APIRouter, HTTPException, Depends, Query
import json
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Aplicacion)
def create_aplicacion(aplicacion: schemas.AplicacionCreate, db: Session = Depends(get_db)):
    return crud.create_aplicacion(db=db, aplicacion=aplicacion)

@router.get("/", response_model=dict)
def read_aplicaciones(sorts: str = Query('[]'), pagination: str = Query('{}') , filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    aplicaciones, total = crud.get_aplicaciones(db, pagination=pagination, sorts=sorts, filters=filters)
    return {"data": [schemas.Aplicacion.model_validate(aplicacion) for aplicacion in aplicaciones], "total": total}

@router.get("/{aplicacion_id}", response_model=schemas.Aplicacion)
def read_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    aplicacion = crud.get_aplicacion(db, aplicacion_id=aplicacion_id)
    if aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return aplicacion

@router.put("/{aplicacion_id}", response_model=schemas.Aplicacion)
def update_aplicacion(aplicacion_id: int, aplicacion: schemas.AplicacionUpdate, db: Session = Depends(get_db)):
    db_aplicacion = crud.get_aplicacion(db, aplicacion_id=aplicacion_id)
    if db_aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return crud.update_aplicacion(db=db, aplicacion_id=aplicacion_id, aplicacion=aplicacion)

@router.delete("/{aplicacion_id}", response_model=schemas.Aplicacion)
def delete_aplicacion(aplicacion_id: int, db: Session = Depends(get_db)):
    try:
        db_aplicacion = crud.delete_aplicacion(db=db, aplicacion_id=aplicacion_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if db_aplicacion is None:
        raise HTTPException(status_code=404, detail="Aplicacion not found")
    return db_aplicacion