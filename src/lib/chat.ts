// Chat data-access layer. The UI talks only to sendChatMessage; the backend
// base URL comes from VITE_API_URL so it can change per environment without
// touching components.

export type ChatResult = { ok: true; reply: string } | { ok: false; message: string };

export async function sendChatMessage(prompt: string): Promise<ChatResult> {
  const baseUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!baseUrl) {
    return { ok: false, message: "Chat isn't configured yet. Please try again later." };
  }

  try {
    const response = await fetch(`${baseUrl.replace(/\/+$/, "")}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    if (!response.ok) {
      return { ok: false, message: `The assistant couldn't respond right now (error ${response.status}). Please try again.` };
    }
    const data = (await response.json()) as { reply?: unknown };
    if (typeof data.reply !== "string" || !data.reply.trim()) {
      return { ok: false, message: "The assistant sent an empty response. Please try again." };
    }
    return { ok: true, reply: data.reply };
  } catch {
    return { ok: false, message: "Couldn't reach the assistant. Check your connection and try again." };
  }
}
