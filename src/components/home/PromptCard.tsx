import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Heart, 
  Share2, 
  Eye, 
  Sparkles, 
  Terminal, 
  ArrowUpRight, 
  Layers, 
  Calendar,
  Flame
} from 'lucide-react';
import { Prompt } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';

interface PromptCardProps {
  prompt: Prompt;
  onView: (prompt: Prompt) => void;
  onShare: (prompt: Prompt) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onView,
  onShare,
  onSelectCategory,
}) => {
  const { favorites, dataStore } = useDataStore();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const isFavorite = favorites.includes(prompt.id);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(prompt.fullPrompt);
    setCopied(true);
    dataStore.incrementCopies(prompt.id);
    showToast(`"${prompt.title.slice(0, 30)}..." কপি করা হয়েছে!`, 'success');
    setTimeout(() => setCopied(false), 2200);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const fav = dataStore.toggleFavorite(prompt.id);
    showToast(
      fav ? 'পছন্দের তালিকায় যুক্ত হয়েছে!' : 'পছন্দের তালিকা থেকে সরানো হয়েছে।',
      'info'
    );
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(prompt);
  };

  // Model-specific badge color accents
  const getModelBadgeStyle = (model: string) => {
    const m = model.toLowerCase();
    if (m.includes('midjourney')) return 'bg-red-950/80 text-[#FF1E2D] border-red-800/50';
    if (m.includes('chatgpt') || m.includes('gpt')) return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/50';
    if (m.includes('gemini')) return 'bg-blue-950/80 text-blue-400 border-blue-800/50';
    if (m.includes('claude')) return 'bg-amber-950/80 text-amber-400 border-amber-800/50';
    if (m.includes('coding') || m.includes('code')) return 'bg-purple-950/80 text-purple-400 border-purple-800/50';
    if (m.includes('video') || m.includes('runway') || m.includes('sora')) return 'bg-rose-950/80 text-rose-400 border-rose-800/50';
    return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  };

  return (
    <div 
      onClick={() => onView(prompt)}
      className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#121216] via-[#0E0E12] to-[#0A0A0C] p-4 sm:p-5 transition-all duration-300 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* AI Model Badge */}
            <span className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border ${getModelBadgeStyle(prompt.aiModel)} flex items-center gap-1`}>
              <Sparkles className="w-3 h-3 shrink-0" />
              {prompt.aiModel}
            </span>

            {/* Category Tag */}
            <span 
              onClick={(e) => {
                if (onSelectCategory) {
                  e.stopPropagation();
                  onSelectCategory(prompt.categoryId);
                }
              }}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[#181820] text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
            >
              {prompt.categoryName}
            </span>

            {prompt.isFeatured && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#E50914] text-white flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5" /> HOT
              </span>
            )}
          </div>

          {/* Action Icons: Favorite & Share */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleToggleFavorite}
              className={`p-1.5 rounded-lg border transition-all ${
                isFavorite
                  ? 'bg-red-500/20 text-[#FF1E2D] border-red-500/40'
                  : 'bg-black/40 text-zinc-400 hover:text-white border-zinc-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-[#FF1E2D]' : ''}`} />
            </button>
            <button
              onClick={handleShareClick}
              className="p-1.5 rounded-lg border border-zinc-800 bg-black/40 text-zinc-400 hover:text-white transition-colors"
              title="Share prompt"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Featured Image Thumbnail (if image prompt) */}
        {prompt.featuredImage && (
          <div className="relative mb-3.5 h-36 w-full overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900">
            <img
              src={prompt.featuredImage}
              alt={prompt.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-zinc-300">
              Output Preview
            </div>
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-2 leading-snug">
          {prompt.title}
        </h3>

        {/* Short Description */}
        <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
          {prompt.shortDescription}
        </p>

        {/* Tags */}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {prompt.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800/80"
              >
                #{tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-500">
                +{prompt.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom Footer Section */}
      <div className="mt-4 pt-3.5 border-t border-zinc-800/60 flex items-center justify-between gap-2">
        {/* Author info & stats */}
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={prompt.author.avatar}
            alt={prompt.author.name}
            className="w-6 h-6 rounded-full object-cover border border-zinc-700 shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-zinc-300 truncate">{prompt.author.name}</p>
            <p className="text-[10px] text-zinc-500 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" /> {prompt.publishDate}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              copied
                ? 'bg-emerald-500 text-black shadow-md shadow-emerald-900/40'
                : 'bg-[#E50914] hover:bg-[#FF1E2D] text-white shadow-md shadow-red-950/60'
            }`}
            title="Copy prompt to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            onClick={() => onView(prompt)}
            className="p-1.5 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors"
            title="View full prompt details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
