// Enhanced types for interactive dashboard features
import { AnalysisResult, FeatureInterest, PainPoint, KeyMoment } from './types';

export type ImportanceLevel = 'High' | 'Medium' | 'Low';

export interface ProductMention extends FeatureInterest {
  id: string;
  isEdited?: boolean;
  addedByUser?: boolean;
}

export interface InsightContext {
  timestamp?: string;
  speaker?: string;
  quote: string;
  confidence?: number;
  reasoning: string;
}

export interface EditableFeatureInterest extends FeatureInterest {
  id: string;
  context?: InsightContext;
  isEdited?: boolean;
}

export interface EditablePainPoint extends PainPoint {
  id: string;
  context?: InsightContext;
  isEdited?: boolean;
}

export interface EditableKeyMoment extends KeyMoment {
  id: string;
  isEdited?: boolean;
}

export interface CompetitorMention {
  name: string;
  context: string;
  timestamp?: string;
  battleCardUrl?: string;
}

export interface DealRiskIndicator {
  type: 'budget' | 'timeline' | 'stakeholder' | 'technical' | 'competition';
  severity: 'high' | 'medium' | 'low';
  description: string;
  evidence: string;
  timestamp?: string;
}

export interface RecommendedAction {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'follow-up' | 'demo' | 'technical' | 'commercial';
  basedOn: string[]; // pain point IDs or feature IDs
}

export interface ActionIntelligence {
  competitors: CompetitorMention[];
  dealRisks: DealRiskIndicator[];
  nextSteps: RecommendedAction[];
}

export interface EnhancedAnalysisResult extends AnalysisResult {
  featureHeatmap: EditableFeatureInterest[];
  painPoints: EditablePainPoint[];
  timeline: EditableKeyMoment[];
  actionIntelligence?: ActionIntelligence;
}

export interface DashboardContextType {
  data: EnhancedAnalysisResult;
  updateFeature: (id: string, updates: Partial<EditableFeatureInterest>) => void;
  removeFeature: (id: string) => void;
  addFeature: (feature: Omit<EditableFeatureInterest, 'id'>) => void;
  updatePainPoint: (id: string, updates: Partial<EditablePainPoint>) => void;
  exportChanges: () => string;
  hasUnsavedChanges: boolean;
}

export interface TooltipData {
  visible: boolean;
  content: InsightContext;
  position: { x: number; y: number };
}
