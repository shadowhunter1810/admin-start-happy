// extracted from perfect-page-builder — exports tab components for use across multiple routes
import { useState, type ReactNode } from "react";
import { MarketingCampaignsTab } from "@/components/MarketingCampaignsTab";
export { MarketingCampaignsTab };
// (route declaration removed — see src/routes/* for the per-tab routes)


/* ----------------------------- shared atoms ----------------------------- */

type Tone = "neutral" | "success" | "warning" | "info" | "critical" | "brand";

const toneClasses: Record<Tone, string> = {
  neutral: "bg-white/5 text-muted-foreground ring-border",
  success: "bg-[oklch(0.74_0.16_155/0.12)] text-[oklch(0.84_0.16_155)] ring-[oklch(0.74_0.16_155/0.35)]",
  warning: "bg-[oklch(0.80_0.16_75/0.12)] text-[oklch(0.88_0.16_75)] ring-[oklch(0.80_0.16_75/0.35)]",
  info:    "bg-[oklch(0.70_0.14_240/0.12)] text-[oklch(0.82_0.14_240)] ring-[oklch(0.70_0.14_240/0.35)]",
  critical:"bg-[oklch(0.65_0.24_22/0.15)] text-[oklch(0.82_0.20_22)] ring-[oklch(0.65_0.24_22/0.40)]",
  brand:   "bg-[oklch(0.72_0.16_168/0.12)] text-[oklch(0.84_0.16_168)] ring-[oklch(0.72_0.16_168/0.35)]",
};

function Pill({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${toneClasses[tone]} ${className}`}>
      {children}
    </span>
  );
}

function Dot({ tone = "brand" }: { tone?: Tone }) {
  const colors: Record<Tone, string> = {
    neutral: "bg-muted-foreground", success: "bg-[oklch(0.74_0.16_155)]",
    warning: "bg-[oklch(0.80_0.16_75)]", info: "bg-[oklch(0.70_0.14_240)]",
    critical: "bg-[oklch(0.65_0.24_22)]", brand: "bg-[oklch(0.72_0.16_168)]",
  };
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors[tone]} shadow-[0_0_8px_currentColor]`} />;
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-border bg-card/60 backdrop-blur-sm ${className}`}>{children}</div>;
}

function SectionTitle({ kicker, title, action }: { kicker?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div className="min-w-0">
        {kicker && <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{kicker}</div>}
        <h3 className="mt-0.5 truncate text-lg font-semibold text-foreground">{title}</h3>
      </div>
      {action}
    </div>
  );
}

function KpiTile({ label, value, sub, tone = "neutral", trend }: { label: string; value: ReactNode; sub?: string; tone?: Tone; trend?: "up" | "down" }) {
  const borderTone: Record<Tone, string> = {
    neutral: "border-border", success: "border-[oklch(0.74_0.16_155/0.4)]", warning: "border-[oklch(0.80_0.16_75/0.4)]",
    info: "border-[oklch(0.70_0.14_240/0.4)]", critical: "border-[oklch(0.65_0.24_22/0.5)]", brand: "border-[oklch(0.72_0.16_168/0.4)]",
  };
  return (
    <div className={`group relative overflow-hidden rounded-xl border ${borderTone[tone]} bg-card/50 p-4 transition-colors hover:bg-card`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
        <Dot tone={tone} />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="font-display text-2xl font-semibold tracking-tight text-foreground">{value}</div>
        {trend && (
          <span className={`text-xs ${trend === "up" ? "text-[oklch(0.82_0.20_22)]" : "text-[oklch(0.84_0.16_155)]"}`}>
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

function Bar({ value, max = 100, tone = "brand" }: { value: number; max?: number; tone?: Tone }) {
  const pct = Math.min(100, (value / max) * 100);
  const bg: Record<Tone, string> = {
    neutral: "bg-muted-foreground", success: "bg-[oklch(0.74_0.16_155)]",
    warning: "bg-[oklch(0.80_0.16_75)]", info: "bg-[oklch(0.70_0.14_240)]",
    critical: "bg-[oklch(0.65_0.24_22)]", brand: "bg-[oklch(0.72_0.16_168)]",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
      <div className={`h-full rounded-full ${bg[tone]}`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

const TABS = [
  { id: "risk", label: "Risk Monitoring", count: 7 },
  { id: "security", label: "Security & Sessions", count: 3 },
  { id: "permissions", label: "Permissions & Access", count: 3 },
  { id: "marketing", label: "Marketing Campaigns", count: 12 },
  { id: "comms", label: "Communication History", count: 12 },
  { id: "notes", label: "Notes", count: 14 },
] as const;

type TabId = typeof TABS[number]["id"];

function ClientDetailsPage() {
  const [tab, setTab] = useState<TabId>("risk");

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <ClientHeader />
      <div className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1480px] px-6">
          <nav className="-mb-px flex gap-1 overflow-x-auto">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`group relative flex shrink-0 items-center gap-2 border-b-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-[oklch(0.72_0.16_168)] text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                  <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${active ? "bg-[oklch(0.72_0.16_168/0.18)] text-[oklch(0.84_0.16_168)]" : "bg-white/5 text-muted-foreground"}`}>
                    {t.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <main className="mx-auto max-w-[1480px] px-6 py-8">
        {tab === "risk" && <RiskMonitoringTab />}
        {tab === "security" && <SecuritySessionsTab />}
        {tab === "permissions" && <PermissionsAccessTab />}
        {tab === "marketing" && <MarketingCampaignsTab />}
        {tab === "comms" && <CommunicationHistoryTab />}
        {tab === "notes" && <NotesTab />}
      </main>

      <footer className="border-t border-border py-6">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 font-mono">
            <Dot tone="success" /> All systems operational · v4.12.0
          </div>
          <div>Last sync: 2 seconds ago · ENC-256 · SOC-2 Type II</div>
        </div>
      </footer>
    </div>
  );
}

/* ----------------------------- top bar + header ----------------------------- */

function TopBar() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-6 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[oklch(0.72_0.16_168/0.15)] ring-1 ring-[oklch(0.72_0.16_168/0.4)]">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[oklch(0.84_0.16_168)]" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 12l4-7 5 14 5-9 4 4"/>
            </svg>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Admin Console</span>
              <span>›</span>
              <span>Clients</span>
              <span>›</span>
              <span className="text-foreground">CL-00029981</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <span className="font-mono">⌘K</span>
            <span>Search clients, alerts, tickets…</span>
          </div>
          <button className="rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-card">Export</button>
          <button className="rounded-lg bg-[oklch(0.72_0.16_168)] px-3 py-1.5 text-xs font-semibold text-[oklch(0.15_0.02_200)] hover:brightness-110">Take action</button>
          <div className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.72_0.16_168)] to-[oklch(0.55_0.20_280)] text-xs font-semibold text-background">JS</div>
        </div>
      </div>
    </header>
  );
}

function ClientHeader() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 surface-grid opacity-60" />
      <div className="absolute -top-32 right-0 h-72 w-[40rem] rounded-full bg-[oklch(0.72_0.16_168/0.10)] blur-3xl" />
      <div className="relative mx-auto max-w-[1480px] px-6 py-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div className="flex min-w-0 items-start gap-5">
            <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-[oklch(0.72_0.16_168)] to-[oklch(0.55_0.20_280)] text-xl font-bold text-background ring-2 ring-background">
              AR
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-card ring-2 ring-background">
                <Dot tone="success" />
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl font-semibold tracking-tight">Ahmed Al-Rashidi</h1>
                <Pill tone="brand">⭐ VIP · Gold tier</Pill>
                <Pill tone="info">IB Partner</Pill>
                <Pill tone="critical">🔴 AML restriction</Pill>
                <Pill tone="warning">🟠 Withdrawal hold</Pill>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
                <span>ID <span className="text-foreground">CL-00029981</span></span>
                <span>MT5-10291 · MT5-10344</span>
                <span>🇦🇪 Dubai, UAE</span>
                <span>Onboarded 14 Aug 2024</span>
                <span>KYC tier 3 verified</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <Pill>📧 ahmed.r@email.com</Pill>
                <Pill>📞 +971 50 ••• 4421</Pill>
                <Pill>💬 WhatsApp active</Pill>
                <Pill>VIP Mgr: Priya Nair</Pill>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 lg:grid-cols-3 lg:w-[420px]">
            <HeaderStat label="Equity" value="$248,910" tone="success" />
            <HeaderStat label="Risk score" value="72/100" tone="critical" trend="up" />
            <HeaderStat label="Open P/L" value="−$1,820" tone="warning" />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeaderStat({ label, value, tone, trend }: { label: string; value: string; tone: Tone; trend?: "up" | "down" }) {
  const color: Record<Tone, string> = {
    neutral: "text-foreground", success: "text-[oklch(0.84_0.16_155)]", warning: "text-[oklch(0.88_0.16_75)]",
    info: "text-[oklch(0.82_0.14_240)]", critical: "text-[oklch(0.82_0.20_22)]", brand: "text-[oklch(0.84_0.16_168)]",
  };
  return (
    <div className="rounded-xl border border-border bg-card/60 px-3 py-2.5 backdrop-blur-sm">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 font-display text-lg font-semibold tabular-nums ${color[tone]}`}>
        {value}{trend && <span className="ml-1 text-[10px]">{trend === "up" ? "↑" : "↓"}</span>}
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 1 — RISK MONITORING
   ============================================================================ */

