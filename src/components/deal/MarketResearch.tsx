import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionHeading } from "./primitives";
import type { Deal } from "@/lib/deal-types";

export function MarketResearch({ deal }: { deal: Deal }) {
  return (
    <section id="market">
      <SectionHeading
        title="Market research"
        description={`Rent comparables and new supply for ${deal.property.submarket}`}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs tracking-wide text-muted-foreground uppercase">
                  <th className="px-4 py-3 font-medium">Property</th>
                  <th className="px-4 py-3 font-medium">Units</th>
                  <th className="px-4 py-3 font-medium">Built</th>
                  <th className="px-4 py-3 font-medium">Avg rent</th>
                  <th className="px-4 py-3 font-medium">Occ.</th>
                  <th className="px-4 py-3 font-medium">Dist.</th>
                </tr>
              </thead>
              <tbody>
                {deal.market.comps.map((c) => (
                  <tr key={c.property} className="border-b border-border/70 last:border-0">
                    <td className="px-4 py-3 font-medium">{c.property}</td>
                    <td className="num px-4 py-3">{c.units}</td>
                    <td className="num px-4 py-3">{c.year_built}</td>
                    <td className="num px-4 py-3">${c.avg_rent.toLocaleString()}</td>
                    <td className="num px-4 py-3">{c.occupancy.toFixed(1)}%</td>
                    <td className="num px-4 py-3">{c.distance.toFixed(1)} mi</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-surface p-5">
          <p className="mb-4 text-xs tracking-wide text-muted-foreground uppercase">
            New supply deliveries vs. submarket stock
          </p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deal.market.supply}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="l" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis yAxisId="r" orientation="right" stroke="var(--muted-foreground)" fontSize={12} unit="%" />
                <RTooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar yAxisId="l" dataKey="deliveries" name="Units delivered" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="r" dataKey="stock_pct" name="% of stock" fill="var(--warn)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}