import React, { useState, useMemo } from 'react';
import { AnalysisResult } from '../types';
import { EnhancedAnalysisResult, EditableFeatureInterest, ImportanceLevel } from '../types-enhanced';
import { SalesIntelligence } from '../types-sales';
import { enhanceAnalysisResult } from '../utils/enhanceAnalysis';
import { generateSalesIntelligence } from '../utils/salesIntelligence';
import Dashboard from './Dashboard';
import ProductChip from './ProductChip';
import ActionPanel from './ActionPanel';
import DealScorecardComponent from './DealScorecard';
import CommitmentTrackerComponent from './CommitmentTracker';
import CompetitiveAlertsComponent from './CompetitiveAlerts';
import { Download, Plus, Save, Settings } from 'lucide-react';

interface InteractiveDashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

const InteractiveDashboard: React.FC<InteractiveDashboardProps> = ({ data, onReset }) => {
  const [enhancedData, setEnhancedData] = useState<EnhancedAnalysisResult>(() => enhanceAnalysisResult(data));
  const [salesIntelligence, setSalesIntelligence] = useState<SalesIntelligence>(() => generateSalesIntelligence(data));
  const [hasChanges, setHasChanges] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    showDealScorecard: true,
    showCommitmentTracker: true,
    showCompetitiveAlerts: true,
  });

  // Handle product importance change
  const handleUpdateFeature = (id: string, newImportance: ImportanceLevel) => {
    setEnhancedData(prev => ({
      ...prev,
      featureHeatmap: prev.featureHeatmap.map(feature =>
        feature.id === id
          ? { ...feature, interestLevel: newImportance, isEdited: true }
          : feature
      ),
    }));
    setHasChanges(true);
  };

  // Handle product removal
  const handleRemoveFeature = (id: string) => {
    setEnhancedData(prev => ({
      ...prev,
      featureHeatmap: prev.featureHeatmap.filter(f => f.id !== id),
    }));
    setHasChanges(true);
  };

  // Export changes
  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      editedFeatures: enhancedData.featureHeatmap.filter(f => f.isEdited),
      fullData: enhancedData,
    };
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `demoinsight-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header with Actions */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-semibold">Analysis Results</h2>
          {hasChanges && (
            <p className="text-xs text-gray-500 mt-1">
              <span className="inline-block w-2 h-2 bg-black rounded-full mr-2"></span>
              You have unsaved changes
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors flex items-center gap-2"
            data-testid="settings-button"
            aria-label="Toggle settings"
          >
            <Settings size={16} />
            Settings
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors flex items-center gap-2"
            data-testid="export-button"
            aria-label="Export analysis data"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-gray-50 border border-gray-200 p-4 animate-fade-in">
          <h3 className="text-sm font-semibold mb-3">Feature Visibility</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showDealScorecard}
                onChange={(e) => setSettings({...settings, showDealScorecard: e.target.checked})}
                className="cursor-pointer"
              />
              Deal Scorecard
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showCommitmentTracker}
                onChange={(e) => setSettings({...settings, showCommitmentTracker: e.target.checked})}
                className="cursor-pointer"
              />
              Commitment Tracker
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showCompetitiveAlerts}
                onChange={(e) => setSettings({...settings, showCompetitiveAlerts: e.target.checked})}
                className="cursor-pointer"
              />
              Competitive Alerts
            </label>
          </div>
        </div>
      )}

      {/* Competitive Alerts (Top Priority - Show First) */}
      {settings.showCompetitiveAlerts && salesIntelligence.competitiveAlerts.length > 0 && (
        <CompetitiveAlertsComponent alerts={salesIntelligence.competitiveAlerts} />
      )}

      {/* Deal Scorecard */}
      {settings.showDealScorecard && (
        <DealScorecardComponent scorecard={salesIntelligence.dealScorecard} />
      )}

      {/* Commitment Tracker */}
      {settings.showCommitmentTracker && (
        <CommitmentTrackerComponent tracker={salesIntelligence.commitmentTracker} />
      )}

      {/* Interactive Product Mentions */}
      <div className="bg-white p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700">Product Mentions</h3>
          <span className="text-xs text-gray-500">
            Click to edit importance • Hover to remove
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {enhancedData.featureHeatmap.map(feature => (
            <ProductChip
              key={feature.id}
              id={feature.id}
              name={feature.name}
              importance={feature.interestLevel}
              isEdited={feature.isEdited}
              onEdit={handleUpdateFeature}
              onRemove={handleRemoveFeature}
              timeSpent={feature.timeSpentMinutes}
            />
          ))}
        </div>
      </div>

      {/* Original Dashboard Sections */}
      <Dashboard data={data} onReset={onReset} />

      {/* Action Intelligence Panel */}
      {enhancedData.actionIntelligence && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Additional Recommendations</h2>
          <ActionPanel intelligence={enhancedData.actionIntelligence} />
        </div>
      )}
    </div>
  );
};

export default InteractiveDashboard;
