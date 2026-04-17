import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 18, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-on-surface-variant">
            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">Welcome</h2>
              <p>
                This Privacy Policy describes how Philosift ("Philosift", "we", "us", "our") collects, uses, shares, and protects
                Personal Data when you use our website, applications, and related services (collectively, the "Services").
              </p>
              <p>
                This Policy also explains your rights and choices and how to contact us regarding privacy.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">1. Definitions</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>"Personal Data" means information that identifies or can reasonably identify an individual.</li>
                <li>"Business User" means an organization account using Philosift for internal use.</li>
                <li>"End User" means an individual using Philosift directly for personal use.</li>
                <li>"Services" includes our sites, apps, APIs, communications, and support operations.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">2. Our Role: Controller and Processor</h2>
              <p>
                Depending on context, Philosift may act as a data controller (deciding why/how data is processed) or a data processor
                (processing on behalf of a Business User under instructions).
              </p>
              <p>
                If you are using Philosift through a business account, that business may be the controller for certain processing. In
                those cases, please also review that business's privacy notice.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">3. Personal Data We Collect</h2>
              <p>We may collect:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Account data: name, email, auth identifiers, account settings, and profile fields.</li>
                <li>Service data: onboarding responses, usage events, preferences, and in-app activity.</li>
                <li>Device and technical data: IP address, browser/device type, OS, log files, and diagnostics.</li>
                <li>Billing and subscription data: plan, transaction metadata, payment status, and renewal state.</li>
                <li>Support and communications data: messages, tickets, and associated troubleshooting records.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">4. Sources of Personal Data</h2>
              <p>We collect Personal Data directly from you, automatically through your use of Services, and from third parties such as:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Authentication providers</li>
                <li>Billing/payment providers</li>
                <li>Analytics and infrastructure providers</li>
                <li>Fraud/security and compliance service providers</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">5. How We Use Personal Data</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Provide, secure, and operate the Services.</li>
                <li>Authenticate accounts and manage access controls.</li>
                <li>Process subscriptions, billing, fraud checks, and dispute handling.</li>
                <li>Deliver customer support and service communications.</li>
                <li>Improve performance, quality, and product experience.</li>
                <li>Comply with legal obligations and enforce our terms and policies.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">6. Legal Bases for Processing</h2>
              <p>
                Where required by applicable law, we rely on one or more legal bases: contract necessity, legitimate interests,
                consent, and legal obligation.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">7. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar technologies for authentication, security, analytics, and performance. You may control
                cookies through your browser settings, but disabling certain cookies may affect core functionality.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">8. Sharing of Personal Data</h2>
              <p>We do not sell Personal Data. We may share data with:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Vendors and processors that support hosting, authentication, billing, analytics, notifications, and support.</li>
                <li>Professional advisors and authorities where required by law or to protect rights and safety.</li>
                <li>Corporate transaction counterparties in merger, financing, acquisition, or reorganization events.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">9. Your Rights and Choices</h2>
              <p>Depending on jurisdiction, you may have rights to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Access, correct, update, or delete Personal Data.</li>
                <li>Restrict or object to certain processing.</li>
                <li>Request portability where technically feasible.</li>
                <li>Withdraw consent where processing is consent-based.</li>
                <li>Appeal decisions and lodge complaints with regulators.</li>
              </ul>
              <p>
                To exercise rights, contact <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a>.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">10. Data Retention</h2>
              <p>
                We retain personal information only as long as necessary to provide the Service, maintain records, resolve disputes,
                enforce agreements, and satisfy legal obligations.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">11. Security</h2>
              <p>
                We implement administrative, technical, and organizational safeguards designed to protect personal information.
                However, no system is completely secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">12. International Data Transfers</h2>
              <p>
                Your information may be processed in countries other than your own. Where required, we apply appropriate safeguards
                for cross-border data transfers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">13. Minors</h2>
              <p>
                Services are not directed to children under 13 (or higher minimum age required by local law). If you believe a child
                submitted Personal Data, contact us so we can review and remove data where appropriate.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">14. Jurisdiction-Specific Notices</h2>
              <p>
                Depending on your location, additional rights and disclosures may apply under regional laws (for example, EEA/UK,
                certain US states, Canada, Brazil, and other jurisdictions). Where those laws apply, we honor required rights and
                obligations.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">15. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will update the "Last updated" date and provide additional
                notice where required by law.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">16. Contact Us</h2>
              <p>
                Questions or requests about this Policy can be sent to <a className="text-primary hover:text-primary/80" href="mailto:support@philosift.com">support@philosift.com</a>.
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
