import React from 'react';
import { AlertTriangle, Target, Zap, ExternalLink, TrendingUp } from 'lucide-react';
import { ActionIntelligence } from '../types-enhanced';

interface ActionPanelProps {
  intelligence: ActionIntelligence;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ intelligence }) => {
  const getRiskColor = (severity: 'high' | 'medium' | 'low') => {
    switch (severity) {
      case 'high': return 'text-black border-black bg-gray-100';
      case 'medium': return 'text-gray-700 border-gray-400 bg-gray-50';
      case 'low': return 'text-gray-500 border-gray-300';
    }
  };

  const getPriorityStyle = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'bg-black text-white';
      case 'medium': return 'bg-gray-600 text-white';
      case 'low': return 'bg-gray-300 text-black';
    }
  };

  return (
    <div className="space-y-6" data-testid="action-panel">
      
      {/* Competitive Intelligence */}
      {intelligence.competitors && intelligence.competitors.length > 0 && (
        <div className="bg-white p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-black" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
              Competitive Intelligence
            </h3>
          </div>
          
          <div className="space-y-3">
            {intelligence.competitors.map((competitor, idx) => (
              <div 
                key={idx}
                className="border border-gray-200 p-4 hover:border-black transition-colors"
                data-testid={`competitor-${idx}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">{competitor.name}</span>
                    {competitor.timestamp && (
                      <span className="text-xs font-mono bg-gray-100 px-2 py-1 text-gray-600">
                        {competitor.timestamp}
                      </span>
                    )}
                  </div>
                  {competitor.battleCardUrl && (
                    <a
                      href={competitor.battleCardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-600 hover:text-black flex items-center gap-1"
                      aria-label={`View battle card for ${competitor.name}`}
                    >
                      Battle Card <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{competitor.context}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deal Risk Indicators */}
      {intelligence.dealRisks && intelligence.dealRisks.length > 0 && (
        <div className="bg-white p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-black" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
              Deal Risk Indicators
            </h3>
          </div>
          
          <div className="space-y-3">
            {intelligence.dealRisks.map((risk, idx) => (
              <div 
                key={idx}
                className={`border p-4 transition-colors ${getRiskColor(risk.severity)}`}
                data-testid={`risk-indicator-${idx}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">
                      {risk.type}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 border ${
                      risk.severity === 'high' ? 'border-black' : 'border-gray-400'
                    }`}>
                      {risk.severity.toUpperCase()}
                    </span>
                  </div>
                  {risk.timestamp && (
                    <span className="text-xs font-mono text-gray-500">
                      {risk.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-sm font-medium mb-1">{risk.description}</p>
                <p className="text-xs text-gray-600 italic">"{risk.evidence}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Next Steps */}
      {intelligence.nextSteps && intelligence.nextSteps.length > 0 && (
        <div className="bg-white p-6 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={20} className="text-black" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">
              Recommended Next Steps
            </h3>
          </div>
          
          <div className="space-y-4">
            {intelligence.nextSteps.map((action, idx) => (
              <div 
                key={idx}
                className="border border-gray-200 p-4 hover:border-black transition-colors group"
                data-testid={`next-step-${idx}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Target size={16} className="text-black" />
                    <h4 className="font-semibold text-sm">{action.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-1 ${getPriorityStyle(action.priority)}`}>
                      {action.priority.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                      {action.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {action.description}
                </p>
                
                {action.basedOn && action.basedOn.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Based on:</span> {action.basedOn.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionPanel;
