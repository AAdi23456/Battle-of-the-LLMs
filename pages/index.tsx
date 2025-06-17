import { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ModelSelector from '@/components/ModelSelector';
import InputBox from '@/components/InputBox';
import SummaryPanel from '@/components/SummaryPanel';
import RatingPanel from '@/components/RatingPanel';
import ReportCard from '@/components/ReportCard';
import { SummarizationResponse, SummaryRating, ReportData } from '@/types';
import { Zap, Loader2 } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState('');
  const [closedModel, setClosedModel] = useState('');
  const [openModel, setOpenModel] = useState('');
  const [summaries, setSummaries] = useState<SummarizationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState<SummaryRating[]>([]);

  const handleSummarize = async () => {
    if (!text.trim() || !closedModel || !openModel) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setSummaries(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          closedModel,
          openModel,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate summaries');
      }

      const result: SummarizationResponse = await response.json();
      setSummaries(result);
    } catch (error) {
      console.error('Summarization error:', error);
      alert(error instanceof Error ? error.message : 'Failed to generate summaries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingSubmit = (rating: SummaryRating) => {
    setRatings(prev => [...prev, rating]);
  };

  const calculateReportData = (): ReportData => {
    if (ratings.length === 0) {
      return {
        averageRatings: {
          closed: { clarity: 0, accuracy: 0, conciseness: 0 },
          open: { clarity: 0, accuracy: 0, conciseness: 0 },
        },
        preferenceCount: { closed: 0, open: 0 },
        totalComparisons: 0,
      };
    }

    const totals = ratings.reduce(
      (acc, rating) => ({
        closedClarity: acc.closedClarity + rating.closedRating.clarity,
        closedAccuracy: acc.closedAccuracy + rating.closedRating.accuracy,
        closedConciseness: acc.closedConciseness + rating.closedRating.conciseness,
        openClarity: acc.openClarity + rating.openRating.clarity,
        openAccuracy: acc.openAccuracy + rating.openRating.accuracy,
        openConciseness: acc.openConciseness + rating.openRating.conciseness,
        closedPreferred: acc.closedPreferred + (rating.preferredModel === 'closed' ? 1 : 0),
        openPreferred: acc.openPreferred + (rating.preferredModel === 'open' ? 1 : 0),
      }),
      {
        closedClarity: 0,
        closedAccuracy: 0,
        closedConciseness: 0,
        openClarity: 0,
        openAccuracy: 0,
        openConciseness: 0,
        closedPreferred: 0,
        openPreferred: 0,
      }
    );

    const count = ratings.length;

    return {
      averageRatings: {
        closed: {
          clarity: totals.closedClarity / count,
          accuracy: totals.closedAccuracy / count,
          conciseness: totals.closedConciseness / count,
        },
        open: {
          clarity: totals.openClarity / count,
          accuracy: totals.openAccuracy / count,
          conciseness: totals.openConciseness / count,
        },
      },
      preferenceCount: {
        closed: totals.closedPreferred,
        open: totals.openPreferred,
      },
      totalComparisons: count,
    };
  };

  const canRate = summaries && summaries.closedSummary && summaries.openSummary;

  return (
    <>
      <Head>
        <title>Summarizer Showdown - Compare AI Models</title>
        <meta name="description" content="Compare closed-source and open-source AI models for text summarization" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              🥊 Summarizer Showdown
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Compare closed-source vs open-source AI models for text summarization
            </p>
            <Card className="inline-block">
              <CardContent className="p-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Closed-Source (OpenAI)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Open-Source (HuggingFace)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            {/* Model Selection */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Select Models</h2>
              <ModelSelector
                closedModel={closedModel}
                openModel={openModel}
                onClosedModelChange={setClosedModel}
                onOpenModelChange={setOpenModel}
              />
            </section>

            <Separator />

            {/* Input Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Input Text</h2>
              <InputBox text={text} onTextChange={setText} />
            </section>

            <Separator />

            {/* Generate Button */}
            <section className="text-center">
              <Button
                onClick={handleSummarize}
                disabled={!text.trim() || !closedModel || !openModel || isLoading}
                size="lg"
                className="text-lg px-8 py-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Summaries...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Summaries
                  </>
                )}
              </Button>
            </section>

            <Separator />

            {/* Results Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Compare Results</h2>
              <SummaryPanel
                closedSummary={summaries?.closedSummary || ''}
                openSummary={summaries?.openSummary || ''}
                closedModel={summaries?.closedModel || closedModel}
                openModel={summaries?.openModel || openModel}
                isLoading={isLoading}
              />
            </section>

            <Separator />

            {/* Rating Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Rate & Compare</h2>
              <RatingPanel
                onRatingSubmit={handleRatingSubmit}
                closedModel={summaries?.closedModel || closedModel}
                openModel={summaries?.openModel || openModel}
                disabled={!canRate}
              />
            </section>

            <Separator />

            {/* Report Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Performance Report</h2>
              <ReportCard data={calculateReportData()} />
            </section>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t text-center text-muted-foreground">
            <p>Built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui</p>
          </footer>
        </div>
      </div>
    </>
  );
} 