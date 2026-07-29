import { createServerFn } from "@tanstack/react-start";

/**
 * Posts the uploaded OM PDF to the configured n8n webhook.
 * Returns { ok: false } when no webhook is configured so the UI can
 * fall back to mock data and always stay demo-ready.
 */
export const runScreening = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const url = process.env.N8N_WEBHOOK_URL;
    if (!url) {
      return { ok: false as const, reason: "N8N_WEBHOOK_URL is not configured" };
    }
    try {
      const res = await fetch(url, { method: "POST", body: data });
      if (!res.ok) {
        return { ok: false as const, reason: `Webhook responded ${res.status}` };
      }
      return { ok: true as const, result: await res.json() };
    } catch (e) {
      return { ok: false as const, reason: (e as Error).message };
    }
  });