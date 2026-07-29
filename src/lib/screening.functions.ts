import { createServerFn } from "@tanstack/react-start";

/**
 * Posts the uploaded OM PDF as multipart form data to the screening endpoint.
 * Returns { ok: false } on failure so the UI can fall back to sample data.
 */
const SCREENING_ENDPOINT = "https://clarkcbre.app.n8n.cloud/webhook/screen-om-free";

export const runScreening = createServerFn({ method: "POST" })
  .inputValidator((data: FormData) => data)
  .handler(async ({ data }) => {
    try {
      const res = await fetch(SCREENING_ENDPOINT, { method: "POST", body: data });
      if (!res.ok) {
        return { ok: false as const, reason: `Endpoint responded ${res.status}` };
      }
      return { ok: true as const, result: await res.json() };
    } catch (e) {
      return { ok: false as const, reason: (e as Error).message };
    }
  });