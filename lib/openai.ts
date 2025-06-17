import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeWithOpenAI(text: string, model: string): Promise<string> {
  try {
    const prompt = `Please provide a concise summary of the following text. Focus on the main points and key information:\n\n${text}`;
    
    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates clear, concise summaries while preserving the most important information."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 250,
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || 'Failed to generate summary';
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate summary with OpenAI');
  }
} 