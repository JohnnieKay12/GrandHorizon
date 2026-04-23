export default function Divider({ text = 'or' }) {
  return (
    <div className="flex items-center my-6">
      <div className="flex-1 h-px bg-primary-900" />
      <span className="px-4 text-[13px] text-[#6B6B6B] font-inter">
        {text}
      </span>
      <div className="flex-1 h-px bg-primary-900" />
    </div>
  );
}