import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./primitives";
import type { Deal } from "@/lib/deal-types";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs tracking-wide text-muted-foreground uppercase">{title}</p>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InvestmentSummary({ deal }: { deal: Deal }) {
  return (
    <section id="summary">
      <SectionHeading
        title="Investment summary"
        action={
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        }
      />
      <div className="card-surface space-y-6 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">
            {deal.narrative.headline}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {deal.narrative.executive_summary}
          </p>
        </div>
        <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-2">
          <List title="Key strengths" items={deal.narrative.key_strengths} />
          <List title="Key concerns" items={deal.narrative.key_concerns} />
          <List title="Critical questions for the broker" items={deal.narrative.critical_questions} />
          <List title="Recommended next steps" items={deal.narrative.recommended_next_steps} />
        </div>
        <div className="border-t border-border pt-4 text-xs text-muted-foreground">
          Extracted from {deal.extraction_meta.source_pages} pages ·{" "}
          {(deal.extraction_meta.confidence * 100).toFixed(0)}% confidence
          {deal.extraction_meta.missing_fields.length
            ? ` · missing: ${deal.extraction_meta.missing_fields.join(", ")}`
            : ""}
        </div>
      </div>
    </section>
  );
}