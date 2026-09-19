import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, url }) => {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  
  if (!isOpen) return null;

  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(`Check out "${title}" on PromptView:`);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    showToast('লিংক কপি করা হয়েছে!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      name: 'Facebook',
      color: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2] border-[#1877F2]/30',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      name: 'Twitter (X)',
      color: 'hover:bg-white/10 hover:text-white border-zinc-700',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      name: 'WhatsApp',
      color: 'hover:bg-[#25D366]/20 hover:text-[#25D366] border-[#25D366]/30',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    },
    {
      name: 'LinkedIn',
      color: 'hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] border-[#0A66C2]/30',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      name: 'Telegram',
      color: 'hover:bg-[#229ED9]/20 hover:text-[#229ED9] border-[#229ED9]/30',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-2xl border border-red-500/30 bg-[#0E0E12] p-6 shadow-2xl text-white red-glow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Share Prompt</h3>
            <p className="text-xs text-zinc-400 line-clamp-1">{title}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center p-2.5 rounded-xl border bg-black/40 text-xs font-semibold text-zinc-200 transition-all ${p.color}`}
            >
              {p.name}
            </a>
          ))}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-zinc-400">Direct Page Link</label>
          <div className="flex items-center gap-2 p-1.5 rounded-xl border border-zinc-800 bg-black/60">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent px-2 text-xs text-zinc-300 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#FF1E2D] text-white text-xs font-semibold shrink-0 transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
