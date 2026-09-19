import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Terminal, 
  Layers, 
  Flame, 
  ArrowRight, 
  Filter, 
  Bot, 
  Image as ImageIcon, 
  Code, 
  Check
} from 'lucide-react';
import { Category } from '../../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  categories: Category[];
  selectedModel: string;
  onSelectModel: (model: string) => void;
  onOpenTestLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  categories,
  selectedModel,
  onSelectModel,
  onOpenTestLab,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const popularModels = [
    { label: 'All Models', value: 'all' },
    { label: 'ChatGPT-4o', value: 'ChatGPT' },
    { label: 'Midjourney v6', value: 'Midjourney' },
    { label: 'Google Gemini', value: 'Google Gemini' },
    { label: 'Claude 3.5', value: 'Claude' },
    { label: 'AI Coding', value: 'AI Coding' },
  ];

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-b from-[#160608] via-[#0E0E12] to-[#070709] p-6 sm:p-10 lg:p-14 mb-8 shadow-2xl">
      
      {/* Background Red Ambient Glows & Particles */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#E50914]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-[#FF1E2D]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-red-900/10 blur-2xl" />

      {/* Decorative Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        
        {/* Top Mini Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F0A0C] border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold shadow-md shadow-red-950/40">
          <Sparkles className="w-3.5 h-3.5 text-[#FF1E2D] animate-pulse" />
          <span>#১ AI প্রম্পট ও টুলস প্ল্যাটফর্ম</span>
          <span className="w-1 h-1 rounded-full bg-[#FF1E2D]" />
          <span className="text-zinc-400 font-normal">Bangladesh & Worldwide</span>
        </div>

        {/* Bengali Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
          এক ক্লিকেই সেরা{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E2D] via-[#E50914] to-[#FF6B6B] red-glow-text">
            AI Prompt
          </span>{' '}
          খুঁজে নিন
        </h1>

        {/* Subheading */}
        <p className="text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal">
          সেরা AI Prompt, AI Tools, Templates এবং Resources এক জায়গায়। ChatGPT, Gemini, Midjourney ও Claude এর জন্য রেডি-মেড প্রম্পট লাইব্রেরি।
        </p>

        {/* Interactive Search Container */}
        <div className="pt-2 max-w-2xl mx-auto">
          <div 
            className={`relative flex flex-col sm:flex-row items-center gap-2 p-2 rounded-2xl bg-[#121216] border transition-all duration-300 ${
              isFocused 
                ? 'border-[#E50914] red-glow shadow-2xl' 
                : 'border-white/[0.12] hover:border-red-500/40'
            }`}
          >
            {/* Category Dropdown */}
            <div className="w-full sm:w-auto shrink-0 flex items-center border-b sm:border-b-0 sm:border-r border-zinc-800 px-3 py-2">
              <Layers className="w-4 h-4 text-zinc-400 mr-2 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-medium text-zinc-200 focus:outline-none cursor-pointer w-full sm:w-36"
              >
                <option value="all" className="bg-[#121216] text-white">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#121216] text-white">
                    {c.name} ({c.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Main Search Input */}
            <div className="flex items-center gap-2 w-full px-2 py-1">
              <Search className="w-4 h-4 text-[#FF1E2D] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="প্রম্পট বা কিওয়ার্ড খুঁজুন (যেমন: Cyberpunk, SEO, Coding)..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-zinc-400 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Submit / Test Lab Action */}
            <button
              onClick={onOpenTestLab}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white font-bold text-xs sm:text-sm transition-all duration-200 shrink-0 flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/60"
            >
              <span>Test Lab</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Model Filter Pills */}
          <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-semibold text-zinc-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter by:
            </span>
            {popularModels.map((m) => (
              <button
                key={m.value}
                onClick={() => onSelectModel(m.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedModel === m.value
                    ? 'bg-[#E50914] text-white font-bold shadow-md shadow-red-950'
                    : 'bg-[#14141A] text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
