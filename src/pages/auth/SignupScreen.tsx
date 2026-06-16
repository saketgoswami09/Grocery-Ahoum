import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Eye, EyeOff, AlertCircle, Loader2, Carrot } from 'lucide-react';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuthStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) { setError('Please fill in all fields'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return; }
    const ok = await signup(name, email, phone, password);
    if (ok) navigate('/otp', { replace: true });
    else setError('Something went wrong. Please try again.');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-primary/3 to-transparent" />
        <div className="absolute -top-6 -left-8 w-32 h-32 rounded-full bg-primary/10 blur-xl" />
        <div className="absolute bottom-6 right-8 w-18 h-18 rounded-full bg-secondary/10 blur-lg" />
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <div className="w-13 h-13 bg-white rounded-2xl flex items-center justify-center shadow-card p-3">
            <Carrot className="w-7 h-7 text-primary" />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 pt-5 pb-10 max-w-md mx-auto w-full animate-slide-up">
        <h1 className="text-[26px] font-bold text-dark mb-1">Sign Up</h1>
        <p className="text-gray text-sm mb-6">Enter your credentials to continue</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="su-name" className="text-sm font-semibold text-gray-dark">Username</label>
            <input id="su-name" type="text" value={name} onChange={(e) => { setName(e.target.value); setError(''); }}
              placeholder="Enter your name" autoComplete="name"
              className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="su-email" className="text-sm font-semibold text-gray-dark">Email</label>
            <input id="su-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="imshuvo97@gmail.com" autoComplete="email"
              className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="su-phone" className="text-sm font-semibold text-gray-dark">Phone Number</label>
            <input id="su-phone" type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setError(''); }}
              placeholder="+880 1700 000 000" autoComplete="tel"
              className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="su-pw" className="text-sm font-semibold text-gray-dark">Password</label>
            <div className="relative">
              <input id="su-pw" type={showPw ? 'text' : 'password'} value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }} placeholder="Create a password" autoComplete="new-password"
                className="w-full border-b-2 border-gray-lighter py-3 text-dark placeholder:text-gray-light focus:border-primary transition-colors outline-none bg-transparent pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray hover:text-primary transition-colors" aria-label="Toggle password">
                {showPw ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <p className="text-xs text-gray leading-relaxed">
            By continuing you agree to our <span className="text-primary font-semibold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary font-semibold cursor-pointer hover:underline">Privacy Policy</span>.
          </p>
          {error && <p className="text-error text-sm text-center animate-fade-in flex items-center justify-center gap-1.5"><AlertCircle className="w-4 h-4" />{error}</p>}
          <button type="submit" disabled={isLoading}
            className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-1"
            id="signup-submit-btn">
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign Up'}
          </button>
        </form>
        <p className="text-center text-sm text-gray mt-5">Already have an account? <Link to="/login" className="text-primary font-semibold hover:underline">Log In</Link></p>
      </div>
    </div>
  );
}
