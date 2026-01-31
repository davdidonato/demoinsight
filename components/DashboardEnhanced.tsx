import React, { useState, useMemo } from 'react';
import { AnalysisResult } from '../types';
import { DashboardProvider, useDashboard } from '../contexts/DashboardContext';
import { enhanceAnalysisResult } from '../utils/enhanceAnalysis';
import ProductChip from './ProductChip';
import ActionPanel from './ActionPanel';
import Tooltip from './Tooltip';
import { Download, Plus } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip as ChartTooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Clock, AlertCircle, CheckCircle, Brain, Mail, Copy, Check
} from 'lucide-react';

interface DashboardEnhancedProps {
  data: AnalysisResult;
  onReset: () => void;
}

// Import existing components from original Dashboard
const ScoreCard = ({ score, metrics, timeline }: any) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const objections = timeline.filter((t: any) => t.type === 'objection');
  const engagements = timeline.filter((t: any) => t.type === 'engagement');
  const positiveSignals = timeline.filter((t: any) => t.sentiment === 'positive');

  const renderTooltip = (title: string, items: any[], colorClass: string = 'text-gray-500') => (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-black text-white p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
      <div className={`text-[10px] uppercase tracking-wider ${colorClass} mb-3 font-bold border-b border-gray-800 pb-2`}>
        {title}
      </div>
      <div className="space-y-4 max-h-48 overflow-y-auto custom-scrollbar">
        {items.length > 0 ? items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono bg-gray-800 px-1.5 py-0.5 text-gray-300">{item.time}</span>
            </div>
            <p className="text-xs italic text-gray-200 leading-relaxed">"{item.quote || item.description}"</p>
          </div>
        )) : <div className="text-xs text-gray-500 italic">No items recorded.</div>}
      </div>
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
    </div>
  );

  return (
    <div className="bg-white p-8 border border-gray-200 h-full flex flex-col items-center relative">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8 text-center w-full">Prospect Satisfaction</h3>

      <div className="relative mb-8">
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="transform -rotate-90"
        >
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f5f5f5"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="black"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-light text-black leading-none select-none">
            {score}
          </span>
        </div>
      </div>

      <div className="w-full space-y-4">
        <div className="group relative flex justify-between items-center py-2 border-b border-gray-100 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Engagement</span>
          <span className="font-mono text-sm">{metrics.engagementRate}%</span>
          {renderTooltip("Engagement Moments", engagements)}
        </div>

        <div className="group relative flex justify-between items-center py-2 border-b border-gray-100 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Objections</span>
          <span className="font-mono text-sm">{metrics.objectionCount}</span>
          {renderTooltip("Recorded Objections", objections, "text-red-400")}
        </div>

        <div className="group relative flex justify-between items-center py-2 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Positive Signals</span>
          <span className="font-mono text-sm">{metrics.positiveSignalCount}</span>
          {renderTooltip("Positive Highlights", positiveSignals, "text-green-400")}
        </div>
      </div>
    </div>
  );
};

// Continue in next part...
