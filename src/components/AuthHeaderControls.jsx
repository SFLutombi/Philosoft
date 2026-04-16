import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

export default function AuthHeaderControls() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Show when="signed-out">
        <Link to="/onboarding-signin" className="border border-outline-variant/40 px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/45 hover:text-primary">
          Sign In
        </Link>
        <Link to="/onboarding-signup" className="border border-primary/45 bg-primary/15 px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
          Sign Up
        </Link>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
