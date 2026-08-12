"""
Cria o primeiro usuário administrador do painel /admin.

Uso: python create_admin.py
(execute de dentro da pasta backend/, com o .env configurado)
"""
import asyncio
import getpass

from auth import hash_password
from database import db
from models import new_id, utcnow


async def main():
    print("=== Criar usuário admin VISIOART ===")
    name = input("Nome: ").strip()
    email = input("E-mail: ").strip().lower()
    password = getpass.getpass("Senha: ")
    confirm = getpass.getpass("Confirme a senha: ")

    if not name or not email:
        print("Nome e e-mail são obrigatórios.")
        return
    if password != confirm:
        print("As senhas não coincidem.")
        return
    if len(password) < 8:
        print("A senha deve ter pelo menos 8 caracteres.")
        return

    if await db.users.find_one({"email": email}):
        print(f"Já existe um usuário com o e-mail {email}.")
        return

    doc = {
        "id": new_id(),
        "name": name,
        "email": email,
        "phone": None,
        "role": "admin",
        "active": True,
        "password_hash": hash_password(password),
        "created_at": utcnow(),
    }
    await db.users.insert_one(doc)
    print(f"Usuário admin '{name}' criado com sucesso.")


if __name__ == "__main__":
    asyncio.run(main())
