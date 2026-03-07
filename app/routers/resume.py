from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.resume_service import ResumeService
from ..schemas import ResumeDataResponse

router = APIRouter(prefix="/api/resume", tags=["resume"])

@router.get("", response_model=ResumeDataResponse)
@router.get("/", response_model=ResumeDataResponse, include_in_schema=False)
def get_resume_data(db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.get_resume()
