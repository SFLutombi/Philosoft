import { useEffect } from "react";
import { useAuth } from "@clerk/react";
import { setClerkTokenProvider } from "../services/clerkToken";

export default function ClerkSupabaseBridge() {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    setClerkTokenProvider(async () => {
      if (!isLoaded) {
        return null;
      }

      try {
        const token = await getToken({ template: "supabase" });
        if (token) {
          return token;
        }
      } catch {
        // Fall through to the default Clerk session token.
      }

      try {
        return await getToken();
      } catch {
        return null;
      }
    });

    return () => {
      setClerkTokenProvider(async () => null);
    };
  }, [getToken, isLoaded]);

  return null;
}