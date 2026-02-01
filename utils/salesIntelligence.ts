import { AnalysisResult } from '../types';
import {
  SalesIntelligence,
  DealScorecard,
  CommitmentTracker,
  CompetitiveAlert,
  Commitment,
  QualificationCriterion,
  CompetitorMentionDetail,
  BattleCardInsight,
} from '../types-sales';

// Generate Sales Intelligence from Analysis Result
export const generateSalesIntelligence = (result: AnalysisResult): SalesIntelligence => {
  return {
    dealScorecard: generateDealScorecard(result),
    commitmentTracker: generateCommitmentTracker(result),
    competitiveAlerts: generateCompetitiveAlerts(result),
  };
};

// Generate MEDDIC/BANT Deal Scorecard
const generateDealScorecard = (result: AnalysisResult): DealScorecard => {
  const criteria: QualificationCriterion[] = [];

  // Budget Analysis
  const budgetScore = analyzeBudget(result);
  criteria.push(budgetScore);

  // Authority Analysis
  const authorityScore = analyzeAuthority(result);
  criteria.push(authorityScore);

  // Need Analysis
  const needScore = analyzeNeed(result);
  criteria.push(needScore);

  // Timeline Analysis
  const timelineScore = analyzeTimeline(result);
  criteria.push(timelineScore);

  // Competition Analysis
  const competitionScore = analyzeCompetition(result);
  criteria.push(competitionScore);

  // Calculate overall score
  const overallScore = Math.round(
    criteria.reduce((sum, c) => sum + c.score, 0) / criteria.length
  );

  // Determine health level
  const healthLevel = overallScore >= 75 ? 'high' : overallScore >= 50 ? 'medium' : 'low';

  // Generate recommendations
  const priorityRecommendation = generatePriorityRecommendation(overallScore, criteria, result);
  const nextSteps = generateNextSteps(criteria, result);

  return {
    overallScore,
    healthLevel,
    criteria,
    priorityRecommendation,
    nextSteps,
  };
};

// Budget Analysis
const analyzeBudget = (result: AnalysisResult): QualificationCriterion => {
  const budgetKeywords = ['budget', 'cost', 'price', 'pricing', '$', 'investment', 'allocated'];
  const timeline = result.timeline.map(t => t.description + ' ' + (t.quote || '')).join(' ').toLowerCase();

  const hasBudgetMention = budgetKeywords.some(kw => timeline.includes(kw));
  
  if (!hasBudgetMention) {
    return {
      criterion: 'budget',
      status: 'missing',
      score: 40,
      recommendation: 'Schedule discovery call to discuss budget and investment parameters',
    };
  }

  // Check for positive budget signals
  const positiveSignals = ['allocated', 'approved', 'ready', 'set aside'];
  const hasPositive = positiveSignals.some(sig => timeline.includes(sig));

  // Find evidence
  const budgetMoment = result.timeline.find(t => 
    budgetKeywords.some(kw => (t.description + ' ' + (t.quote || '')).toLowerCase().includes(kw))
  );

  if (hasPositive) {
    return {
      criterion: 'budget',
      status: 'confirmed',
      score: 95,
      evidence: budgetMoment?.quote || budgetMoment?.description || 'Budget discussed positively',
      timestamp: budgetMoment?.time,
      recommendation: 'Budget confirmed - proceed to commercial discussion',
    };
  }

  return {
    criterion: 'budget',
    status: 'partial',
    score: 65,
    evidence: budgetMoment?.quote || budgetMoment?.description,
    timestamp: budgetMoment?.time,
    recommendation: 'Budget mentioned but not confirmed - send ROI calculator and case studies',
  };
};

