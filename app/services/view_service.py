from sqlalchemy.orm import Session
from ..repositories.view_repository import ViewRepository

class ViewService:
    def __init__(self, db: Session):
        self.repository = ViewRepository(db)

    def get_views(self) -> int:
        view = self.repository.get_view_count()
        return view.count

    def increment_views(self) -> int:
        view = self.repository.increment_view_count()
        return view.count
