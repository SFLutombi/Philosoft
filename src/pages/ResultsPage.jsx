import { useMemo } from "react";
import { Link } from "react-router-dom";
import { RESULTS_STORAGE_KEY } from "../data/quizData";

export default function ResultsPage() {
  const storedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const finalPhilosopher = storedResult?.finalPhilosopher;
  const displayName = finalPhilosopher?.name || "The Stoic Architect";
  const displaySummary = finalPhilosopher?.summary || "You build order from chaos, a fortress of the mind. Your consciousness is a blueprint of disciplined geometry amidst the shifting sands of existence.";
  const displayCardTitle = finalPhilosopher?.title || "THE STOIC ARCHITECT";

  const bottomNav = [
    { label: "Home", icon: "home", href: "/landing" },
    { label: "Quiz", icon: "auto_awesome", href: "/quiz" },
    { label: "Results", icon: "insights", href: "/results", active: true },
    { label: "Archive", icon: "grid_view", href: "/dashboard" }
  ];

  return (
    <div className="font-body text-on-surface antialiased min-h-[100svh] bg-[#131313]" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[60] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/75 backdrop-blur-xl border-b border-[#4e4639]/15">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#e9c176]">hub</span>
            <h1 className="font-headline text-lg sm:text-2xl font-light tracking-[-0.02em] text-[#e9c176] italic">PHILO SIFT</h1>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link className="font-headline tracking-tighter uppercase text-sm text-[#444748] hover:text-[#e9c176] transition-colors duration-300" to="/quiz">Initiation</Link>
            <Link className="font-headline tracking-tighter uppercase text-sm text-[#444748] hover:text-[#e9c176] transition-colors duration-300" to="/dashboard">Archive</Link>
            <span className="font-headline tracking-tighter uppercase text-sm text-[#e9c176] border-b border-[#e9c176] pb-1">The Map</span>
          </nav>

          <button className="text-[#e5e2e1]/60 hover:text-[#ffdea5] transition-colors duration-300 md:hidden">
            <span className="material-symbols-outlined">account_circle</span>
          </button>

          <div className="hidden md:flex gap-4 items-center">
            <span className="material-symbols-outlined text-[#e9c176] cursor-pointer">history_edu</span>
            <span className="material-symbols-outlined text-[#e9c176] cursor-pointer">account_circle</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex min-h-[100svh] max-w-6xl flex-col px-4 sm:px-6 lg:px-8 pt-24 pb-32 md:pb-20">
        <section className="mb-10 text-center md:mb-14">
          <span className="font-label mb-4 block text-xs uppercase tracking-[0.28em] text-primary">Archive Record</span>
          <h2 className="font-headline mb-5 text-4xl italic leading-[0.95] tracking-tighter text-on-surface sm:text-5xl md:text-7xl lg:text-8xl">{displayName}</h2>
          <p className="mx-auto max-w-2xl px-2 font-headline text-[1.05rem] leading-relaxed italic text-on-surface-variant sm:text-xl md:text-2xl">
            "{displaySummary}"
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-left md:justify-end">
            <div className="hidden md:block text-right">
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-outline">Ascension Rank</span>
              <p className="font-headline mt-2 text-5xl text-primary">PARAGON</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-surface-container-low/95 p-5 sm:p-7 md:p-10 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 font-headline text-7xl sm:text-8xl md:text-9xl">V</div>
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-8 sm:mb-10 md:mb-16">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl italic mb-1">Ontological Map</h3>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">Psychometric Geometry</p>
                </div>
                <span className="material-symbols-outlined text-primary text-3xl sm:text-4xl occult-glow">hub</span>
              </div>

              <div className="flex justify-center py-2 sm:py-6 md:py-12">
                <div className="relative h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 flex items-center justify-center">
                  <svg className="absolute inset-0 h-full w-full text-outline-variant/30" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <polygon points="50,5 95,38 78,92 22,92 5,38" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                  <svg className="absolute inset-0 h-full w-full text-primary" viewBox="0 0 100 100">
                    <polygon points="50,15 85,45 70,80 30,80 15,45" fill="rgba(233, 193, 118, 0.15)" stroke="currentColor" strokeWidth="1" />
                    <circle cx="50" cy="15" r="1.5" fill="currentColor" />
                    <circle cx="85" cy="45" r="1.5" fill="currentColor" />
                    <circle cx="70" cy="80" r="1.5" fill="currentColor" />
                    <circle cx="30" cy="80" r="1.5" fill="currentColor" />
                    <circle cx="15" cy="45" r="1.5" fill="currentColor" />
                  </svg>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-label text-[9px] tracking-widest text-primary uppercase">Wisdom</div>
                  <div className="absolute top-1/4 -right-7 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Power</div>
                  <div className="absolute bottom-4 -right-3 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Chaos</div>
                  <div className="absolute bottom-4 -left-3 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Order</div>
                  <div className="absolute top-1/4 -left-7 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Void</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-label uppercase tracking-wider text-outline">Logic</span>
                  <span className="font-headline text-xl italic text-on-surface sm:text-2xl">88%</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-label uppercase tracking-wider text-outline">Intuition</span>
                  <span className="font-headline text-xl italic text-on-surface sm:text-2xl">42%</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-label uppercase tracking-wider text-outline">Order</span>
                  <span className="font-headline text-xl italic text-on-surface sm:text-2xl">94%</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-[10px] font-label uppercase tracking-wider text-outline">Chaos</span>
                  <span className="font-headline text-xl italic text-on-surface sm:text-2xl">12%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-[#1a1a1a] p-1 relative shadow-2xl">
              <div className="w-full px-4 sm:px-6 pt-5 sm:pt-6 flex justify-between items-center mb-5 sm:mb-8">
                <span className="material-symbols-outlined text-outline text-xs">close</span>
                <span className="font-label text-[10px] tracking-widest text-outline">STORY PREVIEW</span>
                <span className="material-symbols-outlined text-outline text-xs">more_vert</span>
              </div>
              <div className="relative mx-auto aspect-[9/16] w-full max-w-[18rem] overflow-hidden border border-primary/20 bg-surface-container-lowest">
                <img className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiAPtY1Kfri-Iw6xxmNShMbZ12FSysFJl6bKYpqSS0c_qbA2Exw99wPZ8ei7YccD0_2Xf6GCCY0KDOt7I2DOH82_lNZVakov6Pl406C0qT4pl8FggDzgBdh0GxuHJU9gRIBjOnWHSYYX3INrHx2j-_eBdEkCoPtQujXIKeAABtL33RfrbPwns30NJOsqx7TMb-NbzNy6CJfhkmcx_0Uu2GJGShuc4hhQ2W0_vo91JhmfP6atrgdiOiCw0X4G4SRsTbeVxJD2RRlg" />
                <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                  <span className="material-symbols-outlined mb-5 text-5xl text-primary occult-glow sm:text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                  <h4 className="font-headline mb-2 text-[0.7rem] tracking-[0.5em] text-primary uppercase">Archetype</h4>
                  <h2 className="font-headline mb-5 text-2xl italic leading-none tracking-tighter text-on-surface sm:text-3xl">{displayCardTitle}</h2>
                  <div className="mb-5 h-px w-8 bg-primary/40" />
                  <p className="font-body text-[10px] uppercase tracking-widest leading-relaxed text-on-surface/70">Philosophical Resonance. <br /> Shadow Axis Confirmed.</p>
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                  <span className="font-headline text-sm tracking-[0.2em] text-primary/60">PHILO SIFT</span>
                </div>
              </div>
              <div className="my-6 flex justify-center gap-4 pb-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <div className="h-2 w-2 rounded-full bg-outline-variant" />
                <div className="h-2 w-2 rounded-full bg-outline-variant" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button className="flex w-full items-center justify-center gap-3 bg-primary py-4 sm:py-5 font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-primary-container">
                <span className="material-symbols-outlined text-lg">ios_share</span>
                Share to Shadow
              </button>
              <button className="flex w-full items-center justify-center gap-3 border border-outline-variant/30 py-4 sm:py-5 font-label text-xs uppercase tracking-[0.2em] text-on-surface transition-colors hover:bg-surface-container">
                <span className="material-symbols-outlined text-lg">content_copy</span>
                Copy Caption
              </button>
            </div>
          </div>
        </section>

        <section className="hidden md:grid grid-cols-12 gap-12 mt-12 mb-24">
          <div className="col-span-12 md:col-span-4 bg-surface-container-high p-10 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="font-label text-[10px] tracking-widest text-primary uppercase mb-4 block">Dominant Virtue</span>
              <h4 className="font-headline text-4xl mb-4 italic">Iron Will</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">Your resolve is not merely a trait, but a structural integrity that maintains the sanctity of your inner sanctum.</p>
            </div>
            <span className="material-symbols-outlined text-primary/30 text-4xl">fitness_center</span>
          </div>
          <div className="col-span-12 md:col-span-4 bg-surface-container p-10 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="font-label text-[10px] tracking-widest text-primary uppercase mb-4 block">Shadow Resonance</span>
              <h4 className="font-headline text-4xl mb-4 italic">The Void</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">The Architect fears that which cannot be measured. Your shadow dwells in the formless depths of pure chaos.</p>
            </div>
            <span className="material-symbols-outlined text-secondary/30 text-4xl">incomplete_circle</span>
          </div>
          <div className="col-span-12 md:col-span-4 bg-surface-container-high p-10 flex flex-col justify-between min-h-[300px]">
            <div>
              <span className="font-label text-[10px] tracking-widest text-primary uppercase mb-4 block">Archive Record</span>
              <h4 className="font-headline text-4xl mb-4 italic">No. 11,402</h4>
              <p className="text-on-surface-variant text-sm leading-relaxed">You are among the 4% of initiates who have achieved the Architect resonance in the current cycle.</p>
            </div>
            <span className="material-symbols-outlined text-primary/30 text-4xl">fingerprint</span>
          </div>
        </section>

        <footer className="w-full flex flex-col items-center py-14 md:py-24 px-4 md:px-12 border-t border-outline-variant/10">
          <div className="flex items-center gap-12 mb-8 text-outline-variant/40">
            <div className="w-24 md:w-32 h-px bg-current" />
            <span className="material-symbols-outlined scale-150">diamond</span>
            <div className="w-24 md:w-32 h-px bg-current" />
          </div>
          <p className="font-headline text-sm tracking-[0.3em] text-outline uppercase mb-2 text-center">Omnia Mutantur, Nihil Interit</p>
          <p className="font-label text-[9px] text-outline-variant tracking-widest uppercase text-center">Philosift © Perpetual Cycle IX</p>
        </footer>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#4e4639]/15 bg-[#131313]/85 backdrop-blur-2xl md:hidden" style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto grid h-20 max-w-md grid-cols-4 items-center px-2">
          {bottomNav.map((item) => {
            const isActive = item.active;

            return (
              <Link key={item.label} to={item.href} className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? "text-primary" : "text-[#e5e2e1]/45 hover:text-[#e9c176]/80"}`}>
                <span className="material-symbols-outlined text-2xl" style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}>{item.icon}</span>
                <span className="font-body text-[10px] font-bold uppercase tracking-[0.1em]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
