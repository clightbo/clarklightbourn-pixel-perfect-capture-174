import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Deal } from "@/lib/deal-types";

type Msg = { role: "user" | "assistant"; text: string; pages?: number[] };

function answerFor(deal: Deal, q: string): Msg {
  const l = q.toLowerCase();
  if (l.includes("dscr") || l.includes("coverage")) {
    return {
      role: "assistant",
      text:
        deal.metrics.dscr.value === null
          ? "The OM does not state a price or in-place debt, so coverage cannot be computed. Use the bid sensitivity ladder — coverage runs from 1.85x at a $78M bid down to 1.20x at $120M."
          : `Debt service coverage is ${deal.metrics.dscr.value.toFixed(2)}x at the modeled bid and ${deal.metrics.ltv.value}% LTV.`,
      pages: deal.metrics.dscr.page ? [deal.metrics.dscr.page] : undefined,
    };
  }
  if (l.includes("occupanc")) {
    return {
      role: "assistant",
      text: `Physical occupancy is ${deal.metrics.occupancy.value}% per the rent roll exhibit.`,
      pages: deal.metrics.occupancy.page ? [deal.metrics.occupancy.page] : undefined,
    };
  }
  if (l.includes("price") || l.includes("bid")) {
    return {
      role: "assistant",
      text: `${deal.deal_terms.note} Maximum supportable price under the current debt assumptions is $${(deal.max_supportable_price / 1_000_000).toFixed(1)}M.`,
      pages: deal.deal_terms.stated_price_page ? [deal.deal_terms.stated_price_page] : undefined,
    };
  }
  if (l.includes("risk") || l.includes("flag")) {
    return {
      role: "assistant",
      text: `Risk score is ${deal.summary.risk_score}/100 with ${deal.summary.critical} critical and ${deal.summary.high} high flags. ${deal.summary.rationale}`,
    };
  }
  return {
    role: "assistant",
    text: deal.narrative.executive_summary,
    pages: [1, deal.extraction_meta.source_pages],
  };
}

export function DealChat({ deal }: { deal: Deal }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: `Ask me anything about the ${deal.property.name} offering memorandum. Answers cite the source page.`,
    },
  ]);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, answerFor(deal, q)]);
    setInput("");
  };

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 z-40 shadow-lg print:hidden"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Ask the OM
      </Button>
    );
  }

  return (
    <aside className="fixed top-0 right-0 z-40 flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-xl print:hidden">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold">OM Assistant</p>
          <p className="text-xs text-muted-foreground">{deal.property.name}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
              m.role === "user"
                ? "ml-8 bg-primary text-primary-foreground"
                : "mr-4 bg-secondary text-secondary-foreground"
            }`}
          >
            {m.text}
            {m.pages?.length ? (
              <p className="mt-2 text-[11px] opacity-70">
                Source: OM p.{m.pages.join(", p.")}
              </p>
            ) : null}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What is the in-place DSCR?"
        />
        <Button type="submit" size="icon" aria-label="Send">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </aside>
  );
}