import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/react";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App";
import ClerkSupabaseBridge from "./components/ClerkSupabaseBridge";
import "./index.css";

registerSW({ immediate: true });

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY. Clerk auth will not initialize.");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl="/landing">
      <ClerkSupabaseBridge />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
