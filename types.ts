export interface KeyMoment {
  time: string;
  description: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  type: 'engagement' | 'objection' | 'question' | 'feature';
  quote?: string;
}

export interface PainPoint {
  category: string; // e.g., "Infrastructure Visibility"
  resonanceScore: number; // 0-100
  mentionCount: number;
  evidence: string;
}

export interface FeatureInterest {
  name: string; // e.g., "APM"
  category: 'Monitoring' | 'Data' | 'Intelligence' | 'Workflow' | 'Security';
  interestLevel: 'High' | 'Medium' | 'Low';
  timeSpentMinutes: number;
}

export interface EngagementMetrics {
  satisfactionScore: number; // 0-100
  engagementRate: number; // Percentage
  objectionCount: number;
  positiveSignalCount: number;
}

export interface EmailDraft {
  subject: string;
  body: string;
}

export interface AnalysisResult {
  metrics: EngagementMetrics;
  timeline: KeyMoment[];
  painPoints: PainPoint[];
  featureHeatmap: FeatureInterest[];
  emailDraft: EmailDraft;
}

export type ViewState = 'upload' | 'analyzing' | 'dashboard';

export const MOCK_TRANSCRIPT = `Rep: Hi Alex, thanks for joining. I understand you're struggling with visibility across your hybrid cloud setup?
Prospect: Exactly. We have AWS and some on-prem servers. It's a black box when things go down.
Rep: I hear that a lot. That's exactly where Datadog shines. Let me show you the Infrastructure map. It auto-discovers all your hosts.
Prospect: Wow, does it handle containers too? We use Kubernetes heavily.
Rep: Absolutely. We treat containers as first-class citizens. You can drill down into any pod.
Prospect: That looks great. But my team is drowning in alerts right now. We get PagerDuty storms every night.
Rep: Alert fatigue is a huge issue. Our Watchdog AI actually detects anomalies automatically, so you only get alerted on real issues, not just noise.
Prospect: That would be a game changer. How much does the log retention cost though? That's a concern for finance.
Rep: We have "Logging without Limits." You ingest everything but only index (and pay for) what you need.
Prospect: Okay, that sounds flexible. Can we see the APM traces?
Rep: Sure. Here is a trace from frontend to database.
Prospect: This is exactly what we need to lower our MTTR. The correlation between logs and traces is seamless.
Rep: Glad to hear that. I'll send over some info on the implementation process.`;
