import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "raw" / "csv_enrolment"

def compute_child_enrolment_delay():
    """
    Computes state-wise child enrolment delay percentage (0–5 age group)
    """
    csv_files = sorted(DATA_DIR.glob("*.csv"))
    df_list = []

    for file in csv_files:
        df = pd.read_csv(file)
        df_list.append(df)

    df = pd.concat(df_list, ignore_index=True)

    # Expected columns (from your dataset)
    # age_0_5, age_5_17, age_18_greater, state

    grouped = df.groupby("state").agg({
        "age_0_5": "sum",
        "age_5_17": "sum",
        "age_18_greater": "sum"
    }).reset_index()

    grouped["total"] = (
        grouped["age_0_5"] +
        grouped["age_5_17"] +
        grouped["age_18_greater"]
    )

    grouped["child_enrolment_percentage"] = (
        grouped["age_0_5"] / grouped["total"] * 100
    ).round(2)

    grouped["child_delay_percentage"] = (
        100 - grouped["child_enrolment_percentage"]
    ).round(2)

    return grouped.sort_values(
        by="child_delay_percentage",
        ascending=False
    ).head(10).to_dict(orient="records")
