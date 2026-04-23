import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder,
      icon: Icon,
      error,
      value,
      onChange,
      onBlur,
      disabled,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword
      ? showPassword
        ? 'text'
        : 'password'
      : type;

    return (
      <div className="w-full">
        <label className="block font-inter text-sm font-medium text-[#1E1E1E] mb-2">
          {label}
        </label>

        <div className="relative">
          {Icon && (
            <Icon
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-200 ${
                isFocused ? 'text-[#C9A962]' : 'text-[#6B6B6B]'
              }`}
            />
          )}

          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              onBlur && onBlur();
            }}
            disabled={disabled}
            className={`w-full h-[52px] bg-[#FEFEFE] border rounded-[10px] pl-12 pr-4 font-inter text-base text-[#1E1E1E] placeholder:text-[#6B6B6B] transition-all duration-200 outline-none ${
              error
                ? 'border-[#E24B4B] shadow-[0_0_0_3px_rgba(226,75,75,0.12)]'
                : isFocused
                ? 'border-[#C9A962] shadow-input-focus'
                : 'border-[#E5DDD1]'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
              isPassword ? 'pr-12' : ''
            }`}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B6B] hover:text-[#1E1E1E] transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="mt-1.5 text-[13px] text-[#E24B4B] font-inter animate-slide-down">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';

export default InputField;