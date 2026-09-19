import React from 'react';
import { 
  Layers, 
  Sparkles, 
  Bot, 
  Image as ImageIcon, 
  Code, 
  PenTool, 
  Search, 
  TrendingUp, 
  Video, 
  Briefcase, 
  Zap, 
  Share2, 
  Cpu, 
  ArrowRight 
} from 'lucide-react';
import { Category } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';

interface CategoriesPageViewProps {
  onSelectCategory: (catId: string) => void;
  onBackToHome: () => void;
}

const iconMap: Record<string, any> = {
  Bot,
  Sparkles,
  Image: ImageIcon,
  Cpu,
  Code,
  PenTool,
  Search,
  TrendingUp,
  Video,
  Briefcase,
  Zap,
  Share2,
  Layers,
};

export const CategoriesPageView: React.FC<CategoriesPageViewProps> = ({
  onSelectCategory,
  onBackToHome,
}) => {
  const { categories } = useDataStore();

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-[#1A080A] via-[#0E0E14] to-[#1A080A] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E50914]/20 blur-3xl" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>AI DIRECTORY CATEGORIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Browse All AI <span className="text-[#FF1E2D]">Categories</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            এক্সপ্লোর করুন বিভিন্ন ক্যাটাগরির হাজারো প্রিমিয়াম AI Prompts এবং Tools। ChatGPT, Gemini, Midjourney সহ আপনার পছন্দের প্ল্যাটফর্ম বেছে নিন।
          </p>
        </div>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Layers;

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-gradient-to-b from-[#121216] to-[#0A0A0C] p-6 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md"
                    style={{ 
                      backgroundColor: `${cat.color || '#E50914'}15`,
                      borderColor: `${cat.color || '#E50914'}40`
                    }}
                  >
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: cat.color || '#FF1E2D' }} 
                    />
                  </div>

                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#181822] text-zinc-300 border border-zinc-800">
                    {cat.count} Prompts
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#FF1E2D] transition-colors">
                  {cat.name}
                </h3>

                <p className="mt-2 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-semibold text-[#FF1E2D]">
                <span>View Prompts</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
