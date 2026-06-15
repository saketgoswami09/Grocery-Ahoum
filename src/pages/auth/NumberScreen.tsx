import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ChevronLeft, ChevronRight,  Loader2 } from 'lucide-react';

export default function OtpScreen() {
  const navigate = useNavigate();
  const { verifyOtp, sendOtp, isLoading } = useAuthStore();
  
  // State for holding exactly up to 4 digits
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(false);

  const handleKeyPress = (key: string) => {
    if (isLoading) return;
    setError(false);

    if (key === 'delete') {
      setOtp((prev) => prev.slice(0, -1));
    } else if (key === 'clear') {
      setOtp('');
    } else if (otp.length < 4) {
      setOtp((prev) => prev + key);
    }
  };

  const handleVerify = async () => {
    if (otp.length < 4 || isLoading) return;

    const success = await verifyOtp(otp);
    if (success) {
      // Navigate to location setup or home on successful verification
      navigate('/location', { replace: true });
    } else {
      setError(true);
      setOtp(''); // Reset on failure
    }
  };

  const handleResend = async () => {
    if (isLoading) return;
    // Call store's sendOtp method (pass empty or saved number if needed)
    await sendOtp('');
    alert("Verification code resent!");
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'delete'];

  return (
    <div className="min-h-screen bg-white flex flex-col max-w-md mx-auto relative">
      
      {/* ─── Top Navigation ─── */}
      <div className="px-5 pt-6">
        <button
          onClick={() => navigate(-1)}
          disabled={isLoading}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-lightest transition-colors"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6 text-dark" />
        </button>
      </div>

      {/* ─── Header Sections ─── */}
      <div className="px-6 pt-6 pb-4">
        <h1 className="text-2xl font-bold text-dark mb-6">Enter your 4-digit code</h1>
        <label className="text-gray-dark text-base font-semibold block mb-2">Code</label>
        
        {/* ─── Figma Dash Input Slots ─── */}
        <div className="flex items-center gap-4 py-2 border-b border-gray-lighter max-w-xs">
          {Array.from({ length: 4 }).map((_, index) => {
            const digit = otp[index];
            return (
              <span
                key={index}
                className={`w-6 text-center text-xl font-bold tracking-widest h-7 border-b-2 ${
                  digit 
                    ? 'border-dark text-dark' 
                    : error 
                      ? 'border-red-500 text-red-500' 
                      : 'border-transparent text-gray-light'
                }`}
              >
                {digit || '-'}
              </span>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-xs mt-2">Incorrect code. Please try again.</p>}
      </div>

      {/* Flexible Spacer pushing control bar down */}
      <div className="flex-1" />

      {/* ─── Control Bar (Resend & Next Circular FAB) ─── */}
      <div className="px-6 flex items-center justify-between pb-4">
        <button
          onClick={handleResend}
          disabled={isLoading}
          className="text-primary font-medium text-base hover:text-primary-dark transition-colors disabled:opacity-50"
        >
          Resend Code
        </button>

        {/* Floating Circular Trigger Arrow */}
        <button
          onClick={handleVerify}
          disabled={otp.length < 4 || isLoading}
          className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all"
          aria-label="Verify OTP"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <ChevronRight className="w-7 h-7" strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* ─── Custom Numpad Keyboard ─── */}
      <div className="px-4 pb-6 bg-gray-lightest/30 pt-2 border-t border-gray-lightest">
        <div className="grid grid-cols-3 gap-1">
          {keys.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              disabled={isLoading}
              className={`h-14 rounded-xl flex items-center justify-center text-xl font-semibold transition-all ${
                key === 'clear'
                  ? 'text-gray text-sm font-medium hover:bg-gray-lightest'
                  : key === 'delete'
                  ? 'text-gray hover:bg-gray-lightest'
                  : 'text-dark hover:bg-gray-lightest active:bg-primary/10 active:scale-95'
              }`}
            >
              {key === 'delete' ? (
                <ChevronLeft className="w-5 h-5" />
              ) : key === 'clear' ? (
                'Clear'
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}