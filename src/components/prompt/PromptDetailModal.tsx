import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  Share2, 
  Sparkles, 
  FlaskConical, 
  Calendar, 
  Eye, 
  Layers, 
  Tag, 
  Terminal, 
  ExternalLink,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Prompt } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';

interface PromptDetailModalProps {
  prompt: Prompt | null;
  onClose: () => void;
  onShare: (prompt: Prompt) => void;
  onTestInLab: (prompt: Prompt) => void;
  onSelectRelatedPrompt: (prompt: Prompt) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const PromptDetailModal: React.FC<PromptDetailModalProps> = ({
  prompt,
  onClose,
  onShare,
  onTestInLab,
  onSelectRelatedPrompt,
  onSelectCategory,
}) => {
  const { prompts, favorites, dataStore } = useDataStore();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!prompt) return null;

  const isFavorite = favorites.includes(prompt.id);

  // Increment views on modal open
  React.useEffect(() => {
    if (prompt) {
      dataStore.incrementViews(prompt.id);
    }
  }, [prompt?.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    dataStore.incrementCopies(prompt.id);
    showToast('সম্পূর্ণ প্রম্পট সফলভাবে কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleFavorite = () => {
    const fav = dataStore.toggleFavorite(prompt.id);
    showToast(
      fav ? 'পছন্দের তালিকায় যুক্ত হয়েছে!' : 'পছন্দের তালিকা থেকে সরানো হয়েছে।',
      'info'
    );
  };

  // Related prompts from the same category or model
  const relatedPrompts = prompts
    .filter((p) => p.id !== prompt.id && (p.categoryId === prompt.categoryId || p.aiModel === prompt.aiModel))
    .slice(0, 3);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl rounded-3xl border border-red-500/30 bg-[#0C0C10] p-5 sm:p-8 shadow-2xl text-white my-8 overflow-hidden red-glow max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#E50914]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#FF1E2D]/10 blur-2xl" />

        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800 shrink-0">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-[#E50914] text-white flex items-center gap-1 shadow-md shadow-red-950">
                <Sparkles className="w-3.5 h-3.5" /> {prompt.aiModel}
              </span>
              <button
                onClick={() => {
                  if (onSelectCategory) {
                    onSelectCategory(prompt.categoryId);
                    onClose();
                  }
                }}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[#181822] hover:bg-[#20202E] text-zinc-300 border border-zinc-800 transition-colors flex items-center gap-1"
              >
                <Layers className="w-3 h-3 text-[#FF1E2D]" /> {prompt.categoryName}
              </button>
              {prompt.difficulty && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-medium">
                  {prompt.difficulty} Level
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
              {prompt.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto space-y-6 py-5 pr-1 flex-1">
          
          {/* Author & Stats bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#111116] border border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src={prompt.author.avatar}
                alt={prompt.author.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-bold text-white">{prompt.author.name}</p>
                <p className="text-xs text-zinc-400">{prompt.author.role || 'Prompt Creator'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>{prompt.publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-zinc-500" />
                <span>{prompt.viewsCount || 1} Views</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF1E2D] font-semibold">
                <Copy className="w-3.5 h-3.5" />
                <span>{prompt.copiesCount || 0} Copies</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Description & Context
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed bg-[#121216] p-4 rounded-xl border border-zinc-800/60">
              {prompt.shortDescription}
            </p>
          </div>

          {/* Featured Image (if available) */}
          {prompt.featuredImage && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Output Visual Result
              </h4>
              <div className="rounded-2xl overflow-hidden border border-zinc-800 max-h-80 bg-zinc-950">
                <img
                  src={prompt.featuredImage}
                  alt={prompt.title}
                  className="w-full h-full object-contain mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          {/* Complete Prompt Code Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#FF1E2D]" />
                <span>Complete Prompt Instruction</span>
              </h4>
              <span className="text-[11px] text-zinc-500 font-mono">
                {prompt.fullPrompt.length} characters
              </span>
            </div>

            <div className="relative rounded-2xl border border-red-500/30 bg-[#08080C] p-4 sm:p-5 font-mono text-xs sm:text-sm text-zinc-100 leading-relaxed overflow-x-auto shadow-inner">
              <pre className="whitespace-pre-wrap font-mono break-words select-all">
                {prompt.fullPrompt}
              </pre>
            </div>
          </div>

          {/* Tags */}
          {prompt.tags && prompt.tags.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags & Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {prompt.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-lg bg-[#14141A] text-zinc-300 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Prompts */}
          {relatedPrompts.length > 0 && (
            <div className="pt-6 border-t border-zinc-800 space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF1E2D]" />
                <span>Related Prompts</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedPrompts.map((rp) => (
                  <div
                    key={rp.id}
                    onClick={() => onSelectRelatedPrompt(rp)}
                    className="p-3 rounded-xl border border-zinc-800/80 bg-[#121216] hover:bg-[#181820] hover:border-red-500/40 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold mb-1.5 inline-block">
                        {rp.aiModel}
                      </span>
                      <h5 className="text-xs font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-2">
                        {rp.title}
                      </h5>
                    </div>
                    <div className="mt-2 text-[10px] text-zinc-500 flex items-center justify-between">
                      <span>{rp.copiesCount || 0} copies</span>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FF1E2D] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleToggleFavorite}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                isFavorite
                  ? 'bg-red-500/20 text-[#FF1E2D] border-red-500/50'
                  : 'bg-[#14141A] text-zinc-300 hover:text-white border-zinc-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF1E2D]' : ''}`} />
              <span>{isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}</span>
            </button>

            <button
              onClick={() => onShare(prompt)}
              className="p-2.5 rounded-xl bg-[#14141A] hover:bg-[#1C1C24] border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
              title="Share this prompt"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Test in AI Test Lab */}
            <button
              onClick={() => {
                onTestInLab(prompt);
                onClose();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/40 bg-[#1A0A0C] hover:bg-[#250D10] text-[#FF1E2D] text-xs font-bold transition-all"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Test in AI Lab</span>
            </button>

            {/* Primary Copy Prompt */}
            <button
              onClick={handleCopy}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all shadow-lg ${
                copied
                  ? 'bg-emerald-500 text-black shadow-emerald-950/60'
                  : 'bg-[#E50914] hover:bg-[#FF1E2D] text-white shadow-red-950/80 red-glow'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Complete Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
