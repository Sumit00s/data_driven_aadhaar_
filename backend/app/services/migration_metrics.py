import pandas as pd
from pathlib import Path

ENROL_DIR = Path(__file__).resolve().parents[2] / "data" / "raw" / "csv_enrolment"
DEMO_DIR = Path(__file__).resolve().parents[2] / "data" / "raw" / "csv_demographic"

def compute_migration_mismatch():
    """
    Computes state-wise migration mismatch using
    enrolment vs demographic update distribution
    """
    # Load enrolment data
    enrol_dfs = [pd.read_csv(f) for f in ENROL_DIR.glob("*.csv")]
    enrol_df = pd.concat(enrol_dfs, ignore_index=True)

    # Load demographic update data
    demo_dfs = [pd.read_csv(f) for f in DEMO_DIR.glob("*.csv")]
    demo_df = pd.concat(demo_dfs, ignore_index=True)

    # Aggregate state-wise totals
    enrol_state = enrol_df.groupby("state").sum(numeric_only=True).reset_index()
    demo_state = demo_df.groupby("state").sum(numeric_only=True).reset_index()

    # Compute total volumes
    enrol_state["enrol_total"] = enrol_state.select_dtypes("number").sum(axis=1)
    demo_state["update_total"] = demo_state.select_dtypes("number").sum(axis=1)

    # Normalize shares
    enrol_state["enrol_share"] = enrol_state["enrol_total"] / enrol_state["enrol_total"].sum()
    demo_state["update_share"] = demo_state["update_total"] / demo_state["update_total"].sum()

    # Merge
    merged = enrol_state[["state", "enrol_share"]].merge(
        demo_state[["state", "update_share"]],
        on="state",
        how="inner"
    )

    # Migration mismatch
    merged["migration_mismatch_percentage"] = (
        (merged["enrol_share"] - merged["update_share"]).abs() * 100
    ).round(2)

    return merged.sort_values(
        by="migration_mismatch_percentage",
        ascending=False
    ).head(10).to_dict(orient="records")
