# from sqlalchemy import Column, Integer, String
# from app.database.database import Base
# # from app.repository.bank_repository import (
# #     create_bank,
# #     get_all_banks,
# #     get_bank_by_id,
# #     update_bank,
# #     delete_bank
# # )
# class Bank(Base):
#     __tablename__ = "banks"

#     id = Column(Integer, primary_key=True, index=True)
#     bank_name = Column(String, nullable=False)
#     bank_code = Column(String, unique=True, nullable=False)
#     head_office = Column(String, nullable=False)

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class Bank(Base):
    __tablename__ = "banks"

    id = Column(Integer, primary_key=True, index=True)
    bank_name = Column(String, nullable=False)
    bank_code = Column(String, unique=True, nullable=False)
    head_office = Column(String, nullable=False)

    branches = relationship(
        "Branch",
        back_populates="bank",
        cascade="all, delete-orphan",
        passive_deletes=True,
    )