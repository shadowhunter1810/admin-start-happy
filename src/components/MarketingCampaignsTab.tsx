import { useState, type ReactNode } from "react";

/* ---------- local atoms (mirroring page style) ---------- */
type Tone = "neutral" | "success" | "warning" | "info" | "critical" | "brand";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-white/5 text-muted-foreground ring-border",
  success: "bg-[oklch(0.74_0.16_155/0.12)] text-[oklch(0.84_0.16_155)] ring-[oklch(0.74_0.16_155/0.35)]",
  warning: "bg-[oklch(0.80_0.16_75/0.12)] text-[oklch(0.88_0.16_75)] ring-[oklch(0.80_0.16_75/0.35)]",
  info:    "bg-[oklch(0.70_0.14_240/0.12)] text-[oklch(0.82_0.14_240)] ring-[oklch(0.70_0.14_240/0.35)]",
  critical:"bg-[oklch(0.65_0.24_22/0.15)] text-[oklch(0.82_0.20_22)] ring-[oklch(0.65_0.24_22/0.40)]",
  brand:   "bg-[oklch(0.72_0.16_168/0.12)] text-[oklch(0.84_0.16_168)] ring-[oklch(0.72_0.16_168/0.35)]",
};

function Pill({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${toneClasses[tone]}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title, action }: { kicker?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        {kicker && <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{kicker}</div>}
        <h3 className="mt-0.5 text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function KpiTile({ label, value, sub, tone = "neutral" }: { label: string; value: ReactNode; sub?: string; tone?: Tone }) {
  const borderTone: Record<Tone, string> = {
    neutral: "border-border", success: "border-[oklch(0.74_0.16_155/0.4)]", warning: "border-[oklch(0.80_0.16_75/0.4)]",
    info: "border-[oklch(0.70_0.14_240/0.4)]", critical: "border-[oklch(0.65_0.24_22/0.5)]", brand: "border-[oklch(0.72_0.16_168/0.4)]",
  };
  return (
    <div className={`rounded-xl border ${borderTone[tone]} bg-card/50 p-4`}>
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground">{value}</div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

/* ---------- data ---------- */

const SUB_TABS = [
  { id: "summary", label: "Summary" },
  { id: "attribution", label: "Attribution" },
  { id: "campaigns", label: "Campaigns" },
  { id: "utm", label: "UTM Tracking" },
  { id: "promos", label: "Promotions & Bonuses" },
  { id: "referral", label: "Referral" },
  { id: "email", label: "Email" },
  { id: "sms", label: "SMS & Push" },
  { id: "performance", label: "Performance" },
  { id: "funnel", label: "Conversion Funnel" },
  { id: "eligibility", label: "Eligibility" },
  { id: "timeline", label: "Timeline & Audit" },
] as const;
type SubId = typeof SUB_TABS[number]["id"];

const CAMPAIGNS = [
  { id: "CAMP-2026-018", name: "May Deposit Promo", type: "Deposit bonus", joined: "09 May 2026", status: "Active", deposits: "$2,000", revenue: "$0", tone: "success" as Tone },
  { id: "CAMP-2026-004", name: "Ramadan Promotion", type: "Cashback", joined: "01 Apr 2026", status: "Active", deposits: "$4,200", revenue: "$480", tone: "success" as Tone },
  { id: "CAMP-2024-088", name: "VIP Deposit Campaign", type: "VIP exclusive", joined: "Jan 2024", status: "Completed", deposits: "$18,000", revenue: "$2,100", tone: "neutral" as Tone },
  { id: "CAMP-2022-001", name: "Gold Trading 2022", type: "Acquisition", joined: "14 Mar 2022", status: "Completed", deposits: "$5,000", revenue: "$8,200", tone: "neutral" as Tone },
];

const UTM_ROWS = [
  { camp: "gold-trading-2022", source: "google", medium: "cpc", clicks: 820, regs: 28, deps: "$18K", rev: "$2,100", roi: "+210%" },
  { camp: "vip-deposit-2024", source: "email", medium: "newsletter", clicks: 540, regs: 18, deps: "$22K", rev: "$2,800", roi: "+260%" },
  { camp: "ramadan-promo-2026", source: "whatsapp", medium: "social", clicks: 220, regs: 12, deps: "$4K", rev: "$480", roi: "+48%" },
];

const BONUSES = [
  { id: "BON-9981", camp: "May Deposit Promo", type: "Deposit 50%", amount: "$500", status: "Active", granted: "09 May 2026", expiry: "09 Jun 2026", roi: "+120%" },
  { id: "BON-9842", camp: "Ramadan Promotion", type: "Cashback", amount: "$210", status: "Used", granted: "01 Apr 2026", expiry: "01 May 2026", roi: "+95%" },
  { id: "BON-7741", camp: "VIP Deposit Campaign", type: "Bonus credit", amount: "$1,500", status: "Expired", granted: "Jan 2024", expiry: "Feb 2024", roi: "+180%" },
  { id: "BON-3320", camp: "Gold Trading 2022", type: "Welcome", amount: "$100", status: "Used", granted: "14 Mar 2022", expiry: "—", roi: "+220%" },
];

const EMAIL_ROWS = [
  { camp: "VIP Offer · May", sent: "09 May", opened: "Yes", clicked: "Yes", status: "Converted", tone: "success" as Tone },
  { camp: "Market Update Weekly", sent: "06 May", opened: "Yes", clicked: "Yes", status: "Clicked", tone: "info" as Tone },
  { camp: "Ramadan Cashback", sent: "01 Apr", opened: "Yes", clicked: "No", status: "Opened", tone: "warning" as Tone },
  { camp: "Quarterly Recap", sent: "01 Apr", opened: "No", clicked: "No", status: "Not opened", tone: "neutral" as Tone },
];

const SMS_ROWS = [
  { camp: "May Promo SMS", sent: "09 May 09:12", channel: "SMS", action: "Clicked link" },
  { camp: "Margin Alert Push", sent: "08 May 14:40", channel: "Push", action: "Opened app" },
  { camp: "Ramadan WhatsApp", sent: "01 Apr 10:00", channel: "WhatsApp", action: "Replied" },
];

const TIMELINE = [
  { t: "09:10", e: "Registered via Google Ad", tone: "info" as Tone },
  { t: "09:15", e: "Campaign assigned · Gold Trading 2022", tone: "brand" as Tone },
  { t: "09:20", e: "KYC approved", tone: "success" as Tone },
  { t: "11:30", e: "Bonus granted · BON-9981", tone: "success" as Tone },
  { t: "15:10", e: "Reward revoked by Compliance", tone: "critical" as Tone },
];

const AUDIT = [
  { action: "Campaign assigned", old: "—", neu: "May Deposit Promo", by: "M. Khan", role: "Marketing", ts: "09 May 09:15" },
  { action: "Bonus granted", old: "—", neu: "$500", by: "System", role: "Auto", ts: "09 May 11:30" },
  { action: "Reward revoked", old: "$210", neu: "$0", by: "S. Patel", role: "Compliance", ts: "12 May 15:10" },
];

/* ---------- main ---------- */

export function MarketingCampaignsTab() {
  const [sub, setSub] = useState<SubId>("summary");

  return (
    <div className="space-y-6">
      {/* sub-tabs */}
      <Card className="p-2">
        <div className="flex flex-wrap gap-1">
          {SUB_TABS.map((s) => {
            const active = s.id === sub;
            return (
              <button
                key={s.id}
                onClick={() => setSub(s.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${active ? "bg-[oklch(0.72_0.16_168/0.18)] text-[oklch(0.84_0.16_168)] ring-1 ring-inset ring-[oklch(0.72_0.16_168/0.4)]" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </Card>

      {sub === "summary" && <SummarySection />}
      {sub === "attribution" && <AttributionSection />}
      {sub === "campaigns" && <CampaignsSection />}
      {sub === "utm" && <UtmSection />}
      {sub === "promos" && <PromosSection />}
      {sub === "referral" && <ReferralSection />}
      {sub === "email" && <EmailSection />}
      {sub === "sms" && <SmsSection />}
      {sub === "performance" && <PerformanceSection />}
      {sub === "funnel" && <FunnelSection />}
      {sub === "eligibility" && <EligibilitySection />}
      {sub === "timeline" && <TimelineSection />}
    </div>
  );
}

/* ---------- sections ---------- */

function SummarySection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KpiTile label="Campaigns Joined" value="12" sub="Lifetime participation" tone="brand" />
        <KpiTile label="Bonuses Received" value="4" sub="$1,250 total credited" tone="success" />
        <KpiTile label="Revenue (campaigns)" value="$8,200" sub="Attributable" tone="info" />
        <KpiTile label="Last Campaign" value="May Promo" sub="09 May 2026 · Active" tone="brand" />
        <KpiTile label="Trading Volume" value="8,500 lots" sub="Campaign-attributed" />
        <KpiTile label="Deposits (campaigns)" value="$42,000" sub="Campaign-driven" tone="success" />
        <KpiTile label="Conversion Rate" value="3.05%" sub="Leads → active" tone="info" />
        <KpiTile label="Campaign ROI" value="+420%" sub="Revenue vs cost" tone="brand" />
      </div>

      <Card className="p-5">
        <SectionTitle kicker="Marketing health" title="Channel mix · last 90 days" />
        <div className="space-y-3">
          {[
            { l: "Google Ads (CPC)", v: 42, tone: "info" as Tone },
            { l: "IB Referral",      v: 28, tone: "brand" as Tone },
            { l: "Email Newsletter", v: 14, tone: "success" as Tone },
            { l: "WhatsApp / Social",v: 10, tone: "warning" as Tone },
            { l: "Organic",          v: 6,  tone: "neutral" as Tone },
          ].map((r) => (
            <div key={r.l} className="grid grid-cols-[180px_1fr_60px] items-center gap-3 text-sm">
              <div className="text-muted-foreground">{r.l}</div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className={`h-full rounded-full ${r.tone === "info" ? "bg-[oklch(0.70_0.14_240)]" : r.tone === "brand" ? "bg-[oklch(0.72_0.16_168)]" : r.tone === "success" ? "bg-[oklch(0.74_0.16_155)]" : r.tone === "warning" ? "bg-[oklch(0.80_0.16_75)]" : "bg-white/30"}`} style={{ width: `${r.v}%` }} />
              </div>
              <div className="text-right font-mono text-xs text-foreground">{r.v}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KV({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/60 py-2 last:border-0">
      <div className="text-xs text-muted-foreground">{k}</div>
      <div className="text-right text-sm text-foreground">{v}</div>
    </div>
  );
}

function AttributionSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="p-5">
        <SectionTitle kicker="Acquisition" title="Attribution information" />
        <KV k="First touch campaign" v="Gold Trading Campaign" />
        <KV k="Last touch campaign" v="VIP Deposit Campaign" />
        <KV k="Attribution model" v="Multi-touch linear" />
        <KV k="Acquisition channel" v="Google Ads → IB referral" />
        <KV k="Registration source" v="Google CPC · 14 Mar 2022" />
        <KV k="Referral source" v="IB-00201 · Rajesh Kumar" />
        <KV k="IB source" v="IB-00412 · Arjun Raghunathan" />
        <KV k="Campaign owner" v="Marketing team" />
        <KV k="Affiliate source" v="Google Ads network" />
        <KV k="Tracking ID" v={<span className="font-mono text-xs">TRK-AR4120-G801</span>} />
      </Card>
      <Card className="p-5">
        <SectionTitle kicker="UTM" title="Parameters at registration" />
        <KV k="utm_source" v="google" />
        <KV k="utm_medium" v="cpc" />
        <KV k="utm_campaign" v="gold-trading-2022" />
        <KV k="utm_content" v="banner-300x250" />
        <KV k="utm_term" v="forex trading india" />
        <KV k="Landing page" v={<span className="font-mono text-xs">broker.com/gold-trading</span>} />
        <KV k="Device at registration" v="Chrome / Android" />
        <KV k="Country at registration" v="India · Mumbai" />
      </Card>
    </div>
  );
}

function CampaignsSection() {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Participation" title="All campaigns joined" action={<Pill tone="brand">12 total</Pill>} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-3">Campaign ID</th><th className="pb-2 pr-3">Name</th><th className="pb-2 pr-3">Type</th>
              <th className="pb-2 pr-3">Joined</th><th className="pb-2 pr-3">Status</th>
              <th className="pb-2 pr-3 text-right">Deposits</th><th className="pb-2 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {CAMPAIGNS.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02]">
                <td className="py-2.5 pr-3 font-mono text-xs text-foreground">{c.id}</td>
                <td className="py-2.5 pr-3 text-foreground">{c.name}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{c.type}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{c.joined}</td>
                <td className="py-2.5 pr-3"><Pill tone={c.tone}>{c.status}</Pill></td>
                <td className="py-2.5 pr-3 text-right font-mono text-foreground">{c.deposits}</td>
                <td className="py-2.5 text-right font-mono text-foreground">{c.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function UtmSection() {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Marketing attribution" title="UTM tracking" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-3">Campaign</th><th className="pb-2 pr-3">Source</th><th className="pb-2 pr-3">Medium</th>
              <th className="pb-2 pr-3 text-right">Clicks</th><th className="pb-2 pr-3 text-right">Regs</th>
              <th className="pb-2 pr-3 text-right">Deposits</th><th className="pb-2 pr-3 text-right">Revenue</th>
              <th className="pb-2 text-right">ROI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {UTM_ROWS.map((r) => (
              <tr key={r.camp}>
                <td className="py-2.5 pr-3 font-mono text-xs text-foreground">{r.camp}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{r.source}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{r.medium}</td>
                <td className="py-2.5 pr-3 text-right font-mono">{r.clicks}</td>
                <td className="py-2.5 pr-3 text-right font-mono">{r.regs}</td>
                <td className="py-2.5 pr-3 text-right font-mono">{r.deps}</td>
                <td className="py-2.5 pr-3 text-right font-mono">{r.rev}</td>
                <td className="py-2.5 text-right"><Pill tone="success">{r.roi}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PromosSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiTile label="Total Bonuses" value="4" sub="$1,250 credited" tone="success" />
        <KpiTile label="Active Bonuses" value="1" sub="BON-9981" tone="brand" />
        <KpiTile label="Bonus Abuse Risk" value="None" sub="Clean signals" tone="success" />
      </div>
      <Card className="p-5">
        <SectionTitle kicker="Promotions" title="Bonuses & rewards" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-3">Bonus ID</th><th className="pb-2 pr-3">Campaign</th><th className="pb-2 pr-3">Type</th>
                <th className="pb-2 pr-3 text-right">Amount</th><th className="pb-2 pr-3">Status</th>
                <th className="pb-2 pr-3">Granted</th><th className="pb-2 pr-3">Expiry</th><th className="pb-2 text-right">ROI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {BONUSES.map((b) => (
                <tr key={b.id}>
                  <td className="py-2.5 pr-3 font-mono text-xs">{b.id}</td>
                  <td className="py-2.5 pr-3">{b.camp}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{b.type}</td>
                  <td className="py-2.5 pr-3 text-right font-mono">{b.amount}</td>
                  <td className="py-2.5 pr-3"><Pill tone={b.status === "Active" ? "success" : b.status === "Used" ? "info" : "neutral"}>{b.status}</Pill></td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{b.granted}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{b.expiry}</td>
                  <td className="py-2.5 text-right font-mono text-[oklch(0.84_0.16_155)]">{b.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-5">
        <SectionTitle kicker="Fraud & abuse" title="Risk signals" />
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Bonus abuse risk", "None detected", "success"],
            ["Self referral risk", "None detected", "success"],
            ["Device sharing risk", "Low", "info"],
            ["Multi-accounting", "Clean", "success"],
          ].map(([k, v, t]) => (
            <div key={k} className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-3">
              <span className="text-sm text-muted-foreground">{k}</span>
              <Pill tone={t as Tone}>{v}</Pill>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function ReferralSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <KpiTile label="Total Referrals" value="147" tone="brand" />
        <KpiTile label="Verified Clients" value="98" sub="66.7%" tone="success" />
        <KpiTile label="Depositors" value="72" sub="73.5%" tone="info" />
        <KpiTile label="VIP Clients" value="4" sub="10.5%" tone="brand" />
      </div>
      <Card className="p-5">
        <SectionTitle kicker="Referral" title="IB Referral Program" />
        <div className="grid gap-4 md:grid-cols-3">
          <KV k="Deposits generated" v="$284,000" />
          <KV k="Trading volume" v="2,840 lots" />
          <KV k="Commission paid" v="$8,924" />
          <KV k="Active traders" v="38 (52.8%)" />
          <KV k="Self-referral detection" v={<Pill tone="success">Clean</Pill>} />
          <KV k="Referral abuse" v={<Pill tone="success">Clean</Pill>} />
        </div>
      </Card>
    </div>
  );
}

function EmailSection() {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Email" title="Email campaign history" action={<Pill tone="info">Open rate 74%</Pill>} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-3">Campaign</th><th className="pb-2 pr-3">Sent</th>
              <th className="pb-2 pr-3">Opened</th><th className="pb-2 pr-3">Clicked</th><th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {EMAIL_ROWS.map((r) => (
              <tr key={r.camp}>
                <td className="py-2.5 pr-3 text-foreground">{r.camp}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{r.sent}</td>
                <td className="py-2.5 pr-3">{r.opened}</td>
                <td className="py-2.5 pr-3">{r.clicked}</td>
                <td className="py-2.5"><Pill tone={r.tone}>{r.status}</Pill></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function SmsSection() {
  return (
    <Card className="p-5">
      <SectionTitle kicker="SMS & push" title="Mobile campaigns" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <th className="pb-2 pr-3">Campaign</th><th className="pb-2 pr-3">Sent</th>
              <th className="pb-2 pr-3">Channel</th><th className="pb-2">Action taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {SMS_ROWS.map((r) => (
              <tr key={r.camp}>
                <td className="py-2.5 pr-3 text-foreground">{r.camp}</td>
                <td className="py-2.5 pr-3 text-muted-foreground">{r.sent}</td>
                <td className="py-2.5 pr-3"><Pill tone="info">{r.channel}</Pill></td>
                <td className="py-2.5 text-foreground">{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

function PerformanceSection() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <KpiTile label="Deposits generated" value="$42,000" tone="success" />
        <KpiTile label="Revenue generated" value="$8,200" tone="brand" />
        <KpiTile label="Trading volume" value="8,500 lots" tone="info" />
        <KpiTile label="CPA" value="$24" sub="Cost per acquisition" />
        <KpiTile label="ROI" value="+420%" tone="success" />
        <KpiTile label="Lifetime value" value="$31,400" tone="brand" />
      </div>
      <Card className="p-5">
        <SectionTitle kicker="Revenue attribution" title="By campaign type" />
        {[
          { l: "Deposit bonus", v: 38 }, { l: "Cashback", v: 22 },
          { l: "VIP exclusive", v: 20 }, { l: "Acquisition", v: 14 }, { l: "Referral", v: 6 },
        ].map((r) => (
          <div key={r.l} className="grid grid-cols-[180px_1fr_60px] items-center gap-3 py-1.5 text-sm">
            <div className="text-muted-foreground">{r.l}</div>
            <div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-[oklch(0.72_0.16_168)]" style={{ width: `${r.v * 2.5}%` }} /></div>
            <div className="text-right font-mono text-xs">{r.v}%</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

function FunnelSection() {
  const steps = [
    { label: "Lead", value: 100, tone: "info" as Tone },
    { label: "Registered", value: 64, tone: "info" as Tone },
    { label: "KYC Approved", value: 52, tone: "brand" as Tone },
    { label: "Deposited", value: 38, tone: "success" as Tone },
    { label: "Traded", value: 31, tone: "success" as Tone },
    { label: "Active Client", value: 22, tone: "brand" as Tone },
    { label: "VIP Client", value: 4,  tone: "warning" as Tone },
  ];
  return (
    <Card className="p-5">
      <SectionTitle kicker="Journey" title="Conversion funnel" />
      <div className="space-y-2">
        {steps.map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <div className="w-32 text-sm text-muted-foreground">{s.label}</div>
            <div className="relative h-9 flex-1 overflow-hidden rounded-lg bg-white/5">
              <div className={`flex h-full items-center justify-end px-3 text-xs font-mono text-background ${s.tone === "info" ? "bg-[oklch(0.70_0.14_240)]" : s.tone === "brand" ? "bg-[oklch(0.72_0.16_168)]" : s.tone === "success" ? "bg-[oklch(0.74_0.16_155)]" : "bg-[oklch(0.80_0.16_75)]"}`} style={{ width: `${s.value}%` }}>{s.value}%</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function EligibilitySection() {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Restrictions" title="Eligibility checks" />
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["KYC requirement", "Approved", "success"],
          ["Deposit requirement", "Met · $250+", "success"],
          ["AML requirement", "Cleared", "success"],
          ["Region eligibility", "India · Allowed", "success"],
          ["IB excluded from bonus", "Partial · IB policy", "warning"],
          ["VIP exclusive", "Eligible", "brand"],
        ].map(([k, v, t]) => (
          <div key={k} className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-3">
            <span className="text-sm text-muted-foreground">{k}</span>
            <Pill tone={t as Tone}>{v}</Pill>
          </div>
        ))}
      </div>
    </Card>
  );
}

function TimelineSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-5">
        <SectionTitle kicker="Activity" title="Campaign timeline" />
        <ol className="relative space-y-4 border-l border-border pl-5">
          {TIMELINE.map((e, i) => (
            <li key={i} className="relative">
              <span className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-background ${e.tone === "success" ? "bg-[oklch(0.74_0.16_155)]" : e.tone === "brand" ? "bg-[oklch(0.72_0.16_168)]" : e.tone === "info" ? "bg-[oklch(0.70_0.14_240)]" : "bg-[oklch(0.65_0.24_22)]"}`} />
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-sm text-foreground">{e.e}</div>
                <div className="font-mono text-xs text-muted-foreground">{e.t}</div>
              </div>
            </li>
          ))}
        </ol>
      </Card>
      <Card className="p-5">
        <SectionTitle kicker="Audit trail" title="Recent actions" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="pb-2 pr-3">Action</th><th className="pb-2 pr-3">Old</th><th className="pb-2 pr-3">New</th>
                <th className="pb-2 pr-3">By</th><th className="pb-2">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {AUDIT.map((a, i) => (
                <tr key={i}>
                  <td className="py-2.5 pr-3 text-foreground">{a.action}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{a.old}</td>
                  <td className="py-2.5 pr-3">{a.neu}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{a.by} · {a.role}</td>
                  <td className="py-2.5 font-mono text-xs text-muted-foreground">{a.ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
