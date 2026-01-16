import { generateCodeChallenge, generateCodeVerifier } from "./pkce";
import { AUTH_SERVER, CLIENT_ID, REDIRECT_URI } from "./config";

export function Login() {
  const login = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);

    sessionStorage.setItem("pkce_verifier", verifier);

    const url =
      `${AUTH_SERVER}/authorize` +
      `?client_id=${CLIENT_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&code_challenge=${challenge}`;

    window.location.href = url;
  };

  return <button onClick={login}>Login with OAuth</button>;
}
