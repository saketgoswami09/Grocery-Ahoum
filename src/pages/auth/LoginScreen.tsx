import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Eye, EyeOff, AlertCircle, Loader2, Carrot } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields'); return; }
    const success = await login(email, password);
    if (success) navigate('/home', { replace: true });
    else setError('Invalid email or password');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top decoration */}
      <div className="relative h-52 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/3 to-transparent" />
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-primary/10 blur-xl" />
        <div className="absolute bottom-4 left-6 w-20 h-20 rounded-full bg-secondary/10 blur-lg" />
        {/* Logo icon */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-card">
            <Carrot className="w-7 h-7 text-primary" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pt-6 pb-10 max-w-md mx-auto w-full animate-slide-up">
        <h1 className="text-[26px] font-bold text-dark mb-1">Log In</h1>
        <p className="text-gray text-sm mb-8">Enter your email and password</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-email" className="text-sm font-semibold text-gray-dark">Email</label>
            <input id="login-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="imshuvo97@gmail.com" autoComplete="email"
              className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="login-password" className="text-sm font-semibold text-gray-dark">Password</label>
            <div className="relative">
              <input id="login-password" type={showPassword ? 'text' : 'password'} value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Enter your password" autoComplete="current-password"
                className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent pr-10" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray hover:text-primary transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="text-right -mt-2">
            <button type="button" className="text-sm text-gray hover:text-primary transition-colors">Forgot Password?</button>
          </div>

          {error && <p className="text-error text-sm text-center animate-fade-in flex items-center justify-center gap-1.5"><AlertCircle className="w-4 h-4" />{error}</p>}

          <button type="submit" disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            id="login-submit-btn">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray mt-6">
          Don&apos;t have an account?{' '}<Link to="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
