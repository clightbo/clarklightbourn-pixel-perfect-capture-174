Apply the four files from `https://github.com/clightbo/personal-automation-hub/tree/main/patches/clarklightbourn-pixel-perfect-capture-174/files/` and reconcile them with the current project constraints (hardcoded n8n URL, no mock fallback, chat hidden).

## What we will do

1. Fetch the four target files from the public GitHub raw URLs and overwrite the matching files in the project:
   - `src/components/deal/DealChat.tsx`
   - `src/routes/index.tsx`
   - `src/routes/deal.$dealId.tsx`
   - `src/lib/screening-result.ts`

2. Reconcile the uploaded `src/routes/index.tsx` with the user's explicit constraints:
   - Remove the `VITE_SCREEN_API_KEY` environment variable and `x-api-key` header; keep the n8n URL hardcoded.
   - Remove the fallback that navigates to `mockDeals[2]` on failure; instead show the existing error toast and stay on the upload page.
   - Restore the 4-minute `AbortController` timeout so the long-running free-model call does not silently hang.
   - Keep the improved status messages and stage animation.

3. Reconcile `src/routes/deal.$dealId.tsx` with the current dashboard layout:
   - The uploaded version appears to reference an older layout. We will keep the current `DealBrief`, `DealSectionNav`, and metric grid if they are missing from the upload, while still applying the uploaded logic.
   - Ensure `DealChat` is not rendered on the deal page (per the request to hide the chatbot).

4. Reconcile `src/lib/screening-result.ts`:
   - Apply the uploaded address-normalization improvements (city/state fallback).
   - Fix any TypeScript generic/type errors introduced by the upload (e.g. `Record` without generic parameters, broken `arr<T>` calls).

5. Verify the result:
   - Run the typecheck/build to confirm no import or type errors.
   - Confirm the deal page renders without the "Ask the OM" button.

## Technical notes
- The GitHub files are fetched raw, so markdown escaping (`\[`, `\$`, etc.) is not part of the real source; we will write the actual file contents.
- If the uploaded `index.tsx` is materially shorter or older than the current version, we will merge it rather than blindly overwrite, preserving behavior the user has already approved.
- No plan changes are needed unless the fetched files differ significantly from the previews already inspected.
