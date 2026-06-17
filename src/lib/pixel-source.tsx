// extracted from pixel-perfect-ui — exports tab components for use across multiple routes

import { useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowUpRight, Award, BadgeCheck,
  Bell, Bookmark, Briefcase, ChartBar, CheckCircle2, ChevronRight, Clock,
  Coins, Copy, CreditCard, DollarSign, Download, ExternalLink, Eye, FileText,
  Filter, Flag, Gauge, Globe, Headphones, History, Inbox, Key, Layers, Lock,
  type LucideIcon, Mail, MapPin, MessageSquare, MoreHorizontal, Phone, Search,
  Settings, Share2, Shield, ShieldAlert, ShieldCheck, Star, TrendingDown,
  TrendingUp, UserCheck, Users, Wallet, XCircle, Zap, Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";

/* ─────────────────────────────  HELPERS  ───────────────────────────── */

function copyToClipboard(text: string, label = "Copied") {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(text).then(
      () => toast.success(label, { description: text }),
      () => toast.error("Copy failed"),
    );
  } else {
    toast.success(label, { description: text });
  }
}

function notify(title: string, description?: string) {
  toast(title, { description });
}

// (route declaration removed — see src/routes/* for the per-tab routes)


/* ─────────────────────────────  PRIMITIVES  ───────────────────────────── */

function Section({ title, action, children, subtitle }: { title: string; action?: ReactNode; children: ReactNode; subtitle?: string }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-[15px] font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Kpi({ label, value, hint, trend, icon: Icon, accent }: {
  label: string; value: string; hint?: string; trend?: { dir: "up" | "down"; v: string }; icon?: LucideIcon; accent?: "primary" | "success" | "warning" | "destructive" | "info";
}) {
  const accentMap = {
    primary: "text-primary bg-primary/10 ring-primary/20",
    success: "text-success bg-success/10 ring-success/20",
    warning: "text-warning bg-warning/10 ring-warning/20",
    destructive: "text-destructive bg-destructive/10 ring-destructive/20",
    info: "text-info bg-info/10 ring-info/20",
  } as const;
  const a = accentMap[accent ?? "primary"];
  return (
    <div className="kpi-card kpi-card-hover p-4 group">
      <div className="flex items-start justify-between gap-2">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</div>
        {Icon && <div className={`grid h-7 w-7 shrink-0 place-items-center rounded-md ring-1 ${a}`}><Icon className="h-3.5 w-3.5" /></div>}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="font-display text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
        {trend && (
          <span className={`inline-flex items-center text-[11px] font-medium ${trend.dir === "up" ? "text-success" : "text-destructive"}`}>
            {trend.dir === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend.v}
          </span>
        )}
      </div>
      {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
    </div>
  );
}

function Pill({ tone = "default", children, dot = false }: { tone?: "default" | "success" | "warning" | "destructive" | "info" | "primary" | "muted"; children: ReactNode; dot?: boolean }) {
  const map = {
    default: "bg-secondary text-secondary-foreground border-border",
    muted: "bg-muted text-muted-foreground border-border",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
    info: "bg-info/15 text-info border-info/30",
    primary: "bg-primary/15 text-primary border-primary/30",
  } as const;
  const dotMap = {
    default: "bg-muted-foreground", muted: "bg-muted-foreground",
    success: "bg-success", warning: "bg-warning",
    destructive: "bg-destructive", info: "bg-info", primary: "bg-primary",
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[11px] font-medium ${map[tone]}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotMap[tone]}`} />}
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`glass-panel rounded-xl ${className}`}>{children}</div>;
}

function DataRow({ label, value, mono = false }: { label: string; value: ReactNode; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-foreground font-medium ${mono ? "font-mono text-[13px]" : ""}`}>{value}</span>
    </div>
  );
}

