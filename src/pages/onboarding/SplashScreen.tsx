import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import nectar from "@/assets/icons/logo.png";
import Carrot from "@/assets/icons/white-carrot.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, onboardingComplete } = useAuthStore();

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline()
        .from(logoRef.current, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          delay: 1.2,
        })
        .call(() => {
          if (isAuthenticated) navigate("/home", { replace: true });
          else if (onboardingComplete) navigate("/signin", { replace: true });
          else navigate("/onboarding", { replace: true });
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#53B175] flex flex-col items-center justify-center"
    >
    <div ref={logoRef} className="flex items-center gap-3">
        <img src={Carrot} alt="Nectar logo" />
        <div className="text-center">
          <img src={nectar} alt="Nectar" />
          <p className="text-white/70 text-sm   mt-0.5 tracking-[0.35em] font-light  ">
            online groceries
          </p>
        </div>
      </div>
    </div>
  );
}
