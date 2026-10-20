import hashlib

from routers import portfolio
from tests.test_auth_and_isolation import auth_headers, login, make_client, seed_admin


async def admin_token(ac, db):
    await seed_admin(db)
    return await login(ac, "admin@visioart.com", "admin12345")


async def test_seed_and_public_list(app_instance, db):
    await portfolio.seed_default_portfolio()
    await portfolio.seed_default_portfolio()  # idempotente
    async with await make_client(app_instance) as ac:
        resp = await ac.get("/api/portfolio")
    assert resp.status_code == 200
    items = resp.json()
    assert len(items) == len(portfolio.DEFAULT_PORTFOLIO)
    assert items[0]["featured"] is True
    # O "Ã" decomposto do public_id precisa ir codificado na URL.
    assert "PEDIDO_JOA%CC%83O_HORIZONTAL_SITE_ihq4yw.mp4" in items[0]["video_url"]
    assert "/so_45," in items[1]["thumbnail_url"]


async def test_admin_routes_require_admin(app_instance):
    async with await make_client(app_instance) as ac:
        assert (await ac.get("/api/admin/portfolio")).status_code == 401
        assert (await ac.post("/api/admin/portfolio/upload-signature")).status_code == 401


async def test_upload_signature(app_instance, db, monkeypatch):
    monkeypatch.setenv("CLOUDINARY_URL", "cloudinary://123:segredo@minhanuvem")
    async with await make_client(app_instance) as ac:
        token = await admin_token(ac, db)
        resp = await ac.post("/api/admin/portfolio/upload-signature", headers=auth_headers(token))
    data = resp.json()
    expected = hashlib.sha1(
        f"public_id={data['public_id']}&timestamp={data['timestamp']}segredo".encode()
    ).hexdigest()
    assert data["signature"] == expected
    assert data["cloud_name"] == "minhanuvem"
    assert "segredo" not in resp.text


async def test_upload_signature_without_config(app_instance, db, monkeypatch):
    monkeypatch.delenv("CLOUDINARY_URL", raising=False)
    async with await make_client(app_instance) as ac:
        token = await admin_token(ac, db)
        resp = await ac.post("/api/admin/portfolio/upload-signature", headers=auth_headers(token))
    assert resp.status_code == 503


async def test_create_reorder_feature_delete(app_instance, db):
    await portfolio.seed_default_portfolio()
    async with await make_client(app_instance) as ac:
        token = await admin_token(ac, db)
        h = auth_headers(token)

        created = await ac.post("/api/admin/portfolio", headers=h, json={
            "tag": "Casamento", "title": "Novo", "public_id": "portfolio/abc",
            "version": "123", "thumb_offset": 10,
        })
        assert created.status_code == 200, created.text
        new_id = created.json()["id"]

        items = (await ac.get("/api/portfolio")).json()
        assert [i["order"] for i in items] == list(range(len(items)))
        assert items[1]["id"] == new_id  # logo após o destaque

        # Reordenar: o destaque continua em primeiro mesmo se vier no fim.
        ids = [i["id"] for i in items]
        reordered = [ids[2], ids[1], *ids[3:], ids[0]]
        resp = await ac.put("/api/admin/portfolio/reorder", headers=h, json={"ids": reordered})
        assert resp.status_code == 200
        assert [i["id"] for i in resp.json()] == [ids[0], ids[2], ids[1], *ids[3:]]

        # Novo destaque: só um por vez, sempre no topo.
        resp = await ac.put(f"/api/admin/portfolio/{new_id}", headers=h, json={"featured": True})
        assert resp.json()["featured"] is True
        items = (await ac.get("/api/portfolio")).json()
        assert items[0]["id"] == new_id
        assert sum(i["featured"] for i in items) == 1

        assert (await ac.put("/api/admin/portfolio/reorder", headers=h, json={"ids": ids[:2]})).status_code == 400

        # Remover o destaque: o próximo da lista assume.
        assert (await ac.delete(f"/api/admin/portfolio/{new_id}", headers=h)).status_code == 200
        items = (await ac.get("/api/portfolio")).json()
        assert len(items) == len(portfolio.DEFAULT_PORTFOLIO)
        assert items[0]["id"] == ids[0] and items[0]["featured"] is True
        assert [i["order"] for i in items] == list(range(len(items)))
