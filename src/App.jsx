import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const QuizPage = lazy(() => import("./pages/QuizPage"));
const ResultsPage = lazy(() => import("./pages/ResultsPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const SplashPage = lazy(() => import("./pages/SplashPage"));
const ResultsCardPage = lazy(() => import("./pages/ResultsCardPage"));
const ResultsDescriptionPage = lazy(() => import("./pages/ResultsDescriptionPage"));
const ResultsPhilosophersPage = lazy(() => import("./pages/ResultsPhilosophersPage"));
const ResultsSubarchetypePage = lazy(() => import("./pages/ResultsSubarchetypePage"));
const ResultsMisalignmentPage = lazy(() => import("./pages/ResultsMisalignmentPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const OnboardingSignUpPage = lazy(() => import("./pages/OnboardingSignUpPage"));
const OnboardingSignInPage = lazy(() => import("./pages/OnboardingSignInPage"));
const OnboardingProfilePage = lazy(() => import("./pages/OnboardingProfilePage"));
const TermsOfServicePage = lazy(() => import("./pages/TermsOfServicePage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const RefundPolicyPage = lazy(() => import("./pages/RefundPolicyPage"));
const InterruptFlowPage = lazy(() => import("./pages/InterruptFlowPage"));
const HistoryPage = lazy(() => import("./pages/HistoryPage"));
const AlarmsPage = lazy(() => import("./pages/AlarmsPage"));

function RouteLoader() {
  return (
    <div className="font-body min-h-[100svh] bg-[#131313] text-on-surface antialiased" style={{ backgroundImage: "radial-gradient(#201f1f 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}>
      <main className="mx-auto flex min-h-[100svh] w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.14em] text-on-surface-variant">Loading...</p>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<Navigate to="/results-card" replace />} />
        <Route path="/results-card" element={<ResultsCardPage />} />
        <Route path="/results-description" element={<ResultsDescriptionPage />} />
        <Route path="/results-philosophers" element={<ResultsPhilosophersPage />} />
        <Route path="/results-subarchetype" element={<ResultsSubarchetypePage />} />
        <Route path="/results-misalignment" element={<ResultsMisalignmentPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/onboarding-signup/*" element={<OnboardingSignUpPage />} />
        <Route path="/onboarding-signin/*" element={<OnboardingSignInPage />} />
        <Route path="/onboarding-profile" element={<ProtectedRoute element={<OnboardingProfilePage />} />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
        <Route path="/interrupt" element={<ProtectedRoute element={<InterruptFlowPage />} />} />
        <Route path="/history" element={<ProtectedRoute element={<HistoryPage />} />} />
        <Route path="/alarms" element={<ProtectedRoute element={<AlarmsPage />} />} />
        <Route path="/results-legacy" element={<ResultsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
