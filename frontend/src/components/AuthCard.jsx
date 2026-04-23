export default function AuthCard({ children, isAdmin = false }) {
  return (
    <div
      className={`glass-card rounded-2xl p-8 sm:p-12 w-full transition-all duration-300 hover:shadow-card-hover ${
        isAdmin ? 'border-l-4 border-l-[#C9A962]' : ''
      }`}
    >
      {children}
    </div>
  );
}