let clerkTokenProvider = async () => null;

export function setClerkTokenProvider(provider) {
  clerkTokenProvider = typeof provider === "function" ? provider : async () => null;
}

export async function getClerkToken() {
  try {
    return await clerkTokenProvider();
  } catch {
    return null;
  }
}