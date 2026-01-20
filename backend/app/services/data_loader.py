import pandas as pd
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "raw"

DATASET_FOLDERS = {
    "enrolment": "csv_enrolment",
    "demographic": "csv_demographic",
    "biometric": "csv_biometric",
}

def load_dataset(dataset_key: str, rows: int = 5):
    """
    Load all CSV files from a dataset folder and return metadata + preview.
    """
    if dataset_key not in DATASET_FOLDERS:
        raise ValueError("Invalid dataset key. Use: enrolment, demographic, biometric")

    folder_path = DATA_DIR / DATASET_FOLDERS[dataset_key]

    if not folder_path.exists():
        raise FileNotFoundError(f"Folder {folder_path} not found")

    csv_files = sorted(folder_path.glob("*.csv"))
    if not csv_files:
        raise FileNotFoundError("No CSV files found in dataset folder")

    df_list = []
    total_rows = 0

    for file in csv_files:
        df = pd.read_csv(file)
        df_list.append(df)
        total_rows += len(df)

    combined_df = pd.concat(df_list, ignore_index=True)

    return {
        "dataset": dataset_key,
        "files_loaded": len(csv_files),
        "total_rows": total_rows,
        "columns": list(combined_df.columns),
        "preview": combined_df.head(rows).to_dict(orient="records"),
    }
