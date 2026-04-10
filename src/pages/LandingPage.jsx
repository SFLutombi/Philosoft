import { Link } from "react-router-dom";
import GrainOverlay from "../components/GrainOverlay";

export default function LandingPage() {
  return (
    <div className="h-[100svh] overflow-hidden bg-surface text-on-surface font-body selection:bg-primary selection:text-on-primary">
      <GrainOverlay variant="grain" />

      <header className="fixed top-0 left-0 w-full z-40 bg-[#0e0e0e]/80 backdrop-blur-xl flex justify-between items-center px-5 md:px-8 py-2.5 max-w-none transition-colors duration-500">
        <div className="flex items-center gap-2 font-['Newsreader'] text-xl font-light tracking-[0.2em] text-[#e9c176]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>flare</span>
          <span>PHILOSIFT</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="material-symbols-outlined text-[#444748] cursor-pointer hover:text-[#e9c176] transition-all duration-300">history_edu</span>
          <span className="material-symbols-outlined text-[#444748] cursor-pointer hover:text-[#e9c176] transition-all duration-300">account_circle</span>
        </div>
      </header>

      <main className="relative h-full flex flex-col items-center justify-center overflow-hidden px-4 md:px-6 pt-14 md:pt-16 pb-4 md:pb-6">
        <div className="absolute inset-0 parchment-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20">
          <div className="w-full h-full border border-outline-variant/20 rotate-45 animate-pulse" />
          <div className="absolute inset-0 border border-outline-variant/10 -rotate-12 scale-125" />
        </div>

        <section className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
          <div className="mb-8 md:mb-10 space-y-4 md:space-y-5">
            <h1 className="font-headline text-[2.15rem] sm:text-[2.7rem] md:text-[3.55rem] lg:text-[4.25rem] font-light tracking-tight text-on-surface leading-[0.95] italic">
              There is a <span className="inline-block bg-primary text-[#121212] px-2 py-1">pattern</span> behind how you <span className="inline-block bg-primary text-[#121212] px-2 py-1">think</span>
            </h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 pt-1 md:pt-2">
              <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-outline-variant/40 to-transparent" />
              <p className="max-w-xl font-headline text-base md:text-[1.3rem] text-on-surface-variant leading-[1.35] text-center md:text-left italic opacity-80">
                Most people never see it clearly. This will show you what is driving your decisions and what you tend to overlook.
              </p>
            </div>
          </div>

          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 mb-6 md:mb-8 opacity-90 grayscale hover:grayscale-0 transition-all duration-1000">
            <div className="md:col-span-8 h-40 sm:h-44 md:h-48 lg:h-52 bg-surface-container-highest relative overflow-hidden">
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAu7IS8jfZ1tfyAdBTvQ883-CgZ3ITgYgqWG6nwV5-mBhrrnl4wpNwz6jS9j3PKEL7lv_eftvIZU5wOJom7KjOs4B-5epuhTamlegKBztkjLgZjhnKAO5HgzlMMLq0zCC7qnwtsm2Rz7fnWYyOY2HW6v4m_Wh3Z5d3H_c4UZ-TPZFR4Ov_5FJ1xZGUQtgC2B29UClm755KZfyodrXMT7cXDqQhBivRHGA1zo3fycGJ6MaZbTgJl5HS3Lxv88F7Qb0Ig_Zoi_7PyL3o" />
            </div>
            <div className="md:col-span-4 h-40 sm:h-44 md:h-48 lg:h-52 bg-surface-container-highest relative overflow-hidden">
              <img alt="" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdA49zO555dEeEgJhd3OR1HYj_PmKVhQ8KGnoN0-XoNJdSDRkVx7HmBGz-EujyJpfnRaIkuRWUXHsF_OBHqw8xXZXcOfd9Kmt1L9mIw_MlxWgW2cWRzuZwkgVWJE-WHWpx9F35eZBR9HR-fIlu2MFhQK4qqnl7s_qE5DkaasOybZMj2nUbzepGL6ERpfIeJ99qk812bkt6TebnhX_nwmQmlr0Cvrk8LN-g0VMXMROzYLrg4YvpQB5b4eVg7T_yXujy8VoIofudteA" />
            </div>
          </div>

          <div className="mt-4 md:mt-6 flex flex-col md:flex-row items-center gap-5 md:gap-7 w-full justify-center">
            <Link to="/quiz" className="group relative min-w-[220px] md:min-w-[250px] px-9 md:px-12 py-3.5 md:py-4 bg-primary text-on-primary font-body uppercase tracking-widest text-[11px] md:text-xs font-bold overflow-hidden transition-all duration-300 active:scale-95 text-center">
              <span className="relative z-10 flex items-center gap-3">
                See My Pattern
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#997836] opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link to="/dashboard" className="font-body uppercase tracking-[0.2em] text-[10px] text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group justify-center">
              Go to the Archive
              <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">keyboard_double_arrow_right</span>
            </Link>
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
    </div>
  );
}
