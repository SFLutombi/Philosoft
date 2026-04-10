import { useMemo } from "react";
import { Link } from "react-router-dom";
import ArchiveSidebar from "../components/ArchiveSidebar";
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

  return (
    <div className="font-body text-on-surface antialiased">
      <ArchiveSidebar active="rituals" />

      <main className="ml-64 min-h-screen" style={{ backgroundColor: "#131313", backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
        <header className="flex justify-between items-center w-full px-12 py-8 bg-[#0e0e0e]/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="font-['Newsreader'] text-2xl font-light tracking-[0.2em] text-[#e9c176]">PHILOSIFT</div>
          <div className="flex gap-8">
            <Link className="text-[#444748] font-['Newsreader'] tracking-tighter uppercase text-sm hover:text-[#e9c176] transition-all duration-300" to="/quiz">Initiation</Link>
            <Link className="text-[#444748] font-['Newsreader'] tracking-tighter uppercase text-sm hover:text-[#e9c176] transition-all duration-300" to="/dashboard">Shadow Self</Link>
            <span className="text-[#e9c176] border-b border-[#e9c176] pb-1 font-['Newsreader'] tracking-tighter uppercase text-sm">The Map</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="material-symbols-outlined text-[#e9c176] cursor-pointer">history_edu</span>
            <span className="material-symbols-outlined text-[#e9c176] cursor-pointer">account_circle</span>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-12 py-12">
          <div className="relative grid grid-cols-12 gap-12 items-end mb-24">
            <div className="col-span-8">
              <h1 className="font-headline text-8xl font-extralight text-on-surface tracking-tighter leading-none mb-8 uppercase italic">{displayName}</h1>
              <div className="w-24 h-0.5 bg-primary mb-8" />
              <p className="font-headline text-2xl text-on-surface-variant max-w-2xl leading-relaxed italic">
                "{displaySummary}"
              </p>
            </div>
            <div className="col-span-4 text-right">
              <span className="font-label text-[10px] tracking-[0.4em] uppercase text-outline">Ascension Rank</span>
              <p className="font-headline text-5xl text-primary mt-2">PARAGON</p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 lg:col-span-7 bg-surface-container-low p-12 border border-outline-variant/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 font-headline text-9xl">V</div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-16">
                  <div>
                    <h3 className="font-headline text-3xl italic mb-1">Ontological Map</h3>
                    <p className="font-label text-[10px] uppercase tracking-widest text-outline">Psychometric Geometry</p>
                  </div>
                  <span className="material-symbols-outlined text-primary text-4xl occult-glow">hub</span>
                </div>
                <div className="flex justify-center py-12">
                  <div className="relative w-80 h-80 flex items-center justify-center">
                    <svg className="absolute inset-0 w-full h-full text-outline-variant/30" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <polygon points="50,5 95,38 78,92 22,92 5,38" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </svg>
                    <svg className="absolute inset-0 w-full h-full text-primary" viewBox="0 0 100 100">
                      <polygon points="50,15 85,45 70,80 30,80 15,45" fill="rgba(233, 193, 118, 0.15)" stroke="currentColor" strokeWidth="1" />
                      <circle cx="50" cy="15" r="1.5" fill="currentColor" />
                      <circle cx="85" cy="45" r="1.5" fill="currentColor" />
                      <circle cx="70" cy="80" r="1.5" fill="currentColor" />
                      <circle cx="30" cy="80" r="1.5" fill="currentColor" />
                      <circle cx="15" cy="45" r="1.5" fill="currentColor" />
                    </svg>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 font-label text-[9px] tracking-widest text-primary uppercase">Wisdom</div>
                    <div className="absolute top-1/4 -right-8 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Power</div>
                    <div className="absolute bottom-4 -right-4 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Chaos</div>
                    <div className="absolute bottom-4 -left-4 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Order</div>
                    <div className="absolute top-1/4 -left-8 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">Void</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
              <div className="bg-[#1a1a1a] p-1 border border-outline-variant/20 flex flex-col items-center pt-8 pb-12 relative shadow-2xl">
                <div className="w-full px-6 flex justify-between items-center mb-8">
                  <span className="material-symbols-outlined text-outline text-xs">close</span>
                  <span className="font-label text-[10px] tracking-widest text-outline">STORY PREVIEW</span>
                  <span className="material-symbols-outlined text-outline text-xs">more_vert</span>
                </div>
                <div className="w-72 h-[480px] bg-surface-container-lowest relative overflow-hidden flex flex-col items-center justify-center border border-primary/20">
                  <img className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZiAPtY1Kfri-Iw6xxmNShMbZ12FSysFJl6bKYpqSS0c_qbA2Exw99wPZ8ei7YccD0_2Xf6GCCY0KDOt7I2DOH82_lNZVakov6Pl406C0qT4pl8FggDzgBdh0GxuHJU9gRIBjOnWHSYYX3INrHx2j-_eBdEkCoPtQujXIKeAABtL33RfrbPwns30NJOsqx7TMb-NbzNy6CJfhkmcx_0Uu2GJGShuc4hhQ2W0_vo91JhmfP6atrgdiOiCw0X4G4SRsTbeVxJD2RRlg" />
                  <div className="relative z-10 flex flex-col items-center text-center px-6">
                    <span className="material-symbols-outlined text-primary text-6xl mb-6 occult-glow" style={{ fontVariationSettings: "'FILL' 1" }}>architecture</span>
                    <h4 className="font-headline text-xs tracking-[0.5em] text-primary mb-2 uppercase">Archetype</h4>
                    <h2 className="font-headline text-3xl italic text-on-surface tracking-tighter leading-none mb-6">{displayCardTitle}</h2>
                    <div className="w-8 h-px bg-primary/40 mb-6" />
                    <p className="font-body text-[10px] text-on-surface/70 leading-relaxed uppercase tracking-widest">Philosophical Resonance. <br /> Shadow Axis Confirmed.</p>
                  </div>
                  <div className="absolute bottom-8 flex flex-col items-center">
                    <span className="font-headline text-sm tracking-[0.2em] text-primary/60">PHILO SIFT</span>
                  </div>
                </div>
                <div className="mt-8 flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-outline-variant" />
                  <div className="w-2 h-2 rounded-full bg-outline-variant" />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button className="w-full py-5 bg-primary text-on-primary font-label text-xs font-bold uppercase tracking-[0.2em] hover:bg-on-primary-container transition-colors flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-lg">ios_share</span>
                  Share to Shadow
                </button>
                <button className="w-full py-5 border border-outline-variant/30 text-on-surface font-label text-xs uppercase tracking-[0.2em] hover:bg-surface-container transition-colors flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-lg">content_copy</span>
                  Copy Caption
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-12 mt-12 mb-24">
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
          </div>
        </section>

        <footer className="w-full flex flex-col items-center py-24 px-12 border-t border-outline-variant/10">
          <div className="flex items-center gap-12 mb-8 text-outline-variant/40">
            <div className="w-32 h-px bg-current" />
            <span className="material-symbols-outlined scale-150">diamond</span>
            <div className="w-32 h-px bg-current" />
          </div>
          <p className="font-headline text-sm tracking-[0.3em] text-outline uppercase mb-2">Omnia Mutantur, Nihil Interit</p>
          <p className="font-label text-[9px] text-outline-variant tracking-widest uppercase">Philosift © Perpetual Cycle IX</p>
        </footer>
      </main>

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
    </div>
  );
}
