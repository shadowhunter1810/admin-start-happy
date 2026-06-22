import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions & Rebates · Atlas CRM" },
      { name: "description", content: "IB commission, rebate, CPA, revenue share earnings, payouts, adjustments and disputes." },
    ],
  }),
  component: () => (
    <ClientShell>
      <CommissionsPage />
    </ClientShell>
  ),
});

/* ---------------- data ---------------- */
const PARTNER = {
  id: "IB-00412", name: "Arjun Raghunathan", tier: "Gold IB",
  status: "Active", model: "Hybrid (Rev Share + CPA)",
};

const SECTIONS = [
  { k: "summary", label: "Summary" },
  { k: "accounts", label: "Commission Accounts" },
  { k: "rebateAcc", label: "Rebate Accounts" },
  { k: "txn", label: "Commission Txns" },
  { k: "rebateTxn", label: "Rebate Txns" },
  { k: "revshare", label: "Revenue Share" },
  { k: "cpa", label: "CPA Earnings" },
  { k: "hybrid", label: "Hybrid Earnings" },
  { k: "adjust", label: "Adjustments" },
  { k: "pending", label: "Pending Payments" },
  { k: "history", label: "Payment History" },
  { k: "contrib", label: "Client Contribution" },
  { k: "disputes", label: "Disputes" },
  { k: "rules", label: "Commission Rules" },
  { k: "timeline", label: "Timeline" },
  { k: "notes", label: "Notes" },
  { k: "actions", label: "Admin Actions" },
  { k: "audit", label: "Audit Trail" },
] as const;
type SK = typeof SECTIONS[number]["k"];

const KPIS = [
  { label: "Total Commission Earned", value: "$82,500", sub: "All time", tone: "blue" },
  { label: "Pending Commission", value: "$12,200", sub: "Awaiting payment", tone: "amber" },
  { label: "Paid Commission", value: "$70,300", sub: "Completed payouts", tone: "green" },
  { label: "Total Rebates", value: "$18,450", sub: "All accounts", tone: "blue" },
  { label: "Revenue Share Earnings", value: "$31,200", sub: "30% rev share", tone: "violet" },
  { label: "CPA Earnings", value: "$22,500", sub: "45 qualified clients", tone: "violet" },
  { label: "Active Revenue Clients", value: "38", sub: "Generating commissions", tone: "gray" },
  { label: "Commission Holds", value: "1", sub: "Requires review", tone: "red" },
] as const;

const COMMISSION_ACCOUNTS = [
  { acc: "ACC-1021", client: "John Martinez", lots: 842, revenue: "$14,200", commission: "$4,260", platform: "MT5", status: "Active" },
  { acc: "ACC-1045", client: "Priya Nair", lots: 690, revenue: "$11,500", commission: "$3,450", platform: "MT5", status: "Active" },
  { acc: "ACC-1077", client: "David Chen", lots: 410, revenue: "$6,800", commission: "$2,040", platform: "MT4", status: "Hold" },
  { acc: "ACC-1103", client: "Sara Ali", lots: 115, revenue: "$1,900", commission: "$570", platform: "MT5", status: "Active" },
  { acc: "ACC-2011", client: "Michael Tan", lots: 260, revenue: "$3,460", commission: "$1,040", platform: "cTrader", status: "Active" },
];

const REBATE_ACCOUNTS = [
  { acc: "RAC-3301", client: "Michael Tan", lots: 520, rate: "$2/lot", rebate: "$1,040", status: "Active" },
  { acc: "RAC-3302", client: "Layla Hassan", lots: 280, rate: "$2.5/lot", rebate: "$700", status: "Active" },
  { acc: "RAC-3303", client: "Omar Faruk", lots: 140, rate: "$1.8/lot", rebate: "$252", status: "Active" },
];

