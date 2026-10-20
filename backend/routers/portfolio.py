import hashlib
import os
import re
import time
import uuid
from typing import List
from urllib.parse import quote

from fastapi import APIRouter, Depends, HTTPException

from auth import require_role
from database import db
from models import (
    PortfolioCreate,
    PortfolioPublic,
    PortfolioReorder,
    PortfolioUpdate,
    new_id,
    utcnow,
)

DEFAULT_CLOUD_NAME = "dzv2rrgj0"

# Filmes que já estavam no site antes do portfólio ir para o banco. Entram
# automaticamente na primeira inicialização com a coleção vazia.
DEFAULT_PORTFOLIO = [
    {"tag": "Pedido de Casamento", "title": "João & Julia",
     "public_id": "PEDIDO_JOÃO_HORIZONTAL_SITE_ihq4yw", "version": "1778846014",
     "featured": True},
    {"tag": "Casamento", "title": "Leticia & Wagner",
     "public_id": "LETICIA_WAGNER_SITE", "version": "1792534708", "thumb_offset": 45},
    {"tag": "Institucional", "title": "Secretaria de Saúde de Alfredo Wagner",
     "public_id": "SAUDE_SITE_jxin5y", "version": "1778846438"},
    {"tag": "Aniversário de 15 anos", "title": "Isabela",
     "public_id": "ENSAIO_ISA_SITE_lbtnq2", "version": "1778846015"},
    {"tag": "Cerimônia de Casamento", "title": "Marina & Andrigo",
     "public_id": "MARINA_SITE_f3txsw", "version": "1780511947"},
    {"tag": "Construção", "title": "Recanto das Américas Wellness Resort & Spa",
     "public_id": "RESORT_SITE_1_sohhwy", "version": "1778846002"},
]


def cloudinary_credentials():
    """(cloud_name, api_key, api_secret) a partir de CLOUDINARY_URL, ou None."""
    match = re.match(
        r"cloudinary://([^:]+):([^@]+)@(.+)", os.environ.get("CLOUDINARY_URL", "").strip()
    )
    if not match:
        return None
    api_key, api_secret, cloud_name = match.groups()
    return cloud_name, api_key, api_secret


def cloud_name() -> str:
    creds = cloudinary_credentials()
    return creds[0] if creds else DEFAULT_CLOUD_NAME


def with_urls(doc: dict) -> dict:
    """Acrescenta as URLs de entrega (MP4 leve + miniatura) ao documento."""
    base = f"https://res.cloudinary.com/{cloud_name()}/video/upload"
    path = f"v{doc['version']}/{quote(doc['public_id'], safe='/')}"
    offset = doc.get("thumb_offset", 2)
    return {
        **doc,
        "video_url": f"{base}/q_auto,w_1280/{path}.mp4",
        "thumbnail_url": f"{base}/so_{offset:g},w_1200,h_675,c_fill,q_auto,f_auto/{path}.jpg",
    }


async def list_items() -> List[dict]:
    docs = await db.portfolio.find({}, {"_id": 0}).sort("order", 1).to_list(1000)
    return [with_urls(doc) for doc in docs]


async def seed_default_portfolio():
    if await db.portfolio.count_documents({}) > 0:
        return
    now = utcnow()
    await db.portfolio.insert_many([
        {
            "id": new_id(),
            "thumb_offset": 2,
            "featured": False,
            "duration": None,
            **item,
            "order": index,
            "created_at": now,
        }
        for index, item in enumerate(DEFAULT_PORTFOLIO)
    ])


# ---------- Público (site) ----------

public_router = APIRouter(prefix="/api/portfolio", tags=["portfolio"])


@public_router.get("", response_model=List[PortfolioPublic])
async def public_portfolio():
    return await list_items()


# ---------- Admin ----------

router = APIRouter(
    prefix="/api/admin/portfolio",
    tags=["admin"],
    dependencies=[Depends(require_role("admin"))],
)


@router.get("", response_model=List[PortfolioPublic])
async def admin_list_portfolio():
    return await list_items()


