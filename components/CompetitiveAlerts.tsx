import React, { useState } from 'react';
import { CompetitiveAlert } from '../types-sales';
import { AlertTriangle, ExternalLink, ChevronDown, ChevronUp, Target, Zap } from 'lucide-react';

interface CompetitiveAlertsProps {
  alerts: CompetitiveAlert[];
}

const CompetitiveAlertsComponent: React.FC<CompetitiveAlertsProps> = ({ alerts }) => {
  const [expandedAlert, setExpandedAlert] = useState<string | null>(null);

  if (alerts.length === 0) {
    return null;
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-black text-white border-black';
      case 'medium': return 'bg-gray-600 text-white border-gray-600';
      case 'low': return 'bg-gray-300 text-black border-gray-300';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'negative': return '👎';
      case 'positive': return '👍';
      case 'neutral': return '➖';
    }
  };

  const toggleAlert = (competitorName: string) => {
    setExpandedAlert(prev => prev === competitorName ? null : competitorName);
  };

  return (
    <div className="space-y-4" data-testid="competitive-alerts">
      {alerts.map((alert) => {
        const isExpanded = expandedAlert === alert.competitorName;
        
        return (
          <div
            key={alert.competitorName}
            className="border-2 border-black bg-white"
            data-testid={`alert-${alert.competitorName}`}
          >
            {/* Alert Banner */}
            <div className="bg-black text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={24} className="text-white" />
                  <div>
                    <h3 className="text-lg font-semibold">
                      Competitor Mentioned: {alert.competitorName}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm">
                      <span className="flex items-center gap-1">
                        <span className="font-mono">{alert.mentionCount}</span>
                        {alert.mentionCount === 1 ? 'mention' : 'mentions'}
                      </span>
                      <span className="flex items-center gap-1">
                        {getSentimentIcon(alert.overallSentiment)}
                        {alert.overallSentiment} sentiment
                      </span>
                      <span className={`px-2 py-0.5 text-xs ${getThreatLevelColor(alert.threatLevel)}`}>
                        {alert.threatLevel.toUpperCase()} THREAT
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleAlert(alert.competitorName)}
                  className="text-white hover:text-gray-300 transition-colors"
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} details`}
                >
                  {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="p-6 space-y-6 animate-fade-in">
                
                {/* Context/Mentions */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-3 flex items-center gap-2">
                    <span>💬</span> Context
                  </h4>
                  <div className="space-y-3">
                    {alert.mentions.map((mention, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 p-3 hover:border-gray-400 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-1">
                            {mention.timestamp}
                          </span>
                          <span className="text-xs">
                            {getSentimentIcon(mention.sentiment)} {mention.sentiment}
                          </span>
                        </div>
                        <p className="text-sm italic text-gray-700">"{mention.quote}"</p>
                        {mention.context && (
                          <p className="text-xs text-gray-500 mt-1">{mention.context}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Battle Card Insights */}
                <div className="bg-gray-50 border border-gray-200 p-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700 mb-4 flex items-center gap-2">
                    <Target size={16} />
                    Battle Card Insights
                  </h4>

                  <div className="space-y-4">
                    {/* Positioning */}
                    {alert.battleCardInsights.positioning.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                          → Positioning
                        </p>
                        <ul className="space-y-1">
                          {alert.battleCardInsights.positioning.map((point, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-black mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Trap Questions */}
                    {alert.battleCardInsights.trapQuestions.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <Zap size={12} />
                          Trap Questions to Ask
                        </p>
                        <ul className="space-y-1">
                          {alert.battleCardInsights.trapQuestions.map((question, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-black mt-1">?</span>
                              <span className="font-medium">{question}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Key Differentiators */}
                    {alert.battleCardInsights.keyDifferentiators.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                          ⚡ Key Differentiators
                        </p>
                        <ul className="space-y-1">
                          {alert.battleCardInsights.keyDifferentiators.map((diff, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-black mt-1">✓</span>
                              <span className="font-medium">{diff}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Case Studies */}
                    {alert.battleCardInsights.caseStudies.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wider mb-2">
                          📊 Relevant Case Studies
                        </p>
                        <ul className="space-y-1">
                          {alert.battleCardInsights.caseStudies.map((study, idx) => (
                            <li key={idx} className="text-sm flex items-start gap-2">
                              <span className="text-black mt-1">→</span>
                              <span>{study}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* View Full Battle Card Button */}
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <a
                      href={`#battlecard-${alert.competitorName.toLowerCase()}`}
                      className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Full Battle Card <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CompetitiveAlertsComponent;
