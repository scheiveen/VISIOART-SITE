from typing import List

from fastapi import APIRouter, Depends, HTTPException

from auth import require_role
from database import db
from models import ClientProjectPublic, MaterialPublic, ProjectPublic

router = APIRouter(prefix="/api/client", tags=["client-portal"])

require_client = require_role("client")


@router.get("/projects", response_model=List[ClientProjectPublic])
async def list_my_projects(user: dict = Depends(require_client)):
    projects = (
        await db.projects.find({"client_id": user["id"]}, {"_id": 0})
        .sort("created_at", -1)
        .to_list(1000)
    )
    for project in projects:
        project["material_count"] = await db.materials.count_documents(
            {"project_id": project["id"], "client_id": user["id"]}
        )
    return projects


@router.get("/projects/{project_id}", response_model=ProjectPublic)
async def get_my_project(project_id: str, user: dict = Depends(require_client)):
    # Filtra por client_id no servidor: um projeto que exista mas não seja
    # deste cliente retorna 404, nunca os dados de outro cliente.
    doc = await db.projects.find_one(
        {"id": project_id, "client_id": user["id"]}, {"_id": 0}
    )
    if not doc:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")
    return doc


@router.get("/projects/{project_id}/materials", response_model=List[MaterialPublic])
async def list_my_project_materials(project_id: str, user: dict = Depends(require_client)):
    project = await db.projects.find_one({"id": project_id, "client_id": user["id"]})
    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado")

    return (
        await db.materials.find(
            {"project_id": project_id, "client_id": user["id"]}, {"_id": 0}
        )
        .sort("published_at", -1)
        .to_list(1000)
    )
