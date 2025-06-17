export interface ClosedSourceModel {
  id: string;
  name: string;
  provider: 'openai' | 'anthropic';
}

export interface OpenSourceModel {
  id: string;
  name: string;
  huggingface_id: string;
}

export interface SummarizationRequest {
  text: string;
  closedModel: string;
  openModel: string;
}

export interface SummarizationResponse {
  closedSummary: string;
  openSummary: string;
  closedModel: string;
  openModel: string;
}

export interface Rating {
  clarity: number;
  accuracy: number;
  conciseness: number;
}

export interface SummaryRating {
  closedRating: Rating;
  openRating: Rating;
  preferredModel: 'closed' | 'open';
}

export interface ReportData {
  averageRatings: {
    closed: Rating;
    open: Rating;
  };
  preferenceCount: {
    closed: number;
    open: number;
  };
  totalComparisons: number;
} 