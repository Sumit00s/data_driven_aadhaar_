from app.services.enrolment_metrics import compute_child_enrolment_delay
from app.services.biometric_metrics import compute_update_neglect
from app.services.migration_metrics import compute_migration_mismatch

def compute_asi():
    """
    Robust ASI computation that tolerates missing indicators
    """

    enrolment = {
        d["state"]: d["child_delay_percentage"]
        for d in compute_child_enrolment_delay()
    }

    update_neglect = {
        d["state"]: d["update_neglect_percentage"]
        for d in compute_update_neglect()
    }

    migration = {
        d["state"]: d["migration_mismatch_percentage"]
        for d in compute_migration_mismatch()
    }

    # ✅ Union of all states instead of intersection
    all_states = set(enrolment) | set(update_neglect) | set(migration)

    results = []

    for state in all_states:
        enrol_val = enrolment.get(state, 0)
        update_val = update_neglect.get(state, 0)
        migration_val = migration.get(state, 0)

        asi_score = (
            0.35 * enrol_val +
            0.35 * update_val +
            0.30 * migration_val
        )

        if asi_score >= 70:
            category = "High"
        elif asi_score >= 40:
            category = "Medium"
        else:
            category = "Low"

        results.append({
            "state": state,
            "enrolment_delay": round(enrol_val, 2),
            "update_neglect": round(update_val, 2),
            "migration_mismatch": round(migration_val, 2),
            "asi_score": round(asi_score, 2),
            "category": category
        })

    return sorted(results, key=lambda x: x["asi_score"], reverse=True)
