import uuid
from datetime import timedelta

from app.src.core.config import settings
from app.src.utils import security


def test_hash_verify_password():
    plain = "s3cr3t!"
    hashed = security.hash_password(plain)
    assert isinstance(hashed, str) and hashed
    assert security.verify_password(plain, hashed) is True
    assert security.verify_password("wrong", hashed) is False


def test_jwt_generation_and_verification():
    uid = uuid.uuid4()
    token = security.generate_jwt_token(uid, "Alice", "Smith", "user", "active")
    assert isinstance(token, str) and token

    payload = security.decode_jwt_token(token, settings.JWT_SECRET_KEY)
    assert payload is not None
    assert payload["sub"] == str(uid)
    assert payload["first_name"] == "Alice"
    assert security.verify_jwt_token(token, settings.JWT_SECRET_KEY) is True


def test_jwt_expired_token():
    uid = uuid.uuid4()
    token = security.generate_jwt_token(
        uid, "Bob", "Jones", "user", "active", expires_delta=timedelta(seconds=-10)
    )
    assert security.decode_jwt_token(token, settings.JWT_SECRET_KEY) is None
    assert security.verify_jwt_token(token, settings.JWT_SECRET_KEY) is False
