from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app import crud, schemas
from app.database import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Tester)
def create_tester(tester: schemas.TesterCreate, db: Session = Depends(get_db)):
    return crud.create_tester(db=db, tester=tester)

@router.get("/{tester_id}", response_model=schemas.Tester)
def read_tester(tester_id: int, db: Session = Depends(get_db)):
    tester = crud.get_tester(db=db, tester_id=tester_id)
    if tester is None:
        raise HTTPException(status_code=404, detail="Tester not found")
    return tester

@router.get("/", response_model=list[schemas.Tester])
def read_testers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    testers = crud.get_testers(db=db, skip=skip, limit=limit)
    return testers

@router.put("/{tester_id}", response_model=schemas.Tester)
def update_tester(tester_id: int, tester: schemas.TesterUpdate, db: Session = Depends(get_db)):
    updated_tester = crud.update_tester(db=db, tester_id=tester_id, tester=tester)
    if updated_tester is None:
        raise HTTPException(status_code=404, detail="Tester not found")
    return updated_tester

@router.delete("/{tester_id}", response_model=schemas.Tester)
def delete_tester(tester_id: int, db: Session = Depends(get_db)):
    deleted_tester = crud.delete_tester(db=db, tester_id=tester_id)
    if deleted_tester is None:
        raise HTTPException(status_code=404, detail="Tester not found")
    return deleted_tester