import { useMemo, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Ban,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Cpu,
  Download,
  FileText,
  Filter,
  Fingerprint,
  Globe,
  HardDrive,
  History,
  Key,
  KeyRound,
  Laptop,
  Lock,
  LogOut,
  MapPin,
  Monitor,
  MoreHorizontal,
  Network,
  Pin,
  Plus,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  Signal,
  Smartphone,
  Tablet,
  Terminal,
  TrendingDown,
  TrendingUp,
  UserCheck,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import {
  ALERTS,
  AUDIT,
  AUTH_STATUS,
  CLIENT,
  DEVICES,
  GEO_EVENTS,
  IMPOSSIBLE_TRAVEL,
  IPS,
  KPIS,
  LINKED_DEVICES,
  LOGINS,
  NOTES_SEED,
  PASSWORD_EVENTS,
  RESTRICTIONS,
  SCORE_FACTORS,
  SCORE_HISTORY,
  SESSIONS,
  TIMELINE,
  TWO_FA_METHODS,
  riskTone,
  scoreBand,
  type RiskLevel,
  type Session,
  type SecurityAlert,
  type LoginEvent,
  type Device,
  type IPRecord,
  type Severity,
} from "@/lib/security-data";
import { Dot, MonoText, SectionCard, StatusPill } from "./primitives";

// ─────────────────────────────────────────────────────────────────────────────
// helpers
const fmt = (iso: string) => format(new Date(iso), "dd MMM yyyy, HH:mm");
const ago = (iso: string) => formatDistanceToNow(new Date(iso), { addSuffix: true });

function riskBadge(level: RiskLevel | Severity) {
  const tone = riskTone(level);
  const label = level.charAt(0).toUpperCase() + level.slice(1);
  return <StatusPill tone={tone}>{label}</StatusPill>;
}

function deviceIcon(type: string, className = "h-4 w-4") {
  if (/iphone|android|samsung|mobile/i.test(type)) return <Smartphone className={className} />;
  if (/ipad|tablet/i.test(type)) return <Tablet className={className} />;
  if (/linux|server|workstation/i.test(type)) return <Terminal className={className} />;
  return <Laptop className={className} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Drawer context type
type DrawerPayload =
  | { kind: "session"; data: Session }
  | { kind: "alert"; data: SecurityAlert }
  | { kind: "login"; data: LoginEvent }
  | { kind: "device"; data: Device }
  | { kind: "ip"; data: IPRecord }
  | { kind: "score" }
  | { kind: "geo"; data: (typeof IMPOSSIBLE_TRAVEL)[number] }
  | null;

// ─────────────────────────────────────────────────────────────────────────────
export default function SecurityPage() {
  const [drawer, setDrawer] = useState<DrawerPayload>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [confirm, setConfirm] = useState<{ title: string; action: string } | null>(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState(NOTES_SEED);
  const [noteText, setNoteText] = useState("");
  const [monitoring, setMonitoring] = useState(true);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  const runAction = (label: string, dangerous = false) => {
    if (dangerous) {
      setConfirm({ title: label, action: label });
      return;
    }
    toast.success(label, { description: `${label} executed for ${CLIENT.id}` });
  };

  const confirmDangerous = () => {
    if (!confirm) return;
    toast.success(`${confirm.action} — completed`, {
      description: reason ? `Reason logged: "${reason}"` : "No reason provided",
    });
    setConfirm(null);
    setReason("");
  };

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes((n) => [
      {
        id: `N${n.length + 1}`,
        author: "You (Admin)",
        role: "Security Ops",
        time: new Date().toISOString(),
        text: noteText.trim(),
        pinned: false,
      },
      ...n,
    ]);
    setNoteText("");
    toast.success("Note added");
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground">
        {/* <TopBar theme={theme} onToggleTheme={toggleTheme} /> */}
        <main className="mx-auto w-full max-w-[1480px] px-4 pb-24 pt-6 sm:px-6 lg:px-8">
          <div className="mt-6">
            <KPIGrid onOpenScore={() => setDrawer({ kind: "score" })} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-12">
            <div className="xl:col-span-8 space-y-6">
              <ScoreEngine onOpen={() => setDrawer({ kind: "score" })} />
              <AlertsBoard onOpen={(a) => setDrawer({ kind: "alert", data: a })} />
              <GeoAnalysis onOpen={(g) => setDrawer({ kind: "geo", data: g })} />
            </div>
            <div className="xl:col-span-4 space-y-6">
              <TimelinePanel />
              <NotesPanel
                notes={notes}
                onAdd={addNote}
                noteText={noteText}
                setNoteText={setNoteText}
              />
            </div>
          </div>

          <div className="mt-6">
            <Tabs defaultValue="sessions" className="space-y-4">
              <div className="overflow-x-auto">
                <TabsList className="bg-surface-2 h-auto flex-wrap gap-1 p-1">
                  {[
                    ["sessions", "Active Sessions"],
                    ["logins", "Login History"],
                    ["devices", "Devices"],
                    ["network", "IP & Network"],
                    ["auth", "Authentication"],
                    ["access", "Access & Restrictions"],
                    ["password", "Password & 2FA"],
                    ["linked", "Linked Devices"],
                    ["audit", "Audit Trail"],
                  ].map(([v, l]) => (
                    <TabsTrigger key={v} value={v} className="font-medium text-xs sm:text-sm">
                      {l}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <TabsContent value="sessions">
                <SessionsTable
                  onOpen={(s) => setDrawer({ kind: "session", data: s })}
                  onAction={runAction}
                />
              </TabsContent>
              <TabsContent value="logins">
                <LoginsTable onOpen={(l) => setDrawer({ kind: "login", data: l })} />
              </TabsContent>
              <TabsContent value="devices">
                <DevicesTable
                  onOpen={(d) => setDrawer({ kind: "device", data: d })}
                  onAction={runAction}
                />
              </TabsContent>
              <TabsContent value="network">
                <IPsTable onOpen={(i) => setDrawer({ kind: "ip", data: i })} onAction={runAction} />
              </TabsContent>
              <TabsContent value="auth">
                <AuthStatusPanel />
              </TabsContent>
              <TabsContent value="access">
                <RestrictionsPanel onAction={runAction} />
              </TabsContent>
              <TabsContent value="password">
                <PasswordAndTwoFA onAction={runAction} />
              </TabsContent>
              <TabsContent value="linked">
                <LinkedDevicesPanel />
              </TabsContent>
              <TabsContent value="audit">
                <AuditPanel />
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-8">
            <AdminActionsPanel onAction={runAction} />
          </div>
        </main>

        <DetailDrawer payload={drawer} onClose={() => setDrawer(null)} onAction={runAction} />

        <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-critical" />
                Confirm: {confirm?.title}
              </DialogTitle>
              <DialogDescription>
                This is a destructive action. It will be recorded in the audit trail with your
                identity and reason.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <Label htmlFor="reason">Reason (required)</Label>
              <Textarea
                id="reason"
                placeholder="e.g. Confirmed account takeover indicators — terminating all sessions per IR-2026-041"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
              />
              <div className="rounded-lg border border-warning/40 bg-warning/10 p-3 text-xs text-warning">
                Permission check: <span className="font-semibold">Security Analyst ≥ L2</span> —
                granted.
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setConfirm(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDangerous} disabled={!reason.trim()}>
                Confirm {confirm?.action}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function TopBar({ theme, onToggleTheme }: { theme: "dark" | "light"; onToggleTheme: () => void }) {
  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1480px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-glow-primary">
            <Shield className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-semibold">Sentinel Console</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Security & Sessions · IB
            </div>
          </div>
        </div>
        <nav className="ml-6 hidden gap-1 text-sm md:flex">
          {["Clients", "IBs", "Compliance", "Fraud Ops", "Reports"].map((n) => (
            <button
              key={n}
              className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
            >
              {n}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search clients, IPs, devices…" className="w-72 pl-8" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-critical" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? "☀" : "☾"}
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/20 text-xs text-primary">PN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function ClientHeader({
  monitoring,
  onMonitoringChange,
  onAction,
}: {
  monitoring: boolean;
  onMonitoringChange: (v: boolean) => void;
  onAction: (label: string, dangerous?: boolean) => void;
}) {
  const band = scoreBand(CLIENT.securityScore);
  return (
    <section className="rounded-2xl border border-border bg-gradient-to-br from-surface to-surface-2 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-primary/30">
              <AvatarFallback className="bg-primary/15 font-display text-xl font-semibold text-primary">
                AM
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full border-2 border-background bg-success">
              <CheckCircle2 className="h-3 w-3 text-success-foreground" />
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold tracking-tight">{CLIENT.name}</h1>
              <StatusPill tone="success" icon={<CheckCircle2 className="h-3 w-3" />}>
                {CLIENT.accountStatus}
              </StatusPill>
              <StatusPill tone="info" icon={<UserCheck className="h-3 w-3" />}>
                KYC {CLIENT.kycStatus}
              </StatusPill>
              <StatusPill
                tone={riskTone(CLIENT.riskLevel)}
                icon={<ShieldAlert className="h-3 w-3" />}
              >
                Risk · {CLIENT.riskLevel.toUpperCase()}
              </StatusPill>
              <StatusPill tone="primary">{CLIENT.tier}</StatusPill>
              <StatusPill tone="neutral">{CLIENT.ibTag}</StatusPill>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
              <span className="font-mono">{CLIENT.id}</span>
              <span>{CLIENT.email}</span>
              <span>{CLIENT.phone}</span>
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> {CLIENT.country}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last login {ago(CLIENT.lastLogin)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-border bg-card px-4 py-2 text-right">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              Security Score
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{CLIENT.securityScore}</span>
              <span className="text-xs text-muted-foreground">/100</span>
              <StatusPill tone={band.tone}>{band.label}</StatusPill>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-xs text-muted-foreground">Live Monitoring</span>
            <Switch checked={monitoring} onCheckedChange={onMonitoringChange} className="ml-1" />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <Button onClick={() => onAction("Export Security Report")} className="gap-2">
          <Download className="h-4 w-4" /> Export Report
        </Button>
        <Button variant="secondary" onClick={() => onAction("Add Note")} className="gap-2">
          <Plus className="h-4 w-4" /> Add Note
        </Button>
        <Button variant="secondary" onClick={() => onAction("Notify Client")} className="gap-2">
          <Bell className="h-4 w-4" /> Notify Client
        </Button>
        <Button variant="ghost" onClick={() => onAction("Data refreshed")} className="gap-2">
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={() => onAction("Re-verification requested")}
            className="gap-2"
          >
            <KeyRound className="h-4 w-4" /> Request Verification
          </Button>
          <Button
            variant="destructive"
            onClick={() => onAction("Force Logout All Sessions", true)}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" /> Force Logout All
          </Button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function KPIGrid({ onOpenScore }: { onOpenScore: () => void }) {
  const items = [
    {
      label: "Security Score",
      value: `${KPIS.securityScore}`,
      sub: "/100",
      tone: "warning" as const,
      icon: <Shield className="h-4 w-4" />,
      trend: { dir: "down" as const, val: "-9 this week" },
      chart: SCORE_HISTORY.map((d) => ({ v: d.score })),
      onClick: onOpenScore,
      tip: "Composite score across 10 risk factors. Click for breakdown.",
    },
    {
      label: "Active Sessions",
      value: String(KPIS.activeSessions),
      tone: "info" as const,
      icon: <Activity className="h-4 w-4" />,
      trend: { dir: "up" as const, val: "+2 today" },
      chart: [3, 2, 4, 3, 5, 4, 4].map((v) => ({ v })),
      tip: "Sessions currently authenticated and reachable.",
    },
    {
      label: "Trusted Devices",
      value: String(KPIS.trustedDevices),
      tone: "success" as const,
      icon: <ShieldCheck className="h-4 w-4" />,
      trend: { dir: "up" as const, val: "+1 30d" },
      chart: [4, 4, 5, 5, 5, 6, 6].map((v) => ({ v })),
      tip: "Devices client has explicitly trusted.",
    },
    {
      label: "Security Alerts",
      value: String(KPIS.alerts),
      tone: "critical" as const,
      icon: <AlertTriangle className="h-4 w-4" />,
      trend: { dir: "up" as const, val: "+3 today" },
      chart: [0, 1, 0, 2, 1, 3, 3].map((v) => ({ v })),
      tip: "Open or under investigation.",
    },
    {
      label: "Failed Logins (7d)",
      value: String(KPIS.failedLogins),
      tone: "warning" as const,
      icon: <ShieldOff className="h-4 w-4" />,
      trend: { dir: "up" as const, val: "+8" },
      chart: [1, 0, 2, 4, 1, 3, 1].map((v) => ({ v })),
      tip: "All failed authentication attempts in the last 7 days.",
    },
    {
      label: "Last Login",
      value: `${KPIS.lastLoginHours}h`,
      sub: "ago",
      tone: "info" as const,
      icon: <Clock className="h-4 w-4" />,
      chart: [2, 4, 1, 3, 2, 1, 2].map((v) => ({ v })),
      tip: "Hours since most recent successful login.",
    },
    {
      label: "2FA",
      value: KPIS.twoFA ? "Enabled" : "Disabled",
      tone: KPIS.twoFA ? ("success" as const) : ("critical" as const),
      icon: <Key className="h-4 w-4" />,
      tip: "Multi-factor authentication status.",
    },
    {
      label: "VPN Detected",
      value: KPIS.vpnDetected ? "Yes" : "No",
      tone: KPIS.vpnDetected ? ("warning" as const) : ("success" as const),
      icon: <Network className="h-4 w-4" />,
      tip: "VPN exit-node activity observed in current sessions.",
    },
    {
      label: "TOR Detected",
      value: KPIS.torDetected ? "Yes" : "No",
      tone: KPIS.torDetected ? ("critical" as const) : ("success" as const),
      icon: <Wifi className="h-4 w-4" />,
      tip: "Tor exit-node activity observed.",
    },
    {
      label: "Device Sharing",
      value: KPIS.deviceSharingRisk.toUpperCase(),
      tone: riskTone(KPIS.deviceSharingRisk),
      icon: <Fingerprint className="h-4 w-4" />,
      tip: "Risk of device fingerprint shared across accounts.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((it) => (
        <KPI key={it.label} {...it} />
      ))}
    </div>
  );
}

function KPI({
  label,
  value,
  sub,
  tone,
  icon,
  trend,
  chart,
  onClick,
  tip,
}: {
  label: string;
  value: string;
  sub?: string;
  tone: "success" | "info" | "warning" | "critical";
  icon: React.ReactNode;
  trend?: { dir: "up" | "down"; val: string };
  chart?: { v: number }[];
  onClick?: () => void;
  tip?: string;
}) {
  const accent: Record<typeof tone, string> = {
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    critical: "text-critical",
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          className={cn(
            "group relative w-full overflow-hidden rounded-2xl border border-border bg-card p-4 text-left transition-all",
            "hover:border-primary/40 hover:shadow-glow-primary",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
            <span className={cn("rounded-md bg-surface-2 p-1.5", accent[tone])}>{icon}</span>
          </div>
          <div className="mt-3 flex items-baseline gap-1">
            <span className={cn("font-display text-2xl font-bold", accent[tone])}>{value}</span>
            {sub ? <span className="text-xs text-muted-foreground">{sub}</span> : null}
          </div>
          <div className="mt-1 flex items-center justify-between">
            {trend ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5 text-[11px] font-medium",
                  trend.dir === "up" ? "text-success" : "text-critical",
                )}
              >
                {trend.dir === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {trend.val}
              </span>
            ) : (
              <span />
            )}
            {chart ? (
              <div className="h-7 w-20 opacity-80">
                <ResponsiveContainer>
                  <AreaChart data={chart}>
                    <defs>
                      <linearGradient id={`g-${label}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="v"
                      stroke="currentColor"
                      fill={`url(#g-${label})`}
                      strokeWidth={1.5}
                      className={accent[tone]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : null}
          </div>
        </button>
      </TooltipTrigger>
      {tip ? <TooltipContent className="max-w-xs">{tip}</TooltipContent> : null}
    </Tooltip>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function ScoreEngine({ onOpen }: { onOpen: () => void }) {
  const band = scoreBand(CLIENT.securityScore);
  return (
    <SectionCard
      title="Security Score Engine"
      description="Composite risk score recomputed every 60 seconds across 10 factors"
      action={
        <Button variant="ghost" size="sm" onClick={onOpen} className="gap-1">
          Open breakdown <ChevronRight className="h-4 w-4" />
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="relative grid place-items-center rounded-xl border border-border bg-surface-2 p-6">
            <ScoreDial value={CLIENT.securityScore} tone={band.tone} />
            <div className="mt-3 text-center">
              <div className="font-display text-3xl font-bold">{CLIENT.securityScore}/100</div>
              <StatusPill tone={band.tone} className="mt-1">
                {band.label}
              </StatusPill>
              <p className="mt-2 max-w-xs text-xs text-muted-foreground">
                Score increased by VPN usage, brute-force attempts and one open critical alert.
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="font-display text-sm font-semibold">Contributing Factors</h4>
            <span className="text-xs text-muted-foreground">7-day trend</span>
          </div>
          <div className="mb-4 h-28 w-full rounded-lg border border-border bg-surface-2 p-2">
            <ResponsiveContainer>
              <LineChart data={SCORE_HISTORY}>
                <CartesianGrid strokeDasharray="2 4" className="stroke-border" />
                <XAxis dataKey="d" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                <YAxis hide domain={[40, 100]} />
                <RTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SCORE_FACTORS.map((f) => (
              <li
                key={f.label}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Dot
                    tone={
                      f.status === "good" ? "success" : f.status === "warn" ? "warning" : "critical"
                    }
                  />
                  {f.label}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs font-semibold",
                    f.impact >= 0 ? "text-success" : "text-critical",
                  )}
                >
                  {f.impact > 0 ? "+" : ""}
                  {f.impact}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

function ScoreDial({
  value,
  tone,
}: {
  value: number;
  tone: "success" | "info" | "warning" | "critical";
}) {
  const radius = 70;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  const stroke =
    tone === "critical"
      ? "var(--color-critical)"
      : tone === "warning"
        ? "var(--color-warning)"
        : tone === "info"
          ? "var(--color-info)"
          : "var(--color-success)";
  return (
    <svg width="170" height="170" className="-rotate-90">
      <circle
        cx="85"
        cy="85"
        r={radius}
        stroke="var(--color-border)"
        strokeWidth="10"
        fill="none"
      />
      <circle
        cx="85"
        cy="85"
        r={radius}
        stroke={stroke}
        strokeWidth="10"
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 600ms ease" }}
      />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AlertsBoard({ onOpen }: { onOpen: (a: SecurityAlert) => void }) {
  const [sev, setSev] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = ALERTS.filter(
    (a) =>
      (sev === "all" || a.severity === sev) &&
      (status === "all" || a.status === status) &&
      (q === "" || `${a.type} ${a.summary} ${a.id}`.toLowerCase().includes(q.toLowerCase())),
  );

  const sevCount = {
    critical: ALERTS.filter((a) => a.severity === "critical").length,
    high: ALERTS.filter((a) => a.severity === "high").length,
    medium: ALERTS.filter((a) => a.severity === "medium").length,
    low: ALERTS.filter((a) => a.severity === "low").length,
  };

  return (
    <SectionCard
      title="Security Alerts"
      description="Real-time signals from session, device, network and behavioral engines"
      action={
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <Dot tone="critical" /> {sevCount.critical} Critical
          </span>
          <span className="flex items-center gap-1">
            <Dot tone="warning" /> {sevCount.high + sevCount.medium} High/Med
          </span>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search alerts"
            className="h-9 w-56 pl-8"
          />
        </div>
        <Select value={sev} onValueChange={setSev}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severity</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" className="ml-auto gap-1">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>
      <DataTable
        cols={["Alert", "Type", "Severity", "Status", "Assignee", "Created", ""]}
        rows={filtered.map((a) => ({
          key: a.id,
          onClick: () => onOpen(a),
          cells: [
            <div key="a">
              <div className="font-mono text-xs">{a.id}</div>
              <div className="text-sm">{a.summary}</div>
            </div>,
            <span key="t" className="text-sm">
              {a.type}
            </span>,
            riskBadge(a.severity),
            <StatusPill
              key="s"
              tone={
                a.status === "open"
                  ? "critical"
                  : a.status === "investigating"
                    ? "warning"
                    : a.status === "resolved"
                      ? "success"
                      : "neutral"
              }
            >
              {a.status}
            </StatusPill>,
            <span key="as" className="text-sm">
              {a.assignee}
            </span>,
            <span key="c" className="text-xs text-muted-foreground">
              {ago(a.created)}
            </span>,
            <ChevronRight key="cr" className="h-4 w-4 text-muted-foreground" />,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function GeoAnalysis({ onOpen }: { onOpen: (g: (typeof IMPOSSIBLE_TRAVEL)[number]) => void }) {
  // Map projection bounds (simple equirectangular)
  const toXY = (lng: number, lat: number) => ({
    x: ((lng + 180) / 360) * 100,
    y: ((90 - lat) / 180) * 100,
  });

  return (
    <SectionCard
      title="Geo Location Analysis"
      description="Travel intelligence with impossible-travel detection"
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-[radial-gradient(ellipse_at_center,var(--color-surface-2)_0%,var(--color-background)_70%)]">
            <svg viewBox="0 0 100 50" className="absolute inset-0 h-full w-full">
              {/* grid */}
              {Array.from({ length: 10 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={(i + 1) * 10}
                  x2={(i + 1) * 10}
                  y1="0"
                  y2="50"
                  stroke="var(--color-border)"
                  strokeWidth="0.1"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="0"
                  x2="100"
                  y1={(i + 1) * 10}
                  y2={(i + 1) * 10}
                  stroke="var(--color-border)"
                  strokeWidth="0.1"
                />
              ))}
              {/* paths for impossible travel */}
              {IMPOSSIBLE_TRAVEL.map((it) => {
                const a = toXY(72.87, 19.07);
                const b = toXY(55.27, 25.2);
                const ax = (a.x / 100) * 100;
                const ay = (a.y / 100) * 50;
                const bx = (b.x / 100) * 100;
                const by = (b.y / 100) * 50;
                return (
                  <g key={it.id}>
                    <line
                      x1={ax}
                      y1={ay}
                      x2={bx}
                      y2={by}
                      stroke="var(--color-critical)"
                      strokeWidth="0.3"
                      strokeDasharray="0.6 0.4"
                    />
                  </g>
                );
              })}
              {GEO_EVENTS.map((g) => {
                const p = toXY(g.lng, g.lat);
                const px = (p.x / 100) * 100;
                const py = (p.y / 100) * 50;
                const fill =
                  g.risk === "critical"
                    ? "var(--color-critical)"
                    : g.risk === "high"
                      ? "var(--color-warning)"
                      : g.risk === "medium"
                        ? "var(--color-info)"
                        : "var(--color-success)";
                return (
                  <g key={g.id}>
                    <circle cx={px} cy={py} r="1.4" fill={fill} fillOpacity="0.25" />
                    <circle cx={px} cy={py} r="0.6" fill={fill} />
                  </g>
                );
              })}
            </svg>
            <div className="absolute bottom-2 left-2 rounded-md border border-border bg-card/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
              5 events · 4 countries · 1 impossible travel
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-xl border border-critical/40 bg-critical/10 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-critical">
                <AlertTriangle className="h-4 w-4" /> Impossible Travel
              </span>
              {riskBadge("critical")}
            </div>
            <p className="mt-2 text-sm">
              <span className="font-mono">
                {format(new Date(IMPOSSIBLE_TRAVEL[0].from.time), "HH:mm")}
              </span>{" "}
              {IMPOSSIBLE_TRAVEL[0].from.city} →{" "}
              <span className="font-mono">
                {format(new Date(IMPOSSIBLE_TRAVEL[0].to.time), "HH:mm")}
              </span>{" "}
              {IMPOSSIBLE_TRAVEL[0].to.city}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-md bg-background/40 p-2">
                <div className="text-muted-foreground">Distance</div>
                <div className="font-mono font-semibold">{IMPOSSIBLE_TRAVEL[0].distanceKm} km</div>
              </div>
              <div className="rounded-md bg-background/40 p-2">
                <div className="text-muted-foreground">Window</div>
                <div className="font-mono font-semibold">{IMPOSSIBLE_TRAVEL[0].minutes} min</div>
              </div>
              <div className="rounded-md bg-background/40 p-2">
                <div className="text-muted-foreground">Req. speed</div>
                <div className="font-mono font-semibold text-critical">
                  {IMPOSSIBLE_TRAVEL[0].requiredKmh} km/h
                </div>
              </div>
            </div>
            <Button
              size="sm"
              className="mt-3 w-full"
              variant="destructive"
              onClick={() => onOpen(IMPOSSIBLE_TRAVEL[0])}
            >
              Investigate
            </Button>
          </div>
          <div className="rounded-xl border border-border">
            <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Country Timeline (24h)
            </div>
            <ul className="divide-y divide-border">
              {GEO_EVENTS.map((g) => (
                <li key={g.id} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {g.city}, {g.country}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      {format(new Date(g.time), "HH:mm")}
                    </span>
                    {riskBadge(g.risk)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function TimelinePanel() {
  return (
    <SectionCard
      title="Security Timeline"
      description="Chronological feed of every meaningful security event"
      action={
        <Button variant="ghost" size="sm" className="gap-1">
          <Filter className="h-3.5 w-3.5" /> Filter
        </Button>
      }
    >
      <ScrollArea className="h-[440px] pr-2 scrollbar-thin">
        <ol className="relative space-y-3 pl-5">
          <span className="absolute left-1.5 top-1 h-full w-px bg-border" />
          {TIMELINE.map((t) => {
            const tone =
              t.severity === "critical"
                ? "critical"
                : t.severity === "high"
                  ? "warning"
                  : t.severity === "medium"
                    ? "info"
                    : "success";
            const Icon =
              t.type === "alert"
                ? AlertTriangle
                : t.type === "login"
                  ? Activity
                  : t.type === "block"
                    ? Ban
                    : t.type === "device"
                      ? HardDrive
                      : t.type === "password"
                        ? KeyRound
                        : Shield;
            return (
              <li key={t.id} className="relative">
                <span
                  className={cn(
                    "absolute -left-[18px] top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-background",
                    tone === "critical"
                      ? "bg-critical"
                      : tone === "warning"
                        ? "bg-warning"
                        : tone === "info"
                          ? "bg-info"
                          : "bg-success",
                  )}
                >
                  <Icon className="h-2.5 w-2.5 text-background" />
                </span>
                <div className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{t.title}</span>
                    {riskBadge(t.severity)}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.detail}</p>
                  <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    {fmt(t.time)} · {ago(t.time)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </ScrollArea>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function NotesPanel({
  notes,
  onAdd,
  noteText,
  setNoteText,
}: {
  notes: typeof NOTES_SEED;
  onAdd: () => void;
  noteText: string;
  setNoteText: (s: string) => void;
}) {
  return (
    <SectionCard
      title="Security Notes"
      description="Internal notes visible to Security, Fraud and Compliance teams"
    >
      <div className="space-y-3">
        <div className="rounded-lg border border-border bg-surface-2 p-3">
          <Textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write a note. @mention teammates, attach IR ticket IDs…"
            rows={3}
            className="resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">
              Notes are immutable once posted and appear in the audit trail.
            </span>
            <Button size="sm" onClick={onAdd} disabled={!noteText.trim()} className="gap-1">
              <Plus className="h-3.5 w-3.5" /> Post Note
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[280px] pr-2 scrollbar-thin">
          <ul className="space-y-2">
            {notes.map((n) => (
              <li key={n.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-primary/20 text-[10px] text-primary">
                        {n.author
                          .split(" ")
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium">{n.author}</span>
                    <span className="text-[10px] text-muted-foreground">· {n.role}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {n.pinned ? <Pin className="h-3 w-3 text-warning" /> : null}
                    <span className="text-[10px] text-muted-foreground">{ago(n.time)}</span>
                  </div>
                </div>
                <p className="mt-1.5 text-sm">{n.text}</p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic table
function DataTable({
  cols,
  rows,
  empty,
}: {
  cols: (string | { label: string; w?: string })[];
  rows: { key: string; cells: React.ReactNode[]; onClick?: () => void; tone?: string }[];
  empty?: string;
}) {
  if (rows.length === 0)
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
        {empty ?? "No records found"}
      </div>
    );
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface-2 text-left text-[11px] uppercase tracking-wider text-muted-foreground sticky top-0">
          <tr>
            {cols.map((c, i) => (
              <th key={i} className="whitespace-nowrap px-4 py-2.5 font-semibold">
                {typeof c === "string" ? c : c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((r) => (
            <tr
              key={r.key}
              className={cn("transition-colors hover:bg-accent/40", r.onClick && "cursor-pointer")}
              onClick={r.onClick}
            >
              {r.cells.map((cell, i) => (
                <td key={i} className="whitespace-nowrap px-4 py-3 align-middle">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function SessionsTable({
  onOpen,
  onAction,
}: {
  onOpen: (s: Session) => void;
  onAction: (l: string, d?: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [country, setCountry] = useState("all");
  const [vpn, setVpn] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = SESSIONS.filter(
    (s) =>
      (country === "all" || s.country === country) &&
      (vpn === "all" || (vpn === "yes" ? s.vpn : !s.vpn)) &&
      (status === "all" || s.status === status) &&
      (q === "" || `${s.device} ${s.ip} ${s.city} ${s.id}`.toLowerCase().includes(q.toLowerCase())),
  );

  const countries = Array.from(new Set(SESSIONS.map((s) => s.country)));

  return (
    <SectionCard
      title="Active Sessions"
      description="All authenticated sessions, scored in real time"
      action={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            onClick={() => onAction("Export CSV")}
          >
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="gap-1"
            onClick={() => onAction("Force Logout All Sessions", true)}
          >
            <LogOut className="h-3.5 w-3.5" /> Force Logout All
          </Button>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sessions, IPs, devices…"
            className="h-9 w-72 pl-8"
          />
        </div>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="h-9 w-40">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={vpn} onValueChange={setVpn}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue placeholder="VPN" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">VPN: all</SelectItem>
            <SelectItem value="yes">VPN only</SelectItem>
            <SelectItem value="no">Non-VPN</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="h-9 w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
            <SelectItem value="terminated">Terminated</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DataTable
        cols={[
          "Session",
          "Device",
          "Network",
          "Location",
          "Login / Activity",
          "Risk",
          "Status",
          "",
        ]}
        rows={filtered.map((s) => ({
          key: s.id,
          onClick: () => onOpen(s),
          cells: [
            <div key="i">
              <MonoText className="text-foreground">{s.id}</MonoText>
              <div className="mt-0.5 flex flex-wrap gap-1">
                {s.flags.map((f) => (
                  <StatusPill
                    key={f}
                    tone={
                      /trusted|biometric/i.test(f)
                        ? "success"
                        : /vpn|new device|datacenter|multiple/i.test(f)
                          ? "warning"
                          : /tor|account takeover/i.test(f)
                            ? "critical"
                            : "neutral"
                    }
                  >
                    {f}
                  </StatusPill>
                ))}
              </div>
            </div>,
            <div key="d" className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-surface-2">
                {deviceIcon(s.device)}
              </span>
              <div>
                <div className="font-medium">{s.device}</div>
                <div className="text-xs text-muted-foreground">
                  {s.os} · {s.browser}
                </div>
              </div>
            </div>,
            <div key="n">
              <MonoText className="text-foreground">{s.ip}</MonoText>
              <div className="text-xs text-muted-foreground">{s.isp}</div>
            </div>,
            <div key="l">
              <div className="text-sm">
                {s.city}, {s.country}
              </div>
              <div className="text-xs text-muted-foreground">
                {s.vpn ? "VPN · " : ""}
                {s.tor ? "TOR · " : ""}
                {s.datacenter ? "Datacenter" : "Residential"}
              </div>
            </div>,
            <div key="t">
              <div className="text-xs">Login {ago(s.loginAt)}</div>
              <div className="text-xs text-muted-foreground">Active {ago(s.lastActivity)}</div>
            </div>,
            <RiskMeter key="r" value={s.risk} />,
            <StatusPill
              key="s"
              tone={
                s.status === "active"
                  ? "success"
                  : s.status === "idle"
                    ? "info"
                    : s.status === "terminated"
                      ? "neutral"
                      : "critical"
              }
              icon={s.status === "active" ? <Dot tone="success" /> : null}
            >
              {s.status}
            </StatusPill>,
            <ChevronRight key="cr" className="h-4 w-4 text-muted-foreground" />,
          ],
        }))}
      />
    </SectionCard>
  );
}

function RiskMeter({ value }: { value: number }) {
  const tone: "success" | "info" | "warning" | "critical" =
    value < 25 ? "success" : value < 55 ? "info" : value < 80 ? "warning" : "critical";
  const color =
    tone === "critical"
      ? "bg-critical"
      : tone === "warning"
        ? "bg-warning"
        : tone === "info"
          ? "bg-info"
          : "bg-success";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-surface-2">
        <div className={cn("h-full rounded-full", color)} style={{ width: `${value}%` }} />
      </div>
      <span className="font-mono text-xs tabular-nums">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function LoginsTable({ onOpen }: { onOpen: (l: LoginEvent) => void }) {
  const [filter, setFilter] = useState<"all" | "success" | "failed" | "blocked">("all");
  const [range, setRange] = useState<"7d" | "30d" | "today">("7d");
  const filtered = LOGINS.filter((l) => filter === "all" || l.result === filter);

  return (
    <SectionCard
      title="Login History"
      description="Every authentication attempt — successful, failed and blocked"
      action={
        <div className="flex items-center gap-2">
          <Select value={range} onValueChange={(v) => setRange(v as typeof range)}>
            <SelectTrigger className="h-8 w-28 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex rounded-md border border-border p-0.5">
            {(["all", "success", "failed", "blocked"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded px-2.5 py-1 text-xs font-medium capitalize",
                  filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <DataTable
        cols={["Time", "Device", "Location", "IP", "Result", "2FA", "Risk", ""]}
        rows={filtered.map((l) => ({
          key: l.id,
          onClick: () => onOpen(l),
          cells: [
            <div key="t">
              <div className="text-sm">{format(new Date(l.time), "dd MMM, HH:mm")}</div>
              <div className="text-xs text-muted-foreground">{ago(l.time)}</div>
            </div>,
            <div key="d" className="flex items-center gap-2">
              {deviceIcon(l.device)}
              <span className="text-sm">
                {l.device}
                <div className="text-xs text-muted-foreground">
                  {l.os} · {l.browser}
                </div>
              </span>
            </div>,
            <span key="loc" className="text-sm">
              {l.city}, {l.country}
              {l.vpn ? <span className="ml-1 text-xs text-warning">· VPN</span> : null}
              {l.tor ? <span className="ml-1 text-xs text-critical">· TOR</span> : null}
            </span>,
            <MonoText key="ip">{l.ip}</MonoText>,
            <StatusPill
              key="r"
              tone={
                l.result === "success" ? "success" : l.result === "failed" ? "warning" : "critical"
              }
            >
              {l.result}
            </StatusPill>,
            <StatusPill
              key="f"
              tone={
                l.twoFA === "passed" ? "success" : l.twoFA === "skipped" ? "neutral" : "critical"
              }
            >
              2FA {l.twoFA}
            </StatusPill>,
            <RiskMeter key="rk" value={l.risk} />,
            <ChevronRight key="cr" className="h-4 w-4 text-muted-foreground" />,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function DevicesTable({
  onOpen,
  onAction,
}: {
  onOpen: (d: Device) => void;
  onAction: (l: string, d?: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [trusted, setTrusted] = useState<"all" | "trusted" | "untrusted">("all");
  const filtered = DEVICES.filter(
    (d) =>
      (trusted === "all" || (trusted === "trusted" ? d.trusted : !d.trusted)) &&
      (q === "" || `${d.name} ${d.fingerprint} ${d.os}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <SectionCard
      title="Device Management"
      description="Device intelligence with fingerprinting and trust state"
      action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search device or fingerprint"
              className="h-8 w-60 pl-8"
            />
          </div>
          <Select value={trusted} onValueChange={(v) => setTrusted(v as typeof trusted)}>
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="trusted">Trusted</SelectItem>
              <SelectItem value="untrusted">Untrusted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <DataTable
        cols={["Device", "Fingerprint", "First Seen", "Last Seen", "Accounts", "Risk", "Trust", ""]}
        rows={filtered.map((d) => ({
          key: d.id,
          onClick: () => onOpen(d),
          cells: [
            <div key="n" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-surface-2">
                {deviceIcon(d.type)}
              </span>
              <div>
                <div className="font-medium">{d.name}</div>
                <div className="text-xs text-muted-foreground">
                  {d.type} · {d.os}
                </div>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {d.flags.map((f) => (
                    <StatusPill
                      key={f}
                      tone={
                        /biometric/i.test(f)
                          ? "success"
                          : /tor|suspicious/i.test(f)
                            ? "critical"
                            : "warning"
                      }
                    >
                      {f}
                    </StatusPill>
                  ))}
                </div>
              </div>
            </div>,
            <MonoText key="fp">{d.fingerprint}</MonoText>,
            <span key="fs" className="text-xs text-muted-foreground">
              {d.firstSeen}
            </span>,
            <span key="ls" className="text-xs text-muted-foreground">
              {d.lastSeen}
            </span>,
            <span key="acc" className="text-sm tabular-nums">
              {d.accounts}
            </span>,
            riskBadge(d.risk),
            <StatusPill key="tr" tone={d.trusted ? "success" : "warning"}>
              {d.trusted ? "Trusted" : "Untrusted"}
            </StatusPill>,
            <RowActions
              key="ac"
              onAction={onAction}
              items={[
                { label: "Trust Device" },
                { label: "Force Verification" },
                { label: "Terminate Sessions" },
                { label: "Block Device", danger: true },
              ]}
            />,
          ],
        }))}
      />
    </SectionCard>
  );
}

function RowActions({
  items,
  onAction,
}: {
  items: { label: string; danger?: boolean }[];
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((it) => (
          <DropdownMenuItem
            key={it.label}
            onClick={(e) => {
              e.stopPropagation();
              onAction(it.label, it.danger);
            }}
            className={it.danger ? "text-critical focus:text-critical" : ""}
          >
            {it.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function IPsTable({
  onOpen,
  onAction,
}: {
  onOpen: (i: IPRecord) => void;
  onAction: (l: string, d?: boolean) => void;
}) {
  const [q, setQ] = useState("");
  const [risk, setRisk] = useState<string>("all");
  const filtered = IPS.filter(
    (i) =>
      (risk === "all" || i.risk === risk) &&
      (q === "" ||
        `${i.ip} ${i.city} ${i.country} ${i.isp}`.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <SectionCard
      title="IP Monitoring"
      description="IP intelligence with ASN, geolocation and threat reputation"
      action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search IP, ISP, city"
              className="h-8 w-60 pl-8"
            />
          </div>
          <Select value={risk} onValueChange={setRisk}>
            <SelectTrigger className="h-8 w-32 text-xs">
              <SelectValue placeholder="Risk" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All risk</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      }
    >
      <DataTable
        cols={[
          "IP",
          "Location",
          "ISP",
          "Connection",
          "Threat Flags",
          "Hits",
          "First/Last",
          "Risk",
          "",
        ]}
        rows={filtered.map((i) => ({
          key: i.ip,
          onClick: () => onOpen(i),
          cells: [
            <MonoText key="ip" className="text-foreground">
              {i.ip}
            </MonoText>,
            <span key="l" className="text-sm">
              {i.city}, {i.country}
            </span>,
            <span key="isp" className="text-sm">
              {i.isp}
            </span>,
            <StatusPill key="c" tone={i.connection === "Datacenter" ? "warning" : "neutral"}>
              {i.connection}
            </StatusPill>,
            <div key="f" className="flex flex-wrap gap-1">
              {i.vpn ? <StatusPill tone="warning">VPN</StatusPill> : null}
              {i.proxy ? <StatusPill tone="warning">Proxy</StatusPill> : null}
              {i.tor ? <StatusPill tone="critical">TOR</StatusPill> : null}
              {i.datacenter ? <StatusPill tone="warning">DC</StatusPill> : null}
              {!i.vpn && !i.proxy && !i.tor && !i.datacenter ? (
                <StatusPill tone="success">Clean</StatusPill>
              ) : null}
            </div>,
            <span key="h" className="font-mono text-xs tabular-nums">
              {i.hits}
            </span>,
            <span key="fs" className="text-xs text-muted-foreground">
              {i.firstSeen} → {i.lastSeen}
            </span>,
            riskBadge(i.risk),
            <RowActions
              key="ac"
              onAction={onAction}
              items={[
                { label: "Whitelist IP" },
                { label: "Enable Monitoring" },
                { label: "Restrict Region" },
                { label: "Block IP", danger: true },
              ]}
            />,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AuthStatusPanel() {
  return (
    <SectionCard
      title="Authentication Status"
      description="Identity factors, recovery options and credential health"
    >
      <DataTable
        cols={["Factor", "Status", "Detail", "Updated"]}
        rows={AUTH_STATUS.map((a, i) => ({
          key: String(i),
          cells: [
            <span key="f" className="font-medium">
              {a.factor}
            </span>,
            <StatusPill
              key="s"
              tone={
                a.status === "Verified"
                  ? "success"
                  : a.status === "Pending"
                    ? "warning"
                    : "critical"
              }
            >
              {a.status}
            </StatusPill>,
            <span key="d" className="text-sm text-muted-foreground">
              {a.detail}
            </span>,
            <span key="u" className="font-mono text-xs text-muted-foreground">
              {a.updated}
            </span>,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function RestrictionsPanel({ onAction }: { onAction: (l: string, d?: boolean) => void }) {
  return (
    <SectionCard
      title="Access Restrictions"
      description="IP, country, device, trading and withdrawal restrictions"
      action={
        <Button size="sm" variant="outline" className="gap-1">
          <Plus className="h-3.5 w-3.5" /> Add Restriction
        </Button>
      }
    >
      <DataTable
        cols={["ID", "Type", "Target", "Reason", "Created By", "Created", "Expiry", "Status", ""]}
        rows={RESTRICTIONS.map((r) => ({
          key: r.id,
          cells: [
            <MonoText key="i">{r.id}</MonoText>,
            <span key="t" className="text-sm font-medium">
              {r.type}
            </span>,
            <span key="g" className="text-sm">
              {r.target}
            </span>,
            <span key="re" className="text-sm text-muted-foreground">
              {r.reason}
            </span>,
            <span key="cb" className="text-sm">
              {r.createdBy}
            </span>,
            <span key="ca" className="text-xs text-muted-foreground">
              {r.createdAt}
            </span>,
            <span key="ex" className="text-xs">
              {r.expiry}
            </span>,
            <StatusPill key="s" tone={r.status === "Active" ? "success" : "neutral"}>
              {r.status}
            </StatusPill>,
            <RowActions
              key="ac"
              onAction={onAction}
              items={[
                { label: "Edit" },
                { label: "Extend" },
                { label: "Audit" },
                { label: "Remove", danger: true },
              ]}
            />,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function PasswordAndTwoFA({ onAction }: { onAction: (l: string, d?: boolean) => void }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <SectionCard
        title="Password Activity"
        description="Password lifecycle and breach intelligence"
        action={
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            onClick={() => onAction("Require Password Change", true)}
          >
            <Lock className="h-3.5 w-3.5" /> Require Change
          </Button>
        }
      >
        <ul className="space-y-2">
          {PASSWORD_EVENTS.map((p) => (
            <li
              key={p.id}
              className="flex items-start justify-between rounded-lg border border-border bg-card p-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{p.event}</span>
                  {riskBadge(p.risk)}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {p.source} · {fmt(p.time)}
                </div>
                {p.note ? <div className="mt-1 text-xs">{p.note}</div> : null}
              </div>
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard
        title="2FA Management"
        description="Multi-factor methods, OTP failures and re-enrollment"
        action={
          <Button
            size="sm"
            variant="destructive"
            className="gap-1"
            onClick={() => onAction("Reset 2FA", true)}
          >
            Reset 2FA
          </Button>
        }
      >
        <DataTable
          cols={["Method", "Status", "Failures", "Last Used", ""]}
          rows={TWO_FA_METHODS.map((m, i) => ({
            key: String(i),
            cells: [
              <div key="m" className="flex items-center gap-2">
                <Key className="h-4 w-4 text-primary" />
                <span className="font-medium">{m.method}</span>
              </div>,
              <StatusPill key="s" tone={m.status === "Active" ? "success" : "neutral"}>
                {m.status}
              </StatusPill>,
              <span
                key="f"
                className={cn(
                  "font-mono text-xs tabular-nums",
                  m.failures > 2 ? "text-critical" : "text-muted-foreground",
                )}
              >
                {m.failures}
              </span>,
              <span key="lu" className="text-xs text-muted-foreground">
                {ago(m.lastUsed)}
              </span>,
              <RowActions
                key="a"
                onAction={onAction}
                items={[
                  { label: "View OTP Logs" },
                  { label: "Require Re-enrollment" },
                  { label: "Disable Method", danger: true },
                ]}
              />,
            ],
          }))}
        />
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function LinkedDevicesPanel() {
  return (
    <SectionCard
      title="Linked Devices · Abuse Intelligence"
      description="Device fingerprints observed across multiple accounts"
    >
      <DataTable
        cols={["Fingerprint", "Accounts", "First Seen", "Last Seen", "Abuse Type", "Risk"]}
        rows={LINKED_DEVICES.map((l) => ({
          key: l.fingerprint,
          cells: [
            <MonoText key="f">{l.fingerprint}</MonoText>,
            <span key="a" className="font-mono text-sm tabular-nums">
              {l.accounts}
            </span>,
            <span key="fs" className="text-xs text-muted-foreground">
              {l.firstSeen}
            </span>,
            <span key="ls" className="text-xs text-muted-foreground">
              {l.lastSeen}
            </span>,
            <StatusPill key="ab" tone={l.risk > 80 ? "critical" : l.risk > 50 ? "warning" : "info"}>
              {l.abuse}
            </StatusPill>,
            <RiskMeter key="r" value={l.risk} />,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AuditPanel() {
  const [q, setQ] = useState("");
  const filtered = AUDIT.filter(
    (a) =>
      q === "" ||
      `${a.action} ${a.by} ${a.entity} ${a.reason}`.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <SectionCard
      title="Audit Trail"
      description="Immutable log of every admin action with before/after values"
      action={
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search audit"
              className="h-8 w-56 pl-8"
            />
          </div>
          <Button size="sm" variant="ghost" className="gap-1">
            <Download className="h-3.5 w-3.5" /> Export
          </Button>
        </div>
      }
    >
      <DataTable
        cols={["When", "Action", "By", "Role", "Entity", "Before → After", "Reason"]}
        rows={filtered.map((a) => ({
          key: a.id,
          cells: [
            <div key="w">
              <div className="text-xs">{fmt(a.time)}</div>
              <div className="text-[10px] text-muted-foreground">{ago(a.time)}</div>
            </div>,
            <span key="a" className="text-sm font-medium">
              {a.action}
            </span>,
            <span key="b" className="text-sm">
              {a.by}
            </span>,
            <StatusPill key="r" tone={a.role === "Client" ? "neutral" : "primary"}>
              {a.role}
            </StatusPill>,
            <MonoText key="e">{a.entity}</MonoText>,
            <span key="bn" className="text-xs">
              <span className="text-muted-foreground">{a.oldValue}</span>{" "}
              <ChevronRight className="inline h-3 w-3 text-muted-foreground" />{" "}
              <span className="font-semibold">{a.newValue}</span>
            </span>,
            <span key="re" className="text-xs text-muted-foreground">
              {a.reason}
            </span>,
          ],
        }))}
      />
    </SectionCard>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function AdminActionsPanel({ onAction }: { onAction: (l: string, d?: boolean) => void }) {
  const safe = [
    { label: "Notify Client", icon: <Bell className="h-4 w-4" /> },
    { label: "Export Report", icon: <Download className="h-4 w-4" /> },
    { label: "Add Note", icon: <Plus className="h-4 w-4" /> },
    { label: "View Device Details", icon: <Cpu className="h-4 w-4" /> },
  ];
  const moderate = [
    { label: "Request Verification", icon: <UserCheck className="h-4 w-4" /> },
    { label: "Require Password Change", icon: <Lock className="h-4 w-4" /> },
    { label: "Enable Monitoring", icon: <Signal className="h-4 w-4" /> },
    { label: "Reset Session Trust", icon: <RefreshCw className="h-4 w-4" /> },
  ];
  const dangerous = [
    { label: "Force Logout All Sessions", icon: <LogOut className="h-4 w-4" /> },
    { label: "Reset 2FA", icon: <Key className="h-4 w-4" /> },
    { label: "Lock Account", icon: <Lock className="h-4 w-4" /> },
    { label: "Block Device", icon: <Ban className="h-4 w-4" /> },
    { label: "Block IP", icon: <Network className="h-4 w-4" /> },
    { label: "Restrict Country Access", icon: <Globe className="h-4 w-4" /> },
    { label: "Suspend Login Access", icon: <ShieldOff className="h-4 w-4" /> },
    { label: "Freeze Withdrawals", icon: <Zap className="h-4 w-4" /> },
  ];
  return (
    <SectionCard
      title="Admin Actions"
      description="Role-aware actions. Dangerous actions require reason and audit log entry."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ActionGroup title="Safe" tone="success" items={safe} onAction={(l) => onAction(l)} />
        <ActionGroup title="Moderate" tone="info" items={moderate} onAction={(l) => onAction(l)} />
        <ActionGroup
          title="Dangerous"
          tone="critical"
          items={dangerous}
          onAction={(l) => onAction(l, true)}
        />
      </div>
    </SectionCard>
  );
}

function ActionGroup({
  title,
  tone,
  items,
  onAction,
}: {
  title: string;
  tone: "success" | "info" | "critical";
  items: { label: string; icon: React.ReactNode }[];
  onAction: (l: string) => void;
}) {
  const border =
    tone === "critical"
      ? "border-critical/40"
      : tone === "info"
        ? "border-info/40"
        : "border-success/40";
  return (
    <div className={cn("rounded-xl border bg-surface-2/40 p-4", border)}>
      <div className="mb-3 flex items-center justify-between">
        <h4 className="font-display text-sm font-semibold">{title} Actions</h4>
        <StatusPill tone={tone}>{items.length}</StatusPill>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {items.map((it) => (
          <Button
            key={it.label}
            variant={tone === "critical" ? "destructive" : "outline"}
            className="justify-start gap-2"
            onClick={() => onAction(it.label)}
          >
            {it.icon}
            {it.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function DetailDrawer({
  payload,
  onClose,
  onAction,
}: {
  payload: DrawerPayload;
  onClose: () => void;
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <Sheet open={!!payload} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto bg-background scrollbar-thin sm:max-w-2xl"
      >
        {payload?.kind === "session" ? (
          <SessionDrawer s={payload.data} onAction={onAction} />
        ) : null}
        {payload?.kind === "alert" ? <AlertDrawer a={payload.data} onAction={onAction} /> : null}
        {payload?.kind === "login" ? <LoginDrawer l={payload.data} /> : null}
        {payload?.kind === "device" ? <DeviceDrawer d={payload.data} onAction={onAction} /> : null}
        {payload?.kind === "ip" ? <IPDrawer i={payload.data} onAction={onAction} /> : null}
        {payload?.kind === "score" ? <ScoreDrawer /> : null}
        {payload?.kind === "geo" ? <GeoDrawer g={payload.data} onAction={onAction} /> : null}
      </SheetContent>
    </Sheet>
  );
}

function DrawerHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  right?: React.ReactNode;
}) {
  return (
    <SheetHeader className="border-b border-border pb-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            {eyebrow}
          </div>
          <SheetTitle className="font-display text-xl">{title}</SheetTitle>
          {description ? (
            <SheetDescription className="text-xs">{description}</SheetDescription>
          ) : null}
        </div>
        {right}
      </div>
    </SheetHeader>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border/50 py-2 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="text-right font-medium">{v}</span>
    </div>
  );
}

function SessionDrawer({
  s,
  onAction,
}: {
  s: Session;
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <>
      <DrawerHeader
        eyebrow="Session"
        title={`${s.device}`}
        description={`${s.id} · ${s.city}, ${s.country}`}
        right={
          <div className="flex flex-col items-end gap-1">
            {riskBadge(
              s.risk > 80 ? "critical" : s.risk > 55 ? "high" : s.risk > 25 ? "medium" : "low",
            )}
            <span className="font-mono text-xs">Risk {s.risk}/100</span>
          </div>
        }
      />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="flex-wrap">
          {["overview", "device", "network", "geo", "risk", "activity", "audit", "notes"].map(
            (t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ),
          )}
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <KPIBlock
              label="Status"
              value={s.status}
              tone={s.status === "active" ? "success" : "neutral"}
            />
            <KPIBlock
              label="Risk"
              value={`${s.risk}/100`}
              tone={s.risk > 70 ? "critical" : "warning"}
            />
            <KPIBlock label="Login" value={ago(s.loginAt)} tone="info" />
            <KPIBlock label="Last activity" value={ago(s.lastActivity)} tone="info" />
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <KV k="Session ID" v={<MonoText>{s.id}</MonoText>} />
            <KV k="Device" v={s.device} />
            <KV k="OS / Browser" v={`${s.os} · ${s.browser}`} />
            <KV
              k="IP / ISP"
              v={
                <>
                  <MonoText>{s.ip}</MonoText> · {s.isp}
                </>
              }
            />
            <KV k="Geo" v={`${s.city}, ${s.country}`} />
            <KV
              k="Flags"
              v={
                <div className="flex flex-wrap justify-end gap-1">
                  {s.flags.map((f) => (
                    <StatusPill key={f} tone="warning">
                      {f}
                    </StatusPill>
                  ))}
                </div>
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="device">
          <DeviceFingerprintCard fingerprint="fp_3a91c0e8b7d4" os={s.os} browser={s.browser} />
        </TabsContent>
        <TabsContent value="network">
          <NetworkCard ip={s.ip} isp={s.isp} vpn={s.vpn} tor={s.tor} dc={s.datacenter} />
        </TabsContent>
        <TabsContent value="geo">
          <GeoCard city={s.city} country={s.country} />
        </TabsContent>
        <TabsContent value="risk">
          <RiskAnalysisCard risk={s.risk} flags={s.flags} />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityTimeline />
        </TabsContent>
        <TabsContent value="audit">
          <MiniAudit />
        </TabsContent>
        <TabsContent value="notes">
          <p className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
            No session-scoped notes yet. Add one from the Notes panel.
          </p>
        </TabsContent>
      </Tabs>
      <DrawerActions
        items={[
          { label: "Mark Trusted", icon: <ShieldCheck className="h-4 w-4" /> },
          { label: "Require Re-login", icon: <RefreshCw className="h-4 w-4" /> },
          { label: "Terminate Session", icon: <X className="h-4 w-4" />, danger: true },
          { label: "Block IP", icon: <Network className="h-4 w-4" />, danger: true },
          { label: "Block Device", icon: <Ban className="h-4 w-4" />, danger: true },
        ]}
        onAction={onAction}
      />
    </>
  );
}

function AlertDrawer({
  a,
  onAction,
}: {
  a: SecurityAlert;
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <>
      <DrawerHeader
        eyebrow={`Alert · ${a.id}`}
        title={a.type}
        description={a.summary}
        right={riskBadge(a.severity)}
      />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="flex-wrap">
          {["overview", "evidence", "sessions", "devices", "timeline", "recommend", "audit"].map(
            (t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ),
          )}
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-xl border border-border bg-card p-3">
            <KV k="Status" v={<StatusPill tone="warning">{a.status}</StatusPill>} />
            <KV k="Severity" v={riskBadge(a.severity)} />
            <KV k="Assigned" v={a.assignee} />
            <KV k="Created" v={fmt(a.created)} />
            <KV k="SLA" v={<span className="text-warning">Breach in 1h 12m</span>} />
          </div>
        </TabsContent>
        <TabsContent value="evidence">
          <ul className="space-y-2">
            {[
              "Login from Stockholm Tor exit node (171.25.193.78)",
              "Session reached /api/withdrawals within 4 seconds of login",
              "User-Agent does not match any prior fingerprint",
              "ASN mismatch from baseline pattern (Tata Comm → Tor)",
            ].map((e) => (
              <li
                key={e}
                className="flex gap-2 rounded-lg border border-border bg-card p-3 text-sm"
              >
                <ShieldAlert className="h-4 w-4 text-critical" />
                {e}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="sessions">
          <ul className="space-y-2">
            {SESSIONS.slice(0, 3).map((s) => (
              <li key={s.id} className="rounded-lg border border-border bg-card p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{s.device}</span>
                  <RiskMeter value={s.risk} />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {s.ip} · {s.city}, {s.country}
                </div>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="devices">
          <ul className="space-y-2">
            {DEVICES.slice(3, 6).map((d) => (
              <li key={d.id} className="rounded-lg border border-border bg-card p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{d.name}</span>
                  {riskBadge(d.risk)}
                </div>
                <MonoText className="text-muted-foreground">{d.fingerprint}</MonoText>
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="timeline">
          <ActivityTimeline />
        </TabsContent>
        <TabsContent value="recommend">
          <ul className="space-y-2">
            {[
              "Terminate all sessions and force re-authentication with hardware key",
              "Block IP 171.25.193.78 and known Tor exit nodes ASN-wide",
              "Require 2FA re-enrollment and rotate API keys",
              "Freeze withdrawals for 24h pending SOC review",
            ].map((r) => (
              <li
                key={r}
                className="flex gap-2 rounded-lg border border-info/40 bg-info/10 p-3 text-sm"
              >
                <ShieldCheck className="h-4 w-4 text-info" />
                {r}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="audit">
          <MiniAudit />
        </TabsContent>
      </Tabs>
      <DrawerActions
        items={[
          { label: "Acknowledge" },
          { label: "Assign to me" },
          { label: "Mark Resolved" },
          { label: "Escalate to SOC", danger: true },
        ]}
        onAction={onAction}
      />
    </>
  );
}

function LoginDrawer({ l }: { l: LoginEvent }) {
  return (
    <>
      <DrawerHeader
        eyebrow={`Login · ${l.id}`}
        title={`${l.result.toUpperCase()} from ${l.city}, ${l.country}`}
        description={`${l.device} · ${l.browser} · ${l.os}`}
        right={
          <StatusPill
            tone={
              l.result === "success" ? "success" : l.result === "failed" ? "warning" : "critical"
            }
          >
            {l.result}
          </StatusPill>
        }
      />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <KPIBlock
          label="Risk"
          value={`${l.risk}/100`}
          tone={l.risk > 70 ? "critical" : "warning"}
        />
        <KPIBlock
          label="2FA"
          value={l.twoFA}
          tone={l.twoFA === "passed" ? "success" : "critical"}
        />
        <KPIBlock label="VPN" value={l.vpn ? "Yes" : "No"} tone={l.vpn ? "warning" : "success"} />
        <KPIBlock label="TOR" value={l.tor ? "Yes" : "No"} tone={l.tor ? "critical" : "success"} />
      </div>
      <div className="mt-4 rounded-xl border border-border bg-card p-3">
        <KV k="Time" v={fmt(l.time)} />
        <KV k="IP" v={<MonoText>{l.ip}</MonoText>} />
        <KV k="Location" v={`${l.city}, ${l.country}`} />
        <KV k="Device" v={l.device} />
        <KV k="Browser / OS" v={`${l.browser} · ${l.os}`} />
      </div>
      <div className="mt-4">
        <ActivityTimeline />
      </div>
    </>
  );
}

function DeviceDrawer({ d, onAction }: { d: Device; onAction: (l: string, dd?: boolean) => void }) {
  return (
    <>
      <DrawerHeader
        eyebrow={`Device · ${d.id}`}
        title={d.name}
        description={`${d.type} · ${d.os}`}
        right={riskBadge(d.risk)}
      />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="flex-wrap">
          {["overview", "fingerprint", "sessions", "events", "linked", "audit"].map((t) => (
            <TabsTrigger key={t} value={t} className="capitalize">
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-xl border border-border bg-card p-3">
            <KV k="Trusted" v={d.trusted ? "Yes" : "No"} />
            <KV k="First seen" v={d.firstSeen} />
            <KV k="Last seen" v={d.lastSeen} />
            <KV k="Accounts" v={d.accounts} />
            <KV
              k="Flags"
              v={
                <div className="flex flex-wrap justify-end gap-1">
                  {d.flags.length === 0
                    ? "—"
                    : d.flags.map((f) => (
                        <StatusPill key={f} tone="warning">
                          {f}
                        </StatusPill>
                      ))}
                </div>
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="fingerprint">
          <DeviceFingerprintCard fingerprint={d.fingerprint} os={d.os} browser="—" />
        </TabsContent>
        <TabsContent value="sessions">
          <p className="text-sm text-muted-foreground">2 active sessions on this device.</p>
        </TabsContent>
        <TabsContent value="events">
          <ActivityTimeline />
        </TabsContent>
        <TabsContent value="linked">
          <p className="text-sm text-muted-foreground">
            {d.accounts > 1
              ? `Linked to ${d.accounts} accounts. See Linked Devices tab for details.`
              : "Not linked to any other accounts."}
          </p>
        </TabsContent>
        <TabsContent value="audit">
          <MiniAudit />
        </TabsContent>
      </Tabs>
      <DrawerActions
        items={[
          { label: "Trust Device" },
          { label: "Force Verification" },
          { label: "Terminate Sessions", danger: true },
          { label: "Block Device", danger: true },
        ]}
        onAction={onAction}
      />
    </>
  );
}

function IPDrawer({ i, onAction }: { i: IPRecord; onAction: (l: string, d?: boolean) => void }) {
  return (
    <>
      <DrawerHeader
        eyebrow="IP Intelligence"
        title={i.ip}
        description={`${i.city}, ${i.country} · ${i.isp}`}
        right={riskBadge(i.risk)}
      />
      <Tabs defaultValue="overview" className="mt-4">
        <TabsList className="flex-wrap">
          {["overview", "geo", "isp", "threat", "sessions", "devices", "timeline", "audit"].map(
            (t) => (
              <TabsTrigger key={t} value={t} className="capitalize">
                {t}
              </TabsTrigger>
            ),
          )}
        </TabsList>
        <TabsContent value="overview">
          <div className="rounded-xl border border-border bg-card p-3">
            <KV k="IP" v={<MonoText>{i.ip}</MonoText>} />
            <KV k="Connection" v={i.connection} />
            <KV k="ASN" v="AS24940 — Hetzner Online GmbH" />
            <KV k="First seen" v={i.firstSeen} />
            <KV k="Last seen" v={i.lastSeen} />
            <KV k="Hits" v={i.hits} />
          </div>
        </TabsContent>
        <TabsContent value="geo">
          <GeoCard city={i.city} country={i.country} />
        </TabsContent>
        <TabsContent value="isp">
          <div className="rounded-xl border border-border bg-card p-3">
            <KV k="ISP" v={i.isp} />
            <KV k="Type" v={i.connection} />
            <KV k="Range" v={`${i.ip.split(".").slice(0, 3).join(".")}.0/24`} />
            <KV k="Abuse contact" v="abuse@example.net" />
          </div>
        </TabsContent>
        <TabsContent value="threat">
          <div className="flex flex-wrap gap-2">
            {i.vpn ? <StatusPill tone="warning">VPN</StatusPill> : null}
            {i.proxy ? <StatusPill tone="warning">Proxy</StatusPill> : null}
            {i.tor ? <StatusPill tone="critical">TOR exit</StatusPill> : null}
            {i.datacenter ? <StatusPill tone="warning">Datacenter</StatusPill> : null}
            {!i.vpn && !i.proxy && !i.tor && !i.datacenter ? (
              <StatusPill tone="success">No reputation hits</StatusPill>
            ) : null}
          </div>
          <div className="mt-3 h-32 rounded-lg border border-border bg-surface-2 p-2">
            <ResponsiveContainer>
              <BarChart
                data={[
                  { d: "Mon", v: 2 },
                  { d: "Tue", v: 4 },
                  { d: "Wed", v: 1 },
                  { d: "Thu", v: 6 },
                  { d: "Fri", v: 9 },
                  { d: "Sat", v: 3 },
                  { d: "Sun", v: 5 },
                ]}
              >
                <CartesianGrid strokeDasharray="2 4" className="stroke-border" />
                <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <RTooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="v" radius={[3, 3, 0, 0]}>
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <Cell key={i} fill="var(--color-primary)" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="sessions">
          <p className="text-sm text-muted-foreground">2 sessions originated from this IP.</p>
        </TabsContent>
        <TabsContent value="devices">
          <p className="text-sm text-muted-foreground">3 distinct devices observed.</p>
        </TabsContent>
        <TabsContent value="timeline">
          <ActivityTimeline />
        </TabsContent>
        <TabsContent value="audit">
          <MiniAudit />
        </TabsContent>
      </Tabs>
      <DrawerActions
        items={[
          { label: "Whitelist IP" },
          { label: "Enable Monitoring" },
          { label: "Restrict Region" },
          { label: "Block IP", danger: true },
        ]}
        onAction={onAction}
      />
    </>
  );
}

function ScoreDrawer() {
  return (
    <>
      <DrawerHeader
        eyebrow="Security Score"
        title={`${CLIENT.securityScore}/100 · ${scoreBand(CLIENT.securityScore).label}`}
        description="Composite risk score across 10 weighted factors"
      />
      <div className="mt-4 space-y-4">
        <div className="h-40 rounded-xl border border-border bg-surface-2 p-2">
          <ResponsiveContainer>
            <LineChart data={SCORE_HISTORY}>
              <CartesianGrid strokeDasharray="2 4" className="stroke-border" />
              <XAxis dataKey="d" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 100]} hide />
              <RTooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-primary)"
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ul className="space-y-2">
          {SCORE_FACTORS.map((f) => (
            <li
              key={f.label}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center gap-2">
                <Dot
                  tone={
                    f.status === "good" ? "success" : f.status === "warn" ? "warning" : "critical"
                  }
                />
                <span className="text-sm">{f.label}</span>
              </div>
              <Progress
                value={Math.min(100, Math.abs(f.impact) * 5)}
                className={cn(
                  "h-1.5 w-32",
                  f.impact >= 0 ? "[&>div]:bg-success" : "[&>div]:bg-critical",
                )}
              />
              <span
                className={cn(
                  "ml-2 font-mono text-xs font-semibold",
                  f.impact >= 0 ? "text-success" : "text-critical",
                )}
              >
                {f.impact > 0 ? "+" : ""}
                {f.impact}
              </span>
            </li>
          ))}
        </ul>
        <div className="rounded-xl border border-info/40 bg-info/10 p-3">
          <h4 className="text-sm font-semibold">Recommendations</h4>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs">
            <li>Require hardware key on all admin actions</li>
            <li>Add Frankfurt VPN exit to client's exemption list or terminate sessions</li>
            <li>Rotate password — last change 98 days ago</li>
            <li>Enable Sentinel adaptive challenges on geo deltas {">"} 1500km</li>
          </ul>
        </div>
      </div>
    </>
  );
}

function GeoDrawer({
  g,
  onAction,
}: {
  g: (typeof IMPOSSIBLE_TRAVEL)[number];
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <>
      <DrawerHeader
        eyebrow="Geo Risk"
        title={g.verdict}
        description={`${g.from.city} → ${g.to.city} in ${g.minutes} minutes`}
        right={riskBadge(g.risk)}
      />
      <div className="mt-4 grid grid-cols-3 gap-3">
        <KPIBlock label="Distance" value={`${g.distanceKm} km`} tone="warning" />
        <KPIBlock label="Window" value={`${g.minutes} min`} tone="warning" />
        <KPIBlock label="Speed required" value={`${g.requiredKmh} km/h`} tone="critical" />
      </div>
      <div className="mt-4 rounded-xl border border-border bg-card p-3">
        <KV k="Origin" v={`${g.from.city}, ${g.from.country} — ${fmt(g.from.time)}`} />
        <KV k="Destination" v={`${g.to.city}, ${g.to.country} — ${fmt(g.to.time)}`} />
        <KV k="Verdict" v={<StatusPill tone="critical">{g.verdict}</StatusPill>} />
      </div>
      <div className="mt-4 rounded-xl border border-info/40 bg-info/10 p-3 text-xs">
        Commercial flight Mumbai → Dubai takes ~3h 10m. Observed window is{" "}
        <span className="font-semibold">{g.minutes} minutes</span> — physically impossible. Most
        likely cause: shared credentials or session token reuse.
      </div>
      <DrawerActions
        items={[
          { label: "Approve as travel exemption" },
          { label: "Terminate Dubai session", danger: true },
          { label: "Lock Account", danger: true },
        ]}
        onAction={onAction}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function KPIBlock({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "success" | "info" | "warning" | "critical" | "neutral";
}) {
  const accent: Record<typeof tone, string> = {
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    critical: "text-critical",
    neutral: "text-foreground",
  };
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={cn("mt-1 font-display text-base font-semibold capitalize", accent[tone])}>
        {value}
      </div>
    </div>
  );
}

function DrawerActions({
  items,
  onAction,
}: {
  items: { label: string; icon?: React.ReactNode; danger?: boolean }[];
  onAction: (l: string, d?: boolean) => void;
}) {
  return (
    <div className="sticky bottom-0 mt-6 -mx-6 border-t border-border bg-background/95 px-6 py-3 backdrop-blur">
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Button
            key={it.label}
            variant={it.danger ? "destructive" : "outline"}
            size="sm"
            className="gap-1"
            onClick={() => onAction(it.label, it.danger)}
          >
            {it.icon}
            {it.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function DeviceFingerprintCard({
  fingerprint,
  os,
  browser,
}: {
  fingerprint: string;
  os: string;
  browser: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <KV k="Fingerprint" v={<MonoText>{fingerprint}</MonoText>} />
      <KV k="OS" v={os} />
      <KV k="Browser" v={browser} />
      <KV k="WebGL" v="Apple M3 Pro" />
      <KV k="Canvas hash" v={<MonoText>c2a7…f019</MonoText>} />
      <KV k="Timezone" v="Asia/Kolkata" />
      <KV k="Languages" v="en-IN, en, hi" />
    </div>
  );
}

function NetworkCard({
  ip,
  isp,
  vpn,
  tor,
  dc,
}: {
  ip: string;
  isp: string;
  vpn: boolean;
  tor: boolean;
  dc: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <KV k="IP" v={<MonoText>{ip}</MonoText>} />
      <KV k="ISP" v={isp} />
      <KV
        k="Reverse DNS"
        v={<MonoText>static.{ip.split(".").slice(0, 3).join(".")}.in-addr</MonoText>}
      />
      <KV
        k="VPN"
        v={
          vpn ? (
            <StatusPill tone="warning">Yes</StatusPill>
          ) : (
            <StatusPill tone="success">No</StatusPill>
          )
        }
      />
      <KV
        k="TOR"
        v={
          tor ? (
            <StatusPill tone="critical">Yes</StatusPill>
          ) : (
            <StatusPill tone="success">No</StatusPill>
          )
        }
      />
      <KV
        k="Datacenter"
        v={
          dc ? (
            <StatusPill tone="warning">Yes</StatusPill>
          ) : (
            <StatusPill tone="success">No</StatusPill>
          )
        }
      />
    </div>
  );
}

function GeoCard({ city, country }: { city: string; country: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <KV k="City" v={city} />
      <KV k="Country" v={country} />
      <KV k="Region" v="—" />
      <KV k="Timezone" v="UTC+05:30" />
      <KV k="Coordinates" v={<MonoText>19.07°N, 72.87°E</MonoText>} />
    </div>
  );
}

function RiskAnalysisCard({ risk, flags }: { risk: number; flags: string[] }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Composite risk</span>
          <span className="font-mono text-sm">{risk}/100</span>
        </div>
        <Progress value={risk} className="mt-2 h-2 [&>div]:bg-warning" />
      </div>
      <ul className="space-y-2">
        {flags.map((f) => (
          <li
            key={f}
            className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm"
          >
            <AlertTriangle className="h-4 w-4 text-warning" /> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ActivityTimeline() {
  const items = TIMELINE.slice(0, 5);
  return (
    <ol className="relative space-y-3 pl-5">
      <span className="absolute left-1.5 top-1 h-full w-px bg-border" />
      {items.map((t) => (
        <li key={t.id} className="relative">
          <span className="absolute -left-[18px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary" />
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t.title}</span>
              <span className="text-[10px] text-muted-foreground">{ago(t.time)}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function MiniAudit() {
  return (
    <ul className="space-y-2">
      {AUDIT.slice(0, 4).map((a) => (
        <li
          key={a.id}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-3 text-xs"
        >
          <div>
            <div className="font-medium">{a.action}</div>
            <div className="text-muted-foreground">
              {a.by} · {a.role}
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono">{a.entity}</div>
            <div className="text-muted-foreground">{ago(a.time)}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
