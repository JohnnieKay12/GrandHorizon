import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import AuthLayout from '../components/AuthLayout';
import AuthCard from '../components/AuthCard';
import RoleToggle from '../components/RoleToggle';
import Toast from '../components/Toast';
import Divider from '../components/Divider';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';
import { Shield, Mail, Lock } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { googleLogin, login, isAuthenticated, isAdmin } = useAuth();

  const redirect = searchParams.get('redirect'); // ✅ get redirect

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('login_role') || 'user';
  });

  useEffect(() => {
    localStorage.setItem('login_role', activeRole);
  }, [activeRole]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // ✅ CENTRAL REDIRECT LOGIC
  const handleRedirect = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      navigate(redirect ? `/${redirect}` : '/my-bookings');
    }
  };

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      handleRedirect();
    }
  }, [isAuthenticated]);

  // ✅ ADMIN LOGIN
  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({ message: 'Email and password required', type: 'error' });
      return;
    }

    setIsLoading(true);

    const res = await login(email, password);

    setIsLoading(false);

    if (res.success) {
      if (res.user?.role !== 'admin') {
        setToast({ message: 'Access denied: Not an admin', type: 'error' });
        return;
      }

      setToast({ message: 'Admin login successful', type: 'success' });

      navigate('/admin');
    } else {
      setToast({ message: res.message, type: 'error' });
    }
  };

  // ✅ GOOGLE LOGIN (USER)
  const handleGoogleSuccess = async (credentialResponse) => {
    if (activeRole === 'admin') {
      setToast({ message: 'Admin must login with email/password', type: 'error' });
      return;
    }

    setIsLoading(true);
    setToast({ message: 'Connecting to Google...', type: 'loading' });

    const result = await googleLogin(credentialResponse.credential);

    setIsLoading(false);
    setToast(null);

    if (result.success) {
      setToast({ message: 'Login successful!', type: 'success' });

      // ✅ REDIRECT AFTER GOOGLE LOGIN
      setTimeout(() => {
        navigate(redirect ? `/${redirect}` : '/my-bookings');
      }, 800);
    } else {
      setToast({ message: result.message, type: 'error' });
    }
  };

  const handleGoogleError = () => {
    setToast({ message: 'Google login failed', type: 'error' });
  };

  return (
    <AuthLayout isAdmin={activeRole === 'admin'}>
      <AuthCard isAdmin={activeRole === 'admin'}>

        {/* Header */}
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

        {/* Role Toggle */}
        <RoleToggle activeRole={activeRole} onChange={setActiveRole} />

        {/* USER LOGIN */}
        {activeRole === 'user' && (
          <>
            <Divider />

            <div className="mt-6 flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="outline"
                size="large"
                width="320"
                text="continue_with"
              />
            </div>
          </>
        )}

        {/* ADMIN LOGIN */}
        {activeRole === 'admin' && (
          <form onSubmit={handleAdminLogin} className="mt-6">
            <InputField
              label="Admin Email"
              type="email"
              placeholder="admin@havenhotels.com"
              icon={Mail}
              value={email}
              onChange={setEmail}
              disabled={isLoading}
            />

            <div className="mt-5">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter password"
                icon={Lock}
                value={password}
                onChange={setPassword}
                disabled={isLoading}
              />
            </div>

            <div className="mt-6">
              <PrimaryButton type="submit" isLoading={isLoading}>
                Access Dashboard
              </PrimaryButton>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-primary-900 hover:text-primary-800"
          >
            Back to hotel
          </button>
        </div>

      </AuthCard>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </AuthLayout>
  );
}