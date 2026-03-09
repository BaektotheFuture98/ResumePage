import os
import base64
import uuid
import shutil
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..database import get_db
from ..services.resume_service import ResumeService
from ..schemas import ResumeDataResponse
from ..models import Profile

router = APIRouter(prefix="/api/resume", tags=["resume"])

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "static", "uploads")


@router.get("", response_model=ResumeDataResponse)
@router.get("/", response_model=ResumeDataResponse, include_in_schema=False)
def get_resume_data(db: Session = Depends(get_db)):
    service = ResumeService(db)
    return service.get_resume()


@router.post("/photo")
async def upload_profile_photo(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload a profile photo. Stores the image as base64 in the DB and updates the profile.
    The image is also saved to static/uploads for backward compatibility.
    """
    # Validate file type
    allowed = {"image/jpeg", "image/png", "image/gif", "image/webp"}
    if file.content_type not in allowed:
        raise HTTPException(status_code=400, detail="Unsupported image type. Use JPEG, PNG, GIF, or WebP.")

    # Read file content
    content = await file.read()
    # Encode as base64
    b64_str = base64.b64encode(content).decode('utf-8')
    data_uri = f"data:{file.content_type};base64,{b64_str}"

    # Save a copy to uploads folder (optional, for legacy URLs)
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    ext = os.path.splitext(file.filename)[1] if file.filename else ".png"
    filename = f"profile_{uuid.uuid4().hex[:8]}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as buffer:
        buffer.write(content)

    # Update DB
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Delete old uploaded file if exists (and not default)
    if profile.photo_url and "uploads/" in profile.photo_url:
        old_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "static",
            profile.photo_url.lstrip("/static/")
        )
        if os.path.exists(old_path):
            os.remove(old_path)

    profile.photo_url = data_uri
    profile.photo_base64 = b64_str
    db.commit()

    return JSONResponse(content={"photo_url": data_uri, "message": "Photo uploaded successfully"})


@router.delete("/photo")
def reset_profile_photo(db: Session = Depends(get_db)):
    """Reset profile photo to default."""
    profile = db.query(Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Delete uploaded photo if exists
    if profile.photo_url and "uploads/" in profile.photo_url:
        old_path = os.path.join(
            os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
            "static",
            profile.photo_url.lstrip("/static/")
        )
        if os.path.exists(old_path):
            os.remove(old_path)

    profile.photo_url = "/static/default_profile.png"
    db.commit()

    return JSONResponse(content={"photo_url": "/static/default_profile.png", "message": "Photo reset to default"})
