from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.bank_schema import BankCreate
from app.repository.bank_repository import (
    create_bank,
    get_all_banks,
    get_bank_by_id,
    update_bank,
    delete_bank
)
from app.auth.security import get_current_user

router = APIRouter(
    prefix="/banks",
    tags=["Banks"]
)

@router.post("/")
def add_bank(
    bank: BankCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return create_bank(db, bank)

@router.get("/")
def fetch_banks(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return get_all_banks(db)

@router.get("/{bank_id}")
def fetch_bank(
    bank_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    bank = get_bank_by_id(db, bank_id)

    if not bank:
        raise HTTPException(
            status_code=404,
            detail="Bank not found"
        )

    return bank