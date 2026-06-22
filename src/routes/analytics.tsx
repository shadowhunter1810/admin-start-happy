import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "IB Analytics · Atlas CRM" },
      { name: "description", content: "Partner business intelligence — growth, acquisition, revenue, trading, retention, geography, campaigns." },
    ],
  }),
  component: () => (
    <ClientShell>
      <AnalyticsPage />
    </ClientShell>
  ),
});

const SECTIONS = [
  { k: "summary", label: "Summary" },
  { k: "growth", label: "Growth" },
  { k: "acquisition", label: "Client Acquisition" },
  { k: "revenue", label: "Revenue" },
  { k: "trading", label: "Trading" },
  { k: "deposits", label: "Deposits" },
  { k: "retention", label: "Retention" },
  { k: "geo", label: "Geographic" },
  { k: "campaigns", label: "Campaigns" },
  { k: "funnel", label: "Conversion Funnel" },
  { k: "cohort", label: "Cohort" },
  { k: "forecast", label: "Forecasting" },
  { k: "benchmark", label: "Benchmark" },
  { k: "timeline", label: "Timeline" },
  { k: "notes", label: "Notes" },
  { k: "actions", label: "Admin Actions" },
  { k: "audit", label: "Audit Trail" },
] as const;
type SK = typeof SECTIONS[number]["k"];

