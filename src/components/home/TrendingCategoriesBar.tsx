import React from 'react';
import { 
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
  Layers 
} from 'lucide-react';
import { Category } from '../../types';

interface TrendingCategoriesBarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
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

export const TrendingCategoriesBar: React.FC<TrendingCategoriesBarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FF1E2D]" />
          <span>Trending Categories</span>
        </h3>
        <span className="text-xs text-zinc-500 font-medium">
          {categories.length} Categories Live
        </span>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => onSelectCategory('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${
            selectedCategory === 'all'
              ? 'bg-[#E50914] text-white border-[#E50914] shadow-md shadow-red-950/60'
              : 'bg-[#111116] text-zinc-400 hover:text-white hover:bg-zinc-800 border-zinc-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>All Prompts</span>
        </button>

        {categories.map((cat) => {
          const IconComponent = iconMap[cat.iconName] || Layers;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-[#E50914] text-white border-[#E50914] shadow-md shadow-red-950/60'
                  : 'bg-[#111116] text-zinc-300 hover:text-white hover:bg-[#181822] border-zinc-800/80 hover:border-red-500/30'
              }`}
            >
              <IconComponent 
                className="w-3.5 h-3.5 shrink-0" 
                style={{ color: isSelected ? '#FFFFFF' : cat.color || '#FF1E2D' }} 
              />
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-black/30 text-white' : 'bg-zinc-800 text-zinc-400'
              }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
