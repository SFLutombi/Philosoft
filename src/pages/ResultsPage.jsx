import { useMemo } from "react";
import { Link } from "react-router-dom";
import { buildFlow, computeArchetypeProfile, PILLARS, RESULTS_STORAGE_KEY } from "../data/quizData";

const ARCHETYPE_CARD_IMAGES = {
  inquiry: "/cards/inner-examiner.jpg",
  discipline: "/cards/sharp-steward.jpg",
  self_authorship: "/cards/unbound-maker.jpg",
  existential_courage: "/cards/clear-rebel.jpg",
  civic_responsibility: "/cards/civic-builder.jpg",
  principle_logic: "/cards/principle-blade.jpg",
  freedom_commitment: "/cards/committed-self.jpg",
  pragmatic_adaptation: "/cards/practical-navigator.jpg"
};

function toPolygonPoints(pillarEntries) {
  return pillarEntries.map((pillar, index) => {
    const angle = ((-90 + (index * 72)) * Math.PI) / 180;
    const radius = 16 + ((pillar.score || 0) * 0.34);
    const x = 50 + (radius * Math.cos(angle));
    const y = 50 + (radius * Math.sin(angle));
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
}

export default function ResultsPage() {
  const storedResult = useMemo(() => {
    try {
      const raw = localStorage.getItem(RESULTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }, []);

  const resolvedProfile = useMemo(() => {
    if (!storedResult) return null;
    const storedProfile = storedResult?.archetypeProfile;
    const hasPlaceholderDomains = storedProfile?.personalGrowthPreview && storedProfile?.careerPreview && storedProfile?.relationshipPreview;
    if (storedProfile?.pillars && hasPlaceholderDomains) return storedProfile;

    return computeArchetypeProfile({
      answersByQuestionId: storedResult?.answersByQuestionId || {},
      flow: buildFlow(),
      winners: storedResult?.winners || [],
      axisScores: storedResult?.axisScores || {}
    });
  }, [storedResult]);

  const finalPhilosopher = storedResult?.finalPhilosopher;
  const displayName = resolvedProfile?.name || finalPhilosopher?.title || "The Lucid Witness";
  const displaySummary = resolvedProfile?.summary || finalPhilosopher?.summary || "You think with unusual intensity and pattern awareness. Your next step is to pair that gift with steadier execution in uncertain moments.";
  const displayCardTitle = resolvedProfile?.cardTitle || displayName.toUpperCase();
  const cardImageSrc = ARCHETYPE_CARD_IMAGES[resolvedProfile?.primaryStyle] || "/cards/default-archive.webp";
  const cardImageAlt = `${displayName} tarot-inspired thinker card`;
  const rarityPercent = Math.max(1, Math.min(99, Math.round((resolvedProfile?.styleDistribution?.[resolvedProfile?.primaryStyle] ?? 0.5) * 100)));
  const shareCaption = `${displayName} :: ${displaySummary}`;
  const strengths = resolvedProfile?.strengths?.slice(0, 3) || [
    "You find signal inside complexity and move toward the core issue quickly.",
    "You maintain your center in ambiguity and keep others grounded.",
    "You generate language that helps people make sense of hard choices."
  ];
  const weaknesses = resolvedProfile?.weaknesses?.slice(0, 2) || [
    "You can stay in reflection too long when a rough decision is needed now.",
    "You can absorb tension from others and mistake it for your own burden."
  ];

  const pillarEntries = PILLARS.map((pillar) => ({
    ...pillar,
    score: resolvedProfile?.pillars?.[pillar.id] ?? 50
  }));
  const pentagramPoints = toPolygonPoints(pillarEntries);

  const bottomNav = [
    { label: "Home", icon: "home", href: "/landing" },
    { label: "Quiz", icon: "auto_awesome", href: "/quiz" },
    { label: "Results", icon: "insights", href: "/results", active: true },
    { label: "Archive", icon: "grid_view", href: "/dashboard" }
  ];

  const premiumPlaceholderSections = [
    {
      id: "personal-growth",
      title: "Your Personal Growth",
      icon: "self_improvement",
      preview: resolvedProfile?.personalGrowthPreview
    },
    {
      id: "career-path",
      title: "Your Career Path",
      icon: "work",
      preview: resolvedProfile?.careerPreview
    },
    {
      id: "relationships",
      title: "Your Relationships",
      icon: "diversity_3",
      preview: resolvedProfile?.relationshipPreview
    }
  ];

  async function handleShare() {
    const baseShareData = {
      title: "Philosift Result",
      text: `${shareCaption} #PhiloSift`,
      url: window.location.href
    };

    if (!navigator.share) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${shareCaption} ${window.location.href}`);
      }
      return;
    }

    try {
      // Most reliable path on mobile browsers.
      await navigator.share(baseShareData);
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }

    try {
      // Optional richer path for apps that prefer receiving an image file.
      if (navigator.canShare && typeof File !== "undefined") {
        const response = await fetch(cardImageSrc);
        const blob = await response.blob();
        const extension = blob.type === "image/png" ? "png" : "jpg";
        const file = new File([blob], `philosift-${resolvedProfile?.primaryStyle || "artefact"}.${extension}`, { type: blob.type || "image/jpeg" });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "Philosift Result",
            text: `${shareCaption} #PhiloSift`,
            files: [file]
          });
          return;
        }
      }
    } catch {
      // Fall through to clipboard fallback below.
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(`${shareCaption} ${window.location.href}`);
    }
  }

  function handleDownloadCard() {
    const link = document.createElement("a");
    link.href = cardImageSrc;
    link.download = `philosift-${resolvedProfile?.primaryStyle || "artefact"}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="font-body text-on-surface antialiased min-h-[100svh] bg-[#131313]" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[60] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />

      <header className="fixed top-0 left-0 w-full z-50 bg-[#131313]/75 backdrop-blur-xl border-b border-[#4e4639]/15">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#e9c176]">hub</span>
            <h1 className="font-headline text-lg sm:text-2xl font-light tracking-[-0.02em] text-[#e9c176] italic">PHILOSIFT</h1>
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
        <section className="artifact-unlock mb-8 md:mb-12">
          <div className="artifact-unlock__shell p-4 sm:p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4 md:mb-6">
              <div>
                  <span className="font-label text-[10px] uppercase tracking-[0.35em] text-primary/90">Mental Artefact</span>
                  <h3 className="font-headline mt-2 text-2xl italic tracking-tight text-on-surface sm:text-3xl">Rarity: {rarityPercent}%</h3>
              </div>
              <span className="material-symbols-outlined artifact-unlock__sigil text-primary text-3xl">diamond</span>
            </div>

            <div className="artifact-unlock__card mx-auto max-w-[20rem] p-1 sm:max-w-[22rem]">
              <div className="artifact-unlock__frame relative aspect-[9/16] overflow-hidden border border-primary/20 bg-surface-container-lowest">
                <div className="artifact-unlock__beam absolute inset-0" />
                <img className="absolute inset-0 h-full w-full object-cover" src={cardImageSrc} alt={cardImageAlt} />
                
                {/* Gradient overlay for text legibility */}
                <div className="artifact-unlock__text-gradient absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0a] via-[#1a1a1a]/80 to-transparent z-20" />
                
                <div className="relative z-30 flex h-full flex-col items-center justify-end px-6 pb-12 text-center">
                  <h4 className="font-headline mb-2 text-[0.65rem] tracking-[0.5em] text-primary/90 uppercase">Archetype</h4>
                  <h2 className="font-headline mb-4 text-xl italic leading-none tracking-tighter text-on-surface sm:text-2xl">{displayCardTitle}</h2>
                  <div className="mb-4 h-px w-6 bg-primary/50" />
                </div>
                
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center py-4">
                  <span className="material-symbols-outlined text-primary/80 text-2xl mb-2">hub</span>
                  <div className="h-px w-5 bg-primary/40 mb-2" />
                  <span className="font-headline text-xs tracking-[0.2em] text-primary/70">PHILOSIFT</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={handleShare} className="flex w-full items-center justify-center gap-3 bg-primary py-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-primary-container">
                <span className="material-symbols-outlined text-lg">ios_share</span>
                Share
              </button>
              <button type="button" onClick={handleDownloadCard} className="flex w-full items-center justify-center gap-3 border border-primary/50 bg-surface-container-lowest py-4 font-label text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-surface-container">
                <span className="material-symbols-outlined text-lg">download</span>
                Download
              </button>
            </div>
          </div>
        </section>

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

        <section className="grid gap-6">
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
                    <polygon points={pentagramPoints} fill="rgba(233, 193, 118, 0.15)" stroke="currentColor" strokeWidth="1" />
                    {pillarEntries.map((pillar, index) => {
                      const angle = ((-90 + (index * 72)) * Math.PI) / 180;
                      const radius = 16 + (pillar.score * 0.34);
                      const cx = 50 + (radius * Math.cos(angle));
                      const cy = 50 + (radius * Math.sin(angle));
                      return <circle key={pillar.id} cx={cx} cy={cy} r="1.5" fill="currentColor" />;
                    })}
                  </svg>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 font-label text-[9px] tracking-widest text-primary uppercase">{pillarEntries[0]?.label}</div>
                  <div className="absolute top-1/4 -right-7 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[1]?.label}</div>
                  <div className="absolute bottom-4 -right-3 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[2]?.label}</div>
                  <div className="absolute bottom-4 -left-3 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[3]?.label}</div>
                  <div className="absolute top-1/4 -left-7 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[4]?.label}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-6">
                {pillarEntries.map((pillar, index) => (
                  <div key={pillar.id} className={`flex flex-col gap-1 ${index % 2 === 1 ? "text-right" : ""}`}>
                    <span className="text-[10px] font-label uppercase tracking-wider text-outline">{pillar.label}</span>
                    <span className="font-headline text-xl italic text-on-surface sm:text-2xl">{pillar.score}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="bg-surface-container-lowest/80 p-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary mb-3">Three Thinking Strengths</p>
                  <div className="space-y-2">
                    {strengths.map((item, idx) => (
                      <p key={`strength-${idx}`} className="text-sm text-on-surface-variant leading-relaxed">{idx + 1}. {item}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-surface-container-lowest/80 p-4">
                  <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary mb-3">Two Blind Spots</p>
                  <div className="space-y-2">
                    {weaknesses.map((item, idx) => (
                      <p key={`weakness-${idx}`} className="text-sm text-on-surface-variant leading-relaxed">{idx + 1}. {item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 mb-16 grid gap-4 md:grid-cols-5">
          {strengths.map((strength, index) => (
            <article key={`strength-card-${index}`} className="bg-surface-container-high p-5 sm:p-6 min-h-[190px] flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] tracking-widest text-primary uppercase mb-3 block">Strength {index + 1}</span>
                <p className="text-on-surface-variant text-sm leading-relaxed">{strength}</p>
              </div>
              <span className="material-symbols-outlined text-primary/30 text-3xl">bolt</span>
            </article>
          ))}
          {weaknesses.map((weakness, index) => (
            <article key={`weakness-card-${index}`} className="bg-surface-container p-5 sm:p-6 min-h-[190px] flex flex-col justify-between">
              <div>
                <span className="font-label text-[10px] tracking-widest text-primary uppercase mb-3 block">Weakness {index + 1}</span>
                <p className="text-on-surface-variant text-sm leading-relaxed">{weakness}</p>
              </div>
              <span className="material-symbols-outlined text-secondary/40 text-3xl">incomplete_circle</span>
            </article>
          ))}
        </section>

        <section className="mb-16 space-y-8">
          {premiumPlaceholderSections.map((section) => (
            <article key={section.id} className="border border-outline-variant/20 bg-surface-container-low/80 p-5 sm:p-6 md:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Premium Lens</p>
                  <h3 className="mt-2 font-headline text-2xl italic text-on-surface sm:text-3xl">{section.title}</h3>
                </div>
                <span className="material-symbols-outlined text-primary/80">{section.icon}</span>
              </div>

              <p className="max-w-3xl text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {section.preview?.intro || "Placeholder: full section analysis will appear here."}
              </p>

              <div className="mt-5">
                <p className="font-label mb-3 text-[10px] uppercase tracking-[0.2em] text-primary">Influential Traits</p>
                <div className="flex flex-wrap gap-2">
                  {(section.preview?.influentialTraits || []).map((trait) => (
                    <span key={`${section.id}-${trait}`} className="border border-primary/30 bg-surface-container-lowest/70 px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-on-surface-variant">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {(section.preview?.lockedCards || []).map((card) => (
                  <div key={`${section.id}-${card.title}`} className="relative overflow-hidden border border-outline-variant/30 bg-surface-container-high p-4 sm:p-5">
                    <div className="pointer-events-none absolute inset-0 backdrop-blur-[1.5px]" />
                    <div className="relative z-10">
                      <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">Locked Insight</p>
                      <h4 className="mt-2 font-headline text-lg italic text-on-surface">{card.title}</h4>
                      <p className="mt-3 text-sm leading-relaxed text-on-surface-variant/85">{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center md:justify-start">
                <button type="button" className="flex items-center gap-3 border border-primary/40 bg-primary/10 px-5 py-3 font-label text-xs uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/20">
                  <span className="material-symbols-outlined text-base">workspace_premium</span>
                  Unlock Full Results
                </button>
              </div>
            </article>
          ))}
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