// Authority Analysis
const analyzeAuthority = (result: AnalysisResult): QualificationCriterion => {
  const participants = result.metadata?.participants || [];
  const decisionMakers = participants.filter(p => p.isDecisionMaker);

  if (decisionMakers.length === 0) {
    const highestRole = participants.find(p => 
      p.title?.toLowerCase().includes('vp') || 
      p.title?.toLowerCase().includes('director') ||
      p.title?.toLowerCase().includes('head')
    );

    return {
      criterion: 'authority',
      status: highestRole ? 'partial' : 'missing',
      score: highestRole ? 60 : 30,
      evidence: highestRole ? `Spoke with ${highestRole.name} (${highestRole.title})` : 'No senior stakeholders identified',
      recommendation: highestRole 
        ? 'Escalate to VP level - arrange executive briefing'
        : 'Identify and engage with decision-makers and economic buyer',
    };
  }

  return {
    criterion: 'authority',
    status: 'confirmed',
    score: 90,
    evidence: `Decision maker present: ${decisionMakers.map(d => `${d.name} (${d.title})`).join(', ')}`,
    recommendation: 'Authority confirmed - proceed with commercial proposal',
  };
};

// Need Analysis
const analyzeNeed = (result: AnalysisResult): QualificationCriterion => {
  const topPainPoint = result.painPoints[0];
  const painPointCount = result.painPoints.length;

  if (!topPainPoint || topPainPoint.resonanceScore < 50) {
    return {
      criterion: 'need',
      status: 'missing',
      score: 35,
      recommendation: 'Conduct deeper discovery to uncover pain points and business impact',
    };
  }

  if (topPainPoint.resonanceScore >= 80) {
    return {
      criterion: 'need',
      status: 'confirmed',
      score: 95,
      evidence: topPainPoint.evidence,
      recommendation: `Critical need identified (${topPainPoint.category}) - emphasize ROI and quick wins`,
    };
  }

  return {
    criterion: 'need',
    status: 'partial',
    score: 70,
    evidence: `${painPointCount} pain points identified`,
    recommendation: 'Quantify business impact - ask about costs of current process',
  };
};

// Timeline Analysis
const analyzeTimeline = (result: AnalysisResult): QualificationCriterion => {
  const timelineKeywords = ['urgent', 'asap', 'deadline', 'quarter', 'month', 'week', 'timeline'];
  const timeline = result.timeline.map(t => t.description + ' ' + (t.quote || '')).join(' ').toLowerCase();

  const hasTimelineMention = timelineKeywords.some(kw => timeline.includes(kw));

  if (!hasTimelineMention) {
    return {
      criterion: 'timeline',
      status: 'missing',
      score: 40,
      recommendation: 'Establish timeline and create urgency - discuss upcoming initiatives',
    };
  }

  // Check for urgency signals
  const urgentSignals = ['urgent', 'asap', 'immediately', 'this week', 'this month', 'q1', 'next month'];
  const hasUrgency = urgentSignals.some(sig => timeline.includes(sig));

  const timelineMoment = result.timeline.find(t =>
    timelineKeywords.some(kw => (t.description + ' ' + (t.quote || '')).toLowerCase().includes(kw))
  );

  if (hasUrgency) {
    return {
      criterion: 'timeline',
      status: 'confirmed',
      score: 90,
      evidence: timelineMoment?.quote || timelineMoment?.description,
      timestamp: timelineMoment?.time,
      recommendation: 'Urgent timeline identified - fast-track deal and provide expedited implementation',
    };
  }

  return {
    criterion: 'timeline',
    status: 'risk',
    score: 55,
    evidence: timelineMoment?.quote || timelineMoment?.description,
    timestamp: timelineMoment?.time,
    recommendation: 'Timeline mentioned but not urgent - create compelling event to accelerate',
  };
};