export function RiskMonitoringTab() {
  return (
    <div className="space-y-8">
      {/* Overview KPIs */}
      <section>
        <SectionTitle kicker="01 · Overview Dashboard" title="Risk posture at a glance" action={<TrendBadge />} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <KpiTile label="Overall risk score" value="72/100" sub="HIGH tier · +18 last 7d" tone="critical" trend="up" />
          <KpiTile label="Fraud probability" value="81%" sub="AI confidence" tone="critical" />
          <KpiTile label="AML risk" value="Medium" sub="2 open checks" tone="warning" />
          <KpiTile label="Active alerts" value="7" sub="3 critical · 2 high" tone="critical" />
          <KpiTile label="Open investigations" value="2" sub="CASE-2026-4421 +1" tone="warning" />
          <KpiTile label="Margin level" value="118%" sub="Near stop-out" tone="warning" />
          <KpiTile label="Max leverage used" value="1:500" sub="Reduced to 1:100" tone="info" />
          <KpiTile label="Withdrawal risk" value="84/100" sub="Quick-cashout pattern" tone="critical" />
          <KpiTile label="Device trust" value="62/100" sub="2 new devices" tone="warning" />
          <KpiTile label="Payment risk" value="48/100" sub="BIN mismatch" tone="warning" />
          <KpiTile label="Restrictions" value="3" sub="Withdrawal · Leverage · Geo" tone="critical" />
          <KpiTile label="Risk trend (7d)" value="↑ +18" sub="Increasing" tone="critical" trend="up" />
        </div>
      </section>

      {/* Active alerts + AI intel */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="02 · Active risk alerts" title="Live threats & signals" action={<FilterBar items={["All", "Critical", "High", "Open", "Investigating"]} />} />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Alert ID</th>
                  <th className="px-3 py-2 text-left font-medium">Type</th>
                  <th className="px-3 py-2 text-left font-medium">Severity</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                  <th className="px-3 py-2 text-left font-medium">Triggered</th>
                  <th className="px-3 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {([
                  ["ALRT-2026-041", "AML · Rapid deposit pattern", "critical", "Investigating", "Today 11:04"],
                  ["RSK-8821", "Quick withdrawal after deposit", "critical", "Open", "Today 10:21"],
                  ["DEV-1144", "Device shared · 5 accounts", "warning", "Monitoring", "Today 09:42"],
                  ["GEO-3021", "Impossible travel IN → GB", "critical", "Open", "Today 09:20"],
                  ["TRD-9981", "92% concentration XAUUSD", "warning", "Open", "Yesterday"],
                  ["BON-1108", "Bonus claim before turnover", "info", "Resolved", "12 May"],
                  ["IB-2240", "Same-device referral chain", "warning", "Monitoring", "10 May"],
                ] as const).map(([id, type, sev, status, time]) => (
                  <tr key={id} className="cursor-pointer transition-colors hover:bg-white/[0.03]">
                    <td className="px-3 py-2.5 font-mono text-xs text-[oklch(0.84_0.16_168)]">{id}</td>
                    <td className="px-3 py-2.5">{type}</td>
                    <td className="px-3 py-2.5"><Pill tone={sev as Tone}>{(sev as string).toUpperCase()}</Pill></td>
                    <td className="px-3 py-2.5 text-muted-foreground">{status}</td>
                    <td className="px-3 py-2.5 font-mono text-xs text-muted-foreground">{time}</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">›</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid gap-3 rounded-lg border border-[oklch(0.65_0.24_22/0.3)] bg-[oklch(0.65_0.24_22/0.06)] p-4 md:grid-cols-[auto_minmax(0,1fr)]">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[oklch(0.65_0.24_22/0.18)] text-lg">⚠</div>
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">ALRT-2026-041 · Evidence panel</div>
              <p className="mt-1 text-xs text-muted-foreground">Deposit <span className="font-mono text-foreground">$50,000</span> · trading volume <span className="font-mono text-foreground">0.3 lots</span> · withdrawal request <span className="font-mono text-foreground">$48,500</span> after <span className="font-mono text-foreground">12 min</span>. Triggered rule <span className="font-mono text-[oklch(0.84_0.16_168)]">QUICK_CASHOUT_PATTERN</span>.</p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="03 · Risk intelligence" title="AI + rule engine insights" />
          <div className="rounded-lg border border-border bg-white/[0.02] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">Fraud confidence</span>
              <Pill tone="critical">81%</Pill>
            </div>
            <div className="mt-2 font-display text-3xl font-semibold">81<span className="text-base text-muted-foreground">/100</span></div>
            <Bar value={81} tone="critical" />
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Behavior similarity <span className="text-foreground">82%</span> with a previously banned arbitrage cluster. Coordinated trade timestamps detected across 3 sub-accounts.</p>
          </div>
          <div className="mt-3 space-y-2">
            {[
              ["Abnormal trading window", "warning"],
              ["Correlated accounts (3)", "critical"],
              ["Likely latency arbitrage", "warning"],
              ["Bonus farming signal", "info"],
              ["Coordinated trading", "critical"],
            ].map(([label, tone]) => (
              <div key={label as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2 text-sm">
                <span className="text-foreground/90">{label}</span>
                <Pill tone={tone as Tone}>{tone === "critical" ? "HIGH" : tone === "warning" ? "MED" : "LOW"}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Trading & exposure */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle kicker="04 · Trading risk analysis" title="Behavior & flow KPIs" />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              ["Win rate", "61%", "info"],
              ["Profit factor", "2.14", "success"],
              ["Avg hold", "4m 12s", "warning"],
              ["Max DD", "−18.4%", "warning"],
              ["Sharpe", "1.82", "success"],
              ["R/R ratio", "1:3.2", "success"],
              ["Scalping score", "82/100", "critical"],
              ["Toxic flow", "74/100", "critical"],
              ["Arb prob.", "68%", "warning"],
            ].map(([l, v, t]) => (
              <div key={l as string} className="rounded-md border border-border bg-white/[0.02] p-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{l}</div>
                <div className="mt-1 flex items-center justify-between"><span className="font-mono text-sm font-semibold">{v}</span><Dot tone={t as Tone} /></div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {["Scalping detected", "Martingale", "Latency arb", "Toxic flow", "News abuse", "Copy dependency"].map((f) => (
              <Pill key={f} tone="critical">{f}</Pill>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="05 · Exposure monitoring" title="Broker-side exposure" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-3 py-2 text-left font-medium">Symbol</th><th className="px-3 py-2 text-left font-medium">Net</th><th className="px-3 py-2 text-left font-medium">Side</th><th className="px-3 py-2 text-left font-medium">Risk</th><th className="px-3 py-2 text-left font-medium">Book</th><th className="px-3 py-2 text-left font-medium">Hedged</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {([
                  ["XAUUSD", "$182K", "Buy", "critical", "B-Book", "No"],
                  ["EURUSD", "$24K", "Sell", "info", "A-Book", "Yes"],
                  ["NAS100", "$8K", "Buy", "neutral", "A-Book", "—"],
                  ["BTCUSD", "$31K", "Buy", "warning", "Internalized", "Partial"],
                ] as const).map(([s, n, sd, r, b, h]) => (
                  <tr key={s}><td className="px-3 py-2 font-mono text-xs">{s}</td><td className="px-3 py-2 font-mono">{n}</td><td className="px-3 py-2">{sd}</td><td className="px-3 py-2"><Pill tone={r as Tone}>{(r as string).toUpperCase()}</Pill></td><td className="px-3 py-2 text-muted-foreground">{b}</td><td className="px-3 py-2 text-muted-foreground">{h}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">⚠ <span className="text-foreground">92%</span> of volume concentrated on XAUUSD — flagged for broker exposure.</p>
        </Card>
      </section>

      {/* Margin + Behavioral + AML grid */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <SectionTitle kicker="06 · Margin & leverage" title="Liquidation watch" />
          <div className="rounded-lg border border-border bg-white/[0.02] p-4">
            <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">Margin level</span><span className="font-mono font-semibold text-[oklch(0.88_0.16_75)]">118%</span></div>
            <div className="mt-2"><Bar value={28} tone="warning" /></div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md bg-white/[0.03] p-2"><div className="text-muted-foreground">Stop-out</div><div className="font-mono text-foreground">at 50%</div></div>
              <div className="rounded-md bg-white/[0.03] p-2"><div className="text-muted-foreground">Liquidation est.</div><div className="font-mono text-[oklch(0.82_0.20_22)]">$1,924.30</div></div>
            </div>
          </div>
          <div className="mt-3 space-y-1.5">
            {["Near stop-out", "Repeated margin calls", "Excessive leverage"].map(f => (
              <div key={f} className="flex items-center gap-2 text-xs"><Dot tone="warning" /><span>{f}</span></div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="07 · Behavioral risk" title="Pattern detection" />
          <div className="space-y-2">
            {[
              ["Revenge trading", 72, "critical"],
              ["Login → trade → withdraw", 88, "critical"],
              ["Overnight risk", 41, "warning"],
              ["News spike trading", 56, "warning"],
              ["Position flipping", 34, "info"],
            ].map(([l, v, t]) => (
              <div key={l as string}>
                <div className="mb-1 flex items-center justify-between text-xs"><span className="text-foreground/90">{l}</span><span className="font-mono text-muted-foreground">{v as number}/100</span></div>
                <Bar value={v as number} tone={t as Tone} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="08 · AML & compliance" title="Checks" />
          <div className="divide-y divide-border rounded-lg border border-border">
            {[
              ["PEP check", "Clear", "success"],
              ["Sanctions (OFAC/UN/EU)", "Clear", "success"],
              ["KYC risk level", "Medium", "warning"],
              ["Source of funds", "Pending", "warning"],
              ["Adverse media", "1 match", "critical"],
            ].map(([k, v, t]) => (
              <div key={k as string} className="flex items-center justify-between px-3 py-2.5 text-sm">
                <span className="text-foreground/90">{k}</span>
                <Pill tone={t as Tone}>{v as string}</Pill>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Withdrawal/Deposit/Payment risk */}
      <section className="grid gap-6 lg:grid-cols-3">
        <RiskModuleCard kicker="09 · Withdrawal risk" title="Payout fraud" score={84} items={[["Quick cashout (12 min)", "critical"], ["Mismatched payment method", "warning"], ["Multiple withdrawal methods", "warning"], ["Below turnover threshold", "critical"]]} />
        <RiskModuleCard kicker="10 · Deposit risk" title="Inflow integrity" score={48} items={[["Card country mismatch", "warning"], ["Multiple failed deposits", "info"], ["High-velocity deposits", "warning"]]} />
        <RiskModuleCard kicker="11 · Payment method" title="Fingerprint analysis" score={56} items={[["BIN: 401234 · Issuer UAE", "info"], ["USDT wallet linked 3 accts", "critical"], ["No 3DS auth on 2 cards", "warning"]]} />
      </section>

      {/* Device / Geo / Linked */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <SectionTitle kicker="12 · Device & login" title="Device trust signals" />
          <div className="space-y-2">
            {[["VPN detected", "warning"], ["TOR network", "success"], ["Impossible travel", "critical"], ["Shared device (5 accounts)", "critical"], ["Datacenter IP", "warning"]].map(([k, t]) => (
              <div key={k as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2 text-sm">
                <span>{k}</span><Pill tone={t as Tone}>{t === "success" ? "CLEAR" : (t as string).toUpperCase()}</Pill>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle kicker="13 · Geo & jurisdiction" title="Location risk" />
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border text-sm">
            {[["🇦🇪 UAE", "Resident", "success"], ["🇮🇳 India", "Login (travel)", "info"], ["🇷🇺 Russia", "VPN masked", "critical"], ["🇬🇧 UK", "New login", "warning"]].map(([c, s, t]) => (
              <div key={c as string} className="flex items-center justify-between px-3 py-2.5"><span>{c}</span><Pill tone={t as Tone}>{s as string}</Pill></div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle kicker="14 · Linked accounts" title="Multi-account detection" />
          <ul className="space-y-2 text-sm">
            {[["CL-00031002", "Same USDT wallet", "68%"], ["CL-00030881", "Same device fingerprint", "96%"], ["CL-00029544", "Same phone", "74%"], ["IB-441 chain", "12 sub-clients", "—"]].map(([id, reason, conf]) => (
              <li key={id as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2">
                <div><div className="font-mono text-xs text-[oklch(0.84_0.16_168)]">{id}</div><div className="text-xs text-muted-foreground">{reason}</div></div>
                <Pill tone="critical">{conf}</Pill>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* Score history + Investigations + Restrictions */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="15 · Risk score history" title="30-day trajectory" action={<Pill tone="critical">+50 since 20 May</Pill>} />
          <Sparkline data={[22, 28, 26, 35, 32, 48, 52, 58, 55, 62, 68, 64, 70, 72]} />
          <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
            {[["20 May", 22, "success"], ["22 May", 48, "warning"], ["25 May", 72, "critical"], ["Today", 72, "critical"]].map(([d, s, t]) => (
              <div key={d as string} className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">{d as string}</div><div className="mt-0.5 flex items-center justify-between"><span className="font-mono font-semibold">{s}</span><Dot tone={t as Tone} /></div></div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle kicker="16 · Restrictions & flags" title="Active controls" />
          <div className="space-y-2 text-sm">
            {[["Withdrawal locked", "Compliance · AML-2026-4421", "critical"], ["Leverage capped 1:100", "Risk team · 12 May", "warning"], ["Country block — RU", "Security · 08 May", "info"]].map(([t, d, tone]) => (
              <div key={t as string} className="rounded-lg border border-border bg-white/[0.02] p-3">
                <div className="flex items-center justify-between"><span className="font-medium">{t}</span><Pill tone={tone as Tone}>Active</Pill></div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Investigations & timeline */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle kicker="17 · Investigation cases" title="Open & resolved" />
          <div className="space-y-3">
            {[
              ["CASE-2026-4421", "AML rapid deposit pattern", "Investigating", "Compliance", "critical"],
              ["CASE-2026-4408", "Quick withdrawal abuse", "Open", "Risk team", "critical"],
              ["CASE-2026-4399", "Device sharing — 5 accounts", "Monitoring", "Fraud team", "warning"],
              ["CASE-2026-4380", "USDT mixer flag", "Inconclusive", "Compliance", "info"],
            ].map(([id, title, status, owner, tone]) => (
              <div key={id} className="rounded-lg border border-border bg-white/[0.02] p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-mono text-xs text-[oklch(0.84_0.16_168)]">{id}</div>
                    <div className="truncate text-sm font-medium">{title}</div>
                    <div className="text-xs text-muted-foreground">Owner: {owner}</div>
                  </div>
                  <Pill tone={tone as Tone}>{status}</Pill>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-5">
          <SectionTitle kicker="18 · Risk timeline" title="Chronological history" />
          <Timeline items={[
            { time: "09:14", title: "Margin alert triggered", tone: "warning" },
            { time: "09:18", title: "Leverage increased to 1:500", tone: "warning" },
            { time: "09:42", title: "Device-share signal · 5 accounts", tone: "critical" },
            { time: "10:21", title: "Quick withdrawal pattern", tone: "critical" },
            { time: "11:04", title: "AML rapid-deposit alert", tone: "critical" },
            { time: "12 May", title: "Withdrawal locked by Compliance", tone: "critical" },
            { time: "20 May", title: "Risk score 22 · stable", tone: "success" },
          ]} />
        </Card>
      </section>

      {/* Admin actions + audit */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <AdminActionsCard
          safe={["Notify client", "Export risk report", "Add note", "View case"]}
          moderate={["Request verification", "Reduce leverage", "Enable monitoring", "Reset session trust"]}
          dangerous={["Suspend trading", "Block withdrawals", "Force liquidation", "Lock account", "Apply AML hold"]}
        />
        <AuditTrailCard rows={[
          ["Withdrawal locked", "Compliance · J. Singh", "AML open", "Today 10:12"],
          ["Leverage 1:500 → 1:100", "Risk team", "Excessive exposure", "Today 11:20"],
          ["Country block — RU", "Security team", "Brute force RU IP", "Yesterday 08:15"],
          ["Override risk tier → HIGH", "Senior admin", "Manual review", "12 May 14:02"],
          ["Investigation opened", "Compliance", "Rapid deposit", "10 May 09:30"],
        ]} />
      </section>
    </div>
  );
}

function TrendBadge() {
  return (
    <Pill tone="critical">
      <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none"><path d="M3 11l4-4 3 3 3-5" stroke="currentColor" strokeWidth="1.6" /></svg>
      Increasing · +18 last 7d
    </Pill>
  );
}

function FilterBar({ items }: { items: string[] }) {
  const [active, setActive] = useState(items[0]);
  return (
    <div className="flex flex-wrap gap-1 rounded-lg border border-border bg-card/60 p-1">
      {items.map(i => (
        <button key={i} onClick={() => setActive(i)} className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${active === i ? "bg-[oklch(0.72_0.16_168/0.18)] text-[oklch(0.84_0.16_168)]" : "text-muted-foreground hover:text-foreground"}`}>{i}</button>
      ))}
    </div>
  );
}

function RiskModuleCard({ kicker, title, score, items }: { kicker: string; title: string; score: number; items: Array<readonly [string, string]> }) {
  const tone: Tone = score >= 70 ? "critical" : score >= 40 ? "warning" : "success";
  return (
    <Card className="p-5">
      <SectionTitle kicker={kicker} title={title} />
      <div className="mb-3 flex items-baseline justify-between">
        <div className="font-display text-3xl font-semibold tabular-nums">{score}<span className="text-base text-muted-foreground">/100</span></div>
        <Pill tone={tone}>{tone === "critical" ? "HIGH" : tone === "warning" ? "MEDIUM" : "LOW"}</Pill>
      </div>
      <Bar value={score} tone={tone} />
      <div className="mt-4 space-y-1.5">
        {items.map(([k, t]) => (
          <div key={k} className="flex items-center justify-between rounded-md bg-white/[0.02] px-3 py-2 text-sm">
            <span className="text-foreground/90">{k}</span><Pill tone={t as Tone}>{(t as string).toUpperCase()}</Pill>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const w = 600, h = 80, max = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-24 w-full">
      <defs>
        <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.65 0.24 22)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.65 0.24 22)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke="oklch(0.82 0.20 22)" strokeWidth="2" points={pts} />
      <polygon fill="url(#gr)" points={`0,${h} ${pts} ${w},${h}`} />
    </svg>
  );
}

function Timeline({ items }: { items: Array<{ time: string; title: string; tone: Tone }> }) {
  return (
    <ol className="relative space-y-3 pl-5">
      <span className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border" />
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className="absolute -left-5 top-1.5"><Dot tone={it.tone} /></span>
          <div className="flex items-baseline gap-2 text-sm">
            <span className="font-mono text-xs text-muted-foreground">{it.time}</span>
            <span>{it.title}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AdminActionsCard({ safe, moderate, dangerous }: { safe: string[]; moderate: string[]; dangerous: string[] }) {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Admin actions" title="Operational controls" />
      <div className="space-y-4">
        <ActionGroup label="Safe actions" tone="success" items={safe} />
        <ActionGroup label="Moderate actions" tone="warning" items={moderate} />
        <ActionGroup label="Dangerous · require reason + audit" tone="critical" items={dangerous} />
      </div>
    </Card>
  );
}

function ActionGroup({ label, tone, items }: { label: string; tone: Tone; items: string[] }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground"><Dot tone={tone} /> {label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map(a => (
          <button key={a} className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
            tone === "critical" ? "border-[oklch(0.65_0.24_22/0.4)] bg-[oklch(0.65_0.24_22/0.08)] text-[oklch(0.85_0.20_22)] hover:bg-[oklch(0.65_0.24_22/0.15)]" :
            tone === "warning" ? "border-[oklch(0.80_0.16_75/0.35)] bg-[oklch(0.80_0.16_75/0.06)] text-[oklch(0.90_0.16_75)] hover:bg-[oklch(0.80_0.16_75/0.12)]" :
            "border-border bg-white/[0.03] text-foreground hover:bg-white/[0.06]"
          }`}>{a}</button>
        ))}
      </div>
    </div>
  );
}

function AuditTrailCard({ rows }: { rows: Array<readonly [string, string, string, string]> }) {
  return (
    <Card className="p-5">
      <SectionTitle kicker="Audit trail" title="Every action tracked" action={<Pill>SOC-2 retained 7y</Pill>} />
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr><th className="px-3 py-2 text-left font-medium">Action</th><th className="px-3 py-2 text-left font-medium">By</th><th className="px-3 py-2 text-left font-medium">Reason</th><th className="px-3 py-2 text-left font-medium">Time</th></tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2 text-muted-foreground">{r[1]}</td><td className="px-3 py-2 text-muted-foreground">{r[2]}</td><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ============================================================================
   TAB 2 — SECURITY & SESSIONS
   ============================================================================ */

export function SecuritySessionsTab() {
  return (
    <div className="space-y-8">
      <section>
        <SectionTitle kicker="01 · Security summary" title="Account security posture" action={<Pill tone="critical">Critical · score 34/100</Pill>} />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
          <KpiTile label="Security score" value="34/100" sub="Critical" tone="critical" />
          <KpiTile label="Active sessions" value="4" sub="3 countries" tone="warning" />
          <KpiTile label="Failed logins" value="12" sub="Last 24h" tone="critical" />
          <KpiTile label="2FA status" value="Enabled" sub="Google Auth" tone="success" />
          <KpiTile label="Security alerts" value="3" sub="2 critical" tone="critical" />
          <KpiTile label="Trusted devices" value="6" sub="2 flagged" tone="warning" />
          <KpiTile label="VPN detected" value="Yes" sub="UAE session" tone="warning" />
          <KpiTile label="Last login" value="2h ago" sub="UAE via VPN" tone="warning" />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle kicker="02 · Authentication" title="Account credentials state" />
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[["Email verified", "Yes", "success"], ["Phone verified", "Yes", "success"], ["2FA enabled", "Google Auth", "success"], ["Biometric login", "Not set", "warning"], ["Password age", "45 days", "info"], ["Recovery email", "Set", "success"]].map(([k, v, t]) => (
              <div key={k as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2.5"><span className="text-muted-foreground">{k}</span><Pill tone={t as Tone}>{v as string}</Pill></div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="03 · Active sessions" title="Who's logged in right now" action={<button className="text-xs text-[oklch(0.84_0.16_168)] hover:underline">Force logout all</button>} />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Device · Browser</th><th className="px-3 py-2 text-left font-medium">Country</th><th className="px-3 py-2 text-left font-medium">IP</th><th className="px-3 py-2 text-left font-medium">Risk</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([["Chrome · Win 11", "🇮🇳 India", "103.21.x.x", "Low", "success"], ["Safari · iPhone", "🇦🇪 UAE", "92.118.x.x", "VPN", "warning"], ["Edge · Laptop", "🇬🇧 UK", "77.88.x.x", "New", "info"], ["Android app", "🇷🇺 Russia", "185.x.x.x", "High risk", "critical"]] as const).map((r) => (
                  <tr key={r[2]}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[4] as Tone}>{r[3]}</Pill></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="04 · Login history" title="Successful & failed attempts" action={<FilterBar items={["Today", "7 days", "30 days", "Failed only"]} />} />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Time</th><th className="px-3 py-2 text-left font-medium">Device</th><th className="px-3 py-2 text-left font-medium">Country</th><th className="px-3 py-2 text-left font-medium">Result</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([["Today 09:20", "Safari iPhone", "🇦🇪 UAE", "Success", "success"], ["Today 09:00", "Chrome", "🇮🇳 India", "Success", "success"], ["Today 08:12", "Unknown", "🇷🇺 Russia", "2FA failed", "warning"], ["Today 08:05", "Unknown", "🇷🇺 Russia", "Failed", "critical"], ["Today 07:58", "Unknown", "🇷🇺 Russia", "Blocked", "critical"], ["Yesterday", "Edge Laptop", "🇬🇧 UK", "Success", "success"]] as const).map((r, i) => (
                  <tr key={i}><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[4] as Tone}>{r[3]}</Pill></td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="05 · Geo location" title="Impossible travel detected" />
          <div className="rounded-lg border border-[oklch(0.65_0.24_22/0.4)] bg-[oklch(0.65_0.24_22/0.06)] p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[oklch(0.85_0.20_22)]">⚠ Impossible travel</div>
            <div className="mt-2 text-sm">🇮🇳 India <span className="font-mono">09:00</span> → 🇬🇧 UK <span className="font-mono">09:20</span></div>
            <div className="mt-1 text-xs text-muted-foreground">6,800 km in 20 minutes. Possible account takeover.</div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">Countries (30d)</div><div className="mt-0.5 font-mono text-foreground">4</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">High-risk</div><div className="mt-0.5 text-foreground">🇷🇺 🇦🇪</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">VPN logins</div><div className="mt-0.5 font-mono text-foreground">6 times</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">TOR</div><div className="mt-0.5 text-[oklch(0.84_0.16_155)]">No</div></div>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle kicker="06 · Device management" title="Devices linked to account" />
          <div className="space-y-2 text-sm">
            {([["💻 Chrome Desktop", "Windows 11", "Today", "Trusted", "success"], ["📱 iPhone 15", "iOS 17", "Today", "New", "info"], ["💻 MacBook Pro", "macOS", "Yesterday", "Trusted", "success"], ["📱 Samsung S24", "Android 14", "3 days ago", "Flagged", "warning"], ["💻 Unknown device", "Linux", "Today", "Suspicious", "critical"]] as const).map((r) => (
              <div key={r[0]} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-white/[0.02] px-3 py-2">
                <div className="min-w-0"><div className="truncate">{r[0]}</div><div className="text-xs text-muted-foreground">{r[1]} · last seen {r[2]}</div></div>
                <Pill tone={r[4] as Tone}>{r[3]}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="07 · IP monitoring" title="Network reputation" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">IP</th><th className="px-3 py-2 text-left font-medium">Country</th><th className="px-3 py-2 text-left font-medium">ISP</th><th className="px-3 py-2 text-left font-medium">Risk</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([["103.21.x.x", "🇮🇳 India", "Residential", "Low", "success"], ["92.118.x.x", "🇦🇪 UAE", "VPN", "High", "critical"], ["77.88.x.x", "🇬🇧 UK", "Datacenter", "Medium", "warning"], ["185.x.x.x", "🇷🇺 Russia", "Proxy", "Critical", "critical"]] as const).map((r) => (
                  <tr key={r[0]}><td className="px-3 py-2 font-mono text-xs">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2 text-muted-foreground">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[4] as Tone}>{r[3]}</Pill></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
            <Pill tone="warning">⚠ VPN detected</Pill><Pill tone="warning">⚠ Proxy detected</Pill><Pill tone="success">✓ No TOR</Pill>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="08 · Security alerts" title="Threats requiring attention" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Alert</th><th className="px-3 py-2 text-left font-medium">Type</th><th className="px-3 py-2 text-left font-medium">Severity</th><th className="px-3 py-2 text-left font-medium">Status</th><th className="px-3 py-2 text-left font-medium">Time</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([["Impossible travel detected", "Geo", "Critical", "Open", "Today 09:20"], ["Brute force attempt", "Auth", "Critical", "Open", "Today 08:05"], ["VPN / proxy login", "Network", "High", "Reviewing", "Today 09:17"], ["Device shared · 5 accounts", "Device", "High", "Reviewing", "Yesterday"], ["Multiple failed OTP", "2FA", "Medium", "Resolved", "2 days ago"]] as const).map((r) => (
                  <tr key={r[0]}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2 text-muted-foreground">{r[1]}</td><td className="px-3 py-2"><Pill tone={r[2] === "Critical" ? "critical" : r[2] === "High" ? "warning" : "info"}>{r[2]}</Pill></td><td className="px-3 py-2 text-muted-foreground">{r[3]}</td><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[4]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="09 · Access restrictions" title="Security controls" />
          <div className="space-y-2 text-sm">
            {[["IP restriction", "Active", "success"], ["Country block", "🇷🇺 blocked", "warning"], ["Device restriction", "Not set", "neutral"], ["Trading restriction", "Not set", "neutral"], ["Withdrawal restriction", "Active", "critical"], ["Login suspended", "Not set", "neutral"]].map(([k, v, t]) => (
              <div key={k as string} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-md border border-border bg-white/[0.02] px-3 py-2">
                <span>{k}</span><Pill tone={t as Tone}>{v as string}</Pill><button className="text-xs text-[oklch(0.84_0.16_168)] hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <SectionTitle kicker="10 · Password activity" title="Reset history" />
          <div className="space-y-2 text-sm">
            {[["Password changed", "15 days ago", "success"], ["Reset requested", "3 days ago", "warning"], ["Reset completed", "3 days ago", "success"], ["Failed reset attempt", "4 days ago", "critical"]].map(([k, v, t]) => (
              <div key={k as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><div><div>{k}</div><div className="text-xs text-muted-foreground">{v}</div></div><Pill tone={t as Tone}>{t === "critical" ? "RISK" : t === "warning" ? "FLAGGED" : "OK"}</Pill></div>
            ))}
          </div>
          <div className="mt-3 rounded-lg border border-[oklch(0.80_0.16_75/0.4)] bg-[oklch(0.80_0.16_75/0.06)] p-3 text-xs">
            <div className="font-semibold text-[oklch(0.90_0.16_75)]">Frequent reset pattern</div>
            <div className="mt-1 text-muted-foreground">3 resets in 30 days — possible takeover.</div>
            <button className="mt-2 rounded-md bg-[oklch(0.80_0.16_75/0.15)] px-2 py-1 text-[11px] font-medium text-[oklch(0.92_0.16_75)]">Require password change</button>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="11 · 2FA management" title="Two-factor state" />
          <div className="divide-y divide-border rounded-lg border border-border text-sm">
            {[["2FA status", "Enabled", "success"], ["Method", "Google Authenticator", "neutral"], ["Last OTP fail", "Today 08:12", "warning"], ["Failed OTP attempts", "4", "warning"], ["Reset requested", "No", "neutral"]].map(([k, v, t]) => (
              <div key={k as string} className="flex items-center justify-between px-3 py-2.5"><span className="text-muted-foreground">{k}</span><Pill tone={t as Tone}>{v as string}</Pill></div>
            ))}
          </div>
          <div className="mt-3 flex gap-2"><button className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs">View OTP logs</button><button className="rounded-md border border-[oklch(0.65_0.24_22/0.4)] bg-[oklch(0.65_0.24_22/0.08)] px-3 py-1.5 text-xs text-[oklch(0.85_0.20_22)]">Reset 2FA</button></div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="12 · Linked devices" title="Shared accounts" />
          <div className="rounded-lg border border-[oklch(0.65_0.24_22/0.3)] bg-[oklch(0.65_0.24_22/0.06)] p-3 text-xs">
            <div className="font-semibold">Device <span className="font-mono">ABC123</span> · used by 5 accounts</div>
            <div className="mt-1 text-muted-foreground">Possible bonus abuse, referral fraud or copy manipulation.</div>
          </div>
          <ul className="mt-3 space-y-1.5 text-sm">
            {[["CL-1042", "Same device", "96%"], ["CL-2087", "Same IP", "82%"], ["CL-3301", "Same phone", "74%"], ["CL-0815", "Same doc", "61%"]].map(([id, r, c]) => (
              <li key={id as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><div><div className="font-mono text-xs text-[oklch(0.84_0.16_168)]">{id}</div><div className="text-xs text-muted-foreground">{r}</div></div><Pill tone="critical">{c}</Pill></li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <SectionTitle kicker="13 · Security timeline" title="Chronological events" />
          <Timeline items={[
            { time: "Today 09:20", title: "Impossible travel detected", tone: "critical" },
            { time: "Today 09:17", title: "VPN login from UAE", tone: "warning" },
            { time: "Today 09:00", title: "Login successful · India", tone: "success" },
            { time: "Today 07:58–08:10", title: "Brute force · 12 failed attempts", tone: "critical" },
            { time: "Yesterday 16:30", title: "New device registered · iPhone 15", tone: "info" },
            { time: "Yesterday 16:31", title: "2FA challenge passed", tone: "success" },
            { time: "3 days ago", title: "Password reset completed", tone: "warning" },
          ]} />
        </Card>

        <AdminActionsCard
          safe={["Notify client", "Export security report", "Add note", "View device details"]}
          moderate={["Request verification", "Require password change", "Enable monitoring", "Reset session trust"]}
          dangerous={["Force logout all", "Reset 2FA", "Lock account", "Block device", "Block IP", "Restrict country", "Suspend login"]}
        />
      </section>

      <AuditTrailCard rows={[
        ["Country block — RU", "Security Team", "Brute force from RU IP", "Today 08:15"],
        ["Withdrawal locked", "Compliance", "Impossible travel alert", "Today 09:25"],
        ["Session monitoring on", "Admin · J. Singh", "Multi-country sessions", "Today 09:30"],
        ["Device blocked · Linux", "Fraud Team", "Unknown suspicious device", "Today 10:00"],
        ["2FA reset", "Admin", "Client request verified", "3 days ago"],
        ["Force logout", "Security Team", "Suspicious RU session", "3 days ago"],
      ]} />
    </div>
  );
}

/* ============================================================================
   TAB 3 — PERMISSIONS & ACCESS
   ============================================================================ */

export function PermissionsAccessTab() {
  return (
    <div className="space-y-8">
      <section>
        <SectionTitle kicker="01 · Access summary" title="Account capabilities" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <KpiTile label="Permission profile" value="VIP Trader" tone="brand" />
          <KpiTile label="Active permissions" value="28" tone="success" />
          <KpiTile label="Restrictions" value="3" tone="critical" />
          <KpiTile label="Trading status" value="Enabled" tone="success" />
          <KpiTile label="Withdrawals" value="Restricted" sub="AML hold" tone="critical" />
          <KpiTile label="Copy trading" value="Enabled" tone="success" />
          <KpiTile label="IB access" value="Disabled" tone="neutral" />
          <KpiTile label="Last perm change" value="7d ago" sub="Risk team" tone="info" />
          <KpiTile label="Compliance flags" value="2" tone="warning" />
          <KpiTile label="Feature flags" value="3 enabled" tone="info" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill tone="success">Trading enabled</Pill>
          <Pill tone="success">MT5 access</Pill>
          <Pill tone="success">Copy trading</Pill>
          <Pill tone="warning">Leverage restricted</Pill>
          <Pill tone="critical">Withdrawal locked</Pill>
          <Pill tone="critical">AML review open</Pill>
          <Pill tone="brand">⭐ VIP access</Pill>
          <Pill tone="info">IB partner</Pill>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <PermissionGroup title="Trading permissions" kicker="02" items={[
          ["Open trades", true], ["Close trades", true], ["Modify orders", true], ["Create pending orders", true],
          ["Expert advisors", true], ["Hedging", true], ["Scalping", "restricted"], ["High frequency trading", false],
        ]} />
        <PermissionGroup title="Financial permissions" kicker="03" items={[
          ["Deposit funds", true], ["Withdraw funds", "restricted"], ["Internal transfers", true],
          ["Bonus eligibility", true], ["Wallet transfers", true], ["Commission withdrawals", true], ["Profit withdrawals", "restricted"],
        ]} />
        <PermissionGroup title="Platform permissions" kicker="04" items={[
          ["MT4", true], ["MT5", true], ["WebTrader", true], ["Mobile app", true], ["API access", false], ["FIX API", false],
        ]} />
        <PermissionGroup title="Copy trading" kicker="05" items={[
          ["Become provider", true], ["Become follower", true], ["Create strategy", false], ["Receive followers", true], ["Profit sharing", true], ["Provider ranking", true],
        ]} />
        <PermissionGroup title="IB / Partner" kicker="06" items={[
          ["Referral program", true], ["Commission access", true], ["Sub-IB creation", false], ["Marketing campaigns", true], ["Rebate management", true], ["Partner portal", true],
        ]} />
        <PermissionGroup title="Feature flags" kicker="11" items={[
          ["Beta features", false], ["VIP features", true], ["New wallet system", true], ["Advanced analytics", true], ["AI trading assistant", false], ["Premium reports", true],
        ]} />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="07 · Compliance restrictions" title="Active holds" />
          <div className="space-y-3">
            <div className="rounded-lg border border-[oklch(0.65_0.24_22/0.4)] bg-[oklch(0.65_0.24_22/0.06)] p-3">
              <div className="flex items-center justify-between"><div className="text-sm font-semibold">AML review open — withdrawals blocked</div><Pill tone="critical">Active</Pill></div>
              <div className="mt-1 text-xs text-muted-foreground">Since 12 May 2026 · Compliance · Ref <span className="font-mono text-foreground">AML-2026-4421</span></div>
            </div>
            <div className="rounded-lg border border-[oklch(0.80_0.16_75/0.35)] bg-[oklch(0.80_0.16_75/0.06)] p-3">
              <div className="flex items-center justify-between"><div className="text-sm font-semibold">Source of funds — document required</div><Pill tone="warning">Pending</Pill></div>
              <div className="mt-1 text-xs text-muted-foreground">Requested 10 May 2026 · Deadline 30 May 2026</div>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.02] p-3">
              <div className="flex items-center justify-between"><div className="text-sm font-semibold">PEP review</div><Pill tone="success">Clear</Pill></div>
              <div className="mt-1 text-xs text-muted-foreground">Last reviewed 2 May 2026</div>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="08 · Geographic restrictions" title="Country access" />
          <div className="divide-y divide-border overflow-hidden rounded-lg border border-border text-sm">
            {[["🇦🇪 UAE", "Resident", "success"], ["🇮🇳 India", "Allowed · travel restriction", "info"], ["🇷🇺 Russia", "Blocked", "critical"], ["🇳🇬 Nigeria", "Monitored", "warning"], ["🇬🇧 UK", "Allowed", "success"]].map(([c, s, t]) => (
              <div key={c as string} className="flex items-center justify-between px-3 py-2.5"><span>{c}</span><Pill tone={t as Tone}>{s as string}</Pill></div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="09 · Instrument access" title="Tradable products" />
          <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-3">
            {[["Forex", true], ["Indices", true], ["Commodities", true], ["Stocks", true], ["Crypto", "restricted"], ["Options", false], ["Futures", true]].map(([k, v]) => (
              <div key={k as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><span>{k}</span><PermBadge v={v as boolean | "restricted"} /></div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="10 · Leverage permissions" title="Risk-based caps" />
          <div className="rounded-lg border border-border bg-white/[0.02] p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs text-muted-foreground">Default</div><div className="mt-0.5 font-mono text-xl font-semibold">1:100</div></div>
              <div><div className="text-xs text-muted-foreground">Max allowed</div><div className="mt-0.5 font-mono text-xl font-semibold text-[oklch(0.88_0.16_75)]">1:500</div></div>
              <div><div className="text-xs text-muted-foreground">Account MT5-10291</div><div className="mt-0.5 font-mono text-foreground">1:100 · capped by Risk</div></div>
              <div><div className="text-xs text-muted-foreground">Compliance override</div><div className="mt-0.5 text-[oklch(0.82_0.20_22)]">Required</div></div>
            </div>
          </div>
          <div className="mt-3 flex gap-2"><button className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs">Restore default</button><button className="rounded-md border border-[oklch(0.80_0.16_75/0.35)] bg-[oklch(0.80_0.16_75/0.08)] px-3 py-1.5 text-xs text-[oklch(0.92_0.16_75)]">Override</button><button className="rounded-md border border-border bg-white/[0.03] px-3 py-1.5 text-xs">History</button></div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <Card className="p-5">
          <SectionTitle kicker="12 · Permission change history" title="What changed, when, by whom" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Permission</th><th className="px-3 py-2 text-left font-medium">Old</th><th className="px-3 py-2 text-left font-medium">New</th><th className="px-3 py-2 text-left font-medium">By</th><th className="px-3 py-2 text-left font-medium">Date</th></tr></thead>
              <tbody className="divide-y divide-border">
                {[["Withdrawal access", "Enabled", "Restricted", "Compliance", "12 May 10:12"], ["Leverage", "1:500", "1:100", "Risk team", "12 May 11:20"], ["Crypto trading", "Enabled", "Restricted", "Risk team", "14 May 14:02"], ["Premium reports", "Disabled", "Enabled", "Admin", "15 May 15:10"], ["Profile", "Retail", "VIP", "Admin", "16 May 09:30"]].map((r, i) => (
                  <tr key={i}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2 text-muted-foreground">{r[1]}</td><td className="px-3 py-2"><span className="text-[oklch(0.84_0.16_168)]">{r[2]}</span></td><td className="px-3 py-2 text-muted-foreground">{r[3]}</td><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[4]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="13 · Permission timeline" title="Today" />
          <Timeline items={[
            { time: "09:10", title: "KYC approved · Compliance team", tone: "success" },
            { time: "09:15", title: "Withdrawal access enabled — auto", tone: "success" },
            { time: "09:18", title: "MT5 access granted", tone: "info" },
            { time: "09:40", title: "Copy trading enabled", tone: "info" },
            { time: "10:20", title: "Leverage reduced 1:500 → 1:100 · Risk team", tone: "warning" },
            { time: "11:05", title: "AML restriction applied · AML-2026-4421", tone: "critical" },
            { time: "11:20", title: "Scalping restricted · Risk team", tone: "warning" },
            { time: "15:10", title: "Profile upgraded to VIP · Admin", tone: "brand" },
          ]} />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <AdminActionsCard
          safe={["View permissions", "Export access report", "Add note", "View restrictions"]}
          moderate={["Enable feature", "Disable feature", "Adjust leverage", "Grant platform access", "Apply profile"]}
          dangerous={["Suspend trading", "Block withdrawals", "Remove copy trading", "Disable IB access", "Suspend platform access", "Apply compliance restriction"]}
        />
        <AuditTrailCard rows={[
          ["Withdrawal restricted", "Compliance", "AML open", "10:12"],
          ["Leverage reduced", "Risk team", "Risk flag", "11:20"],
          ["Copy trading disabled", "Admin", "Manual override", "13:45"],
          ["VIP profile applied", "Admin · J. Singh", "Tier upgrade", "15:10"],
        ]} />
      </section>
    </div>
  );
}

function PermBadge({ v }: { v: boolean | "restricted" }) {
  if (v === "restricted") return <Pill tone="warning">Restricted</Pill>;
  return v ? <Pill tone="success">Enabled</Pill> : <Pill tone="neutral">Disabled</Pill>;
}

function PermissionGroup({ kicker, title, items }: { kicker: string; title: string; items: Array<[string, boolean | "restricted"]> }) {
  return (
    <Card className="p-5">
      <SectionTitle kicker={`${kicker} · ${title.toLowerCase()}`} title={title} />
      <div className="space-y-1.5 text-sm">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2">
            <span>{k}</span><PermBadge v={v} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ============================================================================
   TAB 4 — COMMUNICATION HISTORY
   ============================================================================ */

export function CommunicationHistoryTab() {
  const [channel, setChannel] = useState("Email");
  const channels = ["Email", "SMS", "Calls", "Live chat", "WhatsApp", "Notifications", "Campaigns"];
  return (
    <div className="space-y-8">
      <section>
        <SectionTitle kicker="01 · Communication summary" title="Engagement overview" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
          <KpiTile label="Total emails" value="284" sub="↑18 this month" tone="info" />
          <KpiTile label="Total SMS" value="142" sub="↑9 this week" tone="info" />
          <KpiTile label="Total calls" value="32" sub="Avg 4m 18s" tone="info" />
          <KpiTile label="Total chats" value="14" sub="4.6/5 rating" tone="success" />
          <KpiTile label="Unread messages" value="7" sub="Needs attention" tone="warning" />
          <KpiTile label="Failed deliveries" value="3" sub="2 email · 1 SMS" tone="warning" />
          <KpiTile label="Last communication" value="Today 09:10" sub="Email · support" tone="info" />
          <KpiTile label="Response rate" value="92%" sub="Above average" tone="success" />
          <KpiTile label="Avg response time" value="18 min" sub="Target 30 min" tone="success" />
          <KpiTile label="Preferred channel" value="WhatsApp" sub="Based on 3 months" tone="brand" />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2">
        {channels.map((c) => (
          <button key={c} onClick={() => setChannel(c)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${channel === c ? "border-[oklch(0.72_0.16_168/0.4)] bg-[oklch(0.72_0.16_168/0.12)] text-[oklch(0.84_0.16_168)]" : "border-border bg-card/60 text-muted-foreground hover:text-foreground"}`}>{c}</button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <input placeholder="Search subject or ID…" className="w-64 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[oklch(0.72_0.16_168)]" />
          <button className="rounded-lg bg-[oklch(0.72_0.16_168)] px-3 py-1.5 text-xs font-semibold text-[oklch(0.15_0.02_200)]">Compose {channel.toLowerCase()}</button>
        </div>
      </div>

      {channel === "Email" && (
        <Card className="p-5">
          <SectionTitle kicker="02 · Email history" title="Inbound & outbound" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Date</th><th className="px-3 py-2 text-left font-medium">Subject</th><th className="px-3 py-2 text-left font-medium">Direction</th><th className="px-3 py-2 text-left font-medium">Status</th><th className="px-3 py-2 text-left font-medium">Opens</th><th className="px-3 py-2 text-left font-medium">Sender</th><th className="px-3 py-2 text-left font-medium">Dept</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([
                  ["Today 09:10", "Withdrawal status update · TKT-4821", "Outbound", "Opened", "2", "Support L2", "Finance", "success"],
                  ["Yesterday 14:30", "KYC reminder — documents", "Outbound", "Delivered", "0", "Compliance", "KYC", "info"],
                  ["Jun 1, 11:20", "Re: Commission statement", "Inbound", "Replied", "—", "Client", "Finance", "success"],
                  ["May 30, 09:00", "Monthly account statement", "Outbound", "Clicked", "3", "System", "Auto", "success"],
                  ["May 28, 16:45", "VIP upgrade congratulations", "Outbound", "Opened", "1", "VIP Team", "VIP", "brand"],
                  ["May 25, 10:10", "Security alert — new device", "Outbound", "Failed", "0", "System", "Security", "critical"],
                ] as const).map((r, i) => (
                  <tr key={i} className="cursor-pointer hover:bg-white/[0.03]"><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[0]}</td><td className="px-3 py-2 max-w-[280px] truncate">{r[1]}</td><td className="px-3 py-2 text-muted-foreground">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[7] as Tone}>{r[3]}</Pill></td><td className="px-3 py-2 font-mono text-xs">{r[4]}</td><td className="px-3 py-2 text-muted-foreground">{r[5]}</td><td className="px-3 py-2 text-muted-foreground">{r[6]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Email drawer preview */}
          <div className="mt-5 rounded-xl border border-border bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">Email — Withdrawal status update · TKT-4821</div>
              <div className="flex gap-1.5"><Pill tone="info">Outbound</Pill><Pill tone="success">Opened</Pill><Pill tone="brand">VIP</Pill></div>
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">Email ID</div><div className="mt-1 font-mono text-foreground">EML-20260602-4821</div></div>
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">Sent</div><div className="mt-1">Today 09:10:00</div></div>
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">Open count</div><div className="mt-1">2 · last Today 09:14</div></div>
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">From</div><div className="mt-1">Meera Shah · support@broker.com</div></div>
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">To</div><div className="mt-1">ahmed.r@email.com</div></div>
              <div className="text-xs"><div className="font-mono uppercase tracking-wider text-muted-foreground">CC</div><div className="mt-1">finance@broker.com</div></div>
            </div>
            <div className="mt-4 rounded-lg border border-border bg-background/50 p-4 text-sm leading-relaxed text-foreground/90">
              Dear Ahmed, your withdrawal request <span className="font-mono">TXN-88231</span> for $15,000 is currently pending compliance clearance. Our finance team has prioritised your case and we will update you within the hour. Thank you for your patience.
            </div>
            <div className="mt-4">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Delivery tracking</div>
              <Timeline items={[
                { time: "09:10:00", title: "Email sent · Support L2", tone: "info" },
                { time: "09:10:04", title: "Email delivered", tone: "success" },
                { time: "09:12", title: "Email opened (1st) · iPhone · Dubai", tone: "success" },
                { time: "09:14", title: "Email opened (2nd)", tone: "success" },
                { time: "09:15", title: "Viewed by Finance L2 agent", tone: "info" },
              ]} />
            </div>
          </div>
        </Card>
      )}

      {channel === "SMS" && (
        <Card className="p-5">
          <SectionTitle kicker="03 · SMS history" title="Transactional & marketing" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Date</th><th className="px-3 py-2 text-left font-medium">Message</th><th className="px-3 py-2 text-left font-medium">Status</th><th className="px-3 py-2 text-left font-medium">Number</th><th className="px-3 py-2 text-left font-medium">Type</th></tr></thead>
              <tbody className="divide-y divide-border">
                {[["Today 09:11", "Withdrawal processing notification…", "Delivered", "+971 50 ••• 4421", "Transactional", "success"], ["Today 08:12", "2FA OTP code 481209", "Delivered", "+971 50 ••• 4421", "Auth", "success"], ["Yesterday", "KYC document reminder", "Delivered", "+971 50 ••• 4421", "Compliance", "info"], ["May 27, 09:00", "Special offer: deposit & get 10% cashback", "Failed", "+971 50 ••• 4421", "Marketing", "critical"]].map((r, i) => (
                  <tr key={i}><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[0]}</td><td className="px-3 py-2 max-w-[320px] truncate">{r[1]}</td><td className="px-3 py-2"><Pill tone={r[5] as Tone}>{r[2]}</Pill></td><td className="px-3 py-2 font-mono text-xs">{r[3]}</td><td className="px-3 py-2 text-muted-foreground">{r[4]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {channel === "Calls" && (
        <Card className="p-5">
          <SectionTitle kicker="04 · Call history" title="Voice communications" />
          <div className="overflow-hidden rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Time</th><th className="px-3 py-2 text-left font-medium">Direction</th><th className="px-3 py-2 text-left font-medium">Agent</th><th className="px-3 py-2 text-left font-medium">Duration</th><th className="px-3 py-2 text-left font-medium">Outcome</th><th className="px-3 py-2 text-left font-medium">Recording</th></tr></thead>
              <tbody className="divide-y divide-border">
                {([["Today 10:15", "Inbound", "Support L2 · M. Shah", "8m 42s", "Resolved", "Available", "success"], ["Yesterday 16:10", "Outbound", "VIP · P. Nair", "12m 04s", "Connected", "Available", "success"], ["May 28, 11:22", "Inbound", "Compliance · A. Bose", "3m 18s", "Voicemail", "—", "info"], ["May 22, 10:30", "Inbound", "Risk Team", "6m 14s", "Escalated", "Available", "warning"]] as const).map((r, i) => (
                  <tr key={i}><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2">{r[2]}</td><td className="px-3 py-2 font-mono">{r[3]}</td><td className="px-3 py-2"><Pill tone={r[6] as Tone}>{r[4]}</Pill></td><td className="px-3 py-2 text-muted-foreground">🔊 {r[5]}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-white/[0.02] p-4 text-sm">
            <div className="flex items-center justify-between"><span className="font-semibold">Call recording — 8m 42s</span><Pill tone="info">CALL-20260602-0842.mp3</Pill></div>
            <p className="mt-1 text-xs text-muted-foreground">Secure playback. Recording access requires manager permission. Playback is logged.</p>
            <div className="mt-3 flex items-center gap-3">
              <button className="grid h-9 w-9 place-items-center rounded-full bg-[oklch(0.72_0.16_168)] text-background">▶</button>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-1/3 rounded-full bg-[oklch(0.72_0.16_168)]" /></div>
              <span className="font-mono text-xs text-muted-foreground">02:54 / 08:42</span>
            </div>
          </div>
        </Card>
      )}

      {channel === "Live chat" && (
        <Card className="p-5">
          <SectionTitle kicker="05 · Live chat" title="Support conversations" />
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Date</th><th className="px-3 py-2 text-left font-medium">Agent</th><th className="px-3 py-2 text-left font-medium">Duration</th><th className="px-3 py-2 text-left font-medium">Outcome</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {[["Today 15:00", "Support L2 · M. Shah", "25m 14s", "Resolved", "success"], ["May 28, 12:10", "Finance · K. Verma", "14m 02s", "Resolved", "success"], ["May 25, 14:55", "Sales · T. Nguyen", "8m 42s", "Abandoned", "warning"]].map((r, i) => (
                    <tr key={i}><td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[0]}</td><td className="px-3 py-2">{r[1]}</td><td className="px-3 py-2 font-mono">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[4] as Tone}>{r[3]}</Pill></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-lg border border-border bg-white/[0.02] p-4">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">Transcript — withdrawal enquiry · 25m 14s</div>
              <div className="space-y-2 text-sm">
                <ChatBubble who="Client" time="15:00">Hi, my withdrawal of $15,000 is still pending. Any update?</ChatBubble>
                <ChatBubble who="Support" time="15:01" agent>Hi Ahmed, checking now — one moment.</ChatBubble>
                <ChatBubble who="Support" time="15:08" agent>Compliance has it as priority. I'll update you within the hour.</ChatBubble>
                <ChatBubble who="Client" time="15:16">OK thank you for the quick response.</ChatBubble>
              </div>
            </div>
          </div>
        </Card>
      )}

      {channel === "WhatsApp" && (
        <Card className="p-5">
          <SectionTitle kicker="06 · WhatsApp & messaging" title="Conversations" />
          <div className="rounded-lg border border-border bg-white/[0.02] p-4">
            <div className="mb-2 flex items-center justify-between"><div className="text-sm font-semibold">WhatsApp · Support thread</div><Pill tone="success">Active</Pill></div>
            <div className="space-y-2 text-sm">
              <ChatBubble who="Support" time="Today 08:50" agent>Withdrawal team has it as a priority. Update within the hour.</ChatBubble>
              <ChatBubble who="Client" time="Today 09:10">Thanks Meera, appreciate the quick reply.</ChatBubble>
            </div>
          </div>
        </Card>
      )}

      {channel === "Notifications" && (
        <Card className="p-5">
          <SectionTitle kicker="07 · Notifications" title="System-generated" />
          <div className="space-y-2 text-sm">
            {[["Deposit approved · $5,000", "Today 07:14", "success"], ["Withdrawal placed on hold", "Today 10:22", "critical"], ["New device registered · iPhone 15", "Yesterday 16:30", "info"], ["VIP tier upgraded", "16 May", "brand"], ["KYC documents required", "10 May", "warning"]].map(([t, w, tone]) => (
              <div key={t as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><span>{t}</span><div className="flex items-center gap-2"><span className="font-mono text-xs text-muted-foreground">{w}</span><Pill tone={tone as Tone}>Sent</Pill></div></div>
            ))}
          </div>
        </Card>
      )}

      {channel === "Campaigns" && (
        <Card className="p-5">
          <SectionTitle kicker="08 · Campaign communications" title="Marketing reach" />
          <div className="grid gap-2 md:grid-cols-2">
            {[["VIP Cashback May", "Opened · clicked", "brand"], ["Gold Trading Promo", "Opened", "info"], ["Re-engagement Q2", "Sent", "neutral"], ["Newsletter — June", "Bounced", "critical"]].map(([n, s, t]) => (
              <div key={n as string} className="rounded-md border border-border bg-white/[0.02] p-3"><div className="flex items-center justify-between"><div className="font-semibold text-sm">{n}</div><Pill tone={t as Tone}>{s as string}</Pill></div></div>
            ))}
          </div>
        </Card>
      )}

      {/* Preferences + Analytics + Risk flags */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5">
          <SectionTitle kicker="09 · Preferences" title="Channel consent" />
          <div className="divide-y divide-border rounded-lg border border-border text-sm">
            {[["Preferred channel", "WhatsApp", "brand"], ["Email consent", "Yes", "success"], ["SMS consent", "Yes", "success"], ["WhatsApp consent", "Yes", "success"], ["Push notifications", "Yes", "success"], ["Marketing consent", "No", "warning"], ["Language", "Arabic / English", "info"]].map(([k, v, t]) => (
              <div key={k as string} className="flex items-center justify-between px-3 py-2.5"><span className="text-muted-foreground">{k}</span><Pill tone={t as Tone}>{v as string}</Pill></div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="10 · Analytics" title="Engagement trends" />
          <Sparkline data={[40, 55, 48, 62, 58, 70, 65, 78, 82, 75, 88, 92]} />
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">Open rate</div><div className="mt-0.5 font-mono">68%</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">Click rate</div><div className="mt-0.5 font-mono">24%</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">Reply rate</div><div className="mt-0.5 font-mono">42%</div></div>
            <div className="rounded-md border border-border bg-white/[0.02] p-2"><div className="text-muted-foreground">CSAT</div><div className="mt-0.5 font-mono">4.6 / 5</div></div>
          </div>
        </Card>

        <Card className="p-5">
          <SectionTitle kicker="11 · Risk flags" title="Communication issues" />
          <div className="space-y-1.5 text-sm">
            {[["Unreachable client", "warning"], ["Email bounce detected", "critical"], ["Invalid phone number", "warning"], ["Marketing opt-out spike", "info"], ["Aggressive language detected", "critical"]].map(([k, t]) => (
              <div key={k as string} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><span>{k}</span><Pill tone={t as Tone}>{(t as string).toUpperCase()}</Pill></div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Card className="p-5">
          <SectionTitle kicker="12 · Comms timeline" title="Today" />
          <Timeline items={[
            { time: "09:00", title: "Email sent · withdrawal update", tone: "info" },
            { time: "09:05", title: "Email opened", tone: "success" },
            { time: "09:10", title: "WhatsApp client reply", tone: "success" },
            { time: "09:15", title: "Support chat started", tone: "info" },
            { time: "09:40", title: "Call completed · 8m 42s", tone: "success" },
            { time: "10:10", title: "Campaign email clicked", tone: "info" },
          ]} />
        </Card>
        <AdminActionsCard
          safe={["Send email", "Send SMS", "Send WhatsApp", "Add note"]}
          moderate={["Assign agent", "Create ticket", "Escalate", "Schedule callback"]}
          dangerous={["Block channel", "Mark as harassment", "Disable marketing", "Wipe history"]}
        />
      </section>
    </div>
  );
}

function ChatBubble({ who, time, agent, children }: { who: string; time: string; agent?: boolean; children: ReactNode }) {
  return (
    <div className={`flex ${agent ? "justify-start" : "justify-end"}`}>
      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${agent ? "rounded-tl-sm bg-white/[0.04] border border-border" : "rounded-tr-sm bg-[oklch(0.72_0.16_168/0.15)] border border-[oklch(0.72_0.16_168/0.3)]"}`}>
        <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{who} · {time}</div>
        <div className="mt-0.5">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================================
   TAB 5 — NOTES
   ============================================================================ */

export function NotesTab() {
  const [filter, setFilter] = useState("Important");
  const filters = ["Important", "All", "Risk", "Compliance", "Finance", "Trading", "Support", "IB / Partner", "Follow-ups", "Pinned"];

  return (
    <div className="space-y-8">
      <section>
        <SectionTitle kicker="01 · Notes summary" title="Internal knowledge base" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
          <KpiTile label="Total notes" value="82" sub="All depts" tone="info" />
          <KpiTile label="Open notes" value="14" sub="Active" tone="warning" />
          <KpiTile label="Closed notes" value="68" sub="Completed" tone="success" />
          <KpiTile label="High priority" value="7" sub="Urgent" tone="critical" />
          <KpiTile label="Follow-ups pending" value="4" sub="Outstanding" tone="warning" />
          <KpiTile label="Risk notes" value="8" sub="Risk team" tone="critical" />
          <KpiTile label="Compliance notes" value="5" sub="Under review" tone="warning" />
          <KpiTile label="Last note" value="2h ago" sub="Priya Nair" tone="info" />
          <KpiTile label="Pinned notes" value="3" sub="Always visible" tone="brand" />
          <KpiTile label="Attachments" value="22" sub="Across all notes" tone="info" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Pill tone="critical">AML review active</Pill>
          <Pill tone="warning">Withdrawal hold</Pill>
          <Pill tone="critical">Fraud investigation</Pill>
          <Pill tone="brand">VIP client</Pill>
          <Pill tone="critical">Legal case open</Pill>
        </div>
      </section>

      {/* Filters + composer */}
      <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
        <div className="flex flex-wrap items-center gap-1.5">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${filter === f ? "border-[oklch(0.72_0.16_168/0.4)] bg-[oklch(0.72_0.16_168/0.12)] text-[oklch(0.84_0.16_168)]" : "border-border bg-card/60 text-muted-foreground hover:text-foreground"}`}>{f}</button>
          ))}
        </div>
        <button className="rounded-lg bg-[oklch(0.72_0.16_168)] px-4 py-2 text-sm font-semibold text-[oklch(0.15_0.02_200)]">+ Create note</button>
      </div>

      {/* Important notes pinned cards */}
      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {[
          { id: "NOTE-8821", title: "AML review active", body: "High-leverage trading pattern detected. SOF documents pending. Withdrawal on hold.", team: "Risk team", date: "14 May 2026", tone: "critical", icon: "⚠" },
          { id: "NOTE-8822", title: "Withdrawal hold required", body: "$15,000 withdrawal pending compliance clearance. Do not release until AML review closed.", team: "Finance team", date: "15 May 2026", tone: "critical", icon: "🔒" },
          { id: "NOTE-8823", title: "Under fraud investigation", body: "Abnormal trade patterns flagged. Risk score 88. Joint review with compliance & dealing desk.", team: "Compliance", date: "16 May 2026", tone: "critical", icon: "⬒" },
          { id: "NOTE-8820", title: "VIP client — special handling", body: "Gold tier. VIP manager must be cc'd on all communications. Call before any compliance contact.", team: "VIP team", date: "10 May 2026", tone: "brand", icon: "♛" },
          { id: "NOTE-8819", title: "Legal case open", body: "External legal counsel engaged. All communications must be reviewed before dispatch.", team: "Legal / Compliance", date: "8 May 2026", tone: "critical", icon: "◬" },
          { id: "NOTE-8818", title: "High risk trading activity", body: "38 high-leverage XAUUSD positions in 12 minutes. Risk score 88. Manual review required.", team: "Risk engine", date: "7 May 2026", tone: "warning", icon: "∿" },
        ].map((n) => (
          <article key={n.id} className="group relative overflow-hidden rounded-xl border border-border bg-card/60 p-4 transition-colors hover:bg-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold"><span className="text-lg leading-none">{n.icon}</span><span>{n.title}</span></div>
              <Pill tone={n.tone as Tone}>{n.tone === "brand" ? "VIP" : "Critical"}</Pill>
            </div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{n.id} · {n.team} · Open · {n.date}</div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/85">{n.body}</p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>📎 2</span><span>·</span><span>💬 3</span><span>·</span><span>👥 Compliance + Risk</span><span className="ml-auto text-[oklch(0.84_0.16_168)] opacity-0 group-hover:opacity-100">Open ›</span>
            </div>
          </article>
        ))}
      </section>

      {/* Detailed note drawer view */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2">
            <Pill tone="critical">Risk note</Pill><Pill tone="critical">Critical</Pill><Pill tone="warning">Open</Pill><Pill tone="brand">Pinned</Pill>
          </div>
          <h2 className="font-display text-xl font-semibold">NOTE-8821 — High leverage XAUUSD alert</h2>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div>
            <SectionTitle kicker="Full note" title="Description" />
            <div className="space-y-3 rounded-lg border border-border bg-white/[0.02] p-4 text-sm leading-relaxed text-foreground/90">
              <p>Client opened <span className="font-mono text-foreground">38</span> high-leverage XAUUSD positions within <span className="font-mono text-foreground">12 minutes</span> on account <span className="font-mono text-[oklch(0.84_0.16_168)]">MT5-10291</span>.</p>
              <p>Risk monitoring system generated an automated alert. Risk score increased from <span className="font-mono text-foreground">62</span> to <span className="font-mono text-[oklch(0.82_0.20_22)]">88</span>.</p>
              <p>Manual review required by dealing desk and compliance team. Potential excessive exposure.</p>
              <p>Trading activity appears consistent with a Martingale strategy pattern — further investigation required before any withdrawal release.</p>
            </div>

            <div className="mt-5">
              <SectionTitle kicker="Comments & discussion" title="Team thread" />
              <div className="space-y-3">
                {[
                  { who: "Risk team", time: "Today 09:20", text: "Exposure review completed. 38 positions totalling 12 lots on XAUUSD. Margin usage at 94%. Flagged to compliance and dealing desk." },
                  { who: "Compliance", time: "Today 10:00", text: "SOF documents requested from client. Awaiting response. Withdrawal hold confirmed until review completed." },
                  { who: "Finance", time: "Today 10:20", text: "Withdrawal of $15,000 placed on hold pending compliance clearance. TXN-88231 frozen." },
                ].map((c) => (
                  <div key={c.who + c.time} className="rounded-lg border border-border bg-white/[0.02] p-3">
                    <div className="flex items-center justify-between text-xs"><span className="font-medium text-foreground">{c.who}</span><span className="font-mono text-muted-foreground">{c.time}</span></div>
                    <p className="mt-1.5 text-sm text-foreground/85">{c.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-border bg-white/[0.02] p-3">
                <textarea placeholder="Add a comment… @mention team" rows={2} className="w-full resize-none bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex gap-2"><button className="hover:text-foreground">📎 Attach</button><button className="hover:text-foreground">@mention</button></div>
                  <button className="rounded-md bg-[oklch(0.72_0.16_168)] px-3 py-1 text-xs font-semibold text-[oklch(0.15_0.02_200)]">Post</button>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <SectionTitle kicker="Follow-up tasks" title="Outstanding actions" />
              <div className="overflow-hidden rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Task</th><th className="px-3 py-2 text-left font-medium">Assigned</th><th className="px-3 py-2 text-left font-medium">Due</th><th className="px-3 py-2 text-left font-medium">Status</th></tr></thead>
                  <tbody className="divide-y divide-border">
                    {[["Collect SOF documents", "Compliance", "20 May", "Pending", "warning"], ["Review trading · dealing desk sign-off", "Risk team", "22 May", "In progress", "info"], ["Contact client · VIP call", "VIP team", "21 May", "Open", "warning"]].map((r, i) => (
                      <tr key={i}><td className="px-3 py-2">{r[0]}</td><td className="px-3 py-2 text-muted-foreground">{r[1]}</td><td className="px-3 py-2 font-mono text-xs">{r[2]}</td><td className="px-3 py-2"><Pill tone={r[4] as Tone}>{r[3]}</Pill></td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="mt-2 text-xs text-[oklch(0.84_0.16_168)] hover:underline">+ Add task row</button>
            </div>
          </div>

          <aside className="space-y-4">
            <Card className="p-4">
              <SectionTitle kicker="Overview" title="Metadata" />
              <div className="divide-y divide-border text-sm">
                {[["Note ID", "NOTE-8821"], ["Category", "Risk"], ["Sub-category", "High leverage trading"], ["Priority", "Critical"], ["Status", "Open"], ["Risk score", "88 / 100"], ["Risk level", "High risk"], ["Alert source", "Risk engine (automated)"], ["Review status", "Under review"], ["Created by", "Risk engine"], ["Assigned to", "Compliance team"], ["Visibility", "Internal · all teams"], ["Created", "14 May 2026"], ["Last updated", "Today 10:30"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between py-2"><span className="text-muted-foreground">{k}</span><span className="font-medium text-foreground">{v}</span></div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <SectionTitle kicker="Related" title="Linked entities" />
              <div className="space-y-2 text-sm">
                <div className="rounded-md border border-border bg-white/[0.02] px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Account</div><div className="font-mono text-[oklch(0.84_0.16_168)]">MT5-10291</div></div>
                <div className="rounded-md border border-border bg-white/[0.02] px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Transaction</div><div className="font-mono">TXN-88231 · $15,000 · Held</div></div>
                <div className="rounded-md border border-border bg-white/[0.02] px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ticket</div><div className="font-mono">TKT-4821</div></div>
                <div className="rounded-md border border-border bg-white/[0.02] px-3 py-2"><div className="text-[10px] uppercase tracking-wider text-muted-foreground">Campaign</div><div>VIP Cashback · Gold Trading Promo</div></div>
              </div>
            </Card>

            <Card className="p-4">
              <SectionTitle kicker="Attachments" title="Evidence" />
              <div className="space-y-2 text-sm">
                {[["risk_report_14May.pdf", "2.4 MB"], ["XAUUSD_trades_export.csv", "182 KB"], ["sof_request_letter.pdf", "412 KB"]].map(([n, s]) => (
                  <div key={n} className="flex items-center justify-between rounded-md border border-border bg-white/[0.02] px-3 py-2"><div className="flex items-center gap-2"><span>📄</span><span className="truncate">{n}</span></div><span className="font-mono text-xs text-muted-foreground">{s}</span></div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </Card>

      {/* All notes list */}
      <Card className="p-5">
        <SectionTitle kicker="02 · All notes" title="Full ledger" action={<FilterBar items={["All", "Open", "Closed", "Critical"]} />} />
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.03] text-[11px] uppercase tracking-wider text-muted-foreground"><tr><th className="px-3 py-2 text-left font-medium">Note ID</th><th className="px-3 py-2 text-left font-medium">Category</th><th className="px-3 py-2 text-left font-medium">Subject</th><th className="px-3 py-2 text-left font-medium">Priority</th><th className="px-3 py-2 text-left font-medium">Status</th><th className="px-3 py-2 text-left font-medium">Created by</th><th className="px-3 py-2 text-left font-medium">Assigned</th><th className="px-3 py-2 text-left font-medium">Date</th></tr></thead>
            <tbody className="divide-y divide-border">
              {([
                ["NOTE-8823", "Compliance", "Fraud investigation joint review", "Critical", "Open", "Compliance", "Compliance + Risk", "16 May 2026", "critical"],
                ["NOTE-8822", "Finance", "Withdrawal hold $15,000", "Critical", "Open", "Finance", "Finance", "15 May 2026", "critical"],
                ["NOTE-8821", "Risk", "High leverage XAUUSD alert", "Critical", "Open", "Risk engine", "Compliance", "14 May 2026", "critical"],
                ["NOTE-8820", "VIP", "VIP special handling", "High", "Open", "VIP team", "VIP team", "10 May 2026", "brand"],
                ["NOTE-8819", "Legal", "Legal counsel engaged", "Critical", "Open", "Legal", "Compliance", "8 May 2026", "critical"],
                ["NOTE-8818", "Risk", "38 XAUUSD positions burst", "High", "Open", "Risk engine", "Risk team", "7 May 2026", "warning"],
                ["NOTE-8817", "Trading", "Hedging approved", "Medium", "Closed", "Dealing desk", "Dealing desk", "5 May 2026", "info"],
                ["NOTE-8814", "Support", "Callback requested · call before contact", "Medium", "Closed", "Support L2", "Support", "8 May 2026", "neutral"],
                ["NOTE-8812", "Finance", "Commission adjustment", "Low", "Closed", "Finance", "IB team", "2 May 2026", "neutral"],
              ] as const).map((r) => (
                <tr key={r[0]} className="cursor-pointer hover:bg-white/[0.03]">
                  <td className="px-3 py-2 font-mono text-xs text-[oklch(0.84_0.16_168)]">{r[0]}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r[1]}</td>
                  <td className="px-3 py-2 max-w-[280px] truncate">{r[2]}</td>
                  <td className="px-3 py-2"><Pill tone={r[3] === "Critical" ? "critical" : r[3] === "High" ? "warning" : r[3] === "Medium" ? "info" : "neutral"}>{r[3]}</Pill></td>
                  <td className="px-3 py-2"><Pill tone={r[4] === "Open" ? "warning" : "success"}>{r[4]}</Pill></td>
                  <td className="px-3 py-2 text-muted-foreground">{r[5]}</td>
                  <td className="px-3 py-2 text-muted-foreground">{r[6]}</td>
                  <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{r[7]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <Card className="p-5">
          <SectionTitle kicker="03 · Notes timeline" title="Note lifecycle" />
          <Timeline items={[
            { time: "Today 10:45", title: "Legal hold activated · Compliance", tone: "critical" },
            { time: "Today 10:30", title: "Note edited · priority updated · Risk team", tone: "warning" },
            { time: "Today 10:20", title: "Finance comment added", tone: "info" },
            { time: "Today 10:00", title: "Compliance comment · SOF requested", tone: "warning" },
            { time: "Today 09:20", title: "Risk team comment · exposure review", tone: "warning" },
            { time: "14 May", title: "Note created · Risk engine (automated)", tone: "info" },
          ]} />
        </Card>
        <AdminActionsCard
          safe={["Add note", "Add comment", "Pin note", "Export notes"]}
          moderate={["Reassign", "Change priority", "Close note", "Add follow-up"]}
          dangerous={["Delete note", "Remove pin globally", "Purge attachments", "Override visibility"]}
        />
      </section>

      <AuditTrailCard rows={[
        ["Note created · NOTE-8821", "Risk engine", "Automated trigger", "14 May 09:20"],
        ["Comment added", "Compliance · A. Bose", "SOF documents requested", "Today 10:00"],
        ["Priority updated · High → Critical", "Risk team", "Risk score 88", "Today 10:30"],
        ["Legal hold activated", "Compliance", "External counsel engaged", "Today 10:45"],
        ["Pinned globally", "Admin · J. Singh", "Cross-team visibility", "Today 11:00"],
      ]} />
    </div>
  );
}
