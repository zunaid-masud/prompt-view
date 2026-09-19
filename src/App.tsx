import React, { useState, useMemo } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { TrendingCategoriesBar } from './components/home/TrendingCategoriesBar';
import { PromptCard } from './components/home/PromptCard';
import { Sidebar } from './components/home/Sidebar';
import { AdBanner } from './components/common/AdBanner';
import { PromptDetailModal } from './components/prompt/PromptDetailModal';
import { ShareModal } from './components/common/ShareModal';
import { GlobalSearchModal } from './components/search/GlobalSearchModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AITestLabView } from './components/lab/AITestLabView';
import { ImageToolkitView } from './components/tools/ImageToolkitView';
import { BlogListView } from './components/blog/BlogListView';
import { BlogDetailView } from './components/blog/BlogDetailView';
import { CategoriesPageView } from './components/categories/CategoriesPageView';
import { useDataStore } from './hooks/useDataStore';
import { Prompt, Blog, AITool } from './types';
import { 
  Sparkles, 
  Flame, 
  Layers, 
  Filter, 
  Grid, 
  ArrowRight, 
  RotateCcw,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export const App: React.FC = () => {
  const { 
    prompts, 
    categories, 
    blogs, 
    isAdmin, 
    favorites,
    dataStore 
  } = useDataStore();

  // Navigation State
  const [currentPage, setCurrentPage] = useState<
    'home' | 'lab' | 'tools' | 'blog' | 'blog_detail' | 'categories' | 'admin'
  >('home');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModel, setSelectedModel] = useState('all');
  const [sortOrder, setSortOrder] = useState<'latest' | 'popular' | 'rating'>('latest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Active Modals & Selected Items
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [shareData, setShareData] = useState<{ title: string; url: string } | null>(null);
  const [labInitialPrompt, setLabInitialPrompt] = useState<string>('');

  // Pagination for main feed
  const [visibleCount, setVisibleCount] = useState(8);

  // Published Prompts Only
  const publishedPrompts = useMemo(() => {
    return prompts.filter((p) => p.status === 'published');
  }, [prompts]);

  // Featured Prompts
  const featuredPrompts = useMemo(() => {
    return publishedPrompts.filter((p) => p.isFeatured);
  }, [publishedPrompts]);

  // Filtered Main Feed Prompts
  const filteredPrompts = useMemo(() => {
    let result = [...publishedPrompts];

    // Filter by favorites only
    if (showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategory);
    }

    // Filter by model
    if (selectedModel !== 'all') {
      result = result.filter((p) => p.aiModel.toLowerCase().includes(selectedModel.toLowerCase()));
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.fullPrompt.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortOrder === 'popular') {
      result.sort((a, b) => (b.copiesCount || 0) - (a.copiesCount || 0));
    } else if (sortOrder === 'rating') {
      result.sort((a, b) => (b.rating || 5) - (a.rating || 5));
    } else {
      // Default: latest date
      result.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    }

    return result;
  }, [publishedPrompts, selectedCategory, selectedModel, searchQuery, sortOrder, showFavoritesOnly, favorites]);

  // Popular prompts for sidebar
  const popularPrompts = useMemo(() => {
    return [...publishedPrompts].sort((a, b) => (b.copiesCount || 0) - (a.copiesCount || 0));
  }, [publishedPrompts]);

  // Latest blogs for sidebar
  const latestBlogs = useMemo(() => {
    return blogs.filter((b) => b.status === 'published').slice(0, 3);
  }, [blogs]);

  // Navigation handlers
  const handleNavigate = (page: string, params?: any) => {
    if (page === 'admin') {
      if (isAdmin) {
        setCurrentPage('admin');
      } else {
        setIsAdminLoginOpen(true);
      }
      return;
    }

    if (params?.filter === 'favorites') {
      setShowFavoritesOnly(true);
      setSelectedCategory('all');
      setSelectedModel('all');
      setSearchQuery('');
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (params?.categoryId) {
      setSelectedCategory(params.categoryId);
      setShowFavoritesOnly(false);
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setShowFavoritesOnly(false);
    setCurrentPage(page as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPrompt = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };

  const handleSelectBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    setCurrentPage('blog_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTool = (tool: AITool) => {
    window.open(tool.directUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSharePrompt = (prompt: Prompt) => {
    setShareData({
      title: prompt.title,
      url: window.location.href,
    });
  };

  const handleTestInLab = (prompt: Prompt) => {
    setLabInitialPrompt(prompt.fullPrompt);
    setCurrentPage('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col font-sans selection:bg-[#E50914] selection:text-white">
      
      {/* 1. Global Top Banner Advertisement (Auto collapses if inactive) */}
      <AdBanner position="top_banner" />

      {/* 2. Global Sticky Header */}
      <Header
        currentView={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenAdminAuth={() => {
          if (isAdmin) {
            setCurrentPage('admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

      {/* 3. Global Header Ad Slot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-4">
        <AdBanner position="header_ad" />
      </div>

      {/* 4. Main Body Route Router */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        
        {/* ROUTE: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Hero Section */}
            <HeroSection
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setShowFavoritesOnly(false);
              }}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setShowFavoritesOnly(false);
              }}
              categories={categories}
              selectedModel={selectedModel}
              onSelectModel={(model) => {
                setSelectedModel(model);
                setShowFavoritesOnly(false);
              }}
              onOpenTestLab={() => {
                setLabInitialPrompt(searchQuery);
                setCurrentPage('lab');
              }}
            />

            {/* Trending Horizontal Categories Bar */}
            <TrendingCategoriesBar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                setShowFavoritesOnly(false);
              }}
            />

            {/* Desktop 2-Column Layout: Left Content (70%) + Right Sidebar (30%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Main Content Column (8 cols) */}
              <div className="lg:col-span-8 space-y-10">
                
                {/* 1. Featured Prompts Section (Only when no active search/category filter) */}
                {!searchQuery && selectedCategory === 'all' && selectedModel === 'all' && !showFavoritesOnly && featuredPrompts.length > 0 && (
                  <section className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-[#E50914] text-white shadow-md shadow-red-950">
                          <Flame className="w-4 h-4" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                          Featured <span className="text-[#FF1E2D]">Prompts</span>
                        </h2>
                      </div>
                      <span className="text-xs text-zinc-400 font-medium">Handpicked by Editors</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {featuredPrompts.slice(0, 4).map((prompt) => (
                        <PromptCard
                          key={prompt.id}
                          prompt={prompt}
                          onView={handleSelectPrompt}
                          onShare={handleSharePrompt}
                          onSelectCategory={(catId) => {
                            setSelectedCategory(catId);
                            setShowFavoritesOnly(false);
                          }}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* 2. In-Feed Advertisement Banner */}
                <AdBanner position="main_content" />

                {/* 3. Latest / Filtered Prompts Section */}
                <section className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-zinc-800">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FF1E2D]" />
                        <span>
                          {showFavoritesOnly
                            ? 'Saved Favorite Prompts'
                            : selectedCategory !== 'all' 
                            ? `${categories.find((c) => c.id === selectedCategory)?.name || 'Category'} Prompts`
                            : 'All AI Prompts'}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
                          {filteredPrompts.length}
                        </span>
                      </h2>
                    </div>

                    {/* Sorting Tabs */}
                    <div className="flex items-center gap-1 bg-[#121216] p-1 rounded-xl border border-zinc-800 self-start sm:self-auto">
                      <button
                        onClick={() => setSortOrder('latest')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          sortOrder === 'latest'
                            ? 'bg-[#E50914] text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Latest
                      </button>
                      <button
                        onClick={() => setSortOrder('popular')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          sortOrder === 'popular'
                            ? 'bg-[#E50914] text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Most Copied
                      </button>
                      <button
                        onClick={() => setSortOrder('rating')}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                          sortOrder === 'rating'
                            ? 'bg-[#E50914] text-white'
                            : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        Top Rated
                      </button>
                    </div>
                  </div>

                  {/* Active Filter Chips Reset */}
                  {(selectedCategory !== 'all' || selectedModel !== 'all' || searchQuery || showFavoritesOnly) && (
                    <div className="flex items-center gap-2 flex-wrap text-xs bg-[#111116] p-2.5 rounded-xl border border-zinc-800/80">
                      <span className="text-zinc-400 font-semibold">Active filters:</span>
                      {showFavoritesOnly && (
                        <span className="px-2 py-0.5 rounded bg-red-950/80 text-[#FF1E2D] border border-red-900/60 flex items-center gap-1">
                          <Bookmark className="w-3 h-3" /> Saved Favorites
                          <button onClick={() => setShowFavoritesOnly(false)} className="hover:text-white font-bold ml-1">×</button>
                        </span>
                      )}
                      {selectedCategory !== 'all' && (
                        <span className="px-2 py-0.5 rounded bg-red-950/80 text-[#FF1E2D] border border-red-900/60 flex items-center gap-1">
                          Category: {categories.find((c) => c.id === selectedCategory)?.name}
                          <button onClick={() => setSelectedCategory('all')} className="hover:text-white font-bold ml-1">×</button>
                        </span>
                      )}
                      {selectedModel !== 'all' && (
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1">
                          Model: {selectedModel}
                          <button onClick={() => setSelectedModel('all')} className="hover:text-white font-bold ml-1">×</button>
                        </span>
                      )}
                      {searchQuery && (
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 flex items-center gap-1">
                          Query: &quot;{searchQuery}&quot;
                          <button onClick={() => setSearchQuery('')} className="hover:text-white font-bold ml-1">×</button>
                        </span>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedModel('all');
                          setSearchQuery('');
                          setShowFavoritesOnly(false);
                        }}
                        className="text-[#FF1E2D] hover:underline font-semibold ml-auto flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset All
                      </button>
                    </div>
                  )}

                  {/* Prompts Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredPrompts.slice(0, visibleCount).map((prompt) => (
                      <PromptCard
                        key={prompt.id}
                        prompt={prompt}
                        onView={handleSelectPrompt}
                        onShare={handleSharePrompt}
                        onSelectCategory={(catId) => {
                          setSelectedCategory(catId);
                          setShowFavoritesOnly(false);
                        }}
                      />
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredPrompts.length === 0 && (
                    <div className="text-center py-16 rounded-2xl border border-zinc-800 bg-[#0E0E12] text-zinc-400 space-y-3">
                      <Sparkles className="w-10 h-10 mx-auto opacity-30 text-zinc-500" />
                      <p className="text-base font-bold text-white">কোনো প্রম্পট পাওয়া যায়নি</p>
                      <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        আপনার ফিল্টার বা সার্চ টার্ম পরিবর্তন করে আবার চেষ্টা করুন অথবা এডমিন প্যানেল থেকে নতুন প্রম্পট পাবলিশ করুন।
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setSelectedModel('all');
                          setSearchQuery('');
                          setShowFavoritesOnly(false);
                        }}
                        className="px-4 py-2 rounded-xl bg-[#E50914] text-white text-xs font-bold shadow-md shadow-red-950"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  )}

                  {/* Load More Button */}
                  {visibleCount < filteredPrompts.length && (
                    <div className="text-center pt-4">
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 6)}
                        className="px-6 py-2.5 rounded-xl border border-zinc-800 bg-[#121216] hover:bg-[#181822] hover:border-red-500/40 text-xs sm:text-sm font-bold text-white transition-all shadow-md"
                      >
                        Load More Prompts ({filteredPrompts.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}
                </section>

              </div>

              {/* Right Sidebar Column (4 cols) */}
              <div className="lg:col-span-4">
                <Sidebar
                  categories={categories}
                  popularPrompts={popularPrompts}
                  latestBlogs={latestBlogs}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(catId) => {
                    setSelectedCategory(catId);
                    setShowFavoritesOnly(false);
                  }}
                  onViewPrompt={handleSelectPrompt}
                  onViewBlog={handleSelectBlog}
                  onNavigateToTools={() => handleNavigate('tools')}
                />
              </div>

            </div>

          </div>
        )}

        {/* ROUTE: AI TEST LAB */}
        {currentPage === 'lab' && (
          <AITestLabView
            initialPrompt={labInitialPrompt}
            onBackToHome={() => handleNavigate('home')}
            onSaveAsPrompt={() => {
              if (isAdmin) {
                setCurrentPage('admin');
              } else {
                setIsAdminLoginOpen(true);
              }
            }}
          />
        )}

        {/* ROUTE: IMAGE TOOLKIT */}
        {currentPage === 'tools' && (
          <ImageToolkitView onBackToHome={() => handleNavigate('home')} />
        )}

        {/* ROUTE: BLOG LIST */}
        {currentPage === 'blog' && (
          <BlogListView
            onSelectBlog={handleSelectBlog}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {/* ROUTE: BLOG DETAIL */}
        {currentPage === 'blog_detail' && selectedBlog && (
          <BlogDetailView
            blog={selectedBlog}
            onBack={() => handleNavigate('blog')}
            onSelectRelatedBlog={handleSelectBlog}
            onShare={(title) => {
              setShareData({
                title,
                url: window.location.href,
              });
            }}
          />
        )}

        {/* ROUTE: CATEGORIES DIRECTORY */}
        {currentPage === 'categories' && (
          <CategoriesPageView
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setShowFavoritesOnly(false);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToHome={() => handleNavigate('home')}
          />
        )}

        {/* ROUTE: ADMIN DASHBOARD */}
        {currentPage === 'admin' && (
          <AdminDashboard onBackToHome={() => handleNavigate('home')} />
        )}

      </main>

      {/* 5. Global Modals */}
      
      {/* Global Search Modal (Ctrl+K or Header Click) */}
      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPrompt={handleSelectPrompt}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setShowFavoritesOnly(false);
          setCurrentPage('home');
        }}
        onSelectBlog={handleSelectBlog}
        onSelectTool={handleSelectTool}
      />

      {/* Prompt Detail View Modal */}
      <PromptDetailModal
        prompt={selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
        onShare={handleSharePrompt}
        onTestInLab={handleTestInLab}
        onSelectRelatedPrompt={handleSelectPrompt}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setShowFavoritesOnly(false);
          setCurrentPage('home');
        }}
      />

      {/* Share Modal */}
      {shareData && (
        <ShareModal
          isOpen={Boolean(shareData)}
          onClose={() => setShareData(null)}
          title={shareData.title}
          url={shareData.url}
        />
      )}

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setCurrentPage('admin');
        }}
      />

      {/* 6. Global Site Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAdminAuth={() => {
          if (isAdmin) {
            setCurrentPage('admin');
          } else {
            setIsAdminLoginOpen(true);
          }
        }}
      />

    </div>
  );
};

export default App;
