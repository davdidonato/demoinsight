import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, CallMetadata, Participant } from "../types";

// Fallback mock data - RenewCast Italian Demo
const MOCK_ANALYSIS: AnalysisResult = {
  metrics: {
    satisfactionScore: 88,
    engagementRate: 92,
    objectionCount: 1, // "costa veramente tanto" mention
    positiveSignalCount: 8
  },
  timeline: [
    { time: "00:53", description: "Prospect confirms need for centralization", sentiment: "neutral", type: "engagement", quote: "quello che vogliamo fare è appunto è uscire da Ratabrix e cominciare a usare Airflow" },
    { time: "03:10", description: "Prospect describes current pain with custom scripts", sentiment: "negative", type: "objection", quote: "Abbiamo poi settato noi delle delle qui per con delle thell specifiche... non è che abbiamo un grande monitoraggio" },
    { time: "05:22", description: "Interest in Frontend/API correlation", sentiment: "positive", type: "feature", quote: "vedere se ci sono, per esempio, delle latenze esagerate andando verso il database" },
    { time: "16:45", description: "Strong interest in Data Jobs & Airflow module", sentiment: "positive", type: "feature", quote: "si vede all'interno della dell'esecuzione come... Ah, ok, è bello." },
    { time: "30:26", description: "Prospect validates cost savings potential", sentiment: "positive", type: "engagement", quote: "Questo questo è interessante... andare a vedere effettivamente cosa stiamo spendendo" },
    { time: "31:29", description: "Maintenance burden of custom solutions", sentiment: "negative", type: "objection", quote: "se devi aggiungere una categoria, devi andare nel codice... costa veramente tanto" },
    { time: "33:34", description: "Excitement about AI/ML observability", sentiment: "positive", type: "question", quote: "Posso chiedere solo mentre siamo qua la parte di cosa si può fare con la parte di AI observability" }
  ],
  painPoints: [
    { category: "Tool Sprawl & Fragmentation", resonanceScore: 90, mentionCount: 3, evidence: "utilizzo magari di diversi tool per fare delle cose adiacenti" },
    { category: "Maintenance Overhead", resonanceScore: 95, mentionCount: 4, evidence: "devi scriverti del codice Python e testarlo... costa veramente tanto" },
    { category: "Lack of Visibility", resonanceScore: 85, mentionCount: 2, evidence: "It's a black box when things go down" }, // Keeping generic fallback if not exact match found, but here: "non è che abbiamo un grande monitoraggio"
    { category: "Cost Management", resonanceScore: 80, mentionCount: 2, evidence: "Databricks comunque vi costava parecchio" }
  ],
  featureHeatmap: [
    { name: "Data Jobs (Airflow)", category: "Data", interestLevel: "High", timeSpentMinutes: 12 },
    { name: "Kubernetes", category: "Monitoring", interestLevel: "High", timeSpentMinutes: 10 },
    { name: "APM", category: "Monitoring", interestLevel: "Medium", timeSpentMinutes: 5 },
    { name: "RUM / Frontend", category: "Monitoring", interestLevel: "Low", timeSpentMinutes: 3 },
    { name: "Cloud Cost", category: "Data", interestLevel: "High", timeSpentMinutes: 6 }
  ],
  emailDraft: {
    subject: "RenewCast + Datadog: Centralizzare Airflow e Kubernetes",
    body: "Ciao Alessandro,\n\nGrazie per il tempo dedicato oggi. È stato interessante approfondire come state migrando i job da Databricks ad Airflow su AKS.\n\nEcco i punti chiave discussi:\n1. **Data Observability**: Il modulo Airflow vi permetterà di vedere ogni singolo task failed senza script custom.\n2. **Kubernetes**: Visibilità completa sui pod e correlazione immediata con le trace APM.\n3. **Ottimizzazione Costi**: Sostituire il vostro script Python di riconciliazione con la nostra Cloud Cost Management automatica.\n\nIn allegato trovi la guida per l'agent di Kubernetes. Ci aggiorniamo settimana prossima per la trial?\n\nA presto,\nEnrico"
  }
};

