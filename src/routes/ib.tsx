import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/ib")({
  head: () => ({
    meta: [
      { title: "IB / Partner · Atlas CRM" },
      { name: "description", content: "Introducing Broker partner dashboard — profile, tier, commissions, referrals, sub-IBs, risk, compliance, audit." },
    ],
  }),
  component: () => (
    <ClientShell>
      <IbPartnerPage />
    </ClientShell>
  ),
});

/* ---------------- types & mock ---------------- */

type SectionKey =
  | "summary" | "profile" | "tier" | "risk" | "commission" | "referral"
  | "subib" | "portfolio" | "revenue" | "payments" | "adjustments"
  | "marketing" | "compliance" | "monitoring" | "restrictions"
  | "timeline" | "notes" | "actions" | "audit";

const SECTIONS: { key: SectionKey; label: string }[] = [
  { key: "summary", label: "Partner Summary" },
  { key: "profile", label: "Partner Profile" },
  { key: "tier", label: "Status & Tier" },
  { key: "risk", label: "Risk Profile" },
  { key: "commission", label: "Commission Profile" },
  { key: "referral", label: "Referral Network" },
  { key: "subib", label: "Sub-IB Network" },
  { key: "portfolio", label: "Client Portfolio" },
  { key: "revenue", label: "Revenue Analytics" },
  { key: "payments", label: "Payment History" },
  { key: "adjustments", label: "Commission Adjustments" },
  { key: "marketing", label: "Marketing Resources" },
  { key: "compliance", label: "Compliance Review" },
  { key: "monitoring", label: "Risk Monitoring" },
  { key: "restrictions", label: "Restrictions & Controls" },
  { key: "timeline", label: "Timeline" },
  { key: "notes", label: "Notes" },
  { key: "actions", label: "Admin Actions" },
  { key: "audit", label: "Audit Trail" },
];

const PARTNER = {
  id: "IB-00412", code: "AR4120", name: "Arjun Raghunathan",
  company: "AR Financial Services Pvt Ltd", type: "Corporate IB",
  registered: "02 Jun 2022", country: "India", email: "arjun.r@gmail.com",
  phone: "+91 98760 12345", manager: "Priya Nair", upline: "IB-00201 — Rajesh Kumar",
  status: "Active", tier: "Gold IB", tierLevel: "Tier 3 of 6",
  referralLink: "broker.com/r/AR4120", landing: "broker.com/ib/ar-financial",
  utm: "google / cpc", trackingId: "TRK-AR4120",
  clicks: 4820, regs: 147, conversion: "3.05%",
};

/* ---------------- atoms ---------------- */

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>{children}</div>
);
const Section = ({ title, subtitle, action, children, className = "" }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) => (
  <Card className={`p-6 ${className}`}>
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
const Pill = ({ tone = "gray", children }: { tone?: "gray"|"green"|"amber"|"red"|"blue"|"violet"; children: React.ReactNode }) => {
  const map: Record<string,string> = {
    gray: "bg-gray-100 text-gray-700 ring-gray-200",
    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    red: "bg-rose-50 text-rose-700 ring-rose-200",
    blue: "bg-sky-50 text-sky-700 ring-sky-200",
    violet: "bg-violet-50 text-violet-700 ring-violet-200",
  };
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${map[tone]}`}>{children}</span>;
};
const KV = ({ k, v, tone }: { k: string; v: React.ReactNode; tone?: "green"|"amber"|"red" }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-gray-100 py-2 last:border-0">
    <span className="text-xs text-gray-500">{k}</span>
    <span className={`text-sm font-medium ${tone==="green"?"text-emerald-600":tone==="red"?"text-rose-600":tone==="amber"?"text-amber-600":"text-gray-900"}`}>{v}</span>
  </div>
);
const Kpi = ({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "green"|"red"|"amber"|"blue"|"violet" }) => (
  <Card className="p-4">
    <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
    <div className={`mt-1 text-2xl font-semibold ${tone==="green"?"text-emerald-600":tone==="red"?"text-rose-600":tone==="amber"?"text-amber-600":tone==="blue"?"text-sky-600":tone==="violet"?"text-violet-600":"text-gray-900"}`}>{value}</div>
    {sub && <div className="mt-0.5 text-xs text-gray-500">{sub}</div>}
  </Card>
);
const Btn = ({ children, variant = "default", onClick }: { children: React.ReactNode; variant?: "default"|"outline"|"danger"|"ghost"; onClick?: () => void }) => {
  const cls = variant === "outline" ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
    : variant === "danger" ? "bg-rose-600 text-white hover:bg-rose-700"
    : variant === "ghost" ? "text-gray-600 hover:bg-gray-100"
    : "bg-gray-900 text-white hover:bg-gray-800";
  return <button onClick={onClick} className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${cls}`}>{children}</button>;
};

