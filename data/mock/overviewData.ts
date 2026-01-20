// src/data/mock/overviewData.ts

export interface OverviewSummary {
  highRiskDistricts: number;
  delayedChildEnrolmentDistricts: number;
  highUpdateNeglectDistricts: number;
  highBiometricStressDistricts: number;
}

export interface PriorityState {
  state: string;
  primaryIssue: string;
  severity: 'Low' | 'Medium' | 'High';
}

export const overviewSummary: OverviewSummary = {
  highRiskDistricts: 128,
  delayedChildEnrolmentDistricts: 74,
  highUpdateNeglectDistricts: 96,
  highBiometricStressDistricts: 51,
};

export const topPriorityStates: PriorityState[] = [
  { state: 'Uttar Pradesh', primaryIssue: 'Delayed Child Enrolment', severity: 'High' },
  { state: 'Bihar', primaryIssue: 'Update Neglect', severity: 'High' },
  { state: 'Maharashtra', primaryIssue: 'Migration Mismatch', severity: 'Medium' },
  { state: 'West Bengal', primaryIssue: 'Biometric Stress', severity: 'Medium' },
  { state: 'Rajasthan', primaryIssue: 'Low Enrolment Coverage', severity: 'Low' },
];
