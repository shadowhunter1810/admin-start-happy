import { useState } from "react";
import {
  Activity,
  AlertTriangle,
  Award,
  BadgeCheck,
  Briefcase,
  Check,
  Copy,
  CreditCard,
  Crown,
  DollarSign,
  Download,
  Eye,
  FileText,
  Filter,
  Flag,
  Gift,
  Globe,
  History,
  Layers,
  Link as LinkIcon,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  Phone,
  PieChart,
  Plus,
  QrCode,
  Search,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Star,
  StickyNote,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  Upload,
  User,
  Users,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { KPI, Pill, Row, Section, Table, Td, Th, Progress, RiskDot, Bar } from "@/components/client/primitives";
import { toast } from "sonner";

// ───────────────────────────── MOCK DATA ─────────────────────────────

const partner = {
  id: "IB-00412",
  code: "AR4120",
  name: "Arjun Raghunathan",
  company: "AR Financial Services Pvt Ltd",
  type: "Corporate IB",
  registered: "02 Jun 2022",
  country: "India",
  email: "arjun.r@gmail.com",
  phone: "+91 98760 12345",
  manager: "Priya Nair",
  status: "Active",
  upline: "IB-00201 — Rajesh Kumar",
};

const referralLinks = {
  link: "broker.com/r/AR4120",
  landing: "broker.com/ib/ar-financial",
  utm: "google / cpc",
  tracking: "TRK-AR4120",
  clicks: "4,820",
  registrations: "147",
  conversion: "3.05%",
};

const tiers = [
  { name: "Starter", rate: "$2/lot", perks: "Basic features", icon: Star },
  { name: "Silver", rate: "$5/lot", perks: "Campaign access", icon: Award },
  { name: "Gold", rate: "$8/lot", perks: "Sub-IB + campaigns", icon: Trophy, current: true },
  { name: "Platinum", rate: "$12/lot", perks: "Custom plan", icon: Crown },
  { name: "Diamond", rate: "$16/lot", perks: "+ RevShare", icon: ShieldCheck },
  { name: "VIP Partner", rate: "Hybrid", perks: "Custom agreement", icon: BadgeCheck },
];

const referredClients = [
  { id: "CL-1041", name: "James Whitford", country: "🇬🇧 UK", status: "Active", deposits: "$48,200", volume: "284 lots", revenue: "$3,120", risk: "Low" as const, joined: "12 Aug 2023" },
  { id: "CL-1052", name: "Maria Hoffmann", country: "🇩🇪 DE", status: "Active", deposits: "$32,140", volume: "188 lots", revenue: "$1,920", risk: "Low" as const, joined: "03 Sep 2023" },
  { id: "CL-1067", name: "Kenji Watanabe", country: "🇯🇵 JP", status: "Active", deposits: "$71,400", volume: "412 lots", revenue: "$4,820", risk: "Medium" as const, joined: "18 Sep 2023" },
  { id: "CL-1082", name: "Sara Khan", country: "🇦🇪 UAE", status: "Dormant", deposits: "$8,400", volume: "12 lots", revenue: "$120", risk: "Low" as const, joined: "22 Oct 2023" },
  { id: "CL-1098", name: "Mateo Garcia", country: "🇪🇸 ES", status: "Active", deposits: "$24,800", volume: "146 lots", revenue: "$1,420", risk: "Low" as const, joined: "11 Nov 2023" },
  { id: "CL-1110", name: "Aisha Bello", country: "🇳🇬 NG", status: "KYC Pending", deposits: "$0", volume: "0 lots", revenue: "$0", risk: "Medium" as const, joined: "04 Dec 2023" },
  { id: "CL-1128", name: "Liam O'Connor", country: "🇮🇪 IE", status: "Active", deposits: "$58,900", volume: "318 lots", revenue: "$2,780", risk: "Low" as const, joined: "21 Jan 2024" },
  { id: "CL-1146", name: "Priya Iyer", country: "🇮🇳 IN", status: "VIP", deposits: "$124,000", volume: "742 lots", revenue: "$6,840", risk: "Low" as const, joined: "08 Feb 2024" },
  { id: "CL-1163", name: "Tobias Müller", country: "🇩🇪 DE", status: "Restricted", deposits: "$4,200", volume: "8 lots", revenue: "$60", risk: "High" as const, joined: "15 Feb 2024" },
  { id: "CL-1178", name: "Chen Wei", country: "🇨🇳 CN", status: "Active", deposits: "$42,800", volume: "228 lots", revenue: "$2,140", risk: "Low" as const, joined: "02 Mar 2024" },
];

const subIbs = [
  { id: "IB-00518", name: "Vikram Singh", clients: 24, volume: "618 lots", revenue: "$1,840", tier: "Silver", status: "Active" },
  { id: "IB-00531", name: "Anita Desai", clients: 18, volume: "412 lots", revenue: "$1,240", tier: "Silver", status: "Active" },
  { id: "IB-00547", name: "Rahul Mehta", clients: 11, volume: "248 lots", revenue: "$720", tier: "Starter", status: "Active" },
  { id: "IB-00562", name: "Sunita Pillai", clients: 8, volume: "184 lots", revenue: "$520", tier: "Starter", status: "Active" },
  { id: "IB-00578", name: "Karan Joshi", clients: 4, volume: "62 lots", revenue: "$180", tier: "Starter", status: "Pending" },
];

const payments = [
  { id: "PAY-2026-05", amount: "$2,180", method: "Wire", currency: "USD", period: "Apr 2026", status: "Paid", date: "01 May 2026" },
  { id: "PAY-2026-04", amount: "$1,920", method: "Wire", currency: "USD", period: "Mar 2026", status: "Paid", date: "01 Apr 2026" },
  { id: "PAY-2026-03", amount: "$2,420", method: "Crypto (USDT)", currency: "USDT", period: "Feb 2026", status: "Paid", date: "01 Mar 2026" },
  { id: "PAY-2026-02", amount: "$1,840", method: "Wire", currency: "USD", period: "Jan 2026", status: "Paid", date: "01 Feb 2026" },
  { id: "PAY-2026-06", amount: "$1,240", method: "Wire", currency: "USD", period: "May 2026", status: "Pending", date: "01 Jun 2026" },
];

const adjustments = [
  { id: "ADJ-00128", type: "Bonus", amount: "+$500", reason: "Manual Bonus — Q1 contest", by: "Priya Nair", date: "12 Apr 2026" },
  { id: "ADJ-00131", type: "Correction", amount: "+$84", reason: "Commission Correction (missed lots)", by: "Finance Bot", date: "28 Apr 2026" },
  { id: "ADJ-00134", type: "Reversal", amount: "-$120", reason: "Fraud Reversal — CL-1163", by: "Rajan Mehta", date: "08 May 2026" },
];

const restrictions = [
  { name: "Commission Hold", status: "Inactive", reason: "—", applied: "—" },
  { name: "Payment Hold", status: "Inactive", reason: "—", applied: "—" },
  { name: "Referral Lock", status: "Inactive", reason: "—", applied: "—" },
  { name: "Sub-IB Creation Disabled", status: "Inactive", reason: "—", applied: "—" },
  { name: "Campaign Access Disabled", status: "Inactive", reason: "—", applied: "—" },
];

const timeline = [
  { date: "01 May 2026", title: "$2,180 commission paid", sub: "Apr 2026 · 272 lots · Plan B", icon: DollarSign, tone: "success" as const },
  { date: "08 May 2026", title: "Last compliance review", sub: "Rajan Mehta · No issues found", icon: ShieldCheck, tone: "info" as const },
  { date: "12 Apr 2026", title: "Bonus of $500 added", sub: "Q1 partner contest winner", icon: Gift, tone: "warning" as const },
  { date: "14 Mar 2024", title: "Upgraded to Gold tier", sub: "50 active clients milestone reached", icon: Trophy, tone: "success" as const },
  { date: "22 Sep 2023", title: "Upgraded to Silver tier", sub: "10 active clients milestone", icon: Award, tone: "info" as const },
  { date: "02 Jun 2022", title: "Partner onboarded", sub: "Corporate IB · India", icon: BadgeCheck, tone: "muted" as const },
];

const auditTrail = [
  { date: "14 Jun 2026 14:22", actor: "Priya Nair", action: "Updated commission rate", from: "$7/lot", to: "$8/lot" },
  { date: "08 May 2026 09:14", actor: "Rajan Mehta", action: "Compliance review completed", from: "—", to: "Passed" },
  { date: "12 Apr 2026 18:02", actor: "Priya Nair", action: "Added bonus adjustment", from: "—", to: "+$500" },
  { date: "01 Apr 2026 03:00", actor: "Finance Bot", action: "Auto-paid commission", from: "Pending", to: "Paid" },
  { date: "14 Mar 2024 11:48", actor: "System", action: "Tier upgrade", from: "Silver", to: "Gold" },
];

const notes = [
  { tag: "VIP Partner", body: "Long-standing partner since 2022, consistently in top 5% by volume.", author: "Priya Nair", date: "14 Jun 2026", color: "warning" },
  { tag: "High Performing", body: "Activation rate 26% — well above 18% network average.", author: "Analytics", date: "02 Jun 2026", color: "success" },
  { tag: "Requires Custom Commission", body: "Discussed Platinum upgrade with bespoke RevShare. Pending finance approval.", author: "Priya Nair", date: "28 May 2026", color: "info" },
];

// ───────────────────────────── HELPERS ─────────────────────────────

function copyTxt(t: string) {
  navigator.clipboard?.writeText(t);
  toast.success("Copied to clipboard", { description: t });
}

function StatusPill({ s }: { s: string }) {
  const m: Record<string, "success" | "warning" | "destructive" | "info" | "muted"> = {
    Active: "success", VIP: "warning", Dormant: "muted", "KYC Pending": "info",
    Restricted: "destructive", Paid: "success", Pending: "warning", Rejected: "destructive",
  };
  return <Pill tone={m[s] ?? "muted"}>{s}</Pill>;
}

function ActionBtn({ icon: Icon, label, onClick, tone = "muted" }: { icon: any; label: string; onClick?: () => void; tone?: "muted" | "destructive" }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        tone === "destructive"
          ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "border-border bg-surface text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}

// ───────────────────────────── MAIN ─────────────────────────────

export default function IbPartnerTab() {
  const [section, setSection] = useState("summary");
  const [search, setSearch] = useState("");

  const sections = [
    { id: "summary", label: "Summary", icon: PieChart },
    { id: "profile", label: "Profile", icon: User },
    { id: "tier", label: "Status & Tier", icon: Trophy },
    { id: "risk", label: "Risk Profile", icon: ShieldAlert },
    { id: "commission", label: "Commission", icon: DollarSign },
    { id: "referrals", label: "Referrals", icon: Network },
    { id: "subib", label: "Sub-IB Network", icon: Users },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "revenue", label: "Revenue Analytics", icon: TrendingUp },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "adjust", label: "Adjustments", icon: Settings },
    { id: "marketing", label: "Marketing", icon: Share2 },
    { id: "compliance", label: "Compliance", icon: Shield },
    { id: "monitoring", label: "Risk Monitoring", icon: AlertTriangle },
    { id: "restrictions", label: "Restrictions", icon: Lock },
    { id: "timeline", label: "Timeline", icon: History },
    { id: "notes", label: "Notes", icon: StickyNote },
    { id: "admin", label: "Admin", icon: Zap },
    { id: "audit", label: "Audit Trail", icon: FileText },
  ];

  return (
    <div className="space-y-4">
      {/* Header card */}
      <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-warning/10 via-card to-card p-5">
        <div className="flex flex-wrap items-start gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-warning to-warning/60 text-warning-foreground shadow-lg shadow-warning/30">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">Gold IB Partner</h2>
              <Pill tone="warning">Tier 3 of 6</Pill>
              <Pill tone="success">{partner.status}</Pill>
              <Pill tone="info">{partner.type}</Pill>
              <span className="text-xs text-muted-foreground">· Since {partner.registered}</span>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {partner.id} · {partner.code} · {partner.company} · Manager <span className="font-medium text-foreground">{partner.manager}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ActionBtn icon={Mail} label="Contact" />
            <ActionBtn icon={Download} label="Export" />
            <ActionBtn icon={Settings} label="Manage" />
          </div>
        </div>
      </div>

      {/* Sub-nav */}
      <div className="-mx-1 flex items-center gap-1 overflow-x-auto pb-1">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                section === s.id
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/60 bg-surface text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* 1. SUMMARY */}
      {section === "summary" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPI label="Partner Tier" value="Gold IB" sub="Tier 3 of 6" tone="warning" icon={<Trophy className="h-4 w-4" />} />
            <KPI label="Partner Status" value={partner.status} sub={`Since ${partner.registered}`} tone="success" icon={<BadgeCheck className="h-4 w-4" />} />
            <KPI label="Total Referrals" value="147" sub="38 active · 26% activation" tone="info" icon={<Users className="h-4 w-4" />} />
            <KPI label="Active Clients" value="38" sub="26% of total" icon={<Activity className="h-4 w-4" />} />
            <KPI label="Total Deposits" value="$284,000" sub="From referred clients" icon={<Wallet className="h-4 w-4" />} />
            <KPI label="Trading Volume" value="2,840 lots" sub="Lifetime network" icon={<TrendingUp className="h-4 w-4" />} />
            <KPI label="Commission Earned" value="$8,924" sub="Plan B · $8/lot" tone="success" icon={<DollarSign className="h-4 w-4" />} />
            <KPI label="Pending Commission" value="$1,240" sub="Due 01 Jun 2026" tone="warning" icon={<History className="h-4 w-4" />} />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Section title="Performance Snapshot" icon={<PieChart className="h-3.5 w-3.5" />}>
              <Progress label="Activation rate (network)" value={26} tone="primary" />
              <Progress label="Active vs total clients" value={38 * 100 / 147} tone="success" />
              <Progress label="Sub-IB capacity used" value={(5 / 20) * 100} tone="warning" />
              <Progress label="Partner score" value={82} tone="success" />
            </Section>
            <Section title="Risk & Compliance" icon={<Shield className="h-3.5 w-3.5" />}>
              <Row label="Risk Level" value={<RiskDot level="Medium" />} />
              <Row label="Chargebacks (lifetime)" value="0" />
              <Row label="Referral Quality" value="78/100" badge={<Pill tone="success">Good</Pill>} />
              <Row label="Compliance Risk" value="Medium" badge={<Pill tone="warning">PEP</Pill>} />
              <Row label="Last review" value="08 May 2026" />
            </Section>
          </div>
        </div>
      )}

      {/* 2. PROFILE */}
      {section === "profile" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Partner Identity" icon={<User className="h-3.5 w-3.5" />}>
            <Row label="Partner ID" value={partner.id} />
            <Row label="Partner Code" value={partner.code} />
            <Row label="Full Name" value={partner.name} />
            <Row label="Company Name" value={partner.company} />
            <Row label="Partner Type" value={partner.type} badge={<Pill tone="info">Corporate</Pill>} />
            <Row label="Registration Date" value={partner.registered} />
            <Row label="Country" value={<span className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {partner.country}</span>} />
            <Row label="Email" value={<span className="inline-flex items-center gap-1.5"><Mail className="h-3 w-3" /> {partner.email}</span>} />
            <Row label="Phone" value={<span className="inline-flex items-center gap-1.5"><Phone className="h-3 w-3" /> {partner.phone}</span>} />
            <Row label="Assigned Manager" value={partner.manager} />
            <Row label="Status" value={partner.status} badge={<Pill tone="success">Verified</Pill>} />
            <Row label="Upline IB" value={partner.upline} />
          </Section>
          <Section title="Partner Referral Links" icon={<LinkIcon className="h-3.5 w-3.5" />} right={<ActionBtn icon={QrCode} label="Generate QR" />}>
            <Row label="Referral Link" value={<button onClick={() => copyTxt(referralLinks.link)} className="inline-flex items-center gap-1 text-primary hover:underline"><Copy className="h-3 w-3" />{referralLinks.link}</button>} />
            <Row label="Landing Page" value={<button onClick={() => copyTxt(referralLinks.landing)} className="inline-flex items-center gap-1 text-primary hover:underline"><Copy className="h-3 w-3" />{referralLinks.landing}</button>} />
            <Row label="UTM Source" value={referralLinks.utm} />
            <Row label="Tracking ID" value={referralLinks.tracking} />
            <Row label="Total Clicks" value={referralLinks.clicks} />
            <Row label="Registrations" value={referralLinks.registrations} />
            <Row label="Conversion Rate" value={referralLinks.conversion} badge={<Pill tone="success">Good</Pill>} />
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-border/60 bg-surface p-3">
              <div className="grid h-20 w-20 place-items-center rounded-md bg-muted">
                <QrCode className="h-12 w-12 text-foreground" />
              </div>
              <div className="flex-1 text-xs text-muted-foreground">
                <div className="font-medium text-foreground">QR Code</div>
                <div className="mt-0.5">{referralLinks.link}</div>
                <button onClick={() => toast.success("QR downloaded")} className="mt-2 inline-flex items-center gap-1 text-primary hover:underline">
                  <Download className="h-3 w-3" /> Download QR
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}

      {/* 3. STATUS & TIER */}
      {section === "tier" && (
        <div className="space-y-4">
          <Section title="Tier Status" icon={<Trophy className="h-3.5 w-3.5" />}>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Row label="Current Tier" value="Gold IB" badge={<Pill tone="warning">Active</Pill>} />
                <Row label="Previous Tier" value="Silver IB" />
                <Row label="Tier Upgrade Date" value="14 Mar 2024" />
                <Row label="Partner Score" value="82/100" />
                <Row label="Qualification Status" value="Qualified" badge={<Pill tone="success">✓</Pill>} />
              </div>
              <div className="rounded-lg border border-border/60 bg-surface p-3">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Current Tier Benefits</div>
                <ul className="space-y-1.5 text-xs">
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Commission rate $8/lot</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Sub-IB allowed — up to 20</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Priority support</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Custom campaigns</li>
                  <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> Dedicated manager — Priya Nair</li>
                </ul>
              </div>
            </div>
          </Section>
          <Section title="IB Tier Ladder" icon={<Layers className="h-3.5 w-3.5" />}>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {tiers.map((t) => {
                const Icon = t.icon;
                return (
                  <div
                    key={t.name}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      t.current ? "border-warning/50 bg-warning/10" : "border-border/60 bg-surface"
                    }`}
                  >
                    <div className={`grid h-9 w-9 place-items-center rounded-md ${t.current ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground"}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium">{t.name}</span>
                        {t.current && <Pill tone="warning">Current</Pill>}
                      </div>
                      <div className="text-[11px] text-muted-foreground">{t.rate} · {t.perks}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>
      )}

      {/* 4. RISK PROFILE */}
      {section === "risk" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Risk Evaluation" icon={<ShieldAlert className="h-3.5 w-3.5" />}>
            <Row label="Risk Score" value="34 / 100" badge={<Pill tone="warning">Medium</Pill>} />
            <Row label="Risk Level" value={<RiskDot level="Medium" />} />
            <Row label="Chargeback Risk" value="Low — 0 chargebacks lifetime" badge={<Pill tone="success">Clean</Pill>} />
            <Row label="Referral Quality Score" value="78/100 — Good" />
            <Row label="Compliance Risk" value="Medium" badge={<Pill tone="warning">PEP</Pill>} />
            <Row label="Partner Health Score" value="82/100" badge={<Pill tone="success">Healthy</Pill>} />
          </Section>
          <Section title="Risk Factors Breakdown" icon={<PieChart className="h-3.5 w-3.5" />}>
            <Progress label="Referral fraud signals" value={8} tone="success" />
            <Progress label="Self-referral suspicion" value={4} tone="success" />
            <Progress label="Bonus abuse pattern" value={12} tone="success" />
            <Progress label="Multi-accounting flags" value={22} tone="warning" />
            <Progress label="Commission manipulation" value={6} tone="success" />
            <Progress label="Compliance/PEP exposure" value={45} tone="warning" />
          </Section>
        </div>
      )}

      {/* 5. COMMISSION PROFILE */}
      {section === "commission" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Commission Profile" icon={<DollarSign className="h-3.5 w-3.5" />}>
            <Row label="Commission Type" value="Hybrid" badge={<Pill tone="info">Plan B</Pill>} />
            <Row label="CPA Rate" value="$500 per qualified client" />
            <Row label="Revenue Share" value="20%" />
            <Row label="Per-Lot Rebate" value="$8/lot" />
            <Row label="Currency" value="USD" />
            <Row label="Payment Frequency" value="Monthly" />
            <Row label="Minimum Payout" value="$100" />
            <Row label="Next Payout" value="01 Jun 2026" badge={<Pill tone="warning">7 days</Pill>} />
          </Section>
          <Section title="Earnings Summary" icon={<TrendingUp className="h-3.5 w-3.5" />}>
            <Row label="This Month" value="$1,240" badge={<Pill tone="warning">Pending</Pill>} />
            <Row label="Last Month" value="$2,180" badge={<Pill tone="success">Paid</Pill>} />
            <Row label="Quarter to Date" value="$5,420" />
            <Row label="Year to Date" value="$8,924" />
            <Row label="Lifetime Earnings" value="$24,860" />
            <Row label="Avg / Month (12M)" value="$1,940" />
            <Row label="Best Month" value="$3,420 — Dec 2025" badge={<Pill tone="success">★</Pill>} />
          </Section>
        </div>
      )}

      {/* 6. REFERRAL NETWORK */}
      {section === "referrals" && (
        <Section
          title="Direct Referral Network — Click row for client details"
          icon={<Network className="h-3.5 w-3.5" />}
          right={
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search clients…"
                  className="h-7 w-44 rounded-md border border-border bg-surface pl-7 pr-2 text-xs"
                />
              </div>
              <ActionBtn icon={Filter} label="Filter" />
              <ActionBtn icon={Download} label="Export" />
            </div>
          }
        >
          <Table>
            <thead>
              <tr>
                <Th>Client</Th>
                <Th>Country</Th>
                <Th>Status</Th>
                <Th>Joined</Th>
                <Th className="text-right">Deposits</Th>
                <Th className="text-right">Volume</Th>
                <Th className="text-right">Revenue</Th>
                <Th>Risk</Th>
                <Th>{""}</Th>
              </tr>
            </thead>
            <tbody>
              {referredClients
                .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <tr key={c.id} className="cursor-pointer transition-colors hover:bg-muted/50">
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary/30 to-chart-4/30 text-[10px] font-medium">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{c.name}</div>
                          <div className="text-[10px] text-muted-foreground">{c.id}</div>
                        </div>
                      </div>
                    </Td>
                    <Td>{c.country}</Td>
                    <Td><StatusPill s={c.status} /></Td>
                    <Td className="text-muted-foreground">{c.joined}</Td>
                    <Td className="text-right">{c.deposits}</Td>
                    <Td className="text-right">{c.volume}</Td>
                    <Td className="text-right font-medium text-success">{c.revenue}</Td>
                    <Td><RiskDot level={c.risk} /></Td>
                    <Td><button className="text-muted-foreground hover:text-foreground"><Eye className="h-3.5 w-3.5" /></button></Td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Section>
      )}

      {/* 7. SUB-IB NETWORK */}
      {section === "subib" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPI label="Sub-IB Count" value="5 / 20" sub="Capacity 25% used" tone="info" icon={<Users className="h-4 w-4" />} />
            <KPI label="Sub-IB Clients" value="65" sub="Across all sub-IBs" icon={<Network className="h-4 w-4" />} />
            <KPI label="Sub-IB Volume" value="1,524 lots" sub="Last 30 days" icon={<TrendingUp className="h-4 w-4" />} />
            <KPI label="Sub-IB Revenue" value="$4,500" sub="Your override 25%" tone="success" icon={<DollarSign className="h-4 w-4" />} />
          </div>
          <Section title="Sub-IB Partners" icon={<Network className="h-3.5 w-3.5" />} right={<ActionBtn icon={Plus} label="Add Sub-IB" onClick={() => toast.success("Sub-IB invite created")} />}>
            <Table>
              <thead>
                <tr><Th>Sub-IB</Th><Th>Tier</Th><Th>Clients</Th><Th>Volume</Th><Th>Revenue (their)</Th><Th>Status</Th><Th>{""}</Th></tr>
              </thead>
              <tbody>
                {subIbs.map((s) => (
                  <tr key={s.id} className="hover:bg-muted/40">
                    <Td>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-[10px] text-muted-foreground">{s.id}</div>
                    </Td>
                    <Td><Pill tone={s.tier === "Silver" ? "info" : "muted"}>{s.tier}</Pill></Td>
                    <Td>{s.clients}</Td>
                    <Td>{s.volume}</Td>
                    <Td className="text-success">{s.revenue}</Td>
                    <Td><StatusPill s={s.status} /></Td>
                    <Td><button className="text-muted-foreground hover:text-foreground"><Eye className="h-3.5 w-3.5" /></button></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        </div>
      )}

      {/* 8. CLIENT PORTFOLIO */}
      {section === "portfolio" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPI label="Total Clients" value="147" tone="info" icon={<Users className="h-4 w-4" />} />
            <KPI label="Active Clients" value="38" sub="26% activation" tone="success" icon={<Activity className="h-4 w-4" />} />
            <KPI label="VIP Clients" value="4" sub="2.7% of base" tone="warning" icon={<Crown className="h-4 w-4" />} />
            <KPI label="Dormant Clients" value="82" sub="90+ days inactive" icon={<History className="h-4 w-4" />} />
            <KPI label="High Risk Clients" value="3" sub="2% of total" tone="destructive" icon={<AlertTriangle className="h-4 w-4" />} />
            <KPI label="Restricted Clients" value="1" tone="destructive" icon={<Lock className="h-4 w-4" />} />
            <KPI label="KYC Pending" value="6" tone="warning" icon={<FileText className="h-4 w-4" />} />
            <KPI label="Conversion Rate" value="3.05%" sub="Click → register" tone="info" icon={<Target className="h-4 w-4" />} />
          </div>
          <Section title="Portfolio Quality Mix" icon={<PieChart className="h-3.5 w-3.5" />}>
            <Progress label="Active" value={(38 / 147) * 100} tone="success" />
            <Progress label="Dormant" value={(82 / 147) * 100} tone="warning" />
            <Progress label="VIP" value={(4 / 147) * 100} tone="primary" />
            <Progress label="High Risk" value={(3 / 147) * 100} tone="destructive" />
            <Progress label="KYC Pending" value={(6 / 147) * 100} tone="warning" />
          </Section>
        </div>
      )}

      {/* 9. REVENUE ANALYTICS */}
      {section === "revenue" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <KPI label="Monthly Revenue" value="$1,240" sub="MTD" tone="info" icon={<DollarSign className="h-4 w-4" />} />
            <KPI label="Total Revenue (YTD)" value="$8,924" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
            <KPI label="Revenue / Client" value="$60.70" sub="Network avg" icon={<User className="h-4 w-4" />} />
            <KPI label="Revenue / Lot" value="$3.14" sub="Effective rate" icon={<Layers className="h-4 w-4" />} />
            <KPI label="Lifetime Revenue" value="$24,860" tone="success" icon={<Wallet className="h-4 w-4" />} />
            <KPI label="ARPU (active)" value="$234" sub="Last 30d" tone="info" icon={<TrendingUp className="h-4 w-4" />} />
            <KPI label="Best Performing Country" value="🇮🇳 India" sub="$3,820 YTD" icon={<Globe className="h-4 w-4" />} />
            <KPI label="MoM Growth" value="+12.4%" sub="vs last month" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
          </div>
          <Section title="Revenue Trend — Last 12 Months" icon={<TrendingUp className="h-3.5 w-3.5" />}>
            <div className="flex h-32 items-end gap-1">
              {[420, 580, 640, 720, 480, 920, 1240, 1820, 2140, 2420, 1920, 2180].map((v, i) => (
                <div key={i} className="group relative flex flex-1 flex-col items-center">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-primary/40 to-primary transition-all group-hover:from-primary/60"
                    style={{ height: `${(v / 2420) * 100}%` }}
                  />
                  <div className="absolute -top-6 hidden rounded bg-popover px-1.5 py-0.5 text-[10px] shadow group-hover:block">${v}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              {["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"].map((m) => <span key={m}>{m}</span>)}
            </div>
          </Section>
        </div>
      )}

      {/* 10. PAYMENT HISTORY */}
      {section === "payments" && (
        <Section
          title="Commission Payment History"
          icon={<CreditCard className="h-3.5 w-3.5" />}
          right={<div className="flex gap-2"><ActionBtn icon={Filter} label="Filter" /><ActionBtn icon={Download} label="Export CSV" /></div>}
        >
          <Table>
            <thead>
              <tr><Th>Payment ID</Th><Th>Period</Th><Th>Method</Th><Th>Currency</Th><Th className="text-right">Amount</Th><Th>Status</Th><Th>Date</Th><Th>{""}</Th></tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-muted/40">
                  <Td className="font-medium">{p.id}</Td>
                  <Td>{p.period}</Td>
                  <Td>{p.method}</Td>
                  <Td>{p.currency}</Td>
                  <Td className="text-right font-semibold">{p.amount}</Td>
                  <Td><StatusPill s={p.status} /></Td>
                  <Td className="text-muted-foreground">{p.date}</Td>
                  <Td><button className="text-muted-foreground hover:text-foreground"><Download className="h-3.5 w-3.5" /></button></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

      {/* 11. ADJUSTMENTS */}
      {section === "adjust" && (
        <Section
          title="Commission Adjustments"
          icon={<Settings className="h-3.5 w-3.5" />}
          right={<ActionBtn icon={Plus} label="Add Adjustment" onClick={() => toast.success("Adjustment dialog opened")} />}
        >
          <Table>
            <thead>
              <tr><Th>Adjustment ID</Th><Th>Type</Th><Th className="text-right">Amount</Th><Th>Reason</Th><Th>Changed By</Th><Th>Date</Th></tr>
            </thead>
            <tbody>
              {adjustments.map((a) => (
                <tr key={a.id} className="hover:bg-muted/40">
                  <Td className="font-medium">{a.id}</Td>
                  <Td><Pill tone={a.type === "Reversal" ? "destructive" : a.type === "Bonus" ? "success" : "info"}>{a.type}</Pill></Td>
                  <Td className={`text-right font-semibold ${a.amount.startsWith("-") ? "text-destructive" : "text-success"}`}>{a.amount}</Td>
                  <Td>{a.reason}</Td>
                  <Td>{a.by}</Td>
                  <Td className="text-muted-foreground">{a.date}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="mt-3 rounded-lg border border-border/60 bg-surface p-3 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">Allowed reasons:</span> Commission Correction · Fraud Reversal · Duplicate Payment · Manual Bonus · Manager Override
          </div>
        </Section>
      )}

      {/* 12. MARKETING RESOURCES */}
      {section === "marketing" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Marketing Resources" icon={<Share2 className="h-3.5 w-3.5" />}>
            <Row label="Referral Link" value={referralLinks.link} badge={<button onClick={() => copyTxt(referralLinks.link)}><Copy className="h-3 w-3" /></button>} />
            <Row label="Tracking Link" value={referralLinks.tracking} />
            <Row label="QR Code" value="Available" badge={<Pill tone="success">PNG / SVG</Pill>} />
            <Row label="Campaign Access" value="Enabled" badge={<Pill tone="success">12 campaigns</Pill>} />
            <Row label="Landing Page" value={referralLinks.landing} />
            <Row label="UTM Tracking" value={referralLinks.utm} />
          </Section>
          <Section title="Active Campaigns" icon={<Target className="h-3.5 w-3.5" />}>
            <Table>
              <thead><tr><Th>Asset</Th><Th>Status</Th><Th>Audience</Th><Th className="text-right">Conversions</Th></tr></thead>
              <tbody>
                <tr className="hover:bg-muted/40">
                  <Td>WhatsApp template</Td>
                  <Td><Pill tone="success">Approved</Pill></Td>
                  <Td>Active traders</Td>
                  <Td className="text-right">38 (52.8%)</Td>
                </tr>
                <tr className="hover:bg-muted/40">
                  <Td>Email template</Td>
                  <Td><Pill tone="info">Available</Pill></Td>
                  <Td>Cold leads</Td>
                  <Td className="text-right">12 (8.4%)</Td>
                </tr>
                <tr className="hover:bg-muted/40">
                  <Td>Banner pack 1280×720</Td>
                  <Td><Pill tone="success">Approved</Pill></Td>
                  <Td>Website embed</Td>
                  <Td className="text-right">240 clicks</Td>
                </tr>
                <tr className="hover:bg-muted/40">
                  <Td>Telegram bot</Td>
                  <Td><Pill tone="warning">Beta</Pill></Td>
                  <Td>APAC region</Td>
                  <Td className="text-right">6 (3.1%)</Td>
                </tr>
              </tbody>
            </Table>
          </Section>
        </div>
      )}

      {/* 13. COMPLIANCE REVIEW */}
      {section === "compliance" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Section title="Compliance Snapshot" icon={<Shield className="h-3.5 w-3.5" />}>
            <Row label="KYC Status" value="Verified" badge={<Pill tone="success">✓</Pill>} />
            <Row label="AML Review" value="Passed" badge={<Pill tone="success">Clean</Pill>} />
            <Row label="Sanctions Check" value="Clear" badge={<Pill tone="success">Cleared 12 Jun 2026</Pill>} />
            <Row label="PEP Review" value="Flagged — Family member" badge={<Pill tone="warning">Monitor</Pill>} />
            <Row label="Contract Status" value="Active — v3.2" badge={<Pill tone="success">Signed</Pill>} />
            <Row label="Last compliance review" value="08 May 2026" />
            <Row label="Compliance Officer" value="Rajan Mehta" />
            <Row label="Next review" value="08 Aug 2026" badge={<Pill tone="info">Scheduled</Pill>} />
          </Section>
          <Section title="Compliance Documents" icon={<FileText className="h-3.5 w-3.5" />} right={<ActionBtn icon={Upload} label="Upload" />}>
            <div className="space-y-2">
              {[
                { name: "IB Agreement v3.2.pdf", date: "02 Jun 2022", status: "Signed" },
                { name: "KYC Pack — Corporate.pdf", date: "02 Jun 2022", status: "Verified" },
                { name: "Source-of-funds declaration.pdf", date: "14 Mar 2024", status: "Verified" },
                { name: "PEP disclosure.pdf", date: "08 May 2026", status: "Reviewed" },
                { name: "Tax residency W-8BEN-E.pdf", date: "12 Jan 2026", status: "Verified" },
              ].map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-md border border-border/60 bg-surface px-3 py-2 text-xs">
                  <div className="flex items-center gap-2"><FileText className="h-3.5 w-3.5 text-muted-foreground" /><span className="font-medium">{d.name}</span></div>
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{d.date}</span>
                    <Pill tone="success">{d.status}</Pill>
                    <button className="text-muted-foreground hover:text-foreground"><Download className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}

      {/* 14. RISK MONITORING */}
      {section === "monitoring" && (
        <Section title="Risk Monitoring — Suspicious Partner Behaviour" icon={<AlertTriangle className="h-3.5 w-3.5" />}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Referral Fraud", level: 0, status: "Clean", icon: ShieldCheck, tone: "success" as const },
              { name: "Fake Leads", level: 2, status: "Low signal", icon: Users, tone: "success" as const },
              { name: "Self Referral", level: 0, status: "None detected", icon: Users, tone: "success" as const },
              { name: "Bonus Abuse", level: 1, status: "Investigating CL-1163", icon: Gift, tone: "warning" as const },
              { name: "Multi Accounting", level: 3, status: "3 device overlaps", icon: Network, tone: "warning" as const },
              { name: "Commission Manipulation", level: 0, status: "Clean", icon: DollarSign, tone: "success" as const },
            ].map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.name} className="rounded-lg border border-border/60 bg-surface p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Icon className="h-4 w-4 text-muted-foreground" /><span className="text-sm font-medium">{a.name}</span></div>
                    <Pill tone={a.tone}>{a.level === 0 ? "OK" : `${a.level} alert${a.level > 1 ? "s" : ""}`}</Pill>
                  </div>
                  <div className="mt-2 text-[11px] text-muted-foreground">{a.status}</div>
                  <Bar value={a.level * 25} tone={a.tone === "success" ? "success" : "warning"} />
                </div>
              );
            })}
          </div>
        </Section>
      )}

      {/* 15. RESTRICTIONS */}
      {section === "restrictions" && (
        <Section title="Restrictions & Controls" icon={<Lock className="h-3.5 w-3.5" />} right={<ActionBtn icon={Plus} label="Add Restriction" tone="destructive" onClick={() => toast.warning("Restriction dialog opened")} />}>
          <Table>
            <thead><tr><Th>Restriction</Th><Th>Status</Th><Th>Reason</Th><Th>Applied By</Th><Th>Action</Th></tr></thead>
            <tbody>
              {restrictions.map((r) => (
                <tr key={r.name} className="hover:bg-muted/40">
                  <Td className="font-medium">{r.name}</Td>
                  <Td><Pill tone={r.status === "Active" ? "destructive" : "muted"}>{r.status}</Pill></Td>
                  <Td className="text-muted-foreground">{r.reason}</Td>
                  <Td className="text-muted-foreground">{r.applied}</Td>
                  <Td>
                    <button className="text-xs text-primary hover:underline" onClick={() => toast.success(`${r.name} toggled`)}>
                      {r.status === "Active" ? "Remove" : "Apply"}
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}

      {/* 16. TIMELINE */}
      {section === "timeline" && (
        <Section title="Partner Timeline" icon={<History className="h-3.5 w-3.5" />}>
          <ol className="relative ml-3 space-y-4 border-l border-border/60 pl-5">
            {timeline.map((t, i) => {
              const Icon = t.icon;
              const tones = { success: "bg-success text-success-foreground", warning: "bg-warning text-warning-foreground", info: "bg-info text-info-foreground", muted: "bg-muted text-foreground" };
              return (
                <li key={i} className="relative">
                  <span className={`absolute -left-[34px] grid h-7 w-7 place-items-center rounded-full ${tones[t.tone]}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="rounded-lg border border-border/60 bg-surface p-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{t.title}</span>
                      <span className="text-[11px] text-muted-foreground">{t.date}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{t.sub}</div>
                  </div>
                </li>
              );
            })}
          </ol>
        </Section>
      )}

      {/* 17. NOTES */}
      {section === "notes" && (
        <Section title="Internal Notes" icon={<StickyNote className="h-3.5 w-3.5" />} right={<ActionBtn icon={Plus} label="Add Note" onClick={() => toast.success("Note dialog opened")} />}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((n, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-surface p-3">
                <Pill tone={n.color as any}>{n.tag}</Pill>
                <p className="mt-2 text-xs text-foreground">{n.body}</p>
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{n.author}</span>
                  <span>{n.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 18. ADMIN ACTIONS */}
      {section === "admin" && (
        <div className="space-y-4">
          <Section title="Safe Actions" icon={<MessageSquare className="h-3.5 w-3.5" />}>
            <div className="flex flex-wrap gap-2">
              <ActionBtn icon={Mail} label="Send Message" onClick={() => toast.success("Message sent")} />
              <ActionBtn icon={MessageSquare} label="Open Chat" />
              <ActionBtn icon={Download} label="Download Statement" />
              <ActionBtn icon={Eye} label="View Public Page" />
              <ActionBtn icon={Flag} label="Add Tag" />
            </div>
          </Section>
          <Section title="Moderate Actions" icon={<Settings className="h-3.5 w-3.5" />}>
            <div className="flex flex-wrap gap-2">
              <ActionBtn icon={Trophy} label="Change Tier" onClick={() => toast.success("Tier change initiated")} />
              <ActionBtn icon={User} label="Assign Manager" />
              <ActionBtn icon={DollarSign} label="Adjust Commission" />
              <ActionBtn icon={Target} label="Enable Campaign" />
              <ActionBtn icon={Settings} label="Update Commission Profile" />
            </div>
          </Section>
          <Section title="Dangerous Actions" icon={<AlertTriangle className="h-3.5 w-3.5" />}>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-[11px] text-muted-foreground">
              These actions require permission + confirmation + reason + audit log entry.
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <ActionBtn icon={XCircle} label="Suspend Partner" tone="destructive" onClick={() => toast.error("Confirm to suspend")} />
              <ActionBtn icon={Lock} label="Hold Commission" tone="destructive" />
              <ActionBtn icon={Lock} label="Disable Referrals" tone="destructive" />
              <ActionBtn icon={Lock} label="Disable Sub-IB Creation" tone="destructive" />
              <ActionBtn icon={XCircle} label="Terminate Partnership" tone="destructive" />
            </div>
          </Section>
        </div>
      )}

      {/* 19. AUDIT TRAIL */}
      {section === "audit" && (
        <Section title="Audit Trail — All Partner Changes" icon={<FileText className="h-3.5 w-3.5" />} right={<ActionBtn icon={Download} label="Export Log" />}>
          <Table>
            <thead><tr><Th>Date/Time</Th><Th>Actor</Th><Th>Action</Th><Th>From</Th><Th>To</Th></tr></thead>
            <tbody>
              {auditTrail.map((a, i) => (
                <tr key={i} className="hover:bg-muted/40">
                  <Td className="text-muted-foreground">{a.date}</Td>
                  <Td className="font-medium">{a.actor}</Td>
                  <Td>{a.action}</Td>
                  <Td className="text-muted-foreground">{a.from}</Td>
                  <Td className="text-foreground">{a.to}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Section>
      )}
    </div>
  );
}
