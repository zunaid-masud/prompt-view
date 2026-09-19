import React, { useState, useEffect, useMemo } from 'react';
import { Search, X, Sparkles, BookOpen, Layers, Wrench, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { Prompt, Blog, Category, AITool } from '../../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: Prompt) => void;
  onSelectBlog: (blog: Blog) => void;
  onSelectCategory: (categoryId: string) => void;
  onSelectTool: (tool: AITool) => void;
}

type SearchFilter = 'all' | 'prompts' | 'blogs' | 'categories' | 'tools';

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt,
  onSelectBlog,
  onSelectCategory,
  onSelectTool,
}) => {
  const { prompts, categories, blogs, tools } = useDataStore();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const [modelFilter, setModelFilter] = useState<string>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();

    // Prompts
    const matchedPrompts = prompts.filter((p) => {
      if (modelFilter !== 'all' && p.aiModel !== modelFilter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    // Blogs
    const matchedBlogs = blogs.filter((b) => {
      if (!q) return true;
      return (
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
      );
    });

    // Categories
    const matchedCategories = categories.filter((c) => {
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    });

    // Tools
    const matchedTools = tools.filter((t) => {
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.shortDescription.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });

    return {
      prompts: matchedPrompts,
      blogs: matchedBlogs,
      categories: matchedCategories,
      tools: matchedTools,
    };
  }, [query, prompts, blogs, categories, tools, modelFilter]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-3xl rounded-2xl border border-red-500/30 bg-[#0C0C10] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] text-white red-glow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3 bg-[#111116]">
          <Search className="w-5 h-5 text-[#FF1E2D] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search AI Prompts, Models, Blogs, Tools, Categories... (Type to search)"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-zinc-400 hover:text-white bg-zinc-800 rounded font-mono"
          >
            ESC
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/60 bg-[#09090D] overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-[#E50914] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            All Results
          </button>
          <button
            onClick={() => setFilter('prompts')}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter === 'prompts'
                ? 'bg-[#E50914] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF1E2D]" />
            Prompts ({filteredResults.prompts.length})
          </button>
          <button
            onClick={() => setFilter('tools')}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter === 'tools'
                ? 'bg-[#E50914] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-blue-400" />
            AI Tools ({filteredResults.tools.length})
          </button>
          <button
            onClick={() => setFilter('blogs')}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter === 'blogs'
                ? 'bg-[#E50914] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            Blogs ({filteredResults.blogs.length})
          </button>
          <button
            onClick={() => setFilter('categories')}
            className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              filter === 'categories'
                ? 'bg-[#E50914] text-white'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Categories ({filteredResults.categories.length})
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6 flex-1 divide-y divide-zinc-800/40">
          {/* Prompts Section */}
          {(filter === 'all' || filter === 'prompts') && filteredResults.prompts.length > 0 && (
            <div className="space-y-2 pt-2 first:pt-0">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-[#FF1E2D]">
                  <Sparkles className="w-3.5 h-3.5" /> AI Prompts
                </span>
                <span>{filteredResults.prompts.length} found</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredResults.prompts.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPrompt(p);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-zinc-800/80 bg-[#111116] hover:bg-[#181820] hover:border-red-500/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-semibold">
                          {p.aiModel}
                        </span>
                        <span className="text-[10px] text-zinc-400">{p.categoryName}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-1">
                        {p.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {p.shortDescription}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#FF1E2D] group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Tools Section */}
          {(filter === 'all' || filter === 'tools') && filteredResults.tools.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-blue-400">
                  <Wrench className="w-3.5 h-3.5" /> AI Image & Creative Tools
                </span>
                <span>{filteredResults.tools.length} found</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredResults.tools.slice(0, 4).map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      onSelectTool(tool);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-zinc-800/80 bg-[#111116] hover:bg-[#181820] hover:border-blue-500/40 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <img
                      src={tool.iconUrl}
                      alt={tool.name}
                      className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                          {tool.name}
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                          {tool.pricingType}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{tool.shortDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blogs Section */}
          {(filter === 'all' || filter === 'blogs') && filteredResults.blogs.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <BookOpen className="w-3.5 h-3.5" /> Blog Articles & Guides
                </span>
                <span>{filteredResults.blogs.length} found</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {filteredResults.blogs.slice(0, 3).map((blog) => (
                  <div
                    key={blog.id}
                    onClick={() => {
                      onSelectBlog(blog);
                      onClose();
                    }}
                    className="p-3 rounded-xl border border-zinc-800/80 bg-[#111116] hover:bg-[#181820] hover:border-emerald-500/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="pr-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {blog.title}
                      </h4>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{blog.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories Section */}
          {(filter === 'all' || filter === 'categories') && filteredResults.categories.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Layers className="w-3.5 h-3.5" /> Categories
                </span>
                <span>{filteredResults.categories.length} found</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {filteredResults.categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-800 bg-[#14141A] hover:border-amber-500/50 text-xs font-medium text-zinc-200 transition-all"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-black/50 rounded-full text-zinc-400">
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredResults.prompts.length === 0 &&
            filteredResults.tools.length === 0 &&
            filteredResults.blogs.length === 0 &&
            filteredResults.categories.length === 0 && (
              <div className="text-center py-12 text-zinc-500">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30 text-zinc-400" />
                <p className="text-sm">No matches found for &quot;{query}&quot;</p>
                <p className="text-xs mt-1 text-zinc-600">Try searching for ChatGPT, Midjourney, Coding, or Marketing prompts</p>
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-zinc-800/80 bg-[#09090D] flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Select item
            </span>
            <span>ESC to close</span>
          </div>
          <span className="text-[#FF1E2D] font-semibold">PromptView Search Engine</span>
        </div>
      </div>
    </div>
  );
};
