import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  Key, 
  Sparkles 
} from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { useToast } from '../../context/ToastContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { dataStore, users } = useDataStore();
  const { showToast } = useToast();

  const [email, setEmail] = useState('admin@promptview.ai');
  const [password, setPassword] = useState('admin123');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const foundUser = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.role === 'admin'
      );

      setIsLoading(false);

      if (foundUser && (password === 'admin123' || password === 'admin' || password.length >= 4)) {
        dataStore.setAdminAuthenticated(true);
        showToast('এডমিন লগইন সফল হয়েছে!', 'success');
        onSuccess();
        onClose();
      } else {
        showToast('ভুল ইমেইল বা পাসওয়ার্ড। ডেমো একাউন্ট ব্যবহার করুন।', 'error');
      }
    }, 400);
  };

  const handleQuickDemoLogin = () => {
    setEmail('admin@promptview.ai');
    setPassword('admin123');
    dataStore.setAdminAuthenticated(true);
    showToast('ডেমো এডমিন হিসেবে লগইন করা হয়েছে!', 'success');
    onSuccess();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl border border-red-500/40 bg-[#0E0E12] p-6 sm:p-8 shadow-2xl text-white overflow-hidden red-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#E50914]/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#E50914] text-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">PromptView Admin</h3>
              <p className="text-[11px] text-zinc-400">Restricted Administration Access</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Credentials Box */}
        <div className="my-5 p-3.5 rounded-2xl bg-[#14141A] border border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5 font-semibold">
              <Key className="w-3.5 h-3.5 text-[#FF1E2D]" /> Demo Admin Credentials:
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold">
              Ready
            </span>
          </div>
          <div className="text-[11px] font-mono text-zinc-300 space-y-0.5 bg-black/40 p-2 rounded-lg">
            <p>Email: <span className="text-white">admin@promptview.ai</span></p>
            <p>Pass: <span className="text-white">admin123</span></p>
          </div>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-1.5 rounded-lg bg-[#E50914]/20 hover:bg-[#E50914]/30 border border-[#E50914]/50 text-xs font-bold text-[#FF1E2D] transition-colors flex items-center justify-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" /> 1-Click Demo Admin Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#14141A] border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#14141A] border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50914]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#E50914] hover:bg-[#FF1E2D] disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-red-950 flex items-center justify-center gap-2"
          >
            <span>{isLoading ? 'Verifying...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
