import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import Toast from '../components/Toast';
import PasswordStrength from '../components/PasswordStrength';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/my-bookings');
    }
  }, [isAuthenticated]);

  // ✅ validation
  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        newErrors.password = 'Minimum 8 characters required';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Must include an uppercase letter';
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Must include a number';
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    const res = await register(
      name.trim(),
      email.trim(),
      password
    );

    setIsLoading(false);

    if (!res.success) {
      setToast({
        message: res.message || 'Registration failed',
        type: 'error',
      });
      return;
    }

    setToast({
      message: 'Account created successfully!',
      type: 'success',
    });

    // ✅ auto redirect after signup
    setTimeout(() => {
      navigate('/my-bookings');
    }, 800);
  };

  return (
    <AuthLayout>
      <AuthCard>

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="font-playfair text-[32px] text-[#1E1E1E] mb-2">
            Create Account
          </h1>

          <p className="text-[#6B6B6B]">
            Start booking your perfect stay
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <InputField
            label="Full Name"
            type="text"
            placeholder="John Doe"
            icon={User}
            value={name}
            onChange={setName}
            error={errors.name}
            disabled={isLoading}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            icon={Mail}
            value={email}
            onChange={setEmail}
            error={errors.email}
            disabled={isLoading}
          />

          <div>
            <InputField
              label="Password"
              type="password"
              placeholder="Create a password"
              icon={Lock}
              value={password}
              onChange={setPassword}
              error={errors.password}
              disabled={isLoading}
            />
            <PasswordStrength password={password} />
          </div>

          <InputField
            label="Confirm Password"
            type="password"
            placeholder="Repeat password"
            icon={Lock}
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
            disabled={isLoading}
          />

          <PrimaryButton type="submit" isLoading={isLoading}>
            Create Account
          </PrimaryButton>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-sm text-[#6B6B6B]">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#C9A962] font-medium hover:text-[#B8942F]"
          >
            Sign in
          </button>
        </div>

      </AuthCard>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </AuthLayout>
  );
}