import { useEffect, useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, AlertCircle, Loader, X } from 'lucide-react';

/* ================= TOAST COMPONENT ================= */

export default function Toast({ message, type, onClose, duration = 4000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const enterTimeout = setTimeout(() => setIsVisible(true), 10);

    let exitTimeout;
    if (type !== 'loading') {
      exitTimeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }, duration);
    }

    return () => {
      clearTimeout(enterTimeout);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [duration, onClose, type]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[#4CAF50]" />,
    error: <AlertCircle className="w-5 h-5 text-[#E24B4B]" />,
    loading: <Loader className="w-5 h-5 text-[#C9A962] animate-spin-loader" />,
  };

  const borderColors = {
    success: '#4CAF50',
    error: '#E24B4B',
    loading: '#C9A962',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-[9999] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
      }`}
    >
      <div
        className="bg-[#FEFEFE] rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)] flex items-start gap-3 pr-8 pl-4 py-3 min-w-[300px] max-w-[400px]"
        style={{ borderLeft: `4px solid ${borderColors[type]}` }}
      >
        {icons[type]}

        <div className="flex-1">
          <p className="text-sm font-medium text-[#1E1E1E] font-inter">
            {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Please wait'}
          </p>
          <p className="text-[13px] text-[#6B6B6B] font-inter mt-0.5">
            {message}
          </p>
        </div>

        {type !== 'loading' && (
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="absolute top-3 right-3 text-[#6B6B6B] hover:text-[#1E1E1E]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= TOAST CONTEXT ================= */

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}