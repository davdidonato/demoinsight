import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

// Fallback mock data
const MOCK_ANALYSIS: AnalysisResult = {
  metrics: {
    satisfactionScore: 78,
    engagementRate: 85,
    objectionCount: 1,
    positiveSignalCount: 4
  },
  timeline: [
    { time: "00:45", description: "Prospect confirms visibility pain point", sentiment: "negative", type: "engagement", quote: "It's a black box when things go down." },
    { time: "01:20", description: "Strong interest in Infrastructure Map", sentiment: "positive", type: "feature", quote: "Wow, does it handle containers too? We use Kubernetes heavily." },
    { time: "02:15", description: "Prospect mentions Alert Fatigue", sentiment: "negative", type: "objection", quote: "But my team is drowning in alerts right now. We get PagerDuty storms every night." },
    { time: "03:40", description: "Concern about Log retention costs", sentiment: "neutral", type: "question", quote: "How much does the log retention cost though? That's a concern for finance." },
    { time: "04:30", description: "Enthusiasm for APM Traces and MTTR reduction", sentiment: "positive", type: "engagement", quote: "This is exactly what we need to lower our MTTR." }
  ],
  painPoints: [
    { category: "Infrastructure Visibility", resonanceScore: 95, mentionCount: 2, evidence: "It's a black box when things go down." },
    { category: "Alert Fatigue", resonanceScore: 90, mentionCount: 1, evidence: "Drowning in alerts right now." },
    { category: "Cost Management", resonanceScore: 60, mentionCount: 1, evidence: "How much does log retention cost?" },
    { category: "Troubleshooting Efficiency", resonanceScore: 85, mentionCount: 1, evidence: "Need to lower our MTTR." }
  ],
  featureHeatmap: [
    { name: "Infrastructure", category: "Monitoring", interestLevel: "High", timeSpentMinutes: 3 },
    { name: "APM", category: "Monitoring", interestLevel: "High", timeSpentMinutes: 2 },
    { name: "Logs", category: "Data", interestLevel: "Medium", timeSpentMinutes: 2 },
    { name: "Watchdog", category: "Intelligence", interestLevel: "Medium", timeSpentMinutes: 1 },
    { name: "Security", category: "Security", interestLevel: "Low", timeSpentMinutes: 0 }
  ],
  emailDraft: {
    subject: "Datadog Demo Follow-up: Solving Visibility & Alert Fatigue",
    body: "Hi Alex,\n\nThanks for the time today. It was great to hear how Datadog can help solve the visibility 'black box' issues you're facing with your hybrid setup.\n\nBased on our conversation, I wanted to highlight:\n1. Infrastructure Map: Full visibility into your K8s containers.\n2. Watchdog: Reducing that alert fatigue you mentioned.\n3. Cost Control: Our decoupled ingestion/indexing for logs.\n\nI'm attaching the implementation guide we discussed. Let's touch base Tuesday?\n\nBest,\n[Your Name]"
  }
};

// DATADOG PRODUCT BASELINE (JANUARY 2026) - TRUTH SOURCE
const DATADOG_KNOWLEDGE_BASE = `
1. OBSERVABILITY - INFRASTRUCTURE & CLOUD
- Infrastructure Monitoring: Monitor hosts & cloud resources.
- Network Monitoring: Network flows, topology, NPM.
- Container Monitoring: Kubernetes & containers.
- Kubernetes Autoscaling: Rightsize K8s resources.
- Serverless: Observe serverless apps end-to-end.
- Cloud Cost Management: FinOps, correlate spend.
- Cloudcraft: Visualize architectures.

2. OBSERVABILITY - APPLICATIONS & SERVICES
- APM: Trace and optimize app performance.
- Universal Service Monitoring: eBPF discovery without code changes.
- Software Catalog: Service ownership & metadata.
- Database Monitoring: Query analytics, explain plans.
- Continuous Profiler: Optimize code CPU/memory.
- Error Tracking: Group and prioritize errors.
- LLM Observability: Monitor LLM app quality & cost.
- Data Streams Monitoring: Event-driven pipeline latency.
- Quality Monitoring: Data freshness, schema changes.

3. OBSERVABILITY - LOGS & DATA
- Log Management: Search, analyze, index, "Logging without Limits".
- Observability Pipelines: Process/route telemetry, sensitive data reduction.
- CloudPrem: BYOC log storage.
- Sensitive Data Scanner: PII detection.
- Audit Trail: Track changes/governance.

4. DIGITAL EXPERIENCE
- Browser RUM: Real User Monitoring, Web Vitals.
- Mobile RUM: Mobile app experience.
- Session Replay: Debug UX visually.
- Synthetic Monitoring: API & Browser tests.
- Product Analytics: Funnels, cohorts.

5. SECURITY
- Cloud Security: Posture (CSPM), Workload Protection (CWP).
- App & API Protection: WAF-like threat detection.
- Code Security: SAST, SCA, IAST, Secret Scanning.
- Cloud SIEM: Log-based detections.

6. SOFTWARE DELIVERY & SERVICE MANAGEMENT
- CI Visibility: Pipeline analytics.
- Test Optimization: Flaky tests.
- DORA Metrics: Delivery performance.
- Service Level Objectives (SLOs): Error budgets.
- Incident Response: Coordination.

7. AI & PLATFORM
- Watchdog: Automated anomaly detection (AI).
- Bits AI: Agentic assistance.
- Teams, Dashboards, Notebooks.

REACTION BASELINE (SENTIMENT CUES):
- Positive: "single pane", "correlate", "reduce MTTR", "OpenTelemetry", "service map", "user journey", "replay", "CNAPP", "shift-left".
- Concerns/Objections: "agent overhead", "ingestion volume", "cost", "retention", "privacy/PII", "sampling", "false positives", "alert fatigue".
`;