type Tone = "gray"|"green"|"amber"|"red"|"blue"|"violet";
const toneMap: Record<Tone,string> = {
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
};
const Pill = ({ tone="gray", children }: { tone?: Tone; children: React.ReactNode }) => (
  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${toneMap[tone]}`}>{children}</span>
);
const Card = ({ children, className="" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
);
const Section = ({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <Card className="p-6">
    <div className="mb-4 flex items-start justify-between gap-3">
      <div><h2 className="text-lg font-semibold text-gray-900">{title}</h2>{subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}</div>
      {action}
    </div>
    {children}
  </Card>
);
const KV = ({ k, v }: { k: string; v: React.ReactNode }) => (
  <div className="flex justify-between gap-3 border-b border-gray-100 py-2 text-sm last:border-0"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-900 text-right">{v}</span></div>
);
const Btn = ({ children, onClick, variant="default" }: { children: React.ReactNode; onClick?: ()=>void; variant?: "default"|"ghost"|"danger" }) => {
  const cls = variant === "ghost" ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" : variant === "danger" ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-gray-900 text-white hover:bg-gray-800";
  return <button onClick={onClick} className={`rounded-md px-3 py-1.5 text-xs font-medium ${cls}`}>{children}</button>;
};
const Th = ({ children }: { children: React.ReactNode }) => <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">{children}</th>;
const Td = ({ children, className="" }: { children: React.ReactNode; className?: string }) => <td className={`px-3 py-2 text-sm text-gray-800 ${className}`}>{children}</td>;

const KPIS = [
  { l: "Total Clients", v: "1,248", s: "↑12% this month", tone: "blue" as Tone },
  { l: "Active Clients", v: "842", s: "67.5% active rate", tone: "green" as Tone },
  { l: "Revenue Generated", v: "$48,320", s: "↑8.4% vs last month", tone: "violet" as Tone },
  { l: "Trading Volume", v: "12,450 lots", s: "Avg 14.8 lots/client", tone: "blue" as Tone },
  { l: "Total Deposits", v: "$2.1M", s: "↑5.2% vs last month", tone: "green" as Tone },
  { l: "Conversion Rate", v: "34.2%", s: "Lead → active trader", tone: "blue" as Tone },
  { l: "Retention Rate", v: "71.4%", s: "↓3.1% needs attention", tone: "amber" as Tone },
  { l: "Growth Rate", v: "+12.3%", s: "Month over month", tone: "green" as Tone },
];

const GROWTH_KPIS = [
  { l: "New Clients (MTD)", v: "138", s: "↑22 vs last month" },
  { l: "Monthly Growth", v: "12.3%", s: "Above target" },
  { l: "Referral Growth", v: "84", s: "↑18 new referrals" },
  { l: "Revenue Growth", v: "8.4%", s: "↑ $3,740 increase" },
];

const GROWTH_TREND = [
  { m: "Nov", v: 78 }, { m: "Dec", v: 92 }, { m: "Jan", v: 104 }, { m: "Feb", v: 98 },
  { m: "Mar", v: 116 }, { m: "Apr", v: 124 }, { m: "May", v: 116 }, { m: "Jun", v: 138 },
];
const REV_DEP = [
  { m: "Nov", r: 28, d: 1.4 }, { m: "Dec", r: 31, d: 1.6 }, { m: "Jan", r: 35, d: 1.7 },
  { m: "Feb", r: 38, d: 1.8 }, { m: "Mar", r: 41, d: 1.9 }, { m: "Apr", r: 44, d: 2.0 },
  { m: "May", r: 44.6, d: 2.0 }, { m: "Jun", r: 48.3, d: 2.1 },
];

const ACQUISITION = [
  { m: "Registrations", t: "412", l: "380", c: "↑8.4%", target: "400", s: "On track" },
  { m: "KYC Approved", t: "298", l: "271", c: "↑9.9%", target: "300", s: "Near target" },
  { m: "First Deposits", t: "189", l: "201", c: "↓6.0%", target: "210", s: "Below target" },
  { m: "Active Traders", t: "842", l: "861", c: "↓2.2%", target: "900", s: "Below target" },
  { m: "VIP Clients", t: "4", l: "3", c: "↑1 new", target: "5", s: "Near target" },
];

const REV_KPIS = [
  { l: "Total Revenue", v: "$48,320", s: "↑8.4% MoM" },
  { l: "Monthly Revenue", v: "$48,320", s: "June 2026" },
  { l: "Revenue Per Client", v: "$38.72", s: "↑$2.10" },
  { l: "Revenue Per Lot", v: "$3.88", s: "12,450 lots" },
];
const REV_SOURCES = [
  { l: "Spread Commission", v: "$28,400", pct: 58.8 },
  { l: "Lot-based Commission", v: "$14,200", pct: 29.4 },
  { l: "Swap / Overnight", v: "$5,720", pct: 11.8 },
];
const TOP_CLIENTS = [
  { client: "Ahmed Al-Rashidi", acc: "MT5-00421", revenue: "$4,820", lots: 1240, perLot: "$3.89", type: "VIP" },
  { client: "Priya Sharma", acc: "MT5-00389", revenue: "$3,120", lots: 804, perLot: "$3.88", type: "Standard" },
  { client: "Mohammed Hassan", acc: "MT5-00512", revenue: "$2,890", lots: 744, perLot: "$3.88", type: "Standard" },
  { client: "Sara Al-Zaabi", acc: "MT5-00298", revenue: "$2,450", lots: 630, perLot: "$3.89", type: "VIP" },
  { client: "James O'Brien", acc: "MT5-00471", revenue: "$1,980", lots: 510, perLot: "$3.88", type: "Standard" },
];
const REV_TREND = [
  { m: "Jan", v: 38000 }, { m: "Feb", v: 41000 }, { m: "Mar", v: 42500 },
  { m: "Apr", v: 44600 }, { m: "May", v: 44600 }, { m: "Jun", v: 48320 },
];

const TRADING_KPIS = [
  { l: "Total Lots", v: "12,450" }, { l: "Avg Volume/Client", v: "14.8 lots" },
  { l: "Active Traders", v: "842" }, { l: "Copy Traders", v: "112" }, { l: "Profitable Traders", v: "421" },
];
const INSTRUMENTS = [
  { i: "XAUUSD", lots: 4200 }, { i: "EURUSD", lots: 3100 }, { i: "GBPUSD", lots: 1800 },
  { i: "US30", lots: 1500 }, { i: "NAS100", lots: 1100 }, { i: "CRUDE", lots: 750 },
];

const DEPOSIT_KPIS = [
  { l: "Total Deposits", v: "$2.1M" }, { l: "Average Deposit", v: "$1,684" },
  { l: "Deposit Growth", v: "+5.2%" }, { l: "First Deposit Rate", v: "44.8%" },
];

const RETENTION = [
  { m: "Jan", r: 71.4, c: 28.6 }, { m: "Feb", r: 71.4, c: 28.6 }, { m: "Mar", r: 71.4, c: 28.6 },
  { m: "Apr", r: 71.4, c: 28.6 }, { m: "May", r: 71.4, c: 28.6 }, { m: "Jun", r: 71.4, c: 28.6 },
];

const GEO = [
  { country: "🇦🇪 UAE", clients: 412, deposits: "$820K", revenue: "$18,400" },
  { country: "🇮🇳 India", clients: 348, deposits: "$540K", revenue: "$12,200" },
  { country: "🇸🇦 Saudi Arabia", clients: 210, deposits: "$390K", revenue: "$8,900" },
  { country: "🇬🇧 UK", clients: 142, deposits: "$210K", revenue: "$5,400" },
  { country: "🇲🇾 Malaysia", clients: 86, deposits: "$95K", revenue: "$2,200" },
  { country: "Others", clients: 50, deposits: "$45K", revenue: "$1,220" },
];

const CAMPAIGNS = [
  { id: "CAMP-UAE-Summer", name: "UAE Summer Push", clicks: 4820, regs: 142, deposits: "$420K", revenue: "$8,420", roi: "312%", status: "Active" },
  { id: "CAMP-Gold-Trading", name: "Gold Trading 2026", clicks: 3240, regs: 98, deposits: "$280K", revenue: "$6,100", roi: "245%", status: "Active" },
  { id: "CAMP-VIP-Deposit", name: "VIP Deposit Bonus", clicks: 1820, regs: 44, deposits: "$180K", revenue: "$3,800", roi: "180%", status: "Active" },
];

const FUNNEL = [
  { stage: "Lead", v: 2400 },
  { stage: "Registered", v: 1920 },
  { stage: "KYC Approved", v: 1248 },
  { stage: "Deposited", v: 912 },
  { stage: "Trading Active", v: 842 },
  { stage: "VIP", v: 4 },
];

const COHORT = [
  { c: "Jan 2026", size: 412, m1: "82%", m2: "71%", m3: "65%", m4: "59%", m5: "54%", m6: "51%" },
  { c: "Feb 2026", size: 388, m1: "84%", m2: "73%", m3: "67%", m4: "61%", m5: "56%", m6: "—" },
  { c: "Mar 2026", size: 401, m1: "85%", m2: "74%", m3: "68%", m4: "62%", m5: "—", m6: "—" },
  { c: "Apr 2026", size: 372, m1: "86%", m2: "75%", m3: "69%", m4: "—", m5: "—", m6: "—" },
  { c: "May 2026", size: 380, m1: "87%", m2: "76%", m3: "—", m4: "—", m5: "—", m6: "—" },
];

const FORECAST = [
  { m: "Jul 2026", v: 52400 }, { m: "Aug 2026", v: 55800 }, { m: "Sep 2026", v: 58200 },
];

const BENCHMARK = [
  { m: "Revenue/Client", you: "$38.72", avg: "$28.40", top10: "$52.10", tier: "$36.20" },
  { m: "Retention Rate", you: "71.4%", avg: "64.2%", top10: "82.1%", tier: "70.8%" },
  { m: "Conversion Rate", you: "34.2%", avg: "29.8%", top10: "41.5%", tier: "33.6%" },
  { m: "Growth Rate", you: "12.3%", avg: "7.4%", top10: "18.2%", tier: "11.1%" },
];

const TIMELINE = [
  { d: "Apr 28, 2026", t: "VIP client #4 activated", by: "Ahmed Al-Rashidi" },
  { d: "Apr 20, 2026", t: "UAE summer campaign launched", by: "Marketing team" },
  { d: "Apr 01, 2026", t: "Revenue milestone: $40K/month", by: "Finance" },
  { d: "Mar 18, 2026", t: "Retention warning flagged", by: "IB Manager: Priya Nair" },
  { d: "Feb 08, 2026", t: "1,000th client registered", by: "Milestone" },
];

const NOTES = [
  { txt: "Strong UAE growth — recommended for tier upgrade.", by: "IB Manager", d: "10 May 2026" },
  { txt: "VIP acquisition campaign successful — extending budget.", by: "Marketing", d: "01 May 2026" },
  { txt: "Declining retention rate — review onboarding flow.", by: "Analyst", d: "18 Apr 2026" },
];

const AUDIT = [
  { a: "Target Updated", by: "IB Manager", e: "MTD revenue 50K", ts: "10 May 11:00" },
  { a: "Report Exported", by: "Analyst", e: "Revenue analysis", ts: "08 May 14:32" },
  { a: "Campaign Created", by: "Marketing", e: "UAE Summer Push", ts: "20 Apr 09:15" },
];

function AnalyticsPage() {
  const [tab, setTab] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<any>(null);
  const notify = (m: string) => toast.success(m);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">IB Analytics</div>
              <h1 className="mt-1 text-2xl font-semibold">Arjun Raghunathan <span className="text-gray-400">· IB-00412</span></h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="green">Active IB</Pill><Pill tone="violet">Gold Tier</Pill>
                <Pill tone="blue">3 Active Campaigns</Pill><Pill tone="amber">SLA Breached</Pill>
                <Pill tone="violet">VIP Clients: 4</Pill><Pill tone="red">Finance Escalation</Pill>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => notify("Report exported")}>Export</Btn>
              <Btn onClick={() => notify("Target set")}>Set Target</Btn>
              <Btn onClick={() => notify("Campaign created")}>Create Campaign</Btn>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl overflow-x-auto px-6">
          <div className="flex gap-1">
            {SECTIONS.map(s => (
              <button key={s.k} onClick={() => setTab(s.k)} className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition ${tab===s.k?"border-gray-900 font-semibold text-gray-900":"border-transparent text-gray-500 hover:text-gray-800"}`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        {tab==="summary" && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {KPIS.map(k => <Card key={k.l} className="p-4"><div className="text-xs text-gray-500">{k.l}</div><div className="mt-1 text-2xl font-semibold">{k.v}</div><div className="mt-1 text-xs text-gray-500">{k.s}</div></Card>)}
          </div>
        )}

        {tab==="growth" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {GROWTH_KPIS.map(k => <Card key={k.l} className="p-4"><div className="text-xs text-gray-500">{k.l}</div><div className="mt-1 text-2xl font-semibold">{k.v}</div><div className="mt-1 text-xs text-emerald-600">{k.s}</div></Card>)}
          </div>
          <Section title="Monthly Client Growth" subtitle="Last 8 months">
            <div className="flex h-48 items-end gap-2">{GROWTH_TREND.map(p => (
              <div key={p.m} className="flex flex-1 flex-col items-center gap-1">
                <div className="w-full rounded-t bg-gray-900" style={{height: `${p.v/1.5}%`}} />
                <div className="text-xs text-gray-500">{p.m}</div><div className="text-xs font-semibold">{p.v}</div>
              </div>))}</div>
          </Section>
          <Section title="Revenue vs Deposit Trend" subtitle="Last 8 months">
            <div className="flex h-48 items-end gap-3">{REV_DEP.map(p => (
              <div key={p.m} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex w-full items-end gap-0.5">
                  <div className="flex-1 rounded-t bg-gray-900" style={{height: `${p.r*3}px`}} title={`Revenue $${p.r}K`} />
                  <div className="flex-1 rounded-t bg-sky-400" style={{height: `${p.d*60}px`}} title={`Deposits $${p.d}M`} />
                </div>
                <div className="text-xs text-gray-500">{p.m}</div>
              </div>))}</div>
            <div className="mt-3 flex gap-4 text-xs"><span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-gray-900"/>Revenue (K)</span><span className="flex items-center gap-1"><span className="h-2 w-2 rounded bg-sky-400"/>Deposits (M)</span></div>
          </Section>
        </>)}

        {tab==="acquisition" && (
          <Section title="Client Acquisition Analytics" subtitle="This month vs last month vs target">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Metric","This Month","Last Month","Change","Target","Status"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{ACQUISITION.map(r => (
                <tr key={r.m} className="hover:bg-gray-50"><Td className="font-medium">{r.m}</Td><Td className="font-semibold">{r.t}</Td><Td>{r.l}</Td><Td className={r.c.includes("↑")?"text-emerald-600":"text-rose-600"}>{r.c}</Td><Td>{r.target}</Td><Td><Pill tone={r.s==="On track"?"green":r.s==="Near target"?"amber":"red"}>{r.s}</Pill></Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="revenue" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {REV_KPIS.map(k => <Card key={k.l} className="p-4"><div className="text-xs text-gray-500">{k.l}</div><div className="mt-1 text-2xl font-semibold">{k.v}</div><div className="mt-1 text-xs text-gray-500">{k.s}</div></Card>)}
          </div>
          <Section title="Revenue Breakdown by Source">
            {REV_SOURCES.map(r => (
              <div key={r.l} className="mb-3">
                <div className="flex justify-between text-sm"><span>{r.l}</span><span className="font-semibold">{r.v} <span className="text-gray-500">({r.pct}%)</span></span></div>
                <div className="mt-1 h-2 rounded bg-gray-100"><div className="h-2 rounded bg-gray-900" style={{width: `${r.pct}%`}} /></div>
              </div>
            ))}
          </Section>
          <Section title="Top Revenue Clients" subtitle="Click row to open full revenue drawer">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Client","Account","Revenue","Lots","Rev/Lot","Type"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{TOP_CLIENTS.map(r => (
                <tr key={r.acc} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer(r)}>
                  <Td className="font-medium">{r.client}</Td><Td>{r.acc}</Td><Td className="font-semibold">{r.revenue}</Td><Td>{r.lots}</Td><Td>{r.perLot}</Td><Td><Pill tone={r.type==="VIP"?"violet":"gray"}>{r.type}</Pill></Td>
                </tr>))}</tbody>
            </table></div>
          </Section>
          <Section title="Monthly Revenue — Last 6 Months">
            <div className="flex h-40 items-end gap-3">{REV_TREND.map(p => (
              <div key={p.m} className="flex flex-1 flex-col items-center gap-1">
                <div className="text-xs font-semibold">${(p.v/1000).toFixed(1)}K</div>
                <div className="w-full rounded-t bg-emerald-500" style={{height: `${p.v/600}px`}} />
                <div className="text-xs text-gray-500">{p.m}</div>
              </div>))}</div>
          </Section>
        </>)}

        {tab==="trading" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {TRADING_KPIS.map(k => <Card key={k.l} className="p-4"><div className="text-xs text-gray-500">{k.l}</div><div className="mt-1 text-xl font-semibold">{k.v}</div></Card>)}
          </div>
          <Section title="Trading Volume by Instrument">
            <div className="flex h-48 items-end gap-3">{INSTRUMENTS.map(i => (
              <div key={i.i} className="flex flex-1 flex-col items-center gap-1">
                <div className="text-xs font-semibold">{i.lots}</div>
                <div className="w-full rounded-t bg-violet-500" style={{height: `${i.lots/22}px`}} />
                <div className="text-xs text-gray-500">{i.i}</div>
              </div>))}</div>
          </Section>
        </>)}

        {tab==="deposits" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {DEPOSIT_KPIS.map(k => <Card key={k.l} className="p-4"><div className="text-xs text-gray-500">{k.l}</div><div className="mt-1 text-2xl font-semibold">{k.v}</div></Card>)}
          </div>
          <Section title="Deposit Trend" subtitle="Last 8 months">
            <div className="flex h-40 items-end gap-3">{REV_DEP.map(p => (
              <div key={p.m} className="flex flex-1 flex-col items-center gap-1">
                <div className="text-xs font-semibold">${p.d}M</div>
                <div className="w-full rounded-t bg-sky-500" style={{height: `${p.d*60}px`}} />
                <div className="text-xs text-gray-500">{p.m}</div>
              </div>))}</div>
          </Section>
        </>)}

        {tab==="retention" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card className="p-4"><div className="text-xs text-gray-500">Active Rate</div><div className="mt-1 text-2xl font-semibold">67.5%</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Churn Rate</div><div className="mt-1 text-2xl font-semibold text-rose-600">28.6%</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Retention Rate</div><div className="mt-1 text-2xl font-semibold text-emerald-600">71.4%</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Dormant Clients</div><div className="mt-1 text-2xl font-semibold">358</div></Card>
          </div>
          <Section title="Retention vs Churn" subtitle="Monthly trend">
            <div className="space-y-2">{RETENTION.map(r => (
              <div key={r.m}>
                <div className="flex justify-between text-xs text-gray-500"><span>{r.m}</span><span>Retention {r.r}% · Churn {r.c}%</span></div>
                <div className="flex h-4 overflow-hidden rounded bg-gray-100">
                  <div className="bg-emerald-500" style={{width: `${r.r}%`}} /><div className="bg-rose-400" style={{width: `${r.c}%`}} />
                </div>
              </div>))}</div>
          </Section>
        </>)}

        {tab==="geo" && (
          <Section title="Geographic Analytics" subtitle="Clients, deposits & revenue by country">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Country","Clients","Deposits","Revenue"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{GEO.map(r => (
                <tr key={r.country} className="hover:bg-gray-50"><Td className="font-medium">{r.country}</Td><Td>{r.clients}</Td><Td className="font-semibold">{r.deposits}</Td><Td className="font-semibold text-emerald-700">{r.revenue}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="campaigns" && (<>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card className="p-4"><div className="text-xs text-gray-500">Campaign Registrations</div><div className="mt-1 text-2xl font-semibold">284</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Campaign Deposits</div><div className="mt-1 text-2xl font-semibold">$880K</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Campaign Revenue</div><div className="mt-1 text-2xl font-semibold">$18,320</div></Card>
            <Card className="p-4"><div className="text-xs text-gray-500">Campaign ROI</div><div className="mt-1 text-2xl font-semibold text-emerald-600">312%</div></Card>
          </div>
          <Section title="Active Campaigns" subtitle="Click for full campaign drawer">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Campaign ID","Name","Clicks","Registrations","Deposits","Revenue","ROI","Status"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{CAMPAIGNS.map(r => (
                <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({...r, isCampaign:true})}>
                  <Td className="font-medium">{r.id}</Td><Td>{r.name}</Td><Td>{r.clicks}</Td><Td>{r.regs}</Td><Td>{r.deposits}</Td><Td className="font-semibold">{r.revenue}</Td><Td className="font-semibold text-emerald-600">{r.roi}</Td><Td><Pill tone="green">{r.status}</Pill></Td>
                </tr>))}</tbody>
            </table></div>
          </Section>
        </>)}

        {tab==="funnel" && (
          <Section title="Conversion Funnel" subtitle="Lead → VIP journey">
            <div className="space-y-2">{FUNNEL.map((f,i) => {
              const max = FUNNEL[0].v;
              const w = (f.v / max) * 100;
              return (
                <div key={f.stage} className="flex items-center gap-3">
                  <div className="w-32 text-sm text-gray-700">{f.stage}</div>
                  <div className="flex-1 rounded bg-gray-100"><div className="rounded bg-gradient-to-r from-violet-500 to-sky-500 py-2 pl-3 text-xs font-semibold text-white" style={{width: `${w}%`}}>{f.v.toLocaleString()}</div></div>
                  {i>0 && <div className="w-16 text-right text-xs text-gray-500">{((f.v/FUNNEL[i-1].v)*100).toFixed(1)}%</div>}
                </div>
              );
            })}</div>
          </Section>
        )}

        {tab==="cohort" && (
          <Section title="Cohort Analysis" subtitle="Retention by registration month">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Cohort","Size","M1","M2","M3","M4","M5","M6"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{COHORT.map(r => (
                <tr key={r.c}><Td className="font-medium">{r.c}</Td><Td>{r.size}</Td><Td>{r.m1}</Td><Td>{r.m2}</Td><Td>{r.m3}</Td><Td>{r.m4}</Td><Td>{r.m5}</Td><Td>{r.m6}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="forecast" && (<>
          <Section title="Revenue Forecast" subtitle="Next 3 months projection">
            <div className="grid grid-cols-3 gap-3">{FORECAST.map(f => (
              <Card key={f.m} className="p-4"><div className="text-xs text-gray-500">{f.m}</div><div className="mt-1 text-2xl font-semibold">${f.v.toLocaleString()}</div></Card>))}</div>
            <div className="mt-4 flex justify-between border-t pt-3"><span className="text-sm text-gray-500">Q3 Total</span><span className="font-semibold">$166,400</span></div>
          </Section>
        </>)}

        {tab==="benchmark" && (
          <Section title="Benchmark Comparison" subtitle="vs Average IB, Top 10, Same Tier">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Metric","You","Avg IB","Top 10","Same Tier"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{BENCHMARK.map(r => (
                <tr key={r.m}><Td className="font-medium">{r.m}</Td><Td className="font-semibold text-gray-900">{r.you}</Td><Td>{r.avg}</Td><Td className="text-emerald-700">{r.top10}</Td><Td>{r.tier}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="timeline" && (
          <Section title="Timeline">
            <ol className="relative ml-3 border-l border-gray-200">{TIMELINE.map((t,i) => (
              <li key={i} className="mb-4 ml-4">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-900" />
                <div className="text-xs text-gray-500">{t.d} · {t.by}</div>
                <div className="text-sm">{t.t}</div>
              </li>))}</ol>
          </Section>
        )}

        {tab==="notes" && (
          <Section title="Notes" action={<Btn onClick={() => notify("Note added")}>+ Add</Btn>}>
            <div className="space-y-3">{NOTES.map((n,i) => (
              <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="text-sm">{n.txt}</div><div className="mt-1 text-xs text-gray-500">{n.by} · {n.d}</div>
              </div>))}</div>
          </Section>
        )}

        {tab==="actions" && (
          <div className="grid gap-6 md:grid-cols-3">
            <Section title="Safe Actions"><div className="space-y-2">{["View Analytics","Export Report","Add Note"].map(a => <Btn key={a} variant="ghost" onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
            <Section title="Moderate Actions"><div className="space-y-2">{["Create Campaign","Assign Manager","Set Target"].map(a => <Btn key={a} onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
            <Section title="Dangerous Actions" subtitle="Permission + reason + audit log required"><div className="space-y-2">{["Suspend Partner Program","Remove Analytics Access","Freeze Tracking"].map(a => <Btn key={a} variant="danger" onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
          </div>
        )}

        {tab==="audit" && (
          <Section title="Audit Trail">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Action","By","Entity","Timestamp"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{AUDIT.map((r,i) => (<tr key={i}><Td className="font-medium">{r.a}</Td><Td>{r.by}</Td><Td>{r.e}</Td><Td>{r.ts}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}
      </div>

      <AnalyticsDrawer open={!!drawer} data={drawer} onClose={() => setDrawer(null)} notify={notify} />
    </div>
  );
}

function AnalyticsDrawer({ open, data, onClose, notify }: { open: boolean; data: any; onClose: ()=>void; notify: (m:string)=>void }) {
  const [t, setT] = useState("overview");
  if (!open) return null;
  const isCampaign = data?.isCampaign;
  const tabs = isCampaign
    ? ["overview","clicks","registrations","deposits","revenue","roi","timeline","audit"]
    : ["overview","sources","top","trends","forecast","audit"];
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40" onClick={onClose}>
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white" onClick={e=>e.stopPropagation()}>
        <div className="border-b p-5">
          <div className="flex items-start justify-between">
            <div>
              {isCampaign ? <>
                <Pill tone="green">Active</Pill>
                <h3 className="mt-2 text-lg font-semibold">{data.name}</h3>
                <div className="text-sm text-gray-500">ROI: {data.roi}</div>
              </> : <>
                <Pill tone={data.type==="VIP"?"violet":"gray"}>{data.type}</Pill>
                <h3 className="mt-2 text-lg font-semibold">Revenue Analysis — {data.client}</h3>
                <div className="text-sm text-gray-500">{data.acc}</div>
              </>}
            </div>
            <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1 -mb-5 border-b">
            {tabs.map(x => <button key={x} onClick={()=>setT(x)} className={`border-b-2 px-3 py-2 text-xs capitalize ${t===x?"border-gray-900 font-semibold":"border-transparent text-gray-500"}`}>{x}</button>)}
          </div>
        </div>
        <div className="space-y-2 p-5">
          {!isCampaign && t==="overview" && (<>
            <KV k="Total Revenue" v="$48,320" /><KV k="Monthly Revenue" v="$48,320" /><KV k="Revenue / Client" v="$38.72" /><KV k="Revenue / Lot" v="$3.88" /><KV k="Top Source" v="Spread Commission" /><KV k="Growth vs Last Month" v={<span className="text-emerald-600">+8.4%</span>} /><KV k="Forecast (next month)" v="$52,400" />
          </>)}
          {!isCampaign && t==="sources" && REV_SOURCES.map(r => <KV key={r.l} k={r.l} v={`${r.v} (${r.pct}%)`} />)}
          {!isCampaign && t==="top" && TOP_CLIENTS.map(c => <KV key={c.acc} k={c.client} v={c.revenue} />)}
          {!isCampaign && t==="trends" && REV_TREND.map(p => <KV key={p.m} k={p.m} v={`$${p.v.toLocaleString()}`} />)}
          {!isCampaign && t==="forecast" && (<>{FORECAST.map(f => <KV key={f.m} k={f.m} v={`$${f.v.toLocaleString()}`} />)}<KV k="Q3 Total" v="$166,400" /></>)}

          {isCampaign && t==="overview" && (<><KV k="Campaign ID" v={data.id} /><KV k="Status" v="Active" /><KV k="Clicks" v={data.clicks} /><KV k="Registrations" v={data.regs} /><KV k="Deposits" v={data.deposits} /><KV k="Revenue" v={data.revenue} /><KV k="ROI" v={data.roi} /></>)}
          {isCampaign && t==="clicks" && (<><KV k="Total Clicks" v="4,820" /><KV k="Unique Visitors" v="3,940" /><KV k="Click-Through Rate" v="4.2%" /><KV k="Top Source" v="WhatsApp link" /><KV k="Mobile Clicks" v="78%" /></>)}
          {isCampaign && t==="registrations" && (<><KV k="Total Registrations" v="142" /><KV k="KYC Approved" v="108" /><KV k="KYC Pending" v="24" /><KV k="KYC Rejected" v="10" /><KV k="Reg → KYC Rate" v="76.1%" /></>)}
          {isCampaign && t==="deposits" && (<><KV k="Total Depositors" v="84" /><KV k="Total Deposits" v={data.deposits} /><KV k="Avg Deposit" v="$5,000" /><KV k="First Deposit Rate" v="77.8%" /></>)}
          {isCampaign && t==="revenue" && (<><KV k="Campaign Revenue" v={data.revenue} /><KV k="Revenue/Registration" v="$59.30" /><KV k="Revenue/Depositor" v="$100.24" /></>)}
          {isCampaign && t==="roi" && (<><KV k="Total Spend" v="$2,140" /><KV k="Revenue Generated" v={data.revenue} /><KV k="ROI" v={data.roi} /><KV k="Cost per Registration" v="$15.07" /><KV k="Cost per Deposit" v="$25.48" /></>)}

          {t==="timeline" && (<ol className="space-y-2 text-sm">
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">Today · Marketing</div><div>Spend updated</div></li>
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">3d ago · System</div><div>Campaign launched</div></li>
          </ol>)}
          {t==="audit" && (<ol className="space-y-1 text-xs text-gray-600"><li>Created · System · 20 Apr</li><li>Updated · Marketing · Today</li></ol>)}
        </div>
        <div className="sticky bottom-0 flex justify-end gap-2 border-t bg-white p-4">
          <Btn variant="ghost" onClick={() => notify("Exported")}>Export</Btn><Btn onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}
