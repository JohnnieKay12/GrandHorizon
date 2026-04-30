import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import RoleToggle from '../components/RoleToggle';
import Toast from '../components/Toast';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { login, isAuthenticated, isAdmin } = useAuth();

  const redirect = searchParams.get('redirect');

  const [activeRole, setActiveRole] = useState(
    () => localStorage.getItem('login_role') || 'user'
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ persist role
  useEffect(() => {
    localStorage.setItem('login_role', activeRole);
  }, [activeRole]);

  // ✅ redirect after login
  const handleRedirect = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate(redirect ? `/${redirect}` : '/my-bookings');
    }
  };

  // ✅ auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      handleRedirect();
    }
  }, [isAuthenticated]);

  // ✅ UNIVERSAL LOGIN (USER + ADMIN)
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({ message: 'Email and password are required', type: 'error' });
      return;
    }

    setIsLoading(true);

    const res = await login(email, password);

    setIsLoading(false);

    if (!res.success) {
      setToast({ message: res.message || 'Login failed', type: 'error' });
      return;
    }

    // ✅ ADMIN CHECK
    if (activeRole === 'admin' && res.user?.role !== 'admin') {
      setToast({ message: 'Access denied: Not an admin', type: 'error' });
      return;
    }

    setToast({ message: 'Login successful!', type: 'success' });

    setTimeout(() => {
      handleRedirect();
    }, 600);
  };

  return (
    <AuthLayout isAdmin={activeRole === 'admin'}>
      <AuthCard isAdmin={activeRole === 'admin'}>

        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="font-playfair text-[32px] text-[#1E1E1E] mb-2">
            {activeRole === 'admin' ? 'Staff Portal' : 'Welcome Back'}
          </h1>

          <p className="text-[#6B6B6B]">
            {activeRole === 'admin'
              ? 'Authorized personnel only'
              : 'Login to continue your booking'}
          </p>

          {activeRole === 'admin' && (
            <Shield className="mx-auto mt-2 text-[#C9A962]" />
          )}
        </div>

        {/* ROLE TOGGLE */}
        <RoleToggle activeRole={activeRole} onChange={setActiveRole} />

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <InputField
            label={activeRole === 'admin' ? 'Admin Email' : 'Email Address'}
            type="email"
            placeholder="your@email.com"
            icon={Mail}
            value={email}
            onChange={setEmail}
            disabled={isLoading}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={Lock}
            value={password}
            onChange={setPassword}
            disabled={isLoading}
          />

          <PrimaryButton type="submit" isLoading={isLoading}>
            {activeRole === 'admin' ? 'Access Dashboard' : 'Login'}
          </PrimaryButton>
        </form>

        {/* FOOTER */}
        {activeRole === 'user' && (
          <div className="mt-6 text-center text-sm text-[#6B6B6B]">
            Don’t have an account?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-[#C9A962] font-medium hover:text-[#B8942F]"
            >
              Create one
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-primary-900 hover:text-primary-800 text-sm"
          >
            Back to hotel
          </button>
        </div>

      </AuthCard>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </AuthLayout>
  );
}