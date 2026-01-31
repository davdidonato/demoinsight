import {
  EnhancedAnalysisResult,
  EditableFeatureInterest,
  EditablePainPoint,
  EditableKeyMoment,
  ActionIntelligence,
  CompetitorMention,
  DealRiskIndicator,
  RecommendedAction,
} from '../types-enhanced';
import { AnalysisResult } from '../types';

// Generate unique IDs for existing data
export const enhanceAnalysisResult = (result: AnalysisResult): EnhancedAnalysisResult => {
  const enhancedFeatures: EditableFeatureInterest[] = result.featureHeatmap.map((feature, idx) => ({
    ...feature,
    id: `feature-${idx}`,
    context: {
      quote: `Discussed ${feature.name} for approximately ${feature.timeSpentMinutes} minutes`,
      reasoning: `AI detected ${feature.interestLevel.toLowerCase()} interest based on conversation time, question depth, and prospect engagement signals.`,
      confidence: feature.interestLevel === 'High' ? 0.92 : feature.interestLevel === 'Medium' ? 0.78 : 0.65,
    },
  }));

  const enhancedPainPoints: EditablePainPoint[] = result.painPoints.map((point, idx) => ({
    ...point,
    id: `pain-${idx}`,
    context: {
      quote: point.evidence,
      reasoning: point.reasoning || `Identified through sentiment analysis and keyword frequency (${point.mentionCount} mentions).`,
      confidence: point.resonanceScore / 100,
    },
  }));

  const enhancedTimeline: EditableKeyMoment[] = result.timeline.map((moment, idx) => ({
    ...moment,
    id: `moment-${idx}`,
  }));

  // Generate action intelligence
  const actionIntelligence = generateActionIntelligence(result);

  return {
    ...result,
    featureHeatmap: enhancedFeatures,
    painPoints: enhancedPainPoints,
    timeline: enhancedTimeline,
    actionIntelligence,
  };
};

// Generate competitive intelligence and deal risks
const generateActionIntelligence = (result: AnalysisResult): ActionIntelligence => {
  // Detect competitors from timeline
  const competitors: CompetitorMention[] = [];
  const competitorKeywords = ['splunk', 'new relic', 'dynatrace', 'appdynamics', 'elastic'];
  
  result.timeline.forEach(moment => {
    const text = (moment.description + ' ' + (moment.quote || '')).toLowerCase();
    competitorKeywords.forEach(keyword => {
      if (text.includes(keyword)) {
        competitors.push({
          name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
          context: moment.description,
          timestamp: moment.time,
          battleCardUrl: `#battlecard-${keyword}`,
        });
      }
    });
  });

  // Generate deal risk indicators
  const dealRisks: DealRiskIndicator[] = [];
  
  // Check for budget concerns
  const budgetKeywords = ['budget', 'cost', 'expensive', 'price', 'pricing'];
  result.timeline.forEach(moment => {
    const text = (moment.description + ' ' + (moment.quote || '')).toLowerCase();
    if (budgetKeywords.some(kw => text.includes(kw)) && moment.sentiment === 'negative') {
      dealRisks.push({
        type: 'budget',
        severity: 'high',
        description: 'Budget concerns expressed during call',
        evidence: moment.quote || moment.description,
        timestamp: moment.time,
      });
    }
  });

  // Check for timeline pressure
  const timelineKeywords = ['deadline', 'urgent', 'asap', 'timeline', 'soon'];
  result.timeline.forEach(moment => {
    const text = (moment.description + ' ' + (moment.quote || '')).toLowerCase();
    if (timelineKeywords.some(kw => text.includes(kw))) {
      dealRisks.push({
        type: 'timeline',
        severity: 'medium',
        description: 'Timeline pressure identified',
        evidence: moment.quote || moment.description,
        timestamp: moment.time,
      });
    }
  });

  // Check for competition mentions
  if (competitors.length > 0) {
    dealRisks.push({
      type: 'competition',
      severity: 'high',
      description: `Evaluating ${competitors.length} competitor(s)`,
      evidence: `Mentioned: ${competitors.map(c => c.name).join(', ')}`,
    });
  }

  // Generate recommended actions based on pain points
  const nextSteps: RecommendedAction[] = [];

  // High priority actions for top pain points
  const topPainPoints = result.painPoints
    .sort((a, b) => b.resonanceScore - a.resonanceScore)
    .slice(0, 3);

  topPainPoints.forEach((pain, idx) => {
    if (pain.resonanceScore > 80) {
      nextSteps.push({
        title: `Address ${pain.category}`,
        description: `Schedule technical deep-dive focused on solving ${pain.category.toLowerCase()}. Prepare specific case studies showing 40-60% improvement in similar scenarios.`,
        priority: 'high',
        category: 'technical',
        basedOn: [pain.category],
      });
    }
  });

  // Action for high-interest features
  const highInterestFeatures = result.featureHeatmap.filter(f => f.interestLevel === 'High');
  if (highInterestFeatures.length > 0) {
    nextSteps.push({
      title: 'Provide Hands-on Demo',
      description: `Set up sandbox environment for ${highInterestFeatures.map(f => f.name).join(', ')}. Include realistic data and customer-specific use cases.`,
      priority: 'high',
      category: 'demo',
      basedOn: highInterestFeatures.map(f => f.name),
    });
  }

  // Follow-up action
  nextSteps.push({
    title: 'Send Customized Follow-up',
    description: `Use AI-generated email below with specific pain point evidence and ROI calculator focused on time savings.`,
    priority: 'medium',
    category: 'follow-up',
    basedOn: ['Email Draft'],
  });

  // Commercial action if satisfaction is high
  if (result.metrics.satisfactionScore > 75) {
    nextSteps.push({
      title: 'Progress to Commercial Discussion',
      description: `High satisfaction score (${result.metrics.satisfactionScore}/100) indicates readiness. Prepare pricing proposal with 30-day POC option.`,
      priority: 'high',
      category: 'commercial',
      basedOn: ['Satisfaction Score'],
    });
  }

  return {
    competitors: competitors.slice(0, 3), // Limit to top 3
    dealRisks: dealRisks.slice(0, 5), // Limit to top 5
    nextSteps: nextSteps.slice(0, 4), // Limit to top 4
  };
};
