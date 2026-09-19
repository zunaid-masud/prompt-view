import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl shadow-2xl backdrop-blur-md border ${
                toast.type === 'success'
                  ? 'bg-[#121214]/95 border-[#E50914]/50 text-white red-glow'
                  : toast.type === 'error'
                  ? 'bg-[#1A0A0A]/95 border-red-500/60 text-red-200'
                  : 'bg-[#111115]/95 border-zinc-700/60 text-zinc-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {toast.type === 'success' && (
                  <div className="p-1 rounded-full bg-[#E50914]/20 text-[#FF1E2D]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
                {toast.type === 'error' && (
                  <div className="p-1 rounded-full bg-red-500/20 text-red-400">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                )}
                {toast.type === 'info' && (
                  <div className="p-1 rounded-full bg-zinc-700/30 text-zinc-300">
                    <Info className="w-4 h-4" />
                  </div>
                )}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-zinc-400 hover:text-white p-1 ml-2 transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
