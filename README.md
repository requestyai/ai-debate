# LLM Streaming Chat Comparison

This Next.js project lets you compare responses from two different LLM models side-by-side, using the **Requesty Router**. It streams responses in real-time, allowing you to watch the output as it’s generated. Additionally, it provides detailed statistics such as token usage, time-to-first-byte (TTFB), and total response time.

---

## Why Use the Requesty Router?

[Requesty Router](https://app.requesty.ai/) is a universal interface for multiple LLM providers. By integrating it, you can easily switch between different models (e.g., OpenAI, Anthropic, Mistral) while benefiting from:

- **Analytics & Logging**: Gain insights into request latency, usage patterns, and cost.
- **Security & Compliance**: Built-in checks to ensure content meets your domain requirements.
- **Advanced Features**: Use function calling, tool invocation, and streaming with no extra fuss.
- **Easy Integration**: Just change the `base_url` and provide your Requesty API key.

---

## Features

- **Model Comparison**: Quickly compare two models side-by-side.
- **Live Streaming**: View responses token-by-token as they arrive.
- **Detailed Metrics**: Monitor TTFB, total response time, and token usage.
- **Broad Model Support**: Leverage multiple LLM providers through the Requesty Router.

---

## Requirements

- **Node.js**: Version 16 or higher.
- **Requesty API Key**: Sign up at [Requesty](https://app.requesty.ai/sign-up) and create an API key at [Requesty Insight](https://app.requesty.ai/insight-api).

---

## Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/my-openai-streaming-chat.git
   cd my-openai-streaming-chat

2. **Install Dependencies**
  npm install

3. **Set Up Environment Variables**
  cp .env.example .env
  Edit .env:
  INSIGHT_API_KEY=your_requesty_api_key

3. **Run the Development Server**
  npm run dev
  Open http://localhost:3000 in your browser.

