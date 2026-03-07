from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.view_service import ViewService
from pydantic import BaseModel

router = APIRouter(prefix="/api/views", tags=["views"])

class ViewResponse(BaseModel):
    view_count: int

@router.get("", response_model=ViewResponse)
@router.get("/", response_model=ViewResponse, include_in_schema=False)
def get_views(db: Session = Depends(get_db)):
    service = ViewService(db)
    count = service.get_views()
    return {"view_count": count}

@router.post("", response_model=ViewResponse)
@router.post("/", response_model=ViewResponse, include_in_schema=False)
def increment_views(db: Session = Depends(get_db)):
    service = ViewService(db)
    count = service.increment_views()
    return {"view_count": count}
