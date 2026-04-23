function getStrength(password) {
  if (!password) return { level: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { level: 1, label: 'Weak', color: '#E24B4B' };
  if (score === 3) return { level: 2, label: 'Fair', color: '#F5A623' };
  if (score === 4) return { level: 3, label: 'Good', color: '#F5D623' };
  return { level: 4, label: 'Strong', color: '#4CAF50' };
}

export default function PasswordStrength({ password }) {
  if (!password) return null;

  const { level, label, color } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex-1 h-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= level ? color : '#E5DDD1',
            }}
          />
        ))}
      </div>
      <p className="text-xs font-inter" style={{ color }}>
        {label}
      </p>
    </div>
  );
}