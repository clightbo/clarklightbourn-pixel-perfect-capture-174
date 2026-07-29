import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionHeading } from "./primitives";
import type { Deal } from "@/lib/deal-types";

export function DealTerms({ deal }: { deal: Deal }) {
  const priced = deal.deal_terms.stated_price !== null;
  const [terms, setTerms] = useState({
    bid: priced
      ? String(deal.deal_terms.stated_price)
      : String(deal.bid_sensitivity[Math.floor(deal.bid_sensitivity.length / 2)].bid_price),
    ltv: "60",
    rate: "6.5",
    amort: "30",
    minDscr: "1.25",
    minDy: "9",
  });
  const set = (k: keyof typeof terms) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setTerms((t) => ({ ...t, [k]: e.target.value }));

  return (
    <section id="deal-terms">
      <SectionHeading title="Deal terms" description={deal.deal_terms.offering_type} />
      <div className="card-surface p-5">
        <div
          className={`mb-5 rounded-md border p-3 text-sm ${
            priced
              ? "border-border bg-secondary text-foreground"
              : "border-warn/40 bg-warn-soft text-warn-foreground"
          }`}
        >
          {priced
            ? deal.deal_terms.note
            : "The OM did not state a price. Enter the bid you want to test."}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field
            id="bid"
            label="Bid price ($)"
            hint={priced ? `from OM p.${deal.deal_terms.stated_price_page}` : undefined}
            value={terms.bid}
            onChange={set("bid")}
          />
          <Field id="ltv" label="LTV (%)" value={terms.ltv} onChange={set("ltv")} />
          <Field id="rate" label="Interest rate (%)" value={terms.rate} onChange={set("rate")} />
          <Field id="amort" label="Amortization (years)" value={terms.amort} onChange={set("amort")} />
          <Field id="minDscr" label="Min DSCR (x)" value={terms.minDscr} onChange={set("minDscr")} />
          <Field id="minDy" label="Min debt yield (%)" value={terms.minDy} onChange={set("minDy")} />
        </div>
        <div className="mt-5 flex justify-end">
          <Button
            onClick={() =>
              document
                .getElementById("bid-sensitivity")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Re-run sensitivity
          </Button>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  hint,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  hint?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs tracking-wide text-muted-foreground uppercase">
        {label}
      </Label>
      <Input id={id} inputMode="decimal" value={value} onChange={onChange} className="num" />
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}