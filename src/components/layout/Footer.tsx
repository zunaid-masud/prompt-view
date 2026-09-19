import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Terminal, 
  Heart, 
  Twitter, 
  Facebook, 
  Github, 
  SendHorizontal, 
  Layers, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
  onOpenAdminAuth: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdminAuth }) => {
  const { settings, categories, dataStore, isAdmin } = useDataStore();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const res = dataStore.subscribeEmail(email);
    showToast(res.message, res.success ? 'success' : 'error');
    if (res.success) {
      setEmail('');
    }
  };

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#070709] text-zinc-400 mt-20">
      {/* Newsletter Accent Top */}
      {settings.enableNewsletter && (
        <div className="border-b border-zinc-800/80 bg-gradient-to-r from-[#140607] via-[#0E0E12] to-[#140607]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center lg:text-left max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E50914]/15 border border-[#E50914]/30 text-[#FF1E2D] text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> PROMPTVIEW VIP NEWSLETTER
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  প্রতি সপ্তাহে নতুন AI Prompts ও Tools আপডেট পান
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  Join 10,000+ AI creators, developers, and marketers getting curated prompt templates.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="আপনার ইমেইল এড্রেস লিখুন..."
                  className="px-4 py-3 rounded-xl bg-black/60 border border-zinc-700/80 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#E50914] flex-1 min-w-[260px]"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-red-950/60"
                >
                  সাবস্ক্রাইব <SendHorizontal className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#E50914] to-[#670000] shadow-md shadow-red-900/30">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Prompt<span className="text-[#FF1E2D]">View</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm">
              {settings.heroSubheadingBn || 'সেরা AI Prompt, AI Tools, Templates এবং Resources এক জায়গায়।'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={settings.twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14141A] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#E50914] transition-all"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14141A] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#E50914] transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.telegramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14141A] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#E50914] transition-all"
                title="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href={settings.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#14141A] border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-[#E50914] transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('lab')} className="hover:text-white transition-colors flex items-center gap-1">
                  AI Test Lab <span className="text-[9px] px-1 bg-red-950 text-[#FF1E2D] rounded">Live</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tools')} className="hover:text-white transition-colors">
                  Image Toolkit
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="hover:text-white transition-colors">
                  Blog & Tutorials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-white transition-colors">
                  All Categories
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Categories</h4>
            <ul className="space-y-2 text-xs">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate('home', { categoryId: cat.id })}
                    className="hover:text-white transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-zinc-600">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Admin & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Management</h4>
            <ul className="space-y-2 text-xs">
              {isAdmin ? (
                <li>
                  <button
                    onClick={() => onNavigate('admin')}
                    className="text-[#FF1E2D] font-semibold hover:underline flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" /> Admin Dashboard
                  </button>
                </li>
              ) : (
                <li>
                  <button
                    onClick={onOpenAdminAuth}
                    className="hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> Admin Portal
                  </button>
                </li>
              )}
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
              <li>
                <span className="text-zinc-500">API Documentation (Coming Soon)</span>
              </li>
              <li>
                <span className="text-zinc-500">Privacy Policy & Terms</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-10 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{settings.copyrightText || '© 2026 PromptView. All rights reserved.'}</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="font-semibold text-white">Google DeepMind & Gemini 2.5</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E50914]" />
            <span className="text-zinc-400">Bangladesh & Global</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
