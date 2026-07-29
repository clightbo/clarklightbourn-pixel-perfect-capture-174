import type { Deal } from "./deal-types";

const m = (value: number | null, page?: number) => ({ value, page });

export const mockDeals: Deal[] = [
  {
    id: "harbor-point",
    property: {
      name: "Harbor Point Residences",
      address: "4820 Bayshore Blvd, Tampa, FL 33611",
      units: 288,
      year_built: 2016,
      submarket: "South Tampa",
    },
    screened_on: "2026-07-21",
    metrics: {
      noi: m(6_420_000, 14),
      cap_rate: m(5.4, 15),
      dscr: m(1.52, 22),
      irr: m(16.8, 31),
      price_per_unit: m(412_500, 15),
      ltv: m(58, 22),
      debt_yield: m(10.7, 22),
      expense_ratio: m(36.2, 14),
      breakeven_occupancy: m(72.4, 23),
      occupancy: m(94.6, 9),
      rent_to_income: m(26.1, 11),
    },
    flags: [
      {
        id: "occ",
        rule: "Occupancy",
        severity: "PASS",
        reason:
          "Physical occupancy of 94.6% sits comfortably above the 85% stress threshold with a 12-month trailing average of 94.1%.",
        observed: "94.6%",
        threshold: "HIGH below 85% / CRITICAL below 80% with DSCR < 1.20x",
      },
      {
        id: "dscr",
        rule: "Debt Service Coverage",
        severity: "PASS",
        reason:
          "At the modeled bid and 58% LTV, coverage of 1.52x clears agency minimums with meaningful cushion.",
        observed: "1.52x",
        threshold: "HIGH below 1.25x / CRITICAL below 1.15x or maturity in hold",
      },
      {
        id: "supply",
        rule: "Competitive Supply",
        severity: "PASS",
        reason:
          "Pipeline equals 4.8% of submarket stock and deliveries taper after 2027.",
        observed: "4.8% of stock",
        threshold: "HIGH above 10% / CRITICAL above 15% with flat rent growth",
      },
      {
        id: "afford",
        rule: "Affordability",
        severity: "PASS",
        reason:
          "Rent-to-income of 26.1% leaves headroom for the underwritten 3.5% rent growth.",
        observed: "26.1%",
        threshold: "HIGH above 30% / CRITICAL above 35% with rising concessions",
      },
      {
        id: "capex",
        rule: "Capital Needs",
        severity: "PASS",
        reason:
          "2016 vintage with $412/unit reserves and no deferred maintenance identified in the OM.",
        observed: "Built 2016 · $412/unit reserves",
        threshold: "HIGH if pre-1980 or reserves < $300/unit",
      },
    ],
    summary: {
      critical: 0,
      high: 0,
      unknown: 0,
      risk_score: 18,
      recommendation: "GO",
      rationale:
        "Institutional-quality asset, in-place coverage well above threshold, and a supply picture that supports the underwritten rent growth.",
    },
    deal_terms: {
      purchase_price_source: "Stated in OM p.15",
      debt_source: "Assumed agency quote",
      offering_type: "Priced offering",
      note: "The OM states a $118.8M guidance price. Pre-filled from OM p.15.",
      stated_price: 118_800_000,
      stated_price_page: 15,
    },
    bid_sensitivity: [
      { bid_price: 108_000_000, price_per_unit: 375_000, cap_rate: 5.94, dscr: 1.66, debt_yield: 11.8, financeable: true, negative_leverage: false },
      { bid_price: 113_000_000, price_per_unit: 392_361, cap_rate: 5.68, dscr: 1.59, debt_yield: 11.3, financeable: true, negative_leverage: false },
      { bid_price: 118_800_000, price_per_unit: 412_500, cap_rate: 5.4, dscr: 1.52, debt_yield: 10.7, financeable: true, negative_leverage: false, note: "OM guidance" },
      { bid_price: 124_000_000, price_per_unit: 430_556, cap_rate: 5.18, dscr: 1.45, debt_yield: 10.3, financeable: true, negative_leverage: false },
      { bid_price: 131_500_000, price_per_unit: 456_597, cap_rate: 4.88, dscr: 1.37, debt_yield: 9.7, financeable: true, negative_leverage: true, note: "cost of debt 6.50%" },
      { bid_price: 139_000_000, price_per_unit: 482_639, cap_rate: 4.62, dscr: 1.29, debt_yield: 9.2, financeable: true, negative_leverage: true },
      { bid_price: 147_000_000, price_per_unit: 510_417, cap_rate: 4.37, dscr: 1.22, debt_yield: 8.7, financeable: false, negative_leverage: true },
    ],
    max_supportable_price: 141_600_000,
    market: {
      comps: [
        { property: "Bayshore Vue", units: 264, year_built: 2018, avg_rent: 2410, occupancy: 95.2, distance: 0.6 },
        { property: "The Anchorage", units: 312, year_built: 2015, avg_rent: 2285, occupancy: 93.8, distance: 1.1 },
        { property: "Ballast Point Lofts", units: 190, year_built: 2019, avg_rent: 2520, occupancy: 96.1, distance: 1.4 },
        { property: "Gandy Commons", units: 348, year_built: 2013, avg_rent: 2140, occupancy: 92.4, distance: 2.3 },
      ],
      supply: [
        { year: "2024", deliveries: 620, stock_pct: 2.1 },
        { year: "2025", deliveries: 840, stock_pct: 2.8 },
        { year: "2026", deliveries: 910, stock_pct: 3.0 },
        { year: "2027", deliveries: 460, stock_pct: 1.5 },
        { year: "2028", deliveries: 220, stock_pct: 0.7 },
      ],
    },
    narrative: {
      headline: "Core-plus South Tampa asset clears every screen at guidance",
      executive_summary:
        "Harbor Point Residences is a 288-unit, 2016-vintage asset in South Tampa offered at $118.8M ($412.5K/unit). In-place NOI of $6.42M produces a 5.4% cap rate and 1.52x coverage at 58% LTV. Supply pressure is modest, affordability is healthy, and the physical plant requires no near-term capital. The deal underwrites to a 16.8% levered IRR over a five-year hold and supports a bid up to $141.6M before financeability breaks.",
      key_strengths: [
        "94.6% occupancy with a 94.1% trailing twelve-month average",
        "Expense ratio of 36.2% is 380 bps better than the submarket median",
        "Submarket pipeline is only 4.8% of standing stock",
        "No deferred maintenance flagged across the OM capital plan",
      ],
      key_concerns: [
        "Cap rate compresses below the 6.50% cost of debt above a $131.5M bid",
        "Insurance line item grew 22% year over year and may be understated in year one",
        "Underwritten 3.5% rent growth exceeds the submarket three-year average of 2.6%",
      ],
      critical_questions: [
        "What is the bound insurance premium for the current policy year?",
        "Are any of the 2025 renewals subject to concession burn-off?",
        "Can the seller share T-12 payroll detail by position?",
      ],
      recommended_next_steps: [
        "Submit a first-round bid in the $118M–$124M band",
        "Order a property condition assessment and insurance re-quote",
        "Model a downside case at 2.0% rent growth and 7.0% debt",
      ],
    },
    extraction_meta: {
      source_pages: 48,
      confidence: 0.94,
      missing_fields: [],
      analyst_notes: "All primary financial fields extracted with high confidence from the T-12 and rent roll exhibits.",
    },
  },
  {
    id: "cedar-crossing",
    property: {
      name: "Cedar Crossing Apartments",
      address: "1177 Wexler Ave, Columbus, OH 43211",
      units: 412,
      year_built: 1974,
      submarket: "North Linden",
    },
    screened_on: "2026-07-24",
    metrics: {
      noi: m(2_980_000, 12),
      cap_rate: m(7.1, 13),
      dscr: m(1.08, 19),
      irr: m(6.2, 27),
      price_per_unit: m(101_942, 13),
      ltv: m(74, 19),
      debt_yield: m(7.1, 19),
      expense_ratio: m(54.8, 12),
      breakeven_occupancy: m(93.7, 20),
      occupancy: m(78.4, 8),
      rent_to_income: m(36.9, 10),
    },
    flags: [
      {
        id: "occ",
        rule: "Occupancy",
        severity: "CRITICAL",
        reason:
          "Occupancy of 78.4% is below the 80% floor and coverage is under 1.20x, so the asset cannot absorb further vacancy loss.",
        observed: "78.4%",
        threshold: "CRITICAL below 80% and DSCR < 1.20x",
      },
      {
        id: "dscr",
        rule: "Debt Service Coverage",
        severity: "CRITICAL",
        reason:
          "Coverage of 1.08x is below the 1.15x critical line and the in-place loan matures in month 31 of a five-year hold.",
        observed: "1.08x · maturity month 31",
        threshold: "CRITICAL below 1.15x or maturity within hold",
      },
      {
        id: "supply",
        rule: "Competitive Supply",
        severity: "HIGH",
        reason:
          "Pipeline of 11.6% of submarket stock will compete directly with the value-add renovation premium.",
        observed: "11.6% of stock",
        threshold: "HIGH above 10% of submarket stock",
      },
      {
        id: "afford",
        rule: "Affordability",
        severity: "CRITICAL",
        reason:
          "Rent-to-income of 36.9% exceeds the 35% ceiling and concessions widened from two to six weeks over the last three quarters.",
        observed: "36.9% · concessions rising",
        threshold: "CRITICAL above 35% with rising concessions",
      },
      {
        id: "capex",
        rule: "Capital Needs",
        severity: "CRITICAL",
        reason:
          "1974 vintage with $184/unit reserves and 44% of the capital plan classified as deferred maintenance.",
        observed: "Built 1974 · $184/unit · 44% deferred",
        threshold: "CRITICAL when pre-1980 plus >30% deferred maintenance",
      },
    ],
    summary: {
      critical: 4,
      high: 1,
      unknown: 0,
      risk_score: 87,
      recommendation: "NO-GO",
      rationale:
        "Coverage is below financeable levels at the asking price, the capital plan is dominated by deferred maintenance, and tenant affordability is already stretched.",
    },
    deal_terms: {
      purchase_price_source: "Stated in OM p.13",
      debt_source: "Assumption of existing loan",
      offering_type: "Priced offering, loan assumption required",
      note: "The OM states a $42.0M price with a required assumption of the existing loan. Pre-filled from OM p.13.",
      stated_price: 42_000_000,
      stated_price_page: 13,
    },
    bid_sensitivity: [
      { bid_price: 30_000_000, price_per_unit: 72_816, cap_rate: 9.93, dscr: 1.51, debt_yield: 9.9, financeable: true, negative_leverage: false },
      { bid_price: 33_000_000, price_per_unit: 80_097, cap_rate: 9.03, dscr: 1.37, debt_yield: 9.0, financeable: true, negative_leverage: false },
      { bid_price: 36_000_000, price_per_unit: 87_379, cap_rate: 8.28, dscr: 1.26, debt_yield: 8.3, financeable: true, negative_leverage: false },
      { bid_price: 38_500_000, price_per_unit: 93_447, cap_rate: 7.74, dscr: 1.18, debt_yield: 7.7, financeable: false, negative_leverage: false },
      { bid_price: 42_000_000, price_per_unit: 101_942, cap_rate: 7.1, dscr: 1.08, debt_yield: 7.1, financeable: false, negative_leverage: false, note: "OM guidance" },
      { bid_price: 46_000_000, price_per_unit: 111_650, cap_rate: 6.48, dscr: 0.99, debt_yield: 6.5, financeable: false, negative_leverage: true },
    ],
    max_supportable_price: 36_400_000,
    market: {
      comps: [
        { property: "Linden Park Flats", units: 220, year_built: 1978, avg_rent: 985, occupancy: 81.0, distance: 0.4 },
        { property: "Wexler Manor", units: 168, year_built: 1969, avg_rent: 910, occupancy: 76.5, distance: 0.9 },
        { property: "Northgate Residences", units: 300, year_built: 1985, avg_rent: 1105, occupancy: 88.2, distance: 1.8 },
        { property: "Cleveland Ave Lofts", units: 244, year_built: 2021, avg_rent: 1420, occupancy: 91.4, distance: 2.6 },
      ],
      supply: [
        { year: "2024", deliveries: 480, stock_pct: 3.4 },
        { year: "2025", deliveries: 1_150, stock_pct: 8.1 },
        { year: "2026", deliveries: 1_640, stock_pct: 11.6 },
        { year: "2027", deliveries: 1_320, stock_pct: 9.3 },
        { year: "2028", deliveries: 700, stock_pct: 4.9 },
      ],
    },
    narrative: {
      headline: "Distressed 1974 vintage does not finance at guidance",
      executive_summary:
        "Cedar Crossing is a 412-unit 1974 asset in North Linden offered at $42.0M. In-place NOI of $2.98M yields 1.08x coverage against the assumable loan — below any lender minimum — and the loan matures inside the hold. Occupancy has slipped to 78.4% while concessions widened, and 44% of the capital plan is deferred maintenance. The asset only becomes financeable at or below $36.4M, roughly 13% under guidance.",
      key_strengths: [
        "Basis of $102K/unit is well below replacement cost",
        "Below-market in-place rents leave a $180/unit renovation premium",
        "Large 412-unit scale supports on-site staffing efficiency",
      ],
      key_concerns: [
        "Coverage of 1.08x is below every lender minimum at guidance",
        "Existing loan matures in month 31 of the hold",
        "44% of the capital plan is deferred maintenance, not value-add",
        "Rent-to-income of 36.9% with concessions expanding to six weeks",
      ],
      critical_questions: [
        "Will the lender permit a paydown to reach a 1.25x assumption test?",
        "What is the current bad-debt and eviction run rate?",
        "How much of the $8.4M capital plan is life-safety or code-driven?",
      ],
      recommended_next_steps: [
        "Pass at guidance; re-engage only below $36.4M",
        "Request the full property condition report before any re-bid",
        "Confirm loan assumption terms and any prepayment path",
      ],
    },
    extraction_meta: {
      source_pages: 39,
      confidence: 0.88,
      missing_fields: ["real_estate_tax_reassessment"],
      analyst_notes: "Tax line item appears to reflect pre-sale assessment; reassessment risk not modeled in the OM.",
    },
  },
  {
    id: "juniper-yards",
    property: {
      name: "Juniper Yards",
      address: "900 Marston Way, Denver, CO 80216",
      units: 246,
      year_built: 2021,
      submarket: "RiNo / Elyria",
    },
    screened_on: "2026-07-27",
    metrics: {
      noi: m(5_180_000, 17),
      cap_rate: m(null),
      dscr: m(null),
      irr: m(null),
      price_per_unit: m(null),
      ltv: m(null),
      debt_yield: m(null),
      expense_ratio: m(33.8, 17),
      breakeven_occupancy: m(null),
      occupancy: m(92.1, 10),
      rent_to_income: m(28.4, 12),
    },
    flags: [
      {
        id: "occ",
        rule: "Occupancy",
        severity: "PASS",
        reason: "Occupancy of 92.1% is above the 85% stress threshold following lease-up completion in Q3 2024.",
        observed: "92.1%",
        threshold: "HIGH below 85% / CRITICAL below 80% with DSCR < 1.20x",
      },
      {
        id: "dscr",
        rule: "Debt Service Coverage",
        severity: "UNKNOWN",
        reason: "The offering is unpriced and free and clear, so no coverage can be computed until a bid and debt structure are assumed.",
        observed: null,
        threshold: "HIGH below 1.25x / CRITICAL below 1.15x",
      },
      {
        id: "supply",
        rule: "Competitive Supply",
        severity: "HIGH",
        reason: "RiNo pipeline equals 12.9% of submarket stock with two deliveries within four blocks in 2027.",
        observed: "12.9% of stock",
        threshold: "HIGH above 10% of submarket stock",
      },
      {
        id: "afford",
        rule: "Affordability",
        severity: "PASS",
        reason: "Rent-to-income of 28.4% is inside the 30% threshold for the submarket income band.",
        observed: "28.4%",
        threshold: "HIGH above 30% / CRITICAL above 35% with rising concessions",
      },
      {
        id: "capex",
        rule: "Capital Needs",
        severity: "PASS",
        reason: "2021 delivery with $340/unit reserves and warranties still in force on major systems.",
        observed: "Built 2021 · $340/unit reserves",
        threshold: "HIGH if pre-1980 or reserves < $300/unit",
      },
    ],
    summary: {
      critical: 0,
      high: 1,
      unknown: 1,
      risk_score: 44,
      recommendation: "CONDITIONAL",
      rationale:
        "Fundamentals are sound but the offering is unpriced and free and clear; the bid sensitivity ladder, not the OM metrics, must drive the go/no-go.",
    },
    deal_terms: {
      purchase_price_source: null,
      debt_source: null,
      offering_type: "Unpriced, free and clear",
      note: "The OM did not state a price and the asset is offered free and clear. Enter the bid you want to test.",
      stated_price: null,
    },
    bid_sensitivity: [
      { bid_price: 78_000_000, price_per_unit: 317_073, cap_rate: 6.64, dscr: 1.85, debt_yield: 11.1, financeable: true, negative_leverage: false },
      { bid_price: 84_000_000, price_per_unit: 341_463, cap_rate: 6.17, dscr: 1.72, debt_yield: 10.3, financeable: true, negative_leverage: false },
      { bid_price: 90_000_000, price_per_unit: 365_854, cap_rate: 5.76, dscr: 1.6, debt_yield: 9.6, financeable: true, negative_leverage: false },
      { bid_price: 96_000_000, price_per_unit: 390_244, cap_rate: 5.4, dscr: 1.5, debt_yield: 9.0, financeable: true, negative_leverage: true, note: "cost of debt 6.50%" },
      { bid_price: 104_000_000, price_per_unit: 422_764, cap_rate: 4.98, dscr: 1.39, debt_yield: 8.3, financeable: true, negative_leverage: true },
      { bid_price: 112_000_000, price_per_unit: 455_285, cap_rate: 4.63, dscr: 1.29, debt_yield: 7.7, financeable: false, negative_leverage: true },
      { bid_price: 120_000_000, price_per_unit: 487_805, cap_rate: 4.32, dscr: 1.2, debt_yield: 7.2, financeable: false, negative_leverage: true },
    ],
    max_supportable_price: 108_900_000,
    market: {
      comps: [
        { property: "Steelyard Denver", units: 288, year_built: 2020, avg_rent: 2180, occupancy: 93.6, distance: 0.5 },
        { property: "Elyria Works", units: 174, year_built: 2022, avg_rent: 2260, occupancy: 90.1, distance: 0.8 },
        { property: "Brighton Row", units: 320, year_built: 2019, avg_rent: 2075, occupancy: 94.0, distance: 1.2 },
        { property: "The Larimer", units: 210, year_built: 2023, avg_rent: 2395, occupancy: 87.3, distance: 1.9 },
      ],
      supply: [
        { year: "2024", deliveries: 980, stock_pct: 6.2 },
        { year: "2025", deliveries: 1_420, stock_pct: 9.0 },
        { year: "2026", deliveries: 1_760, stock_pct: 11.1 },
        { year: "2027", deliveries: 2_040, stock_pct: 12.9 },
        { year: "2028", deliveries: 860, stock_pct: 5.4 },
      ],
    },
    narrative: {
      headline: "Unpriced RiNo offering — the bid ladder is the underwriting",
      executive_summary:
        "Juniper Yards is a 246-unit 2021 delivery offered unpriced and free and clear. With no asking price and no in-place debt, cap rate, DSCR, LTV, debt yield and IRR cannot be computed from the OM. In-place NOI of $5.18M supports a maximum financeable price of $108.9M at 60% LTV and 6.50% debt. Leverage turns negative above roughly $96M, so the practical bid band is $84M–$96M.",
      key_strengths: [
        "2021 vintage with warranties in force and no near-term capital plan",
        "Expense ratio of 33.8% is best-in-class for the submarket",
        "Free and clear offering allows a fully optimized capital structure",
      ],
      key_concerns: [
        "No stated price — pricing risk sits entirely with the bidder",
        "RiNo pipeline of 12.9% of stock peaks in 2027",
        "Negative leverage above a $96M bid at current debt costs",
      ],
      critical_questions: [
        "What price guidance, if any, will the broker share ahead of best and final?",
        "Are there any remaining construction defect claims or warranty items?",
        "What is the current concession level across the 2026 renewal cohort?",
      ],
      recommended_next_steps: [
        "Anchor the bid at $88M–$92M and stress to 7.0% debt",
        "Request the broker's rent roll in native format to verify loss-to-lease",
        "Confirm submarket delivery timing with a third-party pipeline report",
      ],
    },
    extraction_meta: {
      source_pages: 52,
      confidence: 0.81,
      missing_fields: ["asking_price", "existing_debt", "cap_rate", "dscr", "irr"],
      analyst_notes:
        "Marketed unpriced and free and clear. All leverage-dependent metrics deferred to the bid sensitivity model.",
    },
  },
];

export const getDeal = (id: string) => mockDeals.find((d) => d.id === id);