from fastapi import FastAPI
from dotenv import load_dotenv
from app.src.routes.task import router as task_router

# Load environment variables from .env file
load_dotenv()


# for simple FastAPI application setup we can use app = FastAPI() directly
# but for more complex applications, we might want to encapsulate it in a function
def create_app() -> FastAPI:
    app = FastAPI()
    app.include_router(task_router)
    return app
