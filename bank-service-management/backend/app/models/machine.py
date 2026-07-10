from sqlalchemy import Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.database.database import Base

class Machine(Base):
    __tablename__ = "machines"
    id = Column(Integer, primary_key=True, index=True)
    machine_code = Column(String, unique=True, nullable=False, index=True)
    machine_type = Column(String, nullable=False)
    branch_id = Column(Integer, ForeignKey("branches.id", ondelete="CASCADE"), nullable=False, index=True)
    status = Column(String, nullable=False, default="Working")
    last_service = Column(Date, nullable=True)
    priority = Column(String, nullable=False, default="Normal")
    branch = relationship("Branch", back_populates="machines")
