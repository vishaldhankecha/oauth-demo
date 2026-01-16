import express from "express";
import { v4 as uuid } from "uuid";
import { generateCodeChallenge } from "./pkce";
import { generateAccessToken } from "./token";

const app = express();
app.use(express.json());

/**
 * authCode -> { userId, codeChallenge }
 */
const authCodes = new Map<
  string,
  { userId: string; codeChallenge: string }
>();

/**
 * Refresh Token ->  Key: refresh_token, Value: userId
 */
const refreshTokens = new Map<string, string>();

/**
 * STEP 1: Authorization Endpoint
 */
app.get("/authorize", (req, res) => {
  const { redirect_uri, code_challenge } = req.query;

  if (!code_challenge) {
    return res.status(400).send("code_challenge required");
  }

  const code = uuid();

  authCodes.set(code, {
    userId: "user123",
    codeChallenge: code_challenge as string
  });

  res.redirect(`${redirect_uri}?code=${code}`);
});

/**
 * STEP 2: Token Exchange (PKCE validation here)
 */
app.post("/token", (req, res) => {
  const { code, code_verifier } = req.body;

  const stored = authCodes.get(code);
  if (!stored) {
    return res.status(400).json({ error: "Invalid code" });
  }

  const calculatedChallenge = generateCodeChallenge(code_verifier);

  if (calculatedChallenge !== stored.codeChallenge) {
    return res.status(400).json({ error: "PKCE validation failed" });
  }

  authCodes.delete(code);
  const { accessToken, expiresIn } = generateAccessToken(stored.userId)

  const refreshToken = uuid();
  refreshTokens.set(refreshToken, stored.userId);

  res.json({
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: "Bearer",
    expires_in: expiresIn
  });
});

app.post("/token/refresh", (req, res) => {
  const { refresh_token } = req.body;

  const userId = refreshTokens.get(refresh_token);
  if (!userId) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }

  const { accessToken, expiresIn } = generateAccessToken(userId)

  res.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: expiresIn
  });
});


app.listen(4000, () =>
  console.log("Auth Server with PKCE running on http://localhost:4000")
);