// Competition Analysis
const analyzeCompetition = (result: AnalysisResult): QualificationCriterion => {
  const competitorKeywords = ['splunk', 'new relic', 'dynatrace', 'appdynamics', 'elastic', 'competitor', 'alternative'];
  const timeline = result.timeline.map(t => t.description + ' ' + (t.quote || '')).join(' ').toLowerCase();

  const competitorMentioned = competitorKeywords.some(kw => timeline.includes(kw));

  if (!competitorMentioned) {
    return {
      criterion: 'competition',
      status: 'confirmed',
      score: 85,
      evidence: 'No competitors mentioned',
      recommendation: 'Position as clear leader - proactively address common competitive questions',
    };
  }

  // Check sentiment of competition mentions
  const negativeCompetitorMoments = result.timeline.filter(t => 
    competitorKeywords.some(kw => (t.description + ' ' + (t.quote || '')).toLowerCase().includes(kw)) &&
    t.sentiment === 'negative'
  );

  if (negativeCompetitorMoments.length > 0) {
    return {
      criterion: 'competition',
      status: 'confirmed',
      score: 80,
      evidence: `Competitors mentioned negatively`,
      recommendation: 'Leverage competitive weakness - share battle card and switch stories',
    };
  }

  return {
    criterion: 'competition',
    status: 'risk',
    score: 50,
    evidence: 'Active competitive evaluation',
    recommendation: 'Engage competitive intelligence - arrange differentiation session',
  };
};

// Generate Priority Recommendation
const generatePriorityRecommendation = (score: number, criteria: QualificationCriterion[], result: AnalysisResult): string => {
  if (score >= 75) {
    return `High Priority Deal (${score}/100) - Fast-track to proposal stage. Schedule executive alignment call within 1 week to maintain momentum.`;
  } else if (score >= 50) {
    const missingCriteria = criteria.filter(c => c.status === 'missing' || c.status === 'risk');
    const focus = missingCriteria[0] ? missingCriteria[0].criterion : 'qualification';
    return `Medium Priority (${score}/100) - Focus on strengthening ${focus}. Schedule follow-up discovery within 2 weeks.`;
  } else {
    return `Low Priority (${score}/100) - Significant qualification gaps. Consider disqualifying or nurturing for 90 days while focusing on higher-priority opportunities.`;
  }
};

// Generate Next Steps
const generateNextSteps = (criteria: QualificationCriterion[], result: AnalysisResult): string[] => {
  const steps: string[] = [];

  criteria.forEach(c => {
    if (c.status === 'missing' || c.status === 'risk') {
      steps.push(c.recommendation || `Address ${c.criterion}`);
    }
  });

  // Add action based on satisfaction
  if (result.metrics.satisfactionScore > 75) {
    steps.unshift('Send follow-up email within 24 hours (draft provided below)');
  }

  return steps.slice(0, 4); // Limit to top 4
};

// Generate Commitment Tracker
const generateCommitmentTracker = (result: AnalysisResult): CommitmentTracker => {
  const sellerCommitments: Commitment[] = [];
  const buyerCommitments: Commitment[] = [];

  // Extract commitments from timeline
  const commitmentKeywords = {
    seller: ['will send', 'will share', 'will provide', 'will arrange', 'will schedule', "i'll", "we'll"],
    buyer: ['will send', 'will share', 'will provide', 'will get back', 'will check', "i'll get", "we'll send"],
  };

  result.timeline.forEach((moment, idx) => {
    const text = (moment.description + ' ' + (moment.quote || '')).toLowerCase();

    // Check for seller commitments
    commitmentKeywords.seller.forEach(keyword => {
      if (text.includes(keyword) && moment.description.includes('SE')) {
        const description = moment.quote || moment.description;
        sellerCommitments.push({
          id: `seller-${idx}`,
          owner: 'seller',
          description: description.substring(0, 100),
          timestamp: moment.time,
          status: 'pending',
          priority: 'high',
          dueDate: 'Within 2 days',
        });
      }
    });

    // Check for buyer commitments
    commitmentKeywords.buyer.forEach(keyword => {
      if (text.includes(keyword) && !moment.description.includes('SE')) {
        const description = moment.quote || moment.description;
        buyerCommitments.push({
          id: `buyer-${idx}`,
          owner: 'buyer',
          description: description.substring(0, 100),
          timestamp: moment.time,
          status: 'pending',
          priority: 'medium',
        });
      }
    });
  });

  return {
    sellerCommitments: sellerCommitments.slice(0, 5), // Limit to 5
    buyerCommitments: buyerCommitments.slice(0, 5),
    totalCount: sellerCommitments.length + buyerCommitments.length,
  };
};

