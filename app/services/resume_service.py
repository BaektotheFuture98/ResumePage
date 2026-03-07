from sqlalchemy.orm import Session
from ..repositories.resume_repository import ResumeRepository

class ResumeService:
    def __init__(self, db: Session):
        self.repository = ResumeRepository(db)

    def get_resume(self) -> dict:
        return self.repository.get_full_resume_data()
