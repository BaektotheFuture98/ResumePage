from fastapi import FastAPI, Depends, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
import json
from .database import engine, Base, get_db
from .routers import views, resume
from .services.resume_service import ResumeService

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Resume - Seonmin Baek")

# Setup Jinja2 templates (Thymeleaf-like SSR)
templates = Jinja2Templates(directory="templates")

# Include API routers (keep for backward compat)
app.include_router(views.router)
app.include_router(resume.router)

# Mount the static directory
app.mount("/static", StaticFiles(directory="static"), name="static")


def safe_parse_json(val):
    """Parse JSON string or return original value."""
    if not val:
        return val
    try:
        return json.loads(val)
    except (json.JSONDecodeError, TypeError):
        return val


def parse_project_to_dict(proj):
    """Convert Project model to a dictionary with pre-parsed JSON fields."""
    return {
        "name": proj.name,
        "affiliation": proj.affiliation,
        "role": proj.role,
        "start_date": proj.start_date,
        "end_date": proj.end_date,
        "description": safe_parse_json(proj.description),
        "outcome": safe_parse_json(proj.outcome),
        "url": proj.url,
        "skills": [{"name": s.name, "category": s.category} for s in proj.skills]
    }


# Serve the main page via Jinja2 template (Thymeleaf-style SSR)
@app.get("/")
async def read_index(request: Request, db: Session = Depends(get_db)):
    print("DEBUG: Entering read_index")
    service = ResumeService(db)
    data = service.get_resume()
    print("DEBUG: Fetched resume data")

    # Pre-parse JSON fields for template rendering
    work_experiences = []
    if data.get("work_experience"):
        print("DEBUG: Parsing work experiences...")
        for exp in data["work_experience"]:
            # ... (rest of parsing)
            exp_dict = {
                "company_name": exp.company_name,
                "department": exp.department,
                "role": exp.role,
                "employment_type": exp.employment_type,
                "start_date": exp.start_date,
                "end_date": exp.end_date,
                "is_current": exp.is_current,
                "summary": safe_parse_json(exp.summary),
                "projects": []
            }
            if exp.projects:
                for proj in exp.projects:
                    exp_dict["projects"].append(parse_project_to_dict(proj))
            work_experiences.append(exp_dict)

    # Pre-parse independent projects
    independent_projects = []
    if data.get("projects"):
        for proj in data["projects"]:
            independent_projects.append(parse_project_to_dict(proj))

    # Group skills by category
    skill_groups = {}
    if data.get("skills"):
        for skill in data["skills"]:
            cat = skill.category
            if cat not in skill_groups:
                skill_groups[cat] = []
            skill_groups[cat].append(skill.name)

    print("DEBUG: Finished parsing skills")

    response_data = {
        "request": request,
        "profile": data.get("profile"),
        "education": data.get("education", []),
        "work_experiences": work_experiences,
        "skill_groups": skill_groups,
        "certificates": data.get("certificates", []),
        "awards_activities": data.get("awards_activities", []),
        "languages": data.get("languages", []),
        "projects": independent_projects,
    }
    print("DEBUG: Rendering template...")
    return templates.TemplateResponse("index.html", response_data)
