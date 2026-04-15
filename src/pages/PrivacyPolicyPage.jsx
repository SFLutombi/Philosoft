import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 15, 2026</p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-on-surface-variant">
            <p>PhiloSift collects limited information needed to run the service, such as usage events, purchase status, and basic account identifiers.</p>
            <p>Payment processing data is handled by billing providers and payment partners. PhiloSift does not store full card numbers.</p>
            <p>We use collected data to deliver product features, improve reliability, prevent abuse, and support subscriptions.</p>
            <p>We do not sell your personal information. We may share data with trusted processors that help us operate the service.</p>
            <p>You can request access, correction, or deletion of your data where applicable by contacting support.</p>
            <p>We apply reasonable security controls, but no method of transmission or storage is guaranteed to be fully secure.</p>
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
