// src/data/mock/enrolmentData.ts

export interface ChildDelayRegion {
  region: string;
  delayRate: number;
}

export interface AgeDistribution {
  ageGroup: string;
  percentage: number;
}

export interface LowCoverageRegion {
  region: string;
  coverageGap: number;
  risk: 'Low' | 'Medium' | 'High';
}

export const childEnrolmentDelay: ChildDelayRegion[] = [
  { region: 'Bihar', delayRate: 32 },
  { region: 'Uttar Pradesh', delayRate: 28 },
  { region: 'Jharkhand', delayRate: 25 },
  { region: 'Assam', delayRate: 22 },
  { region: 'Rajasthan', delayRate: 18 },
];

export const ageWiseDistribution: AgeDistribution[] = [
  { ageGroup: 'Children (0–5)', percentage: 18 },
  { ageGroup: 'Children (6–17)', percentage: 22 },
  { ageGroup: 'Adults (18–59)', percentage: 45 },
  { ageGroup: 'Elderly (60+)', percentage: 15 },
];

export const lowCoverageRegions: LowCoverageRegion[] = [
  { region: 'Barpeta (Assam)', coverageGap: 21, risk: 'High' },
  { region: 'Katihar (Bihar)', coverageGap: 19, risk: 'High' },
  { region: 'Gumla (Jharkhand)', coverageGap: 16, risk: 'Medium' },
  { region: 'Balangir (Odisha)', coverageGap: 14, risk: 'Medium' },
  { region: 'Dungarpur (Rajasthan)', coverageGap: 9, risk: 'Low' },
];
