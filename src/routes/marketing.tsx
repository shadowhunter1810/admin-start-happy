import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Campaigns · Atlas CRM" },
      { name: "description", content: "Client/IB marketing attribution, campaigns, UTM, promotions, referrals, email, SMS & push." },
    ],
  }),
  component: () => (
    <ClientShell>
      <MarketingPage />
    </ClientShell>
  ),
});

const SECTIONS = [
  { k: "summary", label: "Summary" },
  { k: "attribution", label: "Attribution" },
  { k: "participation", label: "Campaign Participation" },
  { k: "source", label: "Acquisition Source" },
  { k: "utm", label: "UTM Tracking" },
  { k: "promo", label: "Promotions & Bonuses" },
  { k: "referral", label: "Referral Campaigns" },
  { k: "email", label: "Email" },
  { k: "sms", label: "SMS" },
  { k: "push", label: "Push" },
  { k: "performance", label: "Performance" },
  { k: "funnel", label: "Conversion Funnel" },
  { k: "revattr", label: "Revenue Attribution" },
  { k: "eligibility", label: "Restrictions & Eligibility" },
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
      <div><h2 className="text-lg font-semibold">{title}</h2>{subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}</div>
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
const statusTone = (s: string): Tone => {
  const x = s.toLowerCase();
  if (/(active|opened|clicked|approved|allow|completed|sent)/.test(x)) return "green";
  if (/(pending|partial|near)/.test(x)) return "amber";
  if (/(reject|block|fail|ban|risk|abuse)/.test(x)) return "red";
  return "gray";
};

const KPIS = [
  { l: "Campaigns Joined", v: "12", s: "Lifetime", tone: "blue" as Tone },
  { l: "Campaign Source", v: "Google Ads", s: "Acquisition channel", tone: "blue" as Tone },
  { l: "Bonuses Received", v: "4", s: "Lifetime bonuses", tone: "violet" as Tone },
  { l: "Deposits from Campaign", v: "$29,200", s: "From campaign activity", tone: "green" as Tone },
  { l: "Revenue Generated", v: "$8,200", s: "Campaign ROI", tone: "green" as Tone },
  { l: "Trading Volume", v: "8,500 lots", s: "From campaigns", tone: "blue" as Tone },
  { l: "Conversion Rate", v: "38.0%", s: "Lead quality", tone: "amber" as Tone },
  { l: "Last Campaign", v: "May Deposit Promo", s: "09 May 2026", tone: "gray" as Tone },
];

const ATTRIBUTION = [
  { f: "First Touch Campaign", v: "Gold Trading Campaign" },
  { f: "Last Touch Campaign", v: "VIP Deposit Campaign" },
  { f: "Attribution Model", v: "Multi-touch linear" },
  { f: "Acquisition Channel", v: "Google Ads → IB referral" },
  { f: "Registration Source", v: "Google CPC · 14 Mar 2022" },
  { f: "Referral Source", v: "IB-00201 · Rajesh Kumar" },
  { f: "IB Source", v: "IB-00412 · Arjun Raghunathan" },
  { f: "Campaign Owner", v: "Marketing Team" },
  { f: "Affiliate Source", v: "Google Ads Network" },
  { f: "Tracking ID", v: "TRK-AR4120-G001" },
];
const UTM_REG = [
  { f: "UTM Source", v: "google" }, { f: "UTM Medium", v: "cpc" },
  { f: "UTM Campaign", v: "gold-trading-2022" }, { f: "UTM Content", v: "banner-300x250" },
  { f: "UTM Term", v: "forex trading india" }, { f: "Landing Page", v: "broker.com/gold-trading" },
  { f: "Device at Registration", v: "Chrome / Android" }, { f: "Country at Registration", v: "India · Mumbai" },
];

const CAMPAIGNS = [
  { id: "CAMP-2026-018", name: "May Deposit Promo", type: "Deposit bonus", joined: "09 May 2026", status: "Active", deposits: "$2,000", revenue: "$0", owner: "Marketing Team", start: "01 May 2026", end: "31 May 2026", impressions: 12400, clicks: 820, regs: 142, kyc: 108, fd: 84, traders: 62, vol: "2,140 lots", utm: "may-promo-2026" },
  { id: "CAMP-2026-004", name: "Ramadan Promotion", type: "Cashback", joined: "01 Apr 2026", status: "Active", deposits: "$4,200", revenue: "$480", owner: "Marketing Team", start: "01 Apr 2026", end: "30 Apr 2026", impressions: 28400, clicks: 1820, regs: 220, kyc: 168, fd: 124, traders: 96, vol: "3,400 lots", utm: "ramadan-2026" },
  { id: "CAMP-2024-088", name: "VIP Deposit Campaign", type: "VIP exclusive", joined: "Jan 2024", status: "Completed", deposits: "$18,000", revenue: "$2,100", owner: "VIP Team", start: "01 Jan 2024", end: "31 Mar 2024", impressions: 8400, clicks: 620, regs: 88, kyc: 72, fd: 58, traders: 48, vol: "4,200 lots", utm: "vip-deposit-2024" },
  { id: "CAMP-2022-001", name: "Gold Trading 2022", type: "Acquisition", joined: "14 Mar 2022", status: "Completed", deposits: "$5,000", revenue: "$8,200", owner: "Growth Team", start: "01 Mar 2022", end: "30 Jun 2022", impressions: 64000, clicks: 4820, regs: 412, kyc: 298, fd: 189, traders: 142, vol: "12,400 lots", utm: "gold-trading-2022" },
];

const UTM_TABLE = [
  { utm: "gold-trading-2022", source: "google", medium: "cpc", clicks: 4820, regs: 412, deposits: "$5K", revenue: "$8,200", roi: "+165%" },
  { utm: "deposit-2024", source: "email", medium: "newsletter", clicks: 820, regs: 88, deposits: "$18K", revenue: "$2,100", roi: "+210%" },
  { utm: "ramadan-2026", source: "facebook", medium: "social", clicks: 1820, regs: 220, deposits: "$4K", revenue: "$480", roi: "+48%" },
  { utm: "may-promo-2026", source: "whatsapp", medium: "social", clicks: 820, regs: 142, deposits: "$2K", revenue: "$0", roi: "—" },
];

const PROMOS = [
  { id: "PROMO-001", name: "100% Deposit Bonus", type: "Deposit bonus", amount: "$1,000", date: "09 May 2026", status: "Active", kyc: "Approved", deposit: "$1,000+", aml: "Clear", region: "India · allowed" },
  { id: "PROMO-002", name: "Ramadan Cashback 5%", type: "Cashback", amount: "$480", date: "15 Apr 2026", status: "Active", kyc: "Approved", deposit: "$500+", aml: "Clear", region: "Global" },
  { id: "PROMO-003", name: "VIP Welcome Bonus", type: "VIP exclusive", amount: "$2,100", date: "12 Jan 2024", status: "Completed", kyc: "Approved", deposit: "$10,000+", aml: "Clear", region: "VIP only" },
  { id: "PROMO-004", name: "Gold Trading Bonus", type: "Acquisition", amount: "$500", date: "20 Mar 2022", status: "Completed", kyc: "Approved", deposit: "$250+", aml: "Clear", region: "India" },
];

const REFERRALS = [
  { id: "REF-PROGRAM", name: "IB Referral Program", totalRefs: 147, verified: 98, depositors: 72, traders: 38, vip: 4, deposits: "$540K", volume: "8,400 lots", revenue: "$12,200" },
];
const REFERRAL_RISK = [
  { f: "Self Referral Detection", v: "Clear", tone: "green" as Tone },
  { f: "Device Sharing", v: "Clear", tone: "green" as Tone },
  { f: "Multi Accounting", v: "1 flag", tone: "amber" as Tone },
  { f: "Referral Abuse", v: "Clear", tone: "green" as Tone },
  { f: "Bonus Abuse", v: "Clear", tone: "green" as Tone },
];

const EMAILS = [
  { c: "VIP Offer", sent: "12 May 2026", opened: "Yes", clicked: "No", status: "Opened" },
  { c: "Market Update", sent: "08 May 2026", opened: "Yes", clicked: "Yes", status: "Clicked" },
  { c: "Ramadan Cashback", sent: "01 Apr 2026", opened: "Yes", clicked: "Yes", status: "Converted" },
  { c: "Gold Trading 2022", sent: "14 Mar 2022", opened: "Yes", clicked: "Yes", status: "Converted" },
];
const SMS = [
  { c: "Deposit reminder", sent: "10 May 2026", delivered: "Yes", clicked: "No" },
  { c: "Bonus expiry alert", sent: "28 Apr 2026", delivered: "Yes", clicked: "Yes" },
];
const PUSH = [
  { n: "May Deposit Promo", sent: "09 May 2026", opened: "Yes", action: "Deposited" },
  { n: "Price alert XAUUSD", sent: "06 May 2026", opened: "Yes", action: "Opened chart" },
];

const PERFORMANCE = [
  { m: "Deposits Generated", v: "$29,200" },
  { m: "Revenue Generated", v: "$8,200" },
  { m: "Trading Volume", v: "8,500 lots" },
  { m: "CPA Cost", v: "$2,140" },
  { m: "ROI", v: "+283%" },
  { m: "Lifetime Value (LTV)", v: "$24,800" },
];

const FUNNEL = [
  { s: "Lead", v: 1 }, { s: "Registered", v: 1 }, { s: "KYC Approved", v: 1 },
  { s: "Deposited", v: 1 }, { s: "Traded", v: 1 }, { s: "Active Client", v: 1 }, { s: "VIP Client", v: 0 },
];

const REV_ATTR = [
  { f: "Commission Generated", v: "$2,100" },
  { f: "Trading Revenue", v: "$8,200" },
  { f: "Net Profit", v: "$6,060" },
  { f: "Marketing Cost", v: "$2,140" },
  { f: "ROI", v: "+283%" },
];

const RESTRICTIONS = [
  { r: "Self-Referral Block", status: "Allow", note: "Self-referral detection enabled", reason: "Default policy" },
  { r: "IB Excluded From Bonus", status: "Partial", note: "IB partners excluded from deposit bonuses but eligible for cashback", reason: "IB policy" },
  { r: "Region Lock", status: "Allow", note: "All campaigns allowed in India", reason: "—" },
  { r: "Bonus Abuse Risk", status: "Allow", note: "No abuse flags", reason: "Clean record" },
];

const TIMELINE = [
  { t: "09:10", e: "Registered via Google Ad" },
  { t: "09:15", e: "Campaign Assigned — Gold Trading 2022" },
  { t: "09:20", e: "KYC Approved" },
  { t: "10:45", e: "First Deposit $500" },
  { t: "11:00", e: "Bonus PROMO-004 granted" },
  { t: "14:30", e: "Joined Ramadan Promotion" },
  { t: "Active", e: "WhatsApp campaign engagement" },
];

const NOTES = [
  { txt: "High campaign engagement — eligible for VIP promotion.", by: "Marketing", d: "10 May 2026" },
  { txt: "Bonus abuse review pending — flagged once for multi-accounting.", by: "Compliance", d: "28 Apr 2026" },
];

const AUDIT = [
  { a: "Campaign Joined", by: "System", e: "CAMP-2026-018", ts: "09 May 09:15" },
  { a: "Bonus Granted", by: "Marketing", e: "PROMO-001", ts: "09 May 11:30" },
  { a: "Reward Revoked", by: "Compliance", e: "PROMO-002", ts: "28 Apr 15:10" },
];

function MarketingPage() {
  const [tab, setTab] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<any>(null);
  const notify = (m: string) => toast.success(m);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-wide text-gray-500">Marketing Campaigns</div>
              <h1 className="mt-1 text-2xl font-semibold">Arjun Raghunathan <span className="text-gray-400">· CLI-00421</span></h1>
              <div className="mt-2 flex flex-wrap gap-2">
                <Pill tone="green">Active</Pill><Pill tone="violet">VIP Eligible</Pill>
                <Pill tone="blue">Google Ads Source</Pill><Pill tone="blue">IB Referred</Pill>
                <Pill tone="amber">Bonus Review Pending</Pill>
              </div>
            </div>
            <div className="flex gap-2">
              <Btn variant="ghost" onClick={() => notify("Exported")}>Export</Btn>
              <Btn onClick={() => notify("Campaign assigned")}>Assign Campaign</Btn>
              <Btn variant="danger" onClick={() => notify("Bonus revoked")}>Revoke Bonus</Btn>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl overflow-x-auto px-6">
          <div className="flex gap-1">
            {SECTIONS.map(s => (
              <button key={s.k} onClick={() => setTab(s.k)} className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm transition ${tab===s.k?"border-gray-900 font-semibold":"border-transparent text-gray-500 hover:text-gray-800"}`}>{s.label}</button>
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

        {tab==="attribution" && (
          <div className="grid gap-6 md:grid-cols-2">
            <Section title="Acquisition Attribution">{ATTRIBUTION.map(r => <KV key={r.f} k={r.f} v={r.v} />)}</Section>
            <Section title="UTM Parameters (Registration)">{UTM_REG.map(r => <KV key={r.f} k={r.f} v={r.v} />)}</Section>
          </div>
        )}

        {tab==="source" && (
          <Section title="Acquisition Source" subtitle="Where this client originated">
            <div className="grid gap-x-8 md:grid-cols-2">
              <KV k="Original Channel" v="Google Ads" />
              <KV k="Original Campaign" v="Gold Trading 2022" />
              <KV k="Original Country" v="India · Mumbai" />
              <KV k="Original Device" v="Chrome / Android" />
              <KV k="Landing Page" v="broker.com/gold-trading" />
              <KV k="Referrer" v="IB-00201 Rajesh Kumar" />
              <KV k="First Visit" v="14 Mar 2022 09:08" />
              <KV k="First Deposit" v="14 Mar 2022 $500" />
            </div>
          </Section>
        )}

        {tab==="participation" && (
          <Section title="Campaign Participation" subtitle="Click row for full campaign drawer">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Campaign ID","Name","Type","Joined","Status","Deposits","Revenue"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{CAMPAIGNS.map(r => (
                <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({kind:"campaign", data:r})}>
                  <Td className="font-medium">{r.id}</Td><Td>{r.name}</Td><Td>{r.type}</Td><Td>{r.joined}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td><Td className="font-semibold">{r.deposits}</Td><Td>{r.revenue}</Td>
                </tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="utm" && (
          <Section title="UTM Tracking" subtitle="Marketing attribution tracking · Click for details">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["UTM Campaign","Source","Medium","Clicks","Registrations","Deposits","Revenue","ROI"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{UTM_TABLE.map(r => (
                <tr key={r.utm} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({kind:"utm", data:r})}>
                  <Td className="font-medium">{r.utm}</Td><Td>{r.source}</Td><Td>{r.medium}</Td><Td>{r.clicks}</Td><Td>{r.regs}</Td><Td>{r.deposits}</Td><Td className="font-semibold">{r.revenue}</Td><Td className={r.roi.includes("+")?"text-emerald-600 font-semibold":""}>{r.roi}</Td>
                </tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="promo" && (
          <Section title="Promotions & Bonuses" subtitle="Click row for eligibility & usage details">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Promo ID","Name","Type","Amount","Date","Status"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{PROMOS.map(r => (
                <tr key={r.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setDrawer({kind:"promo", data:r})}>
                  <Td className="font-medium">{r.id}</Td><Td>{r.name}</Td><Td>{r.type}</Td><Td className="font-semibold">{r.amount}</Td><Td>{r.date}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td>
                </tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="referral" && (<>
          <Section title="Referral Campaigns">
            {REFERRALS.map(r => (
              <div key={r.id}>
                <div className="mb-3 grid grid-cols-2 gap-3 md:grid-cols-5">
                  <Card className="p-3"><div className="text-xs text-gray-500">Total Referrals</div><div className="text-xl font-semibold">{r.totalRefs}</div></Card>
                  <Card className="p-3"><div className="text-xs text-gray-500">KYC Verified</div><div className="text-xl font-semibold">{r.verified} (66.7%)</div></Card>
                  <Card className="p-3"><div className="text-xs text-gray-500">Depositors</div><div className="text-xl font-semibold">{r.depositors} (73.5%)</div></Card>
                  <Card className="p-3"><div className="text-xs text-gray-500">Active Traders</div><div className="text-xl font-semibold">{r.traders} (52.8%)</div></Card>
                  <Card className="p-3"><div className="text-xs text-gray-500">VIP Clients</div><div className="text-xl font-semibold">{r.vip} (10.5%)</div></Card>
                </div>
                <div className="grid gap-x-8 md:grid-cols-2">
                  <KV k="Total Deposits" v={r.deposits} />
                  <KV k="Trading Volume" v={r.volume} />
                  <KV k="Revenue" v={r.revenue} />
                  <KV k="Program" v={r.name} />
                </div>
              </div>
            ))}
          </Section>
          <Section title="Referral Fraud Analysis">
            <div className="grid gap-x-8 md:grid-cols-2">{REFERRAL_RISK.map(r => (
              <div key={r.f} className="flex items-center justify-between border-b border-gray-100 py-2 text-sm last:border-0">
                <span className="text-gray-500">{r.f}</span><Pill tone={r.tone}>{r.v}</Pill>
              </div>))}</div>
          </Section>
        </>)}

        {tab==="email" && (
          <Section title="Email Campaign History">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Campaign","Sent","Opened","Clicked","Status"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{EMAILS.map((r,i) => (
                <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.c}</Td><Td>{r.sent}</Td><Td>{r.opened}</Td><Td>{r.clicked}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="sms" && (
          <Section title="SMS Campaign History">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Campaign","Sent","Delivered","Clicked"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{SMS.map((r,i) => (
                <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.c}</Td><Td>{r.sent}</Td><Td>{r.delivered}</Td><Td>{r.clicked}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="push" && (
          <Section title="Push Notification Campaigns">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Notification","Sent","Opened","Action Taken"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{PUSH.map((r,i) => (
                <tr key={i} className="hover:bg-gray-50"><Td className="font-medium">{r.n}</Td><Td>{r.sent}</Td><Td>{r.opened}</Td><Td>{r.action}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="performance" && (
          <Section title="Campaign Performance" subtitle="Aggregate metrics across all campaigns">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{PERFORMANCE.map(m => (
              <Card key={m.m} className="p-4"><div className="text-xs text-gray-500">{m.m}</div><div className="mt-1 text-2xl font-semibold">{m.v}</div></Card>))}</div>
          </Section>
        )}

        {tab==="funnel" && (
          <Section title="Conversion Funnel" subtitle="Lead → VIP journey for this client">
            <div className="space-y-2">{FUNNEL.map((f,i) => (
              <div key={f.s} className="flex items-center gap-3">
                <div className="w-32 text-sm">{f.s}</div>
                <div className="flex-1 rounded bg-gray-100">
                  <div className={`rounded py-2 pl-3 text-xs font-semibold text-white ${f.v?"bg-emerald-500":"bg-gray-300"}`} style={{width: f.v?`${100 - i*8}%`:"6%"}}>{f.v?"Completed":"Not reached"}</div>
                </div>
              </div>))}</div>
          </Section>
        )}

        {tab==="revattr" && (
          <Section title="Revenue Attribution" subtitle="Marketing → revenue chain for this client">
            <div className="grid gap-x-8 md:grid-cols-2">{REV_ATTR.map(r => <KV key={r.f} k={r.f} v={r.v} />)}</div>
          </Section>
        )}

        {tab==="eligibility" && (
          <Section title="Restrictions & Eligibility" subtitle="Campaign rule enforcement">
            <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50"><tr>{["Restriction","Status","Note","Reason"].map(c => <Th key={c}>{c}</Th>)}</tr></thead>
              <tbody className="divide-y divide-gray-100">{RESTRICTIONS.map((r,i) => (
                <tr key={i}><Td className="font-medium">{r.r}</Td><Td><Pill tone={statusTone(r.status)}>{r.status}</Pill></Td><Td>{r.note}</Td><Td className="text-gray-500">{r.reason}</Td></tr>))}</tbody>
            </table></div>
          </Section>
        )}

        {tab==="timeline" && (
          <Section title="Timeline">
            <ol className="relative ml-3 border-l border-gray-200">{TIMELINE.map((t,i) => (
              <li key={i} className="mb-4 ml-4">
                <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-900" />
                <div className="text-xs text-gray-500">{t.t}</div>
                <div className="text-sm">{t.e}</div>
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
            <Section title="Safe Actions"><div className="space-y-2">{["View Campaigns","Export Report","Add Note","View Promotions"].map(a => <Btn key={a} variant="ghost" onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
            <Section title="Moderate Actions"><div className="space-y-2">{["Assign Campaign","Remove Campaign","Grant Bonus","Revoke Bonus"].map(a => <Btn key={a} onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
            <Section title="Dangerous Actions" subtitle="Permission + reason + audit log + confirmation"><div className="space-y-2">{["Ban Bonus Participation","Revoke Rewards","Block from Campaigns"].map(a => <Btn key={a} variant="danger" onClick={() => notify(a)}>{a}</Btn>)}</div></Section>
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

      <MarketingDrawer open={!!drawer} data={drawer} onClose={() => setDrawer(null)} notify={notify} />
    </div>
  );
}

function MarketingDrawer({ open, data, onClose, notify }: { open: boolean; data: any; onClose: ()=>void; notify: (m:string)=>void }) {
  const [t, setT] = useState("overview");
  if (!open) return null;
  const r = data?.data ?? {};
  const kind = data?.kind;
  const tabs =
    kind === "campaign" ? ["overview","participation","analytics","related","timeline","audit"] :
    kind === "utm" ? ["overview","traffic","conversion","geo","audit"] :
    kind === "promo" ? ["overview","eligibility","usage","fraud","audit"] :
    ["overview","details","timeline"];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-gray-900/40" onClick={onClose}>
      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white" onClick={e=>e.stopPropagation()}>
        <div className="border-b p-5">
          <div className="flex items-start justify-between">
            <div>
              <Pill tone={statusTone(r.status || "Active")}>{r.status || "Active"}</Pill>
              <h3 className="mt-2 text-lg font-semibold">{r.name || r.utm || r.id}</h3>
              <div className="text-sm text-gray-500">{r.type || `${r.source} / ${r.medium}` || ""}</div>
            </div>
            <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">✕</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-1 -mb-5 border-b">
            {tabs.map(x => <button key={x} onClick={()=>setT(x)} className={`border-b-2 px-3 py-2 text-xs capitalize ${t===x?"border-gray-900 font-semibold":"border-transparent text-gray-500"}`}>{x}</button>)}
          </div>
        </div>
        <div className="space-y-2 p-5">
          {kind==="campaign" && t==="overview" && (<>
            <KV k="Campaign ID" v={r.id} /><KV k="Name" v={r.name} /><KV k="Type" v={r.type} /><KV k="Owner" v={r.owner} /><KV k="Start" v={r.start} /><KV k="End" v={r.end} /><KV k="Status" v={r.status} />
          </>)}
          {kind==="campaign" && t==="participation" && (<>
            <KV k="Joined" v={r.joined} /><KV k="Referral Code" v="AR4120" /><KV k="Tracking Link" v="broker.com/r/AR4120" /><KV k="Registration Source" v="Google CPC" /><KV k="UTM Campaign" v={r.utm} />
          </>)}
          {kind==="campaign" && t==="analytics" && (<>
            <KV k="Impressions" v={r.impressions?.toLocaleString()} /><KV k="Clicks" v={r.clicks?.toLocaleString()} /><KV k="Registrations" v={r.regs} /><KV k="KYC Approved" v={r.kyc} /><KV k="First Deposits" v={r.fd} /><KV k="Active Traders" v={r.traders} /><KV k="Trading Volume" v={r.vol} /><KV k="Revenue Generated" v={r.revenue} />
          </>)}
          {kind==="campaign" && t==="related" && (<>
            <KV k="Related Accounts" v="MT5-00421, MT5-00298" /><KV k="Related Clients" v="142 clients" /><KV k="Related IBs" v="IB-00412 · Arjun Raghunathan" /><KV k="Related Affiliates" v="Google Ads Network" />
          </>)}

          {kind==="utm" && t==="overview" && (<>
            <KV k="UTM Campaign" v={r.utm} /><KV k="Source" v={r.source} /><KV k="Medium" v={r.medium} /><KV k="Clicks" v={r.clicks} /><KV k="Registrations" v={r.regs} /><KV k="Revenue" v={r.revenue} /><KV k="ROI" v={r.roi} />
          </>)}
          {kind==="utm" && t==="traffic" && (<><KV k="Unique Visitors" v="3,940" /><KV k="Bounce Rate" v="38%" /><KV k="Avg Time on Page" v="2m 14s" /><KV k="Top Landing Page" v="broker.com/gold-trading" /></>)}
          {kind==="utm" && t==="conversion" && (<><KV k="Reg → KYC" v="72%" /><KV k="KYC → Deposit" v="63%" /><KV k="Deposit → Trade" v="78%" /><KV k="Lead → VIP" v="0.8%" /></>)}
          {kind==="utm" && t==="geo" && (<><KV k="India" v="62%" /><KV k="UAE" v="18%" /><KV k="UK" v="10%" /><KV k="Others" v="10%" /></>)}

          {kind==="promo" && t==="overview" && (<>
            <KV k="Promo ID" v={r.id} /><KV k="Name" v={r.name} /><KV k="Type" v={r.type} /><KV k="Amount" v={r.amount} /><KV k="Date" v={r.date} /><KV k="Status" v={r.status} />
          </>)}
          {kind==="promo" && t==="eligibility" && (<>
            <KV k="KYC Requirement" v={<span>{r.kyc} ✓</span>} /><KV k="Deposit Requirement" v={<span>{r.deposit} ✓</span>} /><KV k="AML Requirement" v={<span>{r.aml} ✓</span>} /><KV k="Region Eligibility" v={<span>{r.region} ✓</span>} />
          </>)}
          {kind==="promo" && t==="usage" && (<><KV k="Times Used" v="1" /><KV k="Total Granted" v={r.amount} /><KV k="Total Wagered" v="—" /><KV k="Conversion" v="Deposited & traded" /></>)}
          {kind==="promo" && t==="fraud" && (<><KV k="Device Sharing Risk" v={<Pill tone="green">Clear</Pill>} /><KV k="Self Referral Risk" v={<Pill tone="green">Clear</Pill>} /><KV k="Bonus Abuse" v={<Pill tone="green">Clear</Pill>} /></>)}

          {t==="timeline" && (<ol className="space-y-2 text-sm">
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">Today · System</div><div>Record viewed</div></li>
            <li className="border-l-2 border-gray-300 pl-3"><div className="text-xs text-gray-500">{r.date || r.joined} · Marketing</div><div>Created / assigned</div></li>
          </ol>)}
          {t==="audit" && (<ol className="space-y-1 text-xs text-gray-600"><li>Created · System · {r.date || r.joined}</li><li>Updated · Marketing · Today</li></ol>)}
        </div>
        <div className="sticky bottom-0 flex justify-end gap-2 border-t bg-white p-4">
          <Btn variant="ghost" onClick={() => notify("Exported")}>Export</Btn>
          <Btn variant="ghost" onClick={() => notify("Flagged")}>Flag</Btn>
          <Btn onClick={onClose}>Close</Btn>
        </div>
      </div>
    </div>
  );
}
