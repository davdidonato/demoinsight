import React, { useState } from 'react';
import { DealScorecard, QualificationCriterion } from '../types-sales';
import { CheckCircle, AlertTriangle, XCircle, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

interface DealScorecardProps {
  scorecard: DealScorecard;
}

const DealScorecardComponent: React.FC<DealScorecardProps> = ({ scorecard }) => {
  const [expandedCriteria, setExpandedCriteria] = useState<string[]>([]);

  const getHealthColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-black border-black bg-white';
      case 'medium': return 'text-gray-700 border-gray-400 bg-gray-50';
      case 'low': return 'text-gray-500 border-gray-300 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={20} className="text-black" />;
      case 'partial':
        return <AlertTriangle size={20} className="text-gray-600" />;
      case 'missing':
        return <XCircle size={20} className="text-gray-400" />;
      case 'risk':
        return <AlertTriangle size={20} className="text-black" />;
      default:
        return <AlertTriangle size={20} className="text-gray-400" />;
    }
  };

  const getCriterionLabel = (criterion: string) => {
    const labels: Record<string, string> = {
      budget: 'Budget',
      authority: 'Authority',
      need: 'Need',
      timeline: 'Timeline',
      competition: 'Competition',
      decision_process: 'Decision Process',
    };
    return labels[criterion] || criterion;
  };

  const toggleCriterion = (criterion: string) => {
    setExpandedCriteria(prev =>
      prev.includes(criterion)
        ? prev.filter(c => c !== criterion)
        : [...prev, criterion]
    );
  };

  return (
    <div className="bg-white border border-gray-200 p-6" data-testid="deal-scorecard">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <TrendingUp size={24} className="text-black" />
          <h3 className="text-lg font-semibold">Deal Health Scorecard</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-semibold">{scorecard.overallScore}/100</div>
            <div className={`text-xs uppercase tracking-wider font-medium ${getHealthColor(scorecard.healthLevel)}`}>
              {scorecard.healthLevel} Priority
            </div>
          </div>
        </div>
      </div>

      {/* Score Bar */}
      <div className="mb-6">
        <div className="h-3 bg-gray-200 relative">
          <div
            className={`h-full transition-all duration-500 ${
              scorecard.healthLevel === 'high' ? 'bg-black' :
              scorecard.healthLevel === 'medium' ? 'bg-gray-600' : 'bg-gray-400'
            }`}
            style={{ width: `${scorecard.overallScore}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono text-white mix-blend-difference">
              {scorecard.overallScore}% Qualified
            </span>
          </div>
        </div>
      </div>

      {/* Qualification Criteria */}
      <div className="space-y-3 mb-6">
        {scorecard.criteria.map((criterion) => {
          const isExpanded = expandedCriteria.includes(criterion.criterion);
          return (
            <div
              key={criterion.criterion}
              className="border border-gray-200 transition-all hover:border-gray-400"
              data-testid={`criterion-${criterion.criterion}`}
            >
              <button
                onClick={() => toggleCriterion(criterion.criterion)}
                className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isExpanded}
                aria-label={`Toggle ${getCriterionLabel(criterion.criterion)} details`}
              >
                <div className="flex items-center gap-3 flex-1">
                  {getStatusIcon(criterion.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{getCriterionLabel(criterion.criterion)}</span>
                      <span className="text-xs text-gray-500">({criterion.score}/100)</span>
                    </div>
                    {criterion.evidence && !isExpanded && (
                      <p className="text-xs text-gray-600 mt-1 line-clamp-1">
                        {criterion.evidence}
                      </p>
                    )}
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 bg-gray-50 border-t border-gray-200 animate-fade-in">
                  {criterion.evidence && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Evidence</p>
                      <p className="text-sm italic">"{criterion.evidence}"</p>
                      {criterion.timestamp && (
                        <span className="text-xs font-mono text-gray-500 mt-1 inline-block">
                          at {criterion.timestamp}
                        </span>
                      )}
                    </div>
                  )}
                  {criterion.recommendation && (
                    <div className="bg-white border border-gray-200 p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Recommendation</p>
                      <p className="text-sm font-medium">{criterion.recommendation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Priority Recommendation */}
      <div className="bg-black text-white p-4 mb-4">
        <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Priority Recommendation</p>
        <p className="text-sm font-medium">{scorecard.priorityRecommendation}</p>
      </div>

      {/* Next Steps */}
      {scorecard.nextSteps && scorecard.nextSteps.length > 0 && (
        <div className="border border-gray-200 p-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Immediate Next Steps</p>
          <ul className="space-y-2">
            {scorecard.nextSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-gray-400 mt-1">→</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DealScorecardComponent;
