import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PHILOSOPHERS, buildFlow, computeArchetypeProfile, computeAxisWinners, PILLARS, RESULTS_STORAGE_KEY } from "../data/quizData";
import { computeSubarchetype } from "../data/subarchetypes";

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

const PILLAR_TOOLTIP_COPY = {
  clarity: {
    high: "Your mind stays sharp under pressure. Even when things get chaotic, you can separate noise from what actually matters.",
    medium: "You usually think clearly, especially once you get a moment to pause. Slowing down before key decisions helps this trait shine.",
    low: "Your clarity is still building. In high-pressure moments, simpler next-step thinking can help you cut through mental fog faster."
  },
  agency: {
    high: "You move from insight to action quickly. Once you decide, you trust yourself enough to follow through.",
    medium: "You act with intention when stakes are clear. A tighter commitment window can make your follow-through more consistent.",
    low: "You may overthink before acting. Choosing one small move early can build momentum and confidence in your own direction."
  },
  structure: {
    high: "You naturally organize complexity. Plans, systems, and routines help you stay steady when life gets noisy.",
    medium: "You can build structure when needed. Turning key habits into repeatable rituals will reduce decision fatigue.",
    low: "Your thinking may feel scattered under load. A simple checklist or decision framework can quickly restore order."
  },
  imagination: {
    high: "You see angles other people miss. New patterns and possibilities come naturally, especially in uncertain situations.",
    medium: "You balance practical thinking with creative range. Giving yourself deliberate brainstorming time can unlock stronger ideas.",
    low: "You may default to familiar routes. Exploring one alternative perspective before deciding can expand your options."
  },
  depth: {
    high: "You read the emotional and moral weight beneath the surface. That depth helps you make choices with real integrity.",
    medium: "You notice deeper layers when you slow down. Reflective checkpoints can help you convert insight into clearer judgment.",
    low: "You may focus on speed over reflection. Brief pauses to ask what truly matters can add depth without slowing momentum too much."
  }
};

function getPillarTooltip(pillarId, score) {
  const pillarCopy = PILLAR_TOOLTIP_COPY[pillarId];
  if (!pillarCopy) return "This pillar shapes how you reason under pressure.";
  if (score >= 70) return pillarCopy.high;
  if (score >= 45) return pillarCopy.medium;
  return pillarCopy.low;
}

const AXIS_MATCH_COPY = {
  meaning: {
    headline: "This is your meaning axis.",
    detail: "It shows what you reach for when life stops feeling self-evident and you have to decide what still deserves your commitment."
  },
  ethics: {
    headline: "This is your ethics axis.",
    detail: "It shows the kind of moral reasoning you trust when consequences, principles, and responsibility all pull at once."
  },
  self: {
    headline: "This is your self axis.",
    detail: "It shows how you build identity, ownership, and inner coherence when you are trying to become more fully yourself."
  },
  action: {
    headline: "This is your action axis.",
    detail: "It shows how you move from judgment into behavior when the moment asks for a decision instead of another reflection."
  }
};

function getAxisWinnerInterpretation(axisId, philosopher) {
  const axisCopy = AXIS_MATCH_COPY[axisId] || AXIS_MATCH_COPY.meaning;

  return {
    headline: axisCopy.headline,
    detail: axisCopy.detail,
    meaning: `${philosopher?.title || philosopher?.name || "This thinker"} suggests that your ${axisId} pattern leans toward clear, deliberate judgment rather than reactive drift.`,
    philosopherLine: philosopher?.summary || "This match reflects a recognizable pattern in how you orient yourself under pressure."
  };
}

