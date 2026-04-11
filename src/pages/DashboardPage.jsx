import ArchiveSidebar from "../components/ArchiveSidebar";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <div className="grain-overlay fixed inset-0" />
      <ArchiveSidebar active="dashboard" />

      <main className="min-h-screen bg-surface px-4 sm:px-6 lg:ml-64 lg:p-12 pb-10 lg:pb-12 pt-6 lg:pt-12">
        <header className="mb-6 lg:mb-16 flex items-start justify-between gap-4">
          <div className="max-w-2xl">
            <span className="font-['Inter'] text-[10px] sm:text-[11px] uppercase tracking-[0.35em] sm:tracking-[0.4em] text-outline mb-3 lg:mb-4 block">The Inner Sanctum</span>
            <h2 className="font-['Newsreader'] text-4xl sm:text-5xl lg:text-6xl font-light leading-[0.95] tracking-tighter text-on-surface">Integrating the <br /><span className="italic text-primary">Shadow Self</span></h2>
          </div>
          <div className="text-right shrink-0">
            <p className="font-['Newsreader'] text-3xl sm:text-4xl italic text-on-surface">Day 47</p>
            <p className="font-['Inter'] text-[9px] sm:text-[10px] uppercase tracking-widest text-outline">The Obsidian Cycle</p>
          </div>
        </header>

        <div className="mb-6 lg:mb-8 lg:hidden bg-surface-container-low p-5 sm:p-6 shadow-glow relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-4">
            <div>
              <h3 className="font-['Newsreader'] text-2xl sm:text-3xl italic text-primary mb-2">Evolution Path: Level X</h3>
              <p className="font-['Inter'] text-sm text-on-surface-variant leading-relaxed">You are currently traversing the Subterranean Threshold. Achieve 85% alignment to unlock the Tenth Gate.</p>
            </div>
            <div>
              <div className="flex justify-between items-end mb-3">
                <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline">Current Integration</span>
                <span className="font-['Newsreader'] text-4xl text-primary">74%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest">
                <div className="h-full bg-primary" style={{ width: "74%" }} />
              </div>
            </div>
            <button className="w-full border border-primary text-primary px-6 py-3 font-['Inter'] uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-colors">
              Review Manifestation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant/10 p-5 sm:p-7 lg:p-10 flex flex-col justify-between shadow-glow min-h-[24rem] lg:h-[480px] relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-96 h-96 opacity-10">
              <img className="w-full h-full object-cover mix-blend-lighten" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCoY1J_MymrzoAGhRjCbuRjnjlvsrYEyDSDeriA3fjBEtXlyRiox8PFmuA1i4oJ0PZh4GqTSVXORQmwMIoDxl-UDQS2_zE17lMGGhQGu4HiUuHzg9khZBwd0LAN4qclI4H_vrm6At5tReT4_2ktm1S8LRdVkuN5IKKmOXGpZgJ6okyxsIrcnka4Msjt5AL32h-35BbBv9tNhOf8DsxTAIRh4tqXnhOeXb0LgrvWO-9lHibFf83wrMNDBc3P-ZupKIPfR4HnnNdtRo" />
            </div>
            <div className="relative z-10">
              <h3 className="font-['Newsreader'] text-2xl sm:text-3xl italic text-primary mb-2">Evolution Path: Level X</h3>
              <p className="font-['Inter'] text-sm text-on-surface-variant max-w-md leading-relaxed">You are currently traversing the Subterranean Threshold. Achieve 85% alignment to unlock the Tenth Gate.</p>
            </div>
            <div className="mt-auto relative z-10">
              <div className="flex justify-between items-end mb-4">
                <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline">Current Integration</span>
                <span className="font-['Newsreader'] text-5xl text-primary">74%</span>
              </div>
              <div className="w-full h-1 bg-surface-container-highest">
                <div className="h-full bg-primary" style={{ width: "74%" }} />
              </div>
              <div className="mt-8 hidden lg:flex gap-4">
                <button className="border border-primary text-primary px-8 py-3 font-['Inter'] uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-colors">Review Manifestation</button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6 lg:space-y-8">
            <div className="bg-surface-container p-8 border-l-2 border-primary">
              <h4 className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline mb-6">Alignment Matrix</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[11px] mb-2"><span className="uppercase tracking-tighter">Psychic Resonance</span><span className="text-primary">8.2</span></div>
                  <div className="w-full h-[1px] bg-outline-variant/30 relative"><div className="absolute right-[18%] top-0 h-[3px] -translate-y-[1px] w-1 bg-primary" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-2"><span className="uppercase tracking-tighter">Dream Recall</span><span className="text-primary">6.4</span></div>
                  <div className="w-full h-[1px] bg-outline-variant/30 relative"><div className="absolute right-[36%] top-0 h-[3px] -translate-y-[1px] w-1 bg-primary" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] mb-2"><span className="uppercase tracking-tighter">Ego Dissolution</span><span className="text-primary">9.1</span></div>
                  <div className="w-full h-[1px] bg-outline-variant/30 relative"><div className="absolute right-[9%] top-0 h-[3px] -translate-y-[1px] w-1 bg-primary" /></div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-high p-8 flex flex-col justify-between h-[216px]">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline mb-1">Ascension Streak</h4>
                  <p className="font-['Newsreader'] text-4xl italic">07 Days</p>
                </div>
                <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <div className="border-t border-outline-variant/20 pt-4 flex justify-between items-center">
                <span className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline">Unlocked Ciphers</span>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center text-[10px] border border-surface">A</div>
                  <div className="w-8 h-8 bg-primary text-on-primary flex items-center justify-center text-[10px] border border-surface">O</div>
                  <div className="w-8 h-8 bg-surface-container-highest text-outline flex items-center justify-center text-[10px] border border-surface">+12</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-surface-container-low p-8 sm:p-10">
            <h3 className="font-['Newsreader'] text-2xl mb-8">Daily Obligations</h3>
            <div className="space-y-6">
              <label className="flex items-center group cursor-pointer">
                <input className="appearance-none w-5 h-5 border border-outline-variant checked:bg-primary checked:border-primary transition-all" type="checkbox" />
                <div className="ml-4 flex-grow">
                  <p className="font-['Inter'] text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Silent Contemplation</p>
                  <p className="font-['Newsreader'] text-[11px] italic text-outline">20 Minutes in total darkness</p>
                </div>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input defaultChecked className="appearance-none w-5 h-5 border border-outline-variant checked:bg-primary checked:border-primary transition-all" type="checkbox" />
                <div className="ml-4 flex-grow">
                  <p className="font-['Inter'] text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Record the Dream</p>
                  <p className="font-['Newsreader'] text-[11px] italic text-outline">Transcribe the first imagery of the dawn</p>
                </div>
              </label>
              <label className="flex items-center group cursor-pointer">
                <input className="appearance-none w-5 h-5 border border-outline-variant checked:bg-primary checked:border-primary transition-all" type="checkbox" />
                <div className="ml-4 flex-grow">
                  <p className="font-['Inter'] text-xs uppercase tracking-widest group-hover:text-primary transition-colors">Shadow Mirroring</p>
                  <p className="font-['Newsreader'] text-[11px] italic text-outline">Identify one projection in a social interaction</p>
                </div>
              </label>
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-highest p-8 sm:p-10 flex flex-col sm:flex-row gap-6 lg:gap-8 items-start sm:items-center overflow-hidden">
            <div className="w-1/3 aspect-[3/4] bg-surface-container-lowest shrink-0 border border-outline-variant/10 relative">
              <img className="w-full h-full object-cover opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYT2jydo3A_nYxFTLwRKTxEZ8jdbPLqwuN-wtkXMpYYBq0eZV8FqEJePHZf8rPfUcOvz85uAFTGGDh1R8OscwfIqcVf1LzFuoAXljtChy8mIPFJtCrdOEU8ECtO_LJTjfqMs6q4w9YlTGFRwdBHKSMZRzcvpWnsqpcSlNNos-iPvSUMgfoD_DEBMFJ2Q33Sa8heHvyTh83uXrPYUmek8WUQGIh2KAQ5TIqATej0Pw0_45P9TBtSR-CWLysF3Hm5lcXi61S3KwtJW0" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-highest to-transparent" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-['Inter'] text-[9px] uppercase tracking-[0.5em] text-primary mb-4 block">Evening Oracle</span>
              <h4 className="font-['Newsreader'] text-3xl font-light italic leading-tight mb-6 text-on-surface">"The cave you fear to enter holds the treasure you seek."</h4>
              <p className="font-['Inter'] text-[10px] uppercase tracking-widest text-outline mb-6">Joseph Campbell</p>
              <button className="self-start text-[10px] uppercase tracking-widest border-b border-primary text-primary pb-1 hover:text-on-surface hover:border-on-surface transition-colors">Enter Reflection</button>
            </div>
          </div>
        </div>

        <footer className="mt-14 lg:mt-20 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center opacity-40">
          <div className="flex gap-12">
            <div>
              <p className="font-['Inter'] text-[9px] uppercase tracking-widest">Protocol</p>
              <p className="font-['Inter'] text-[10px]">PHILOSIFT v2.0.4</p>
            </div>
            <div>
              <p className="font-['Inter'] text-[9px] uppercase tracking-widest">Status</p>
              <p className="font-['Inter'] text-[10px] text-primary">ENCRYPTED CONNECTION</p>
            </div>
          </div>
          <p className="font-['Newsreader'] italic text-sm">Memento Mori</p>
        </footer>
      </main>
    </div>
  );
}
