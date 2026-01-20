from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.data_loader import load_dataset
from app.services.enrolment_metrics import compute_child_enrolment_delay
from app.services.biometric_metrics import compute_update_neglect
from app.services.migration_metrics import compute_migration_mismatch
from app.services.asi_metrics import compute_asi
from app.routes import alerts

app = FastAPI(title="Aadhaar Analytics Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(alerts.router)

@app.get("/")
def root():
    return {"status": "Backend running"}

@app.get("/debug/load-dataset/{dataset_key}")
def debug_load_dataset(dataset_key: str):
    return load_dataset(dataset_key)

@app.get("/metrics/enrolment/child-delay")
def get_child_enrolment_delay():
    return compute_child_enrolment_delay()

@app.get("/metrics/biometric/update-neglect")
def get_update_neglect():
    return compute_update_neglect()

@app.get("/metrics/migration/mismatch")
def get_migration_mismatch():
    return compute_migration_mismatch()

@app.get("/metrics/asi")
def get_asi():
    return compute_asi()
