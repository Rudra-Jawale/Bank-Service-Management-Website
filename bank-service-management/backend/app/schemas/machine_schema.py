from datetime import date
from pydantic import BaseModel, ConfigDict

class MachineCreate(BaseModel):
    machine_code: str
    machine_type: str
    branch_id: int
    status: str = "Working"
    last_service: date | None = None
    priority: str = "Normal"

class MachineResponse(MachineCreate):
    id: int
    model_config = ConfigDict(from_attributes=True)
