from fastapi import FastAPI


# for simple FastAPI application setup we can use app = FastAPI() directly
# but for more complex applications, we might want to encapsulate it in a function
def create_app() -> FastAPI:
    app = FastAPI()
    return app
