import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { RecommendationBadge } from "@/components/deal/primitives";
import { mockDeals } from "@/lib/mock-deals";

export const Route = createFileRoute("/pipeline")({
  component: Pipeline,
  head: () => ({
    meta: [
      { title: "Deal Pipeline | DealScreen AI" },
      {
        name: "description",
        content:
          "Every screened multifamily offering memorandum in one table — recommendation, DSCR, cap rate and risk score at a glance.",
      },
      { property: "og:title", content: "Deal Pipeline | DealScreen AI" },
      {
        property: "og:description",
        content:
          "Review all screened multifamily deals with recommendation, DSCR, cap rate and risk score.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Pipeline() {
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Deal pipeline</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {mockDeals.length} screened offerings. Select a row to open the dashboard.
      </p>
      <div className="card-surface mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Screened</th>
                <th className="px-4 py-3 font-medium">Recommendation</th>
                <th className="px-4 py-3 font-medium">DSCR</th>
                <th className="px-4 py-3 font-medium">Cap rate</th>
                <th className="px-4 py-3 font-medium">Risk score</th>
              </tr>
            </thead>
            <tbody>
              {mockDeals.map((d) => (
                <tr key={d.id} className="border-b border-border/70 last:border-0 hover:bg-secondary/60">
                  <td className="px-4 py-3">
                    <Link to="/deal/$dealId" params={{ dealId: d.id }} className="block font-medium">
                      {d.property.name}
                      <span className="block text-xs font-normal text-muted-foreground">
                        {d.property.units} units · {d.property.submarket}
                      </span>
                    </Link>
                  </td>
                  <td className="num px-4 py-3 text-muted-foreground">{d.screened_on}</td>
                  <td className="px-4 py-3">
                    <RecommendationBadge value={d.summary.recommendation} size="sm" />
                  </td>
                  <td className="num px-4 py-3">
                    {d.metrics.dscr.value === null ? (
                      <span className="text-muted-foreground">Not stated in OM</span>
                    ) : (
                      `${d.metrics.dscr.value.toFixed(2)}x`
                    )}
                  </td>
                  <td className="num px-4 py-3">
                    {d.metrics.cap_rate.value === null ? (
                      <span className="text-muted-foreground">Not stated in OM</span>
                    ) : (
                      `${d.metrics.cap_rate.value.toFixed(2)}%`
                    )}
                  </td>
                  <td className="num px-4 py-3 font-medium">{d.summary.risk_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}