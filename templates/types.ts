export const PlanType = {
  FREE: 'FREE',
  PRO: 'PRO',
  MANAGED: 'MANAGED',
} as const;

export type PlanType = typeof PlanType[keyof typeof PlanType];

export interface AuditSuggestion {
  issue: string;
  impact: string;
  fix: string;
  evidence: string;
  category: 'Technical' | 'Content' | 'Structure' | 'AI';
}

export interface AuditReport {
  domain: string;
  overallScore: number;
  subscores: {
    crawlability: number;
    onPage: number;
    aiReadiness: number;
  };
  suggestions: AuditSuggestion[];
  timestamp: string;
}
