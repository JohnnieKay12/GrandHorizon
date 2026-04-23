import { User, Shield } from 'lucide-react';

export default function RoleToggle({ activeRole, onChange }) {
  return (
    <div className="h-12 bg-[#F5F0E8] rounded-[10px] p-1 flex items-center">
      
      <button
        type="button"
        onClick={() => onChange('user')}
        className={`flex-1 h-full flex items-center justify-center gap-2 rounded-lg font-inter text-sm font-medium transition-all duration-250 ${
          activeRole === 'user'
            ? 'bg-[#FEFEFE] text-[#1E1E1E] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
            : 'text-[#6B6B6B] hover:text-[#1E1E1E]'
        }`}
      >
        <User className="w-4 h-4" />
        Guest Access
      </button>

      <button
        type="button"
        onClick={() => onChange('admin')}
        className={`flex-1 h-full flex items-center justify-center gap-2 rounded-lg font-inter text-sm font-medium transition-all duration-250 ${
          activeRole === 'admin'
            ? 'bg-[#FEFEFE] text-[#1E1E1E] shadow-[0_2px_8px_rgba(0,0,0,0.08)]'
            : 'text-[#6B6B6B] hover:text-[#1E1E1E]'
        }`}
      >
        <Shield className="w-4 h-4" />
        Staff Portal
      </button>

    </div>
  );
}