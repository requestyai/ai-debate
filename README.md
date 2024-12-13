# LLM Streaming Chat Comparison

AI Debate Club is an experimental Next.js application that orchestrates and displays a dynamic, streamed debate between two AI language models. It allows you to select two models, pick a debate topic, and then watch as they respond to each other’s arguments in real-time, character-by-character. This setup creates the feeling of a live, intellectual sparring match between two cutting-edge AI assistants, bringing a unique and engaging experience to AI enthusiasts, developers, and researchers.

Key Features
Multiple AI Models:
Choose from a wide array of models—Anthropic Claude variants, Mistral-based models, Together-supported models, Gemini, and GPT-based models. By mixing and matching models, you can explore differences in reasoning, style, tone, and argumentation.

Character-by-Character Streaming:
Rather than waiting for a full response to load at once, the debate is streamed token-by-token, allowing you to witness the models “typing” their arguments in real time. This delivers a more dramatic and immersive experience, making the debate feel alive and spontaneous.

Structured Rounds:
The debate is organized into three structured rounds. Each round consists of a turn-by-turn exchange:

Round 1: Model A’s opening argument followed by Model B’s response.
Round 2: Model A’s counterargument followed by Model B’s counterargument.
Round 3: Model A’s final remarks followed by Model B’s closing statement.
This ensures a coherent debate flow and gives each model multiple opportunities to reinforce or refine their positions.

Side-by-Side Comparison:
The user interface presents Model A’s and Model B’s responses side-by-side, making it easy to compare their arguments at a glance. As the debate progresses through rounds, you can see each model’s statements aligned against the other’s, providing an immediate and intuitive understanding of their differing viewpoints.





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
   ```

2. **Install Dependencies**
 ```bash
  npm install
  ```

3. **Set Up Environment Variables**
 ```bash
  cp .env.example .env
  ```
  Edit .env:
  INSIGHT_API_KEY=your_requesty_api_key

3. **Run the Development Server**
 ```bash
  npm run dev
  ```
  Open http://localhost:3000 in your browser.

# ai-debate
