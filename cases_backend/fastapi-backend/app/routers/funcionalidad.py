from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/funcionalidad/", response_model=schemas.Funcionalidad)
def create_funcionalidad(funcionalidad: schemas.FuncionalidadCreate, db: Session = Depends(get_db)):
    return crud.create_funcionalidad(db=db, funcionalidad=funcionalidad)

@router.get("/funcionalidad/", response_model=dict)
def read_funcionalidades(skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', filter_column: str = None, filter_value: str = None, db: Session = Depends(get_db)):
    funcionalidades, total = crud.get_funcionalidades(db, skip=skip, limit=limit, sort_by=sort_by, sort_order=sort_order, filter_column=filter_column, filter_value=filter_value)
    return {"data": [schemas.Funcionalidad.model_validate(funcionalidad) for funcionalidad in funcionalidades], "total": total}

@router.get("/funcionalidad/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def read_funcionalidad(funcionalidad_id: int, db: Session = Depends(get_db)):
    funcionalidad = crud.get_funcionalidad(db, funcionalidad_id=funcionalidad_id)
    if funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return funcionalidad

@router.put("/funcionalidad/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def update_funcionalidad(funcionalidad_id: int, funcionalidad: schemas.FuncionalidadUpdate, db: Session = Depends(get_db)):
    updated_funcionalidad = crud.update_funcionalidad(db=db, funcionalidad_id=funcionalidad_id, funcionalidad=funcionalidad)
    if updated_funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return updated_funcionalidad

@router.delete("/funcionalidad/{funcionalidad_id}", response_model=schemas.Funcionalidad)
def delete_funcionalidad(funcionalidad_id: int, db: Session = Depends(get_db)):
    funcionalidad = crud.delete_funcionalidad(db=db, funcionalidad_id=funcionalidad_id)
    if funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return funcionalidad