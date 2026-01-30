export interface KeyMoment {
  time: string;
  description: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  type: 'engagement' | 'objection' | 'question' | 'feature';
  quote?: string;
  reasoning?: string; // AI justification for this classification
}

export interface PainPoint {
  category: string; // e.g., "Infrastructure Visibility"
  resonanceScore: number; // 0-100
  mentionCount: number;
  evidence: string;
  reasoning?: string; // AI justification for this pain point
}

export interface FeatureInterest {
  name: string; // e.g., "APM"
  category: 'Monitoring' | 'Data' | 'Intelligence' | 'Workflow' | 'Security';
  interestLevel: 'High' | 'Medium' | 'Low';
  timeSpentMinutes: number;
}

export interface EngagementMetrics {
  satisfactionScore: number; // 0-100
  engagementRate: number; // Percentage
  objectionCount: number;
  positiveSignalCount: number;
}

export interface EmailDraft {
  subject: string;
  body: string;
}

export interface Participant {
  name: string;
  role: 'SE' | 'AE' | 'Prospect' | 'Other';
  title?: string;
  isDecisionMaker?: boolean;
}

export interface CallMetadata {
  title: string;
  customerName: string;
  duration?: string;
  date?: string;
}

export interface AnalysisResult {
  metrics: EngagementMetrics;
  timeline: KeyMoment[];
  painPoints: PainPoint[];
  featureHeatmap: FeatureInterest[];
  emailDraft: EmailDraft;
}

export type ViewState = 'upload' | 'paste' | 'confirming' | 'analyzing' | 'dashboard' | 'landing';

import { MOCK_TRANSCRIPT as LONG_TRANSCRIPT } from './mockData';

export const MOCK_TRANSCRIPT = LONG_TRANSCRIPT;
