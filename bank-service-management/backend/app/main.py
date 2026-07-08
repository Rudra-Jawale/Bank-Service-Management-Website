from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.models.bank import Bank
from app.models.user import User
from app.models.branch import Branch
from app.models.machine import Machine
from app.routes.auth import router as auth_router
from app.routes.bank import router as bank_router
from app.routes.branch import router as branch_router
from app.routes.machine import router as machine_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bank Service Management API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(bank_router)
app.include_router(branch_router)
app.include_router(machine_router)

@app.get("/")
def root():
    return {
        "message": "API Running Successfully"
    }

