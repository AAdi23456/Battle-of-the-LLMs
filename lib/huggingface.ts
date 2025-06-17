import { HfInference } from '@huggingface/inference';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export async function summarizeWithHuggingFace(text: string, model: string): Promise<string> {
  try {
    // For models that need specific input formatting
    const maxInputLength = 1024; // Most models have token limits
    const truncatedText = text.length > maxInputLength ? text.substring(0, maxInputLength) : text;
    
    const response = await hf.summarization({
      model: model,
      inputs: truncatedText,
      parameters: {
        max_length: 150,
        min_length: 30,
        do_sample: false,
      }
    });

    if (Array.isArray(response)) {
      return response[0]?.summary_text || 'Failed to generate summary';
    }
    
    return (response as any)?.summary_text || 'Failed to generate summary';
  } catch (error) {
    console.error('HuggingFace API error:', error);
    
    // Fallback for models that might not support summarization directly
    try {
      const fallbackResponse = await hf.textGeneration({
        model: model,
        inputs: `Summarize the following text in 2-3 sentences:\n\n${text.substring(0, 512)}`,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.3,
          return_full_text: false,
        }
      });
      
      return fallbackResponse.generated_text || 'Failed to generate summary';
    } catch (fallbackError) {
      console.error('HuggingFace fallback error:', fallbackError);
      throw new Error('Failed to generate summary with HuggingFace');
    }
  }
} 