@router.post("/upload-signature")
async def upload_signature():
    """Assina um upload direto do navegador para o Cloudinary.

    O arquivo não passa pelo backend: o navegador envia em partes para o
    Cloudinary usando esta assinatura, válida por 1 hora.
    """
    creds = cloudinary_credentials()
    if not creds:
        raise HTTPException(
            status_code=503,
            detail="CLOUDINARY_URL não configurada no servidor.",
        )
    name, api_key, api_secret = creds
    params = {
        "public_id": f"portfolio/{uuid.uuid4().hex[:12]}",
        "timestamp": str(int(time.time())),
    }
    to_sign = "&".join(f"{key}={params[key]}" for key in sorted(params))
    signature = hashlib.sha1((to_sign + api_secret).encode()).hexdigest()
    return {
        **params,
        "signature": signature,
        "api_key": api_key,
        "cloud_name": name,
        "upload_url": f"https://api.cloudinary.com/v1_1/{name}/video/upload",
    }


async def clear_other_featured(item_id: str):
    await db.portfolio.update_many(
        {"id": {"$ne": item_id}, "featured": True}, {"$set": {"featured": False}}
    )


async def normalize_order():
    """Renumera 0..n-1 mantendo o destaque sempre em primeiro."""
    docs = await db.portfolio.find({}, {"_id": 0, "id": 1, "featured": 1}).sort("order", 1).to_list(1000)
    docs.sort(key=lambda doc: not doc.get("featured", False))
    for index, doc in enumerate(docs):
        await db.portfolio.update_one({"id": doc["id"]}, {"$set": {"order": index}})


@router.post("", response_model=PortfolioPublic)
async def create_portfolio_item(payload: PortfolioCreate):
    doc = payload.model_dump()
    doc["id"] = new_id()
    # Filme novo entra logo depois do destaque (ou vira o destaque).
    doc["order"] = -1 if payload.featured else 0.5
    doc["created_at"] = utcnow()
    if payload.featured:
        await clear_other_featured(doc["id"])
    await db.portfolio.insert_one(doc)
    await normalize_order()
    return with_urls(await db.portfolio.find_one({"id": doc["id"]}, {"_id": 0}))


@router.put("/reorder", response_model=List[PortfolioPublic])
async def reorder_portfolio(payload: PortfolioReorder):
    existing = {doc["id"] for doc in await db.portfolio.find({}, {"id": 1}).to_list(1000)}
    if set(payload.ids) != existing:
        raise HTTPException(status_code=400, detail="Lista de filmes desatualizada. Recarregue a página.")
    for index, item_id in enumerate(payload.ids):
        await db.portfolio.update_one({"id": item_id}, {"$set": {"order": index}})
    await normalize_order()
    return await list_items()


@router.put("/{item_id}", response_model=PortfolioPublic)
async def update_portfolio_item(item_id: str, payload: PortfolioUpdate):
    if not await db.portfolio.find_one({"id": item_id}):
        raise HTTPException(status_code=404, detail="Filme não encontrado")

    update = payload.model_dump(exclude_unset=True)
    if update.get("featured"):
        await clear_other_featured(item_id)
    if update:
        await db.portfolio.update_one({"id": item_id}, {"$set": update})
    await normalize_order()
    return with_urls(await db.portfolio.find_one({"id": item_id}, {"_id": 0}))


@router.delete("/{item_id}")
async def delete_portfolio_item(item_id: str):
    doc = await db.portfolio.find_one({"id": item_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Filme não encontrado")
    # O arquivo continua no Cloudinary; só sai do site.
    await db.portfolio.delete_one({"id": item_id})
    if doc.get("featured"):
        # O site sempre tem um destaque: o próximo da lista assume.
        first = await db.portfolio.find({}, {"_id": 0, "id": 1}).sort("order", 1).to_list(1)
        if first:
            await db.portfolio.update_one({"id": first[0]["id"]}, {"$set": {"featured": True}})
    await normalize_order()
    return {"ok": True}

