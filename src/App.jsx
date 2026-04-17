import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import DashboardPage from "./pages/DashboardPage";
import SplashPage from "./pages/SplashPage";
import ResultsCardPage from "./pages/ResultsCardPage";
import ResultsDescriptionPage from "./pages/ResultsDescriptionPage";
import ResultsPhilosophersPage from "./pages/ResultsPhilosophersPage";
import ResultsSubarchetypePage from "./pages/ResultsSubarchetypePage";
import ResultsMisalignmentPage from "./pages/ResultsMisalignmentPage";
import PricingPage from "./pages/PricingPage";
import PaymentPage from "./pages/PaymentPage";
import OnboardingSignUpPage from "./pages/OnboardingSignUpPage";
import OnboardingSignInPage from "./pages/OnboardingSignInPage";
import OnboardingProfilePage from "./pages/OnboardingProfilePage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import RefundPolicyPage from "./pages/RefundPolicyPage";
import ProtectedRoute from "./components/ProtectedRoute";
import InterruptFlowPage from "./pages/InterruptFlowPage";
import HistoryPage from "./pages/HistoryPage";
import AlarmsPage from "./pages/AlarmsPage";

export default function App() {
  return (
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
  );
}
