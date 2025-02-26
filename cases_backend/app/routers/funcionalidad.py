from fastapi import APIRouter, HTTPException, Depends, Query
import json
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Funcionalidad)
def create_funcionalidad(funcionalidad: schemas.FuncionalidadCreate, db: Session = Depends(get_db)):
    return crud.create_funcionalidad(db=db, funcionalidad=funcionalidad)

@router.get("/", response_model=dict)
def read_funcionalidades(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    funcionalidades, total = crud.get_funcionalidades(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.Funcionalidad.model_validate(funcionalidad) for funcionalidad in funcionalidades], "total": total}

@router.get("/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def read_funcionalidad(funcionalidad_id: int, db: Session = Depends(get_db)):
    funcionalidad = crud.get_funcionalidad(db, funcionalidad_id=funcionalidad_id)
    if funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return funcionalidad

@router.put("/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def update_funcionalidad(funcionalidad_id: int, funcionalidad: schemas.FuncionalidadUpdate, db: Session = Depends(get_db)):
    updated_funcionalidad = crud.update_funcionalidad(db=db, funcionalidad_id=funcionalidad_id, funcionalidad=funcionalidad)
    if updated_funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return updated_funcionalidad

@router.delete("/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def delete_funcionalidad(funcionalidad_id: int, db: Session = Depends(get_db)):
    try:
        funcionalidad = crud.delete_funcionalidad(db=db, funcionalidad_id=funcionalidad_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return funcionalidad