from pydantic import BaseModel
from typing import List, Optional

class ProfileLinkResponse(BaseModel):
    platform_name: str
    url: str

    class Config:
        from_attributes = True

class ProfileResponse(BaseModel):
    name: str
    birth_date: Optional[str]
    phone: Optional[str]
    email: Optional[str]
    address: Optional[str]
    short_bio: Optional[str]
    photo_url: Optional[str]
    links: List[ProfileLinkResponse] = []

    class Config:
        from_attributes = True

class EducationResponse(BaseModel):
    school_name: str
    major: str
    degree_type: str
    start_date: str
    end_date: Optional[str]
    is_attending: int
    gpa: Optional[str]

    class Config:
        from_attributes = True

class SkillResponse(BaseModel):
    name: str
    category: str

    class Config:
        from_attributes = True

class ProjectResponse(BaseModel):
    name: str
    affiliation: str
    role: str
    start_date: str
    end_date: Optional[str]
    description: Optional[str]
    outcome: Optional[str]
    url: Optional[str]
    skills: List[SkillResponse] = []

    class Config:
        from_attributes = True

class WorkExperienceResponse(BaseModel):
    company_name: str
    department: Optional[str]
    role: str
    employment_type: str
    start_date: str
    end_date: Optional[str]
    is_current: int
    summary: Optional[str]
    projects: List[ProjectResponse] = []

    class Config:
        from_attributes = True

class CertificateResponse(BaseModel):
    name: str
    issuer: str
    issue_date: str
    expiry_date: Optional[str]
    cert_number: Optional[str]

    class Config:
        from_attributes = True

class AwardActivityResponse(BaseModel):
    activity_type: str
    name: str
    organization: str
    activity_date: str
    description: Optional[str]

    class Config:
        from_attributes = True

class LanguageResponse(BaseModel):
    language_name: str
    test_name: Optional[str]
    score: Optional[str]
    issue_date: str

    class Config:
        from_attributes = True

class ResumeDataResponse(BaseModel):
    profile: Optional[ProfileResponse]
    education: List[EducationResponse]
    work_experience: List[WorkExperienceResponse]
    projects: List[ProjectResponse]
    skills: List[SkillResponse]
    certificates: List[CertificateResponse]
    awards_activities: List[AwardActivityResponse]
    languages: List[LanguageResponse]
