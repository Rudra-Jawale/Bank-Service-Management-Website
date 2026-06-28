from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.security import get_current_user
from app.models.user import User
from fastapi.security import OAuth2PasswordRequestForm

from app.database.database import get_db
from app.repository.user_repository import (
    get_user_by_email,
    create_user
)
from app.schemas.user_schema import (
    UserCreate,
    UserLogin
)

from app.auth.security import (
    create_access_token,
    verify_password
)

from app.repository.user_repository import (
    get_user_by_email,
    create_user,
    authenticate_user
)
from app.schemas.user_schema import UserCreate

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(
        db,
        user.email
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    create_user(
        db,
        user.name,
        user.email,
        user.password
    )

    return {
        "message": "User registered successfully"
    }
@router.post("/login")
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    authenticated_user = authenticate_user(
        db,
        form_data.username,
        form_data.password,
        verify_password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        {
            "sub": authenticated_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }