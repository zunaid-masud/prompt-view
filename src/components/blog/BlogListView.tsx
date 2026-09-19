import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Tag, 
  Eye, 
  Share2 
} from 'lucide-react';
import { Blog } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';

interface BlogListViewProps {
  onSelectBlog: (blog: Blog) => void;
  onBackToHome: () => void;
}

export const BlogListView: React.FC<BlogListViewProps> = ({ onSelectBlog, onBackToHome }) => {
  const { blogs } = useDataStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'ChatGPT', 'Image Generation', 'AI Coding', 'SEO & Content', 'AI Tips'];

  const publishedBlogs = useMemo(() => {
    return blogs.filter((b) => b.status === 'published');
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return publishedBlogs.filter((b) => {
      const matchCat = selectedCategory === 'all' || b.category.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchQuery =
        !searchQuery ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }, [publishedBlogs, selectedCategory, searchQuery]);

  const featuredBlog = publishedBlogs.find((b) => b.isFeatured) || publishedBlogs[0];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-[#1A080A] via-[#0E0E14] to-[#1A080A] p-6 sm:p-10 relative overflow-hidden shadow-2xl">
        <div className="pointer-events-none absolute -top-12 -right-12 w-64 h-64 rounded-full bg-[#E50914]/20 blur-3xl" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>PROMPTVIEW BLOG & KNOWLEDGE BASE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            AI Tutorials, Guides & <span className="text-[#FF1E2D]">Insights</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            শিখুন কীভাবে প্রম্পট ইঞ্জিনিয়ারিং, মিডজার্নি ফটোরিয়ালিজম, এবং এআই কোডিং টুলস ব্যবহার করে আপনার প্রোডাক্টিভিটি বাড়াবেন।
          </p>
        </div>
      </div>

      {/* Featured Blog Hero (if exists and no active search) */}
      {featuredBlog && !searchQuery && selectedCategory === 'all' && (
        <div
          onClick={() => onSelectBlog(featuredBlog)}
          className="group relative rounded-3xl border border-zinc-800 bg-[#0E0E12] overflow-hidden hover:border-red-500/40 hover:shadow-2xl hover:shadow-red-950/20 transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6"
        >
          <div className="lg:col-span-7 h-64 sm:h-80 rounded-2xl overflow-hidden relative border border-zinc-800">
            <img
              src={featuredBlog.featuredImage}
              alt={featuredBlog.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#E50914] text-white text-xs font-bold shadow-lg">
              FEATURED STORY
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                <span className="px-2.5 py-0.5 rounded-md bg-[#181822] text-[#FF1E2D] font-semibold border border-red-950">
                  {featuredBlog.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {featuredBlog.readTimeMinutes} min read
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FF1E2D] transition-colors leading-snug">
                {featuredBlog.title}
              </h2>

              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-4 leading-relaxed">
                {featuredBlog.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={featuredBlog.author.avatar}
                  alt={featuredBlog.author.name}
                  className="w-8 h-8 rounded-full object-cover border border-zinc-700"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs font-semibold text-zinc-200">{featuredBlog.author.name}</span>
              </div>

              <span className="text-xs font-bold text-[#FF1E2D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read Full Guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E0E12] border border-zinc-800">
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
              {cat === 'all' ? 'All Posts' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs & guides..."
            className="w-full bg-[#14141A] border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => onSelectBlog(blog)}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-800/80 bg-[#0E0E12] overflow-hidden hover:border-red-500/40 hover:shadow-xl hover:shadow-red-950/20 transition-all duration-300 cursor-pointer"
          >
            <div>
              {/* Thumbnail */}
              <div className="h-48 w-full overflow-hidden relative border-b border-zinc-800">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-zinc-300">
                  {blog.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {blog.publishDate}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {blog.readTimeMinutes} min read
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-2 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                {blog.tags && (
                  <div className="flex flex-wrap gap-1 pt-2">
                    {blog.tags.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 pt-0 mt-2 flex items-center justify-between border-t border-zinc-800/40 pt-3">
              <div className="flex items-center gap-2">
                <img
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  className="w-6 h-6 rounded-full object-cover border border-zinc-700"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs text-zinc-300 font-medium">{blog.author.name}</span>
              </div>

              <span className="text-xs font-bold text-[#FF1E2D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-16 rounded-2xl border border-zinc-800 bg-[#0E0E12] text-zinc-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30 text-zinc-400" />
          <p className="text-base text-zinc-300 font-semibold">No articles match your query</p>
          <p className="text-xs mt-1 text-zinc-500">Try searching for different terms or reset your filters.</p>
        </div>
      )}

    </div>
  );
};
