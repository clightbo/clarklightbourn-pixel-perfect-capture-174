import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const STAGES = [
  "Reading OM",
  "Extracting Data",
  "Market Research",
  "Risk Scoring",
  "Generating Report",
];

export function ProcessingStepper({ active }: { active: number }) {
  return (
    <div className="card-surface mx-auto max-w-md p-6">
      <p className="mb-5 text-xs tracking-widest text-muted-foreground uppercase">
        Screening in progress
      </p>
      <ol className="space-y-4">
        {STAGES.map((s, i) => {
          const done = i < active;
          const current = i === active;
          return (
            <li key={s} className="flex items-center gap-3">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs",
                  done && "border-pass bg-pass text-pass-foreground",
                  current && "border-primary text-primary",
                  !done && !current && "border-border text-muted-foreground",
                )}
              >
                {done ? (
                  <Check className="h-4 w-4" />
                ) : current ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={cn(
                  "text-sm",
                  done || current ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                {s}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}