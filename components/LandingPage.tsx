import React from 'react';
import { 
  Upload, 
  Brain, 
  LineChart, 
  Target, 
  Mail, 
  Github, 
  FileText, 
  BookOpen,
  Lock,
  Shield
} from 'lucide-react';

interface LandingPageProps {
  onTryDemo: () => void;
  onUploadCall: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onTryDemo, onUploadCall }) => {
  return (
    <div className="min-h-screen bg-white text-black">
      
      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 animate-fade-in"
        data-testid="hero-section"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Headline */}
          <h1 
            className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 leading-tight"
            data-testid="hero-headline"
          >
            Turn Sales Calls Into
            <br />
            Actionable Intelligence
          </h1>
          
          {/* Subheadline */}
          <p 
            className="text-xl md:text-2xl text-gray-600 font-normal mb-12 max-w-3xl mx-auto leading-relaxed"
            data-testid="hero-subheadline"
          >
            AI-powered transcript analysis that maps customer pain points to Datadog products, 
            delivering instant insights for smarter follow-ups.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button
              onClick={onTryDemo}
              className="px-8 py-4 bg-black text-white text-lg font-semibold hover:bg-gray-800 transition-colors border-2 border-black"
              data-testid="try-demo-button"
              aria-label="Try demo transcript"
            >
              Try Demo Transcript
            </button>
            <button
              onClick={onUploadCall}
              className="px-8 py-4 bg-white text-black text-lg font-semibold border-2 border-black hover:bg-gray-50 transition-colors"
              data-testid="upload-call-button"
              aria-label="Upload your own call transcript"
            >
              Upload Your Call
            </button>
          </div>
          
          {/* Security Message */}
          <div 
            className="flex items-center justify-center gap-2 text-sm text-gray-500"
            data-testid="security-message"
          >
            <Shield size={16} className="text-gray-400" />
            <p>Your data is processed locally and never leaves your browser</p>
            <Lock size={16} className="text-gray-400" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section 
        className="py-24 px-8 bg-gray-50 border-t border-b border-gray-200"
        data-testid="features-section"
      >
        <div className="max-w-7xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-semibold text-center mb-16 tracking-tight"
            data-testid="features-heading"
          >
            Built for Revenue Teams
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Feature 1: Pain Points Detection */}
            <div 
              className="bg-white p-8 border border-gray-200 hover:border-black transition-colors group"
              data-testid="feature-pain-points"
            >
              <div className="mb-6">
                <Target size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Pain Points Detection</h3>
              <p className="text-gray-600 leading-relaxed">
                Automatically identify and categorize customer challenges with AI-powered analysis 
                mapped to Datadog's product suite.
              </p>
            </div>

            {/* Feature 2: Sentiment Analysis */}
            <div 
              className="bg-white p-8 border border-gray-200 hover:border-black transition-colors group"
              data-testid="feature-sentiment"
            >
              <div className="mb-6">
                <Brain size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sentiment Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Track emotional signals throughout the conversation with timestamped sentiment 
                tracking and engagement scoring.
              </p>
            </div>

            {/* Feature 3: Feature Interest Mapping */}
            <div 
              className="bg-white p-8 border border-gray-200 hover:border-black transition-colors group"
              data-testid="feature-interest-mapping"
            >
              <div className="mb-6">
                <LineChart size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Feature Interest Mapping</h3>
              <p className="text-gray-600 leading-relaxed">
                Visual heatmaps show which Datadog products resonated most, with time-spent 
                analytics for prioritization.
              </p>
            </div>

            {/* Feature 4: Smart Follow-ups */}
            <div 
              className="bg-white p-8 border border-gray-200 hover:border-black transition-colors group"
              data-testid="feature-follow-ups"
            >
              <div className="mb-6">
                <Mail size={32} className="text-black" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Smart Follow-ups</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate personalized follow-up emails with specific pain points, features discussed, 
                and next steps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section 
        className="py-24 px-8"
        data-testid="social-proof-section"
      >
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest mb-8">
            Optimized For
          </p>
          
          {/* Datadog Logo/Text */}
          <div className="flex justify-center items-center">
            <div 
              className="text-4xl md:text-5xl font-bold tracking-tight"
              data-testid="datadog-brand"
            >
              Datadog
            </div>
          </div>
          
          <p className="text-gray-600 mt-6 text-lg">
            Built specifically for sales and solution engineering teams
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section 
        className="py-24 px-8 bg-gray-50 border-t border-b border-gray-200"
        data-testid="how-it-works-section"
      >
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-3xl md:text-4xl font-semibold text-center mb-20 tracking-tight"
            data-testid="how-it-works-heading"
          >
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* Step 1 */}
            <div 
              className="text-center"
              data-testid="step-upload"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border-2 border-black flex items-center justify-center">
                  <Upload size={36} className="text-black" />
                </div>
              </div>
              <div className="text-6xl font-light text-gray-300 mb-4">01</div>
              <h3 className="text-xl font-semibold mb-4">Upload</h3>
              <p className="text-gray-600 leading-relaxed">
                Drop your call transcript or paste text directly. Supports standard .txt files 
                and plain text formats.
              </p>
            </div>

            {/* Step 2 */}
            <div 
              className="text-center"
              data-testid="step-analyze"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border-2 border-black flex items-center justify-center">
                  <Brain size={36} className="text-black" />
                </div>
              </div>
              <div className="text-6xl font-light text-gray-300 mb-4">02</div>
              <h3 className="text-xl font-semibold mb-4">Analyze</h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI engine maps conversation to Datadog's product baseline, extracting pain 
                points and engagement signals.
              </p>
            </div>

            {/* Step 3 */}
            <div 
              className="text-center"
              data-testid="step-act"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 border-2 border-black flex items-center justify-center">
                  <Target size={36} className="text-black" />
                </div>
              </div>
              <div className="text-6xl font-light text-gray-300 mb-4">03</div>
              <h3 className="text-xl font-semibold mb-4">Act</h3>
              <p className="text-gray-600 leading-relaxed">
                Review visual dashboards, export insights, and send AI-generated follow-up 
                emails in seconds.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-12 px-8 border-t border-gray-200"
        data-testid="footer"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Brand */}
            <div className="text-xl font-semibold tracking-tight">
              DemoInsight
            </div>
            
            {/* Links */}
            <div className="flex gap-8 items-center">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                data-testid="footer-github-link"
                aria-label="View on GitHub"
              >
                <Github size={20} />
                <span className="text-sm">GitHub</span>
              </a>
              
              <a
                href="#docs"
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                data-testid="footer-docs-link"
                aria-label="View documentation"
              >
                <BookOpen size={20} />
                <span className="text-sm">Docs</span>
              </a>
              
              <a
                href="#contact"
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                data-testid="footer-contact-link"
                aria-label="Contact us"
              >
                <Mail size={20} />
                <span className="text-sm">Contact</span>
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-center mt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} DemoInsight. Built with precision for sales intelligence.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
