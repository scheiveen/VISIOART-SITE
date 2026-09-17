import uuid
from datetime import datetime, timezone
from typing import Literal, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field


def new_id() -> str:
    return str(uuid.uuid4())


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


Role = Literal["admin", "client"]

ProjectStatus = Literal[
    "em_producao", "em_edicao", "em_aprovacao", "entregue", "arquivado"
]

MaterialCategory = Literal[
    "video_principal", "teaser", "reels", "stories", "outros_videos",
    "galeria", "selecionadas", "redes_sociais",
    "pdf", "documento", "extra",
]

# Agrupamento das categorias nas 3 seções do portal do cliente (item 6 do pedido)
CATEGORY_GROUP: dict[str, str] = {
    "video_principal": "videos",
    "teaser": "videos",
    "reels": "videos",
    "stories": "videos",
    "outros_videos": "videos",
    "galeria": "fotos",
    "selecionadas": "fotos",
    "redes_sociais": "fotos",
    "pdf": "arquivos",
    "documento": "arquivos",
    "extra": "arquivos",
}


# ---------- Users (admin + client, mesma coleção) ----------

class ClientCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str = Field(min_length=8)
    active: bool = True


class ClientUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    active: Optional[bool] = None
    password: Optional[str] = Field(default=None, min_length=8)


class UserPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: Role
    active: bool = True
    created_at: datetime


# ---------- Projects ----------

class ProjectCreate(BaseModel):
    client_id: str
    name: str
    description: Optional[str] = None
    date: Optional[datetime] = None
    cover_image_url: Optional[str] = None
    status: ProjectStatus = "em_producao"


class ProjectUpdate(BaseModel):
    client_id: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    date: Optional[datetime] = None
    cover_image_url: Optional[str] = None
    status: Optional[ProjectStatus] = None


class ProjectPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    client_id: str
    name: str
    description: Optional[str] = None
    date: Optional[datetime] = None
    cover_image_url: Optional[str] = None
    status: ProjectStatus
    created_at: datetime


class ClientProjectPublic(ProjectPublic):
    material_count: int = 0


# ---------- Materials ----------

class MaterialCreate(BaseModel):
    project_id: str
    category: MaterialCategory
    name: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    preview_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    download_allowed: bool = False


class MaterialUpdate(BaseModel):
    project_id: Optional[str] = None
    category: Optional[MaterialCategory] = None
    name: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    preview_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    download_allowed: Optional[bool] = None


class MaterialPublic(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str
    project_id: str
    client_id: str
    category: MaterialCategory
    name: str
    description: Optional[str] = None
    file_url: Optional[str] = None
    preview_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    download_allowed: bool = False
    published_at: datetime
