from fastapi import APIRouter


router = APIRouter(prefix="/health")


@router.get("", status_code=200, tags=["Health"])
async def health_check():
    return {"status": "healthy"}
