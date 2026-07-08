from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.auth.security import get_current_user
from app.database.database import get_db
from app.models.bank import Bank
from app.models.branch import Branch
from app.schemas.branch_schema import BranchCreate

router = APIRouter(prefix="/branches", tags=["Branches"])

@router.get("/")
def get_branches(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    rows = db.query(Branch).all()
    return [{"id": b.id, "bank_id": b.bank_id, "bank_code": b.bank.bank_code, "bank_name": b.bank.bank_name,
             "branch_name": b.branch_name, "city": b.city, "engineer": b.engineer, "status": b.status,
             "machine_count": len(b.machines)} for b in rows]

@router.post("/", status_code=201)
def add_branch(payload: BranchCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not db.get(Bank, payload.bank_id):
        raise HTTPException(404, "Bank not found")
    branch = Branch(**payload.model_dump())
    db.add(branch); db.commit(); db.refresh(branch)
    return {"id": branch.id, **payload.model_dump(), "bank_code": branch.bank.bank_code,
            "bank_name": branch.bank.bank_name, "machine_count": 0}

@router.delete("/{branch_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_branch(branch_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    branch = db.get(Branch, branch_id)
    if not branch: raise HTTPException(404, "Branch not found")
    db.delete(branch); db.commit()
    return Response(status_code=204)
