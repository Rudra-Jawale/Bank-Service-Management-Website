from fastapi import FastAPI

from app.database.database import engine
from app.models.user import User

User.metadata.create_all(bind=engine)

app = FastAPI(
    title="Bank Service Management API",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "API Running Successfully"
    }