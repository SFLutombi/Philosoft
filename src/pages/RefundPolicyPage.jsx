import { Link } from "react-router-dom";

export default function RefundPolicyPage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Refund Policy</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 17, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-on-surface-variant">
            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">1. Scope</h2>
              <p>
                This Refund Policy applies to paid subscriptions and purchases made for Philosift through our authorized billing
                channels.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">2. Trials and Subscription Start</h2>
              <p>
                If a free trial is offered, you will not be charged until the trial ends. If you do not cancel before the trial end,
                your subscription will convert to a paid plan and charges will apply according to the checkout terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">3. General Refund Rule</h2>
              <p>
                Except where required by applicable law, subscription charges are non-refundable once billed. Partial refunds and
                prorated refunds are generally not provided for unused time in an active billing period.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">4. Cancellation</h2>
              <p>
                You may cancel at any time. Cancellation prevents future renewal charges. Access continues through the end of the
                current paid term unless otherwise stated at checkout or required by law.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">5. Refund Exceptions</h2>
              <p>Refund requests may be considered in limited circumstances, including:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Duplicate or clearly accidental charges.</li>
                <li>Unauthorized charges confirmed after review.</li>
                <li>Technical billing errors caused by our systems.</li>
                <li>Cases where a refund is required by mandatory consumer protection law.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">6. How to Request a Refund</h2>
              <p>
                Submit refund requests to <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a> within 14 days of the charge date.
                Include your account email, transaction date, amount, and reason for request.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">7. Processing Timelines</h2>
              <p>
                If approved, refunds are issued to the original payment method. Processing and settlement times depend on your payment
                provider and financial institution, typically within 5 to 15 business days.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">8. Chargebacks</h2>
              <p>
                Before initiating a chargeback, contact support so we can review and resolve billing concerns quickly. Fraudulent or
                abusive chargebacks may result in account suspension or termination.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">9. Policy Updates</h2>
              <p>
                We may update this Refund Policy from time to time. Changes are effective when posted unless otherwise required by law.
              </p>
            </div>
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
