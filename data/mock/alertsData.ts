// src/data/mock/alertsData.ts

export interface AlertItem {
  region: string;
  issueType: string;
  severity: 'Low' | 'Medium' | 'High';
  detectedPeriod: string;
}

export interface AlertSummary {
  type: string;
  count: number;
}

export const activeAlerts: AlertItem[] = [
  {
    region: 'Purnia (Bihar)',
    issueType: 'Delayed child enrolment',
    severity: 'High',
    detectedPeriod: 'Jan 2026'
  },
  {
    region: 'Sitapur (UP)',
    issueType: 'High biometric failure (elderly)',
    severity: 'High',
    detectedPeriod: 'Jan 2026'
  },
  {
    region: 'Dhanbad (Jharkhand)',
    issueType: 'Migration mismatch',
    severity: 'Medium',
    detectedPeriod: 'Dec 2025'
  },
  {
    region: 'Murshidabad (WB)',
    issueType: 'Update neglect',
    severity: 'Medium',
    detectedPeriod: 'Dec 2025'
  },
  {
    region: 'Balangir (Odisha)',
    issueType: 'Low enrolment coverage',
    severity: 'Low',
    detectedPeriod: 'Nov 2025'
  }
];

export const alertSummary: AlertSummary[] = [
  { type: 'Enrolment', count: 38 },
  { type: 'Biometric', count: 27 },
  { type: 'Migration', count: 19 },
  { type: 'Update Neglect', count: 31 }
];
