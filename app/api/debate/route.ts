import { NextResponse } from 'next/server';
import { client } from '../../lib/OpenAIClient';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// We have a 3-round debate (6 turns total):
// 1) Model A starts
// 2) Model B responds
// 3) Model A counters
// 4) Model B counters
// 5) Model A final
// 6) Model B final

export async function POST(req: Request) {
  const { modelA, modelB, topic } = await req.json();

  if (!modelA || !modelB || !topic) {
    return NextResponse.json({ error: 'Missing parameters.' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new TransformStream();
  const writer = stream.writable.getWriter();

  async function sendEvent(content: string, error = false, speaker?: string) {
    await writer.write(
      encoder.encode(`data: ${JSON.stringify({ content, error, speaker })}\n\n`)
    );
  }

  async function callModelAndGetFullResponse(model: string, messages: Message[]): Promise<string> {
    const response = await client.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 500,
      stream: true,
    });

    let fullContent = '';
    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta?.content;
      if (delta) {
        fullContent += delta;
      }
    }
    return fullContent.trim();
  }

  (async () => {
    try {
      let messages: Message[] = [
        {
          role: 'system',
          content: `You are two AI models debating the topic: "${topic}". Model A (${modelA}) and Model B (${modelB}). Model A goes first. Each response should be a concise, well-structured argument or counterargument.`
        }
      ];

      // Send system topic
      await sendEvent(`Topic: "${topic}"`, false, 'system');

      // 1) Model A start
      messages.push({ role: 'user', content: "Model A, your opening statement." });
      let aResponse = await callModelAndGetFullResponse(modelA, messages);
      messages.push({ role: 'assistant', content: aResponse });
      await sendEvent(aResponse, false, 'modelA');

      // 2) Model B responds
      messages.push({ role: 'user', content: "Model B, respond to Model A." });
      let bResponse = await callModelAndGetFullResponse(modelB, messages);
      messages.push({ role: 'assistant', content: bResponse });
      await sendEvent(bResponse, false, 'modelB');

      // 3) Model A counters
      messages.push({ role: 'user', content: "Model A, counter Model B's points." });
      aResponse = await callModelAndGetFullResponse(modelA, messages);
      messages.push({ role: 'assistant', content: aResponse });
      await sendEvent(aResponse, false, 'modelA');

      // 4) Model B counters
      messages.push({ role: 'user', content: "Model B, counter Model A's points." });
      bResponse = await callModelAndGetFullResponse(modelB, messages);
      messages.push({ role: 'assistant', content: bResponse });
      await sendEvent(bResponse, false, 'modelB');

      // 5) Model A final
      messages.push({ role: 'user', content: "Model A, your final remarks." });
      aResponse = await callModelAndGetFullResponse(modelA, messages);
      messages.push({ role: 'assistant', content: aResponse });
      await sendEvent(aResponse, false, 'modelA');

      // 6) Model B final
      messages.push({ role: 'user', content: "Model B, your final remarks." });
      bResponse = await callModelAndGetFullResponse(modelB, messages);
      messages.push({ role: 'assistant', content: bResponse });
      await sendEvent(bResponse, false, 'modelB');

      await sendEvent("[End of Debate]", false, 'system');
      await writer.close();
    } catch (error: any) {
      console.error('Error:', error);
      await sendEvent(error.message || 'An error occurred', true, 'system');
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
}
