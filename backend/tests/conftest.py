import os
import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "visioart_test")
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")
os.environ.setdefault("JWT_SECRET", "test-secret")

import pytest
from mongomock_motor import AsyncMongoMockClient

import database

# Substitui a conexão real do Mongo por uma versão in-memory ANTES de importar
# server/auth/routers, para que todos peguem essa mesma instância de teste.
database.client = AsyncMongoMockClient()
database.db = database.client["visioart_test"]

from server import app  # noqa: E402
from rate_limit import limiter  # noqa: E402


@pytest.fixture
def db():
    return database.db


@pytest.fixture(autouse=True)
def reset_rate_limiter():
    limiter.reset()


@pytest.fixture(autouse=True)
async def clear_db(db):
    yield
    await db.users.delete_many({})
    await db.projects.delete_many({})
    await db.materials.delete_many({})


@pytest.fixture
def app_instance():
    return app
