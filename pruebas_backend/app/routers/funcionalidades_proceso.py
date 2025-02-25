from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.FuncionalidadesProceso)
def create_funcionalidades_proceso(funcionalidades_proceso: schemas.FuncionalidadesProcesoCreate, db: Session = Depends(get_db)):
    return crud.create_funcionalidades_proceso(db=db, funcionalidades_proceso=funcionalidades_proceso)

@router.get("/{funcionalidades_proceso_id}", response_model=schemas.FuncionalidadesProceso)
def read_funcionalidades_proceso(funcionalidades_proceso_id: int, db: Session = Depends(get_db)):
    funcionalidades_proceso = crud.get_funcionalidades_proceso(db=db, funcionalidades_proceso_id=funcionalidades_proceso_id)
    if funcionalidades_proceso is None:
        raise HTTPException(status_code=404, detail="FuncionalidadesProceso not found")
    return funcionalidades_proceso

@router.get("/", response_model=list[schemas.FuncionalidadesProceso])
def read_funcionalidades_procesos(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    funcionalidades_procesos = crud.get_funcionalidades_procesos(db=db, skip=skip, limit=limit)
    return funcionalidades_procesos

@router.put("/{funcionalidades_proceso_id}", response_model=schemas.FuncionalidadesProceso)
def update_funcionalidades_proceso(funcionalidades_proceso_id: int, funcionalidades_proceso: schemas.FuncionalidadesProcesoUpdate, db: Session = Depends(get_db)):
    updated_funcionalidades_proceso = crud.update_funcionalidades_proceso(db=db, funcionalidades_proceso_id=funcionalidades_proceso_id, funcionalidades_proceso=funcionalidades_proceso)
    if updated_funcionalidades_proceso is None:
        raise HTTPException(status_code=404, detail="FuncionalidadesProceso not found")
    return updated_funcionalidades_proceso

@router.delete("/{funcionalidades_proceso_id}", response_model=schemas.FuncionalidadesProceso)
def delete_funcionalidades_proceso(funcionalidades_proceso_id: int, db: Session = Depends(get_db)):
    deleted_funcionalidades_proceso = crud.delete_funcionalidades_proceso(db=db, funcionalidades_proceso_id=funcionalidades_proceso_id)
    if deleted_funcionalidades_proceso is None:
        raise HTTPException(status_code=404, detail="FuncionalidadesProceso not found")
    return deleted_funcionalidades_proceso