import { Link } from "react-router-dom";

export default function LegalPolicyLinks({ className = "" }) {
  return (
    <nav aria-label="Legal links" className={`flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.14em] text-on-surface-variant/70 ${className}`.trim()}>
      <Link to="/terms-of-service" className="transition-colors hover:text-primary">
        Terms of Service
      </Link>
      <span aria-hidden="true">|</span>
      <Link to="/privacy-policy" className="transition-colors hover:text-primary">
        Privacy Policy
      </Link>
      <span aria-hidden="true">|</span>
      <Link to="/refund-policy" className="transition-colors hover:text-primary">
        Refund Policy
      </Link>
    </nav>
  );
}
