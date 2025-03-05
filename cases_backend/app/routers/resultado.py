from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db
import json

router = APIRouter()

@router.post("/", response_model=schemas.Resultado)
def create_resultado(resultado: schemas.ResultadoCreate, db: Session = Depends(get_db)):
    return crud.create_resultado(db=db, resultado=resultado)

@router.get("/{resultado_id}", response_model=schemas.Resultado)
def get_resultado(resultado_id: int, db: Session = Depends(get_db)):
    db_resultado = crud.get_resultado(db=db, resultado_id=resultado_id)
    if db_resultado is None:
        raise HTTPException(status_code=404, detail="Resultado not found")
    return db_resultado

@router.get("/", response_model=dict)
def get_resultados(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    resultados, total = crud.get_resultados(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.Resultado.model_validate(resultado) for resultado in resultados], "total": total}

@router.put("/{resultado_id}", response_model=schemas.Resultado)
def update_resultado(resultado_id: int, resultado: schemas.ResultadoUpdate, db: Session = Depends(get_db)):
    db_resultado = crud.get_resultado(db=db, resultado_id=resultado_id)
    if db_resultado is None:
        raise HTTPException(status_code=404, detail="Resultado not found")
    return crud.update_resultado(db=db, resultado_id=resultado_id, resultado=resultado)

@router.delete("/{resultado_id}", response_model=schemas.Resultado)
def delete_resultado(resultado_id: int, db: Session = Depends(get_db)):
    db_resultado = crud.get_resultado(db=db, resultado_id=resultado_id)
    if db_resultado is None:
        raise HTTPException(status_code=404, detail="Resultado not found")
    return crud.delete_resultado(db=db, resultado_id=resultado_id)
