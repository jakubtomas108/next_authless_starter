import { config } from "./config";

export const sendVerificationLink = async (body: any) => {
  try {
    // This API is used to send authentication email to specified user
    const response = await fetch(
      `${config.apiUrl}/sendVerificationLink?key=${config.identityKey}`,
      {
        method: "post",
        body: JSON.stringify(body),
      }
    ).then((res) => res.json());

    return { ...response };
  } catch (error) {
    return { error };
  }
};

export const verifySignature = async (signature: string) => {
  try {
    // This API is used to verify the obtained signature. If it's valid, the user-related data gets returned
    const response = await fetch(
      `${config.apiUrl}/verifySignature?signature=${signature}`
    ).then((res) => res.json());

    return { ...response };
  } catch (error) {
    return { error };
  }
};

export const verifyCurrentTarget = async (
  signature: string,
  current_target_id: string
) => {
  try {
    // This API is used to verify the current target content against the target_id specified with sendVerificationLink API
    const response = await fetch(
      `${config.apiUrl}/verifyCurrentTarget?signature=${signature}`,
      { method: "post", body: JSON.stringify({ current_target_id }) }
    ).then((res) => res.json());

    return { ...response };
  } catch (error) {
    return { error };
  }
};

export const closeSession = async (signature: string) => {
  try {
    // This API closes the current session
    const response = await fetch(
      `${config.apiUrl}/closeSession?signature=${signature}`
    ).then((res) => res.json());

    return { ...response };
  } catch (error) {
    return { error };
  }
};
