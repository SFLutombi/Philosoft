import { Link } from "react-router-dom";

export default function TermsOfServicePage() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="border border-primary/30 bg-surface-container-low/90 p-6 sm:p-8">
          <h1 className="font-headline text-3xl italic text-on-surface sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-on-surface-variant">Last updated: April 18, 2026</p>

          <div className="mt-6 space-y-6 text-sm leading-relaxed text-on-surface-variant">
            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") form a legally binding agreement between you and Philosift for access to and use of
                the Philosift website, applications, products, and related services (collectively, the "Service").
              </p>
              <p>
                By creating an account, purchasing a subscription, or otherwise using the Service, you confirm that you have read,
                understood, and agree to these Terms and our Privacy Policy. If you do not agree, do not use the Service.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">1. Definitions and Interpretation</h2>
              <p>In these Terms:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>"Account" means your registered Philosift user account.</li>
                <li>"Subscription" means any paid plan giving access to premium Service features.</li>
                <li>"Content" means text, media, data, prompts, analytics, and outputs available via the Service.</li>
                <li>"User Content" means information, responses, settings, or other material submitted by you.</li>
                <li>"Billing Provider" means authorized third-party processors used for checkout and recurring billing.</li>
              </ul>
              <p>
                Headings are for convenience only. Words such as "including" are illustrative and do not limit the words that follow.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">2. Eligibility</h2>
              <p>
                You must be at least 18 years old, or the age of majority in your jurisdiction, to use paid features of the Service.
                By using the Service, you represent that you satisfy this requirement and can enter into binding agreements.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">3. Service Description and Important Disclaimer</h2>
              <p>
                Philosift provides reflective and productivity-oriented tools designed for personal insight and behavior support.
                Philosift is not a medical, psychiatric, psychological, legal, tax, or financial service, and does not provide
                professional advice, diagnosis, or treatment.
              </p>
              <p>
                If you are in crisis or need clinical support, contact licensed professionals or local emergency services immediately.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">4. Account Registration and Security</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>You are responsible for maintaining account credential confidentiality.</li>
                <li>You are responsible for all activity that occurs under your Account.</li>
                <li>You must provide accurate information and keep it current.</li>
                <li>You must promptly notify us of suspected unauthorized use or security incidents.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">5. Acceptable Use</h2>
              <p>You agree not to:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Use the Service in violation of applicable law or third-party rights.</li>
                <li>Interfere with, disrupt, or attempt unauthorized access to systems or data.</li>
                <li>Reverse engineer, scrape, or reproduce the Service except as permitted by law.</li>
                <li>Use the Service to transmit malware, harmful code, spam, or abusive content.</li>
                <li>Misrepresent identity, affiliation, or authorization when using the Service.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">6. Subscriptions, Billing, and Renewal</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>Subscription pricing, trial terms, and billing interval are presented at checkout.</li>
                <li>If a trial is offered, billing begins at trial end unless canceled beforehand.</li>
                <li>Subscriptions renew automatically unless canceled before the next billing date.</li>
                <li>You authorize Philosift and its Billing Providers to charge your selected payment method.</li>
              </ul>
              <p>
                Payment processing is handled by Billing Providers. Philosift does not store full payment card numbers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">7. Cancellation and Refunds</h2>
              <p>
                You may cancel at any time. Cancellation prevents future renewals and paid access continues until the end of the
                current billing term unless required otherwise by law.
              </p>
              <p>
                Refund eligibility is governed by the Refund Policy. Where mandatory consumer rights apply, those rights are preserved.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">8. Intellectual Property Rights</h2>
              <p>
                The Service, including software, interfaces, content, branding, and documentation, is owned by or licensed to
                Philosift and protected under intellectual property laws.
              </p>
              <p>
                Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Service
                for personal or internal business use.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">9. User Content and Feedback</h2>
              <p>
                You retain ownership of User Content you submit. You grant Philosift a non-exclusive, worldwide, royalty-free license
                to host, process, and use User Content solely to operate, improve, and secure the Service.
              </p>
              <p>
                If you submit suggestions or feedback, you grant Philosift a worldwide, perpetual, irrevocable, royalty-free right to
                use it without restriction or compensation.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">10. Third-Party Services</h2>
              <p>
                The Service may integrate with third-party services (including authentication, analytics, notifications, and billing).
                Your use of third-party services may be subject to their terms and policies.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">11. Suspension and Termination</h2>
              <p>
                We may suspend or terminate access immediately if we reasonably believe you violated these Terms, created legal or
                security risk, or where suspension is required by law or service provider requirements.
              </p>
              <p>
                On termination, rights granted to you under these Terms end, except provisions that by nature survive termination.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">12. Warranty Disclaimer</h2>
              <p>
                To the maximum extent permitted by law, the Service is provided "as is" and "as available" without warranties of any
                kind, express or implied, including merchantability, fitness for a particular purpose, and non-infringement.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">13. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Philosift and its affiliates, officers, employees, and service providers are
                not liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or loss of data, profits,
                goodwill, or business interruption.
              </p>
              <p>
                To the maximum extent permitted by law, Philosift's total aggregate liability for claims relating to the Service will
                not exceed the amount you paid to Philosift for the Service in the 12 months before the event giving rise to the
                claim.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">14. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Philosift and its affiliates from claims, damages, liabilities,
                losses, and reasonable costs (including legal fees) arising out of your use of the Service, your User Content, or your
                breach of these Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">15. Governing Law and Disputes</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction where Philosift is established, excluding conflict-of-law
                rules. Where mandatory consumer law provides additional rights, those rights remain unaffected.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">16. Changes to Terms</h2>
              <p>
                We may update these Terms from time to time. We will update the "Last updated" date and, where required by law,
                provide additional notice. Material changes apply immediately for new users and, for existing users, no earlier than 30
                days after notice unless a shorter period is required for legal, security, or abuse prevention reasons.
              </p>
              <p>
                Continued use of the Service after updated Terms become effective constitutes acceptance of the revised Terms.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">17. General Provisions</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>These Terms constitute the entire agreement concerning the Service.</li>
                <li>If any provision is unenforceable, remaining provisions continue in effect.</li>
                <li>Our failure to enforce a provision is not a waiver of that provision.</li>
                <li>You may not assign these Terms without our prior written consent.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-label text-xs uppercase tracking-[0.16em] text-primary">18. Contact</h2>
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
