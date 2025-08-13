from fastapi import APIRouter


router = APIRouter(prefix="/health")


@router.get("/", tags=["Health"])
async def health_check():
    return {"status": "healthy"}
