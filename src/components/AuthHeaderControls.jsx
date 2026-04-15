import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const authModalAppearance = {
  elements: {
    rootBox: "w-[calc(100vw-1.25rem)] sm:w-auto",
    cardBox: "w-full",
    card: "w-full max-w-[420px] max-h-[86svh] overflow-y-auto",
  },
};

export default function AuthHeaderControls() {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <Show when="signed-out">
        <SignInButton mode="modal" appearance={authModalAppearance} forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard">
          <button className="border border-outline-variant/40 px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-on-surface-variant transition-colors hover:border-primary/45 hover:text-primary">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal" appearance={authModalAppearance} forceRedirectUrl="/dashboard" fallbackRedirectUrl="/dashboard">
          <button className="border border-primary/45 bg-primary/15 px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary/25">
            Sign Up
          </button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  );
}
