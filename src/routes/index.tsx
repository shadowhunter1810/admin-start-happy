import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  Briefcase,
  CircleDollarSign,
  Clock,
  FileText,
  Flame,
  Layers,
  LineChart,
  Plus,
  Settings,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  Wifi,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from "lucide-react";
import { ClientShell } from "@/components/client/ClientShell";
import { Bar, KPI, Pill, Progress, Row, Section } from "@/components/client/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview · Arjun Raghunathan — Atlas CRM" },
      { name: "description", content: "Operational overview of client and IB activity." },
    ],
  }),
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <ClientShell>
      {/* Top KPI strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <KPI label="Equity" value="$19,080" sub="Live · all accounts" icon={<TrendingUp className="h-4 w-4" />} tone="success" />
        <KPI label="Net deposit" value="$61,200" sub="Lifetime" icon={<CircleDollarSign className="h-4 w-4" />} />
        <KPI label="Daily P&L" value="+$590" sub="Today" tone="success" icon={<LineChart className="h-4 w-4" />} />
        <KPI label="Margin usage" value="42%" sub="of available margin" tone="warning" icon={<Activity className="h-4 w-4" />} />
        <KPI label="Open positions" value="12" sub="4 pending orders" icon={<Layers className="h-4 w-4" />} />
        <KPI label="Active alerts" value="5" sub="2 high priority" tone="destructive" icon={<Bell className="h-4 w-4" />} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        {/* LEFT COLUMN */}
        <div className="col-span-12 space-y-4 xl:col-span-8">
          {/* Risk & Alerts */}
          <Section
            title="Risk & Alerts"
            icon={<AlertTriangle className="h-4 w-4" />}
            right={<Pill tone="destructive">5 active</Pill>}
          >
            <ul className="space-y-2">
              {[
                { tone: "destructive", title: "Withdrawal pending manual review", desc: "$500 · TXN-8819934 · 18h waiting", action: "Review" },
                { tone: "warning", title: "PEP match — compliance approval required", desc: "Tier 2 match · AML-2026-0041 open", action: "Open" },
                { tone: "info", title: "Login from new IP detected", desc: "185.142.22.1 · Unknown location · 12 May", action: "Details" },
                { tone: "warning", title: "High leverage position detected", desc: "1:200 · GBP/JPY · 2.0 lots", action: "Monitor" },
                { tone: "info", title: "Address proof document still pending", desc: "Utility bill · Submitted 10 May", action: "Approve" },
              ].map((a, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-border/60 bg-surface/50 p-3"
                >
                  <Pill tone={a.tone as any}>!</Pill>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium">{a.title}</div>
                    <div className="text-[11px] text-muted-foreground">{a.desc}</div>
                  </div>
                  <button className="rounded-md border border-border bg-surface px-2 py-1 text-[11px] font-medium hover:bg-surface-2">
                    {a.action}
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          {/* Financial + Trading Snapshot */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Section title="Financial Snapshot" icon={<CircleDollarSign className="h-4 w-4" />}>
              <Row label="Equity" value="$19,080" />
              <Row label="Free margin" value="$11,020" />
              <Row label="Net exposure" value="$216,000" />
              <Row label="Pending withdrawal" value="$500" badge={<Pill tone="warning">Hold</Pill>} />
              <Row label="Bonus locked" value="$270" />
              <Row label="Neg. balance protection" value="Not eligible" badge={<Pill tone="muted">FSA</Pill>} />

              <div className="mt-3 space-y-1">
                <Progress label="Margin usage" value={42} tone="warning" />
                <Progress label="Bonus turnover" value={41} tone="primary" />
                <Progress label="Withdrawal limit used" value={10} tone="success" />
              </div>
            </Section>

            <Section title="Trading Snapshot" icon={<LineChart className="h-4 w-4" />}>
              <div className="grid grid-cols-2 gap-x-4">
                <Row label="Open positions" value="12" />
                <Row label="Pending orders" value="4" />
                <Row label="Today's volume" value="84 lots" />
                <Row label="Drawdown" value="-4.2%" />
                <Row label="Most traded" value="EUR/USD" />
                <Row label="Largest exposure" value="XAU/USD" />
                <Row label="Algo / EA" value={<Pill tone="success">Enabled</Pill>} />
                <Row label="Copy trading" value={<Pill tone="muted">Off</Pill>} />
              </div>

              <div className="mt-3 rounded-lg border border-border/60 bg-surface/40 p-3">
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Symbol bias
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    ["EUR/USD", "Buy heavy", "success"],
                    ["XAU/USD", "High vol", "warning"],
                    ["GBP/JPY", "Sell bias", "info"],
                    ["BTC/USD", "Very high risk", "destructive"],
                  ].map(([s, t, tone]) => (
                    <div key={s as string} className="flex items-center justify-between rounded-md bg-card/60 px-2 py-1.5">
                      <span className="font-medium">{s}</span>
                      <Pill tone={tone as any}>{t}</Pill>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </div>

          {/* Live Exposure */}
          <Section
            title="Live Exposure"
            icon={<Flame className="h-4 w-4" />}
            right={<span className="text-[11px] text-muted-foreground num">Total · $272K</span>}
          >
            <div className="space-y-2">
              {[
                ["EUR/USD", 120, "Medium", "warning"],
                ["XAU/USD", 84, "High", "destructive"],
                ["GBP/JPY", 48, "Low", "success"],
                ["BTC/USD", 12, "Very High", "destructive"],
                ["NAS100", 8, "Low", "success"],
              ].map(([sym, k, lvl, tone]) => {
                const pct = ((k as number) / 272) * 100;
                return (
                  <div key={sym as string} className="grid grid-cols-12 items-center gap-3 text-xs">
                    <div className="col-span-2 font-medium">{sym}</div>
                    <div className="col-span-2 num text-muted-foreground">${k}K</div>
                    <div className="col-span-6"><Bar value={pct} tone={tone as any} /></div>
                    <div className="col-span-2 text-right"><Pill tone={tone as any}>{lvl}</Pill></div>
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Timeline */}
          <Section
            title="Timeline Feed"
            icon={<Clock className="h-4 w-4" />}
            right={
              <div className="flex gap-1">
                {["All", "Trading", "Financial", "Compliance", "Security", "Support"].map((t, i) => (
                  <button
                    key={t}
                    className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${
                      i === 0
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            }
          >
            <ol className="relative ml-2 space-y-3 border-l border-border/60 pl-4">
              {[
                { i: "💱", t: "EUR/USD Buy 2.0 lots opened", d: "MT5-100421 · Price 1.08421 · Margin $2,160", time: "Today 09:05" },
                { i: "💰", t: "Deposit $2,000 cleared", d: "TXN-8821049 · Wire transfer · HDFC Bank", time: "Today 08:12", tone: "success" },
                { i: "⚠️", t: "Withdrawal request $500 — pending", d: "TXN-8819934 · Manual review required", time: "Yesterday 14:20", tone: "warning" },
                { i: "🎧", t: "Ticket #TKT-4821 opened", d: "Withdrawal not processed — assigned to Support L2", time: "Yesterday 15:00" },
                { i: "🔒", t: "Login from unknown IP flagged", d: "185.142.22.1 · 2FA failed attempt", time: "12 May 11:02", tone: "destructive" },
                { i: "🚨", t: "AML alert triggered — Rule R-14", d: "Rapid deposit pattern · Case AML-2026-0041 opened", time: "16 May 10:00", tone: "destructive" },
                { i: "💵", t: "IB commission $1,240 — pending payout", d: "Apr 2026 · 155 lots · Plan B $8/lot", time: "1 May 08:00" },
              ].map((e, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[22px] top-1.5 grid h-4 w-4 place-items-center rounded-full border border-border bg-background text-[10px]">
                    {e.i}
                  </span>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium">{e.t}</div>
                      <div className="text-[11px] text-muted-foreground">{e.d}</div>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{e.time}</span>
                  </div>
                </li>
              ))}
            </ol>
          </Section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 space-y-4 xl:col-span-4">
          <Section title="Operational Summary" icon={<Settings className="h-4 w-4" />}>
            <Row label="Assigned manager" value="Priya Nair" />
            <Row label="Current queue" value="VIP Retention" />
            <Row label="Lifecycle stage" value="Active Trader" />
            <Row label="Last login" value="Today 09:41 · Mumbai" />
            <Row label="Last trade" value="14 mins ago" />
            <Row label="Last deposit" value="$2,000 · Today" />
            <Row label="Preferred platform" value="MT5" />
            <Row label="Acquisition source" value="Google Ads" />
            <Row label="Retention score" value={<><span className="text-success">82</span>/100</>} badge={<Pill tone="success">Low risk</Pill>} />
          </Section>

          <Section title="Active Issues" icon={<ShieldAlert className="h-4 w-4" />}>
            {[
              ["Open tickets", "3", "2 high priority", "destructive"],
              ["Compliance review", "1", "PEP match", "warning"],
              ["Financial hold", "1", "Withdrawal", "warning"],
              ["Pending approvals", "2", "KYC + W/D", "info"],
              ["AML investigation", "1", "Open", "destructive"],
            ].map(([k, n, d, tone]) => (
              <div key={k as string} className="flex items-center justify-between border-b border-border/40 py-2 last:border-b-0">
                <div>
                  <div className="text-xs font-medium">{k}</div>
                  <div className="text-[11px] text-muted-foreground">{d}</div>
                </div>
                <Pill tone={tone as any}>{n}</Pill>
              </div>
            ))}
          </Section>

          <Section title="Relationship Summary" icon={<Users className="h-4 w-4" />}>
            <Row label="Referral source" value="Google Ads" />
            <Row label="IB parent" value="IB-00201 · Rajesh K." />
            <Row label="Sub-IBs" value="12" />
            <Row label="Referred (total)" value="147" />
            <Row label="Referred (active)" value="38" />
            <Row label="Last contact" value="Yesterday · Priya N." />
            <Row label="Preferred contact" value="Email · WhatsApp" />
          </Section>

          <Section title="Smart Actions" icon={<Zap className="h-4 w-4" />}>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["Create ticket", FileText],
                ["Add note", Plus],
                ["Approve KYC", ShieldAlert],
                ["Send email", Sparkles],
                ["Request docs", Briefcase],
                ["Schedule call", Wifi],
                ["Freeze trading", AlertTriangle],
                ["Approve W/D", CircleDollarSign],
                ["Assign mgr", Users],
              ].map(([label, Icon]: any) => (
                <button
                  key={label}
                  className="flex flex-col items-center gap-1 rounded-lg border border-border/60 bg-surface/50 p-2 text-[10px] font-medium hover:bg-surface-2"
                >
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  {label}
                </button>
              ))}
            </div>
          </Section>

          <Section title="Recent Transactions" icon={<Wallet className="h-4 w-4" />}>
            {[
              { t: "Deposit", amt: "+$2,000", id: "TXN-8821049 · Wire", time: "Today 08:12", tone: "success", up: true },
              { t: "Withdrawal", amt: "-$500", id: "TXN-8819934 · Bank · Pending", time: "Yesterday", tone: "warning", up: false },
              { t: "Deposit", amt: "+€1,200", id: "TXN-8818201 · Card", time: "3d ago", tone: "success", up: true },
              { t: "Internal transfer", amt: "$800", id: "TXN-8816003 · Wallet→MT5", time: "5d ago", tone: "info", up: true },
              { t: "Bonus credit", amt: "+$250", id: "TXN-8812240 · Admin", time: "8d ago", tone: "primary", up: true },
            ].map((tx, i) => (
              <div key={i} className="flex items-center gap-3 border-b border-border/40 py-2 last:border-b-0">
                <div className={`grid h-7 w-7 place-items-center rounded-md ${tx.up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                  {tx.up ? <ArrowDownRight className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{tx.t}</span>
                    <Pill tone={tx.tone as any}>{tx.time}</Pill>
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{tx.id}</div>
                </div>
                <div className="text-xs font-semibold num">{tx.amt}</div>
              </div>
            ))}
          </Section>

          <Section title="Recent Notes" icon={<FileText className="h-4 w-4" />}>
            {[
              { who: "Priya Nair", when: "Yesterday 14:30", tag: "Compliance", text: "Withdrawal delay explained to client. Finance escalated. PEP approval still pending compliance sign-off." },
              { who: "Rajan Mehta", when: "16 May", tag: "AML", text: "AML case AML-2026-0041 opened — Rule R-14 rapid deposit pattern. EDD docs under review." },
              { who: "Admin", when: "14 May", tag: "Risk", text: "Client requested leverage increase to 1:500 on MT5. Pending risk team approval." },
            ].map((n, i) => (
              <div key={i} className="border-b border-border/40 py-2 last:border-b-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{n.who}</span>
                  <div className="flex items-center gap-2">
                    <Pill tone="info">{n.tag}</Pill>
                    <span className="text-[10px] text-muted-foreground">{n.when}</span>
                  </div>
                </div>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">{n.text}</p>
              </div>
            ))}
          </Section>
        </div>
      </div>
    </ClientShell>
  );
}
