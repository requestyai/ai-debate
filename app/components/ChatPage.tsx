'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { Input, Button, Select, Row, Col } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './live-chat.css';

const anthropicModels = [
  "claude-3-5-sonnet-20241022", "claude-3-5-sonnet-latest",
  "claude-3-5-haiku-20241022", "claude-3-5-haiku-latest",
  "claude-3-opus-20240229", "claude-3-opus-latest",
  "claude-3-sonnet-20240229", "claude-3-haiku-20240307",
];

const mistralModels = [
  "mistral-large-latest",
  "mistral-small-latest",
  "codestral-latest",
  "ministral-8b-latest",
  "ministral-3b-latest",
  "pixtral-12b-2409",
  "mixtral-8x22b-latest",
  "open-mistral-nemo",
];

const togetherModels = [
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

const geminiModels = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-8b",
  "gemini-1.5-pro",
  "gemini-2.0-flash-exp",
];

const gptModels = [
  "gpt-4o",
  "gpt-4o-mini",
];

const allModels = [
  { label: 'Anthropic', options: anthropicModels.map(m => ({ label: m, value: m })) },
  { label: 'Mistral', options: mistralModels.map(m => ({ label: m, value: m })) },
  { label: 'Together', options: togetherModels.map(m => ({ label: m, value: m })) },
  { label: 'Gemini', options: geminiModels.map(m => ({ label: m, value: m })) },
  { label: 'GPT-4o', options: gptModels.map(m => ({ label: m, value: m })) },
];

interface ModelStats {
  model: string;
  inputTokens: number;
  outputTokens: number;
  ttfb: string | number;
  totalTime: string | number;
  startTime: number | null;
  firstTokenTime: number | null;
  completionTime: number | null;
}

