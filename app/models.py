from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class ViewCount(Base):
    __tablename__ = "view_counts"

    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)

class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, default="백선민")
    phone = Column(String, default="")
    email = Column(String, default="")
    github = Column(String, default="")
    intro_quote = Column(String, default="")
    bio_text = Column(String, default="")

class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)
    items = Column(JSON, default=list)

class Experience(Base):
    __tablename__ = "experiences"
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String)
    department = Column(String)
    role = Column(String)
    duration = Column(String)
    details = Column(JSON, default=list)

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    context = Column(String)
    goal = Column(String)
    process = Column(JSON, default=list)
    outcome = Column(JSON, default=list)
    tech_stack = Column(String)

class Education(Base):
    __tablename__ = "educations"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    items = Column(JSON, default=list)
