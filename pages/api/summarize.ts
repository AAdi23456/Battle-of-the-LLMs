import { NextApiRequest, NextApiResponse } from 'next';
import { summarizeWithOpenAI } from '@/lib/openai';
import { summarizeWithHuggingFace } from '@/lib/huggingface';
import { SummarizationRequest, SummarizationResponse } from '@/types';

// Model mapping
const closedSourceModels = {
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'gpt-4': 'gpt-4',
  'gpt-4-turbo': 'gpt-4-turbo-preview',
};

const openSourceModels = {
  'bart-large-cnn': 'facebook/bart-large-cnn',
  'pegasus-xsum': 'google/pegasus-xsum',
  'flan-t5-base': 'google/flan-t5-base',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SummarizationResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { text, closedModel, openModel }: SummarizationRequest = req.body;

    if (!text || !closedModel || !openModel) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (text.length < 50) {
      return res.status(400).json({ error: 'Text must be at least 50 characters long' });
    }

    if (text.length > 10000) {
      return res.status(400).json({ error: 'Text must be less than 10,000 characters' });
    }

    // Get the actual model IDs
    const closedModelId = closedSourceModels[closedModel as keyof typeof closedSourceModels];
    const openModelId = openSourceModels[openModel as keyof typeof openSourceModels];

    if (!closedModelId || !openModelId) {
      return res.status(400).json({ error: 'Invalid model selection' });
    }

    // Run both summarizations in parallel
    const [closedSummaryResult, openSummaryResult] = await Promise.allSettled([
      summarizeWithOpenAI(text, closedModelId),
      summarizeWithHuggingFace(text, openModelId),
    ]);

    let closedSummary = '';
    let openSummary = '';

    if (closedSummaryResult.status === 'fulfilled') {
      closedSummary = closedSummaryResult.value;
    } else {
      console.error('Closed-source summarization failed:', closedSummaryResult.reason);
      closedSummary = 'Failed to generate summary. Please check your API key and try again.';
    }

    if (openSummaryResult.status === 'fulfilled') {
      openSummary = openSummaryResult.value;
    } else {
      console.error('Open-source summarization failed:', openSummaryResult.reason);
      openSummary = 'Failed to generate summary. Please try again or select a different model.';
    }

    const response: SummarizationResponse = {
      closedSummary,
      openSummary,
      closedModel,
      openModel,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Summarization error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
} 