function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <th className={`text-left text-[11px] uppercase tracking-wider font-medium text-muted-foreground px-3 py-2.5 ${className}`}>{children}</th>;
}
function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-3 py-2.5 text-sm ${className}`}>{children}</td>;
}

function MiniBars({ values, accent = "primary" }: { values: number[]; accent?: "primary" | "info" | "success" }) {
  const max = Math.max(...values);
  const c = accent === "primary" ? "bg-primary" : accent === "info" ? "bg-info" : "bg-success";
  return (
    <div className="flex items-end gap-1 h-12">
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm bg-muted/40 relative overflow-hidden">
          <div className={`absolute bottom-0 left-0 right-0 ${c} opacity-80`} style={{ height: `${(v / max) * 100}%` }} />
        </div>
      ))}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const max = Math.max(...values), min = Math.min(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 100},${100 - ((v - min) / (max - min || 1)) * 100}`).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="oklch(0.78 0.16 75)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,100 ${pts} 100,100`} fill="url(#sg)" stroke="none" />
      <polyline points={pts} fill="none" stroke="oklch(0.78 0.16 75)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Donut({ segments }: { segments: { label: string; value: number; color: string }[] }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  let acc = 0;
  const r = 32, c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
        {segments.map((s, i) => {
          const len = (s.value / total) * c;
          const dash = `${len} ${c - len}`;
          const offset = -((acc / total) * c);
          acc += s.value;
          return <circle key={i} cx="40" cy="40" r={r} fill="none" stroke={s.color} strokeWidth="10" strokeDasharray={dash} strokeDashoffset={offset} />;
        })}
      </svg>
      <div className="space-y-1.5 text-sm">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
            <span className="text-muted-foreground">{s.label}</span>
            <span className="font-medium tabular-nums ml-auto">{Math.round((s.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Funnel({ stages }: { stages: { label: string; value: number; pct: number }[] }) {
  return (
    <div className="space-y-2">
      {stages.map((s, i) => (
        <div key={s.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-foreground font-medium">{s.label}</span>
            <span className="font-mono text-xs text-muted-foreground">{s.value.toLocaleString()} · {s.pct}%</span>
          </div>
          <div className="h-7 rounded-md bg-muted/30 overflow-hidden relative">
            <div
              className="h-full rounded-md bg-gradient-to-r from-primary/80 to-accent/70 transition-all"
              style={{ width: `${s.pct}%`, opacity: 1 - i * 0.08 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────  HEADER  ───────────────────────────── */

function TopBar({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  const notifs = [
    { t: "Withdrawal $5,000 pending review", d: "10:20 today · Compliance", tone: "warning" as const },
    { t: "PEP Tier 2 match flagged", d: "Today 06:00 · AML-2026-0041", tone: "destructive" as const },
    { t: "New follower joined Gold Scalper", d: "1h ago · 842 total", tone: "info" as const },
    { t: "Ticket TKT-4821 escalated", d: "2d ago · Finance", tone: "destructive" as const },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-14 items-center gap-4 px-6">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-warning text-primary-foreground font-display font-bold">N</div>
          <div className="font-display font-semibold tracking-tight">Nexus<span className="text-muted-foreground">CRM</span></div>
        </div>
        <nav className="hidden md:flex items-center gap-1 ml-4 text-sm text-muted-foreground">
          <button onClick={() => notify("Clients", "Navigate to clients list")} className="hover:text-foreground">Clients</button>
          <ChevronRight className="h-3.5 w-3.5" />
          <button onClick={() => notify("All Clients", "Filter applied")} className="hover:text-foreground">All Clients</button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Arjun Raghunathan</span>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients, tickets, transactions…"
              className="pl-8 w-80 bg-surface border-border"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><XCircle className="h-4 w-4" /></button>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-3 border-b border-border font-display font-semibold text-sm">Notifications · {notifs.length}</div>
              <div className="max-h-80 overflow-y-auto divide-y divide-border/70">
                {notifs.map((n, i) => (
                  <button key={i} onClick={() => notify(n.t, n.d)} className="w-full text-left p-3 hover:bg-muted/30 flex gap-2">
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full bg-${n.tone}`} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium">{n.t}</div>
                      <div className="text-xs text-muted-foreground">{n.d}</div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-2 border-t border-border"><Button size="sm" variant="ghost" className="w-full" onClick={() => notify("Marked all as read")}>Mark all as read</Button></div>
            </PopoverContent>
          </Popover>
          <Button size="icon" variant="ghost" onClick={() => notify("Settings", "Settings panel opening…")}><Settings className="h-4 w-4" /></Button>
          <Avatar className="h-8 w-8 ring-1 ring-border"><AvatarFallback className="bg-accent/20 text-accent text-xs font-semibold">PM</AvatarFallback></Avatar>
        </div>
      </div>
    </header>
  );
}

function ClientHero({ openAction }: { openAction: (k: ActionKind) => void }) {
  return (
    <div className="px-6 pt-6">
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-start gap-6 p-6 sm:flex sm:flex-wrap sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="relative shrink-0">
                <Avatar className="h-16 w-16 ring-2 ring-primary/30">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-warning text-primary-foreground font-display text-lg font-semibold">AR</AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-success ring-2 ring-card" />
              </div>
              <div className="min-w-0 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-xl sm:text-2xl font-semibold tracking-tight truncate">Arjun Raghunathan</h1>
                  <Pill tone="primary" dot><Star className="h-3 w-3" />VIP</Pill>
                  <Pill tone="success" dot>Active</Pill>
                  <Pill tone="warning" dot><Award className="h-3 w-3" />Gold IB · Tier 3</Pill>
                  <Pill tone="destructive" dot><ShieldAlert className="h-3 w-3" />PEP Tier 2</Pill>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[12px]"><Key className="h-3.5 w-3.5" />CL-00022010 · IB-00412</span>
                  <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />arjun.r@gmail.com</span>
                  <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />+91 98760 12345</span>
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />Mumbai, India</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />Last seen 15 min ago</span>
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" className="border-border bg-surface" onClick={() => openAction("message")}><MessageSquare className="h-4 w-4" />Message</Button>
              <Button variant="outline" size="sm" className="border-border bg-surface" onClick={() => openAction("call")}><Phone className="h-4 w-4" />Call</Button>
              <Button variant="outline" size="sm" className="border-border bg-surface" onClick={() => openAction("note")}><FileText className="h-4 w-4" />Add Note</Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"><Zap className="h-4 w-4" />Actions</Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-56 p-1">
                  {[
                    { l: "Reset 2FA", k: "reset2fa" as ActionKind, icon: ShieldCheck },
                    { l: "Reset Password", k: "resetpw" as ActionKind, icon: Key },
                    { l: "Suspend Account", k: "suspend" as ActionKind, icon: Lock, danger: true },
                    { l: "Approve Withdrawal", k: "approve" as ActionKind, icon: CheckCircle2 },
                    { l: "Escalate to Compliance", k: "escalate" as ActionKind, icon: Flag, danger: true },
                  ].map((a) => (
                    <button key={a.k} onClick={() => openAction(a.k)} className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted/50 ${a.danger ? "text-destructive" : ""}`}>
                      <a.icon className="h-4 w-4" />{a.l}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></PopoverTrigger>
                <PopoverContent align="end" className="w-48 p-1">
                  <button onClick={() => copyToClipboard("CL-00022010", "Client ID copied")} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"><Copy className="h-4 w-4" />Copy ID</button>
                  <button onClick={() => notify("Profile exported", "PDF download started")} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"><Download className="h-4 w-4" />Export profile</button>
                  <button onClick={() => notify("Bookmarked", "Pinned to dashboard")} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-muted/50"><Bookmark className="h-4 w-4" />Bookmark</button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-border border-t border-border">
            {[
              { l: "Lifetime Value", v: "$284,000", h: "↑ $12.4k this mo" },
              { l: "Net Deposits", v: "$182,400", h: "32 transactions" },
              { l: "Total Volume", v: "82,000 lots", h: "Across 4 accounts" },
              { l: "Commission Earned", v: "$120,420", h: "$1,240 pending" },
              { l: "Open P&L", v: "+$12,420", h: "8 open positions" },
              { l: "Risk Score", v: "82/100", h: "High · Tier 2" },
            ].map((m) => (
              <div key={m.l} className="bg-card p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{m.l}</div>
                <div className="mt-1 font-display text-lg font-semibold tracking-tight tabular-nums">{m.v}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">{m.h}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─────────────────────────────  TABS  ───────────────────────────── */

const TABS = [
  { v: "copy", label: "Copy & Social Trading", icon: Share2 },
  { v: "kyc", label: "KYC & Compliance", icon: ShieldCheck },
  { v: "support", label: "Support & Tickets", icon: Headphones },
  { v: "activity", label: "Activity Logs", icon: Activity },
  { v: "ib", label: "IB / Partner", icon: Briefcase },
  { v: "referrals", label: "Referrals / Clients", icon: Users },
  { v: "commissions", label: "Commissions & Rebates", icon: Coins },
  { v: "analytics", label: "IB Analytics", icon: ChartBar },
] as const;

/* ─────────────────────────────  TAB: COPY TRADING  ───────────────────────────── */

export function CopyTradingTab({ openDrawer }: { openDrawer: (d: DrawerData) => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
        <Kpi label="Provider Accounts" value="2" hint="Strategy providers" icon={Share2} accent="primary" />
        <Kpi label="Follower Accounts" value="3" hint="Copying others" icon={Users} accent="info" />
        <Kpi label="Total Followers" value="842" trend={{ dir: "up", v: "+38" }} icon={Users} accent="success" />
        <Kpi label="Assets Under Copy" value="$82,000" hint="Allocated funds" icon={Wallet} accent="primary" />
        <Kpi label="Copy Trading P&L" value="+$12,420" trend={{ dir: "up", v: "8.2%" }} icon={TrendingUp} accent="success" />
        <Kpi label="Profit Share" value="$2,120" hint="Provider earnings" icon={Coins} accent="warning" />
        <Kpi label="Active Allocations" value="12" hint="Live copies" icon={Layers} accent="info" />
        <Kpi label="Risk Alerts" value="3" hint="Require review" icon={AlertTriangle} accent="destructive" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="My Provider Accounts" subtitle="Accounts where this client provides strategies for others to copy" action={<Button size="sm" variant="outline" className="bg-surface" onClick={() => notify("Export started", "CSV will download shortly")}><Download className="h-3.5 w-3.5" />Export</Button>}>
            <Card>
              <table className="w-full">
                <thead className="border-b border-border">
                  <tr><Th>Account</Th><Th>Strategy</Th><Th>Followers</Th><Th>AUM</Th><Th>ROI 30d</Th><Th>Drawdown</Th><Th>Risk</Th><Th>Status</Th></tr>
                </thead>
                <tbody className="divide-y divide-border/70">
                  {[
                    { acc: "MT5-10293", strat: "Gold Scalper", f: 842, aum: "$1.2M", roi: "+18.2%", dd: "14%", risk: "Medium", st: "Active" },
                    { acc: "MT5-88211", strat: "Swing Master", f: 122, aum: "$420K", roi: "+9.1%", dd: "6%", risk: "Low", st: "Active" },
                  ].map((r) => (
                    <tr key={r.acc} className="hover:bg-muted/30 cursor-pointer" onClick={() => openDrawer({ kind: "provider", id: r.acc })}>
                      <Td className="font-mono text-[13px]">{r.acc}</Td>
                      <Td><div className="flex items-center gap-2"><div className="h-7 w-7 rounded-md bg-primary/15 grid place-items-center"><Star className="h-3.5 w-3.5 text-primary" /></div><span className="font-medium">{r.strat}</span></div></Td>
                      <Td className="tabular-nums">{r.f.toLocaleString()}</Td>
                      <Td className="tabular-nums font-medium">{r.aum}</Td>
                      <Td className="text-success font-semibold tabular-nums">{r.roi}</Td>
                      <Td><div className="flex items-center gap-2"><Progress value={parseInt(r.dd)} className="h-1.5 w-16" /><span className="text-xs tabular-nums">{r.dd}</span></div></Td>
                      <Td><Pill tone={r.risk === "Low" ? "success" : "warning"}>{r.risk}</Pill></Td>
                      <Td><Pill tone="success" dot>{r.st}</Pill></Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>
        </div>
        <Section title="Provider Rankings" subtitle="Top 5 by ROI in network">
          <Card className="p-4 space-y-3">
            {[
              { r: 1, n: "Rahul FX", roi: "+24%", f: 1240 },
              { r: 2, n: "Gold Scalper", roi: "+18%", f: 842 },
              { r: 3, n: "Alpha Trader", roi: "+15%", f: 612 },
              { r: 4, n: "Swing Master", roi: "+9%", f: 122 },
              { r: 5, n: "Eagle Eye", roi: "+7%", f: 88 },
            ].map((p) => (
              <div key={p.r} className="flex items-center gap-3">
                <div className={`grid h-7 w-7 place-items-center rounded-md font-display font-semibold text-xs ${p.r === 1 ? "bg-warning/20 text-warning" : p.r === 2 ? "bg-muted/40 text-foreground" : "bg-muted/30 text-muted-foreground"}`}>{p.r}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">{p.n}</div>
                  <div className="text-[11px] text-muted-foreground">{p.f.toLocaleString()} followers</div>
                </div>
                <div className="text-success font-semibold text-sm tabular-nums">{p.roi}</div>
              </div>
            ))}
          </Card>
        </Section>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="My Follower Accounts" subtitle="Accounts this client uses to copy others">
          <Card>
            <table className="w-full">
              <thead className="border-b border-border"><tr><Th>Account</Th><Th>Following</Th><Th>Allocation</Th><Th>P&L</Th></tr></thead>
              <tbody className="divide-y divide-border/70">
                {[
                  { a: "MT5-88291", f: "Rahul FX", al: "40% Equity", p: "+$820", pos: true },
                  { a: "MT5-11920", f: "Alpha Trader", al: "Fixed $5,000", p: "-$120", pos: false },
                  { a: "MT5-77104", f: "Eagle Eye", al: "Mirror 1:1", p: "+$340", pos: true },
                ].map((r) => (
                  <tr key={r.a} className="hover:bg-muted/30 cursor-pointer">
                    <Td className="font-mono text-[13px]">{r.a}</Td>
                    <Td>{r.f}</Td>
                    <Td><Pill tone="info">{r.al}</Pill></Td>
                    <Td className={`font-semibold tabular-nums ${r.pos ? "text-success" : "text-destructive"}`}>{r.p}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        <Section title="Allocation Management" subtitle="Equity protection rules">
          <Card className="p-4 space-y-3">
            {[
              { a: "MT5-88291 → Rahul FX", mode: "Percentage 40%", dd: 14, lim: 20 },
              { a: "MT5-11920 → Alpha", mode: "Fixed $5,000", dd: 7, lim: 15 },
            ].map((r) => (
              <div key={r.a} className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="flex justify-between text-sm font-medium">{r.a}<Pill tone="primary">{r.mode}</Pill></div>
                <div className="mt-2 text-xs text-muted-foreground flex justify-between"><span>Drawdown</span><span className="tabular-nums">{r.dd}% / {r.lim}%</span></div>
                <Progress value={(r.dd / r.lim) * 100} className="h-1.5 mt-1.5" />
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-success"><ShieldCheck className="h-3 w-3" />Equity protection enabled</div>
              </div>
            ))}
          </Card>
        </Section>

        <Section title="Risk Monitoring" subtitle="Active copy-trading alerts">
          <Card className="p-4 space-y-3">
            {[
              { sev: "destructive" as const, t: "High drawdown — Gold Scalper", d: "14% in last 24h · approaching 20% limit" },
              { sev: "warning" as const, t: "Rapid allocation change", d: "MT5-88291 increased from 25% → 40%" },
              { sev: "info" as const, t: "New follower spike", d: "+38 followers in 24h on Rahul FX" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-border bg-surface/40 p-3">
                <div className={`h-7 w-7 shrink-0 rounded-md grid place-items-center bg-${a.sev}/15 text-${a.sev}`}>
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{a.t}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.d}</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>
      </div>

      <Section title="Copy Trade History" subtitle="Only copy-generated trades (excludes manual trades)">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Ticket</Th><Th>Provider</Th><Th>Follower</Th><Th>Symbol</Th><Th>Side</Th><Th>Volume</Th><Th>P&L</Th><Th>Slippage</Th><Th>Copy Time</Th><Th>Status</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { t: "CT-8821", p: "Rahul FX", f: "MT5-88291", s: "XAUUSD", side: "Buy", v: "0.40", pl: "+$420", sl: "12ms", time: "09:12", st: "Closed" },
                { t: "CT-8822", p: "Rahul FX", f: "MT5-88291", s: "EURUSD", side: "Sell", v: "0.40", pl: "+$84", sl: "9ms", time: "10:05", st: "Open" },
                { t: "CT-8788", p: "Alpha Trader", f: "MT5-11920", s: "GBPJPY", side: "Buy", v: "0.50", pl: "-$120", sl: "18ms", time: "Yest. 22:31", st: "Closed" },
              ].map((r) => (
                <tr key={r.t} className="hover:bg-muted/30 cursor-pointer">
                  <Td className="font-mono text-[13px] text-primary">{r.t}</Td>
                  <Td>{r.p}</Td><Td className="font-mono text-[12px]">{r.f}</Td>
                  <Td className="font-semibold">{r.s}</Td>
                  <Td><Pill tone={r.side === "Buy" ? "success" : "destructive"}>{r.side}</Pill></Td>
                  <Td className="tabular-nums">{r.v}</Td>
                  <Td className={`font-semibold tabular-nums ${r.pl.startsWith("+") ? "text-success" : "text-destructive"}`}>{r.pl}</Td>
                  <Td className="text-muted-foreground tabular-nums">{r.sl}</Td>
                  <Td className="text-muted-foreground">{r.time}</Td>
                  <Td><Pill tone={r.st === "Open" ? "info" : "muted"} dot>{r.st}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>
    </div>
  );
}

/* ─────────────────────────────  TAB: KYC & COMPLIANCE  ───────────────────────────── */

export function KycTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { t: "KYC Status", v: "Under Review", d: "Address doc pending", tone: "warning" as const, icon: Clock },
          { t: "AML Status", v: "Needs Review", d: "PEP match · 1 case open", tone: "destructive" as const, icon: ShieldAlert },
          { t: "Risk Level", v: "High · 82/100", d: "Tier 2 · EDD required", tone: "destructive" as const, icon: Gauge },
          { t: "Withdrawal", v: "Blocked", d: "PEP approval pending", tone: "destructive" as const, icon: Lock },
        ].map((s) => (
          <Card key={s.t} className={`p-4 border-l-2 border-l-${s.tone}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.t}</div>
                <div className="mt-1 font-display text-lg font-semibold">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.d}</div>
              </div>
              <div className={`h-8 w-8 rounded-md grid place-items-center bg-${s.tone}/15 text-${s.tone}`}><s.icon className="h-4 w-4" /></div>
            </div>
          </Card>
        ))}
      </div>

      <Section title="Compliance Alerts" subtitle="Active items requiring review">
        <div className="grid md:grid-cols-2 gap-3">
          {[
            { i: ShieldAlert, t: "PEP Match — Tier 2", d: "Politically exposed person match requires senior compliance approval before withdrawals are released.", tone: "destructive" as const },
            { i: Lock, t: "Withdrawal hold active", d: "All withdrawals blocked pending AML case AML-2026-0041 resolution.", tone: "destructive" as const },
            { i: Clock, t: "Address proof pending review", d: "Utility bill submitted 10 May 2026. Awaiting compliance officer decision.", tone: "warning" as const },
            { i: AlertTriangle, t: "EDD required", d: "Client classified high-risk PEP. Additional documentation mandatory.", tone: "warning" as const },
          ].map((a, i) => (
            <Card key={i} className="p-4 flex gap-3">
              <div className={`h-9 w-9 shrink-0 rounded-md grid place-items-center bg-${a.tone}/15 text-${a.tone}`}><a.i className="h-4 w-4" /></div>
              <div className="min-w-0">
                <div className="font-medium text-sm">{a.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.d}</div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Verification Progress Matrix" subtitle="10-step KYC pipeline">
            <Card className="p-4 space-y-2">
              {[
                { s: 1, n: "Email Verification", st: "Approved", t: "success" as const },
                { s: 2, n: "Personal Information", st: "Approved", t: "success" as const },
                { s: 3, n: "Identity Document (Passport)", st: "Approved · v3", t: "success" as const },
                { s: 4, n: "Selfie Liveness", st: "Approved · 97.4% match", t: "success" as const },
                { s: 5, n: "Address Proof", st: "Under Review", t: "warning" as const },
                { s: 6, n: "Phone Verification", st: "Approved", t: "success" as const },
                { s: 7, n: "Source of Funds", st: "Approved", t: "success" as const },
                { s: 8, n: "Terms & Agreements", st: "Signed", t: "success" as const },
                { s: 9, n: "AML Screening", st: "Needs Review · PEP Tier 2", t: "destructive" as const },
                { s: 10, n: "Enhanced Due Diligence", st: "In Progress", t: "warning" as const },
              ].map((r) => (
                <div key={r.s} className="flex items-center gap-3 rounded-md hover:bg-muted/30 px-2 py-2">
                  <div className="grid h-7 w-7 place-items-center rounded-md bg-muted/40 font-mono text-xs">{r.s}</div>
                  <div className="flex-1 text-sm font-medium">{r.n}</div>
                  <Pill tone={r.t} dot>{r.st}</Pill>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </Card>
          </Section>
        </div>

        <Section title="Risk Score Breakdown" subtitle="Score 82 / 100 · High">
          <Card className="p-4 space-y-3">
            <div className="text-center py-3">
              <div className="font-display text-5xl font-bold text-destructive">82</div>
              <div className="text-xs text-muted-foreground mt-1">High Risk · Tier 2</div>
            </div>
            <Separator />
            {[
              { l: "PEP / Sanctions", v: 80, t: "destructive" as const },
              { l: "Financial behaviour", v: 68, t: "warning" as const },
              { l: "Geographic risk", v: 60, t: "warning" as const },
              { l: "Behavioural risk", v: 55, t: "warning" as const },
              { l: "Transaction risk", v: 45, t: "info" as const },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">{r.l}</span><span className="font-mono">{r.v}/100</span></div>
                <Progress value={r.v} className="h-1.5" />
              </div>
            ))}
          </Card>
        </Section>
      </div>

      <Section title="Documents Vault" subtitle="Encrypted document repository · 12 files · 8 approved, 3 rejected, 1 pending">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Document</Th><Th>Category</Th><Th>Version</Th><Th>Decision</Th><Th>Reviewer</Th><Th>Date</Th><Th>Action</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { d: "Passport.pdf", c: "Identity", v: "v3", st: "Approved", t: "success" as const, r: "compliance_12", dt: "22 May 2026" },
                { d: "Passport.pdf", c: "Identity", v: "v2", st: "Rejected", t: "destructive" as const, r: "SumSub AUTO", dt: "21 May 2026" },
                { d: "Passport.pdf", c: "Identity", v: "v1", st: "Rejected", t: "destructive" as const, r: "admin_22", dt: "20 May 2026" },
                { d: "Utility Bill.pdf", c: "Address", v: "v1", st: "Under Review", t: "warning" as const, r: "Rajan Mehta", dt: "10 May 2026" },
                { d: "Bank Statement.pdf", c: "Source of Funds", v: "v1", st: "Approved", t: "success" as const, r: "compliance_12", dt: "02 Aug 2023" },
                { d: "Tax Return 2024.pdf", c: "Source of Funds", v: "v1", st: "Approved", t: "success" as const, r: "compliance_12", dt: "02 Aug 2023" },
                { d: "T&C Agreement.pdf", c: "Legal", v: "v1", st: "Signed", t: "info" as const, r: "Client", dt: "20 May 2026" },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <Td><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" /><span className="font-medium">{r.d}</span></div></Td>
                  <Td className="text-muted-foreground">{r.c}</Td>
                  <Td><Pill tone="muted">{r.v}</Pill></Td>
                  <Td><Pill tone={r.t} dot>{r.st}</Pill></Td>
                  <Td className="text-muted-foreground">{r.r}</Td>
                  <Td className="text-muted-foreground">{r.dt}</Td>
                  <Td><Button size="sm" variant="ghost" className="h-7" onClick={(e) => { e.stopPropagation(); notify("Opening document", "Preview in viewer"); }}><Eye className="h-3.5 w-3.5" />View</Button></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <div className="grid lg:grid-cols-2 gap-4">
        <Section title="AML Screening Results" subtitle="SumSub · Refinitiv">
          <Card className="p-4 space-y-1.5">
            <DataRow label="Sanctions Check" value={<Pill tone="success" dot>CLEAR</Pill>} />
            <DataRow label="OFAC Check" value={<Pill tone="success" dot>CLEAR</Pill>} />
            <DataRow label="UN Sanctions" value={<Pill tone="success" dot>CLEAR</Pill>} />
            <DataRow label="Global Watchlists" value={<Pill tone="success" dot>CLEAR</Pill>} />
            <DataRow label="Adverse Media" value={<Pill tone="muted">None found</Pill>} />
            <DataRow label="PEP Check" value={<Pill tone="destructive" dot>POSSIBLE MATCH · Tier 2</Pill>} />
            <Separator className="my-2" />
            <DataRow label="Match Confidence" value="78%" mono />
            <DataRow label="AML Case ID" value="AML-2026-0041" mono />
            <DataRow label="Assigned Officer" value="Rajan Mehta" />
            <DataRow label="Last Screened" value="Today 06:00" />
          </Card>
        </Section>
        <Section title="Linked & Duplicate Accounts" subtitle="Anti-fraud detection">
          <Card>
            <div className="p-3 border-b border-border bg-destructive/5 flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span><strong>2 possible linked accounts</strong> — Same device fingerprint and IP range</span>
            </div>
            <table className="w-full">
              <thead className="border-b border-border"><tr><Th>Client</Th><Th>Match Signal</Th><Th>Strength</Th><Th>Status</Th></tr></thead>
              <tbody className="divide-y divide-border/70">
                <tr><Td className="font-mono text-[12px]">CL-00022011</Td><Td>Same device ID</Td><Td><Pill tone="destructive">91%</Pill></Td><Td><Pill tone="warning">Under review</Pill></Td></tr>
                <tr><Td className="font-mono text-[12px]">CL-00022015</Td><Td>Same IP range</Td><Td><Pill tone="warning">62%</Pill></Td><Td><Pill tone="success">Cleared</Pill></Td></tr>
              </tbody>
            </table>
          </Card>
        </Section>
      </div>
    </div>
  );
}

/* ─────────────────────────────  TAB: SUPPORT  ───────────────────────────── */

export function SupportTab({ openDrawer, openAction }: { openDrawer: (d: DrawerData) => void; openAction: (k: ActionKind) => void }) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Open Tickets" value="4" icon={Inbox} accent="warning" />
        <Kpi label="Pending" value="2" icon={Clock} accent="info" />
        <Kpi label="Escalated" value="1" icon={Flag} accent="destructive" />
        <Kpi label="Avg Resolution" value="6h 20m" icon={Gauge} accent="primary" />
        <Kpi label="Satisfaction" value="4.7 / 5" hint="Based on 8 ratings" icon={Star} accent="success" />
        <Kpi label="Support Health" value="82/100" trend={{ dir: "up", v: "3" }} icon={ShieldCheck} accent="success" />
      </div>

      <Section title="Open Tickets" subtitle="Active support requests" action={
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); notify("Filter applied", `Status: ${v}`); }}>
            <SelectTrigger className="h-8 w-36 bg-surface text-xs"><Filter className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="progress">In Progress</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => openAction("ticket")}><MessageSquare className="h-3.5 w-3.5" />New Ticket</Button>
        </div>
      }>
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Ticket</Th><Th>Subject</Th><Th>Category</Th><Th>Priority</Th><Th>Agent</Th><Th>Dept</Th><Th>SLA</Th><Th>Status</Th><Th>Created</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { id: "TKT-4821", s: "Withdrawal $500 not processed after 48h", c: "Withdrawal", pr: "Urgent", prt: "destructive" as const, ag: "Rahul Singh", d: "Finance", sla: "Breached", slat: "destructive" as const, st: "Escalated", stt: "destructive" as const, t: "2d ago" },
                { id: "TKT-4810", s: "MT5 login issue after 2FA reset", c: "Technical", pr: "High", prt: "warning" as const, ag: "Tech Team", d: "Tech", sla: "Met", slat: "success" as const, st: "In Progress", stt: "info" as const, t: "1d ago" },
                { id: "TKT-4710", s: "IB commission $1,240 not received", c: "IB Commission", pr: "Medium", prt: "info" as const, ag: "Priya Nair", d: "IB", sla: "Met", slat: "success" as const, st: "Open", stt: "warning" as const, t: "3d ago" },
                { id: "TKT-4688", s: "Deposit not credited after 6h", c: "Deposit", pr: "Medium", prt: "info" as const, ag: "Support L1", d: "Finance", sla: "Met", slat: "success" as const, st: "In Progress", stt: "info" as const, t: "8d ago" },
              ].map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => openDrawer({ kind: "ticket", id: r.id })}>
                  <Td className="font-mono text-[12px] text-primary font-medium">{r.id}</Td>
                  <Td className="font-medium max-w-xs truncate">{r.s}</Td>
                  <Td className="text-muted-foreground">{r.c}</Td>
                  <Td><Pill tone={r.prt} dot>{r.pr}</Pill></Td>
                  <Td>{r.ag}</Td>
                  <Td className="text-muted-foreground">{r.d}</Td>
                  <Td><Pill tone={r.slat}>{r.sla}</Pill></Td>
                  <Td><Pill tone={r.stt} dot>{r.st}</Pill></Td>
                  <Td className="text-muted-foreground text-xs">{r.t}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Live Chat History">
          <Card className="divide-y divide-border/70">
            {[
              { id: "CHAT-882", t: "Yest. 14:30", a: "Priya Nair", dur: "18 min", out: "Follow-up", tone: "warning" as const, r: 4.5 },
              { id: "CHAT-841", t: "5 days ago", a: "Rahul S.", dur: "12 min", out: "Resolved", tone: "success" as const, r: 5 },
              { id: "CHAT-798", t: "12 days ago", a: "Support L1", dur: "8 min", out: "Resolved", tone: "success" as const, r: 4.5 },
            ].map((c) => (
              <div key={c.id} className="p-3 hover:bg-muted/30 flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="font-mono text-xs text-primary">{c.id}</span><Pill tone={c.tone}>{c.out}</Pill></div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.a} · {c.dur} · {c.t}</div>
                </div>
                <div className="text-sm font-semibold text-warning">★ {c.r}</div>
              </div>
            ))}
          </Card>
        </Section>

        <Section title="Phone Call History">
          <Card className="divide-y divide-border/70">
            {[
              { id: "CALL-441", t: "Yest. 15:00", a: "Priya Nair", dur: "12 min", dir: "Outbound", out: "Resolved", tone: "success" as const },
              { id: "CALL-388", t: "3 days ago", a: "Support L2", dur: "24 min", dir: "Inbound", out: "Resolved", tone: "success" as const },
              { id: "CALL-310", t: "10 days ago", a: "VIP team", dur: "8 min", dir: "Outbound", out: "No answer", tone: "muted" as const },
            ].map((c) => (
              <div key={c.id} className="p-3 hover:bg-muted/30 flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2"><span className="font-mono text-xs text-primary">{c.id}</span><Pill tone={c.tone}>{c.out}</Pill></div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.a} · {c.dir} · {c.dur} · {c.t}</div>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        <Section title="Complaints">
          <Card className="divide-y divide-border/70">
            {[
              { id: "CMP-841", c: "Withdrawal delay", sev: "Major", t: "Compliance", st: "Open", stt: "warning" as const },
              { id: "CMP-839", c: "Slippage on XAUUSD", sev: "Moderate", t: "Dealing Desk", st: "Investigating", stt: "info" as const },
              { id: "CMP-838", c: "MT5 login issue", sev: "Minor", t: "Tech", st: "Open", stt: "warning" as const },
            ].map((c) => (
              <div key={c.id} className="p-3 hover:bg-muted/30">
                <div className="flex items-center gap-2"><span className="font-mono text-xs text-destructive">{c.id}</span><Pill tone={c.stt} dot>{c.st}</Pill></div>
                <div className="text-sm font-medium mt-1">{c.c}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.sev} · {c.t}</div>
              </div>
            ))}
          </Card>
        </Section>
      </div>
    </div>
  );
}

/* ─────────────────────────────  TAB: ACTIVITY LOGS  ───────────────────────────── */

export function ActivityTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Total Activities" value="14,293" icon={Activity} accent="primary" />
        <Kpi label="Today" value="148" trend={{ dir: "up", v: "12" }} icon={Zap} accent="info" />
        <Kpi label="Last Login" value="15m ago" hint="Chrome / macOS" icon={Clock} accent="success" />
        <Kpi label="Trades Today" value="42" icon={TrendingUp} accent="primary" />
        <Kpi label="Security Events" value="3" icon={Shield} accent="warning" />
        <Kpi label="Open Alerts" value="1" icon={AlertTriangle} accent="destructive" />
      </div>

      <Section title="Risk Flags" subtitle="3 active flags · Auto-tagged by risk engine">
        <div className="grid md:grid-cols-3 gap-3">
          {[
            { c: "destructive" as const, t: "Suspicious login", d: "Russia · 09:44 today · VPN suspected" },
            { c: "warning" as const, t: "Large withdrawal", d: "$5,000 · 10:20 today · Above threshold" },
            { c: "info" as const, t: "KYC pending review", d: "Address proof · 2 days waiting" },
          ].map((a) => (
            <Card key={a.t} className={`p-4 border-l-2 border-l-${a.c}`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`h-2 w-2 rounded-full bg-${a.c}`} />
                <div className="text-sm font-semibold">{a.t}</div>
              </div>
              <div className="text-xs text-muted-foreground">{a.d}</div>
            </Card>
          ))}
        </div>
      </Section>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Unified Activity Timeline" subtitle="All events · chronological" action={
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="bg-surface" onClick={() => notify("Filters", "Filter panel toggled")}><Filter className="h-3.5 w-3.5" />Filter</Button>
              <Button size="sm" variant="outline" className="bg-surface" onClick={() => notify("Export started", "CSV will download shortly")}><Download className="h-3.5 w-3.5" />Export</Button>
            </div>
          }>
            <Card className="p-4">
              <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {[
                  { i: UserCheck, t: "Login success", d: "Chrome / macOS · IP 103.21.44.1 · Mumbai", time: "09:12", c: "success" as const },
                  { i: TrendingUp, t: "Trade opened", d: "MT5-10231 · XAUUSD · Buy 1.20 lots @ 2352.18", time: "09:15", c: "primary" as const },
                  { i: DollarSign, t: "Deposit created", d: "$5,000 · Bank Wire · HSBC Dubai", time: "09:20", c: "info" as const },
                  { i: Inbox, t: "Ticket submitted", d: "TKT-4821 · Withdrawal $500 not processed", time: "09:28", c: "warning" as const },
                  { i: Wallet, t: "Withdrawal requested", d: "$5,000 · Pending compliance review", time: "10:20", c: "warning" as const },
                  { i: Lock, t: "Password changed", d: "Self-service · From settings", time: "10:12", c: "info" as const },
                  { i: AlertTriangle, t: "Suspicious login attempt", d: "Firefox / Windows · IP 185.220.101.x · Russia", time: "Yest. 22:41", c: "destructive" as const },
                  { i: ShieldCheck, t: "2FA verified", d: "SMS code · +91 98xxx x9922", time: "Yest. 22:39", c: "success" as const },
                ].map((e, i) => (
                  <div key={i} className="relative">
                    <div className={`absolute -left-[18px] top-0 grid h-5 w-5 place-items-center rounded-full bg-${e.c}/20 ring-4 ring-card`}>
                      <e.i className={`h-3 w-3 text-${e.c}`} />
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="font-medium text-sm">{e.t}</div>
                      <div className="font-mono text-[11px] text-muted-foreground shrink-0">{e.time}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{e.d}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Behavior KPIs">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3"><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Avg Logins/day</div><div className="font-display text-xl font-semibold mt-1">8</div></Card>
              <Card className="p-3"><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Avg Trades/day</div><div className="font-display text-xl font-semibold mt-1">27</div></Card>
              <Card className="p-3"><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Avg Deposit</div><div className="font-display text-xl font-semibold mt-1">$2.5k</div></Card>
              <Card className="p-3"><div className="text-[11px] text-muted-foreground uppercase tracking-wider">Top Device</div><div className="font-display text-base font-semibold mt-1">iPhone</div></Card>
            </div>
          </Section>
          <Section title="Activity Breakdown">
            <Card className="p-4">
              <Donut segments={[
                { label: "Trading", value: 45, color: "oklch(0.78 0.16 75)" },
                { label: "Financial", value: 25, color: "oklch(0.70 0.15 235)" },
                { label: "Login", value: 15, color: "oklch(0.72 0.16 155)" },
                { label: "Support", value: 10, color: "oklch(0.65 0.18 300)" },
                { label: "Other", value: 5, color: "oklch(0.65 0.20 25)" },
              ]} />
            </Card>
          </Section>
        </div>
      </div>

      <Section title="Security Activities" subtitle="Login, 2FA, device & IP events">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Time</Th><Th>Event</Th><Th>IP</Th><Th>Device</Th><Th>Country</Th><Th>Severity</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { t: "10:12", e: "Password changed", ip: "103.21.44.1", d: "Chrome / macOS", c: "🇮🇳 India", s: "Medium", st: "warning" as const },
                { t: "09:44", e: "Login from new device", ip: "185.220.101.x", d: "Firefox / Windows", c: "🇷🇺 Russia", s: "High", st: "destructive" as const },
                { t: "Yesterday", e: "2FA enabled", ip: "103.21.44.1", d: "Chrome / macOS", c: "🇮🇳 India", s: "Low", st: "success" as const },
                { t: "3d ago", e: "VPN login detected", ip: "45.142.x.x", d: "Safari / iPhone", c: "🇳🇱 NL", s: "Critical", st: "destructive" as const },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-muted/30">
                  <Td className="text-muted-foreground">{r.t}</Td>
                  <Td className="font-medium">{r.e}</Td>
                  <Td className="font-mono text-[12px]">{r.ip}</Td>
                  <Td className="text-muted-foreground">{r.d}</Td>
                  <Td>{r.c}</Td>
                  <Td><Pill tone={r.st} dot>{r.s}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>
    </div>
  );
}

/* ─────────────────────────────  TAB: IB / PARTNER  ───────────────────────────── */

export function IbTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2"><Award className="h-4 w-4 text-warning" /><div className="text-[11px] uppercase tracking-wider text-muted-foreground">Tier</div></div>
            <div className="font-display text-2xl font-semibold">Gold IB</div>
            <div className="text-xs text-muted-foreground">Tier 3 of 6 · $8/lot</div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
              <span>Starter</span><span>·</span><span>Silver</span><span>·</span><span className="text-warning font-semibold">Gold</span><span>·</span><span>Platinum</span><span>·</span><span>Diamond</span><span>·</span><span>VIP</span>
            </div>
          </div>
        </Card>
        <Kpi label="Total Referrals" value="147" hint="38 active · 109 lifetime" icon={Users} accent="info" />
        <Kpi label="Active Clients" value="38" hint="26% activation" icon={UserCheck} accent="success" />
        <Kpi label="Total Deposits" value="$284,000" hint="From referrals" icon={DollarSign} accent="primary" />
        <Kpi label="Trading Volume" value="2,840 lots" hint="Lifetime IB network" icon={TrendingUp} accent="primary" />
        <Kpi label="Commission Earned" value="$8,924" hint="Plan B · $8/lot" icon={Coins} accent="success" />
        <Kpi label="Pending" value="$1,240" hint="Due 01 Jun 2026" icon={Clock} accent="warning" />
        <Kpi label="Risk Level" value="Medium" hint="Health 82/100" icon={ShieldAlert} accent="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Partner Identity">
            <Card className="p-5 grid sm:grid-cols-2 gap-x-6 gap-y-1">
              <DataRow label="Partner ID" value="IB-00412" mono />
              <DataRow label="Partner Code" value="AR4120" mono />
              <DataRow label="Full Name" value="Arjun Raghunathan" />
              <DataRow label="Company" value="AR Financial Services Pvt Ltd" />
              <DataRow label="Partner Type" value={<Pill tone="primary">Corporate IB</Pill>} />
              <DataRow label="Registration" value="02 Jun 2022" />
              <DataRow label="Country" value="🇮🇳 India" />
              <DataRow label="Manager" value="Priya Nair" />
              <DataRow label="Upline IB" value="IB-00201 · Rajesh Kumar" />
              <DataRow label="Status" value={<Pill tone="success" dot>Active</Pill>} />
            </Card>
          </Section>

          <Section title="Commission Profile" subtitle="Hybrid plan · CPA + Revenue Share">
            <Card className="p-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-primary/10 border border-primary/30 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-primary">CPA</div>
                  <div className="font-display text-2xl font-semibold mt-1">$500</div>
                  <div className="text-xs text-muted-foreground">Per qualified client</div>
                </div>
                <div className="rounded-lg bg-accent/10 border border-accent/30 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-accent">Revenue Share</div>
                  <div className="font-display text-2xl font-semibold mt-1">20%</div>
                  <div className="text-xs text-muted-foreground">On net broker revenue</div>
                </div>
                <div className="rounded-lg bg-success/10 border border-success/30 p-3">
                  <div className="text-[11px] uppercase tracking-wider text-success">Rebate</div>
                  <div className="font-display text-2xl font-semibold mt-1">$8/lot</div>
                  <div className="text-xs text-muted-foreground">Tier 3 lot-based</div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="grid sm:grid-cols-2 gap-x-6">
                <DataRow label="Currency" value="USD" />
                <DataRow label="Payment Frequency" value="Monthly" />
                <DataRow label="Minimum Payout" value="$100" />
                <DataRow label="Next Payment" value="01 Jun 2026" />
              </div>
            </Card>
          </Section>
        </div>

        <div className="space-y-4">
          <Section title="Referral Links">
            <Card className="p-4 space-y-3">
              <div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Referral URL</div>
                <div className="flex items-center gap-2 rounded-md border border-border bg-surface p-2 text-xs font-mono">
                  <span className="flex-1 truncate">broker.com/r/AR4120</span>
                  <button onClick={() => copyToClipboard("https://broker.com/r/AR4120", "Referral URL copied")} className="text-primary hover:text-primary/80"><Copy className="h-3.5 w-3.5" /></button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div><div className="font-display text-lg font-semibold">4,820</div><div className="text-[10px] text-muted-foreground uppercase tracking-wider">Clicks</div></div>
                <div><div className="font-display text-lg font-semibold">147</div><div className="text-[10px] text-muted-foreground uppercase tracking-wider">Signups</div></div>
                <div><div className="font-display text-lg font-semibold text-success">3.05%</div><div className="text-[10px] text-muted-foreground uppercase tracking-wider">Conv</div></div>
              </div>
              <Separator />
              <div className="grid place-items-center p-3 rounded-md bg-white">
                <div className="grid grid-cols-8 gap-px">
                  {Array.from({ length: 64 }).map((_, i) => <div key={i} className={`h-2 w-2 ${Math.random() > 0.4 ? "bg-black" : "bg-white"}`} />)}
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-surface" onClick={() => notify("QR Code downloaded", "referral-qr-AR4120.png saved")}><Download className="h-3.5 w-3.5" />Download QR</Button>
            </Card>
          </Section>

          <Section title="Active Restrictions">
            <Card className="p-4 space-y-2">
              {[
                { r: "Commission Hold", s: "Not active", t: "muted" as const },
                { r: "Payment Hold", s: "Not active", t: "muted" as const },
                { r: "Referral Lock", s: "Not active", t: "muted" as const },
                { r: "Sub-IB Creation", s: "Disabled", t: "warning" as const },
                { r: "Campaign Access", s: "Limited", t: "warning" as const },
              ].map((r) => (
                <div key={r.r} className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-muted-foreground">{r.r}</span>
                  <Pill tone={r.t} dot={r.t !== "muted"}>{r.s}</Pill>
                </div>
              ))}
            </Card>
          </Section>
        </div>
      </div>

      <Section title="Sub-IB Network" subtitle="Partners under this IB">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Sub-IB</Th><Th>Tier</Th><Th>Clients</Th><Th>Volume</Th><Th>Commission</Th><Th>Status</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { id: "IB-00598", n: "Mehta Capital", t: "Silver", c: 24, v: "412 lots", cm: "$1,280", st: "Active" },
                { id: "IB-00612", n: "Trade Edge", t: "Starter", c: 8, v: "98 lots", cm: "$210", st: "Active" },
                { id: "IB-00701", n: "FX Bridge", t: "Silver", c: 18, v: "287 lots", cm: "$890", st: "Active" },
              ].map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 cursor-pointer">
                  <Td><div><div className="font-medium">{r.n}</div><div className="font-mono text-[11px] text-muted-foreground">{r.id}</div></div></Td>
                  <Td><Pill tone="muted">{r.t}</Pill></Td>
                  <Td className="tabular-nums">{r.c}</Td>
                  <Td className="tabular-nums">{r.v}</Td>
                  <Td className="font-semibold text-success tabular-nums">{r.cm}</Td>
                  <Td><Pill tone="success" dot>{r.st}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>
    </div>
  );
}

/* ─────────────────────────────  TAB: REFERRALS  ───────────────────────────── */

export function ReferralsTab({ openDrawer, search: globalSearch }: { openDrawer: (d: DrawerData) => void; search: string }) {
  const [localSearch, setLocalSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");

  const allClients = useMemo(() => [
    { id: "CLT-1041", n: "Mohammed Al-Rashid", c: "🇦🇪 AE", cc: "AE", st: "Active", stt: "success" as const, k: "Approved", kt: "success" as const, d: "$245,000", v: "12,400 lots", r: "$18,200", rk: "Low", rkt: "success" as const, vip: true },
    { id: "CLT-1037", n: "Emma Richardson", c: "🇬🇧 GB", cc: "GB", st: "Active", stt: "success" as const, k: "Approved", kt: "success" as const, d: "$128,000", v: "8,210 lots", r: "$9,840", rk: "Low", rkt: "success" as const, vip: false },
    { id: "CLT-1029", n: "Rahul Mehta", c: "🇮🇳 IN", cc: "IN", st: "Active", stt: "success" as const, k: "Approved", kt: "success" as const, d: "$54,000", v: "3,870 lots", r: "$4,120", rk: "Medium", rkt: "warning" as const, vip: false },
    { id: "CLT-1022", n: "Lena Fischer", c: "🇩🇪 DE", cc: "DE", st: "Dormant", stt: "muted" as const, k: "Approved", kt: "success" as const, d: "$12,500", v: "410 lots", r: "$620", rk: "Low", rkt: "success" as const, vip: false },
    { id: "CLT-1018", n: "Kevin Tan", c: "🇸🇬 SG", cc: "SG", st: "Active", stt: "success" as const, k: "Approved", kt: "success" as const, d: "$87,000", v: "5,640 lots", r: "$6,780", rk: "Low", rkt: "success" as const, vip: false },
    { id: "CLT-1014", n: "Sara Johansson", c: "🇸🇪 SE", cc: "SE", st: "Restricted", stt: "destructive" as const, k: "Approved", kt: "success" as const, d: "$31,000", v: "890 lots", r: "$1,040", rk: "High", rkt: "destructive" as const, vip: false },
  ], []);

  const query = (localSearch || globalSearch || "").toLowerCase().trim();
  const clients = useMemo(() => allClients.filter((c) => {
    if (query && !`${c.id} ${c.n} ${c.cc}`.toLowerCase().includes(query)) return false;
    if (statusFilter !== "all" && c.st.toLowerCase() !== statusFilter) return false;
    if (riskFilter !== "all" && c.rk.toLowerCase() !== riskFilter) return false;
    if (countryFilter !== "all" && c.cc !== countryFilter) return false;
    return true;
  }), [allClients, query, statusFilter, riskFilter, countryFilter]);

  function exportCsv() {
    const headers = ["id", "name", "country", "status", "deposit", "volume", "revenue", "risk"];
    const rows = clients.map((c) => [c.id, c.n, c.cc, c.st, c.d, c.v, c.r, c.rk].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    if (typeof window !== "undefined") {
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "referrals.csv"; a.click();
      URL.revokeObjectURL(url);
    }
    toast.success("Export complete", { description: `${clients.length} clients exported to referrals.csv` });
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Total Referrals" value="248" hint="All time" icon={Users} accent="info" />
        <Kpi label="Active" value="184" hint="74.2% active rate" icon={UserCheck} accent="success" />
        <Kpi label="VIP Clients" value="31" hint="12.5% of total" icon={Star} accent="warning" />
        <Kpi label="Total Deposits" value="$4.8M" hint="Lifetime" icon={DollarSign} accent="primary" />
        <Kpi label="Trading Volume" value="$126M" hint="All time lots" icon={TrendingUp} accent="primary" />
        <Kpi label="Revenue Generated" value="$189K" trend={{ dir: "up", v: "12%" }} icon={Coins} accent="success" />
      </div>

      <Section title="Referred Clients" subtitle={`${clients.length} of ${allClients.length} shown · Click any row for details`} action={
        <div className="flex gap-2 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-8 w-32 bg-surface text-xs"><Filter className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="dormant">Dormant</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="h-8 w-32 bg-surface text-xs"><Globe className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {["AE","GB","IN","DE","SG","SE"].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="h-8 w-28 bg-surface text-xs"><ShieldAlert className="h-3.5 w-3.5" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Risk</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" variant="outline" className="bg-surface" onClick={exportCsv}><Download className="h-3.5 w-3.5" />Export</Button>
        </div>
      }>
        <Card>
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Search client ID or name…" className="pl-8 bg-surface" />
            </div>
          </div>
          {clients.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No clients match the current filters.</div>
          ) : (
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Client</Th><Th>Country</Th><Th>Status</Th><Th>KYC</Th><Th>Deposit</Th><Th>Volume</Th><Th>Revenue</Th><Th>Risk</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {clients.map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => openDrawer({ kind: "client", id: r.id })}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback className="bg-muted text-foreground text-xs">{r.n.split(" ").map(x => x[0]).join("").slice(0,2)}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium flex items-center gap-1.5">{r.n}{r.vip && <Star className="h-3 w-3 text-warning fill-warning" />}</div>
                        <div className="font-mono text-[11px] text-muted-foreground">{r.id}</div>
                      </div>
                    </div>
                  </Td>
                  <Td>{r.c}</Td>
                  <Td><Pill tone={r.stt} dot>{r.st}</Pill></Td>
                  <Td><Pill tone={r.kt}>{r.k}</Pill></Td>
                  <Td className="font-medium tabular-nums">{r.d}</Td>
                  <Td className="text-muted-foreground tabular-nums">{r.v}</Td>
                  <Td className="font-semibold text-success tabular-nums">{r.r}</Td>
                  <Td><Pill tone={r.rkt}>{r.rk}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </Card>
      </Section>


      <div className="grid lg:grid-cols-2 gap-4">
        <Section title="Conversion Funnel" subtitle="Lead → VIP journey">
          <Card className="p-4">
            <Funnel stages={[
              { label: "Leads", value: 2400, pct: 100 },
              { label: "Registered", value: 1920, pct: 80 },
              { label: "KYC Approved", value: 1248, pct: 52 },
              { label: "Funded", value: 912, pct: 38 },
              { label: "Trading Active", value: 842, pct: 35 },
              { label: "VIP", value: 31, pct: 1.3 },
            ]} />
          </Card>
        </Section>
        <Section title="Risk Distribution">
          <Card className="p-4 grid grid-cols-5 gap-2 text-center">
            {[
              { l: "Low", v: 172, t: "success" as const },
              { l: "Medium", v: 56, t: "warning" as const },
              { l: "High", v: 7, t: "destructive" as const },
              { l: "AML", v: 5, t: "destructive" as const },
              { l: "Restricted", v: 8, t: "muted" as const },
            ].map((s) => (
              <div key={s.l} className={`rounded-lg p-3 bg-${s.t}/10 border border-${s.t}/30`}>
                <div className={`font-display text-2xl font-bold text-${s.t}`}>{s.v}</div>
                <div className="text-[11px] text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
              </div>
            ))}
          </Card>
        </Section>
      </div>
    </div>
  );
}

/* ─────────────────────────────  TAB: COMMISSIONS  ───────────────────────────── */

export function CommissionsTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Kpi label="Total Earned" value="$82,500" hint="All time" icon={DollarSign} accent="success" />
        <Kpi label="Pending" value="$12,200" hint="Awaiting payment" icon={Clock} accent="warning" />
        <Kpi label="Paid" value="$70,300" hint="Completed payouts" icon={CheckCircle2} accent="success" />
        <Kpi label="Rebates" value="$18,450" hint="All accounts" icon={Coins} accent="primary" />
        <Kpi label="Revenue Share" value="$31,200" hint="30% rev share" icon={TrendingUp} accent="info" />
        <Kpi label="CPA Earnings" value="$22,500" hint="45 qualified" icon={UserCheck} accent="primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Commission Breakdown">
          <Card className="p-4">
            <Donut segments={[
              { label: "Revenue Share", value: 31200, color: "oklch(0.78 0.16 75)" },
              { label: "Hybrid", value: 28800, color: "oklch(0.70 0.15 235)" },
              { label: "CPA", value: 22500, color: "oklch(0.72 0.16 155)" },
              { label: "Rebates", value: 18450, color: "oklch(0.65 0.18 300)" },
            ]} />
          </Card>
        </Section>

        <Section title="Payment Status">
          <Card className="p-4 space-y-3">
            {[
              { l: "Paid", v: "$70,300", p: 85, t: "success" as const },
              { l: "Pending", v: "$12,200", p: 15, t: "warning" as const },
              { l: "On Hold", v: "$3,200", p: 4, t: "destructive" as const },
            ].map((r) => (
              <div key={r.l}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="font-semibold tabular-nums">{r.v} <span className="text-muted-foreground font-normal">({r.p}%)</span></span>
                </div>
                <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
                  <div className={`h-full bg-${r.t} rounded-full`} style={{ width: `${r.p}%` }} />
                </div>
              </div>
            ))}
            <Separator className="my-2" />
            <div className="text-xs text-muted-foreground">Net total this period: <span className="text-foreground font-semibold">$98,500</span></div>
          </Card>
        </Section>

        <Section title="Monthly Earnings Trend">
          <Card className="p-4">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Last 8 months</div>
            <div className="font-display text-2xl font-semibold mt-1">$98,500</div>
            <div className="text-xs text-success">↑ 8.4% vs last month</div>
            <div className="mt-3"><Sparkline values={[42000, 45000, 48000, 52000, 49000, 58000, 65000, 82500]} /></div>
          </Card>
        </Section>
      </div>

      <Section title="Commission Transactions" subtitle="Every commission generated" action={
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="bg-surface" onClick={() => notify("Filter applied", "Showing all status")}><Filter className="h-3.5 w-3.5" />All Status</Button>
          <Button size="sm" variant="outline" className="bg-surface" onClick={() => notify("Export started", "CSV will download shortly")}><Download className="h-3.5 w-3.5" />Export</Button>
        </div>
      }>
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Transaction</Th><Th>Client</Th><Th>Account</Th><Th>Type</Th><Th>Amount</Th><Th>Status</Th><Th>Date</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { id: "TXN-8821", c: "John Martinez", a: "ACC-1021", t: "Revenue Share", am: "$4,260", s: "Paid", st: "success" as const, d: "30 May 2026" },
                { id: "TXN-8799", c: "Priya Nair", a: "ACC-1045", t: "Hybrid", am: "$3,450", s: "Pending", st: "warning" as const, d: "28 May 2026" },
                { id: "TXN-8777", c: "David Chen", a: "ACC-1077", t: "Revenue Share", am: "$2,040", s: "On Hold", st: "destructive" as const, d: "25 May 2026" },
                { id: "TXN-8744", c: "Sara Ali", a: "ACC-1103", t: "Rebate", am: "$570", s: "Paid", st: "success" as const, d: "20 May 2026" },
                { id: "TXN-8721", c: "Michael Tan", a: "ACC-2011", t: "CPA", am: "$1,040", s: "Pending", st: "warning" as const, d: "18 May 2026" },
              ].map((r) => (
                <tr key={r.id} className="hover:bg-muted/30 cursor-pointer">
                  <Td className="font-mono text-[12px] text-primary">{r.id}</Td>
                  <Td className="font-medium">{r.c}</Td>
                  <Td className="font-mono text-[12px]">{r.a}</Td>
                  <Td><Pill tone="info">{r.t}</Pill></Td>
                  <Td className="font-semibold text-success tabular-nums">{r.am}</Td>
                  <Td><Pill tone={r.st} dot>{r.s}</Pill></Td>
                  <Td className="text-muted-foreground">{r.d}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section title="Top Revenue Clients" subtitle="Clients generating most commission">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Rank</Th><Th>Client</Th><Th>Account</Th><Th>Lots</Th><Th>Revenue Generated</Th><Th>Commission</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { r: 1, c: "John Martinez", a: "ACC-1021", l: "842", rg: "$14,200", cm: "$4,260" },
                { r: 2, c: "Priya Nair", a: "ACC-1045", l: "624", rg: "$11,500", cm: "$3,450" },
                { r: 3, c: "Mohammed Al-Farsi", a: "ACC-1003", l: "312", rg: "$10,200", cm: "$3,060" },
                { r: 4, c: "Ravi Kumar", a: "ACC-1005", l: "420", rg: "$14,700", cm: "$4,410" },
                { r: 5, c: "Sarah Chen", a: "ACC-1002", l: "189", rg: "$6,300", cm: "$1,890" },
              ].map((r) => (
                <tr key={r.r} className="hover:bg-muted/30">
                  <Td><div className={`grid h-7 w-7 place-items-center rounded-md font-display font-semibold text-xs ${r.r === 1 ? "bg-warning/20 text-warning" : "bg-muted/30"}`}>{r.r}</div></Td>
                  <Td className="font-medium">{r.c}</Td>
                  <Td className="font-mono text-[12px]">{r.a}</Td>
                  <Td className="tabular-nums">{r.l}</Td>
                  <Td className="tabular-nums">{r.rg}</Td>
                  <Td className="font-semibold text-success tabular-nums">{r.cm}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>
    </div>
  );
}

/* ─────────────────────────────  TAB: ANALYTICS  ───────────────────────────── */

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <Kpi label="Total Clients" value="1,248" trend={{ dir: "up", v: "12%" }} hint="This month" icon={Users} accent="primary" />
        <Kpi label="Active Clients" value="842" hint="67.5% active rate" icon={UserCheck} accent="success" />
        <Kpi label="Revenue Generated" value="$48,320" trend={{ dir: "up", v: "8.4%" }} icon={DollarSign} accent="success" />
        <Kpi label="Trading Volume" value="12,450 lots" hint="Avg 14.8/client" icon={TrendingUp} accent="primary" />
        <Kpi label="Total Deposits" value="$2.1M" trend={{ dir: "up", v: "5.2%" }} icon={Wallet} accent="info" />
        <Kpi label="Conversion Rate" value="34.2%" hint="Lead → active" icon={Zap} accent="warning" />
        <Kpi label="Retention Rate" value="71.4%" trend={{ dir: "down", v: "3.1%" }} icon={History} accent="warning" />
        <Kpi label="Growth Rate" value="+12.3%" hint="Month over month" icon={TrendingUp} accent="success" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Section title="Monthly Client Growth" subtitle="Last 8 months">
            <Card className="p-4">
              <div className="flex items-baseline justify-between mb-3">
                <div><div className="font-display text-3xl font-semibold">140</div><div className="text-xs text-muted-foreground">New clients this month</div></div>
                <Pill tone="success" dot>↑ 12.3% vs last</Pill>
              </div>
              <MiniBars values={[90, 95, 100, 110, 115, 120, 130, 140]} />
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground font-mono">
                {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(m => <span key={m}>{m}</span>)}
              </div>
            </Card>
          </Section>
        </div>
        <Section title="Revenue Trend">
          <Card className="p-4">
            <div className="font-display text-3xl font-semibold">$48,320</div>
            <div className="text-xs text-success mb-2">↑ $3,740 vs last month</div>
            <Sparkline values={[40000, 41000, 42500, 44000, 43500, 45200, 46800, 48320]} />
          </Card>
        </Section>
      </div>

      <Section title="Client Acquisition Metrics" subtitle="This month vs targets">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Metric</Th><Th>This Month</Th><Th>Last Month</Th><Th>Change</Th><Th>Target</Th><Th>Status</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { m: "Registrations", t: "412", l: "380", c: "+8.4%", ct: "success" as const, tg: "400", s: "On track", st: "success" as const },
                { m: "KYC Approved", t: "298", l: "271", c: "+9.9%", ct: "success" as const, tg: "300", s: "Near target", st: "warning" as const },
                { m: "First Deposits", t: "189", l: "201", c: "-6.0%", ct: "destructive" as const, tg: "210", s: "Below target", st: "destructive" as const },
                { m: "Active Traders", t: "842", l: "861", c: "-2.2%", ct: "destructive" as const, tg: "900", s: "Below target", st: "destructive" as const },
                { m: "VIP Clients", t: "4", l: "3", c: "+1 new", ct: "success" as const, tg: "5", s: "Near target", st: "warning" as const },
              ].map((r) => (
                <tr key={r.m} className="hover:bg-muted/30">
                  <Td className="font-medium">{r.m}</Td>
                  <Td className="font-display text-base font-semibold tabular-nums">{r.t}</Td>
                  <Td className="text-muted-foreground tabular-nums">{r.l}</Td>
                  <Td><Pill tone={r.ct}>{r.c}</Pill></Td>
                  <Td className="tabular-nums">{r.tg}</Td>
                  <Td><Pill tone={r.st} dot>{r.s}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <div className="grid lg:grid-cols-3 gap-4">
        <Section title="Geographic Performance" subtitle="Top countries">
          <Card className="divide-y divide-border/70">
            {[
              { c: "🇦🇪 UAE", cl: 312, r: "$18,400", p: 85 },
              { c: "🇮🇳 India", cl: 284, r: "$12,200", p: 70 },
              { c: "🇸🇬 Singapore", cl: 198, r: "$9,800", p: 55 },
              { c: "🇬🇧 UK", cl: 142, r: "$6,420", p: 38 },
              { c: "🇩🇪 Germany", cl: 89, r: "$3,210", p: 22 },
            ].map((r) => (
              <div key={r.c} className="p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-sm">{r.c}</span>
                  <span className="font-semibold text-sm tabular-nums">{r.r}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={r.p} className="h-1.5 flex-1" />
                  <span className="text-xs text-muted-foreground tabular-nums">{r.cl}</span>
                </div>
              </div>
            ))}
          </Card>
        </Section>

        <Section title="Revenue by Source">
          <Card className="p-4">
            <Donut segments={[
              { label: "Spread Commission", value: 28400, color: "oklch(0.78 0.16 75)" },
              { label: "Lot-based", value: 14200, color: "oklch(0.70 0.15 235)" },
              { label: "Swap / Overnight", value: 5720, color: "oklch(0.72 0.16 155)" },
            ]} />
          </Card>
        </Section>

        <Section title="Top Instruments" subtitle="By volume traded">
          <Card className="p-4 space-y-2.5">
            {[
              { s: "XAUUSD", v: 3800, pct: 100 },
              { s: "EURUSD", v: 2800, pct: 74 },
              { s: "GBPUSD", v: 2200, pct: 58 },
              { s: "US30", v: 1800, pct: 47 },
              { s: "NAS100", v: 1200, pct: 32 },
              { s: "CRUDE", v: 800, pct: 21 },
            ].map((r) => (
              <div key={r.s}>
                <div className="flex justify-between text-xs mb-1"><span className="font-mono font-medium">{r.s}</span><span className="text-muted-foreground tabular-nums">{r.v.toLocaleString()} lots</span></div>
                <div className="h-2 rounded-full bg-muted/40 overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${r.pct}%` }} /></div>
              </div>
            ))}
          </Card>
        </Section>
      </div>

      <Section title="Active Campaigns" subtitle="Performance overview">
        <Card>
          <table className="w-full">
            <thead className="border-b border-border"><tr><Th>Campaign</Th><Th>Clicks</Th><Th>Registrations</Th><Th>Deposits</Th><Th>Revenue</Th><Th>ROI</Th><Th>Status</Th></tr></thead>
            <tbody className="divide-y divide-border/70">
              {[
                { n: "UAE Summer Push", cl: "4,820", r: 142, d: "$84,200", rv: "$8,420", roi: "312%", s: "Active", st: "success" as const },
                { n: "India Onboarding", cl: "3,210", r: 98, d: "$48,000", rv: "$5,120", roi: "184%", s: "Active", st: "success" as const },
                { n: "VIP Reactivation", cl: "892", r: 24, d: "$120,000", rv: "$3,420", roi: "245%", s: "Active", st: "success" as const },
                { n: "Q1 Bonus Drive", cl: "2,140", r: 56, d: "$28,400", rv: "$1,280", roi: "98%", s: "Ended", st: "muted" as const },
              ].map((r, i) => (
                <tr key={i} className="hover:bg-muted/30 cursor-pointer">
                  <Td className="font-medium">{r.n}</Td>
                  <Td className="tabular-nums">{r.cl}</Td>
                  <Td className="tabular-nums">{r.r}</Td>
                  <Td className="font-semibold tabular-nums">{r.d}</Td>
                  <Td className="font-semibold text-success tabular-nums">{r.rv}</Td>
                  <Td><Pill tone={parseInt(r.roi) > 200 ? "success" : "info"}>{r.roi}</Pill></Td>
                  <Td><Pill tone={r.st} dot={r.st !== "muted"}>{r.s}</Pill></Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Section>

      <Section title="Benchmark vs Peers" subtitle="Comparison against same-tier IB partners">
        <Card className="p-5">
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { l: "Revenue per Client", you: "$38.72", avg: "$28.40", w: true },
              { l: "Conversion Rate", you: "34.2%", avg: "28.1%", w: true },
              { l: "Retention Rate", you: "71.4%", avg: "74.6%", w: false },
              { l: "Avg Deposit", you: "$2,500", avg: "$1,840", w: true },
            ].map((r) => (
              <div key={r.l} className="rounded-lg border border-border bg-surface/40 p-3">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{r.l}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="font-display text-xl font-semibold">{r.you}</span>
                  <span className={`text-xs ${r.w ? "text-success" : "text-destructive"}`}>{r.w ? "↑" : "↓"} vs {r.avg}</span>
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">Peer avg: {r.avg}</div>
              </div>
            ))}
          </div>
        </Card>
      </Section>
    </div>
  );
}

/* ─────────────────────────────  DRAWER  ───────────────────────────── */

export type DrawerData = { kind: "provider" | "ticket" | "client"; id: string } | null;

export function DetailDrawer({ data, onClose }: { data: DrawerData; onClose: () => void }) {
  if (!data) return null;
  const title = data.kind === "provider" ? "Provider Account" : data.kind === "ticket" ? "Ticket Details" : "Client Details";
  return (
    <Sheet open={!!data} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-2xl bg-card border-l border-border p-0 overflow-y-auto">
        <SheetHeader className="p-5 border-b border-border bg-surface/30">
          <div className="flex items-center gap-2 flex-wrap">
            <Pill tone="primary" dot>{title}</Pill>
            <Pill tone="success" dot>Active</Pill>
            {data.kind === "ticket" && <Pill tone="destructive" dot>Urgent</Pill>}
          </div>
          <SheetTitle className="font-display text-xl flex items-center gap-2 mt-1">
            <span className="font-mono text-primary">{data.id}</span>
          </SheetTitle>
          <SheetDescription>
            {data.kind === "provider" && "Gold Scalper · Strategy provider · 842 followers · $1.2M AUM"}
            {data.kind === "ticket" && "Withdrawal $500 not processed after 48h · Escalated to Finance"}
            {data.kind === "client" && "Mohammed Al-Rashid · VIP · Registered 5 months ago"}
          </SheetDescription>
        </SheetHeader>

        <Tabs defaultValue="overview" className="p-5">
          <TabsList className="bg-surface border border-border">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Kpi label="Total P&L" value="+$82,400" trend={{ dir: "up", v: "12%" }} accent="success" />
              <Kpi label="Followers" value="842" hint="Active" accent="info" />
              <Kpi label="Win Rate" value="68%" accent="primary" />
              <Kpi label="Max Drawdown" value="14%" hint="Limit 20%" accent="warning" />
            </div>
            <Card className="p-4">
              <h4 className="font-display font-semibold mb-3">Details</h4>
              <DataRow label="Identifier" value={data.id} mono />
              <DataRow label="Status" value={<Pill tone="success" dot>Active</Pill>} />
              <DataRow label="Created" value="14 Mar 2024" />
              <DataRow label="Last Update" value="2 min ago" />
              <DataRow label="Owner" value="Priya Nair" />
              <DataRow label="Risk Level" value={<Pill tone="warning">Medium</Pill>} />
            </Card>
          </TabsContent>
          <TabsContent value="timeline" className="mt-4">
            <Card className="p-4">
              <div className="relative pl-6 space-y-3 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-border">
                {[
                  { t: "Now", e: "Drawdown alert triggered", d: "14% · approaching limit" },
                  { t: "1h ago", e: "New follower joined", d: "Total now 842" },
                  { t: "5d ago", e: "Allocation limit set", d: "$2M by admin" },
                  { t: "2w ago", e: "Strategy reviewed", d: "Approved by compliance" },
                ].map((e, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[18px] top-1 h-2 w-2 rounded-full bg-primary ring-4 ring-card" />
                    <div className="text-sm font-medium">{e.e}</div>
                    <div className="text-xs text-muted-foreground">{e.d} · {e.t}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="audit" className="mt-4">
            <Card>
              <table className="w-full">
                <thead className="border-b border-border"><tr><Th>Action</Th><Th>By</Th><Th>Time</Th></tr></thead>
                <tbody className="divide-y divide-border/70">
                  {[
                    { a: "Strategy paused", b: "Risk Team", t: "09:12" },
                    { a: "Allocation updated", b: "Priya Nair", t: "10:08" },
                    { a: "Reviewed", b: "Compliance", t: "11:22" },
                  ].map((r, i) => (
                    <tr key={i}><Td className="font-medium">{r.a}</Td><Td className="text-muted-foreground">{r.b}</Td><Td className="font-mono text-xs">{r.t}</Td></tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </TabsContent>
          <TabsContent value="actions" className="mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="bg-surface justify-start" onClick={() => notify("Opening full profile", "Loading client view…")}><Eye className="h-4 w-4" />Open full profile</Button>
              <Button variant="outline" className="bg-surface justify-start" onClick={() => notify("Note", "Add note dialog opening…")}><FileText className="h-4 w-4" />Add note</Button>
              <Button variant="outline" className="bg-surface justify-start" onClick={() => toast.success("Bookmarked")}><Bookmark className="h-4 w-4" />Bookmark</Button>
              <Button variant="outline" className="bg-surface justify-start" onClick={() => notify("Opening in new tab")}><ExternalLink className="h-4 w-4" />External link</Button>
            </div>
            <Separator />
            <div className="text-xs uppercase tracking-wider text-destructive font-semibold">Dangerous actions</div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="border-destructive/40 text-destructive justify-start" onClick={() => toast.error("Suspended", { description: "Account locked, audit logged" })}><Lock className="h-4 w-4" />Suspend</Button>
              <Button variant="outline" className="border-destructive/40 text-destructive justify-start" onClick={() => toast.error("Force closed", { description: "Position closed at market" })}><XCircle className="h-4 w-4" />Force close</Button>
            </div>
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

/* ─────────────────────────────  ACTION DIALOG  ───────────────────────────── */

export type ActionKind = "message" | "call" | "note" | "reset2fa" | "resetpw" | "suspend" | "approve" | "escalate" | "ticket" | null;

const ACTION_META: Record<Exclude<ActionKind, null>, { title: string; desc: string; cta: string; danger?: boolean; field?: "text" | "textarea" | "select" }> = {
  message:  { title: "Send Message", desc: "Send an in-app message to Arjun Raghunathan.", cta: "Send Message", field: "textarea" },
  call:     { title: "Schedule Call", desc: "Trigger an outbound call via the dialer.", cta: "Start Call", field: "select" },
  note:     { title: "Add Internal Note", desc: "Visible to the support and compliance team only.", cta: "Save Note", field: "textarea" },
  reset2fa: { title: "Reset 2FA", desc: "Force a 2FA reset on next login. Client will be notified.", cta: "Reset 2FA" },
  resetpw:  { title: "Reset Password", desc: "Send a password reset link to the client email.", cta: "Send Reset Link" },
  suspend:  { title: "Suspend Account", desc: "Block all trading & withdrawals immediately.", cta: "Suspend", danger: true, field: "text" },
  approve:  { title: "Approve Withdrawal", desc: "Release the pending $5,000 withdrawal to bank.", cta: "Approve & Release" },
  escalate: { title: "Escalate to Compliance", desc: "Move this case to the senior compliance queue.", cta: "Escalate", danger: true, field: "textarea" },
  ticket:   { title: "Create Support Ticket", desc: "Open a new ticket for this client.", cta: "Create Ticket", field: "textarea" },
};

export function ActionDialog({ kind, onClose }: { kind: ActionKind; onClose: () => void }) {
  const [value, setValue] = useState("");
  if (!kind) return null;
  const meta = ACTION_META[kind];
  return (
    <Dialog open={!!kind} onOpenChange={(o) => { if (!o) { setValue(""); onClose(); } }}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            {meta.danger && <AlertTriangle className="h-4 w-4 text-destructive" />}
            {meta.title}
          </DialogTitle>
          <DialogDescription>{meta.desc}</DialogDescription>
        </DialogHeader>
        {meta.field === "textarea" && (
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Message</Label>
            <Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type here…" className="bg-surface min-h-24" />
          </div>
        )}
        {meta.field === "text" && (
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Reason</Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Reason for suspension" className="bg-surface" />
          </div>
        )}
        {meta.field === "select" && (
          <div className="space-y-2">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Phone Number</Label>
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger className="bg-surface"><SelectValue placeholder="Choose number" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">+91 98760 12345 · Primary</SelectItem>
                <SelectItem value="alt">+91 98xxx x9922 · Alt</SelectItem>
                <SelectItem value="whatsapp">WhatsApp · +91 98760 12345</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            className={meta.danger ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            onClick={() => {
              if (meta.danger) toast.error(`${meta.title} confirmed`, { description: value || "Action logged in audit trail" });
              else toast.success(`${meta.title} successful`, { description: value || "Action completed" });
              setValue("");
              onClose();
            }}
          >
            <Send className="h-4 w-4" />{meta.cta}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────  PAGE  ───────────────────────────── */

function ClientDetailsPage() {
  const [tab, setTab] = useState<string>("copy");
  const [drawer, setDrawer] = useState<DrawerData>(null);
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<ActionKind>(null);


  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-background text-foreground">
        <TopBar search={search} setSearch={setSearch} />
        <ClientHero openAction={setAction} />

        {search && (
          <div className="px-6 mt-3">
            <div className="rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-primary" />
              <span>Filtering all tables by <span className="font-mono text-primary">"{search}"</span></span>
              <button onClick={() => setSearch("")} className="ml-auto text-xs text-muted-foreground hover:text-foreground">Clear</button>
            </div>
          </div>
        )}

        <div className="px-6 mt-6">
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <div className="sticky top-14 z-30 -mx-6 px-6 pb-3 bg-background/85 backdrop-blur-xl border-b border-border">
              <TabsList className="bg-surface border border-border h-auto p-1 flex-wrap gap-1 w-full justify-start">
                {TABS.map((t) => (
                  <TabsTrigger key={t.v} value={t.v} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm gap-2">
                    <t.icon className="h-3.5 w-3.5" />
                    <span className="text-xs font-medium">{t.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="py-6">
              <TabsContent value="copy" className="mt-0"><CopyTradingTab openDrawer={setDrawer} /></TabsContent>
              <TabsContent value="kyc" className="mt-0"><KycTab /></TabsContent>
              <TabsContent value="support" className="mt-0"><SupportTab openDrawer={setDrawer} openAction={setAction} /></TabsContent>
              <TabsContent value="activity" className="mt-0"><ActivityTab /></TabsContent>
              <TabsContent value="ib" className="mt-0"><IbTab /></TabsContent>
              <TabsContent value="referrals" className="mt-0"><ReferralsTab openDrawer={setDrawer} search={search} /></TabsContent>
              <TabsContent value="commissions" className="mt-0"><CommissionsTab /></TabsContent>
              <TabsContent value="analytics" className="mt-0"><AnalyticsTab /></TabsContent>
            </div>
          </Tabs>
        </div>

        <footer className="px-6 py-6 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
          <span>Nexus CRM · Enterprise Edition · v2026.06</span>
          <span className="flex items-center gap-2"><BadgeCheck className="h-3.5 w-3.5 text-success" />All systems operational</span>
        </footer>

        <DetailDrawer data={drawer} onClose={() => setDrawer(null)} />
        <ActionDialog kind={action} onClose={() => setAction(null)} />
        <Toaster position="top-right" richColors />
      </div>
    </TooltipProvider>
  );
}
