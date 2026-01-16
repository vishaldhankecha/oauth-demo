import { useEffect, useRef } from "react";
import { AUTH_SERVER } from "./config";

export function Callback({ onToken }: { onToken: (t: string) => void }) {
  const hasExchanged = useRef(false);

  useEffect(() => {
    if (hasExchanged.current) return;
    hasExchanged.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const verifier = sessionStorage.getItem("pkce_verifier");

    if (!code || !verifier) return;

    fetch(`${AUTH_SERVER}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        code_verifier: verifier
      })
    })
      .then(res => res.json())
      .then(data => {
        sessionStorage.setItem("refresh_token", data.refresh_token);
        onToken(data.access_token);
        window.history.replaceState({}, "", "/");
      });
  }, [onToken]);

  return <p>Signing you in…</p>;
}
