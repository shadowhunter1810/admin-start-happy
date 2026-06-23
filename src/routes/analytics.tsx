import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "IB Analytics · Atlas CRM" },
      {
        name: "description",
        content:
          "Partner business intelligence — growth, acquisition, revenue, trading, retention, geography, campaigns.",
      },
    ],
  }),
  component: () => (
    <ClientShell>
      <AnalyticsPage />
    </ClientShell>
  ),
});

/* ---------------- Consolidated Structural Tabs ---------------- */
const SECTIONS = [
  { k: "summary", label: "Summary Overview" },
  { k: "acquisition", label: "Acquisition Pipeline" },
  { k: "revenue", label: "Financial Hub" },
  { k: "trading", label: "Trading Activity" },
  { k: "retention", label: "Retention & Churn" },
  { k: "geo", label: "Geographic Insights" },
  { k: "campaigns", label: "Marketing Campaigns" },
  { k: "admin", label: "Admin & Operations" },
] as const;
type SK = (typeof SECTIONS)[number]["k"];

type Tone = "gray" | "green" | "amber" | "red" | "blue" | "violet";
const toneMap: Record<Tone, string> = {
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
};

const Pill = ({ tone = "gray", children }: { tone?: Tone; children: React.ReactNode }) => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${toneMap[tone]}`}
  >
    {children}
  </span>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const Section = ({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Card className="p-6">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
    {children}
  </Card>
);

const KV = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex justify-between gap-3 border-b border-gray-100 py-2 text-sm last:border-0">
    <span className="text-gray-500">{k}</span>
    <span className="font-medium text-gray-900 text-right">{v}</span>
  </div>
);

const Btn = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "ghost" | "danger";
  className?: string;
}) => {
  const cls =
    variant === "ghost"
      ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
      : variant === "danger"
        ? "bg-rose-600 text-white hover:bg-rose-700"
        : "bg-gray-900 text-white hover:bg-gray-800";
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${cls} ${className}`}
    >
      {children}
    </button>
  );
};

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">
    {children}
  </th>
);
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-3 py-2 text-sm text-gray-800 ${className}`}>{children}</td>
);

/* ---------------- Master Consolidated Datasets ---------------- */
const KPIS = [
  { l: "Total Registered Clients", v: "1,248", s: "↑12% this month", tone: "blue" as Tone },
  {
    l: "Active Traders Rate",
    v: "842 Clients",
    s: "67.5% operational flow",
    tone: "green" as Tone,
  },
  { l: "Net Revenue Contribution", v: "$48,320", s: "↑8.4% vs last cycle", tone: "violet" as Tone },
  { l: "Total Volume Traded", v: "12,450 Lots", s: "Avg 14.8 lots/client", tone: "blue" as Tone },
  { l: "Gross Deposits Engine", v: "$2.1M", s: "↑5.2% fresh funding", tone: "green" as Tone },
  { l: "Funnel Conversion Rate", v: "34.2%", s: "Lead to Funded Trader", tone: "blue" as Tone },
  { l: "Account Retention Scale", v: "71.4%", s: "↓3.1% Churn alert", tone: "amber" as Tone },
  { l: "Compounded Growth Rate", v: "+12.3%", s: "Month-over-Month status", tone: "green" as Tone },
];

const METRIC_TRENDS = [
  { m: "Nov", users: 78, rev: 28, dep: 1.4 },
  { m: "Dec", users: 92, rev: 31, dep: 1.6 },
  { m: "Jan", users: 104, rev: 35, dep: 1.7 },
  { m: "Feb", users: 98, rev: 38, dep: 1.8 },
  { m: "Mar", users: 116, rev: 41, dep: 1.9 },
  { m: "Apr", users: 124, rev: 44, dep: 2.0 },
  { m: "May", users: 116, rev: 44.6, dep: 2.0 },
  { m: "Jun", users: 138, rev: 48.3, dep: 2.1 },
];

const PIPELINE_FUNNEL = [
  { stage: "Leads Inflow", v: 2400 },
  { stage: "Registrations", v: 1920 },
  { stage: "KYC Verified", v: 1248 },
  { stage: "Funded Accounts", v: 912 },
  { stage: "Active Traders", v: 842 },
  { stage: "VIP Segments", v: 4 },
];

const ACQUISITION_TABLE = [
  { m: "New Registrations", t: "412", l: "380", c: "↑8.4%", target: "400", s: "On track" },
  { m: "KYC Gate Approved", t: "298", l: "271", c: "↑9.9%", target: "300", s: "Near target" },
  { m: "First-Time Deposits", t: "189", l: "201", c: "↓6.0%", target: "210", s: "Critically low" },
  { m: "Monthly Active Traders", t: "842", l: "861", c: "↓2.2%", target: "900", s: "Below target" },
  { m: "High-Net Worth VIPs", t: "4", l: "3", c: "↑1 new", target: "5", s: "Near target" },
];

const COHORT_DATA = [
  { c: "Jan 2026", size: 412, m1: "82%", m2: "71%", m3: "65%", m4: "59%", m5: "54%", m6: "51%" },
  { c: "Feb 2026", size: 388, m1: "84%", m2: "73%", m3: "67%", m4: "61%", m5: "56%", m6: "—" },
  { c: "Mar 2026", size: 401, m1: "85%", m2: "74%", m3: "68%", m4: "62%", m5: "—", m6: "—" },
  { c: "Apr 2026", size: 372, m1: "86%", m2: "75%", m3: "69%", m4: "—", m5: "—", m6: "—" },
  { c: "May 2026", size: 380, m1: "87%", m2: "76%", m3: "—", m4: "—", m5: "—", m6: "—" },
];

const REVENUE_SPLIT = [
  { l: "Spread Revenue Commission", v: "$28,400", pct: 58.8 },
  { l: "Lot-Volume Rewards", v: "$14,200", pct: 29.4 },
  { l: "Swap Financing Accruals", v: "$5,720", pct: 11.8 },
];

const PRODUCING_TRADERS = [
  {
    client: "Ahmed Al-Rashidi",
    acc: "MT5-00421",
    revenue: "$4,820",
    lots: 1240,
    yield: "$3.89",
    type: "VIP",
  },
  {
    client: "Priya Sharma",
    acc: "MT5-00389",
    revenue: "$3,120",
    lots: 804,
    yield: "$3.88",
    type: "Standard",
  },
  {
    client: "Mohammed Hassan",
    acc: "MT5-00512",
    revenue: "$2,890",
    lots: 744,
    yield: "$3.88",
    type: "Standard",
  },
  {
    client: "Sara Al-Zaabi",
    acc: "MT5-00298",
    revenue: "$2,450",
    lots: 630,
    yield: "$3.89",
    type: "VIP",
  },
  {
    client: "James O'Brien",
    acc: "MT5-00471",
    revenue: "$1,980",
    lots: 510,
    yield: "$3.88",
    type: "Standard",
  },
];

const INSTRUMENTS = [
  { symbol: "XAUUSD (Gold)", lots: 4200 },
  { symbol: "EURUSD", lots: 3100 },
  { symbol: "GBPUSD", lots: 1800 },
  { symbol: "US30 (Dow Jones)", lots: 1500 },
  { symbol: "NAS100", lots: 1100 },
  { symbol: "CRUDE OIL", lots: 750 },
];

const MARKET_GEO = [
  { country: "🇦🇪 United Arab Emirates", clients: 412, deposits: "$820K", revenue: "$18,400" },
  { country: "🇮🇳 India Market", clients: 348, deposits: "$540K", revenue: "$12,200" },
  { country: "🇸🇦 Saudi Arabia", clients: 210, deposits: "$390K", revenue: "$8,900" },
  { country: "🇬🇧 United Kingdom", clients: 142, deposits: "$210K", revenue: "$5,400" },
  { country: "🇲🇾 Malaysia Hub", clients: 86, deposits: "$95K", revenue: "$2,200" },
];

const CAMPAIGNS = [
  {
    id: "CAMP-UAE-SUMMER",
    name: "UAE Summer Extension",
    clicks: 4820,
    regs: 142,
    deposits: "$420K",
    revenue: "$8,420",
    roi: "312%",
    status: "Active",
  },
  {
    id: "CAMP-GOLD-2026",
    name: "Gold Volatility Drive",
    clicks: 3240,
    regs: 98,
    deposits: "$280K",
    revenue: "$6,100",
    roi: "245%",
    status: "Active",
  },
  {
    id: "CAMP-VIP-INCENTIVE",
    name: "High-Net Deposit Bonus",
    clicks: 1820,
    regs: 44,
    deposits: "$180K",
    revenue: "$3,800",
    roi: "180%",
    status: "Active",
  },
];

const FUTURE_FORECASTS = [
  { targetMonth: "July 2026", projection: 52400 },
  { targetMonth: "August 2026", projection: 55800 },
  { targetMonth: "September 2026", projection: 58200 },
];

const BENCHMARKS = [
  {
    item: "Yield per Client Matrix",
    clientVal: "$38.72",
    globalAvg: "$28.40",
    leading10: "$52.10",
  },
  {
    item: "Onboarding Retention Scale",
    clientVal: "71.4%",
    globalAvg: "64.2%",
    leading10: "82.1%",
  },
  {
    item: "Lead Action Conversion Ratio",
    clientVal: "34.2%",
    globalAvg: "29.8%",
    leading10: "41.5%",
  },
];

const LOGS = [
  {
    date: "Jun 15, 2026",
    event: "Q3 Target Projection models approved globally",
    agent: "Finance Hub",
  },
  {
    date: "May 28, 2026",
    event: "VIP Tier client system validation successful",
    agent: "System Automated",
  },
  {
    date: "May 10, 2026",
    event: "High Priority Retention parameters adjusted",
    agent: "IB Compliance Office",
  },
];

const INTERNAL_NOTES = [
  {
    text: "UAE Hub displaying exceptional organic metrics. Plan allocation expansion.",
    author: "Regional Manager",
    timestamp: "12 June 2026",
  },
  {
    text: "First-time funding efficiency slipping. Onboarding review mandated.",
    author: "Analyst Desk",
    timestamp: "02 June 2026",
  },
];

const SECURITY_AUDITS = [
  {
    log: "Target Structure Configured",
    handler: "IB Director",
    area: "Global parameters",
    time: "18 Jun 10:20",
  },
  {
    log: "Export Dataset Processed",
    handler: "Data Desk 02",
    area: "Partner extraction logs",
    time: "14 Jun 16:45",
  },
];

/* ---------------- Application Client Component ---------------- */
function AnalyticsPage() {
  const [tab, setTab] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<any>(null);
  const notify = (msg: string) => toast.success(msg);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Structural Header Layout */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500 font-mono">
                Zebtix Market Limited Dashboard
              </div>
              <h1 className="mt-1 text-2xl font-semibold">
                Arjun Raghunathan{" "}
                <span className="text-sm font-mono text-gray-400">· Partner ID: IB-00412</span>
              </h1>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Pill tone="green">Verification Passed</Pill>
                <Pill tone="violet">Gold Partner Tier</Pill>
                <Pill tone="blue">3 Campaigns Triggered</Pill>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn
                variant="ghost"
                onClick={() => notify("Comprehensive summary compiled and downloaded.")}
              >
                Export Analytics Sheet
              </Btn>
              <Btn onClick={() => notify("Operations target limits updated successfully.")}>
                Manage Dynamic Boundaries
              </Btn>
            </div>
          </div>
        </div>

        {/* Main Clean Tab Navigation */}
        <div className="mx-auto max-w-7xl overflow-x-auto px-6">
          <div className="flex gap-1">
            {SECTIONS.map((s) => (
              <button
                key={s.k}
                onClick={() => setTab(s.k)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition ${tab === s.k ? "border-gray-900 font-semibold text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Global Dashboard Content Area */}
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        {/* TAB 1: SUMMARY DASHBOARD */}
        {tab === "summary" && (
          <>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {KPIS.map((k) => (
                <Card key={k.l} className="p-4">
                  <div className="text-xs text-gray-500">{k.l}</div>
                  <div className="mt-1 text-2xl font-semibold">{k.v}</div>
                  <div className="mt-1 text-xs text-gray-500 font-medium">{k.s}</div>
                </Card>
              ))}
            </div>

            {/* User Side Addition: Interactive Target Progress Matrix */}
            <div className="grid gap-6 md:grid-cols-2">
              <Section
                title="Target Threshold Engine"
                subtitle="Current performance lifecycle metrics vs Q2 core system benchmarks"
              >
                <div className="space-y-4 pt-2">
                  {[
                    {
                      title: "Monthly Target Revenue ($50,000 max)",
                      current: 48320,
                      goal: 50000,
                      color: "bg-violet-600",
                    },
                    {
                      title: "Active Registrations Target",
                      current: 412,
                      goal: 450,
                      color: "bg-sky-500",
                    },
                    {
                      title: "Funding Volume Lock ($2.5M goal)",
                      current: 2100000,
                      goal: 2500000,
                      color: "bg-emerald-500",
                    },
                  ].map((item, idx) => {
                    const pct = Math.min((item.current / item.goal) * 100, 100);
                    return (
                      <div key={idx}>
                        <div className="flex justify-between text-xs font-medium text-gray-700">
                          <span>{item.title}</span>
                          <span>{pct.toFixed(1)}% Completed</span>
                        </div>
                        <div className="mt-1.5 h-2 w-full rounded bg-gray-100 overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Section>

              <Section
                title="Operational Pipeline Diagnostics"
                subtitle="Consolidated data metrics system state summary"
              >
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between border-b pb-1">
                    <span>System Core Build</span>
                    <span className="font-semibold text-gray-900">v4.82-Live</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Data Telemetry Stream</span>
                    <span className="text-emerald-600 font-semibold">Active Synchronized</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>Last Ledger Refresh</span>
                    <span className="text-gray-600">Just Now</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance Verification Status</span>
                    <span className="text-violet-600 font-semibold">Gold Certified Clear</span>
                  </div>
                </div>
              </Section>
            </div>
          </>
        )}

        {/* TAB 2: ACQUISITION PIPELINE */}
        {tab === "acquisition" && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Section
                title="Account Flow Growth Influx"
                subtitle="New accounts registration metrics volume scale"
              >
                <div className="flex h-44 items-end gap-2 pt-4">
                  {METRIC_TRENDS.map((t) => (
                    <div key={t.m} className="flex flex-1 flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-gray-900 transition-all hover:bg-violet-700"
                        style={{ height: `${(t.users / 150) * 100}%` }}
                      />
                      <div className="text-[10px] text-gray-500 font-medium">{t.m}</div>
                      <div className="text-[10px] font-mono font-bold">{t.users}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                title="Acquisition Funnel Mapping"
                subtitle="Progression from raw Lead down to Active VIP status"
              >
                <div className="space-y-2">
                  {PIPELINE_FUNNEL.map((f, i) => {
                    const maxVal = PIPELINE_FUNNEL[0].v;
                    const currentWidth = (f.v / maxVal) * 100;
                    return (
                      <div key={f.stage} className="flex items-center gap-3">
                        <div className="w-28 text-xs font-medium text-gray-700">{f.stage}</div>
                        <div className="flex-1 rounded bg-gray-100">
                          <div
                            className="rounded bg-gradient-to-r from-gray-900 to-indigo-950 py-1 pl-3 text-[10px] font-semibold text-white"
                            style={{ width: `${currentWidth}%` }}
                          >
                            {f.v.toLocaleString()}
                          </div>
                        </div>
                        {i > 0 && (
                          <div className="w-12 text-right text-[10px] font-mono text-gray-400">
                            {((f.v / PIPELINE_FUNNEL[i - 1].v) * 100).toFixed(1)}%
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Section>
            </div>

            <Section
              title="Performance Matrix Strategy Targets"
              subtitle="Deep validation review of current user cycle metrics"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Conversion Metric",
                        "Current Metric MTD",
                        "Previous Month Data",
                        "Net Deviation Variance",
                        "Strategic Target",
                        "State Flags",
                      ].map((h) => (
                        <Th key={h}>{h}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {ACQUISITION_TABLE.map((row) => (
                      <tr key={row.m} className="hover:bg-gray-50">
                        <Td className="font-medium">{row.m}</Td>
                        <Td className="font-semibold">{row.t}</Td>
                        <Td className="text-gray-500">{row.l}</Td>
                        <Td
                          className={
                            row.c.includes("↑")
                              ? "text-emerald-600 font-semibold"
                              : "text-rose-600 font-semibold"
                          }
                        >
                          {row.c}
                        </Td>
                        <Td className="font-mono">{row.target}</Td>
                        <Td>
                          <Pill
                            tone={
                              row.s === "On track"
                                ? "green"
                                : row.s === "Near target"
                                  ? "amber"
                                  : "red"
                            }
                          >
                            {row.s}
                          </Pill>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section
              title="Account Cohort Stability Retention"
              subtitle="Longevity data retention profiles by user registration month block structure"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Cohort Month",
                        "Initial Volume",
                        "Month 1",
                        "Month 2",
                        "Month 3",
                        "Month 4",
                        "Month 5",
                        "Month 6",
                      ].map((h) => (
                        <Th key={h}>{h}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {COHORT_DATA.map((row) => (
                      <tr key={row.c} className="hover:bg-gray-50">
                        <Td className="font-medium text-gray-900">{row.c}</Td>
                        <Td className="font-semibold">{row.size}</Td>
                        <Td>{row.m1}</Td>
                        <Td>{row.m2}</Td>
                        <Td>{row.m3}</Td>
                        <Td>{row.m4}</Td>
                        <Td>{row.m5}</Td>
                        <Td>{row.m6}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        {/* TAB 3: FINANCIAL HUB */}
        {tab === "revenue" && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <Section title="Revenue Stream Allocation Breakdowns">
                <div className="space-y-4 pt-2">
                  {REVENUE_SPLIT.map((item) => (
                    <div key={item.l}>
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-gray-700">{item.l}</span>
                        <span className="font-bold text-gray-900">
                          {item.v}{" "}
                          <span className="text-xs font-normal text-gray-400">({item.pct}%)</span>
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded bg-gray-100 overflow-hidden">
                        <div
                          className="h-full bg-gray-900 rounded"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section
                title="Financial Growth Volume Matrix"
                subtitle="Compounded Net Revenue vs Deposited Value Growth Trends"
              >
                <div className="flex h-36 items-end gap-3 pt-2">
                  {METRIC_TRENDS.map((t) => (
                    <div key={t.m} className="flex flex-1 flex-col items-center gap-1">
                      <div className="flex w-full items-end justify-center gap-1">
                        <div
                          className="w-2 rounded-t bg-gray-900"
                          style={{ height: `${t.rev * 2.5}px` }}
                        />
                        <div
                          className="w-2 rounded-t bg-sky-400"
                          style={{ height: `${t.dep * 50}px` }}
                        />
                      </div>
                      <div className="text-[10px] text-gray-400 font-mono">{t.m}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <Section
              title="Top Capital Producing Partner Traders"
              subtitle="Select a partner account record to view analytical breakdown sheets"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Client Trader Name",
                        "Account ID",
                        "Revenue Accrued",
                        "Volume Lots Execution",
                        "Net Yield Per Lot",
                        "Risk Profiling",
                      ].map((h) => (
                        <Th key={h}>{h}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {PRODUCING_TRADERS.map((row) => (
                      <tr
                        key={row.acc}
                        className="cursor-pointer hover:bg-gray-50 transition"
                        onClick={() => setDrawer(row)}
                      >
                        <Td className="font-medium text-gray-900">{row.client}</Td>
                        <Td className="font-mono text-gray-500">{row.acc}</Td>
                        <Td className="font-bold text-emerald-700">{row.revenue}</Td>
                        <Td className="font-medium">{row.lots}</Td>
                        <Td className="font-mono">{row.yield}</Td>
                        <Td>
                          <Pill tone={row.type === "VIP" ? "violet" : "gray"}>{row.type}</Pill>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <div className="grid gap-6 md:grid-cols-2">
              <Section
                title="Quarterly Projections Engine"
                subtitle="Algorithmic system model predictions forward outlook stats"
              >
                <div className="grid grid-cols-3 gap-2">
                  {FUTURE_FORECASTS.map((f) => (
                    <Card key={f.targetMonth} className="p-3 bg-gray-50 border-gray-100">
                      <div className="text-[10px] text-gray-400 font-mono font-medium uppercase tracking-wider">
                        {f.targetMonth}
                      </div>
                      <div className="mt-1 text-lg font-bold text-gray-900">
                        ${f.projection.toLocaleString()}
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 flex justify-between border-t border-gray-100 pt-3 text-xs">
                  <span className="text-gray-500 font-medium">
                    Cumulative Forecast Q3 Cumulative
                  </span>
                  <span className="font-bold text-gray-900 font-mono">$166,400</span>
                </div>
              </Section>

              <Section
                title="Global Ecosystem Benchmarks"
                subtitle="Comparison of performance with industry standards"
              >
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-left">
                        <th className="pb-2 font-medium">Analytical Metric</th>
                        <th className="pb-2 font-medium">Your Profile</th>
                        <th className="pb-2 font-medium">Platform Avg</th>
                        <th className="pb-2 font-medium">Top 10% Tier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {BENCHMARKS.map((b, idx) => (
                        <tr key={idx}>
                          <td className="py-2 font-medium text-gray-700">{b.item}</td>
                          <td className="py-2 font-bold text-gray-950 font-mono">{b.clientVal}</td>
                          <td className="py-2 text-gray-500">{b.globalAvg}</td>
                          <td className="py-2 text-emerald-600 font-semibold">{b.leading10}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>
          </>
        )}

        {/* TAB 4: TRADING ACTIVITY */}
        {tab === "trading" && (
          <Section
            title="Asset Class Lot Distribution"
            subtitle="Granular volume execution tracking across multi-asset instruments"
          >
            <div className="flex h-56 items-end gap-4 pt-6 max-w-4xl mx-auto">
              {INSTRUMENTS.map((item) => (
                <div key={item.symbol} className="flex flex-1 flex-col items-center gap-2 group">
                  <div className="text-xs font-mono font-bold text-gray-900 opacity-80 group-hover:opacity-100">
                    {item.lots}
                  </div>
                  <div
                    className="w-full rounded-t bg-indigo-950 transition-all group-hover:bg-violet-600"
                    style={{ height: `${(item.lots / 4500) * 100}%` }}
                  />
                  <div className="text-[11px] font-semibold text-gray-500 mt-1">{item.symbol}</div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* TAB 5: RETENTION & CHURN */}
        {tab === "retention" && (
          <>
            <Section title="Account Portfolio Active vs Churn Stability">
              <div className="space-y-4 pt-2">
                {[
                  { label: "Q1 Structural Retention Curve", retain: 74.2, churn: 25.8 },
                  { label: "Q2 Core Active Telemetry Segment", retain: 71.4, churn: 28.6 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-medium text-gray-500 mb-1">
                      <span>{item.label}</span>
                      <span>
                        Active Retention: {item.retain}% / Dormant Churn: {item.churn}%
                      </span>
                    </div>
                    <div className="flex h-4 w-full overflow-hidden rounded bg-gray-100">
                      <div
                        className="bg-emerald-500 h-full transition-all"
                        style={{ width: `${item.retain}%` }}
                      />
                      <div
                        className="bg-rose-400 h-full transition-all"
                        style={{ width: `${item.churn}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* User Side Addition: Dormancy Risk Table Segments */}
            <Section
              title="Dormancy Risk Warning Matrix"
              subtitle="Identified client trading accounts displaying high-risk inactivity profiles"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Trader Profile Account",
                        "Last Lot Action Time",
                        "Equity Balance",
                        "Risk Priority Flag",
                      ].map((h) => (
                        <Th key={h}>{h}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    <tr className="hover:bg-gray-50">
                      <Td className="font-medium">MT5-00912 (V. K.)</Td>
                      <Td>22 Days Inactive</Td>
                      <Td className="font-mono">$14,200</Td>
                      <Td>
                        <Pill tone="amber">Medium Priority</Pill>
                      </Td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <Td className="font-medium">MT5-00104 (L. S.)</Td>
                      <Td>41 Days Inactive</Td>
                      <Td className="font-mono">$3,400</Td>
                      <Td>
                        <Pill tone="red">Critical Risk Churn</Pill>
                      </Td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}

        {/* TAB 6: GEOGRAPHIC INSIGHTS */}
        {tab === "geo" && (
          <Section
            title="Geographic Regional Metrics"
            subtitle="Granular volume, capital storage deposits & net value distribution breakdown by market hub"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Market Hub Country",
                      "Total Verified Clients",
                      "Gross Capital Deposits",
                      "Net Partner Yield Share",
                    ].map((h) => (
                      <Th key={h}>{h}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {MARKET_GEO.map((row) => (
                    <tr key={row.country} className="hover:bg-gray-50">
                      <Td className="font-medium text-gray-900">{row.country}</Td>
                      <Td className="font-mono font-medium">{row.clients}</Td>
                      <Td className="font-semibold text-gray-700">{row.deposits}</Td>
                      <Td className="font-bold text-emerald-700">{row.revenue}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* TAB 7: MARKETING CAMPAIGNS */}
        {tab === "campaigns" && (
          <Section
            title="Marketing Campaign Trackers"
            subtitle="Performance conversion pipelines monitored via specialized campaign parameters routing"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "Campaign ID Link",
                      "Campaign Internal Description Name",
                      "Gross Click Influx",
                      "Registrations",
                      "Deposits Managed",
                      "Net Revenue",
                      "Yield ROI",
                      "Lifecycle State",
                    ].map((h) => (
                      <Th key={h}>{h}</Th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {CAMPAIGNS.map((row) => (
                    <tr
                      key={row.id}
                      className="cursor-pointer hover:bg-gray-50 transition"
                      onClick={() => setDrawer({ ...row, isCampaign: true })}
                    >
                      <Td className="font-mono font-semibold text-gray-900">{row.id}</Td>
                      <Td className="font-medium text-gray-700">{row.name}</Td>
                      <Td className="font-mono">{row.clicks.toLocaleString()}</Td>
                      <Td>{row.regs}</Td>
                      <Td className="font-semibold text-gray-600">{row.deposits}</Td>
                      <Td className="font-bold text-gray-900">{row.revenue}</Td>
                      <Td className="font-bold text-emerald-600 font-mono">{row.roi}</Td>
                      <Td>
                        <Pill tone="green">{row.status}</Pill>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {/* TAB 8: ADMIN & OPERATIONS */}
        {tab === "admin" && (
          <>
            <div className="grid gap-6 md:grid-cols-3">
              <Section title="Standard Administrative Actions">
                <div className="space-y-2">
                  {[
                    "Compile Extracted Data Reports",
                    "Export Financial Ledger Hub",
                    "Append New Operator Directive Note",
                  ].map((act) => (
                    <Btn
                      key={act}
                      variant="ghost"
                      className="w-full text-left justify-start"
                      onClick={() => notify(`Operation Success: ${act}`)}
                    >
                      {act}
                    </Btn>
                  ))}
                </div>
              </Section>
              <Section title="Moderate Level Operations">
                <div className="space-y-2">
                  {[
                    "Initialize New Campaign Tracker Link",
                    "Assign Supervisor Escalation Handler",
                    "Alter Operational Target Limits",
                  ].map((act) => (
                    <Btn
                      key={act}
                      className="w-full text-left justify-start"
                      onClick={() => notify(`Operation Initiated: ${act}`)}
                    >
                      {act}
                    </Btn>
                  ))}
                </div>
              </Section>
              <Section
                title="High Risk Protected Directives"
                subtitle="System structural adjustments logging active"
              >
                <div className="space-y-2">
                  {[
                    "Suspend Program Partner Tracking",
                    "Terminate Analytics Data Pipelines",
                    "Freeze Allocation Tracking Accounts",
                  ].map((act) => (
                    <Btn
                      key={act}
                      variant="danger"
                      className="w-full text-left justify-start"
                      onClick={() => notify(`CRITICAL CRASH BLOCK PREVENTED: ${act}`)}
                    >
                      {act}
                    </Btn>
                  ))}
                </div>
              </Section>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Section title="Internal Operations Lifecycle Logging">
                <ol className="relative ml-3 border-l border-gray-200 space-y-4 pt-2">
                  {LOGS.map((l, idx) => (
                    <li key={idx} className="ml-4">
                      <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-900" />
                      <div className="text-[10px] text-gray-400 font-mono font-medium">
                        {l.date} · Operator: {l.agent}
                      </div>
                      <div className="text-xs text-gray-800 font-medium mt-0.5">{l.event}</div>
                    </li>
                  ))}
                </ol>
              </Section>

              <Section
                title="Internal Technical Oversight Notes"
                action={
                  <Btn
                    onClick={() => notify("Appended fresh analytical oversight notation entry.")}
                  >
                    + Add Structural Note
                  </Btn>
                }
              >
                <div className="space-y-2 pt-1">
                  {INTERNAL_NOTES.map((n, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                      <div className="text-xs text-gray-800 font-medium">{n.text}</div>
                      <div className="mt-1 text-[10px] font-mono text-gray-400 text-right">
                        {n.author} · {n.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <Section
              title="Security Parameter Modification Logs"
              subtitle="Tracking global state modification metrics history"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 font-mono text-xs">
                  <thead className="bg-gray-50">
                    <tr>
                      {[
                        "Modification Event",
                        "Handler Authority",
                        "Entity Boundary Scope",
                        "Timestamp Logged",
                      ].map((h) => (
                        <Th key={h}>{h}</Th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {SECURITY_AUDITS.map((aud, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <Td className="font-semibold text-gray-900">{aud.log}</Td>
                        <Td>{aud.handler}</Td>
                        <Td className="text-gray-500">{aud.area}</Td>
                        <Td className="text-gray-400">{aud.time}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          </>
        )}
      </div>

      {/* Persistent Analytical Metric Review Drawer Component */}
      <AnalyticsDrawer
        open={!!drawer}
        data={drawer}
        onClose={() => setDrawer(null)}
        notify={notify}
      />
    </div>
  );
}

/* ---------------- Structural Sidebar Sheet Drawer ---------------- */
function AnalyticsDrawer({
  open,
  data,
  onClose,
  notify,
}: {
  open: boolean;
  data: any;
  onClose: () => void;
  notify: (m: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  if (!open) return null;
  const isCampaign = data?.isCampaign;

  const tabs = isCampaign
    ? [
        "overview",
        "clicks_telemetry",
        "registrations",
        "deposits_hub",
        "revenue_yield",
        "roi_calculators",
        "timeline_logs",
      ]
    : ["overview", "revenue_allocations", "top_traders", "projections_q3"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40" onClick={onClose}>
      <div
        className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Structural Head */}
        <div className="border-b border-gray-200 p-5 bg-gray-50">
          <div className="flex items-start justify-between">
            <div>
              {isCampaign ? (
                <>
                  <Pill tone="green">Active Marketing Campaign Stream</Pill>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">{data.name}</h3>
                  <div className="text-xs font-mono text-gray-500">
                    Identifier Mapping: {data.id}
                  </div>
                </>
              ) : (
                <>
                  <Pill tone={data.type === "VIP" ? "violet" : "gray"}>
                    {data.type} Classification
                  </Pill>
                  <h3 className="mt-2 text-lg font-bold text-gray-900">
                    Capital Ledger Sheet — {data.client}
                  </h3>
                  <div className="text-xs font-mono text-gray-500">
                    Routing Target Account: {data.acc}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1.5 hover:bg-gray-200 text-gray-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Drawer Nested Tab Navigation Row */}
          <div className="mt-4 flex flex-wrap gap-1 -mb-5 border-b border-gray-200">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`border-b-2 px-3 py-2 text-xs font-medium capitalize transition-all ${activeTab === t ? "border-gray-900 text-gray-900 font-bold" : "border-transparent text-gray-400 hover:text-gray-700"}`}
              >
                {t.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Drawer Target Analytical Data Panel Content */}
        <div className="space-y-1 p-5">
          {!isCampaign && activeTab === "overview" && (
            <>
              <KV k="Gross Portfolio Yield Value" v="$48,320" />
              <KV k="Cycle Segment Allocation" v="$48,320" />
              <KV k="Yield Return Ratio / Client Profile" v="$38.72" />
              <KV k="Lots Action Frequency Target" v={data.lots} />
              <KV
                k="Performance Baseline Deviation"
                v={<span className="text-emerald-600 font-bold">+8.4% Upper Bound</span>}
              />
            </>
          )}

          {!isCampaign &&
            activeTab === "revenue_allocations" &&
            REVENUE_SPLIT.map((r) => <KV key={r.l} k={r.l} v={`${r.v} (${r.pct}%)`} />)}
          {!isCampaign &&
            activeTab === "top_traders" &&
            PRODUCING_TRADERS.map((c) => <KV key={c.acc} k={c.client} v={c.revenue} />)}
          {!isCampaign && activeTab === "projections_q3" && (
            <>
              {FUTURE_FORECASTS.map((f) => (
                <KV key={f.targetMonth} k={f.targetMonth} v={`$${f.projection.toLocaleString()}`} />
              ))}
              <KV k="Consolidated Forecast Matrix Sum" v="$166,400" />
            </>
          )}

          {isCampaign && activeTab === "overview" && (
            <>
              <KV k="Telemetry Campaign Stream Registry ID" v={data.id} />
              <KV k="Total Traffic Clicks Influx" v={data.clicks} />
              <KV k="Registrations Processed" v={data.regs} />
              <KV k="Deposited Allocation Pool" v={data.deposits} />
              <KV k="Verified Net Value Returned" v={data.revenue} />
              <KV k="Yield ROI Scale Metric" v={data.roi} />
            </>
          )}

          {isCampaign && activeTab === "clicks_telemetry" && (
            <>
              <KV k="Gross Click Events Tracker" v="4,820 Events" />
              <KV k="Unique Hardware Handshakes" v="3,940 Address Nodes" />
              <KV k="Conversion Matrix Flow Rate (CTR)" v="4.2% Ratio" />
              <KV k="Primary Origin Highway Traffic" v="WhatsApp Structured Linking" />
            </>
          )}

          {isCampaign && activeTab === "registrations" && (
            <>
              <KV k="Accounts Created" v={data.regs} />
              <KV k="Compliance KYC Passed Gates" v="108 Users" />
              <KV k="Pending Verification Holds" v="24 Users" />
              <KV k="Efficiency Ratio (Reg to Verified)" v="76.1%" />
            </>
          )}

          {isCampaign && activeTab === "deposits_hub" && (
            <>
              <KV k="Funded Accounts Count" v="84 Profiles" />
              <KV k="Gross Capital Deployment Vol" v={data.deposits} />
              <KV k="Average Deposit Ticket Weight" v="$5,000 Mean" />
            </>
          )}

          {isCampaign && activeTab === "revenue_yield" && (
            <>
              <KV k="Net Campaign Yield Commission" v={data.revenue} />
              <KV k="Yield Allocations per Signup Node" v="$59.30" />
              <KV k="Yield Allocations per Active Influx" v="$100.24" />
            </>
          )}

          {isCampaign && activeTab === "roi_calculators" && (
            <>
              <KV k="Total Campaign Budget Spend" v="$2,140 Allocation" />
              <KV k="Net Yield Performance Return" v={data.revenue} />
              <KV k="Calculated Matrix ROI" v={data.roi} />
              <KV k="CPA Level Target Balance Costs" v="$15.07 Average" />
            </>
          )}

          {activeTab === "timeline_logs" && (
            <ol className="space-y-3 text-sm pt-2">
              <li className="border-l-2 border-indigo-950 pl-3">
                <div className="text-[10px] text-gray-400 font-mono font-medium">
                  Just Now · Marketing Infrastructure
                </div>
                <div className="text-xs text-gray-800">
                  Operational asset tracking allocation parameters adjusted.
                </div>
              </li>
              <li className="border-l-2 border-gray-300 pl-3">
                <div className="text-[10px] text-gray-400 font-mono font-medium">
                  72 Hrs Ago · Automation Suite
                </div>
                <div className="text-xs text-gray-600">
                  Telemetry tracking array validated online.
                </div>
              </li>
            </ol>
          )}
        </div>

        {/* Drawer Foot Sticky Control Bar */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 flex justify-end gap-2">
          <Btn
            variant="ghost"
            onClick={() => notify("Targeted metrics sheet compiled as secure PDF.")}
          >
            Export Subset Ledger
          </Btn>
          <Btn onClick={onClose}>Dismiss Panel</Btn>
        </div>
      </div>
    </div>
  );
}
