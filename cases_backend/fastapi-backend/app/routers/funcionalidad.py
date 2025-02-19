from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Funcionalidad)
def create_funcionalidad(funcionalidad: schemas.FuncionalidadCreate, db: Session = Depends(get_db)):
    return crud.create_funcionalidad(db=db, funcionalidad=funcionalidad)

@router.get("/", response_model=list[schemas.Funcionalidad])
def read_funcionalidades(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    funcionalidades = crud.get_funcionalidades(db, skip=skip, limit=limit)
    return funcionalidades

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
    funcionalidad = crud.delete_funcionalidad(db=db, funcionalidad_id=funcionalidad_id)
    if funcionalidad is None:
        raise HTTPException(status_code=404, detail="Funcionalidad not found")
    return funcionalidad