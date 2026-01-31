import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  EnhancedAnalysisResult,
  DashboardContextType,
  EditableFeatureInterest,
  EditablePainPoint,
} from '../types-enhanced';

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  initialData: EnhancedAnalysisResult;
  children: React.ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  initialData,
  children,
}) => {
  const [data, setData] = useState<EnhancedAnalysisResult>(initialData);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const updateFeature = useCallback((id: string, updates: Partial<EditableFeatureInterest>) => {
    setData(prev => ({
      ...prev,
      featureHeatmap: prev.featureHeatmap.map(feature =>
        feature.id === id
          ? { ...feature, ...updates, isEdited: true }
          : feature
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const removeFeature = useCallback((id: string) => {
    setData(prev => ({
      ...prev,
      featureHeatmap: prev.featureHeatmap.filter(feature => feature.id !== id),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const addFeature = useCallback((feature: Omit<EditableFeatureInterest, 'id'>) => {
    const newFeature: EditableFeatureInterest = {
      ...feature,
      id: `feature-${Date.now()}`,
      isEdited: true,
    };
    setData(prev => ({
      ...prev,
      featureHeatmap: [...prev.featureHeatmap, newFeature],
    }));
    setHasUnsavedChanges(true);
  }, []);

  const updatePainPoint = useCallback((id: string, updates: Partial<EditablePainPoint>) => {
    setData(prev => ({
      ...prev,
      painPoints: prev.painPoints.map(point =>
        point.id === id
          ? { ...point, ...updates, isEdited: true }
          : point
      ),
    }));
    setHasUnsavedChanges(true);
  }, []);

  const exportChanges = useCallback(() => {
    const exportData = {
      timestamp: new Date().toISOString(),
      editedFeatures: data.featureHeatmap.filter(f => f.isEdited),
      editedPainPoints: data.painPoints.filter(p => p.isEdited),
      fullData: data,
    };
    return JSON.stringify(exportData, null, 2);
  }, [data]);

  const value: DashboardContextType = {
    data,
    updateFeature,
    removeFeature,
    addFeature,
    updatePainPoint,
    exportChanges,
    hasUnsavedChanges,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};
