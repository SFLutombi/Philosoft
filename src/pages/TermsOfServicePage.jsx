import { Link } from "react-router-dom";

export default function TermsOfServicePage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 17, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-on-surface-variant">
            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">1. Agreement to Terms</h2>
              <p>
                By accessing or using PhiloSift (the "Service"), you agree to be bound by these Terms of Service ("Terms").
                If you do not agree to these Terms, do not use the Service.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">2. Eligibility</h2>
              <p>
                You must be at least 18 years old, or the age of majority in your jurisdiction, to use paid features of the Service.
                By using the Service, you represent that you meet this requirement and have legal capacity to enter into these Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">3. Service Description and Important Disclaimer</h2>
              <p>
                PhiloSift provides reflective, educational, and productivity-oriented tools. The Service does not provide medical,
                psychiatric, psychological, legal, tax, or financial advice, diagnosis, or treatment, and is not a substitute for
                professional services.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">4. Account Registration and Security</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>You are responsible for maintaining the confidentiality of your credentials.</li>
                <li>You are responsible for all activities that occur under your account.</li>
                <li>You must provide accurate account and billing information and keep it current.</li>
                <li>You agree to notify us promptly of unauthorized access or security incidents.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Use the Service in violation of applicable law or regulations.</li>
                <li>Attempt unauthorized access to systems, accounts, or data.</li>
                <li>Interfere with service integrity, availability, or security.</li>
                <li>Reverse engineer, copy, scrape, or exploit the Service except as permitted by law.</li>
                <li>Use the Service to transmit harmful code, spam, or abusive content.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">6. Subscriptions, Trials, Billing, and Renewal</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Paid features are billed according to plan terms shown at checkout.</li>
                <li>If a free trial is offered, billing begins when the trial period ends unless canceled before conversion.</li>
                <li>Subscriptions renew automatically unless canceled before the next billing date.</li>
                <li>You authorize our billing providers to charge the selected payment method for recurring fees and taxes.</li>
              </ul>
              <p>
                Payment processing is handled by third-party providers. We do not store full payment card details.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">7. Cancellation and Termination</h2>
              <p>
                You may cancel your subscription at any time. Cancellation prevents future renewal charges, and paid access continues
                through the end of the current billing period unless otherwise required by law.
              </p>
              <p>
                We may suspend or terminate access if you violate these Terms, create risk or liability, or where required for legal,
                security, or operational reasons.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">8. Intellectual Property</h2>
              <p>
                The Service, including software, content, trademarks, branding, and design elements, is owned by or licensed to
                PhiloSift and protected by intellectual property laws. Except for limited rights granted under these Terms, no rights
                are transferred to you.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">9. Feedback</h2>
              <p>
                If you submit suggestions or feedback, you grant PhiloSift a worldwide, perpetual, irrevocable, royalty-free right to
                use and incorporate such feedback without restriction or compensation.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">10. Warranty Disclaimer</h2>
              <p>
                To the maximum extent permitted by law, the Service is provided "as is" and "as available" without warranties of any
                kind, express or implied, including implied warranties of merchantability, fitness for a particular purpose,
                non-infringement, availability, accuracy, or reliability.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">11. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, PhiloSift and its affiliates, officers, employees, and service providers will
                not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of data,
                profits, goodwill, or business interruption.
              </p>
              <p>
                To the maximum extent permitted by law, our aggregate liability for claims relating to the Service will not exceed the
                total amount you paid to PhiloSift for the Service during the twelve (12) months before the event giving rise to the
                claim.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">12. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless PhiloSift and its affiliates from and against claims, losses,
                liabilities, and expenses (including reasonable legal fees) arising from your use of the Service, your violation of
                these Terms, or your infringement of third-party rights.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">13. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by applicable law in the jurisdiction where PhiloSift is established, without regard to
                conflict-of-law principles. Where mandatory consumer protection law applies, nothing in these Terms limits your rights
                under such laws.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">14. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. Material changes become effective when posted or as otherwise required by
                law. Continued use of the Service after updates become effective constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">15. Contact</h2>
              <p>
                For questions about these Terms, contact <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a>.
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
