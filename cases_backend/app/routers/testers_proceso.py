from fastapi import APIRouter, HTTPException, Depends, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
import json

router = APIRouter()

@router.post("/", response_model=schemas.TestersProceso)
def create_testers_proceso(testers_proceso: schemas.TestersProcesoCreate, db: Session = Depends(get_db)):
    return crud.create_testers_proceso(db=db, testers_proceso=testers_proceso)

@router.get("/{testers_proceso_id}", response_model=schemas.TestersProceso)
def read_testers_proceso(testers_proceso_id: int, db: Session = Depends(get_db)):
    testers_proceso = crud.get_testers_proceso(db=db, testers_proceso_id=testers_proceso_id)
    if testers_proceso is None:
        raise HTTPException(status_code=404, detail="TestersProceso not found")
    return testers_proceso

@router.get("/", response_model=dict)
def read_testers_procesos(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    testers_procesos, total = crud.get_testers_procesos(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.TestersProceso.model_validate(testers_proceso) for testers_proceso in testers_procesos], "total": total}

@router.put("/{testers_proceso_id}", response_model=schemas.TestersProceso)
def update_testers_proceso(testers_proceso_id: int, testers_proceso: schemas.TestersProcesoUpdate, db: Session = Depends(get_db)):
    updated_testers_proceso = crud.update_testers_proceso(db=db, testers_proceso_id=testers_proceso_id, testers_proceso=testers_proceso)
    if updated_testers_proceso is None:
        raise HTTPException(status_code=404, detail="TestersProceso not found")
    return updated_testers_proceso

@router.delete("/{testers_proceso_id}", response_model=schemas.TestersProceso)
def delete_testers_proceso(testers_proceso_id: int, db: Session = Depends(get_db)):
    deleted_testers_proceso = crud.delete_testers_proceso(db=db, testers_proceso_id=testers_proceso_id)
    if deleted_testers_proceso is None:
        raise HTTPException(status_code=404, detail="TestersProceso not found")
    return deleted_testers_proceso