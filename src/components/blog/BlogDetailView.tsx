import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Share2, 
  BookOpen, 
  Tag, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Blog } from '../../types';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';

interface BlogDetailViewProps {
  blog: Blog;
  onBack: () => void;
  onSelectRelatedBlog: (b: Blog) => void;
  onShare: (title: string) => void;
}

export const BlogDetailView: React.FC<BlogDetailViewProps> = ({
  blog,
  onBack,
  onSelectRelatedBlog,
  onShare,
}) => {
  const { blogs } = useDataStore();
  const { showToast } = useToast();

  const relatedBlogs = blogs
    .filter((b) => b.id !== blog.id && b.category === blog.category)
    .slice(0, 3);

  // Format content sections simple parser
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('## ')) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#E50914] rounded-full inline-block" />
            {line.replace('## ', '')}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={idx} className="text-lg font-bold text-zinc-100 mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <li key={idx} className="text-sm sm:text-base text-zinc-300 ml-4 list-disc mb-2 leading-relaxed">
            {line.replace(/^[-*]\s/, '')}
          </li>
        );
      }
      if (/^\d+\.\s/.test(line)) {
        return (
          <li key={idx} className="text-sm sm:text-base text-zinc-300 ml-4 list-decimal mb-2 leading-relaxed font-medium">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      if (!line.trim()) {
        return <div key={idx} className="h-3" />;
      }
      return (
        <p key={idx} className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#14141A] border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:border-[#E50914] transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Blogs</span>
      </button>

      {/* Main Card */}
      <div className="rounded-3xl border border-zinc-800 bg-[#0E0E12] overflow-hidden shadow-2xl p-6 sm:p-10 space-y-6">
        
        {/* Top Category & Meta */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-3 py-1 rounded-lg bg-[#E50914]/20 border border-[#E50914]/40 text-[#FF1E2D] text-xs font-bold">
              {blog.category}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {blog.publishDate}
            </span>
            <span className="text-xs text-zinc-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {blog.readTimeMinutes} min read
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Author bar */}
          <div className="flex items-center justify-between py-4 border-y border-zinc-800/80">
            <div className="flex items-center gap-3">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-sm font-bold text-white">{blog.author.name}</p>
                <p className="text-xs text-zinc-400">PromptView Verified Author</p>
              </div>
            </div>

            <button
              onClick={() => onShare(blog.title)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 max-h-96 w-full">
          <img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="p-4 rounded-xl bg-[#14141A] border-l-4 border-[#E50914] text-sm sm:text-base text-zinc-200 font-medium italic">
          &ldquo;{blog.excerpt}&rdquo;
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none pt-4">
          {renderFormattedContent(blog.fullContent)}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="pt-6 border-t border-zinc-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-[#FF1E2D]" /> Article Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((t, idx) => (
                <span key={idx} className="text-xs px-3 py-1 rounded-lg bg-[#14141A] text-zinc-300 border border-zinc-800">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Related Blogs */}
      {relatedBlogs.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF1E2D]" />
            <span>More in {blog.category}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedBlogs.map((rb) => (
              <div
                key={rb.id}
                onClick={() => onSelectRelatedBlog(rb)}
                className="p-4 rounded-2xl border border-zinc-800 bg-[#0E0E12] hover:border-red-500/40 hover:bg-[#121218] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#FF1E2D] transition-colors line-clamp-2">
                    {rb.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{rb.excerpt}</p>
                </div>
                <span className="text-[11px] text-[#FF1E2D] font-semibold mt-3 flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
