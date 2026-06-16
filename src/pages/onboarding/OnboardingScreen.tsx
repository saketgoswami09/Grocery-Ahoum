import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import mobileHero from "@/assets/icons/HERO.png";
import desktopHero from "@/assets/liuba-bilyk-kDpv12ozDVY-unsplash.jpg";

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);

  const handleGetStarted = () => {
    completeOnboarding();
    navigate("/number", { replace: true });
  };

  return (
    <div className="fixed inset-0 flex flex-col lg:flex-row bg-white">
      {/* Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end px-6 pb-10 text-center bg-linear-to-t from-black/80 via-gray/40 to-transparent lg:relative lg:w-[420px] lg:bg-white lg:text-left lg:items-start lg:justify-center lg:px-12">
        <h1 className="text-4xl font-bold text-white lg:text-dark leading-tight mb-3">
          Welcome
          <br />
          to our store
        </h1>

        <p className="text-white/80 lg:text-gray mb-8 max-w-xs">
          Get your groceries in as fast as one hour
        </p>

        <button
          onClick={handleGetStarted}
          className="w-full max-w-sm lg:max-w-65 bg-primary text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-primary-dark transition"
        >
          Get Started
        </button>
      </div>

      {/* Image */}
      <div className="relative h-screen">
        {/* Mobile */}
        <img
          src={mobileHero}
          alt="Hero"
          className="block lg:hidden w-full h-full object-cover"
        />

        {/* Desktop */}
        <img
          src={desktopHero}
          alt="Hero"
          className="hidden lg:block w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
