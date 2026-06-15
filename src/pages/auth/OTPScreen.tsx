import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { ChevronLeft, XCircle, Loader2 } from "lucide-react";

export default function OTPScreen() {
  const navigate = useNavigate();
  const { verifyOtp, sendOtp, isLoading, user } = useAuthStore();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => setResendTimer((p) => p - 1), 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
    if (value && index === 3) {
      const code = [...newOtp.slice(0, 3), value.slice(-1)].join("");
      if (code.length === 4) handleVerify(code);
    }
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (!pasted.length) return;
    const newOtp = [...otp];
    for (let i = 0; i < pasted.length && i < 4; i++) newOtp[i] = pasted[i];
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 3)]?.focus();
    if (pasted.length === 4) handleVerify(pasted);
  };

  const handleVerify = async (code?: string) => {
    const c = code || otp.join("");
    if (c.length !== 4) {
      setError("Please enter the complete code");
      return;
    }
    setError("");
    const ok = await verifyOtp(c);
    if (ok) navigate("/location", { replace: true });
    else {
      setError("Invalid verification code");
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !user?.phone) return;
    await sendOtp(user.phone);
    setResendTimer(30);
    setOtp(["", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-6 pb-10 max-w-md mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="self-start w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-lightest transition-colors mb-8"
        aria-label="Go back"
        id="otp-back-btn"
      >
        <ChevronLeft className="w-5 h-5 text-dark" />
      </button>
      <h1 className="text-[24px] font-bold text-dark mb-2">
        Enter your 4-digit code
      </h1>
      <p className="text-gray text-sm mb-10">
        Code sent to{" "}
        <span className="font-semibold text-dark">
          {user?.phone || "+880 1700 ***"}
        </span>
      </p>
      <div className="flex gap-4 justify-center mb-8">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            className={`w-16 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-all duration-200 outline-none bg-transparent ${digit ? "border-primary bg-primary/5 shadow-sm" : error ? "border-error/40" : "border-gray-lighter focus:border-primary"}`}
            aria-label={`Digit ${i + 1}`}
            id={`otp-digit-${i + 1}`}
          />
        ))}
      </div>
      {error && (
        <p className="text-error text-sm text-center mb-4 animate-fade-in flex items-center justify-center gap-1.5">
          <XCircle className="w-4 h-4" />
          {error}
        </p>
      )}
      <button
        onClick={() => handleVerify()}
        disabled={isLoading || otp.some((d) => !d)}
        className="w-full bg-primary text-white font-semibold py-4 rounded-[var(--radius-lg)] hover:bg-primary-dark active:scale-[0.98] transition-all shadow-button disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        id="otp-verify-btn"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
      </button>
      <div className="mt-6 text-center">
        {resendTimer > 0 ? (
          <p className="text-sm text-gray">
            Resend code in{" "}
            <span className="font-semibold text-primary">{resendTimer}s</span>
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-sm text-primary font-semibold hover:underline transition-colors"
            id="otp-resend-btn"
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
}
