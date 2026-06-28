from pydantic import BaseModel

class BankCreate(BaseModel):
    bank_name: str
    bank_code: str
    head_office: str

class BankResponse(BaseModel):
    id: int
    bank_name: str
    bank_code: str
    head_office: str

    class Config:
        from_attributes = True