import crypto from "crypto";

export function generateCodeChallenge(verifier: string): string {
  const hash = crypto
    .createHash("sha256")
    .update(verifier)
    .digest();

  return base64UrlEncode(hash);
}

function base64UrlEncode(buffer: Buffer): string {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
