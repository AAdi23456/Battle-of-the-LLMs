# 🥊 Summarizer Showdown

A fullstack Next.js 14 application that allows you to compare closed-source (OpenAI) and open-source (HuggingFace) AI models for text summarization in a head-to-head battle.

## ✨ Features

- **🧠 Dual Model Selection**: Choose from popular closed-source (GPT-3.5, GPT-4) and open-source models (BART, Pegasus, FLAN-T5)
- **📝 Flexible Input**: Paste text directly, upload .txt files, or use sample text
- **⚔️ Side-by-Side Comparison**: View summaries from both models simultaneously
- **⭐ Rating System**: Rate summaries on clarity, accuracy, and conciseness
- **📊 Performance Analytics**: Visual reports showing model performance over time
- **🎨 Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **📱 Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- OpenAI API key
- HuggingFace API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd summarizer-showdown
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── InputBox.tsx    # Text input component
│   ├── ModelSelector.tsx # Model selection dropdowns
│   ├── RatingPanel.tsx # Rating interface
│   ├── ReportCard.tsx  # Analytics dashboard
│   └── SummaryPanel.tsx # Results display
├── lib/                # Utility libraries
│   ├── openai.ts       # OpenAI integration
│   ├── huggingface.ts  # HuggingFace integration
│   └── utils.ts        # Common utilities
├── pages/              # Next.js pages
│   ├── api/
│   │   └── summarize.ts # API endpoint
│   └── index.tsx       # Main application page
├── styles/             # Global styles
├── types/              # TypeScript definitions
└── public/             # Static assets
```

## 🔧 API Keys Setup

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env.local` file

### HuggingFace API Key
1. Visit [HuggingFace](https://huggingface.co)
2. Sign up or log in to your account
3. Go to Settings → Access Tokens
4. Create a new token with read access
5. Copy the token to your `.env.local` file

## 🤖 Supported Models

### Closed-Source Models (OpenAI)
- **GPT-3.5 Turbo**: Fast and cost-effective
- **GPT-4**: Most capable model
- **GPT-4 Turbo**: Latest and most efficient

### Open-Source Models (HuggingFace)
- **BART Large CNN**: Facebook's summarization model
- **Pegasus XSum**: Google's extreme summarization model
- **FLAN-T5 Base**: Google's instruction-tuned model

## 🎯 How to Use

1. **Select Models**: Choose one closed-source and one open-source model
2. **Input Text**: Paste your text (500-1000 words recommended) or upload a .txt file
3. **Generate**: Click "Generate Summaries" to process both models
4. **Compare**: Review the side-by-side results
5. **Rate**: Score each summary on clarity, accuracy, and conciseness
6. **Analyze**: View performance reports and trends over time

## 🛠️ Development

### Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Tech Stack
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **AI APIs**: OpenAI + HuggingFace Inference
- **Icons**: Lucide React

## 📊 Features in Detail

### Rating System
Rate summaries on three key criteria:
- **Clarity**: How understandable is the summary?
- **Accuracy**: Does it capture the main points?
- **Conciseness**: Is it appropriately brief?

### Analytics Dashboard
- Bar charts comparing average ratings
- Pie charts showing user preferences
- Detailed performance breakdowns
- Historical tracking of model performance

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import the project
4. Add environment variables in Vercel dashboard
5. Deploy!

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Google Cloud Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenAI](https://openai.com) for their powerful language models
- [HuggingFace](https://huggingface.co) for democratizing AI
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Vercel](https://vercel.com) for hosting and deployment

## 🐛 Issues & Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include screenshots and error messages when possible

---

Built with ❤️ using Next.js 14, TypeScript, and AI