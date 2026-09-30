import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from backend.database import engine, Base, SessionLocal
from backend.seed_data import seed_database
from backend.routes_api import router as api_router

# Initialize database schema
Base.metadata.create_all(bind=engine)

# Seed database on start
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="TRAVORA — Dynamic Tour Intelligence Platform",
    description="Plan Freely. Travel Personally. Adapt Instantly.",
    version="1.0.0"
)

# Enable CORS for flexible local development and API access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(api_router)

# Mount static folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STATIC_DIR = os.path.join(BASE_DIR, "static")

if not os.path.exists(STATIC_DIR):
    os.makedirs(STATIC_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def serve_index():
    index_path = os.path.join(STATIC_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "TRAVORA API is running. Static frontend assets are loading."}

@app.get("/db-view")
@app.get("/database")
def serve_database_view():
    db_html_path = os.path.join(BASE_DIR, "DATABASE_VIEW.html")
    if os.path.exists(db_html_path):
        return FileResponse(db_html_path)
    return {"message": "Database view not generated yet. Run export_database_view.py"}
