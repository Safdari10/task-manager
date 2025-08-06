import os
import sys
from fastapi.testclient import TestClient
from app.main import app

# add the parent directory to the system path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))


client = TestClient(app)
