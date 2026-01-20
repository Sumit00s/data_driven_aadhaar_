// src/data/mock/biometricData.ts

export interface UpdateNeglectRegion {
  region: string;
  neglectRate: number;
}

export interface BiometricStressRegion {
  region: string;
  stressRate: number;
}

export interface ElderlyVulnerability {
  ageGroup: string;
  issueRate: number;
}

export interface BiometricProblemRegion {
  region: string;
  issue: string;
  severity: 'Low' | 'Medium' | 'High';
}

export const updateNeglectRegions: UpdateNeglectRegion[] = [
  { region: 'Bihar', neglectRate: 34 },
  { region: 'Uttar Pradesh', neglectRate: 31 },
  { region: 'Jharkhand', neglectRate: 29 },
  { region: 'Assam', neglectRate: 26 },
  { region: 'Rajasthan', neglectRate: 22 },
];

export const biometricStressRegions: BiometricStressRegion[] = [
  { region: 'West Bengal', stressRate: 18 },
  { region: 'Kerala', stressRate: 16 },
  { region: 'Tamil Nadu', stressRate: 15 },
  { region: 'Punjab', stressRate: 14 },
  { region: 'Maharashtra', stressRate: 12 },
];

export const elderlyVulnerabilityData: ElderlyVulnerability[] = [
  { ageGroup: '60–69', issueRate: 12 },
  { ageGroup: '70–79', issueRate: 18 },
  { ageGroup: '80+', issueRate: 27 },
];

export const biometricProblemRegions: BiometricProblemRegion[] = [
  { region: 'Malda (WB)', issue: 'High fingerprint mismatch', severity: 'High' },
  { region: 'Alappuzha (Kerala)', issue: 'Frequent biometric retries', severity: 'Medium' },
  { region: 'Salem (TN)', issue: 'Elderly authentication failures', severity: 'Medium' },
  { region: 'Gurdaspur (Punjab)', issue: 'Low biometric update frequency', severity: 'Low' },
];
