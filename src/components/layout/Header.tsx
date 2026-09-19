import React, { useState } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  Image as ImageIcon, 
  BookOpen, 
  Layers, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  LogOut,
  Terminal,
  Zap,
  Bookmark
} from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, params?: any) => void;
  onOpenSearch: () => void;
  onOpenAdminAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenAdminAuth,
}) => {
  const { isAdmin, favorites, dataStore } = useDataStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'lab', label: 'AI Test Lab', icon: FlaskConical, badge: 'Playground' },
    { id: 'tools', label: 'Image Toolkit', icon: ImageIcon },
    { id: 'blog', label: 'Blog', icon: BookOpen },
    { id: 'categories', label: 'Categories', icon: Layers },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    dataStore.setAdminAuthenticated(false);
    onNavigate('home');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#E50914] via-[#B20710] to-[#670000] shadow-lg shadow-red-900/30 group-hover:shadow-red-600/50 group-hover:scale-105 transition-all duration-300">
            <Terminal className="w-5 h-5 text-white transform -rotate-6 group-hover:rotate-0 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF1E2D] rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF1E2D] rounded-full" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-sans">
                Prompt<span className="text-[#FF1E2D] red-glow-text">View</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/40 hidden sm:inline-block">
                AI HUB
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#111116] p-1.5 rounded-xl border border-white/[0.06]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all duration-200 ${
                  isActive
                    ? 'bg-[#E50914] text-white shadow-md shadow-red-950'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                    isActive ? 'bg-black/30 text-white' : 'bg-red-950/90 text-[#FF1E2D] border border-red-800/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions (Search + Admin + Mobile toggle) */}
        <div className="flex items-center gap-2.5">
          {/* Global Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#14141A] border border-white/[0.08] hover:border-red-500/40 text-zinc-400 hover:text-white transition-all text-xs group"
            title="Search AI Prompts & Resources (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FF1E2D] transition-colors" />
            <span className="hidden md:inline text-zinc-400 group-hover:text-zinc-200">Search prompts...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-black/60 border border-zinc-800 rounded text-zinc-400">
              ⌘K
            </kbd>
          </button>

          {/* Saved Favorites Shortcut */}
          <button
            onClick={() => onNavigate('home', { filter: 'favorites' })}
            className="relative p-2 rounded-xl bg-[#14141A] border border-white/[0.08] hover:border-red-500/40 text-zinc-400 hover:text-white transition-all"
            title="Saved Prompts"
          >
            <Bookmark className="w-4 h-4 text-zinc-400 hover:text-[#FF1E2D]" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E50914] text-white text-[9px] font-bold flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Admin Button */}
          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => onNavigate('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  currentView === 'admin'
                    ? 'bg-[#E50914] text-white border-red-500 shadow-md shadow-red-950'
                    : 'bg-[#181010] text-[#FF1E2D] border border-red-500/40 hover:bg-[#E50914] hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin Panel</span>
              </button>
              <button
                onClick={handleLogout}
                className="p-2 rounded-xl bg-[#14141A] border border-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                title="Logout Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#180808] to-[#121216] border border-red-500/30 hover:border-red-500 text-zinc-300 hover:text-white text-xs font-semibold transition-all hover:shadow-lg hover:shadow-red-950/50"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1E2D]" />
              <span className="hidden sm:inline">Admin Login</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#14141A] border border-zinc-800 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-[#0A0A0A] p-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#E50914] text-white font-bold'
                    : 'text-zinc-300 hover:bg-[#14141A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 text-white font-medium">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-zinc-800 flex flex-col gap-2">
            {isAdmin ? (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#E50914] text-white font-bold text-sm"
              >
                <ShieldCheck className="w-4 h-4" /> Go to Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminAuth();
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-red-500/40 bg-[#160808] text-white font-semibold text-sm"
              >
                <ShieldCheck className="w-4 h-4 text-[#FF1E2D]" /> Admin Portal Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
