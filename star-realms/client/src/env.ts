// API base URL. In dev, defaults to the Vite proxy at /api which forwards
// to the local wrangler dev server on :8787. In prod, set
// VITE_API_BASE to the deployed Worker route (e.g. https://play-api.example.com).

export const API_BASE: string =
  (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_BASE || "/api";

export const WS_BASE: string = API_BASE.startsWith("http")
  ? API_BASE.replace(/^http/, "ws")
  : `${location.origin.replace(/^http/, "ws")}${API_BASE}`;