const COMMISSION_TXNS = [
  { id: "TXN-8821", client: "John Martinez", acc: "ACC-1021", amount: "$4,260", status: "Paid", date: "30 May 2025", type: "Revenue Share", period: "May 2025", gross: "$14,200", net: "$12,040", rate: "35%", method: "Bank Wire", payId: "PAY-5501", due: "01 Jun 2025" },
  { id: "TXN-8799", client: "Priya Nair", acc: "ACC-1045", amount: "$3,450", status: "Pending", date: "28 May 2025", type: "Revenue Share", period: "May 2025", gross: "$11,500", net: "$9,860", rate: "35%", method: "Bank Wire", payId: "PAY-5498", due: "02 Jun 2025" },
  { id: "TXN-8777", client: "David Chen", acc: "ACC-1077", amount: "$2,040", status: "On Hold", date: "25 May 2025", type: "Hybrid", period: "May 2025", gross: "$6,800", net: "$5,820", rate: "30%", method: "Bank Wire", payId: "—", due: "Pending" },
  { id: "TXN-8744", client: "Sara Ali", acc: "ACC-1103", amount: "$570", status: "Paid", date: "20 May 2025", type: "CPA", period: "May 2025", gross: "$1,900", net: "$1,620", rate: "30%", method: "Bank Wire", payId: "PAY-5489", due: "22 May 2025" },
  { id: "TXN-8721", client: "Michael Tan", acc: "ACC-2011", amount: "$1,040", status: "Pending", date: "18 May 2025", type: "Rebate", period: "May 2025", gross: "$3,460", net: "$2,940", rate: "30%", method: "Bank Wire", payId: "PAY-5485", due: "01 Jun 2025" },
];

const REBATE_TXNS = [
  { id: "RBT-4401", client: "Michael Tan", lots: 520, amount: "$1,040", status: "Paid", date: "30 May 2025", instrument: "EURUSD, XAUUSD", formula: "$2/lot × 520 lots" },
  { id: "RBT-4388", client: "Layla Hassan", lots: 280, amount: "$700", status: "Pending", date: "27 May 2025", instrument: "XAUUSD", formula: "$2.5/lot × 280 lots" },
  { id: "RBT-4370", client: "Omar Faruk", lots: 140, amount: "$252", status: "Pending", date: "22 May 2025", instrument: "GBPUSD", formula: "$1.8/lot × 140 lots" },
];

const REVSHARE = [
  { partner: "John Martinez", pct: "35%", gross: "$14,200", net: "$12,040", earn: "$4,260", date: "01 Jun 2025" },
  { partner: "Priya Nair", pct: "35%", gross: "$11,500", net: "$9,860", earn: "$3,450", date: "02 Jun 2025" },
  { partner: "David Chen", pct: "30%", gross: "$6,800", net: "$5,820", earn: "$2,040", date: "Hold" },
];

const CPA = [
  { id: "CPA-Gold-May", client: "John Martinez", qualified: 14, perClient: "$500", earnings: "$7,000", status: "Active" },
  { id: "CPA-Silver-May", client: "Priya Nair", qualified: 9, perClient: "$350", earnings: "$3,150", status: "Active" },
  { id: "CPA-Bronze-Apr", client: "Sara Ali", qualified: 4, perClient: "$200", earnings: "$800", status: "Closed" },
];

const HYBRID = [
  { id: "HYB-001", client: "David Chen", cpa: "$500", rev: "$1,540", total: "$2,040", status: "Hold" },
  { id: "HYB-002", client: "Michael Tan", cpa: "$300", rev: "$740", total: "$1,040", status: "Pending" },
];

const ADJUSTMENTS = [
  { id: "ADJ-301", type: "Credit", amount: "+$320", reason: "Manual Correction", by: "Finance L2", date: "28 May 2025" },
  { id: "ADJ-295", type: "Debit", amount: "-$220", reason: "Bonus Adjustment", by: "Finance L1", date: "24 May 2025" },
  { id: "ADJ-289", type: "Debit", amount: "-$1,240", reason: "Duplicate Payment", by: "Finance L1", date: "20 May 2025" },
];

const PENDING = [
  { id: "PAY-5501", amount: "$4,260", due: "01 Jun 2025", method: "Bank Wire", status: "Approved" },
  { id: "PAY-5498", amount: "$3,450", due: "02 Jun 2025", method: "Bank Wire", status: "Processing" },
  { id: "PAY-5485", amount: "$1,040", due: "01 Jun 2025", method: "Crypto USDT", status: "Pending" },
];