/* ---------------- page ---------------- */

function IbPartnerPage() {
  const [active, setActive] = useState<SectionKey>("summary");
  const [drawer, setDrawer] = useState<null | { id: string; name: string }>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="px-6 py-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-lg font-bold text-white">AR</div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold">{PARTNER.name}</h1>
                  <Pill tone="amber">★ {PARTNER.tier}</Pill>
                  <Pill tone="green">● {PARTNER.status}</Pill>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  {PARTNER.id} · {PARTNER.code} · {PARTNER.company} · {PARTNER.country}
                </div>
                <div className="mt-1 text-xs text-gray-400">Registered {PARTNER.registered} · Manager {PARTNER.manager} · Upline {PARTNER.upline}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn variant="outline" onClick={() => toast.success("Profile exported")}>Export</Btn>
              <Btn variant="outline" onClick={() => toast("Note added")}>+ Note</Btn>
              <Btn variant="outline" onClick={() => toast("Manager assigned")}>Assign Manager</Btn>
              <Btn variant="danger" onClick={() => toast.error("Partner suspended")}>Suspend</Btn>
            </div>
          </div>
        </div>
        {/* sticky tabs */}
        <div className="overflow-x-auto border-t border-gray-200">
          <div className="flex gap-1 px-4">
            {SECTIONS.map(s => (
              <button key={s.key} onClick={() => setActive(s.key)}
                className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium transition ${active===s.key?"border-gray-900 text-gray-900":"border-transparent text-gray-500 hover:text-gray-800"}`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 p-6">
        {active === "summary" && <Summary />}
        {active === "profile" && <Profile />}
        {active === "tier" && <TierStatus />}
        {active === "risk" && <RiskProfile />}
        {active === "commission" && <CommissionProfile />}
        {active === "referral" && <ReferralNetwork onOpen={setDrawer} />}
        {active === "subib" && <SubIB />}
        {active === "portfolio" && <Portfolio />}
        {active === "revenue" && <RevenueAnalytics />}
        {active === "payments" && <PaymentHistory />}
        {active === "adjustments" && <Adjustments />}
        {active === "marketing" && <Marketing />}
        {active === "compliance" && <Compliance />}
        {active === "monitoring" && <Monitoring />}
        {active === "restrictions" && <Restrictions />}
        {active === "timeline" && <Timeline />}
        {active === "notes" && <Notes />}
        {active === "actions" && <AdminActions />}
        {active === "audit" && <Audit />}
      </div>

      {drawer && <ClientDrawer client={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}

/* ---------------- sections ---------------- */

function Summary() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Kpi label="Partner Tier" value="Gold IB" sub="Tier 3 of 6" tone="amber" />
        <Kpi label="Partner Status" value="Active" sub="Since 02 Jun 2022" tone="green" />
        <Kpi label="Total Referrals" value="147" sub="38 active · 109 total" />
        <Kpi label="Active Clients" value="38" sub="26% activation rate" />
        <Kpi label="Total Deposits" value="$284,000" sub="From referred clients" tone="blue" />
        <Kpi label="Trading Volume" value="2,840 lots" sub="Lifetime IB network" />
        <Kpi label="Commission Earned" value="$8,924" sub="Plan B — $8/lot" tone="green" />
        <Kpi label="Pending Commission" value="$1,240" sub="Due 01 Jun 2026" tone="amber" />
        <Kpi label="Sub-IB Count" value="6" sub="2 active downlines" />
        <Kpi label="Risk Level" value="Medium" sub="Score 47/100" tone="amber" />
        <Kpi label="Total Trading Volume" value="82,000 Lots" sub="Lifetime example" />
        <Kpi label="Lifetime Commission" value="$120,000" sub="Inception to date" tone="green" />
      </div>
    </>
  );
}

function Profile() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Section title="Partner Identity">
        <KV k="Partner ID" v={PARTNER.id} />
        <KV k="Partner Code" v={PARTNER.code} />
        <KV k="Full Name" v={PARTNER.name} />
        <KV k="Company Name" v={PARTNER.company} />
        <KV k="Partner Type" v={PARTNER.type} />
        <KV k="Registration Date" v={PARTNER.registered} />
        <KV k="Country" v={PARTNER.country} />
        <KV k="Email" v={PARTNER.email} />
        <KV k="Phone" v={PARTNER.phone} />
        <KV k="Assigned Manager" v={PARTNER.manager} />
        <KV k="Upline IB" v={PARTNER.upline} />
        <KV k="Status" v={<Pill tone="green">Active</Pill>} />
      </Section>
      <Section title="Referral Links">
        <KV k="Referral Link" v={PARTNER.referralLink} />
        <KV k="Landing Page" v={PARTNER.landing} />
        <KV k="UTM Source" v={PARTNER.utm} />
        <KV k="Tracking ID" v={PARTNER.trackingId} />
        <KV k="Total Clicks" v={PARTNER.clicks.toLocaleString()} />
        <KV k="Registrations" v={PARTNER.regs} />
        <KV k="Conversion Rate" v={PARTNER.conversion} tone="green" />
        <div className="mt-3 flex gap-2"><Btn variant="outline" onClick={() => toast.success("Link copied")}>Copy Link</Btn></div>
      </Section>
      <Section title="QR Code">
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="grid h-44 w-44 grid-cols-8 grid-rows-8 gap-px rounded-lg border border-gray-200 bg-white p-2">
            {Array.from({length:64}).map((_,i)=>(
              <div key={i} className={Math.random()>0.5?"bg-gray-900":"bg-white"} />
            ))}
          </div>
          <div className="text-xs text-gray-500">{PARTNER.referralLink}</div>
          <Btn variant="outline" onClick={()=>toast.success("QR downloaded")}>Download QR</Btn>
        </div>
      </Section>

      <Section title="Partner Types" className="lg:col-span-3">
        <div className="flex flex-wrap gap-2">
          {["Individual IB","Corporate IB","Affiliate","Money Manager","White Label","Regional Partner"].map(t=>(
            <Pill key={t} tone={t===PARTNER.type?"violet":"gray"}>{t}</Pill>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TierStatus() {
  const tiers = [
    { name:"Starter", rate:"$2/lot", feat:"Basic features" },
    { name:"Silver", rate:"$5/lot", feat:"Campaign access" },
    { name:"Gold", rate:"$8/lot", feat:"Sub-IB + campaigns", current:true },
    { name:"Platinum", rate:"$12/lot", feat:"Custom plan" },
    { name:"Diamond", rate:"$16/lot", feat:"+ RevShare" },
    { name:"VIP Partner", rate:"Hybrid", feat:"Custom agreement" },
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Status & Tier">
        <KV k="Current Tier" v={<Pill tone="amber">Gold IB</Pill>} />
        <KV k="Previous Tier" v="Silver IB" />
        <KV k="Tier Since" v="14 Mar 2024" />
        <KV k="Next Tier" v="Platinum (need 200 active clients)" />
        <KV k="Tier Benefits" v="Sub-IB + campaigns + dedicated manager" />
        <KV k="Dedicated Manager" v="Priya Nair" />
        <KV k="Activation Date" v="02 Jun 2022" />
        <KV k="Account Manager" v="priya_nair" />
      </Section>
      <Section title="IB Tier Ladder">
        <div className="space-y-2">
          {tiers.map(t=>(
            <div key={t.name} className={`flex items-center justify-between rounded-md border p-3 text-sm ${t.current?"border-amber-300 bg-amber-50":"border-gray-200"}`}>
              <div className="flex items-center gap-2"><span className="font-medium">{t.name}</span>{t.current && <Pill tone="amber">← Current</Pill>}</div>
              <div className="text-gray-600">{t.rate} · {t.feat}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function RiskProfile() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Section title="Risk Scores">
        <KV k="Risk Score" v="47 / 100" tone="amber" />
        <KV k="Risk Level" v={<Pill tone="amber">Medium</Pill>} />
        <KV k="Referral Quality Score" v="72 / 100" tone="green" />
        <KV k="Partner Health Score" v="81 / 100" tone="green" />
        <KV k="Last Risk Review" v="08 May 2026" />
        <KV k="Next Review" v="08 Aug 2026" />
      </Section>
      <Section title="Risk Levels">
        {["Low","Medium","High","Critical"].map(l=>(
          <div key={l} className="flex items-center justify-between border-b border-gray-100 py-2 last:border-0">
            <span className="text-sm">{l}</span>
            <Pill tone={l==="Low"?"green":l==="Medium"?"amber":"red"}>{l==="Medium"?"Current":"—"}</Pill>
          </div>
        ))}
      </Section>
      <Section title="Active Alerts">
        <div className="space-y-2 text-sm">
          <div className="rounded-md bg-amber-50 p-2 text-amber-700">⚠ Elevated chargeback ratio (1.4%)</div>
          <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">✓ No fake-leads detected last 30d</div>
        </div>
      </Section>
    </div>
  );
}

function CommissionProfile() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Commission Profile">
        <KV k="Commission Type" v="Hybrid" />
        <KV k="CPA Rate" v="$500" />
        <KV k="Revenue Share" v="20%" />
        <KV k="Hybrid Plan" v="Plan B — $8/lot + 20% RevShare" />
        <KV k="Commission Currency" v="USD" />
        <KV k="Payment Frequency" v="Monthly" />
        <KV k="Minimum Payout" v="$100" />
      </Section>
      <Section title="Earnings Summary">
        <KV k="Total Earned (Lifetime)" v="$8,924" tone="green" />
        <KV k="This Month" v="$2,180" tone="green" />
        <KV k="Last Month" v="$1,940" />
        <KV k="Pending Payout" v="$1,240" tone="amber" />
        <KV k="Next Payment" v="01 Jun 2026" />
      </Section>
    </div>
  );
}

const REFERRED = [
  { id:"CLT-1041", name:"Mohammed Al-Rashid", country:"AE", status:"Active", dep:"$245,000", vol:"12,400 lots", rev:"$18,200" },
  { id:"CLT-1037", name:"Emma Richardson", country:"GB", status:"Active", dep:"$128,000", vol:"8,210 lots", rev:"$9,840" },
  { id:"CLT-1029", name:"Rahul Mehta", country:"IN", status:"Active", dep:"$54,000", vol:"3,870 lots", rev:"$4,120" },
  { id:"CLT-1022", name:"Lena Fischer", country:"DE", status:"Dormant", dep:"$12,500", vol:"410 lots", rev:"$620" },
  { id:"CLT-1018", name:"Kevin Tan", country:"SG", status:"Active", dep:"$87,000", vol:"5,640 lots", rev:"$6,780" },
  { id:"CLT-1014", name:"Sara Johansson", country:"SE", status:"Restricted", dep:"$31,000", vol:"890 lots", rev:"$1,040" },
  { id:"CLT-1011", name:"James Whitford", country:"US", status:"Active", dep:"$48,200", vol:"2,840 lots", rev:"$3,120" },
];

function ReferralNetwork({ onOpen }: { onOpen: (c: { id: string; name: string }) => void }) {
  return (
    <Section title="Direct Referral Network" subtitle="Click any row to open client drawer" action={<Btn variant="outline" onClick={()=>toast.success("Exported")}>Export</Btn>}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
            <tr>{["Client ID","Name","Country","Status","Deposits","Volume","Revenue",""].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {REFERRED.map(c=>(
              <tr key={c.id} onClick={()=>onOpen({id:c.id, name:c.name})} className="cursor-pointer border-b border-gray-100 hover:bg-gray-50">
                <td className="px-3 py-2 font-mono text-xs text-gray-600">{c.id}</td>
                <td className="px-3 py-2 font-medium">{c.name}</td>
                <td className="px-3 py-2 text-gray-600">{c.country}</td>
                <td className="px-3 py-2"><Pill tone={c.status==="Active"?"green":c.status==="Dormant"?"amber":"red"}>{c.status}</Pill></td>
                <td className="px-3 py-2">{c.dep}</td>
                <td className="px-3 py-2">{c.vol}</td>
                <td className="px-3 py-2 font-medium text-emerald-600">{c.rev}</td>
                <td className="px-3 py-2 text-right text-gray-400">→</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function SubIB() {
  const subs = [
    { id:"IB-00501", name:"Vikram Singh", clients:18, vol:"640 lots", comm:"$1,840", status:"Active" },
    { id:"IB-00502", name:"Anita Desai", clients:9, vol:"212 lots", comm:"$620", status:"Active" },
    { id:"IB-00510", name:"Karthik R", clients:4, vol:"88 lots", comm:"$240", status:"Inactive" },
  ];
  return (
    <Section title="Sub-IB Network" subtitle="Downline IBs registered under this partner">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["Sub-IB ID","Name","Clients","Volume","Commission","Status"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {subs.map(s=>(
            <tr key={s.id} className="border-b border-gray-100">
              <td className="px-3 py-2 font-mono text-xs">{s.id}</td>
              <td className="px-3 py-2">{s.name}</td>
              <td className="px-3 py-2">{s.clients}</td>
              <td className="px-3 py-2">{s.vol}</td>
              <td className="px-3 py-2 text-emerald-600">{s.comm}</td>
              <td className="px-3 py-2"><Pill tone={s.status==="Active"?"green":"gray"}>{s.status}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function Portfolio() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Kpi label="Total Clients" value="147" />
      <Kpi label="Active Clients" value="38" tone="green" />
      <Kpi label="Dormant Clients" value="19" tone="amber" />
      <Kpi label="VIP Clients" value="6" tone="violet" />
      <Kpi label="Funded Clients" value="92" />
      <Kpi label="Retention Rate" value="68%" tone="green" />
      <Kpi label="Churn Rate" value="12%" tone="amber" />
      <Kpi label="Avg Deposit / Client" value="$1,930" />
    </div>
  );
}

function RevenueAnalytics() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Revenue Metrics">
        <KV k="Monthly Revenue" v="$2,180" tone="green" />
        <KV k="Total Revenue" v="$8,924" tone="green" />
        <KV k="Revenue Per Client" v="$60.7" />
        <KV k="Revenue Per Lot" v="$3.14" />
        <KV k="Best Month" v="$3,120 (Apr 2026)" />
        <KV k="Growth (MoM)" v="+12%" tone="green" />
      </Section>
      <Section title="Monthly Trend (last 6)">
        <div className="flex items-end gap-2 h-40">
          {[1200,1640,1820,1940,2180,3120].map((v,i)=>(
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full rounded-t bg-gradient-to-t from-emerald-500 to-emerald-300" style={{height:`${(v/3120)*100}%`}}/>
              <div className="text-[10px] text-gray-500">M{i+1}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function PaymentHistory() {
  const pays = [
    { id:"PAY-7821", amount:"$2,180", method:"Bank Wire", currency:"USD", date:"01 May 2026", status:"Paid" },
    { id:"PAY-7740", amount:"$1,940", method:"Bank Wire", currency:"USD", date:"01 Apr 2026", status:"Paid" },
    { id:"PAY-7651", amount:"$1,640", method:"Crypto USDT", currency:"USDT", date:"01 Mar 2026", status:"Paid" },
    { id:"PAY-7900", amount:"$1,240", method:"Bank Wire", currency:"USD", date:"01 Jun 2026", status:"Pending" },
  ];
  return (
    <Section title="Payment History">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["Payment ID","Amount","Method","Currency","Date","Status"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {pays.map(p=>(
            <tr key={p.id} className="border-b border-gray-100">
              <td className="px-3 py-2 font-mono text-xs">{p.id}</td>
              <td className="px-3 py-2 font-medium">{p.amount}</td>
              <td className="px-3 py-2">{p.method}</td>
              <td className="px-3 py-2">{p.currency}</td>
              <td className="px-3 py-2">{p.date}</td>
              <td className="px-3 py-2"><Pill tone={p.status==="Paid"?"green":p.status==="Pending"?"amber":"red"}>{p.status}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Pending","Approved","Paid","Rejected","Cancelled"].map(s=><Pill key={s} tone="gray">{s}</Pill>)}
      </div>
    </Section>
  );
}

function Adjustments() {
  const adj = [
    { id:"ADJ-201", amount:"+$120", reason:"Manual Bonus", by:"Priya Nair", date:"12 May 2026" },
    { id:"ADJ-198", amount:"-$80", reason:"Fraud Reversal", by:"Compliance", date:"03 May 2026" },
    { id:"ADJ-190", amount:"+$45", reason:"Commission Correction", by:"Finance", date:"28 Apr 2026" },
  ];
  return (
    <Section title="Commission Adjustments">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["ID","Amount","Reason","Changed By","Date"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {adj.map(a=>(
            <tr key={a.id} className="border-b border-gray-100">
              <td className="px-3 py-2 font-mono text-xs">{a.id}</td>
              <td className={`px-3 py-2 font-medium ${a.amount.startsWith("+")?"text-emerald-600":"text-rose-600"}`}>{a.amount}</td>
              <td className="px-3 py-2">{a.reason}</td>
              <td className="px-3 py-2">{a.by}</td>
              <td className="px-3 py-2">{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 text-xs text-gray-500">Reasons: Commission Correction · Fraud Reversal · Duplicate Payment · Manual Bonus · Manager Override</div>
    </Section>
  );
}

function Marketing() {
  const items = [
    { name:"Referral Link", status:"Active", target:"All", clicks:"4,820" },
    { name:"WhatsApp Template", status:"Approved", target:"Active traders", clicks:"38 (52.8%)" },
    { name:"Email Template", status:"Available", target:"—", clicks:"—" },
    { name:"Landing Page", status:"Active", target:"Cold leads", clicks:"1,240" },
    { name:"Banner Pack", status:"Available", target:"Web", clicks:"—" },
  ];
  return (
    <Section title="Marketing Resources">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["Resource","Status","Target","Engagement"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {items.map(i=>(
            <tr key={i.name} className="border-b border-gray-100">
              <td className="px-3 py-2">{i.name}</td>
              <td className="px-3 py-2"><Pill tone={i.status==="Active"||i.status==="Approved"?"green":"gray"}>{i.status}</Pill></td>
              <td className="px-3 py-2">{i.target}</td>
              <td className="px-3 py-2">{i.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <KV k="Campaign Access" v="Enabled (Gold tier)" tone="green" />
    </Section>
  );
}

function Compliance() {
  return (
    <Section title="Compliance Review">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <KV k="KYC Status" v={<Pill tone="green">Approved</Pill>} />
          <KV k="AML Review" v={<Pill tone="green">Clear</Pill>} />
          <KV k="Sanctions Check" v={<Pill tone="green">Pass</Pill>} />
          <KV k="PEP Review" v={<Pill tone="green">Negative</Pill>} />
        </div>
        <div>
          <KV k="Contract Status" v={<Pill tone="green">Signed</Pill>} />
          <KV k="Tax Documents" v={<Pill tone="green">On File</Pill>} />
          <KV k="Last Compliance Review" v="08 May 2026" />
          <KV k="Compliance Officer" v="Rajan Mehta" />
        </div>
      </div>
    </Section>
  );
}

function Monitoring() {
  const alerts = [
    { name:"Referral Fraud", active:false },
    { name:"Fake Leads", active:false },
    { name:"Self Referral", active:false },
    { name:"Bonus Abuse", active:true },
    { name:"Multi Accounting", active:false },
    { name:"Chargeback Risk", active:true },
  ];
  return (
    <Section title="Risk Monitoring">
      <div className="grid gap-2 md:grid-cols-2">
        {alerts.map(a=>(
          <div key={a.name} className={`flex items-center justify-between rounded-md border p-3 text-sm ${a.active?"border-rose-200 bg-rose-50":"border-gray-200"}`}>
            <span>{a.name}</span>
            <Pill tone={a.active?"red":"green"}>{a.active?"Active":"No flags"}</Pill>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Restrictions() {
  const rs = [
    { name:"Commission Hold", status:"Not active", reason:"—", by:"—" },
    { name:"Payment Hold", status:"Not active", reason:"—", by:"—" },
    { name:"Referral Lock", status:"Not active", reason:"—", by:"—" },
    { name:"Sub-IB Creation Disabled", status:"Not active", reason:"—", by:"—" },
    { name:"Partner Suspended", status:"Not active", reason:"—", by:"—" },
    { name:"Campaign Access Disabled", status:"Not active", reason:"—", by:"—" },
  ];
  return (
    <Section title="Restrictions & Controls">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["Restriction","Status","Reason","Applied By","Action"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rs.map(r=>(
            <tr key={r.name} className="border-b border-gray-100">
              <td className="px-3 py-2">{r.name}</td>
              <td className="px-3 py-2 text-gray-500">{r.status}</td>
              <td className="px-3 py-2 text-gray-500">{r.reason}</td>
              <td className="px-3 py-2 text-gray-500">{r.by}</td>
              <td className="px-3 py-2"><Btn variant="outline" onClick={()=>toast(`Hold applied to ${r.name}`)}>Hold</Btn></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function Timeline() {
  const events = [
    { d:"02 Jun 2022", t:"Partner registered", note:"Onboarded via web form" },
    { d:"14 Mar 2024", t:"Upgraded to Gold tier", note:"50 active clients milestone reached" },
    { d:"08 May 2026", t:"Compliance review passed", note:"Officer: Rajan Mehta" },
    { d:"01 May 2026", t:"$2,180 commission paid — Apr 2026", note:"272 lots · Plan B" },
    { d:"18 May 2026", t:"New sub-IB registered", note:"IB-00510 Karthik R" },
  ];
  return (
    <Section title="Timeline">
      <ol className="space-y-3">
        {events.map((e,i)=>(
          <li key={i} className="flex gap-3">
            <div className="flex flex-col items-center"><div className="h-2 w-2 rounded-full bg-gray-900 mt-1.5"/><div className="w-px flex-1 bg-gray-200"/></div>
            <div className="pb-3">
              <div className="text-xs text-gray-500">{e.d}</div>
              <div className="text-sm font-medium">{e.t}</div>
              <div className="text-xs text-gray-500">{e.note}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Notes() {
  const notes = [
    { tag:"VIP Partner", text:"Strategic partner — extend custom plan after Q2 review.", by:"Priya Nair", at:"12 May 2026" },
    { tag:"High Performing IB", text:"Consistent monthly growth >10%.", by:"Finance", at:"02 May 2026" },
    { tag:"Requires Custom Commission", text:"Renegotiation pending.", by:"Manager", at:"28 Apr 2026" },
    { tag:"Under Compliance Review", text:"Annual KYC refresh scheduled.", by:"Rajan Mehta", at:"08 May 2026" },
  ];
  return (
    <Section title="Notes" action={<Btn onClick={()=>toast.success("Note added")}>+ Note</Btn>}>
      <div className="space-y-2">
        {notes.map((n,i)=>(
          <div key={i} className="rounded-md border border-gray-200 p-3">
            <div className="flex items-center justify-between"><Pill tone="violet">{n.tag}</Pill><span className="text-xs text-gray-500">{n.by} · {n.at}</span></div>
            <div className="mt-1 text-sm text-gray-700">{n.text}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AdminActions() {
  const group = (title:string, items:string[], variant:"default"|"outline"|"danger" = "outline") => (
    <Section title={title}>
      <div className="flex flex-wrap gap-2">
        {items.map(i=><Btn key={i} variant={variant} onClick={()=>toast(`${i} requested`)}>{i}</Btn>)}
      </div>
    </Section>
  );
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {group("Safe Actions", ["View Profile","Notify Partner","Export Report","Add Note"], "outline")}
      {group("Moderate Actions", ["Change Tier","Assign Manager","Adjust Commission","Enable Campaign","Update Commission Profile"], "default")}
      {group("Dangerous Actions", ["Suspend Partner","Hold Commission","Disable Referrals","Disable Sub-IB Creation","Terminate Partnership"], "danger")}
      <Section title="Permissions & Confirmation" className="lg:col-span-3">
        <div className="text-xs text-gray-500">Dangerous actions require: permission · confirmation · reason · audit log entry.</div>
      </Section>
    </div>
  );
}

function Audit() {
  const rows = [
    { a:"Tier changed Silver → Gold", by:"System", at:"14 Mar 2024 11:02", ip:"10.0.0.4" },
    { a:"Commission plan updated to Plan B", by:"Priya Nair", at:"04 Apr 2024 16:21", ip:"10.0.4.21" },
    { a:"Payment PAY-7821 marked Paid", by:"Finance Bot", at:"01 May 2026 09:00", ip:"10.0.0.2" },
    { a:"Note added: Under Compliance Review", by:"Rajan Mehta", at:"08 May 2026 12:14", ip:"10.0.4.55" },
    { a:"Restriction reviewed — none active", by:"Compliance", at:"08 May 2026 12:30", ip:"10.0.4.55" },
  ];
  return (
    <Section title="Audit Trail" action={<Btn variant="outline" onClick={()=>toast.success("Exported")}>Export</Btn>}>
      <table className="w-full text-sm">
        <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
          <tr>{["Action","By","Time","IP"].map(h=><th key={h} className="px-3 py-2 font-medium">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r,i)=>(
            <tr key={i} className="border-b border-gray-100"><td className="px-3 py-2">{r.a}</td><td className="px-3 py-2">{r.by}</td><td className="px-3 py-2 text-gray-500">{r.at}</td><td className="px-3 py-2 font-mono text-xs text-gray-500">{r.ip}</td></tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

/* ---------------- client drawer ---------------- */

function ClientDrawer({ client, onClose }: { client: { id:string; name:string }; onClose: ()=>void }) {
  const [tab, setTab] = useState<"overview"|"trading"|"financial"|"risk"|"timeline"|"actions">("overview");
  const tabs: { k: typeof tab; l: string }[] = [
    { k:"overview", l:"Overview" },{ k:"trading", l:"Trading" },{ k:"financial", l:"Financial" },
    { k:"risk", l:"Risk" },{ k:"timeline", l:"Timeline" },{ k:"actions", l:"Actions" },
  ];
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose}/>
      <div className="flex h-full w-full max-w-xl flex-col border-l border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs text-gray-500">{client.id}</div>
              <div className="text-lg font-semibold">{client.name}</div>
              <div className="mt-2 flex gap-1"><Pill tone="violet">VIP</Pill><Pill tone="green">Active</Pill><Pill tone="green">Low risk</Pill></div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700">✕</button>
          </div>
          <div className="mt-3 flex gap-1 overflow-x-auto">
            {tabs.map(t=>(
              <button key={t.k} onClick={()=>setTab(t.k)} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${tab===t.k?"bg-gray-900 text-white":"text-gray-600 hover:bg-gray-100"}`}>{t.l}</button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {tab==="overview" && (<><KV k="Total Volume" v="2,840 lots" /><KV k="Active Positions" v="4" /><KV k="Preferred Instrument" v="EUR/USD" /><KV k="Avg Trade Size" v="0.8 lots" /><KV k="Win Rate" v="58%" tone="green"/></>)}
          {tab==="trading" && (<><KV k="Total Lots" v="2,840" /><KV k="Total Trades" v="284" /><KV k="Win Rate" v="58%" tone="green" /><KV k="Avg Trade Size" v="0.8 lots" /><KV k="Best Month" v="$4,200 (Mar)" /><KV k="Instruments" v="EURUSD, XAUUSD, WTI" /><KV k="Copy Trading" v="No" /><KV k="Last Trade" v="Today" /></>)}
          {tab==="financial" && (<><KV k="Total Deposits" v="$48,200" tone="green" /><KV k="Revenue Generated" v="$3,120" tone="green" /><KV k="Commission Earned" v="$3,120" /><KV k="Last Deposit" v="14 May 2026" /><KV k="Bonus Used" v="$0" /></>)}
          {tab==="risk" && (<><KV k="Risk Level" v={<Pill tone="green">Low</Pill>} /><KV k="AML Status" v={<Pill tone="green">Clear</Pill>} /><KV k="KYC Status" v={<Pill tone="green">Approved</Pill>} /><KV k="Chargebacks" v="0" /></>)}
          {tab==="timeline" && (<ol className="space-y-2 text-sm"><li>• Registered 14 Jan 2024</li><li>• First deposit $5,000 — 20 Jan 2024</li><li>• Upgraded VIP — 02 Mar 2025</li><li>• Last trade — today</li></ol>)}
          {tab==="actions" && (<div className="space-y-2"><Btn variant="outline" onClick={()=>toast("Opening full profile")}>Open Full Profile</Btn><Btn variant="outline" onClick={()=>toast("Note added")}>Add Note</Btn><Btn variant="danger" onClick={()=>toast.error("Client restricted")}>Restrict Client</Btn></div>)}
        </div>
      </div>
    </div>
  );
}
