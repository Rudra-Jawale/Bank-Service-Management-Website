from pydantic import BaseModel, ConfigDict

class BranchCreate(BaseModel):
    bank_id: int
    branch_name: str
    city: str
    engineer: str = "Unassigned"
    status: str = "Covered"

class BranchResponse(BranchCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
