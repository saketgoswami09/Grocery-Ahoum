import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Carrot } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import herobg from "@/assets/icons/HERO.png";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(
          imageRef.current,
          { scale: 1.08, duration: 1.4, ease: "power2.out" },
          0,
        )
        .from(overlayRef.current, { opacity: 0, duration: 0.8 }, 0)
        .from(
          iconRef.current,
          { opacity: 0, y: 12, duration: 0.5, ease: "power3.out" },
          0.25,
        )
        .from(
          [line1Ref.current, line2Ref.current],
          { yPercent: 100, duration: 0.7, stagger: 0.08, ease: "power4.out" },
          0.35,
        )
        .from(
          subtitleRef.current,
          { opacity: 0, y: 10, duration: 0.5, ease: "power3.out" },
          0.7,
        )
        .from(
          buttonRef.current,
          { opacity: 0, y: 16, duration: 0.5, ease: "power3.out" },
          0.8,
        );
    },
    { scope: containerRef },
  );

  const handleGetStarted = () => {
    completeOnboarding();
    navigate("/signin", { replace: true });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-primary flex flex-col overflow-hidden"
    >
      <img
        ref={imageRef}
        src={herobg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        ref={overlayRef}
        className="absolute inset-0 flex flex-col items-center justify-end text-center p-6 pb-10 bg-linear-to-t from-black/70 via-black/20 to-transparent"
      >
        <div ref={iconRef}>
          <Carrot className="w-10 h-10 text-white mb-4" strokeWidth={2} />
        </div>

        <h1 className="text-[28px] font-bold text-white leading-tight mb-2">
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block">
              Welcome
            </span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block">
              to our store
            </span>
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-white/70 text-sm mb-8 max-w-[240px] mx-auto"
        >
          Get your groceries in as fast as one hour
        </p>

        <button
          ref={buttonRef}
          onClick={handleGetStarted}
          className="w-full max-w-sm bg-primary text-white font-bold py-4 rounded-[var(--radius-lg)] hover:bg-primary/90 active:scale-[0.98] transition-all shadow-lg text-base mb-4"
          id="onboarding-get-started"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
