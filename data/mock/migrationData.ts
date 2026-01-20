// src/data/mock/migrationData.ts

export interface MigrationMismatchRegion {
  region: string;
  mismatchRate: number;
}

export interface HighMigrationRegion {
  region: string;
  reason: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface UpdateFrequencyTrend {
  period: string;
  updates: number;
}

export const migrationMismatchRegions: MigrationMismatchRegion[] = [
  { region: 'Bihar', mismatchRate: 34 },
  { region: 'Uttar Pradesh', mismatchRate: 31 },
  { region: 'Jharkhand', mismatchRate: 27 },
  { region: 'Assam', mismatchRate: 24 },
  { region: 'Odisha', mismatchRate: 21 },
];

export const highMigrationRegions: HighMigrationRegion[] = [
  { region: 'Purnia (Bihar)', reason: 'Seasonal labour migration', severity: 'High' },
  { region: 'Sitamarhi (Bihar)', reason: 'Inter-state workforce movement', severity: 'High' },
  { region: 'Gonda (UP)', reason: 'Urban employment migration', severity: 'Medium' },
  { region: 'Kokrajhar (Assam)', reason: 'Cross-district migration', severity: 'Medium' },
  { region: 'Balangir (Odisha)', reason: 'Agricultural migration', severity: 'Low' },
];

export const updateFrequencyTrend: UpdateFrequencyTrend[] = [
  { period: '2019', updates: 210000 },
  { period: '2020', updates: 185000 },
  { period: '2021', updates: 198000 },
  { period: '2022', updates: 224000 },
  { period: '2023', updates: 247000 },
  { period: '2024', updates: 268000 },
];
