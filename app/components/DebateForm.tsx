"use client";

import { useState, useRef, useEffect } from 'react';
import { allModels } from '../lib/models';

interface DebateMessage {
  speaker: 'modelA' | 'modelB' | 'system' | undefined;
  content: string;
}

export default function DebateForm() {
  const [modelA, setModelA] = useState(allModels[0]);
  const [modelB, setModelB] = useState(allModels[1]);
  const [topic, setTopic] = useState('');
  const [debateMessages, setDebateMessages] = useState<DebateMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debateContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debateContainerRef.current) {
      debateContainerRef.current.scrollTop = debateContainerRef.current.scrollHeight;
    }
  }, [debateMessages]);

  async function startDebate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDebateMessages([]);
    setIsLoading(true);

    const response = await fetch('/api/debate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modelA, modelB, topic })
    });

    if (!response.ok) {
      setIsLoading(false);
      setDebateMessages([{ speaker: 'system', content: 'Error starting debate.' }]);
      return;
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (reader) {
      let done = false;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        const lines = chunkValue.split('\n');

        for (let line of lines) {
          line = line.trim();
          if (!line.startsWith('data: ')) continue;
          try {
            const json = JSON.parse(line.replace('data: ', ''));
            if (json.error) {
              setDebateMessages(prev => [...prev, { speaker: 'system', content: `[Error]: ${json.content}` }]);
            } else if (json.content) {
              setDebateMessages(prev => [...prev, { speaker: json.speaker, content: json.content }]);
            }
          } catch (err) {
            // ignore parse errors
          }
        }
      }
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="sidebar">
        <h2>Setup the Debate</h2>
        <form onSubmit={startDebate}>
          <div className="form-row">
            <label>Model A:</label>
            <select value={modelA} onChange={(e) => setModelA(e.target.value)}>
              {allModels.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Model B:</label>
            <select value={modelB} onChange={(e) => setModelB(e.target.value)}>
              {allModels.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label>Debate Topic:</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Should AI be regulated?"
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? <>Now Debating… <span className="loading-spinner" /></> : 'Start Debate'}
          </button>
        </form>
        <hr/>
        <p style={{fontSize: '0.9em', color: '#555'}}>
          Choose two models and a topic. Click "Start Debate" to watch them argue!
        </p>
      </div>

      <div className="debate-area">
        <div className="debate-header">Debate Transcript</div>
        <div className="debate-container" ref={debateContainerRef}>
          {debateMessages.map((msg, index) => (
            <div key={index} className={`message ${msg.speaker}`}>
              {msg.speaker !== 'system' && msg.speaker && (
                <div className="speaker-label">
                  {msg.speaker === 'modelA' ? `Model A (${modelA})` :
                   msg.speaker === 'modelB' ? `Model B (${modelB})` : 'System'}
                </div>
              )}
              {msg.content}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
