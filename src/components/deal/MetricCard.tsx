import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NotInOm } from "./primitives";
import type { Metric } from "@/lib/deal-types";

export function MetricCard({
  label,
  metric,
  format,
  explain,
}: {
  label: string;
  metric: Metric;
  format: (n: number) => string;
  explain: string;
}) {
  const missing = metric.value === null;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`card-surface p-4 text-left transition-shadow hover:shadow-md ${
            missing ? "opacity-70" : ""
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              {label}
            </p>
            {metric.page && !missing ? (
              <sup className="rounded bg-secondary px-1 text-[10px] font-semibold text-muted-foreground">
                p.{metric.page}
              </sup>
            ) : null}
          </div>
          <div className="mt-2">
            {missing ? (
              <NotInOm />
            ) : (
              <span className="num text-2xl font-semibold">
                {format(metric.value as number)}
              </span>
            )}
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p className="text-xs leading-relaxed">{explain}</p>
        {metric.page && !missing ? (
          <p className="mt-1 text-[11px] opacity-80">Source: OM page {metric.page}</p>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
}