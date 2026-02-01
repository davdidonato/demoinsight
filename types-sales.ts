// Sales Executive Value-Add Types
import { InsightContext } from './types-enhanced';

// MEDDIC/BANT Deal Qualification
export type QualificationCriteria = 'budget' | 'authority' | 'need' | 'timeline' | 'competition' | 'decision_process';
export type QualificationStatus = 'confirmed' | 'partial' | 'missing' | 'risk';

export interface QualificationCriterion {
  criterion: QualificationCriteria;
  status: QualificationStatus;
  score: number; // 0-100
  evidence?: string;
  timestamp?: string;
  recommendation?: string;
}

export interface DealScorecard {
  overallScore: number; // 0-100
  healthLevel: 'high' | 'medium' | 'low';
  criteria: QualificationCriterion[];
  priorityRecommendation: string;
  nextSteps: string[];
}

// Commitment Tracking
export type CommitmentOwner = 'seller' | 'buyer';
export type CommitmentStatus = 'pending' | 'completed' | 'overdue';

export interface Commitment {
  id: string;
  owner: CommitmentOwner;
  description: string;
  dueDate?: string;
  timestamp: string;
  context?: string;
  status: CommitmentStatus;
  priority: 'high' | 'medium' | 'low';
}

export interface CommitmentTracker {
  sellerCommitments: Commitment[];
  buyerCommitments: Commitment[];
  totalCount: number;
}

// Competitive Intelligence
export interface CompetitorMentionDetail {
  timestamp: string;
  quote: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  context: string;
}

export interface BattleCardInsight {
  positioning: string[];
  trapQuestions: string[];
  caseStudies: string[];
  keyDifferentiators: string[];
}

export interface CompetitiveAlert {
  competitorName: string;
  mentionCount: number;
  mentions: CompetitorMentionDetail[];
  overallSentiment: 'positive' | 'negative' | 'neutral';
  battleCardInsights: BattleCardInsight;
  threatLevel: 'high' | 'medium' | 'low';
}

// Aggregated Sales Intelligence
export interface SalesIntelligence {
  dealScorecard: DealScorecard;
  commitmentTracker: CommitmentTracker;
  competitiveAlerts: CompetitiveAlert[];
}

// Export formats
export interface CRMExport {
  format: 'salesforce' | 'hubspot' | 'generic';
  dealScore: string;
  commitments: string;
  competitorNotes: string;
  nextActions: string;
}

// User settings
export interface SalesFeatureSettings {
  showDealScorecard: boolean;
  showCommitmentTracker: boolean;
  showCompetitiveAlerts: boolean;
  autoExportToCRM: boolean;
  crmFormat: 'salesforce' | 'hubspot' | 'generic';
}
