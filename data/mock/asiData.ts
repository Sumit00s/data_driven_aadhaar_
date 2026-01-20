// src/data/mock/asiData.ts

export interface ASIRegion {
  region: string;
  asiScore: number;
  category: 'Low' | 'Medium' | 'High';
}

export interface ASIBreakdown {
  factor: string;
  contribution: number;
}

export const asiRegions: ASIRegion[] = [
  { region: 'Bihar', asiScore: 78, category: 'High' },
  { region: 'Uttar Pradesh', asiScore: 72, category: 'High' },
  { region: 'Maharashtra', asiScore: 54, category: 'Medium' },
  { region: 'Rajasthan', asiScore: 46, category: 'Medium' },
  { region: 'Kerala', asiScore: 22, category: 'Low' },
];

export const asiBreakdown: ASIBreakdown[] = [
  { factor: 'Delayed Enrolment', contribution: 30 },
  { factor: 'Update Neglect', contribution: 25 },
  { factor: 'Biometric Stress', contribution: 20 },
  { factor: 'Migration Mismatch', contribution: 25 },
];
