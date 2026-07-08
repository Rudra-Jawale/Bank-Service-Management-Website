from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class Branch(Base):
    __tablename__ = "branches"
    id = Column(Integer, primary_key=True, index=True)
    bank_id = Column(Integer, ForeignKey("banks.id", ondelete="CASCADE"), nullable=False, index=True)
    branch_name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    engineer = Column(String, nullable=False, default="Unassigned")
    status = Column(String, nullable=False, default="Covered")
    bank = relationship("Bank", back_populates="branches")
    machines = relationship("Machine", back_populates="branch", cascade="all, delete-orphan", passive_deletes=True)
