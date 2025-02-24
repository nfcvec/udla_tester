from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import item as crud
from app.schemas.item import Item, ItemCreate
from app.db.session import get_db

router = APIRouter()

@router.post("/", response_model=Item)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db=db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item