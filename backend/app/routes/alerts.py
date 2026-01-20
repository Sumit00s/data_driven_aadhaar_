from fastapi import APIRouter
from app.services.alert_engine import generate_alerts

# ✅ Correct imports based on existing functions
from app.services.enrolment_metrics import compute_child_enrolment_delay
from app.services.biometric_metrics import compute_update_neglect
from app.services.migration_metrics import compute_migration_mismatch

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("/priority")
def get_priority_alerts():
    enrolment = compute_child_enrolment_delay()
    update_neglect = compute_update_neglect()
    migration = compute_migration_mismatch()

    alerts = generate_alerts(
        enrolment_data=enrolment,
        update_neglect_data=update_neglect,
        biometric_data=[],        # ❗ not available yet
        migration_data=migration
    )

    return alerts
