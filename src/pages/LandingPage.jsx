import { useEffect } from "react";
import { useUser } from "@clerk/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AuthHeaderControls from "../components/AuthHeaderControls";
import GrainOverlay from "../components/GrainOverlay";
import LegalPolicyLinks from "../components/LegalPolicyLinks";

export default function LandingPage() {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo");

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      return;
    }

    if (returnTo) {
      navigate(returnTo, { replace: true });
      return;
    }

    navigate("/dashboard", { replace: true });
  }, [isLoaded, isSignedIn, navigate, returnTo]);

  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
      <GrainOverlay variant="grain" />

      <header className="fixed top-0 left-0 w-full z-40 bg-[#0e0e0e]/80 backdrop-blur-xl flex justify-between items-center px-4 sm:px-5 md:px-8 py-3 md:py-2.5 max-w-none transition-colors duration-500">
        <div className="flex items-center gap-2 font-['Newsreader'] text-[1.05rem] sm:text-xl font-light tracking-[0.18em] sm:tracking-[0.2em] text-[#e9c176]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>flare</span>
          <span>PHILOSIFT</span>
        </div>
        <AuthHeaderControls />
      </header>

      <main className="relative flex min-h-[100svh] flex-col items-center justify-start overflow-hidden px-4 sm:px-6 pt-24 sm:pt-28 md:pt-20 pb-10 md:pb-6">
        <div className="absolute inset-0 parchment-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
          <div className="w-full h-full border border-outline-variant/20 rotate-45 animate-pulse" />
          <div className="absolute inset-0 border border-outline-variant/10 -rotate-12 scale-125" />
        </div>

        <section className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
          <div className="mb-10 sm:mb-12 md:mb-10 space-y-5 md:space-y-5">
            <h1 className="font-headline text-[1.95rem] leading-[1.02] sm:text-[2.45rem] md:text-[3.55rem] lg:text-[4.25rem] font-light tracking-tight text-on-surface italic max-w-3xl mx-auto">
              There is a <span className="inline-block bg-primary text-[#121212] px-2 py-1">pattern</span> running your <span className="inline-block bg-primary text-[#121212] px-2 py-1">decisions</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-6 pt-2 md:pt-2">
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-outline-variant/40 to-transparent" />
              <p className="max-w-xl font-headline text-[0.98rem] sm:text-base md:text-[1.3rem] text-on-surface-variant leading-[1.45] text-center md:text-left italic opacity-80 px-2 sm:px-0">
                Most people never see it clearly. But it shows up in how you think, hesitate, and act. This will reveal what drives your choices and where you lose control.
              </p>
            </div>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 mb-8 md:mb-8 opacity-90 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="md:col-span-8 h-44 sm:h-48 md:h-48 lg:h-52 bg-surface-container-highest relative overflow-hidden">
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu7IS8jfZ1tfyAdBTvQ883-CgZ3ITgYgqWG6nwV5-mBhrrnl4wpNwz6jS9j3PKEL7lv_eftvIZU5wOJom7KjOs4B-5epuhTamlegKBztkjLgZjhnKAO5HgzlMMLq0zCC7qnwtsm2Rz7fnWYyOY2HW6v4m_Wh3Z5d3H_c4UZ-TPZFR4Ov_5FJ1xZGUQtgC2B29UClm755KZfyodrXMT7cXDqQhBivRHGA1zo3fycGJ6MaZbTgJl5HS3Lxv88F7Qb0Ig_Zoi_7PyL3o" loading="lazy" decoding="async" fetchPriority="low" />
            </div>
            <div className="md:col-span-4 h-44 sm:h-48 md:h-48 lg:h-52 bg-surface-container-highest relative overflow-hidden">
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdA49zO555dEeEgJhd3OR1HYj_PmKVhQ8KGnoN0-XoNJdSDRkVx7HmBGz-EujyJpfnRaIkuRWUXHsF_OBHqw8xXZXcOfd9Kmt1L9mIw_MlxWgW2cWRzuZwkgVWJE-WHWpx9F35eZBR9HR-fIlu2MFhQK4qqnl7s_qE5DkaasOybZMj2nUbzepGL6ERpfIeJ99qk812bkt6TebnhX_nwmQmlr0Cvrk8LN-g0VMXMROzYLrg4YvpQB5b4eVg7T_yXujy8VoIofudteA" loading="lazy" decoding="async" fetchPriority="low" />
            </div>
          </div>

          <div className="mt-2 md:mt-6 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-7 w-full justify-center max-w-3xl">
            <div className="flex flex-col items-center gap-2">
              <Link to="/quiz" className="group relative min-w-[180px] sm:min-w-[220px] md:min-w-[250px] px-8 md:px-12 py-3.5 md:py-4 bg-primary text-on-primary font-body uppercase tracking-widest text-[11px] md:text-xs font-bold overflow-hidden transition-all duration-300 active:scale-95 text-center">
                <span className="relative z-10 flex items-center gap-3">
                  See My Pattern
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#997836] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <p className="font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/80">Takes 2-3 minutes</p>
            </div>

            {returnTo ? (
              <div className="flex flex-col items-center gap-2">
                <button type="button" onClick={() => navigate(returnTo)} className="group relative min-w-[180px] sm:min-w-[220px] md:min-w-[250px] px-8 md:px-12 py-3.5 md:py-4 border border-outline-variant/35 text-on-surface font-body uppercase tracking-widest text-[11px] md:text-xs font-bold overflow-hidden transition-all duration-300 active:scale-95 text-center hover:border-primary/45 hover:text-primary">
                  Continue Where You Left Off
                </button>
                <p className="font-label text-[10px] uppercase tracking-[0.14em] text-on-surface-variant/80">Sign in to resume onboarding</p>
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <div className="fixed top-1/2 left-8 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center">
        <span className="font-headline italic text-xs rotate-90 text-outline-variant tracking-widest origin-center">SYSTEM_CORE_IX</span>
        <div className="w-[1px] h-32 bg-outline-variant/30" />
      </div>
      <div className="fixed top-1/2 right-8 -translate-y-1/2 hidden xl:flex flex-col gap-12 items-center">
        <div className="w-[1px] h-32 bg-outline-variant/30" />
        <span className="font-headline italic text-xs -rotate-90 text-outline-variant tracking-widest origin-center whitespace-nowrap">PHILO_SIFT // GATEWAY</span>
      </div>

      <footer className="relative z-10 pb-6 px-4">
        <LegalPolicyLinks />
      </footer>
    </div>
  );
}
