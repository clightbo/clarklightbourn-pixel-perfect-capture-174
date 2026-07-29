export type Severity = "CRITICAL" | "HIGH" | "PASS" | "UNKNOWN";
export type Recommendation = "GO" | "GO WITH CONDITIONS" | "CONDITIONAL" | "NO-GO";

export type Metric = { value: number | null; page?: number };

export interface DealMetrics {
  noi: Metric;
  cap_rate: Metric;
  dscr: Metric;
  irr: Metric;
  price_per_unit: Metric;
  ltv: Metric;
  debt_yield: Metric;
  expense_ratio: Metric;
  breakeven_occupancy: Metric;
  occupancy: Metric;
  rent_to_income: Metric;
}

export interface RiskFlag {
  id: string;
  rule: string;
  severity: Severity;
  reason: string;
  observed: string | null;
  threshold: string;
}

export interface BidRow {
  bid_price: number;
  price_per_unit: number;
  cap_rate: number | null;
  dscr: number | null;
  debt_yield: number | null;
  financeable: boolean;
  negative_leverage: boolean;
  note?: string;
}

export interface RentComp {
  property: string;
  units: number;
  year_built: number;
  avg_rent: number;
  occupancy: number;
  distance: number;
}

export interface Deal {
  id: string;
  property: {
    name: string;
    address: string;
    units: number;
    year_built: number | null;
    submarket: string;
  };
  screened_on: string;
  metrics: DealMetrics;
  flags: RiskFlag[];
  summary: {
    critical: number;
    high: number;
    unknown: number;
    risk_score: number;
    recommendation: Recommendation;
    rationale: string;
  };
  deal_terms: {
    purchase_price_source: string | null;
    debt_source: string | null;
    offering_type: string;
    note: string;
    stated_price: number | null;
    stated_price_page?: number;
  };
  bid_sensitivity: BidRow[];
  max_supportable_price: number;
  market: {
    comps: RentComp[];
    supply: { year: string; deliveries: number; stock_pct: number }[];
  };
  narrative: {
    headline: string;
    executive_summary: string;
    key_strengths: string[];
    key_concerns: string[];
    critical_questions: string[];
    recommended_next_steps: string[];
  };
  extraction_meta: {
    source_pages: number;
    confidence: number;
    missing_fields: string[];
    analyst_notes: string;
  };
}

export const fmtMoney = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${Math.round(n).toLocaleString()}`;

export const fmtPct = (n: number, d = 1) => `${n.toFixed(d)}%`;