const HISTORY = [
  { id: "PAY-5489", amount: "$570", method: "Bank Wire", date: "22 May 2025", status: "Paid" },
  { id: "PAY-5450", amount: "$8,200", method: "Bank Wire", date: "01 May 2025", status: "Paid" },
  { id: "PAY-5402", amount: "$7,400", method: "Crypto USDT", date: "01 Apr 2025", status: "Paid" },
  { id: "PAY-5355", amount: "$6,900", method: "Bank Wire", date: "01 Mar 2025", status: "Paid" },
];

const CONTRIB = [
  { client: "John Martinez", acc: "ACC-1021", lots: 842, revenue: "$14,200", commission: "$4,260" },
  { client: "Priya Nair", acc: "ACC-1045", lots: 690, revenue: "$11,500", commission: "$3,450" },
  { client: "David Chen", acc: "ACC-1077", lots: 410, revenue: "$6,800", commission: "$2,040" },
  { client: "Michael Tan", acc: "ACC-2011", lots: 260, revenue: "$3,460", commission: "$1,040" },
  { client: "Sara Ali", acc: "ACC-1103", lots: 115, revenue: "$1,900", commission: "$570" },
];

const DISPUTES = [
  { id: "DSP-221", amount: "$3,450", reason: "Payment SLA breach", status: "Investigating", team: "IB Team", date: "22 May 2025", notes: "TXN-8799 commission generated but PAY-5498 still processing beyond 5-day SLA." },
  { id: "DSP-208", amount: "$2,040", reason: "Hold not justified", status: "Resolved", team: "Compliance", date: "12 May 2025", notes: "Hold released after compliance review." },
];

const RULES = [
  { f: "Commission Model", v: "Hybrid (Rev Share + CPA)" },
  { f: "Revenue Share %", v: "35%" },
  { f: "Rebate Rate", v: "$2/lot (FX) · $1.5/lot (Indices)" },
  { f: "CPA Tier", v: "Gold — $500 per qualified client" },
  { f: "Hybrid Split", v: "70% Rev Share / 30% CPA" },
  { f: "Payout Frequency", v: "Monthly (1st of month)" },
  { f: "Minimum Payout", v: "$100" },
  { f: "Currency", v: "USD" },
  { f: "Hold Period", v: "5 business days" },
  { f: "Effective From", v: "01 Jan 2025" },
];

const TIMELINE = [
  { t: "30 May 2025 14:20", by: "System", e: "Commission TXN-8821 paid — $4,260" },
  { t: "28 May 2025 11:00", by: "Finance L2", e: "Adjustment ADJ-301 credit $320" },
  { t: "25 May 2025 09:15", by: "Compliance", e: "Commission TXN-8777 placed on hold" },
  { t: "22 May 2025 10:30", by: "IB Team", e: "Dispute DSP-221 raised — payment SLA breach" },
  { t: "20 May 2025 16:45", by: "Finance L1", e: "Adjustment ADJ-289 debit $1,240 — duplicate payment" },
  { t: "01 May 2025 09:00", by: "System", e: "Payment PAY-5450 paid — $8,200" },
];

const NOTES = [
  { txt: "VIP partner — confirmed rev share at 35% effective Q1 2025.", by: "Finance L2", date: "10 May 2025" },
  { txt: "Commission review pending — ACC-1077 David Chen commission on hold pending compliance review of trading activity.", by: "Compliance", date: "25 May 2025" },
  { txt: "Dispute DSP-221 — investigation owner is IB Team Lead.", by: "IB Team", date: "22 May 2025" },
];

const AUDIT = [
  { action: "Commission Paid", by: "Finance L2", entity: "TXN-8821", ts: "30 May 14:20", ip: "10.0.1.42" },
  { action: "Commission Adjusted", by: "Finance L2", entity: "ADJ-301", ts: "28 May 11:00", ip: "10.0.1.42" },
  { action: "Commission Held", by: "Compliance", entity: "TXN-8777", ts: "25 May 09:15", ip: "10.0.1.66" },
  { action: "Rebate Rate Changed", by: "Partner Manager", entity: "ACC-2011", ts: "15 May 11:00", ip: "10.0.1.88" },
  { action: "Dispute Raised", by: "IB Team", entity: "DSP-221", ts: "22 May 10:30", ip: "10.0.1.55" },
];

