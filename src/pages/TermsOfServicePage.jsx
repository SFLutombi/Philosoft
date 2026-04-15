import { Link } from "react-router-dom";

export default function TermsOfServicePage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 15, 2026</p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-on-surface-variant">
            <p>By using PhiloSift, you agree to these terms. If you do not agree, do not use the service.</p>
            <p>PhiloSift provides reflective tools and behavioral prompts for personal insight. It is not a medical, psychiatric, legal, or financial service.</p>
            <p>You are responsible for account use, billing details, and activity under your access credentials.</p>
            <p>Paid features are billed according to the active plan shown at checkout. Trial and renewal details are shown before purchase.</p>
            <p>We may update, suspend, or discontinue parts of the service to maintain safety, reliability, and legal compliance.</p>
            <p>To the maximum extent allowed by law, PhiloSift is provided "as is" without warranties of uninterrupted availability.</p>
            <p>For support questions, contact your listed support channel in product communications.</p>
          </div>

          <div className="mt-8">
            <Link to="/landing" className="inline-flex items-center justify-center border border-primary/45 bg-primary/15 px-5 py-3 font-label text-xs uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
              Back to app
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
