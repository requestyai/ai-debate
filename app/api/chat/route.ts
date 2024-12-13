import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const INSIGHT_API_KEY = process.env.INSIGHT_API_KEY || '';

// Make sure the user sets their INSIGHT_API_KEY in the .env file
if (!INSIGHT_API_KEY) {
  console.warn('No INSIGHT_API_KEY provided in environment variables!');
}

const client = new OpenAI({
  apiKey: INSIGHT_API_KEY,
  baseURL: "https://router.requesty.ai/v1",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, model } = body;

    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    (async () => {
      try {
        for await (const chunk of response) {
          if (chunk.choices[0]?.delta?.content) {
            await writer.write(
              encoder.encode(`data: ${JSON.stringify({ content: chunk.choices[0].delta.content })}\n\n`)
            );
          }
        }
      } catch (error) {
        console.error('Stream error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        await writer.write(
          encoder.encode(`data: ${JSON.stringify({ error: true, content: errorMessage })}\n\n`)
        );
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
