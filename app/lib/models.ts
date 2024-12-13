export const anthropicModels = [
  "claude-3-5-sonnet-20241022", "claude-3-5-sonnet-latest",
  "claude-3-5-haiku-20241022", "claude-3-5-haiku-latest",
  "claude-3-opus-20240229", "claude-3-opus-latest",
  "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
];

export const mistralModels = [
  "mistral-large-latest",
  "mistral-small-latest",
  "codestral-latest",
  "ministral-8b-latest",
  "ministral-3b-latest",
  "pixtral-12b-2409",
  "mixtral-8x22b-latest",
  "open-mistral-nemo",
];

export const togetherModels = [
  "meta-llama/7B",
  "mistralai/llama-7b",
  "Qwen/llama-7b",
  "google/flan-t5-xl",
  "deepseek-ai/llama-7b",
  "Gryphe/llama-7b",
  "NousResearch/llama-7b",
  "upstage/llama-7b",
  "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3-8B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3-70B-Instruct-Turbo",
  "meta-llama/Llama-3.2-3B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3-8B-Instruct-Lite",
  "meta-llama/Meta-Llama-3-70B-Instruct-Lite",
  "meta-llama/Llama-3-8b-chat-hf",
  "meta-llama/Llama-3-70b-chat-hf",
  "meta-llama/Llama-2-13b-chat-hf",
  "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
  "Qwen/Qwen2.5-Coder-32B-Instruct",
  "Qwen/QwQ-32B-Preview",
  "Qwen/Qwen2.5-7B-Instruct-Turbo",
  "Qwen/Qwen2.5-72B-Instruct-Turbo",
  "Qwen/Qwen2-72B-Instruct",
  "microsoft/WizardLM-2-8x22B",
  "google/gemma-2-27b-it",
  "google/gemma-2-9b-it",
  "google/gemma-2b-it",
  "databricks/dbrx-instruct",
  "deepseek-ai/deepseek-llm-67b-chat",
  "Gryphe/MythoMax-L2-13b",
  "mistralai/Mistral-7B-Instruct-v0.1",
  "mistralai/Mistral-7B-Instruct-v0.2",
  "mistralai/Mistral-7B-Instruct-v0.3",
  "mistralai/Mixtral-8x7B-Instruct-v0.1",
  "mistralai/Mixtral-8x22B-Instruct-v0.1",
  "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
  "upstage/SOLAR-10.7B-Instruct-v1.0",
];

export const geminiModels = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
  "gemini-2.0-flash-exp",
];

export const gptModels = [
  "gpt-4o",
  "gpt-4o-mini",
];

export const allModels = [
  ...anthropicModels,
  ...mistralModels,
  ...togetherModels,
  ...geminiModels,
  ...gptModels
];
