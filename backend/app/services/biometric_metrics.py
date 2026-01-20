import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "raw" / "csv_biometric"

def compute_update_neglect():
    """
    Computes state-wise biometric update neglect percentage
    using available age buckets:
    - bio_age_5_17
    - bio_age_17_ (17+ years)
    """
    csv_files = sorted(DATA_DIR.glob("*.csv"))
    df_list = []

    for file in csv_files:
        df = pd.read_csv(file)
        df_list.append(df)

    df = pd.concat(df_list, ignore_index=True)

    # Group state-wise
    grouped = df.groupby("state").agg({
        "bio_age_5_17": "sum",
        "bio_age_17_": "sum"
    }).reset_index()

    grouped["total_updates"] = (
        grouped["bio_age_5_17"] +
        grouped["bio_age_17_"]
    )

    # Treat 17+ bucket as delayed / accumulated updates
    grouped["update_neglect_percentage"] = (
        grouped["bio_age_17_"] / grouped["total_updates"] * 100
    ).round(2)

    return grouped.sort_values(
        by="update_neglect_percentage",
        ascending=False
    ).head(10).to_dict(orient="records")
