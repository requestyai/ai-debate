import OpenAI from 'openai';

const INSIGHT_API_KEY = process.env.INSIGHT_API_KEY || '';

if (!INSIGHT_API_KEY) {
  console.warn('No INSIGHT_API_KEY provided in environment variables!');
}

export const client = new OpenAI({
  apiKey: INSIGHT_API_KEY,
  baseURL: "https://router.requesty.ai/v1",
});
