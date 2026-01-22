# DemoInsight

DemoInsight is a powerful transcript analysis tool that leverages Google's Gemini AI to extract meaningful insights from sales and support conversations.

## Features

- **Smart Analysis**: Automatically analyzes conversation transcripts to identify pain points, customer sentiment, and feature interests.
- **Visual Dashboard**: Presents insights through an interactive dashboard with sentiment timelines, feature heatmaps, and key metrics.
- **Flexible Input**: Support for analyzing text files (`.txt`) via drag-and-drop or direct text pasting.
- **Datadog Product Alignment**: specialized (via the default prompt) to map conversations against a Datadog product knowledge base (can be customized in services).

## Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **AI**: Google GenAI SDK (Gemini Models)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Google Cloud Project with the Gemini API enabled and an API Key.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davdidonato/demoinsight.git
   cd demoinsight
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   *Note: The application is configured to map `GEMINI_API_KEY` to `process.env.API_KEY` internally.*

4. **Run the Application**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port shown in your terminal).

## Usage

1. **Landing Page**: Choose to upload a transcript file or paste text directly.
2. **Analysis**: Click "Analyze". The app will send the text to Gemini.
3. **Dashboard**: View the generated report, including:
    - Satisfaction & Engagement Scores.
    - Conversation Timeline.
    - Identified Pain Points.
    - Feature Interest Heatmap.
    - Suggested Email Follow-up.

## License

[MIT](LICENSE)
