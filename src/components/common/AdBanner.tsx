import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AdPosition } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';

interface AdBannerProps {
  position: AdPosition;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ position, className = '' }) => {
  const { ads, settings, dataStore } = useDataStore();

  if (!settings.enableAds) {
    return null;
  }

  const ad = ads.find((a) => a.position === position && a.isActive);

  // If no active ad exists or image is missing, collapse cleanly with no blank space
  if (!ad || !ad.imageUrl) {
    return null;
  }

  const handleClick = () => {
    dataStore.recordAdClick(ad.id);
  };

  if (position === 'top_banner') {
    return (
      <div className={`w-full overflow-hidden rounded-xl border border-red-500/20 bg-gradient-to-r from-[#180808] via-[#0F0F12] to-[#180808] p-1.5 shadow-lg group ${className}`}>
        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="relative flex flex-col sm:flex-row items-center justify-between gap-4 p-3 sm:p-4 rounded-lg overflow-hidden bg-black/40 hover:bg-black/60 transition-all duration-300"
        >
          <div className="flex items-center gap-3 z-10">
            <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-[#E50914] text-white rounded">
              {ad.badgeText || 'SPONSORED'}
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#FF1E2D] transition-colors flex items-center gap-1.5">
                {ad.title}
                <Sparkles className="w-3.5 h-3.5 text-[#FF1E2D]" />
              </h4>
              {ad.sponsorName && (
                <p className="text-xs text-zinc-400 mt-0.5">{ad.sponsorName}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 z-10">
            <span className="text-xs font-semibold px-4 py-1.5 rounded-lg bg-[#E50914] hover:bg-[#FF1E2D] text-white transition-colors flex items-center gap-1">
              Explore Now <ExternalLink className="w-3 h-3 ml-1" />
            </span>
          </div>

          {/* Background Image Glow */}
          {ad.imageUrl && (
            <div 
              className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${ad.imageUrl})` }}
            />
          )}
        </a>
      </div>
    );
  }

  if (position === 'sidebar') {
    return (
      <div className={`overflow-hidden rounded-xl border border-zinc-800 bg-[#0E0E12] p-3 shadow-md group ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            {ad.badgeText || 'SPONSORED'}
          </span>
          {ad.sponsorName && (
            <span className="text-[11px] text-zinc-400 truncate max-w-[140px]">{ad.sponsorName}</span>
          )}
        </div>
        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block relative rounded-lg overflow-hidden border border-zinc-800/80 group-hover:border-red-500/40 transition-all"
        >
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-36 object-cover transform group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="p-3 bg-[#111115] border-t border-zinc-800/80">
            <h5 className="text-xs font-semibold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-1">
              {ad.title}
            </h5>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-zinc-400">Click to visit</span>
              <span className="text-[10px] text-[#FF1E2D] font-medium flex items-center gap-0.5">
                Visit Partner <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  }

  // Main Content Ad
  return (
    <div className={`w-full my-6 overflow-hidden rounded-xl border border-red-500/25 bg-gradient-to-r from-[#140607] via-[#0E0E12] to-[#140607] p-4 shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-[#E50914]/20 text-[#FF1E2D] border border-[#E50914]/40 rounded">
          {ad.badgeText || 'FEATURED PARTNER'}
        </span>
        <span className="text-xs text-zinc-400">{ad.sponsorName || 'Official Partner'}</span>
      </div>
      <a
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex flex-col sm:flex-row items-center gap-4 group"
      >
        <div className="w-full sm:w-48 h-28 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
          <img
            src={ad.imageUrl}
            alt={ad.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-white group-hover:text-[#FF1E2D] transition-colors">
            {ad.title}
          </h4>
          <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
            Supercharge your workflow with our verified AI tools suite and exclusive cloud integrations.
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 rounded bg-[#E50914] text-white flex items-center gap-1 group-hover:bg-[#FF1E2D] transition-colors">
              Claim Offer <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};
