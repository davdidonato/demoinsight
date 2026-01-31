import React, { useState, useRef } from 'react';
import { analyzeTranscript } from './services/geminiService';
import InteractiveDashboard from './components/InteractiveDashboard';
import CallDetailsForm from './components/CallDetailsForm';
import LandingPage from './components/LandingPage';
import { AnalysisResult, MOCK_TRANSCRIPT, CallMetadata, Participant } from './types';
import { Upload, FileText, Loader2, ArrowLeft, Clipboard, FileUp } from 'lucide-react';

type AppView = 'home' | 'upload-choice' | 'paste' | 'confirming' | 'analyzing' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [transcript, setTranscript] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Call Metadata State
  const [metadata, setMetadata] = useState<CallMetadata>({ title: '', customerName: '' });
  const [participants, setParticipants] = useState<Participant[]>([]);

  const parseTranscriptMetadata = (text: string) => {
    // Basic heuristics to find title, duration, participants
    const lines = text.split('\n').slice(0, 20); // Check first 20 lines
    let title = '';
    let customerName = '';
    let duration = '';
    let date = '';

    // Naive parsing logic
    const titleLine = lines.find(l => l.toLowerCase().includes('demo') || l.includes('<>') || l.includes(' - '));
    if (titleLine) {
      title = titleLine.trim();
      if (title.includes('<>')) {
        const parts = title.split('<>');
        if (parts.length > 1) {
          // Assuming format "Datadog <> Customer"
          const possibleCustomer = parts[1].split('-')[0].trim();
          if (possibleCustomer && possibleCustomer.toLowerCase() !== 'datadog') {
            customerName = possibleCustomer;
          }
        }
      }
    }

    const dateLine = lines.find(l => l.match(/\d{1,2}\s+\w+\s+\d{4}/)); // e.g. 21 gen 2026
    if (dateLine) date = dateLine.trim();

    // Find the last timestamp to determine duration
    const timestampRegex = /\b\d{1,2}:\d{2}(?::\d{2})?\b/g;
    const allTimestamps = [...text.matchAll(timestampRegex)];
    if (allTimestamps.length > 0) {
      duration = allTimestamps[allTimestamps.length - 1][0];
    }

    setMetadata({ title, customerName, date, duration });

    // Attempt to identify speakers
    // Matches "Name Surname:" or "Name Middle Surname:" (2+ capitalized words)
    const speakerRegex = /^([A-Z][a-z]+(?: [A-Z][a-z]+)+):/gm;
    const matches = [...text.matchAll(speakerRegex)];
    const uniqueSpeakers = Array.from(new Set(matches.map(m => m[1])));

    const detectedParticipants: Participant[] = uniqueSpeakers.map((name, index) => ({
      name,
      role: index === 0 ? 'SE' : 'Prospect' // Default first found to SE, rest Prospects (user will correct)
    }));

    if (detectedParticipants.length === 0) {
      // Defaults if no detection
      detectedParticipants.push({ name: '', role: 'SE' });
      detectedParticipants.push({ name: '', role: 'AE' });
      detectedParticipants.push({ name: '', role: 'Prospect' });
    }

    setParticipants(detectedParticipants);
  };

  const startConfirmation = (textToAnalyze: string) => {
    if (textToAnalyze.length < 50) {
      setError("Transcript is too short. Please provide at least 50 characters.");
      return;
    }
    setError(null);
    parseTranscriptMetadata(textToAnalyze);
    setView('confirming');
  };

  const handleAnalyze = async (finalMetadata: CallMetadata, finalParticipants: Participant[]) => {
    setView('analyzing');
    setError(null);

    try {
      const data = await analyzeTranscript(transcript, finalMetadata, finalParticipants);
      setResult(data);
      setView('dashboard');
    } catch (e) {
      setError("Analysis failed. Please try again.");
      setView('landing');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setTranscript(text);
        startConfirmation(text);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('text')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setTranscript(text);
        startConfirmation(text);
      };
      reader.readAsText(file);
    } else {
      setError("Please drop a valid .txt file.");
    }
  };

  const loadDemo = () => {
    setTranscript(MOCK_TRANSCRIPT);
    setView('paste');
  };

  // Handler for "Try Demo Transcript" - directly analyze demo
  const handleTryDemo = () => {
    setTranscript(MOCK_TRANSCRIPT);
    startConfirmation(MOCK_TRANSCRIPT);
  };

  // Handler for "Upload Your Call" - show upload options
  const handleUploadCall = () => {
    setView('upload-choice');
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans">

      {/* HOME/LANDING VIEW */}
      {view === 'home' && (
        <LandingPage 
          onTryDemo={handleTryDemo}
          onUploadCall={handleUploadCall}
        />
      )}

      {/* Rest of the app views */}
      {view !== 'home' && (
        <>
          {/* Minimal Header */}
          <header className="h-16 flex items-center justify-between px-8 border-b border-gray-100">
            <div className="font-bold text-lg tracking-tight">
              DemoInsight
            </div>
            {view === 'dashboard' && (
              <button
                onClick={() => {
                  setTranscript('');
                  setResult(null);
                  setView('upload-choice');
                }}
                className="text-sm text-gray-400 hover:text-black transition-colors"
              >
                Start Over
              </button>
            )}
          </header>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">

            {/* UPLOAD CHOICE VIEW */}
            {view === 'upload-choice' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
                <h1 className="text-4xl font-light mb-12 tracking-tight text-center">
                  How would you like to analyze?
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

                  {/* Option 1: Drag & Drop / File Upload */}
                  <div
                    className="group relative h-80 border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all duration-300"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept=".txt"
                      onChange={handleFileUpload}
                    />
                    <div className="bg-gray-100 p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FileUp size={40} className="text-black" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Attach txt file</h2>
                    <p className="text-gray-400 text-sm">Drag and drop or browse</p>
                  </div>

                  {/* Option 2: Copy Paste */}
                  <div
                    className="group h-80 border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all duration-300"
                    onClick={() => setView('paste')}
                  >
                    <div className="bg-gray-100 p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Clipboard size={40} className="text-black" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Paste transcript</h2>
                    <p className="text-gray-400 text-sm">Copy directly from clipboard</p>
                  </div>

                  {/* Option 3: RenewCast Transcript */}
                  <div
                    className="group h-80 border border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all duration-300 col-span-1 md:col-span-2"
                    onClick={() => {
                      setTranscript(MOCK_TRANSCRIPT);
                      startConfirmation(MOCK_TRANSCRIPT);
                    }}
                  >
                    <div className="bg-gray-100 p-6 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <FileText size={40} className="text-black" />
                    </div>
                    <h2 className="text-xl font-medium mb-2">Use built-in RenewCast Transcript</h2>
                    <p className="text-gray-400 text-sm">Analyze the pre-loaded demo</p>
                  </div>

                </div>

                {error && <div className="mt-8 text-red-500 text-sm">{error}</div>}
              </div>
            )}

            {/* PASTE VIEW */}
            {view === 'paste' && (
              <div className="flex-1 flex flex-col items-center p-8 max-w-4xl mx-auto w-full">
                <div className="w-full flex justify-between items-end mb-4">
                  <button
                    onClick={() => setView('upload-choice')}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button onClick={loadDemo} className="text-xs text-gray-400 hover:text-black underline">
                    Load Sample
                  </button>
                </div>

                <div className="w-full flex-1 relative">
                  <textarea
                    className="w-full h-[60vh] p-8 bg-gray-50 border border-transparent focus:bg-white focus:border-black focus:ring-0 resize-none font-mono text-sm leading-relaxed transition-all duration-300 outline-none"
                    placeholder="Paste your transcript here..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                  />
                </div>

                <div className="w-full mt-6 flex justify-end">
                  <button
                    onClick={() => startConfirmation(transcript)}
                    disabled={!transcript}
                    className="bg-black text-white px-8 py-4 font-medium text-sm hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl translate-y-0 hover:-translate-y-1"
                  >
                    Next: Confirm Details
                  </button>
                </div>
              </div>
            )}

            {/* CONFIRMING VIEW */}
            {view === 'confirming' && (
              <CallDetailsForm
                initialMetadata={metadata}
                initialParticipants={participants}
                onConfirm={handleAnalyze}
                onCancel={() => setView('upload-choice')}
              />
            )}

            {/* ANALYZING VIEW */}
            {view === 'analyzing' && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <Loader2 size={48} className="text-black animate-spin mb-8" />
                <h3 className="text-xl font-light text-black tracking-wide">Processing...</h3>
              </div>
            )}

            {/* DASHBOARD VIEW */}
            {view === 'dashboard' && result && (
              <Dashboard
                data={result}
                onReset={() => {
                  setTranscript('');
                  setResult(null);
                  setView('upload-choice');
                }}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
};

export default App;