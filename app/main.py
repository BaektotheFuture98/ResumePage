from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import os
from .database import engine, Base
from .routers import views, resume

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Retro Resume API")

# Include routers
app.include_router(views.router)
app.include_router(resume.router)

# Mount the static directory for the PDF
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the main index.html
@app.get("/", response_class=HTMLResponse)
async def read_index():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()
