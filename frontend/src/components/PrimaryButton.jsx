export default function PrimaryButton({
  children,
  onClick,
  type = 'button',
  isLoading = false,
  disabled = false,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full h-[52px] bg-[#1A1A1A] text-[#FEFEFE] font-inter text-sm font-medium tracking-[0.02em] rounded-[10px] shadow-button hover:bg-[#2A2A2A] hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(26,26,26,0.25)] active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center ${className}`}
    >
      {isLoading ? (
        <svg className="w-5 h-5 animate-spin-loader" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  );
}