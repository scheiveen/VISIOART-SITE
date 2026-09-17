from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException

from auth import hash_password, require_role
from database import db
from models import (
    ClientCreate,
    ClientUpdate,
    MaterialCreate,
    MaterialPublic,
    MaterialUpdate,
    ProjectCreate,
    ProjectPublic,
    ProjectUpdate,
    UserPublic,
    new_id,
    utcnow,
)

router = APIRouter(
    prefix="/api/admin",
    tags=["admin"],
    dependencies=[Depends(require_role("admin"))],
)


# ---------- Dashboard ----------

@router.get("/dashboard")
async def dashboard():
    clients_count = await db.users.count_documents({"role": "client"})
    projects_count = await db.projects.count_documents({})
    materials_count = await db.materials.count_documents({})
    recent_projects = (
        await db.projects.find({}, {"_id": 0}).sort("created_at", -1).to_list(5)
    )
    recent_clients = (
        await db.users.find({"role": "client"}, {"_id": 0, "password_hash": 0})
        .sort("created_at", -1)
        .to_list(5)
    )
    return {
        "clients_count": clients_count,
        "projects_count": projects_count,
        "materials_count": materials_count,
        "recent_projects": recent_projects,
        "recent_clients": recent_clients,
    }


# ---------- Clients ----------

@router.get("/clients", response_model=List[UserPublic])
async def list_clients():
    return await db.users.find(
        {"role": "client"}, {"_id": 0, "password_hash": 0}
    ).sort("created_at", -1).to_list(1000)


@router.post("/clients", response_model=UserPublic)
async def create_client(payload: ClientCreate):
    email = payload.email.lower()
    if await db.users.find_one({"email": email}):
        raise HTTPException(status_code=409, detail="Já existe um usuário com este e-mail")

    doc = {
        "id": new_id(),
        "name": payload.name,
        "email": email,
        "phone": payload.phone,
        "role": "client",
        "active": payload.active,
        "password_hash": hash_password(payload.password),
        "created_at": utcnow(),
    }
    await db.users.insert_one(doc)
    doc.pop("password_hash")
    doc.pop("_id", None)
    return doc


@router.put("/clients/{client_id}", response_model=UserPublic)
async def update_client(client_id: str, payload: ClientUpdate):
    if not await db.users.find_one({"id": client_id, "role": "client"}):
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    update = payload.model_dump(exclude_unset=True, exclude={"password"})
    if payload.password:
        update["password_hash"] = hash_password(payload.password)
    if update:
        await db.users.update_one({"id": client_id}, {"$set": update})

    return await db.users.find_one({"id": client_id}, {"_id": 0, "password_hash": 0})


@router.delete("/clients/{client_id}")
async def delete_client(client_id: str):
    if not await db.users.find_one({"id": client_id, "role": "client"}):
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    projects_count = await db.projects.count_documents({"client_id": client_id})
    if projects_count > 0:
        raise HTTPException(
            status_code=409,
            detail=(
                f"Este cliente possui {projects_count} projeto(s). "
                "Exclua ou reatribua os projetos antes de excluir o cliente."
            ),
        )

    await db.users.delete_one({"id": client_id})
    return {"ok": True}


# ---------- Projects ----------

@router.get("/projects", response_model=List[ProjectPublic])
async def list_projects(client_id: Optional[str] = None):
    query = {"client_id": client_id} if client_id else {}
    return await db.projects.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)


@router.post("/projects", response_model=ProjectPublic)
async def create_project(payload: ProjectCreate):
    if not await db.users.find_one({"id": payload.client_id, "role": "client"}):
        raise HTTPException(status_code=404, detail="Cliente não encontrado")

    doc = payload.model_dump()
    doc["id"] = new_id()
    doc["created_at"] = utcnow()
    await db.projects.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.get("/projects/{project_id}", response_model=ProjectPublic)
async def get_project(project_id: str):
    doc = await db.projects.find_one({"id": project_id}, {"_id": 0})
    if not doc:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return doc


@router.put("/projects/{project_id}", response_model=ProjectPublic)
async def update_project(project_id: str, payload: ProjectUpdate):
    if not await db.projects.find_one({"id": project_id}):
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    update = payload.model_dump(exclude_unset=True)
    if "client_id" in update:
        if not await db.users.find_one({"id": update["client_id"], "role": "client"}):
            raise HTTPException(status_code=404, detail="Cliente não encontrado")

    if update:
        await db.projects.update_one({"id": project_id}, {"$set": update})
        if "client_id" in update:
            await db.materials.update_many(
                {"project_id": project_id}, {"$set": {"client_id": update["client_id"]}}
            )

    return await db.projects.find_one({"id": project_id}, {"_id": 0})


@router.delete("/projects/{project_id}")
async def delete_project(project_id: str):
    if not await db.projects.find_one({"id": project_id}):
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    materials_deleted = await db.materials.delete_many({"project_id": project_id})
    await db.projects.delete_one({"id": project_id})
    return {"ok": True, "materials_deleted": materials_deleted.deleted_count}


# ---------- Materials ----------

@router.get("/materials", response_model=List[MaterialPublic])
async def list_materials(project_id: Optional[str] = None, client_id: Optional[str] = None):
    query = {}
    if project_id:
        query["project_id"] = project_id
    if client_id:
        query["client_id"] = client_id
    return await db.materials.find(query, {"_id": 0}).sort("published_at", -1).to_list(1000)


@router.post("/materials", response_model=MaterialPublic)
async def create_material(payload: MaterialCreate):
    project = await db.projects.find_one({"id": payload.project_id})
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    doc = payload.model_dump()
    doc["client_id"] = project["client_id"]
    doc["id"] = new_id()
    doc["published_at"] = utcnow()
    await db.materials.insert_one(doc)
    doc.pop("_id", None)
    return doc


@router.put("/materials/{material_id}", response_model=MaterialPublic)
async def update_material(material_id: str, payload: MaterialUpdate):
    if not await db.materials.find_one({"id": material_id}):
        raise HTTPException(status_code=404, detail="Material não encontrado")

    update = payload.model_dump(exclude_unset=True)
    if "project_id" in update:
        project = await db.projects.find_one({"id": update["project_id"]})
        if not project:
            raise HTTPException(status_code=404, detail="Projeto não encontrado")
        update["client_id"] = project["client_id"]

    if update:
        await db.materials.update_one({"id": material_id}, {"$set": update})

    return await db.materials.find_one({"id": material_id}, {"_id": 0})


@router.delete("/materials/{material_id}")
async def delete_material(material_id: str):
    if not await db.materials.find_one({"id": material_id}):
        raise HTTPException(status_code=404, detail="Material não encontrado")

    await db.materials.delete_one({"id": material_id})
    return {"ok": True}
