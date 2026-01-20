from typing import List, Dict

def generate_alerts(
    enrolment_data: List[Dict],
    update_neglect_data: List[Dict],
    biometric_data: List[Dict],
    migration_data: List[Dict]
):
    alerts = []

    # 🔴 Child enrolment delay
    for row in enrolment_data:
        if row["delay_rate"] > 15:
            alerts.append({
                "region": row["region"],
                "issue_type": "Enrolment",
                "severity": "Critical",
                "metric_value": f'{row["delay_rate"]}%',
                "reason": "Child enrolment delay exceeds 15%",
                "period": "Latest"
            })

    # 🔴 Update neglect
    for row in update_neglect_data:
        if row["neglect_rate"] > 35:
            alerts.append({
                "region": row["region"],
                "issue_type": "Update",
                "severity": "Critical",
                "metric_value": f'{row["neglect_rate"]}%',
                "reason": "Update neglect exceeds 35%",
                "period": "Latest"
            })

    # 🔴 Biometric stress
    for row in biometric_data:
        if row["failure_rate"] > 25:
            alerts.append({
                "region": row["region"],
                "issue_type": "Biometric",
                "severity": "Critical",
                "metric_value": f'{row["failure_rate"]}%',
                "reason": "High biometric failure among elderly",
                "period": "Latest"
            })

    # 🟠 Migration mismatch
    for row in migration_data:
        if row["mismatch_rate"] > 20:
            alerts.append({
                "region": row["region"],
                "issue_type": "Migration",
                "severity": "High",
                "metric_value": f'{row["mismatch_rate"]}%',
                "reason": "High enrolment-update location mismatch",
                "period": "Latest"
            })

    return alerts
