import { Link } from "react-router-dom";

export default function RefundPolicyPage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Refund Policy</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 15, 2026</p>

          <div className="mt-6 space-y-5 text-sm leading-relaxed text-on-surface-variant">
            <p>Subscriptions may include a free trial where configured at checkout. No charge is applied during the trial period.</p>
            <p>After trial conversion or purchase, subscription fees are generally non-refundable except where required by law.</p>
            <p>You can cancel at any time. Cancellation stops future renewals and access remains active until the current billing period ends.</p>
            <p>If you believe a charge was made in error, contact support with your transaction details for review.</p>
            <p>Where a refund is approved, processing timelines depend on your billing provider and payment method.</p>
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