export default function ChatPage() {
  const [input, setInput] = useState('');
  const [modelA, setModelA] = useState('gpt-4o-mini');
  const [modelB, setModelB] = useState('gemini-2.0-flash-exp');

  const [messagesA, setMessagesA] = useState<Array<{ role: string; content: string }>>([]);
  const [messagesB, setMessagesB] = useState<Array<{ role: string; content: string }>>([]);

  const [streamingMessageA, setStreamingMessageA] = useState('');
  const [streamingMessageB, setStreamingMessageB] = useState('');

  const [loading, setLoading] = useState(false);

  const [statsA, setStatsA] = useState<ModelStats>({
    model: modelA,
    inputTokens: 0,
    outputTokens: 0,
    ttfb: '--',
    totalTime: '--',
    startTime: null,
    firstTokenTime: null,
    completionTime: null,
  });

  const [statsB, setStatsB] = useState<ModelStats>({
    model: modelB,
    inputTokens: 0,
    outputTokens: 0,
    ttfb: '--',
    totalTime: '--',
    startTime: null,
    firstTokenTime: null,
    completionTime: null,
  });

  useEffect(() => {
    setStatsA((prev) => ({ ...prev, model: modelA }));
    setStatsB((prev) => ({ ...prev, model: modelB }));
  }, [modelA, modelB]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };

    const inputTokenCount = input.trim().split(/\s+/).length;

    setMessagesA((prev) => [...prev, userMessage, { role: 'assistant', content: '' }]);
    setMessagesB((prev) => [...prev, userMessage, { role: 'assistant', content: '' }]);

    setStreamingMessageA('');
    setStreamingMessageB('');

    setStatsA({
      model: modelA,
      inputTokens: inputTokenCount,
      outputTokens: 0,
      ttfb: '--',
      totalTime: '--',
      startTime: performance.now(),
      firstTokenTime: null,
      completionTime: null,
    });

    setStatsB({
      model: modelB,
      inputTokens: inputTokenCount,
      outputTokens: 0,
      ttfb: '--',
      totalTime: '--',
      startTime: performance.now(),
      firstTokenTime: null,
      completionTime: null,
    });

    setInput('');
    setLoading(true);

    const messagesForRequestA = [...messagesA, userMessage];
    const messagesForRequestB = [...messagesB, userMessage];

    const fetchModel = async (model: string, messagesForRequest: any[], setMessages: any, setStreamingMessage: any, setStats: any) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: messagesForRequest, model }),
        });

        if (!response.body) {
          throw new Error('No response body received.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let liveContent = '';
        let tokenCount = 0;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const json = JSON.parse(line.slice(5));
              if (json.content) {
                const now = performance.now();
                setStats((prev: ModelStats) => {
                  let updated = { ...prev };
                  if (!updated.firstTokenTime && updated.startTime) {
                    updated.firstTokenTime = now;
                  }
                  tokenCount = prev.outputTokens + 1;
                  updated.outputTokens = tokenCount;

                  if (updated.firstTokenTime && updated.completionTime) {
                    updated.totalTime = (updated.completionTime - updated.startTime!).toFixed(2) + ' ms';
                  }

                  if (updated.firstTokenTime && updated.startTime) {
                    updated.ttfb = (updated.firstTokenTime - updated.startTime).toFixed(2) + ' ms';
                  }

                  return updated;
                });

                liveContent += json.content;
                setStreamingMessage((prev: string) => prev + json.content);
              }
            }
          }
        }

        const end = performance.now();
        setStats((prev: ModelStats) => {
          let updated = { ...prev };
          updated.completionTime = end;
          if (updated.startTime) {
            updated.totalTime = (end - updated.startTime).toFixed(2) + ' ms';
          }
          return updated;
        });

        setMessages((prev: any) =>
          prev.map((msg: any, index: number) =>
            index === prev.length - 1 ? { ...msg, content: liveContent } : msg
          )
        );

      } catch (error) {
        console.error('Error fetching response:', error);
        setMessages((prev: any) =>
          prev.map((msg: any, index: number) =>
            index === prev.length - 1
              ? { ...msg, content: 'Error fetching response. Please try again.' }
              : msg
          )
        );
      }
    };

    await Promise.all([
      fetchModel(modelA, messagesForRequestA, setMessagesA, setStreamingMessageA, setStatsA),
      fetchModel(modelB, messagesForRequestB, setMessagesB, setStreamingMessageB, setStatsB),
    ]);

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="top-bar">
        <Select
          options={allModels}
          value={modelA}
          onChange={(val) => setModelA(val)}
          style={{ width: 300 }}
          showSearch
          placeholder="Select model A"
          className="model-select"
          optionFilterProp="children"
        />
        <Select
          options={allModels}
          value={modelB}
          onChange={(val) => setModelB(val)}
          style={{ width: 300 }}
          showSearch
          placeholder="Select model B"
          className="model-select"
          optionFilterProp="children"
        />
      </div>

      <div className="input-container">
        <Input
          className="chat-input"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSubmit}
          disabled={loading}
          style={{ color: '#000', background: '#fff' }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          className="send-button"
          onClick={handleSubmit}
          loading={loading}
        />
      </div>

      <Row gutter={20} className="comparison-row">
        <Col xs={24} md={12} className="model-col">
          <div className="stats-panel">
            <div className="stat-row"><span className="stat-label">Model:</span><span className="stat-value">{statsA.model}</span></div>
            <div className="stat-row"><span className="stat-label">Input Tokens:</span><span className="stat-value">{statsA.inputTokens}</span></div>
            <div className="stat-row"><span className="stat-label">Output Tokens:</span><span className="stat-value">{statsA.outputTokens}</span></div>
            <div className="stat-row"><span className="stat-label">TTFB:</span><span className="stat-value">{statsA.ttfb}</span></div>
            <div className="stat-row"><span className="stat-label">Total Time:</span><span className="stat-value">{statsA.totalTime}</span></div>
          </div>
          <div className="messages-container">
            {messagesA.map((msg, index) => (
              <motion.div
                key={index}
                className={`message-bubble ${msg.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {msg.role === 'assistant' && index === messagesA.length - 1 && streamingMessageA
                  ? streamingMessageA
                  : msg.content}
              </motion.div>
            ))}
          </div>
        </Col>

        <Col xs={24} md={12} className="model-col">
          <div className="stats-panel">
            <div className="stat-row"><span className="stat-label">Model:</span><span className="stat-value">{statsB.model}</span></div>
            <div className="stat-row"><span className="stat-label">Input Tokens:</span><span className="stat-value">{statsB.inputTokens}</span></div>
            <div className="stat-row"><span className="stat-label">Output Tokens:</span><span className="stat-value">{statsB.outputTokens}</span></div>
            <div className="stat-row"><span className="stat-label">TTFB:</span><span className="stat-value">{statsB.ttfb}</span></div>
            <div className="stat-row"><span className="stat-label">Total Time:</span><span className="stat-value">{statsB.totalTime}</span></div>
          </div>
          <div className="messages-container">
            {messagesB.map((msg, index) => (
              <motion.div
                key={index}
                className={`message-bubble ${msg.role}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {msg.role === 'assistant' && index === messagesB.length - 1 && streamingMessageB
                  ? streamingMessageB
                  : msg.content}
              </motion.div>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
