from fastapi import FastAPI
from dotenv import load_dotenv


# Load environment variables from .env file
load_dotenv()


# for simple FastAPI application setup we can use app = FastAPI() directly
# but for more complex applications, we might want to encapsulate it in a function
def create_app() -> FastAPI:
    app = FastAPI()
    return app
