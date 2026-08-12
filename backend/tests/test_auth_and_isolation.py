import pytest
from httpx import ASGITransport, AsyncClient

from auth import hash_password
from models import new_id, utcnow


async def make_client(app):
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


async def seed_admin(db, email="admin@visioart.com", password="admin12345"):
    doc = {
        "id": new_id(),
        "name": "Admin VISIOART",
        "email": email,
        "phone": None,
        "role": "admin",
        "active": True,
        "password_hash": hash_password(password),
        "created_at": utcnow(),
    }
    await db.users.insert_one(doc)
    return doc


async def login(ac, email, password):
    resp = await ac.post("/api/auth/login", json={"email": email, "password": password})
    assert resp.status_code == 200, resp.text
    return resp.json()["access_token"]


def auth_headers(token):
    return {"Authorization": f"Bearer {token}"}


# ---------- Login ----------

async def test_login_success_and_wrong_password(app_instance, db):
    await seed_admin(db)
    async with await make_client(app_instance) as ac:
        ok = await ac.post(
            "/api/auth/login", json={"email": "admin@visioart.com", "password": "admin12345"}
        )
        assert ok.status_code == 200
        assert ok.json()["role"] == "admin"

        wrong = await ac.post(
            "/api/auth/login", json={"email": "admin@visioart.com", "password": "errada"}
        )
        assert wrong.status_code == 401


async def test_unauthenticated_request_rejected(app_instance):
    async with await make_client(app_instance) as ac:
        resp = await ac.get("/api/admin/dashboard")
        assert resp.status_code == 401


async def test_client_cannot_access_admin_routes(app_instance, db):
    await seed_admin(db)
    async with await make_client(app_instance) as ac:
        admin_token = await login(ac, "admin@visioart.com", "admin12345")

        create_resp = await ac.post(
            "/api/admin/clients",
            headers=auth_headers(admin_token),
            json={
                "name": "Cliente Teste",
                "email": "cliente@example.com",
                "password": "senha1234",
            },
        )
        assert create_resp.status_code == 200

        client_token = await login(ac, "cliente@example.com", "senha1234")
        resp = await ac.get("/api/admin/dashboard", headers=auth_headers(client_token))
        assert resp.status_code == 403


# ---------- Isolamento entre clientes (item 17 do pedido) ----------

async def _create_client(ac, admin_token, name, email, password="senha1234"):
    resp = await ac.post(
        "/api/admin/clients",
        headers=auth_headers(admin_token),
        json={"name": name, "email": email, "password": password},
    )
    assert resp.status_code == 200, resp.text
    return resp.json()["id"]


async def _create_project(ac, admin_token, client_id, name):
    resp = await ac.post(
        "/api/admin/projects",
        headers=auth_headers(admin_token),
        json={"client_id": client_id, "name": name, "status": "entregue"},
    )
    assert resp.status_code == 200, resp.text
    return resp.json()["id"]


async def _create_material(ac, admin_token, project_id, name, download_allowed=True):
    resp = await ac.post(
        "/api/admin/materials",
        headers=auth_headers(admin_token),
        json={
            "project_id": project_id,
            "category": "video_principal",
            "name": name,
            "file_url": "https://drive.google.com/file/d/exemplo/view",
            "download_allowed": download_allowed,
        },
    )
    assert resp.status_code == 200, resp.text
    return resp.json()["id"]


async def test_client_can_only_see_own_project_and_materials(app_instance, db):
    await seed_admin(db)
    async with await make_client(app_instance) as ac:
        admin_token = await login(ac, "admin@visioart.com", "admin12345")

        client_a_id = await _create_client(ac, admin_token, "Cliente A", "a@example.com")
        client_b_id = await _create_client(ac, admin_token, "Cliente B", "b@example.com")

        project_a_id = await _create_project(ac, admin_token, client_a_id, "Casamento A")
        project_b_id = await _create_project(ac, admin_token, client_b_id, "Casamento B")

        material_a_id = await _create_material(ac, admin_token, project_a_id, "Vídeo A")
        await _create_material(ac, admin_token, project_b_id, "Vídeo B")

        token_a = await login(ac, "a@example.com", "senha1234")

        # Cliente A vê só o próprio projeto na listagem
        listing = await ac.get("/api/client/projects", headers=auth_headers(token_a))
        assert listing.status_code == 200
        ids = [p["id"] for p in listing.json()]
        assert ids == [project_a_id]

        # Cliente A acessa o próprio projeto normalmente
        own = await ac.get(f"/api/client/projects/{project_a_id}", headers=auth_headers(token_a))
        assert own.status_code == 200

        own_materials = await ac.get(
            f"/api/client/projects/{project_a_id}/materials", headers=auth_headers(token_a)
        )
        assert own_materials.status_code == 200
        assert [m["id"] for m in own_materials.json()] == [material_a_id]

        # Cliente A NÃO consegue acessar o projeto do Cliente B forçando o ID na URL
        forbidden_project = await ac.get(
            f"/api/client/projects/{project_b_id}", headers=auth_headers(token_a)
        )
        assert forbidden_project.status_code == 404

        forbidden_materials = await ac.get(
            f"/api/client/projects/{project_b_id}/materials", headers=auth_headers(token_a)
        )
        assert forbidden_materials.status_code == 404


async def test_admin_delete_client_blocked_when_has_projects(app_instance, db):
    await seed_admin(db)
    async with await make_client(app_instance) as ac:
        admin_token = await login(ac, "admin@visioart.com", "admin12345")
        client_id = await _create_client(ac, admin_token, "Cliente C", "c@example.com")
        await _create_project(ac, admin_token, client_id, "Projeto C")

        resp = await ac.delete(f"/api/admin/clients/{client_id}", headers=auth_headers(admin_token))
        assert resp.status_code == 409


async def test_admin_delete_project_cascades_materials(app_instance, db):
    await seed_admin(db)
    async with await make_client(app_instance) as ac:
        admin_token = await login(ac, "admin@visioart.com", "admin12345")
        client_id = await _create_client(ac, admin_token, "Cliente D", "d@example.com")
        project_id = await _create_project(ac, admin_token, client_id, "Projeto D")
        await _create_material(ac, admin_token, project_id, "Material D")

        resp = await ac.delete(f"/api/admin/projects/{project_id}", headers=auth_headers(admin_token))
        assert resp.status_code == 200
        assert resp.json()["materials_deleted"] == 1

        materials = await ac.get(
            "/api/admin/materials", headers=auth_headers(admin_token), params={"project_id": project_id}
        )
        assert materials.json() == []


# ---------- Regressão: endpoints antigos continuam funcionando ----------

async def test_legacy_status_endpoints_untouched(app_instance):
    async with await make_client(app_instance) as ac:
        root = await ac.get("/api/")
        assert root.status_code == 200
        assert root.json() == {"message": "Hello World"}

        created = await ac.post("/api/status", json={"client_name": "teste-regressao"})
        assert created.status_code == 200

        listed = await ac.get("/api/status")
        assert listed.status_code == 200
        assert any(item["client_name"] == "teste-regressao" for item in listed.json())
