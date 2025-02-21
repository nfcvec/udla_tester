from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter()

@router.post("/tipo_prueba/", response_model=schemas.TipoPrueba)
def create_tipo_prueba(tipo_prueba: schemas.TipoPruebaCreate, db: Session = Depends(get_db)):
    return crud.create_tipo_prueba(db=db, tipo_prueba=tipo_prueba)

@router.get("/tipo_prueba/", response_model=dict)
def read_tipos_prueba(skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc' , filter_column: str = None, filter_value: str = None,db: Session = Depends(get_db)):
    tipo_pruebas, total = crud.get_tipos_prueba(db, skip=skip, limit=limit, sort_by=sort_by, sort_order=sort_order, filter_column=filter_column, filter_value=filter_value)
    return {"data": [schemas.TipoPrueba.model_validate(tipo_prueba) for tipo_prueba in tipo_pruebas], "total": total}

@router.get("/tipo_prueba/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def read_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    tipo_prueba = crud.get_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id)
    if tipo_prueba is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba

@router.put("/tipo_prueba/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def update_tipo_prueba(tipo_prueba_id: int, tipo_prueba: schemas.TipoPruebaUpdate, db: Session = Depends(get_db)):
    tipo_prueba_updated = crud.update_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id, tipo_prueba=tipo_prueba)
    if tipo_prueba_updated is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba_updated

@router.delete("/tipo_prueba/{tipo_prueba_id}", response_model=schemas.TipoPrueba)
def delete_tipo_prueba(tipo_prueba_id: int, db: Session = Depends(get_db)):
    tipo_prueba_deleted = crud.delete_tipo_prueba(db=db, tipo_prueba_id=tipo_prueba_id)
    if tipo_prueba_deleted is None:
        raise HTTPException(status_code=404, detail="TipoPrueba not found")
    return tipo_prueba_deleted