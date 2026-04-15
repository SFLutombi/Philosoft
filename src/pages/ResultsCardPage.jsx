import { useMemo } from "react";
import { Link, Navigate } from "react-router-dom";
import { buildResultDisplay, loadStoredResult, resolveProfile } from "../data/resultFlow";

export default function ResultsCardPage() {
  const storedResult = useMemo(() => loadStoredResult(), []);
  const resolvedProfile = useMemo(() => resolveProfile(storedResult), [storedResult]);
  const view = useMemo(() => buildResultDisplay(storedResult, resolvedProfile), [storedResult, resolvedProfile]);

  async function handleDownloadCard() {
    try {
      const response = await fetch(view.cardImageSrc);
      const blob = await response.blob();
      const img = new Image();
      img.onload = () => {
        const CARD_WIDTH = 1080;
        const CARD_HEIGHT = 1920;
        const MARGIN = 40;
        const canvas = document.createElement("canvas");
        canvas.width = CARD_WIDTH + (MARGIN * 2);
        canvas.height = CARD_HEIGHT + (MARGIN * 2);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, MARGIN, MARGIN, CARD_WIDTH, CARD_HEIGHT);

        ctx.strokeStyle = "rgba(233, 193, 118, 0.2)";
        ctx.lineWidth = 2;
        ctx.strokeRect(MARGIN, MARGIN, CARD_WIDTH, CARD_HEIGHT);

        ctx.textAlign = "center";
        const centerX = MARGIN + (CARD_WIDTH / 2);

        ctx.fillStyle = "rgba(233, 193, 118, 0.9)";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText("ARCHETYPE", centerX, MARGIN + CARD_HEIGHT - 340);

        ctx.fillStyle = "rgba(229, 226, 225, 1)";
        ctx.font = "italic 72px serif";
        ctx.fillText(view.displayCardTitle, centerX, MARGIN + CARD_HEIGHT - 240);

        ctx.strokeStyle = "rgba(233, 193, 118, 0.5)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(centerX - 40, MARGIN + CARD_HEIGHT - 200);
        ctx.lineTo(centerX + 40, MARGIN + CARD_HEIGHT - 200);
        ctx.stroke();

        ctx.fillStyle = "rgba(233, 193, 118, 0.8)";
        ctx.font = "68px sans-serif";
        ctx.fillText("◈", centerX, MARGIN + CARD_HEIGHT - 110);

        ctx.fillStyle = "rgba(233, 193, 118, 0.7)";
        ctx.font = "bold 22px sans-serif";
        ctx.fillText("PHILOSIFT", centerX, MARGIN + CARD_HEIGHT - 20);

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

      img.src = URL.createObjectURL(blob);
    } catch {
      // no-op fallback
    }
  }

  if (!storedResult) {
    return <Navigate to="/quiz" replace />;
  }

  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-5xl flex-col justify-center px-4 py-8 sm:px-6">
        <section className="artifact-unlock">
          <div className="artifact-unlock__shell p-4 sm:p-6 md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4 md:mb-6">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.35em] text-primary/90">Mental Artefact</span>
                <h3 className="font-headline mt-2 text-2xl italic tracking-tight text-on-surface sm:text-3xl">Rarity: {view.rarityPercent}%</h3>
              </div>
              <span className="material-symbols-outlined artifact-unlock__sigil text-primary text-3xl">diamond</span>
            </div>

            <div className="artifact-unlock__card mx-auto max-w-[17rem] p-1 sm:max-w-[19rem]">
              <div className="artifact-unlock__frame relative aspect-[9/16] overflow-hidden border border-primary/20 bg-surface-container-lowest">
                <div className="artifact-unlock__beam absolute inset-0" />
                <img className="absolute inset-0 h-full w-full object-cover" src={view.cardImageSrc} alt={view.cardImageAlt} />
                <div className="artifact-unlock__text-gradient absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-[#0a0a0a] via-[#1a1a1a]/80 to-transparent z-20" />

                <div className="relative z-30 flex h-full flex-col items-center justify-end px-6 pb-10 text-center">
                  <h4 className="font-headline mb-2 text-[0.65rem] tracking-[0.5em] text-primary/90 uppercase">Archetype</h4>
                  <h2 className="font-headline mb-4 text-xl italic leading-none tracking-tighter text-on-surface">{view.displayCardTitle}</h2>
                  <div className="mb-4 h-px w-6 bg-primary/50" />
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center py-3">
                  <span className="material-symbols-outlined text-primary/80 text-xl mb-1">hub</span>
                  <div className="h-px w-5 bg-primary/40 mb-2" />
                  <span className="font-headline text-[10px] tracking-[0.2em] text-primary/70">PHILOSIFT</span>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button type="button" onClick={handleDownloadCard} className="flex w-full items-center justify-center gap-3 border border-primary/50 bg-surface-container-lowest py-4 font-label text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-surface-container">
                <span className="material-symbols-outlined text-lg">download</span>
                Download
              </button>
              <Link to="/results-description" className="flex w-full items-center justify-center gap-3 bg-primary py-4 font-label text-xs font-bold uppercase tracking-[0.2em] text-on-primary transition-colors hover:bg-on-primary-container">
                <span className="material-symbols-outlined text-lg">auto_stories</span>
                Find Out More
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