export default function ResultsPage() {
  const [activePillarTooltip, setActivePillarTooltip] = useState(null);

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
  const axisWinners = useMemo(() => {
    if (Array.isArray(storedResult?.winners) && storedResult.winners.length) {
      return storedResult.winners;
    }

    const fallbackAnswers = storedResult?.answersByQuestionId || {};
    return computeAxisWinners(fallbackAnswers, buildFlow()).winners;
  }, [storedResult]);
  const resolvedSubarchetype = useMemo(() => {
    if (!storedResult) return null;
    if (storedResult?.subarchetype?.id) return storedResult.subarchetype;
    return computeSubarchetype(storedResult?.answersByQuestionId || {});
  }, [storedResult]);
  const displayName = resolvedProfile?.name || finalPhilosopher?.title || "The Lucid Witness";
  const displaySummary = resolvedProfile?.summary || finalPhilosopher?.summary || "You think with unusual intensity and pattern awareness. Your next step is to pair that gift with steadier execution in uncertain moments.";
  const displayCardTitle = resolvedProfile?.cardTitle || displayName.toUpperCase();
  const cardImageSrc = ARCHETYPE_CARD_IMAGES[resolvedProfile?.primaryStyle] || "/cards/default-archive.webp";
  const cardImageAlt = `${displayName} tarot-inspired thinker card`;
  const rarityPercent = Math.max(1, Math.min(99, Math.round((resolvedProfile?.styleDistribution?.[resolvedProfile?.primaryStyle] ?? 0.5) * 100)));
  const shareCaption = `${displayName} :: ${displaySummary}`;
  const reasoningTemperament = resolvedProfile?.reasoningTemperament || "Your stable thinking pattern is the way you make sense of uncertainty, choose a direction, and stay coherent when pressure rises. Clarity keeps you honest about what matters, structure keeps your thinking organized, agency turns insight into action, imagination widens the frame, and depth keeps the emotional cost in view. In practice, this pattern helps you read situations early and respond with intention instead of impulse. However, when one weaker trait is stretched too thin, it can narrow your reasoning, slow your judgment, and keep part of your potential out of reach.";
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

  async function handleDownloadCard() {
    try {
      // Fetch the card image
      const response = await fetch(cardImageSrc);
      const blob = await response.blob();
      const img = new Image();
      img.onload = () => {
        // Create canvas with black margins around the card
        const CARD_WIDTH = 1080;
        const CARD_HEIGHT = 1920;
        const MARGIN = 40; // Black margin around the entire card
        const CANVAS_WIDTH = CARD_WIDTH + MARGIN * 2;
        const CANVAS_HEIGHT = CARD_HEIGHT + MARGIN * 2;
        
        const canvas = document.createElement("canvas");
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;
        const ctx = canvas.getContext("2d");

        // Fill entire canvas with black background
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // Draw the card image in the center (with margins)
        ctx.drawImage(img, MARGIN, MARGIN, CARD_WIDTH, CARD_HEIGHT);

        // Draw gold border around the card
        ctx.strokeStyle = "rgba(233, 193, 118, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(MARGIN, MARGIN, CARD_WIDTH, CARD_HEIGHT);

        // Draw subtle gradient overlay for text legibility (very transparent)
        const gradientOverlay = ctx.createLinearGradient(MARGIN, MARGIN + CARD_HEIGHT * 0.65, MARGIN, MARGIN + CARD_HEIGHT);
        gradientOverlay.addColorStop(0, "rgba(10, 10, 10, 0.3)");
        gradientOverlay.addColorStop(0.5, "rgba(10, 10, 10, 0.15)");
        gradientOverlay.addColorStop(1, "rgba(10, 10, 10, 0)");
        ctx.fillStyle = gradientOverlay;
        ctx.fillRect(MARGIN, MARGIN + CARD_HEIGHT * 0.55, CARD_WIDTH, CARD_HEIGHT * 0.45);

        // Set up text rendering - Gold color (#e9c176)
        ctx.textAlign = "center";
        const textCenterX = MARGIN + CARD_WIDTH / 2;

        // Draw "ARCHETYPE" label (small, all caps, letter-spaced)
        ctx.fillStyle = "rgba(233, 193, 118, 0.9)";
        ctx.font = "bold 28px sans-serif";
        ctx.letterSpacing = "4px";
        ctx.fillText("ARCHETYPE", textCenterX, MARGIN + CARD_HEIGHT - 340);

        // Draw archetype name (large, italic)
        ctx.fillStyle = "rgba(229, 226, 225, 1)";
        ctx.font = "italic 72px serif";
        ctx.letterSpacing = "0px";
        ctx.fillText(displayCardTitle, textCenterX, MARGIN + CARD_HEIGHT - 240);

        // Draw separator line 1
        ctx.strokeStyle = "rgba(233, 193, 118, 0.5)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(textCenterX - 40, MARGIN + CARD_HEIGHT - 200);
        ctx.lineTo(textCenterX + 40, MARGIN + CARD_HEIGHT - 200);
        ctx.stroke();

        // Draw hub icon symbol (◈)
        ctx.fillStyle = "rgba(233, 193, 118, 0.8)";
        ctx.font = "68px sans-serif";
        ctx.fillText("◈", textCenterX, MARGIN + CARD_HEIGHT - 110);

        // Draw separator line 2
        ctx.strokeStyle = "rgba(233, 193, 118, 0.4)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(textCenterX - 24, MARGIN + CARD_HEIGHT - 60);
        ctx.lineTo(textCenterX + 24, MARGIN + CARD_HEIGHT - 60);
        ctx.stroke();

        // Draw "PHILOSIFT" branding (small, letter-spaced)
        ctx.fillStyle = "rgba(233, 193, 118, 0.7)";
        ctx.font = "bold 22px sans-serif";
        ctx.letterSpacing = "3px";
        ctx.fillText("PHILOSIFT", textCenterX, MARGIN + CARD_HEIGHT - 20);

        // Convert canvas to blob and download
        canvas.toBlob((canvasBlob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(canvasBlob);
          link.download = `philosift-${resolvedProfile?.primaryStyle || "artefact"}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
        }, "image/jpeg", 0.95);
      };
      img.onerror = () => {
        console.error("Failed to load card image for download");
      };
      img.src = URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error downloading card:", error);
    }
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
            <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-10 font-headline text-7xl sm:text-8xl md:text-9xl">I</div>
            <div className="relative z-10">
              <div className="flex items-start justify-between gap-4 mb-8 sm:mb-10 md:mb-16">
                <div>
                  <h3 className="font-headline text-2xl sm:text-3xl italic mb-1">Reasoning Temperament</h3>
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline">Your Stable Thinking Pattern</p>
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
                  <div className="absolute bottom-2 -right-1 translate-x-1 translate-y-1 font-label text-[9px] tracking-widest text-on-surface-variant uppercase sm:bottom-4 sm:-right-3 sm:translate-x-0 sm:translate-y-0">{pillarEntries[2]?.label}</div>
                  <div className="absolute bottom-4 -left-3 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[3]?.label}</div>
                  <div className="absolute top-1/4 -left-7 font-label text-[9px] tracking-widest text-on-surface-variant uppercase">{pillarEntries[4]?.label}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 mt-4 sm:mt-6">
                {pillarEntries.map((pillar, index) => (
                  <div key={pillar.id} className={`relative flex flex-col gap-1 ${index % 2 === 1 ? "text-right" : ""}`}>
                    <div className={`flex items-center gap-2 ${index % 2 === 1 ? "justify-end" : ""}`}>
                      <span className="text-[10px] font-label uppercase tracking-wider text-outline">{pillar.label}</span>
                      <button
                        type="button"
                        onClick={() => setActivePillarTooltip((current) => current === pillar.id ? null : pillar.id)}
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-primary/35 bg-surface-container-lowest/80 text-primary/90 transition-colors hover:border-primary hover:text-primary"
                        aria-label={`Explain ${pillar.label}`}
                        aria-expanded={activePillarTooltip === pillar.id}
                      >
                        <span className="material-symbols-outlined text-[14px] leading-none">hub</span>
                      </button>
                    </div>
                    <span className="font-headline text-xl italic text-on-surface sm:text-2xl">{pillar.score}%</span>

                    {activePillarTooltip === pillar.id && (
                      <div className={`absolute z-20 top-0 ${index % 2 === 1 ? "right-0" : "left-0"} -translate-y-[108%] w-56 border border-primary/35 bg-[#171616] p-3 shadow-glow`}>
                        <p className="font-label text-[9px] uppercase tracking-[0.2em] text-primary/90">{pillar.label} Insight</p>
                        <p className="mt-2 text-xs leading-relaxed text-on-surface-variant">{getPillarTooltip(pillar.id, pillar.score)}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-surface-container-lowest/80 p-4 sm:p-5">
                <p className="font-label text-[10px] uppercase tracking-[0.18em] text-primary mb-3">Your Reading</p>
                <p className="text-sm text-on-surface-variant leading-relaxed sm:text-[0.96rem]">
                  {reasoningTemperament}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-5 flex items-start justify-between gap-4 sm:mb-6">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Philosophers with Similar Patterns</p>
              <h3 className="mt-2 font-headline text-2xl italic text-on-surface sm:text-3xl">Thinkers whose logic mirrors yours</h3>
            </div>
            <span className="material-symbols-outlined text-primary/80 text-3xl sm:text-4xl">psychology</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {axisWinners.map((winner) => {
              const philosopher = winner?.philosopher || PHILOSOPHERS[winner?.philosopherId] || null;
              if (!philosopher) return null;

              const interpretation = getAxisWinnerInterpretation(winner.axisId, philosopher);

              return (
                <article key={winner.axisId} className="border border-outline-variant/20 bg-surface-container-high p-5 sm:p-6 flex flex-col gap-4 min-h-[220px]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">{winner.axisLabel}</span>
                      <h4 className="mt-2 font-headline text-xl italic text-on-surface sm:text-2xl">{philosopher.name}</h4>
                    </div>
                    <span className="material-symbols-outlined text-primary/70 text-2xl">person</span>
                  </div>

                  <p className="text-sm leading-relaxed text-on-surface-variant">{philosopher.summary}</p>

                  <div className="rounded-lg border border-primary/20 bg-surface-container-lowest/70 p-4">
                    <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">What this means</p>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{interpretation.headline} {interpretation.detail} {interpretation.meaning}</p>
                  </div>

                  <p className="text-[0.82rem] leading-relaxed text-on-surface-variant/90">{interpretation.philosopherLine}</p>
                </article>
              );
            })}
          </div>
        </section>

        {resolvedSubarchetype?.id && (
          <section className="mb-16">
            <article className="border border-primary/30 bg-surface-container-low/90 p-5 sm:p-6 md:p-8">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">Where You Lose Control</p>
                  <h3 className="mt-2 font-headline text-2xl italic text-on-surface sm:text-3xl">{resolvedSubarchetype.name}</h3>
                </div>
                <span className="material-symbols-outlined text-primary/80">hub</span>
              </div>

              <p className="text-sm leading-relaxed text-on-surface-variant sm:text-base">
                {resolvedSubarchetype.patternLabel || resolvedSubarchetype.tagline}
              </p>

              <div className="mt-5 rounded-lg border border-outline-variant/25 bg-surface-container-high/80 p-4 sm:p-5">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">How the loop repeats</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype.loopExplanation || resolvedSubarchetype.weakness}</p>
              </div>

              <div className="mt-5 rounded-lg border border-primary/25 bg-primary/10 p-4 sm:p-5">
                <p className="font-label text-[9px] uppercase tracking-[0.22em] text-primary/90">Where things fall apart</p>
                <p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{resolvedSubarchetype.consequence || "Without intervention, this cycle repeats and progress fails to compound."}</p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-on-surface-variant sm:max-w-2xl">
                  PhiloSift turns this pattern into an actionable path by showing what to stop repeating and what to practice next.
                </p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25"
                >
                  <span className="material-symbols-outlined text-base">workspace_premium</span>
                  {resolvedSubarchetype.cta}
                </button>
              </div>
            </article>
          </section>
        )}

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
