const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

async function fetchJson(path) {
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status} on ${path}`);
  return res.json();
}

export async function getHealth() { return fetchJson("/health"); }
export async function getPicks() { return fetchJson("/picks"); }
export async function getHistory() { return fetchJson("/history"); }
export async function getStats() { return fetchJson("/stats"); }
