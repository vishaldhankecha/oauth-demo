import { AUTH_SERVER } from "./config";

export async function apiFetch(
  url: string,
  accessToken: string,
  setAccessToken: (t: string) => void
) {
  let response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.status === 401) {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) throw new Error("No refresh token");

    const refreshResponse = await fetch(
      `${AUTH_SERVER}/token/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: refreshToken })
      }
    );

    const data = await refreshResponse.json();
    setAccessToken(data.access_token);

    response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    });
  }

  return response.json();
}
