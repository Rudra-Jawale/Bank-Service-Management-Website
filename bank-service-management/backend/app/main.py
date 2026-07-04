from fastapi import FastAPI
from app.database.database import Base, engine
from app.models.bank import Bank
from app.models.user import User
from app.routes.auth import router as auth_router
from app.routes.bank import router as bank_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bank Service Management API",
    version="1.0.0"
)

app.include_router(auth_router)
app.include_router(bank_router)

@app.get("/")
def root():
    return {
        "message": "API Running Successfully"
    }

