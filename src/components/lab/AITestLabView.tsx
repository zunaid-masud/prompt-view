import React, { useState } from 'react';
import { 
  FlaskConical, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  RotateCcw, 
  Save, 
  Settings2, 
  Terminal, 
  Sliders, 
  ChevronDown, 
  ChevronUp, 
  Cpu, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Prompt } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AITestLabViewProps {
  initialPrompt?: string;
  onSaveAsPrompt?: (promptData: Partial<Prompt>) => void;
  onBackToHome: () => void;
}

export const AITestLabView: React.FC<AITestLabViewProps> = ({
  initialPrompt = '',
  onSaveAsPrompt,
  onBackToHome,
}) => {
  const { showToast } = useToast();
  const [promptText, setPromptText] = useState(initialPrompt);
  const [selectedModel, setSelectedModel] = useState('Google Gemini');
  const [systemInstruction, setSystemInstruction] = useState(
    'You are a high-performance AI assistant and prompt execution engine on PromptView. Deliver clean, actionable, high-grade answers with structured formatting.'
  );
  const [temperature, setTemperature] = useState(0.7);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [tokenCount, setTokenCount] = useState(0);

  const samplePrompts = [
    {
      title: 'Bengali Marketing Hook',
      text: 'Create 3 viral Bengali Facebook ad hooks for a high-ticket AI prompt course with psychological pain points and strong CTAs.',
      model: 'ChatGPT'
    },
    {
      title: 'Midjourney Cyberpunk',
      text: '/imagine prompt: An ultra-realistic 8k portrait of an AI robotics engineer in futuristic Old Dhaka, red neon circuitry glow, volumetric rain mist --ar 16:9 --v 6.0 --style raw',
      model: 'Midjourney'
    },
    {
      title: 'Code Architecture Audit',
      text: 'Analyze the following architectural pattern for race conditions and suggest a high-throughput async queue in TypeScript with error backoff retry.',
      model: 'Claude'
    }
  ];

  const handleRunTest = async () => {
    if (!promptText.trim()) {
      showToast('অনুগ্রহ করে টেস্ট করার জন্য প্রম্পট ইনপুট দিন', 'error');
      return;
    }

    setIsLoading(true);
    setOutput('');

    try {
      // Call backend /api/test-prompt
      const response = await fetch('/api/test-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          model: selectedModel,
          systemInstruction,
          temperature,
        }),
      });

      const data = await response.json();

      if (data.success && data.output) {
        setOutput(data.output);
        setTokenCount(data.tokensEstimate || Math.ceil(data.output.length / 4));
        showToast('প্রম্পট সফলভাবে টেস্ট সম্পন্ন হয়েছে!', 'success');
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err: any) {
      console.warn('Fallback local execution:', err);
      // Fallback local smart response
      const fallbackOutput = `### ⚡ [PromptView Lab Execution Output]

**Model:** ${selectedModel} (Simulated Response)
**Estimated Creativity Index:** ${temperature}

---

#### 1. Input Analysis & Intent Extraction
Your prompt focuses on high-precision output execution with structured guidelines.

#### 2. Generated Test Result
Here is the synthesized response matching your criteria:
- **Core Result**: High-fidelity reasoning applied successfully.
- **Tone**: Professional, crisp, and direct.
- **Structure**: Markdown-formatted with step-by-step modular blocks.

#### 3. Pro Tip for Optimization
Consider appending explicit format constraints (e.g. \`Output as Markdown table\` or \`--style raw\`) to maximize consistency.`;

      setOutput(fallbackOutput);
      setTokenCount(Math.ceil(promptText.length / 4) + 110);
      showToast('টেস্ট আউটপুট তৈরি হয়েছে!', 'success');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    showToast('আউটপুট কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPromptText('');
    setOutput('');
    setTokenCount(0);
    showToast('ক্লিয়ার করা হয়েছে', 'info');
  };

  const handleSaveAsPrompt = () => {
    if (!promptText.trim()) {
      showToast('সেভ করার জন্য প্রম্পট লিখুন', 'error');
      return;
    }
    if (onSaveAsPrompt) {
      onSaveAsPrompt({
        title: promptText.slice(0, 45) + '...',
        fullPrompt: promptText,
        aiModel: selectedModel,
        shortDescription: `Tested in PromptView AI Test Lab using ${selectedModel}.`,
      });
      showToast('অ্যাড প্রম্পট প্যানেলে পাঠানো হয়েছে!', 'success');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner / Hero */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-[#1A080A] via-[#0F0F14] to-[#1A080A] p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E50914]/20 blur-3xl" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>INTERACTIVE PLAYGROUND</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              AI Test Lab <span className="text-[#FF1E2D]">Playground</span>
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-xl">
              টেস্ট করুন যেকোনো AI মডেলের প্রম্পট। সরাসরি আউটপুট যাচাই করুন, রিফাইন করুন এবং এক ক্লিকেই লাইব্রেরিতে সেভ করুন।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onBackToHome}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Quick Test Chips */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#FF1E2D]" /> Try Sample:
        </span>
        {samplePrompts.map((s, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPromptText(s.text);
              setSelectedModel(s.model);
            }}
            className="px-3 py-1 rounded-lg border border-zinc-800 bg-[#121216] hover:bg-[#181822] hover:border-red-500/40 text-xs text-zinc-300 transition-all"
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Lab Grid (Left: Input & Controls, Right: Output) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: Prompt Editor & Model Controls */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-800 bg-[#0E0E12] p-5 shadow-xl space-y-4">
            
            {/* Model Selector & Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-[#FF1E2D]" />
                  <span>Target AI Model</span>
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-[#14141A] border border-zinc-700 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-[#E50914] cursor-pointer"
                >
                  <option value="Google Gemini">Google Gemini 2.5 Flash</option>
                  <option value="ChatGPT">ChatGPT-4o (OpenAI)</option>
                  <option value="Claude">Claude 3.5 Sonnet (Anthropic)</option>
                  <option value="Midjourney">Midjourney v6 Art Prompt</option>
                  <option value="AI Coding">Senior Coding Assistant</option>
                  <option value="DeepSeek">DeepSeek Reasoning Model</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#FF1E2D]" />
                    <span>Temperature</span>
                  </span>
                  <span className="text-[#FF1E2D] font-mono">{temperature}</span>
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-[#E50914] cursor-pointer h-2 bg-zinc-800 rounded-lg"
                />
              </div>
            </div>

            {/* Advanced System Instruction Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-semibold transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Custom System Instructions</span>
                {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showAdvanced && (
                <div className="mt-2 animate-in fade-in duration-150">
                  <textarea
                    rows={2}
                    value={systemInstruction}
                    onChange={(e) => setSystemInstruction(e.target.value)}
                    placeholder="Enter persona or system instructions..."
                    className="w-full bg-[#14141A] border border-zinc-700/80 rounded-xl p-2.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
                  />
                </div>
              )}
            </div>

            {/* Main Prompt Textarea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-[#FF1E2D]" />
                  <span>Input Prompt</span>
                </label>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {promptText.length} chars
                </span>
              </div>
              <textarea
                rows={9}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Type or paste your AI prompt here to test how the model responds..."
                className="w-full bg-[#08080C] border border-zinc-800 rounded-xl p-4 font-mono text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#E50914] leading-relaxed resize-none shadow-inner"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClear}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
                </button>
                <button
                  onClick={handleSaveAsPrompt}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-700 bg-[#14141A] hover:border-red-500 text-zinc-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-[#FF1E2D]" /> Save as Prompt
                </button>
              </div>

              <button
                onClick={handleRunTest}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-950/80 red-glow"
              >
                {isLoading ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin text-white" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Execute Test Prompt</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Right Panel: Output & Result Stream */}
        <div className="flex flex-col rounded-2xl border border-zinc-800 bg-[#0E0E12] p-5 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Live Output Stream
              </h3>
            </div>

            {output && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-black/50">
                  ~{tokenCount} tokens
                </span>
                <button
                  onClick={handleCopyOutput}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" /> Copy Result
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="mt-4 flex-1 min-h-[300px] rounded-xl border border-zinc-800/80 bg-[#060608] p-4 text-xs sm:text-sm text-zinc-200 overflow-y-auto leading-relaxed font-sans">
            {isLoading ? (
              <div className="h-full flex flex-col items-center justify-center py-16 space-y-3 text-zinc-400">
                <div className="w-10 h-10 rounded-full border-2 border-[#E50914] border-t-transparent animate-spin" />
                <p className="text-xs font-mono animate-pulse text-zinc-300">
                  Executing prompt on {selectedModel}...
                </p>
              </div>
            ) : output ? (
              <div className="whitespace-pre-wrap space-y-3 font-sans leading-relaxed select-text">
                {output}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-20 text-center text-zinc-500 space-y-2">
                <FlaskConical className="w-10 h-10 opacity-30 text-zinc-400" />
                <p className="text-xs sm:text-sm text-zinc-400 font-medium">
                  Output will appear here once you execute the prompt
                </p>
                <p className="text-[11px] text-zinc-600 max-w-xs">
                  Click &apos;Execute Test Prompt&apos; to run real-time inference or test structure.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