/* ---------------- atoms ---------------- */
type Tone = "gray"|"green"|"amber"|"red"|"blue"|"violet";
const toneMap: Record<Tone,string> = {
  gray: "bg-gray-100 text-gray-700 ring-gray-200",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  red: "bg-rose-50 text-rose-700 ring-rose-200",
  blue: "bg-sky-50 text-sky-700 ring-sky-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
};
const statusTone = (s: string): Tone => {
  const x = s.toLowerCase();
  if (/(paid|active|approved|resolved|clear|completed)/.test(x)) return "green";
  if (/(pending|processing|investigating|near)/.test(x)) return "amber";
  if (/(hold|reject|fail|breach|closed)/.test(x)) return "red";
  return "gray";
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
    <span className="text-gray-500">{k}</span><span className="font-medium text-gray-900 text-right">{v}</span>
  </div>
);
const Btn = ({ children, onClick, variant="default" }: { children: React.ReactNode; onClick?: ()=>void; variant?: "default"|"ghost"|"danger" }) => {
  const cls = variant === "ghost" ? "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
    : variant === "danger" ? "bg-rose-600 text-white hover:bg-rose-700"
    : "bg-gray-900 text-white hover:bg-gray-800";
  return <button onClick={onClick} className={`rounded-md px-3 py-1.5 text-xs font-medium ${cls}`}>{children}</button>;
};
const Th = ({ children }: { children: React.ReactNode }) => <th className="px-3 py-2 text-left text-[11px] font-semibold uppercase tracking-wide text-gray-500">{children}</th>;
const Td = ({ children, className="" }: { children: React.ReactNode; className?: string }) => <td className={`px-3 py-2 text-sm text-gray-800 ${className}`}>{children}</td>;

