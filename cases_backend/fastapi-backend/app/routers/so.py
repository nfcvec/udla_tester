from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/so/", response_model=schemas.SO)
def create_so(so: schemas.SOCreate, db: Session = Depends(get_db)):
    return crud.create_so(db=db, so=so)

@router.get("/so/", response_model=dict)
def read_sos(skip: int = 0, limit: int = 10, sort_by: str = 'id', sort_order: str = 'asc', db: Session = Depends(get_db)):
    sos, total = crud.get_sos(db, skip=skip, limit=limit, sort_by=sort_by, sort_order=sort_order)
    return {"data": [schemas.SO.model_validate(so) for so in sos], "total": total}

@router.get("/so/{so_id}", response_model=schemas.SO)
def read_so(so_id: int, db: Session = Depends(get_db)):
    db_so = crud.get_so(db=db, so_id=so_id)
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so

@router.put("/so/{so_id}", response_model=schemas.SO)
def update_so(so_id: int, so: schemas.SOUpdate, db: Session = Depends(get_db)):
    db_so = crud.update_so(db=db, so_id=so_id, so=so)
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so

@router.delete("/so/{so_id}", response_model=schemas.SO)
def delete_so(so_id: int, db: Session = Depends(get_db)):
    db_so = crud.delete_so(db=db, so_id=so_id)
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so