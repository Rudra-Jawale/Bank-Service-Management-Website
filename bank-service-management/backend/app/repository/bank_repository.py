from sqlalchemy.orm import Session
from app.models.bank import Bank

def create_bank(db: Session, bank):
    new_bank = Bank(
        bank_name=bank.bank_name,
        bank_code=bank.bank_code,
        head_office=bank.head_office
    )

    db.add(new_bank)
    db.commit()
    db.refresh(new_bank)

    return new_bank

def get_all_banks(db: Session):
    return db.query(Bank).all()

def get_bank_by_id(db: Session, bank_id: int):
    return db.query(Bank).filter(
        Bank.id == bank_id
    ).first()

def update_bank(db: Session, bank_id: int, bank_data):
    bank = get_bank_by_id(db, bank_id)

    if not bank:
        return None

    bank.bank_name = bank_data.bank_name
    bank.bank_code = bank_data.bank_code
    bank.head_office = bank_data.head_office

    db.commit()
    db.refresh(bank)

    return bank


def delete_bank(db: Session, bank_id: int):
    bank = get_bank_by_id(db, bank_id)

    if not bank:
        return None

    db.delete(bank)
    db.commit()

    return bank