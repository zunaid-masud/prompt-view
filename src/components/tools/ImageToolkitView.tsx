import React, { useState, useMemo } from 'react';
import { 
  Image as ImageIcon, 
  Sparkles, 
  ExternalLink, 
  Search, 
  Star, 
  Tag, 
  Layers, 
  ArrowUpRight,
  Filter,
  Wrench,
  Flame
} from 'lucide-react';
import { AITool } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';

interface ImageToolkitViewProps {
  onBackToHome: () => void;
}

export const ImageToolkitView: React.FC<ImageToolkitViewProps> = ({ onBackToHome }) => {
  const { tools } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Text to Image', 'Image Upscaler', 'AI Video', 'Graphic Design', 'Realtime AI', 'Image Editing'];

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      const matchCat = selectedCategory === 'all' || t.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchQuery =
        !searchQuery ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchQuery;
    });
  }, [tools, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Header */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-[#1A080A] via-[#0E0E14] to-[#1A080A] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E50914]/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold">
            <Wrench className="w-3.5 h-3.5" />
            <span>CURATED AI TOOLKIT & DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Image & Creative <span className="text-[#FF1E2D]">Toolkit</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Discover the most powerful AI image generators, neural upscalers, video engines, and graphic design platforms verified by PromptView creators.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E0E12] border border-zinc-800">
        
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#E50914] text-white shadow-md shadow-red-950'
                  : 'bg-[#14141A] text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat === 'all' ? 'All Tools' : cat}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search AI tools..."
            className="w-full bg-[#14141A] border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
          />
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#121216] to-[#0A0A0C] p-5 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300"
          >
            <div>
              {/* Header: Icon + Badges */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <img
                  src={tool.iconUrl}
                  alt={tool.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-zinc-700 shadow-md group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />

                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    tool.pricingType === 'Free'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      : tool.pricingType === 'Freemium'
                      ? 'bg-blue-950 text-blue-400 border border-blue-800/50'
                      : tool.pricingType === 'Open Source'
                      ? 'bg-purple-950 text-purple-400 border border-purple-800/50'
                      : 'bg-amber-950 text-amber-400 border border-amber-800/50'
                  }`}>
                    {tool.pricingType}
                  </span>

                  {tool.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#E50914] text-white flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5" /> {tool.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Category */}
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-[#FF1E2D]">
                  {tool.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-1">
                  {tool.name}
                </h3>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                {tool.shortDescription}
              </p>

              {/* Tags */}
              {tool.tags && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {tool.tags.slice(0, 2).map((t, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="mt-5 pt-3.5 border-t border-zinc-800/60 flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{tool.rating.toFixed(1)}</span>
              </div>

              <a
                href={tool.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all shadow-md shadow-red-950/60"
              >
                <span>Open Tool</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-zinc-800 bg-[#0E0E12] text-zinc-500">
          <Wrench className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
          <p className="text-base text-zinc-300 font-semibold">No AI tools match your filter</p>
          <p className="text-xs mt-1 text-zinc-500">Try changing category or clearing your search keywords.</p>
        </div>
      )}

    </div>
  );
};
