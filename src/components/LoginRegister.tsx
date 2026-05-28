import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

interface LoginRegisterProps {
  T: any;
  t: any;
  onSuccess: (email: string, name: string) => void;
}

export default function LoginRegister({ T, t, onSuccess }: LoginRegisterProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'fair' | 'good' | 'strong'>('weak');

  const calculatePasswordStrength = (pwd: string) => {
    if (pwd.length < 8) return 'weak';
    if (pwd.length < 12) return 'fair';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^a-zA-Z0-9]/.test(pwd)) return 'strong';
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 'good';
    return 'fair';
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    if (mode === 'signup') {
      setPasswordStrength(calculatePasswordStrength(pwd));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    // Mock auth - simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock successful auth
      const displayName = mode === 'signup' ? name : email.split('@')[0];
      onSuccess(email, displayName);
    }, 800);
  };

  const getPasswordStrengthColor = () => {
    const strengthColors = {
      weak: T.danger || '#FF5B8A',
      fair: T.warning || '#FF8A3D',
      good: T.info || '#3AA0FF',
      strong: T.success || '#00C896',
    };
    return strengthColors[passwordStrength];
  };

  const getPasswordStrengthLabel = () => {
    const labels = { weak: 'Weak', fair: 'Fair', good: 'Good', strong: 'Strong' };
    return labels[passwordStrength];
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
      style={{ backgroundColor: T.bg0 }}
    >
      {/* Gradient background accent */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: T.accent }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: T.accent }}
      />

      {/* Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2 transition-colors duration-300"
            style={{ color: T.txt0 }}
          >
            Fixeth
          </h1>
          <p style={{ color: T.txt1 }} className="text-sm">
            {mode === 'signin'
              ? 'Welcome back. Continue your learning journey.'
              : 'Start learning today. Build your future.'}
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-8 shadow-xl backdrop-blur-sm border transition-colors duration-300"
          style={{
            backgroundColor: T.bg1,
            borderColor: T.border,
          }}
        >
          {/* Mode Tabs */}
          <div className="flex gap-1 mb-6 bg-opacity-50 rounded-lg p-1" style={{ backgroundColor: T.bg0 }}>
            <button
              onClick={() => {
                setMode('signin');
                setError('');
                setName('');
                setConfirmPassword('');
              }}
              className="flex-1 py-2 px-3 rounded-md font-medium transition-all duration-200 text-sm"
              style={{
                backgroundColor: mode === 'signin' ? T.accent : 'transparent',
                color: mode === 'signin' ? T.accentTxt || '#fff' : T.txt1,
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('signup');
                setError('');
              }}
              className="flex-1 py-2 px-3 rounded-md font-medium transition-all duration-200 text-sm"
              style={{
                backgroundColor: mode === 'signup' ? T.accent : 'transparent',
                color: mode === 'signup' ? T.accentTxt || '#fff' : T.txt1,
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {mode === 'signup' && (
              <div>
                <label
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: T.txt0 }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: T.bg0,
                    borderColor: error && !name ? T.danger : T.border,
                    color: T.txt0,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = T.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                  }}
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 transition-colors duration-300"
                style={{ color: T.txt0 }}
              >
                Email
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-3.5 pointer-events-none transition-colors duration-300"
                  style={{ color: T.txt1 }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: T.bg0,
                    borderColor: error && !validateEmail(email) && email ? T.danger : T.border,
                    color: T.txt0,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = T.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                  }}
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                className="block text-sm font-medium mb-2 transition-colors duration-300"
                style={{ color: T.txt0 }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-3.5 pointer-events-none transition-colors duration-300"
                  style={{ color: T.txt1 }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full pl-10 pr-10 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: T.bg0,
                    borderColor: error && password.length < 8 && password ? T.danger : T.border,
                    color: T.txt0,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = T.accent;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = T.border;
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 transition-colors duration-200"
                  style={{ color: T.txt1 }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Password strength indicator (signup only) */}
              {mode === 'signup' && password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-opacity-30 rounded-full overflow-hidden" style={{ backgroundColor: T.border }}>
                    <div
                      className="h-full transition-all duration-200"
                      style={{
                        width: passwordStrength === 'weak' ? '25%' : passwordStrength === 'fair' ? '50%' : passwordStrength === 'good' ? '75%' : '100%',
                        backgroundColor: getPasswordStrengthColor(),
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-medium"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm password field (signup only) */}
            {mode === 'signup' && (
              <div>
                <label
                  className="block text-sm font-medium mb-2 transition-colors duration-300"
                  style={{ color: T.txt0 }}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-3.5 pointer-events-none transition-colors duration-300"
                    style={{ color: T.txt1 }}
                  />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: T.bg0,
                      borderColor:
                        error && confirmPassword && password !== confirmPassword
                          ? T.danger
                          : confirmPassword && password === confirmPassword
                            ? T.success || '#00C896'
                            : T.border,
                      color: T.txt0,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = T.accent;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor =
                        confirmPassword && password === confirmPassword
                          ? T.success || '#00C896'
                          : T.border;
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3.5 transition-colors duration-200"
                    style={{ color: T.txt1 }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {confirmPassword && password === confirmPassword && (
                    <Check
                      size={18}
                      className="absolute right-10 top-3.5 pointer-events-none transition-colors duration-200"
                      style={{ color: T.success || '#00C896' }}
                    />
                  )}
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div
                className="px-4 py-3 rounded-lg text-sm border"
                style={{
                  backgroundColor: T.dangerBg || 'rgba(255, 91, 138, 0.1)',
                  borderColor: T.danger,
                  color: T.danger,
                }}
              >
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg disabled:opacity-70"
              style={{
                backgroundColor: T.accent,
                color: T.accentTxt || '#fff',
              }}
            >
              {loading ? (
                <div
                  className="w-5 h-5 border-2 border-opacity-30 border-current rounded-full animate-spin"
                  style={{ borderTopColor: 'currentColor' }}
                />
              ) : (
                <>
                  {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs mt-6 transition-colors duration-300" style={{ color: T.txt1 }}>
            {mode === 'signin' ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className="font-medium transition-colors duration-200 hover:underline"
                  style={{ color: T.accent }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                  className="font-medium transition-colors duration-200 hover:underline"
                  style={{ color: T.accent }}
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Demo note */}
        <p className="text-center text-xs mt-6 transition-colors duration-300" style={{ color: T.txt1 }}>
          Demo mode: Use any email to sign in/up
        </p>
      </div>
    </div>
  );
}
