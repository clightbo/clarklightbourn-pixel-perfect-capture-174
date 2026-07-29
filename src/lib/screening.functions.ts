import { createServerFn } from "@tanstack/react-start";

/**
 * Posts the uploaded OM PDF as multipart form data to the screening endpoint.
 * Returns { ok: false } on failure so the UI can fall back to sample data.
 */
export const runScreening = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    const endpoint = "https://clarkcbre.app.n8n.cloud/webhook/screen-om-free";
    try {
      const res = await fetch(endpoint, { method: "POST", body: data });
      if (!res.ok) {
        return { ok: false as const, reason: `Endpoint responded ${res.status}` };
      }
      const text = await res.text();
      try {
        return { ok: true as const, result: JSON.parse(text) };
      } catch {
        return { ok: true as const, result: { raw: text } };
      }
    } catch (e) {
      return { ok: false as const, reason: (e as Error).message };
    }
  });