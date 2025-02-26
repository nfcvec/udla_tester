from fastapi import APIRouter, HTTPException, Depends, Query
import json
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.SO)
def create_so(so: schemas.SOCreate, db: Session = Depends(get_db)):
    return crud.create_so(db=db, so=so)

@router.get("/", response_model=dict)
def read_sos(sorts: str = Query('[]'), pagination: str = Query('{}'), filters: str = Query('[]'), db: Session = Depends(get_db)):
    filters = json.loads(filters)
    sorts = json.loads(sorts)
    pagination = json.loads(pagination)
    sos, total = crud.get_sos(db, sorts=sorts, filters=filters, pagination=pagination)
    return {"data": [schemas.SO.model_validate(so) for so in sos], "total": total}

@router.get("/{so_id}", response_model=schemas.SO)
def read_so(so_id: int, db: Session = Depends(get_db)):
    db_so = crud.get_so(db=db, so_id=so_id)
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so

@router.put("/{so_id}", response_model=schemas.SO)
def update_so(so_id: int, so: schemas.SOUpdate, db: Session = Depends(get_db)):
    db_so = crud.update_so(db=db, so_id=so_id, so=so)
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so

@router.delete("/{so_id}", response_model=schemas.SO)
def delete_so(so_id: int, db: Session = Depends(get_db)):
    try:
        db_so = crud.delete_so(db=db, so_id=so_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    if db_so is None:
        raise HTTPException(status_code=404, detail="SO not found")
    return db_so