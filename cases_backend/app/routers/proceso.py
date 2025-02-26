import json
from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Proceso)
def create_proceso(proceso: schemas.ProcesoCreate, db: Session = Depends(get_db)):
    return crud.create_proceso(db=db, proceso=proceso)

@router.get("/{proceso_id}", response_model=schemas.Proceso)
def read_proceso(proceso_id: int, db: Session = Depends(get_db)):
    proceso = crud.get_proceso(db=db, proceso_id=proceso_id)
    if proceso is None:
        raise HTTPException(status_code=404, detail="Proceso not found")
    return proceso

@router.get("/", response_model=dict)
def read_procesos(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    procesos, total = crud.get_procesos(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.Proceso.model_validate(proceso) for proceso in procesos], "total": total}

@router.put("/{proceso_id}", response_model=schemas.Proceso)
def update_proceso(proceso_id: int, proceso: schemas.ProcesoUpdate, db: Session = Depends(get_db)):
    updated_proceso = crud.update_proceso(db=db, proceso_id=proceso_id, proceso=proceso)
    if updated_proceso is None:
        raise HTTPException(status_code=404, detail="Proceso not found")
    return updated_proceso

@router.delete("/{proceso_id}", response_model=schemas.Proceso)
def delete_proceso(proceso_id: int, db: Session = Depends(get_db)):
    deleted_proceso = crud.delete_proceso(db=db, proceso_id=proceso_id)
    if deleted_proceso is None:
        raise HTTPException(status_code=404, detail="Proceso not found")
    return deleted_proceso