import React, { useState } from 'react';
import { CommitmentTracker, Commitment } from '../types-sales';
import { Calendar, Copy, Check, Clock, AlertCircle } from 'lucide-react';

interface CommitmentTrackerProps {
  tracker: CommitmentTracker;
  onToggleComplete?: (id: string) => void;
}

const CommitmentTrackerComponent: React.FC<CommitmentTrackerProps> = ({
  tracker,
  onToggleComplete,
}) => {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const handleToggle = (id: string) => {
    const newCompleted = new Set(completedIds);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedIds(newCompleted);
    onToggleComplete?.(id);
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-black bg-gray-50';
      case 'medium': return 'border-l-4 border-gray-400 bg-white';
      case 'low': return 'border-l-4 border-gray-200 bg-white';
    }
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    // Simple formatting - you can enhance with proper date library
    return dueDate;
  };

  const exportToCalendar = () => {
    // Generate ICS format for calendar export
    const allCommitments = [...tracker.sellerCommitments, ...tracker.buyerCommitments];
    const icsContent = allCommitments.map(c => {
      const dueDate = c.dueDate || 'TBD';
      return `${c.owner === 'seller' ? '🔵' : '🟢'} ${c.description} (Due: ${dueDate})`;
    }).join('\n');
    
    navigator.clipboard.writeText(icsContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportToCRM = () => {
    const crmFormat = `
COMMITMENTS SUMMARY
==================

YOUR COMMITMENTS:
${tracker.sellerCommitments.map((c, i) => `${i + 1}. ${c.description} (Due: ${c.dueDate || 'TBD'}) - ${c.timestamp}`).join('\n')}

THEIR COMMITMENTS:
${tracker.buyerCommitments.map((c, i) => `${i + 1}. ${c.description} (Due: ${c.dueDate || 'TBD'}) - ${c.timestamp}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(crmFormat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderCommitmentList = (commitments: Commitment[], title: string, icon: string) => (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span className="text-2xl">{icon}</span>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-700">{title}</h4>
        <span className="text-xs bg-gray-200 px-2 py-1 font-mono">{commitments.length}</span>
      </div>

      <div className="space-y-3">
        {commitments.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No commitments detected
          </div>
        ) : (
          commitments.map((commitment) => {
            const isCompleted = completedIds.has(commitment.id);
            return (
              <div
                key={commitment.id}
                className={`${getPriorityStyle(commitment.priority)} p-3 transition-all ${
                  isCompleted ? 'opacity-50' : ''
                }`}
                data-testid={`commitment-${commitment.id}`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => handleToggle(commitment.id)}
                    className="mt-1 cursor-pointer"
                    aria-label={`Mark ${commitment.description} as complete`}
                  />
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${isCompleted ? 'line-through' : ''}`}>
                      {commitment.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {commitment.timestamp}
                      </span>
                      {commitment.dueDate && (
                        <span className="flex items-center gap-1 font-medium text-black">
                          <AlertCircle size={12} />
                          Due: {formatDueDate(commitment.dueDate)}
                        </span>
                      )}
                      <span className="uppercase text-[10px] bg-gray-200 px-1.5 py-0.5">
                        {commitment.priority}
                      </span>
                    </div>
                    {commitment.context && (
                      <p className="text-xs text-gray-600 mt-2 italic">
                        Context: {commitment.context}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 p-6" data-testid="commitment-tracker">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <Calendar size={24} className="text-black" />
          <h3 className="text-lg font-semibold">Commitment Tracker</h3>
          <span className="text-xs bg-gray-200 px-3 py-1 font-mono">
            {tracker.totalCount} Total
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToCalendar}
            className="px-3 py-2 text-xs border border-gray-300 hover:border-black transition-colors flex items-center gap-2"
            data-testid="export-calendar-button"
          >
            <Calendar size={14} />
            Export to Calendar
          </button>
          <button
            onClick={exportToCRM}
            className="px-3 py-2 text-xs border border-gray-300 hover:border-black transition-colors flex items-center gap-2"
            data-testid="export-crm-button"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy to CRM'}
          </button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCommitmentList(tracker.sellerCommitments, 'Your Commitments', '🔵')}
        {renderCommitmentList(tracker.buyerCommitments, 'Their Commitments', '🟢')}
      </div>
    </div>
  );
};

export default CommitmentTrackerComponent;
