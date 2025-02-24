from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.crud import so as crud_so
from app.schemas.so import SOCreate, SOUpdate
from app.db.session import get_db

router = APIRouter()

@router.get("/{so_id}")
def read_so(so_id: int, db: Session = Depends(get_db)):
    return crud_so.get_so(db, so_id)

@router.get("/")
def read_sos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud_so.get_sos(db, skip, limit)

@router.post("/")
def create_so(so: SOCreate, db: Session = Depends(get_db)):
    return crud_so.create_so(db, so)

@router.put("/{so_id}")
def update_so(so_id: int, so: SOUpdate, db: Session = Depends(get_db)):
    return crud_so.update_so(db, so_id, so)

@router.delete("/{so_id}")
def delete_so(so_id: int, db: Session = Depends(get_db)):
    return crud_so.delete_so(db, so_id)