export const analyzeTranscript = async (transcript: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ANALYSIS), 2000));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Strict prompt engineered for consistency and adherence to the taxonomy
    const prompt = `
      You are an expert Datadog Sales Coach and Product Analyst.
      Your task is to analyze a sales demo transcript using the strictly defined "Datadog Product Baseline (2026)" provided below.
      
      *** START KNOWLEDGE BASE ***
      ${DATADOG_KNOWLEDGE_BASE}
      *** END KNOWLEDGE BASE ***

      INSTRUCTIONS:
      1. ANALYZE the transcript against the Knowledge Base.
      2. IDENTIFY specific products, features, and pain points discussed.
      3. CLASSIFY sentiment using the "Reaction Baseline" cues (e.g. "cost" is an objection, "single pane" is positive).
      4. MAP findings to the following JSON schema categories strictly:
         - 'Monitoring': Maps to Infra, Network, APM, RUM, Synthetics, Database, Serverless.
         - 'Data': Maps to Logs, Pipelines, Metrics, Sensitive Data.
         - 'Security': Maps to Cloud Security, App Sec, SIEM.
         - 'Workflow': Maps to Software Delivery (CI/CD), Service Management, Incident Response.
         - 'Intelligence': Maps to Watchdog, Bits AI, AI Integrations.

      CONSISTENCY RULES:
      - If the prospect mentions "alerts" or "noise", map to "Alert Fatigue" pain point.
      - If the prospect mentions "black box" or "cant see", map to "Infrastructure Visibility".
      - If the prospect mentions "price", "bill", or "finance", map to "Cost Management".
      
      TRANSCRIPT TO ANALYZE:
      "${transcript}"
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0, // CRITICAL: Set to 0 for maximum determinism and consistency
        systemInstruction: "You are a precise data extraction engine. Output strictly valid JSON matching the schema. Do not include markdown formatting or explanations.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            metrics: {
              type: Type.OBJECT,
              properties: {
                satisfactionScore: { type: Type.NUMBER, description: "Calculated based on positive vs negative signals (0-100)" },
                engagementRate: { type: Type.NUMBER, description: "Percentage of conversation where prospect is talking or asking questions" },
                objectionCount: { type: Type.NUMBER },
                positiveSignalCount: { type: Type.NUMBER }
              }
            },
            timeline: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING, description: "Timestamp (MM:SS)" },
                  description: { type: Type.STRING },
                  sentiment: { type: Type.STRING, enum: ["positive", "negative", "neutral"] },
                  type: { type: Type.STRING, enum: ["engagement", "objection", "question", "feature"] },
                  quote: { type: Type.STRING, description: "Verbatim quote from the transcript" }
                }
              }
            },
            painPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING, description: "Standardized pain point category" },
                  resonanceScore: { type: Type.NUMBER, description: "0-100, how deeply this pain was felt" },
                  mentionCount: { type: Type.NUMBER },
                  evidence: { type: Type.STRING, description: "Direct quote from prospect" }
                }
              }
            },
            featureHeatmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Specific product name from Knowledge Base (e.g. 'APM', 'Watchdog')" },
                  category: { type: Type.STRING, enum: ['Monitoring', 'Data', 'Intelligence', 'Workflow', 'Security'] },
                  interestLevel: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] },
                  timeSpentMinutes: { type: Type.NUMBER }
                }
              }
            },
            emailDraft: {
              type: Type.OBJECT,
              properties: {
                subject: { type: Type.STRING },
                body: { type: Type.STRING }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    
    return JSON.parse(text) as AnalysisResult;

  } catch (error) {
    console.error("Analysis failed:", error);
    return MOCK_ANALYSIS;
  }
};
