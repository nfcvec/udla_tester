from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
import json

router = APIRouter()

@router.post("/", response_model=schemas.Asignacion)
def create_asignacion(asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    return crud.create_asignacion(db=db, asignacion=asignacion)

@router.get("/{asignacion_id}", response_model=schemas.Asignacion)
def get_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    db_asignacion = crud.get_asignacion(db=db, asignacion_id=asignacion_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion not found")
    return db_asignacion

@router.get("/", response_model=dict)
def get_asignaciones(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    asignaciones, total = crud.get_asignaciones(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.Asignacion.model_validate(asignacion) for asignacion in asignaciones], "total": total}

@router.put("/{asignacion_id}", response_model=schemas.Asignacion)
def update_asignacion(asignacion_id: int, asignacion: schemas.AsignacionUpdate, db: Session = Depends(get_db)):
    db_asignacion = crud.get_asignacion(db=db, asignacion_id=asignacion_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion not found")
    return crud.update_asignacion(db=db, asignacion_id=asignacion_id, asignacion=asignacion)

@router.delete("/{asignacion_id}", response_model=schemas.Asignacion)
def delete_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    db_asignacion = crud.get_asignacion(db=db, asignacion_id=asignacion_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion not found")
    return crud.delete_asignacion(db=db, asignacion_id=asignacion_id)
