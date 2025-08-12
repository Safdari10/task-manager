from fastapi import FastAPI
from dotenv import load_dotenv
from app.src.routes.health import router as health_router
from app.src.routes.task import router as task_router
from app.src.routes.user import router as user_router
from app.src.routes.auth import router as auth_router

# Load environment variables from .env file
load_dotenv()


# for simple FastAPI application setup we can use app = FastAPI() directly
# but for more complex applications, we might want to encapsulate it in a function
def create_app() -> FastAPI:
    app = FastAPI()
    app.include_router(health_router)
    app.include_router(task_router)
    app.include_router(user_router)
    app.include_router(auth_router)
    return app


app = create_app()
