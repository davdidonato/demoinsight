import React, { useState } from 'react';
import { AnalysisResult, FeatureInterest, PainPoint, KeyMoment } from '../types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  Clock, AlertCircle, CheckCircle, Brain, Mail, Copy, Check
} from 'lucide-react';

interface DashboardProps {
  data: AnalysisResult;
  onReset: () => void;
}

// Minimal Black & White Score Gauge
const ScoreCard = ({ score, metrics, timeline }: { score: number, metrics: any, timeline: KeyMoment[] }) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Filter objections for the tooltip
  const objections = timeline.filter(t => t.type === 'objection');
  const engagements = timeline.filter(t => t.type === 'engagement');
  const positiveSignals = timeline.filter(t => t.sentiment === 'positive');

  const renderTooltip = (title: string, items: KeyMoment[], colorClass: string = 'text-gray-500') => (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-black text-white p-4 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
      <div className={`text-[10px] uppercase tracking-wider ${colorClass} mb-3 font-bold border-b border-gray-800 pb-2`}>
        {title}
      </div>
      <div className="space-y-4 max-h-48 overflow-y-auto custom-scrollbar">
        {items.length > 0 ? items.map((item, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono bg-gray-800 px-1.5 py-0.5 rounded text-gray-300">{item.time}</span>
            </div>
            <p className="text-xs italic text-gray-200 leading-relaxed">"{item.quote || item.description}"</p>
          </div>
        )) : <div className="text-xs text-gray-500 italic">No items recorded.</div>}
      </div>
      {/* Triangle Pointer */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
    </div>
  );

  return (
    <div className="bg-white p-8 border border-gray-200 h-full flex flex-col items-center relative">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8 text-center w-full">Prospect Satisfaction</h3>

      <div className="relative mb-8">
        {/* SVG Ring */}
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          className="transform -rotate-90"
        >
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#f5f5f5"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Arc */}
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

        {/* Centered Score */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-light text-black leading-none select-none">
            {score}
          </span>
        </div>
      </div>

      <div className="w-full space-y-4">
        {/* Engagement Row */}
        <div className="group relative flex justify-between items-center py-2 border-b border-gray-100 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Engagement</span>
          <span className="font-mono text-sm">{metrics.engagementRate}%</span>
          {renderTooltip("Engagement Moments", engagements)}
        </div>

        {/* Objections Row */}
        <div className="group relative flex justify-between items-center py-2 border-b border-gray-100 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Objections</span>
          <span className="font-mono text-sm">{metrics.objectionCount}</span>
          {renderTooltip("Recorded Objections", objections, "text-red-400")}
        </div>

        {/* Positive Signals Row */}
        <div className="group relative flex justify-between items-center py-2 cursor-help">
          <span className="text-sm text-gray-500 border-b border-dotted border-gray-300">Positive Signals</span>
          <span className="font-mono text-sm">{metrics.positiveSignalCount}</span>
          {renderTooltip("Positive Highlights", positiveSignals, "text-green-400")}
        </div>
      </div>
    </div>
  );
};

const Timeline = ({ events }: { events: AnalysisResult['timeline'] }) => {
  const getIcon = (type: string) => {
    // Minimal icons, all black/gray
    switch (type) {
      case 'engagement': return <CheckCircle size={14} className="text-black" />;
      case 'objection': return <AlertCircle size={14} className="text-black" />;
      case 'feature': return <Brain size={14} className="text-gray-500" />;
      default: return <Clock size={14} className="text-gray-300" />;
    }
  };

  return (
    <div className="bg-white p-8 border border-gray-200 h-full flex flex-col">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Key Moments</h3>
      <div className="overflow-y-auto custom-scrollbar flex-1 pr-4">
        {events.map((event, i) => (
          <div key={i} className="group relative flex gap-4 mb-6 last:mb-0">
            {/* Tooltip for Timeline Item */}
            <div className="absolute left-10 bottom-full mb-2 w-64 bg-black text-white p-3 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
              <p className="text-xs text-gray-300 mb-2 font-mono">{event.time} - {event.type}</p>
              <p className="text-sm italic">"{event.quote || event.description}"</p>
              {/* Arrow */}
              <div className="absolute top-full left-4 border-4 border-transparent border-t-black"></div>
            </div>

            {/* Timeline Line */}
            {i !== events.length - 1 && (
              <div className="absolute left-[7px] top-6 bottom-[-24px] w-[1px] bg-gray-100" />
            )}

            <div className="flex-shrink-0 pt-1 z-10 bg-white cursor-help">
              {getIcon(event.type)}
            </div>

            <div className="flex-1 cursor-default">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-mono text-gray-400">{event.time}</span>
                <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full border ${event.sentiment === 'positive' ? 'border-gray-200 text-black' :
                    event.sentiment === 'negative' ? 'border-gray-200 text-gray-500' : 'border-gray-100 text-gray-400'
                  }`}>
                  {event.sentiment}
                </span>
              </div>
              <p className="text-sm text-gray-800 font-light leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black text-white p-4 rounded shadow-xl max-w-xs">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">{data.category}</p>
        <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
          <span className="text-sm">Resonance:</span>
          <span className="font-mono text-sm">{data.resonanceScore}</span>
        </div>
        <p className="text-xs italic text-gray-300">"{data.evidence}"</p>
        <div className="mt-2 text-[10px] text-gray-500">Mentions: {data.mentionCount}</div>
      </div>
    );
  }
  return null;
};

const PainPointsChart = ({ points }: { points: PainPoint[] }) => {
  return (
    <div className="bg-white p-8 border border-gray-200 h-full">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Pain Point Resonance</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={points} layout="vertical" margin={{ left: 0, right: 30 }}>
            <XAxis type="number" hide domain={[0, 100]} />
            <YAxis
              dataKey="category"
              type="category"
              width={140}
              tick={{ fontSize: 11, fill: '#666', fontFamily: 'Inter' }}
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <Tooltip
              cursor={{ fill: '#f9f9f9' }}
              content={<CustomTooltip />}
            />
            {/* Minimal Bars: Dark Gray for high resonance, Light Gray for lower */}
            <Bar dataKey="resonanceScore" barSize={16}>
              {points.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.resonanceScore > 75 ? '#000000' : '#d4d4d4'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const FeatureHeatmap = ({ features }: { features: FeatureInterest[] }) => {
  const getStyle = (level: string) => {
    switch (level) {
      case 'High': return 'bg-black text-white border-black';
      case 'Medium': return 'bg-white text-black border-gray-300';
      default: return 'bg-white text-gray-300 border-gray-100';
    }
  };

  const grouped = features.reduce((acc, curr) => {
    (acc[curr.category] = acc[curr.category] || []).push(curr);
    return acc;
  }, {} as Record<string, FeatureInterest[]>);

  return (
    <div className="bg-white p-8 border border-gray-200 h-full">
      <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6">Feature Interest</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{category}</h4>
            <div className="flex flex-col gap-2">
              {items.map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative px-3 py-2 border text-xs font-medium transition-all cursor-help ${getStyle(feature.interestLevel)}`}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black text-white p-3 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
                    <div className="flex justify-between border-b border-gray-700 pb-1 mb-1">
                      <span className="text-[10px] uppercase text-gray-400">Interest</span>
                      <span className="font-mono text-[10px]">{feature.interestLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[10px] uppercase text-gray-400">Time Spent</span>
                      <span className="font-mono text-[10px]">{feature.timeSpentMinutes} min</span>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>{feature.name}</span>
                    {feature.interestLevel === 'High' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EmailGenerator = ({ draft }: { draft: AnalysisResult['emailDraft'] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const fullText = `Subject: ${draft.subject}\n\n${draft.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-8 border border-gray-200 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          Suggested Follow-up
        </h3>
        <button
          onClick={handleCopy}
          className="text-xs flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy Text'}
        </button>
      </div>
      <div className="flex-1 bg-gray-50 p-6 font-mono text-sm border border-gray-100 overflow-y-auto custom-scrollbar">
        <div className="font-bold mb-4 pb-4 border-b border-gray-200 text-black">
          Subject: {draft.subject}
        </div>
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {draft.body}
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ data, onReset }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Row: Score & Timeline */}
        <div className="lg:col-span-1 h-96 lg:h-auto">
          {/* Passed data.timeline to ScoreCard for evidence tooltips */}
          <ScoreCard score={data.metrics.satisfactionScore} metrics={data.metrics} timeline={data.timeline} />
        </div>
        <div className="lg:col-span-2 h-96 lg:h-auto">
          <Timeline events={data.timeline} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Middle Row: Charts */}
        <div className="h-80">
          <PainPointsChart points={data.painPoints} />
        </div>
        <div className="h-80">
          <FeatureHeatmap features={data.featureHeatmap} />
        </div>
      </div>

      <div className="h-96">
        {/* Bottom Row: Email */}
        <EmailGenerator draft={data.emailDraft} />
      </div>
    </div>
  );
};

export default Dashboard;