/* ---------------- page ---------------- */
function CommissionsPage() {
  const [tab, setTab] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<null | { kind: string; data: any }>(null);
  const notify = (m: string) => toast.success(m);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-gray-500">Commissions & Rebates</div>
              <h1 className="mt-1 text-2xl font-semibold">{PARTNER.name} <span className="text-gray-400">· {PARTNER.id}</span></h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="green">IB Partner Active</Pill>
                <Pill tone="violet">VIP Partner</Pill>
                <Pill tone="blue">Revenue Share Active</Pill>
                <Pill tone="amber">2 Pending Payments</Pill>
                <Pill tone="red">1 Commission Hold</Pill>
                <Pill tone="gray">{PARTNER.model}</Pill>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => notify("Report exported")}>Export</Btn>
              <Btn onClick={() => notify("Payment approved")}>Approve Payment</Btn>
              <Btn variant="danger" onClick={() => notify("Commission held")}>Hold Commission</Btn>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl overflow-x-auto px-6">
          <div className="flex gap-1">
            {SECTIONS.map(s => (
              <button key={s.k} onClick={() => setTab(s.k)}
                className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition ${tab===s.k?"border-gray-900 font-semibold text-gray-900":"border-transparent text-gray-500 hover:text-gray-800"}`}>{s.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        {tab==="summary" && <SummaryView />}
        {tab==="accounts" && <TableSection title="Commission Accounts" sub="Accounts generating commissions" cols={["Account","Client","Platform","Lots","Revenue","Commission","Status"]} rows={COMMISSION_ACCOUNTS} render={(r) => (
          <tr key={r.acc} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"account", data:r })}>
            <Td className="font-medium">{r.acc}</Td><Td>{r.client}</Td><Td>{r.platform}</Td><Td>{r.lots}</Td><Td>{r.revenue}</Td><Td className="font-semibold">{r.commission}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td>
          </tr>)} />}
        {tab==="rebateAcc" && <TableSection title="Rebate Accounts" sub="Accounts generating rebates" cols={["Account","Client","Lots","Rate","Rebate","Status"]} rows={REBATE_ACCOUNTS} render={(r) => (
          <tr key={r.acc} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"rebateAcc", data:r })}>
            <Td className="font-medium">{r.acc}</Td><Td>{r.client}</Td><Td>{r.lots}</Td><Td>{r.rate}</Td><Td className="font-semibold">{r.rebate}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td>
          </tr>)} />}
        {tab==="txn" && <TableSection title="Commission Transactions" sub="Every commission generated" cols={["Transaction ID","Client","Account","Amount","Status","Date"]} rows={COMMISSION_TXNS} render={(r) => (
          <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"txn", data:r })}>
            <Td className="font-medium">{r.id}</Td><Td>{r.client}</Td><Td>{r.acc}</Td><Td className="font-semibold">{r.amount}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td><Td>{r.date}</Td>
          </tr>)} />}
        {tab==="rebateTxn" && <TableSection title="Rebate Transactions" sub="Per-lot rebates earned" cols={["Rebate ID","Client","Lots","Rebate Amount","Status","Date"]} rows={REBATE_TXNS} render={(r) => (
          <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"rebateTxn", data:r })}>
            <Td className="font-medium">{r.id}</Td><Td>{r.client}</Td><Td>{r.lots}</Td><Td className="font-semibold">{r.amount}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td><Td>{r.date}</Td>
          </tr>)} />}
        {tab==="revshare" && <TableSection title="Revenue Share Earnings" sub="Rev-share commissions by partner client" cols={["Partner","Rev Share %","Gross Revenue","Net Revenue","Earnings","Settlement"]} rows={REVSHARE} render={(r,i) => (
          <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.partner}</Td><Td>{r.pct}</Td><Td>{r.gross}</Td><Td>{r.net}</Td><Td className="font-semibold">{r.earn}</Td><Td>{r.date}</Td></tr>)} />}
        {tab==="cpa" && <TableSection title="CPA Earnings" sub="Cost-per-acquisition deals" cols={["CPA ID","Client","Qualified","Per Client","Earnings","Status"]} rows={CPA} render={(r) => (
          <tr key={r.id} className="hover:bg-gray-50"><Td className="font-medium">{r.id}</Td><Td>{r.client}</Td><Td>{r.qualified}</Td><Td>{r.perClient}</Td><Td className="font-semibold">{r.earnings}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td></tr>)} />}
        {tab==="hybrid" && <TableSection title="Hybrid Earnings" sub="Combination of CPA + Revenue Share" cols={["ID","Client","CPA Portion","Rev Share Portion","Total","Status"]} rows={HYBRID} render={(r) => (
          <tr key={r.id} className="hover:bg-gray-50"><Td className="font-medium">{r.id}</Td><Td>{r.client}</Td><Td>{r.cpa}</Td><Td>{r.rev}</Td><Td className="font-semibold">{r.total}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td></tr>)} />}
        {tab==="adjust" && <TableSection title="Commission Adjustments" sub="Credits & debits to commission" cols={["Adjustment ID","Type","Amount","Reason","By","Date"]} rows={ADJUSTMENTS} render={(r) => (
          <tr key={r.id} className="hover:bg-gray-50"><Td className="font-medium">{r.id}</Td><Td>{r.type}</Td><Td className={r.amount.startsWith("-")?"text-rose-600 font-semibold":"text-emerald-600 font-semibold"}>{r.amount}</Td><Td>{r.reason}</Td><Td>{r.by}</Td><Td>{r.date}</Td></tr>)} />}
        {tab==="pending" && <TableSection title="Pending Payments" sub="Unpaid earnings awaiting payout" cols={["Payment ID","Amount","Due Date","Method","Status"]} rows={PENDING} render={(r) => (
          <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"payment", data:r })}>
            <Td className="font-medium">{r.id}</Td><Td className="font-semibold">{r.amount}</Td><Td>{r.due}</Td><Td>{r.method}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td>
          </tr>)} action={<div className="flex gap-2"><Btn onClick={() => notify("Selected payments approved")}>✓ Approve Selected</Btn><Btn variant="ghost" onClick={() => notify("Exported")}>Export</Btn></div>} />}
        {tab==="history" && <TableSection title="Payment History" sub="Completed payouts" cols={["Payment ID","Amount","Method","Date","Status"]} rows={HISTORY} render={(r) => (
          <tr key={r.id} className="hover:bg-gray-50"><Td className="font-medium">{r.id}</Td><Td className="font-semibold">{r.amount}</Td><Td>{r.method}</Td><Td>{r.date}</Td><Td><Pill tone="green">{r.status}</Pill></Td></tr>)} />}
        {tab==="contrib" && <TableSection title="Client Contribution" sub="Top revenue-generating clients" cols={["Client","Account","Lots","Revenue Generated","Commission Earned"]} rows={CONTRIB} render={(r,i) => (
          <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.client}</Td><Td>{r.acc}</Td><Td>{r.lots}</Td><Td className="font-semibold">{r.revenue}</Td><Td className="font-semibold text-emerald-700">{r.commission}</Td></tr>)} />}
        {tab==="disputes" && <TableSection title="Commission Disputes" sub="Open investigations" cols={["Dispute ID","Amount","Reason","Status","Assigned Team","Date"]} rows={DISPUTES} render={(r) => (
          <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({ kind:"dispute", data:r })}>
            <Td className="font-medium">{r.id}</Td><Td className="font-semibold">{r.amount}</Td><Td>{r.reason}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td><Td>{r.team}</Td><Td>{r.date}</Td>
          </tr>)} />}
        {tab==="rules" && <Section title="Commission Rules" subtitle="Active commission configuration for this partner">
          <div className="grid gap-x-8 gap-y-1 md:grid-cols-2">{RULES.map(r => <KV key={r.f} k={r.f} v={r.v} />)}</div>
        </Section>}
        {tab==="timeline" && <Section title="Timeline" subtitle="All commission lifecycle events">
          <ol className="relative ml-3 border-l border-gray-200">
            {TIMELINE.map((t,i) => (
              <li key={i} className="mb-4 ml-4">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-900" />
                <div className="text-xs text-gray-500">{t.t} · {t.by}</div>
                <div className="text-sm text-gray-900">{t.e}</div>
              </li>
            ))}
          </ol>
        </Section>}
        {tab==="notes" && <Section title="Notes" subtitle="Internal commission notes" action={<Btn onClick={() => notify("Note added")}>+ Add</Btn>}>
          <div className="space-y-3">
            {NOTES.map((n,i) => (
              <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <div className="text-sm text-gray-900">{n.txt}</div>
                <div className="mt-1 text-xs text-gray-500">{n.by} · {n.date}</div>
              </div>
            ))}
            <div className="flex gap-2"><input className="flex-1 rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Add a note..." /><Btn>+ Add</Btn></div>
          </div>
        </Section>}
        {tab==="actions" && <ActionsView notify={notify} />}
        {tab==="audit" && <TableSection title="Audit Trail" sub="All commission-related changes" cols={["Action","By","Entity","Timestamp","IP"]} rows={AUDIT} render={(r,i) => (
          <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.action}</Td><Td>{r.by}</Td><Td>{r.entity}</Td><Td>{r.ts}</Td><Td className="font-mono text-xs">{r.ip}</Td></tr>)} />}
      </div>

      <Drawer open={!!drawer} onClose={() => setDrawer(null)} data={drawer} notify={notify} />
    </div>
  );
}

function SummaryView() {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {KPIS.map(k => (
          <Card key={k.label} className="p-4">
            <div className="text-xs text-gray-500">{k.label}</div>
            <div className="mt-1 text-2xl font-semibold text-gray-900">{k.value}</div>
            <div className="mt-1 text-xs text-gray-500">{k.sub}</div>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Section title="Commission Breakdown" subtitle="By revenue source">
          {[
            { l: "Revenue Share", v: "$31,200", pct: 32 },
            { l: "CPA", v: "$22,500", pct: 23 },
            { l: "Hybrid", v: "$28,800", pct: 29 },
            { l: "Rebates", v: "$18,450", pct: 19 },
            { l: "Adjustments", v: "-$2,450", pct: 3 },
          ].map(r => (
            <div key={r.l} className="mb-2">
              <div className="flex justify-between text-sm"><span className="text-gray-700">{r.l}</span><span className="font-semibold">{r.v}</span></div>
              <div className="mt-1 h-1.5 w-full rounded bg-gray-100"><div className="h-1.5 rounded bg-gray-900" style={{width: `${r.pct}%`}} /></div>
            </div>
          ))}
          <div className="mt-3 flex justify-between border-t border-gray-200 pt-3 text-sm font-semibold"><span>Net Total</span><span>$98,500</span></div>
        </Section>
        <Section title="Payment Status" subtitle="Current month payout state">
          {[
            { l: "Paid", v: "$70,300", pct: 85, tone: "green" as Tone },
            { l: "Pending", v: "$12,200", pct: 15, tone: "amber" as Tone },
            { l: "On Hold", v: "$3,200", pct: 4, tone: "red" as Tone },
          ].map(r => (
            <div key={r.l} className="mb-3">
              <div className="flex justify-between text-sm"><span><Pill tone={r.tone}>{r.l}</Pill></span><span className="font-semibold">{r.v} ({r.pct}%)</span></div>
              <div className="mt-1 h-1.5 w-full rounded bg-gray-100"><div className={`h-1.5 rounded ${r.tone==="green"?"bg-emerald-500":r.tone==="amber"?"bg-amber-500":"bg-rose-500"}`} style={{width:`${r.pct}%`}} /></div>
            </div>
          ))}
        </Section>
      </div>
    </>
  );
}

function TableSection({ title, sub, cols, rows, render, action }: { title: string; sub?: string; cols: string[]; rows: any[]; render: (r:any,i:number)=>React.ReactNode; action?: React.ReactNode }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => rows.filter(r => JSON.stringify(r).toLowerCase().includes(q.toLowerCase())), [rows, q]);
  return (
    <Section title={title} subtitle={sub} action={action ?? <div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="rounded-md border border-gray-200 px-3 py-1.5 text-xs" /><Btn variant="ghost" onClick={() => toast.success("Exported")}>Export</Btn></div>}>
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50"><tr>{cols.map(c => <Th key={c}>{c}</Th>)}</tr></thead>
          <tbody className="divide-y divide-gray-100 bg-white">{filtered.map((r,i) => render(r,i))}</tbody>
        </table>
      </div>
    </Section>
  );
}

function ActionsView({ notify }: { notify: (m: string)=>void }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Section title="Safe Actions" subtitle="No approval required">
        <div className="space-y-2">
          {["View Earnings","Export Report","Add Note","View Payment"].map(a => <Btn key={a} variant="ghost" onClick={() => notify(`${a} executed`)}>{a}</Btn>)}
        </div>
      </Section>
      <Section title="Moderate Actions" subtitle="Standard approval">
        <div className="space-y-2">
          {["Approve Payment","Adjust Commission","Hold Payment","Assign Review"].map(a => <Btn key={a} onClick={() => notify(`${a} executed`)}>{a}</Btn>)}
        </div>
      </Section>
      <Section title="Dangerous Actions" subtitle="Requires permission, reason, audit log, confirmation">
        <div className="space-y-2">
          {["Reverse Commission","Cancel Payment","Hold Commission","Freeze Earnings"].map(a => <Btn key={a} variant="danger" onClick={() => notify(`${a} executed`)}>{a}</Btn>)}
        </div>
      </Section>
    </div>
  );
}

/* ---------------- drawer ---------------- */
function Drawer({ open, onClose, data, notify }: { open: boolean; onClose: ()=>void; data: any; notify: (m:string)=>void }) {
  const [t, setT] = useState("overview");
  if (!open) return null;
  const r = data?.data ?? {};
  const kind = data?.kind;
  const tabs =
    kind==="txn" ? ["overview","source","trading","calc","payment","timeline","notes","audit"] :
    kind==="payment" ? ["overview","method","bank","sources","approval","timeline"] :
    kind==="dispute" ? ["overview","details","timeline","audit"] :
    kind==="rebateTxn" ? ["overview","client","volume","formula","payment","timeline"] :
    ["overview","details","timeline"];
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40" onClick={onClose}>
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-xl" onClick={e=>e.stopPropagation()}>
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex gap-2"><Pill tone={statusTone(r.status||"")}>{r.status||"—"}</Pill><Pill tone="blue">{kind}</Pill></div>
              <h3 className="mt-2 text-lg font-semibold">{r.id || r.acc} — {r.client || r.name || ""}</h3>
              <div className="text-sm text-gray-500">{r.amount || r.rebate || r.commission}</div>
            </div>
            <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1 border-b border-gray-100 -mb-5">
            {tabs.map(x => (
              <button key={x} onClick={()=>setT(x)} className={`border-b-2 px-3 py-2 text-xs capitalize ${t===x?"border-gray-900 font-semibold":"border-transparent text-gray-500"}`}>{x}</button>
            ))}
          </div>
        </div>
        <div className="p-5 space-y-2">
          {t==="overview" && Object.entries(r).map(([k,v]) => <KV key={k} k={k} v={String(v)} />)}
          {t==="source" && kind==="txn" && (<>
            <KV k="Client Name" v={r.client} /><KV k="Account" v={r.acc} /><KV k="Platform" v="MT5" /><KV k="Country" v="India" />
          </>)}
          {t==="trading" && kind==="txn" && (<>
            <KV k="Period" v={r.period} /><KV k="Lots Traded" v="842" /><KV k="Instruments" v="EURUSD, XAUUSD, US30" /><KV k="Trades" v="412" />
          </>)}
          {t==="calc" && kind==="txn" && (<>
            <KV k="Gross Revenue" v={r.gross} /><KV k="Net Revenue" v={r.net} /><KV k="Share Rate" v={r.rate} /><KV k="Commission" v={<span className="font-bold text-emerald-700">{r.amount}</span>} />
          </>)}
          {t==="payment" && (<>
            <KV k="Due Date" v={r.due || "—"} /><KV k="Method" v={r.method || "Bank Wire"} /><KV k="Linked Payment" v={r.payId || "—"} /><KV k="Currency" v="USD" />
          </>)}
          {t==="method" && (<><KV k="Method" v={r.method} /><KV k="Currency" v="USD" /><KV k="Fee" v="$0" /></>)}
          {t==="bank" && (<><KV k="Bank Name" v="HDFC Bank" /><KV k="Account" v="****4521" /><KV k="SWIFT" v="HDFCINBB" /><KV k="Beneficiary" v={PARTNER.name} /></>)}
          {t==="sources" && (<><KV k="Source Txns" v="TXN-8821, TXN-8744" /><KV k="Period" v="May 2025" /></>)}
          {t==="approval" && (<><KV k="Requested By" v="System" /><KV k="Approved By" v="Finance L2" /><KV k="Approved At" v="30 May 13:50" /></>)}
          {t==="client" && (<><KV k="Client" v={r.client} /><KV k="Country" v="UAE" /><KV k="Tier" v="VIP" /></>)}
          {t==="volume" && (<><KV k="Lots Traded" v={r.lots} /><KV k="Instrument" v={r.instrument} /><KV k="Period" v="May 2025" /></>)}
          {t==="formula" && (<><KV k="Formula" v={r.formula} /><KV k="Rate" v="$2 per lot" /><KV k="Total" v={r.amount} /></>)}
          {t==="details" && (<>{Object.entries(r).map(([k,v]) => <KV key={k} k={k} v={String(v)} />)}{r.notes && <div className="mt-3 rounded bg-amber-50 p-3 text-sm text-amber-900">{r.notes}</div>}</>)}
          {t==="timeline" && (<ol className="space-y-2 text-sm">
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">Today · System</div><div>Record created</div></li>
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">Yesterday · Finance</div><div>Updated status to {r.status}</div></li>
          </ol>)}
          {t==="notes" && <div className="rounded bg-gray-50 p-3 text-sm text-gray-700">No notes yet.</div>}
          {t==="audit" && (<ol className="space-y-1 text-xs text-gray-600">
            <li>Created · System · Today 09:00</li><li>Updated · Finance L2 · Today 14:20</li>
          </ol>)}
        </div>
        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-gray-200 bg-white p-4">
          <Btn variant="ghost" onClick={() => notify("Exported")}>Export</Btn>
          <Btn variant="ghost" onClick={() => notify("Flagged")}>Flag</Btn>
          <Btn onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}
