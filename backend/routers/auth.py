from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, EmailStr

from auth import create_access_token, get_current_user, verify_password
from database import db
from models import UserPublic
from rate_limit import limiter

router = APIRouter(prefix="/api/auth", tags=["auth"])


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    name: str


@router.post("/login", response_model=LoginResponse)
@limiter.limit("5/minute")
async def login(request: Request, payload: LoginRequest):
    user = await db.users.find_one({"email": payload.email.lower()})
    if not user or not verify_password(payload.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="E-mail ou senha inválidos")
    if not user.get("active", True):
        raise HTTPException(
            status_code=403,
            detail="Conta desativada. Entre em contato com a VISIOART.",
        )

    token = create_access_token(user["id"], user["role"])
    return LoginResponse(access_token=token, role=user["role"], name=user["name"])


@router.get("/me", response_model=UserPublic)
async def me(user: dict = Depends(get_current_user)):
    return user
