import React, { useState } from 'react';
import { 
  Flame, 
  Layers, 
  BookOpen, 
  Copy, 
  Check, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Calendar,
  Send,
  ExternalLink
} from 'lucide-react';
import { Prompt, Blog, Category } from '../../types';
import { AdBanner } from '../common/AdBanner';
import { useToast } from '../../context/ToastContext';
import { useDataStore } from '../../hooks/useDataStore';

interface SidebarProps {
  categories: Category[];
  popularPrompts: Prompt[];
  latestBlogs: Blog[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  onViewPrompt: (prompt: Prompt) => void;
  onViewBlog: (blog: Blog) => void;
  onNavigateToTools?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  categories,
  popularPrompts,
  latestBlogs,
  selectedCategory,
  onSelectCategory,
  onViewPrompt,
  onViewBlog,
  onNavigateToTools,
}) => {
  const { showToast } = useToast();
  const { dataStore } = useDataStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleCopyPrompt = (e: React.MouseEvent, prompt: Prompt) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopiedId(prompt.id);
    dataStore.incrementCopies(prompt.id);
    showToast(`"${prompt.title.slice(0, 25)}..." কপি হয়েছে!`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    const res = dataStore.subscribeEmail(newsletterEmail);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) setNewsletterEmail('');
  };

  return (
    <aside className="w-full space-y-6">
      
      {/* 1. Sidebar Advertisement Widget (Collapses cleanly if empty) */}
      <AdBanner position="sidebar" />

      {/* 2. Trending Categories Widget */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#0E0E12] p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#FF1E2D]" />
            <span>Trending Categories</span>
          </h4>
          <span className="text-[11px] text-zinc-500 font-medium">All Tags</span>
        </div>

        <div className="mt-3 space-y-1">
          {categories.slice(0, 7).map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#E50914] text-white font-bold'
                    : 'text-zinc-300 hover:bg-[#15151C] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: isSelected ? '#FFFFFF' : cat.color || '#FF1E2D' }} 
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                  isSelected ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Popular Prompts Widget */}
      <div className="rounded-2xl border border-zinc-800/80 bg-[#0E0E12] p-5 shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FF1E2D]" />
            <span>Popular Prompts</span>
          </h4>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/80 text-[#FF1E2D] font-bold">
            TOP COPIED
          </span>
        </div>

        <div className="mt-3.5 space-y-3">
          {popularPrompts.slice(0, 4).map((p, idx) => (
            <div
              key={p.id}
              onClick={() => onViewPrompt(p)}
              className="p-3 rounded-xl border border-zinc-800/60 bg-[#121216] hover:bg-[#171720] hover:border-red-500/30 transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-zinc-400">
                  #{idx + 1}
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#1C1C24] text-zinc-300">
                  {p.aiModel}
                </span>
              </div>

              <h5 className="text-xs font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-2 mt-1.5 leading-snug">
                {p.title}
              </h5>

              <div className="mt-2.5 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[10px] text-zinc-400">
                <span>{p.copiesCount || 0} copies</span>
                <button
                  onClick={(e) => handleCopyPrompt(e, p)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold transition-all ${
                    copiedId === p.id
                      ? 'bg-emerald-500 text-black'
                      : 'bg-[#E50914] text-white hover:bg-[#FF1E2D]'
                  }`}
                >
                  {copiedId === p.id ? (
                    <>
                      <Check className="w-2.5 h-2.5" /> Done
                    </>
                  ) : (
                    <>
                      <Copy className="w-2.5 h-2.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Latest Blogs / Tutorials Widget */}
      {latestBlogs.length > 0 && (
        <div className="rounded-2xl border border-zinc-800/80 bg-[#0E0E12] p-5 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Latest Guides & Blogs</span>
            </h4>
          </div>

          <div className="mt-3.5 space-y-3">
            {latestBlogs.slice(0, 3).map((b) => (
              <div
                key={b.id}
                onClick={() => onViewBlog(b)}
                className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#14141A] transition-colors cursor-pointer group"
              >
                <img
                  src={b.featuredImage}
                  alt={b.title}
                  className="w-14 h-14 rounded-lg object-cover border border-zinc-800 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-semibold text-zinc-200 group-hover:text-[#FF1E2D] transition-colors line-clamp-2 leading-snug">
                    {b.title}
                  </h5>
                  <p className="text-[10px] text-zinc-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-2.5 h-2.5" /> {b.publishDate} • {b.readTimeMinutes} min
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PromptView Community & Tool Hub Banner */}
      <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-[#1C080A] via-[#121216] to-[#0E0E12] p-5 shadow-xl text-center space-y-3">
        <div className="w-10 h-10 mx-auto rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 flex items-center justify-center text-[#FF1E2D]">
          <Sparkles className="w-5 h-5" />
        </div>
        <h4 className="text-sm font-bold text-white">AI Image Toolkit</h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Explore curated AI image, video, and design tools like Midjourney, Flux.1, and Magnific.
        </p>
        {onNavigateToTools && (
          <button
            onClick={onNavigateToTools}
            className="w-full py-2 px-4 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-bold transition-all shadow-md shadow-red-950/60 flex items-center justify-center gap-1"
          >
            Explore Toolkit <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </aside>
  );
};
