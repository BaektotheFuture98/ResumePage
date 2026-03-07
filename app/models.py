from sqlalchemy import Column, Integer, String, Text, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# --- Original Required Table ---
class ViewCount(Base):
    __tablename__ = "view_counts"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer, default=0)

# --- Many-to-Many Association Tables ---
project_skill = Table(
    'project_skill', Base.metadata,
    Column('project_id', Integer, ForeignKey('project.id', ondelete='CASCADE'), primary_key=True),
    Column('skill_id', Integer, ForeignKey('skill.id', ondelete='CASCADE'), primary_key=True)
)

# --- Resume Domains ---
class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False)
    birth_date = Column(Text)
    phone = Column(Text)
    email = Column(Text)
    address = Column(Text)
    short_bio = Column(Text)
    photo_url = Column(Text)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)
    
    links = relationship("ProfileLink", back_populates="profile")

class ProfileLink(Base):
    __tablename__ = "profile_link"
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey('profile.id'))
    platform_name = Column(Text, nullable=False)
    url = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)
    
    profile = relationship("Profile", back_populates="links")

class Education(Base):
    __tablename__ = "education"
    id = Column(Integer, primary_key=True, index=True)
    school_name = Column(Text, nullable=False)
    major = Column(Text, nullable=False)
    degree_type = Column(Text, nullable=False)
    start_date = Column(Text, nullable=False)
    end_date = Column(Text)
    is_attending = Column(Integer, default=0)
    gpa = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)

class WorkExperience(Base):
    __tablename__ = "work_experience"
    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(Text, nullable=False)
    department = Column(Text)
    role = Column(Text, nullable=False)
    employment_type = Column(Text, nullable=False)
    start_date = Column(Text, nullable=False)
    end_date = Column(Text)
    is_current = Column(Integer, default=0)
    summary = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)
    
    projects = relationship("Project", back_populates="work_experience")

class Project(Base):
    __tablename__ = "project"
    id = Column(Integer, primary_key=True, index=True)
    work_experience_id = Column(Integer, ForeignKey('work_experience.id', ondelete='SET NULL'), nullable=True)
    name = Column(Text, nullable=False)
    affiliation = Column(Text, nullable=False)
    role = Column(Text, nullable=False)
    start_date = Column(Text, nullable=False)
    end_date = Column(Text)
    description = Column(Text)
    outcome = Column(Text)
    url = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)

    work_experience = relationship("WorkExperience", back_populates="projects")
    skills = relationship("Skill", secondary=project_skill, back_populates="projects")

class Skill(Base):
    __tablename__ = "skill"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False)
    category = Column(Text, nullable=False)
    proficiency = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)
    
    projects = relationship("Project", secondary=project_skill, back_populates="skills")

class Certificate(Base):
    __tablename__ = "certificate"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(Text, nullable=False)
    issuer = Column(Text, nullable=False)
    issue_date = Column(Text, nullable=False)
    expiry_date = Column(Text)
    cert_number = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)

class AwardActivity(Base):
    __tablename__ = "award_activity"
    id = Column(Integer, primary_key=True, index=True)
    activity_type = Column(Text, nullable=False)
    name = Column(Text, nullable=False)
    organization = Column(Text, nullable=False)
    activity_date = Column(Text, nullable=False)
    description = Column(Text)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)

class Language(Base):
    __tablename__ = "language"
    id = Column(Integer, primary_key=True, index=True)
    language_name = Column(Text, nullable=False)
    test_name = Column(Text)
    score = Column(Text)
    issue_date = Column(Text, nullable=False)
    display_order = Column(Integer, default=0)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)

class ResumeVersion(Base):
    __tablename__ = "resume_version"
    id = Column(Integer, primary_key=True, index=True)
    version_name = Column(Text, nullable=False)
    memo = Column(Text)
    created_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    updated_at = Column(Text, default=lambda: datetime.utcnow().isoformat())
    deleted_at = Column(Text, nullable=True)
    
    items = relationship("ResumeVersionItem", back_populates="version")

class ResumeVersionItem(Base):
    __tablename__ = "resume_version_item"
    resume_version_id = Column(Integer, ForeignKey('resume_version.id', ondelete='CASCADE'), primary_key=True)
    section_type = Column(Text, primary_key=True)
    item_id = Column(Integer, primary_key=True)
    display_order = Column(Integer, default=0)
    
    version = relationship("ResumeVersion", back_populates="items")
