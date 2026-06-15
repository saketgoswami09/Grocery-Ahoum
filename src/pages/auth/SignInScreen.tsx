import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function SignInScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [countryCode] = useState('+880');

  const handleContinue = () => {
    if (phone.trim().length >= 7) {
      navigate('/number', { state: { phone: countryCode + phone, countryCode } });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top illustration area — replace with your actual image */}
      <div className="relative h-56 bg-linear-to-br from-gray-lightest via-white to-primary/5 overflow-hidden flex items-center justify-center">
        <img
          src="/images/signin-grocery.png"
          alt="Groceries illustration"
          className="relative z-10 w-48 h-48 object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 pb-10 max-w-md mx-auto w-full animate-slide-up">
        <h1 className="text-[26px] font-bold text-dark mb-2 leading-tight">
          Get your groceries<br />with nectar
        </h1>

        {/* Phone input */}
        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 border-b-2 border-gray-lighter focus-within:border-primary transition-colors pb-3">
            <button className="flex items-center gap-1.5 shrink-0 text-dark">
              <span className="text-xl">🇧🇩</span>
              <span className="text-sm font-semibold">{countryCode}</span>
            </button>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              placeholder="Enter your mobile number"
              className="flex-1 text-base text-dark placeholder:text-gray-light outline-none bg-transparent"
              autoComplete="tel"
              id="signin-phone"
            />
          </div>
        </div>

        {/* Social login separator */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-lighter" />
          <span className="text-xs text-gray font-medium">Or connect with</span>
          <div className="flex-1 h-px bg-gray-lighter" />
        </div>

        {/* Social buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <button
            className="w-full flex items-center justify-center gap-3 bg-[#4285F4] text-white font-semibold py-3.5 rounded-lg hover:bg-[#3574d4] active:scale-[0.98] transition-all shadow-sm"
            id="signin-google"
          >
            <img src="/icons/google.png" alt="Google" className="w-5 h-5" onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/475656/google-color.svg'; }} />
            Continue with Google
          </button>

          <button
            className="w-full flex items-center justify-center gap-3 bg-[#4267B2] text-white font-semibold py-3.5 rounded-[var(--radius-lg)] hover:bg-[#375694] active:scale-[0.98] transition-all shadow-sm"
            id="signin-facebook"
          >
            <img src="/icons/facebook.png" alt="Facebook" className="w-5 h-5" onError={(e) => { (e.target as HTMLImageElement).src = 'https://www.svgrepo.com/show/475647/facebook-color.svg'; }} />
            Continue with Facebook
          </button>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          disabled={phone.trim().length < 7}
          className="w-full bg-primary text-white font-semibold py-4 rounded-lg hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center gap-2"
          id="signin-continue"
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-center gap-1 text-sm text-gray">
          <span>Already have an account?</span>
          <Link to="/login" className="text-primary font-semibold hover:underline">Log In</Link>
        </div>
      </div>
    </div>
  );
}
