import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 17, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-on-surface-variant">
            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">1. Scope</h2>
              <p>
                This Privacy Policy explains how PhiloSift ("PhiloSift", "we", "us", "our") collects, uses, stores, and shares
                personal information when you use our website, applications, and related services (collectively, the "Service").
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">2. Information We Collect</h2>
              <p>We collect information in the following categories:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Account and identity data: name, email address, authentication identifiers, and account metadata.</li>
                <li>Profile and content data: onboarding responses, settings, and user-provided profile information.</li>
                <li>Usage and diagnostics data: event logs, device/browser details, IP address, and session activity.</li>
                <li>Subscription and transaction data: plan status, billing metadata, and purchase history from payment providers.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">3. How We Use Information</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Provide, operate, maintain, and secure the Service.</li>
                <li>Authenticate users and manage access to protected features.</li>
                <li>Process subscriptions, prevent fraud, and support customer requests.</li>
                <li>Improve product functionality, performance, and reliability.</li>
                <li>Comply with legal obligations and enforce our Terms of Service.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">4. Legal Bases (Where Applicable)</h2>
              <p>
                Where required by law, we process personal information on the basis of contract performance, legitimate interests,
                legal compliance, and your consent when consent is required.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">5. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar technologies for authentication, security, analytics, and performance. You may control
                cookies through your browser settings, but disabling certain cookies may affect core functionality.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">6. Sharing of Information</h2>
              <p>We do not sell personal information. We may share information with:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Authentication, infrastructure, analytics, support, and billing providers acting as service processors.</li>
                <li>Professional advisors and authorities when required for legal or compliance reasons.</li>
                <li>Successors in connection with a merger, financing, acquisition, reorganization, or asset sale.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">7. Data Retention</h2>
              <p>
                We retain personal information only as long as necessary to provide the Service, maintain records, resolve disputes,
                enforce agreements, and satisfy legal obligations.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">8. Security</h2>
              <p>
                We implement administrative, technical, and organizational safeguards designed to protect personal information.
                However, no system is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">9. International Transfers</h2>
              <p>
                Your information may be processed in countries other than your own. Where required, we apply appropriate safeguards
                for cross-border data transfers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">10. Your Privacy Rights</h2>
              <p>Subject to applicable law, you may have rights to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Access, correct, update, or delete your personal information.</li>
                <li>Object to or restrict certain processing.</li>
                <li>Request portability of your information.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Appeal certain privacy decisions or lodge a complaint with a supervisory authority.</li>
              </ul>
              <p>
                To exercise rights, contact us at <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a>.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">11. Children</h2>
              <p>
                The Service is not directed to children under 13 (or the minimum age in your jurisdiction). We do not knowingly
                collect personal information from children. If you believe a child has provided information, contact us for removal.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">12. Policy Updates</h2>
              <p>
                We may update this Privacy Policy periodically. Material changes will be reflected by updating the "Last updated"
                date and, where required, by additional notice.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">13. Contact</h2>
              <p>
                Questions about this Privacy Policy can be sent to <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a>.
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