// DATADOG PRODUCT BASELINE (JANUARY 2026) - TRUTH SOURCE
const DATADOG_KNOWLEDGE_BASE = `
# Datadog Product Baseline (Jan 2026)

## Purpose
This document provides a normalized, end-to-end inventory of Datadog products and major capabilities as of January 2026.  
It is designed as a **baseline reference for AI-driven analysis of customer reactions during Datadog demos**, enabling consistent tagging of features, outcomes, and buyer signals.

---

## Observability Core

### Infrastructure Monitoring
- Host, VM, container, and cloud infrastructure metrics
- Kubernetes, serverless, and autoscaling visibility
- Unified tags across environments
- Cost-aware infrastructure correlation

**Primary outcomes:** availability, capacity planning, infra efficiency

---

### Application Performance Monitoring (APM)
- Distributed tracing
- Service maps and dependency graphs
- Latency, error, and throughput analysis
- Continuous profiler

**Primary outcomes:** performance optimization, root cause analysis

---

### Log Management
- Centralized log ingestion and indexing
- Live tail, rehydration, and archives
- Log-based metrics
- Native correlation with traces and metrics

**Primary outcomes:** troubleshooting speed, auditability

---

### Real User Monitoring (RUM)
- Browser and mobile user session tracking
- Core Web Vitals
- Session replay
- Frontend error monitoring

**Primary outcomes:** user experience optimization, frontend reliability

---

### Synthetic Monitoring
- API and browser tests
- Global test locations
- CI/CD integration
- Performance regression detection

**Primary outcomes:** proactive availability validation

---

## Cloud & Platform Engineering

### Cloud Security Posture Management (CSPM)
- Cloud misconfiguration detection
- Compliance frameworks (CIS, SOC2, ISO)
- Drift detection
- Risk prioritization

---

### Cloud Workload Security (CWS)
- Runtime threat detection
- Kernel-level signals
- Workload behavioral baselining

---

### Application Security Management (ASM)
- SAST, DAST, IAST
- Runtime vulnerability detection
- Code-to-runtime correlation

---

### API Security
- API discovery and inventory
- Authentication and abuse detection
- Schema drift monitoring

---

### Software Composition Analysis (SCA)
- Open-source dependency risk
- Vulnerability and license tracking
- Runtime exploitability context

---

## DevOps & Reliability

### Incident Management
- On-call scheduling
- Incident timelines
- Postmortems
- PagerDuty-style workflows

---

### Service Level Objectives (SLOs)
- Error budgets
- Burn rate alerts
- Reliability scoring

---

### Continuous Testing
- Test optimization insights
- CI visibility
- Test failure correlation

---

## Data, Cost, and Optimization

### Cloud Cost Management
- Cost allocation and tagging
- Forecasting
- Waste detection
- Cost-performance tradeoff analysis

---

### Database Monitoring
- Query-level visibility
- Lock and replication analysis
- Managed DB integrations

---

### Storage Monitoring
- Block, object, and file storage performance
- Cost vs usage correlation

---

## AI & Advanced Analytics

### Bits AI
- Natural language querying
- Root cause suggestions
- Incident summarization
- Cross-product reasoning

---

### LLM Observability
- Prompt and response tracing
- Latency and cost tracking
- Model comparison
- Hallucination detection patterns

---

## Collaboration & Support

### CoScreen
- Secure screen sharing
- Remote debugging
- Embedded support workflows

---

## Platform Capabilities (Cross-Cutting)

- Unified tagging model
- OpenTelemetry native support
- 700+ integrations
- Role-based access control
- Data pipelines and routing
- Multi-region data residency

---

## AI Labeling Guidance (for Demo Analysis)

**Recommended dimensions:**
- Product(s) referenced
- Buyer persona (DevOps, SRE, Security, FinOps, Eng)
- Pain addressed (latency, risk, cost, visibility)
- Reaction signal (interest, confusion, objection, excitement)
- Competitive displacement indicator

---

## Notes
- Product naming aligns with Datadog public catalog as of Jan 2026.
- Internal sales talk tracks, pricing, and competitive positioning should be layered on top of this baseline.
- Document intentionally optimized for machine parsing and semantic tagging.
`;

export const analyzeTranscript = async (transcript: string, metadata?: CallMetadata, participants?: Participant[]): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API Key found. Returning mock data.");
    return new Promise((resolve) => setTimeout(() => resolve(MOCK_ANALYSIS), 2000));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Format context from metadata/participants
    let contextBlock = "";
    if (metadata || participants) {
      contextBlock = `
        *** CALL CONTEXT ***
        Title: ${metadata?.title || 'Unknown'}
        Customer: ${metadata?.customerName || 'Unknown'}
        
        PARTICIPANTS:
        ${participants?.map(p => `- ${p.name} (${p.role})${p.title ? ` - ${p.title}` : ''}`).join('\n') || 'Unknown'}
        
        INSTRUCTION: Focus analysis on the needs, verbatims, and objections of the **Prospects** identified above.
        *** END CONTEXT ***
        `;
    }

    // Strict prompt engineered for consistency and adherence to the taxonomy
    const prompt = `
      You are an expert Datadog Sales Coach and Product Analyst.
      Your task is to analyze a sales demo transcript using the strictly defined "Datadog Product Baseline (2026)" provided below.
      
      ${contextBlock}

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
