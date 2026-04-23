import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authAPI } from '../services/api';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import RoleToggle from '../components/RoleToggle';
import Toast from '../components/Toast';
import PasswordStrength from '../components/PasswordStrength';
import Divider from '../components/Divider';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock } from 'lucide-react';


export default function Register() {
  const navigate = useNavigate();
  const { register, googleLogin, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/my-bookings');
    }
  }, [isAuthenticated, navigate]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Please enter your full name';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else {
      if (password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password = 'Password must contain at least one uppercase letter';
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = 'Password must contain at least one number';
      }
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to continue';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    setIsLoading(true);
  
    try {
      const res = await authAPI.register({
        name: name.trim(),
        email: email.trim(),
        password,
      });
  
      alert("Account created successfully");
      navigate("/login");
  
    } catch (err) {
      console.error(err);
      alert(err.message || "Registration failed");
    }
  
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setToast({ message: 'Signing up with Google...', type: 'loading' });

    const result = await googleLogin(credentialResponse.credential);

    setIsLoading(false);
    setToast(null);

    if (result.success) {
      setToast({ message: 'Account created with Google!', type: 'success' });
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const handleGoogleError = () => {
    setToast({ message: 'Google sign-up failed. Please try again.', type: 'error' });
  };

  return (
    <AuthLayout>
      <AuthCard>
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-playfair text-[32px] text-[#1E1E1E] mb-2">Join <span className='text-primary-900'>Grand</span><span className="text-gold-400">Horizon</span></h1>
          <p className="text-[#6B6B6B] font-inter text-base">
            Create your account to start booking
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="mb-4 p-3 bg-[#FDE8E8] border border-[#E24B4B] rounded-lg">
              <p className="text-sm text-[#E24B4B] font-inter">{errors.general}</p>
            </div>
          )}

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

          <div className="mt-5">
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
          </div>

          <div className="mt-5">
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

          <div className="mt-5">
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              icon={Lock}
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              disabled={isLoading}
            />
          </div>

          {/* Terms Checkbox */}
          <div className="mt-5">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={isLoading}
                className="mt-0.5 w-4 h-4 rounded border-[#E5DDD1] text-[#C9A962] focus:ring-[#C9A962] focus:ring-offset-0"
              />
              <span className="text-sm text-[#6B6B6B] font-inter leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-[#C9A962] font-medium hover:text-[#B8942F] transition-colors">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button type="button" className="text-[#C9A962] font-medium hover:text-[#B8942F] transition-colors">
                  Privacy Policy
                </button>
              </span>
            </label>
            {errors.terms && (
              <p className="mt-1.5 text-[13px] text-[#E24B4B] font-inter animate-slide-down">
                {errors.terms}
              </p>
            )}
          </div>

          <div className="mt-6">
            <PrimaryButton type="submit" isLoading={isLoading} disabled={isLoading}>
              Create Account
            </PrimaryButton>
          </div>
        </form>

        <Divider />

        <div className="relative">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            theme="outline"
            size="large"
            width="100%"
            text="signup_with"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#6B6B6B] font-inter">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-[#C9A962] font-medium hover:text-[#B8942F] transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </AuthCard>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AuthLayout>
  );
}
