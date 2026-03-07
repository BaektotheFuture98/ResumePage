from pydantic import BaseModel
from typing import List, Optional

class ProfileResponse(BaseModel):
    name: str
    phone: str
    email: str
    github: str
    intro_quote: str
    bio_text: str

class SkillResponse(BaseModel):
    category: str
    items: List[str]

class ExperienceResponse(BaseModel):
    company: str
    department: str
    role: str
    duration: str
    details: List[str]

class ProjectResponse(BaseModel):
    title: str
    context: str
    goal: str
    process: List[str]
    outcome: List[str]
    tech_stack: str

class EducationResponse(BaseModel):
    category: str
    items: List[str]

class ResumeDataResponse(BaseModel):
    profile: ProfileResponse
    skills: List[SkillResponse]
    experiences: List[ExperienceResponse]
    projects: List[ProjectResponse]
    educations: List[EducationResponse]
