from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from app.auth.security import get_current_user
from app.database.database import get_db
from app.models.branch import Branch
from app.models.machine import Machine
from app.schemas.machine_schema import MachineCreate

router = APIRouter(prefix="/machines", tags=["Machines"])

@router.get("/")
def get_machines(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    rows = db.query(Machine).all()
    return [{"id": m.id, "machine_code": m.machine_code, "machine_type": m.machine_type, "branch_id": m.branch_id,
             "branch_name": m.branch.branch_name, "bank_code": m.branch.bank.bank_code, "status": m.status,
             "last_service": m.last_service, "priority": m.priority} for m in rows]

@router.post("/", status_code=201)
def add_machine(payload: MachineCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    if not db.get(Branch, payload.branch_id): raise HTTPException(404, "Branch not found")
    code = payload.machine_code.strip().upper()
    if db.query(Machine).filter(Machine.machine_code == code).first(): raise HTTPException(400, "Machine code already exists")
    data = payload.model_dump(); data["machine_code"] = code
    machine = Machine(**data); db.add(machine); db.commit(); db.refresh(machine)
    return {"id": machine.id, **data, "branch_name": machine.branch.branch_name, "bank_code": machine.branch.bank.bank_code}

@router.delete("/{machine_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_machine(machine_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    machine = db.get(Machine, machine_id)
    if not machine: raise HTTPException(404, "Machine not found")
    db.delete(machine); db.commit()
    return Response(status_code=204)