// Generate Competitive Alerts
const generateCompetitiveAlerts = (result: AnalysisResult): CompetitiveAlert[] => {
  const competitors = ['splunk', 'new relic', 'dynatrace', 'appdynamics', 'elastic'];
  const alerts: CompetitiveAlert[] = [];

  competitors.forEach(competitor => {
    const mentions: CompetitorMentionDetail[] = [];

    result.timeline.forEach(moment => {
      const text = (moment.description + ' ' + (moment.quote || '')).toLowerCase();
      if (text.includes(competitor)) {
        mentions.push({
          timestamp: moment.time,
          quote: moment.quote || moment.description,
          sentiment: moment.sentiment as 'positive' | 'negative' | 'neutral',
          context: moment.description,
        });
      }
    });

    if (mentions.length > 0) {
      // Determine overall sentiment
      const sentimentCounts = mentions.reduce((acc, m) => {
        acc[m.sentiment] = (acc[m.sentiment] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const overallSentiment = sentimentCounts.negative > sentimentCounts.positive ? 'negative' :
                              sentimentCounts.positive > sentimentCounts.negative ? 'positive' : 'neutral';

      // Generate battle card insights
      const battleCardInsights = generateBattleCardInsights(competitor, overallSentiment);

      alerts.push({
        competitorName: competitor.charAt(0).toUpperCase() + competitor.slice(1),
        mentionCount: mentions.length,
        mentions,
        overallSentiment,
        battleCardInsights,
        threatLevel: mentions.length > 2 ? 'high' : mentions.length > 1 ? 'medium' : 'low',
      });
    }
  });

  return alerts;
};

// Generate Battle Card Insights
const generateBattleCardInsights = (competitor: string, sentiment: string): BattleCardInsight => {
  const insights: Record<string, BattleCardInsight> = {
    splunk: {
      positioning: [
        'Emphasize Datadog\'s ease of use vs Splunk\'s complexity',
        'Highlight transparent pricing (no data ingestion surprises)',
        'Showcase unified platform (APM + Infrastructure + Logs)',
      ],
      trapQuestions: [
        'How long did your Splunk implementation take?',
        'How many team members required Splunk training?',
        'What were your data ingestion overages last quarter?',
      ],
      caseStudies: [
        'TechCorp reduced setup time by 60% switching from Splunk to Datadog',
        'FinanceApp cut monitoring costs by 40% after Splunk migration',
      ],
      keyDifferentiators: [
        'Out-of-box integrations (600+ vs Splunk\'s 100+)',
        'Unified agent (vs multiple Splunk components)',
        'Predictable pricing model',
      ],
    },
    'new relic': {
      positioning: [
        'Emphasize Datadog\'s infrastructure monitoring strength',
        'Highlight Datadog\'s superior Kubernetes support',
        'Showcase Network Performance Monitoring (NPM) capability',
      ],
      trapQuestions: [
        'How granular is New Relic\'s infrastructure visibility?',
        'Does New Relic provide network-level insights?',
        'What\'s your experience with New Relic\'s Kubernetes monitoring?',
      ],
      caseStudies: [
        'CloudScale improved incident response time by 50% after switching from New Relic',
      ],
      keyDifferentiators: [
        'Best-in-class Infrastructure Monitoring',
        'Native Kubernetes and container support',
        'Network Performance Monitoring included',
      ],
    },
  };

  return insights[competitor] || {
    positioning: ['Position Datadog as unified observability platform'],
    trapQuestions: ['What gaps exist in your current monitoring solution?'],
    caseStudies: ['Share relevant competitive displacement stories'],
    keyDifferentiators: ['Unified platform', 'Ease of use', 'Transparent pricing'],
  };
};
