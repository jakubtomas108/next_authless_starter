export type TEnv = "development" | "production";

export const config = {
  nodeEnv: process.env.NODE_ENV as TEnv,
  apiUrl: process.env.NEXT_PUBLIC_AUTHLESS_API_URL,
  identityKey: process.env.NEXT_PUBLIC_AUTHLESS_IDENTITY_KEY,
};
