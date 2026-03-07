from sqlalchemy.orm import Session
from ..models import ViewCount

class ViewRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_view_count(self) -> ViewCount:
        view = self.db.query(ViewCount).first()
        if not view:
            view = ViewCount(count=0)
            self.db.add(view)
            self.db.commit()
            self.db.refresh(view)
        return view

    def increment_view_count(self) -> ViewCount:
        view = self.get_view_count()
        view.count += 1
        self.db.commit()
        self.db.refresh(view)
        return view
