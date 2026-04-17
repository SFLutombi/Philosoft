import { useUser } from "@clerk/react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ element }) {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    return (
      <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
        <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.14em] text-on-surface-variant">Loading session...</p>
        </main>
      </div>
    );
  }

  if (!isSignedIn) {
    const target = `/onboarding-signin?returnTo=${encodeURIComponent(location.pathname)}`;
    return <Navigate to={target} replace />;
  }

  return element;
}
