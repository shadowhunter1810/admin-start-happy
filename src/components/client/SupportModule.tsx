import { useMemo, useState, useEffect } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  ChevronDown,
  Crown,
  Download,
  Filter,
  Inbox,
  KeyboardIcon,
  MessageSquare,
  Moon,
  Phone,
  Plus,
  Search,
  Settings2,
  Shield,
  Sparkles,
  Sun,
  Ticket as TicketIcon,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
  X,
  CheckCircle2,
  Clock,
  Flame,
  Gauge,
  LineChart as LineChartIcon,
  Headphones,
  FileWarning,
  Eye,
  MoreHorizontal,
  RefreshCw,
  ShieldAlert,
  Star,
  BarChart3,
  AlertOctagon,
  Wallet,
  Building2,
  FileText,
  PinIcon,
  History,
  NotebookPen,
  ListTree,
  Lock,
  BadgeCheck,
} from "lucide-react";
import { toast, Toaster } from "sonner";
import {
  TICKETS,
  CALLS,
  CHATS,
  COMPLAINTS,
  AGENT_LIST,
  STATUS_META,
  PRIORITY_META,
  formatRelative,
  formatDateTime,
  type Ticket,
  type TicketStatus,
  type TicketPriority,
  type TicketCategory,
} from "@/lib/support-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RTooltip,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";

// ───────────────────────── helpers ─────────────────────────

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

function StatusDot({ status }: { status: TicketStatus }) {
  const m = STATUS_META[status];
  return <span className={cn("inline-block size-2 rounded-full", m.dot)} aria-hidden />;
}

function StatusPill({ status }: { status: TicketStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium",
        m.tone,
      )}
    >
      <span className={cn("size-1.5 rounded-full", m.dot)} />
      {m.label}
    </span>
  );
}

function PriorityPill({ p }: { p: TicketPriority }) {
  const m = PRIORITY_META[p];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        m.tone,
      )}
    >
      {m.label}
    </span>
  );
}

function SLAIndicator({ ticket }: { ticket: Ticket }) {
  const { sla } = ticket;
  if (sla.breached) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="inline-flex size-5 items-center justify-center rounded-full bg-destructive/15 text-destructive">
          <AlertTriangle className="size-3" />
        </span>
        <span className="text-xs font-medium text-destructive">Breached</span>
      </div>
    );
  }
  const pct = sla.firstResponseActualMin
    ? Math.min(100, (sla.firstResponseActualMin / sla.firstResponseTargetMin) * 100)
    : 30;
  const tone = pct > 80 ? "text-warning [&>div]:bg-warning" : "text-success [&>div]:bg-success";
  return (
    <div className="flex w-24 flex-col gap-1">
      <div className="flex items-center justify-between text-[10px] font-medium">
        <span className={cn(tone.split(" ")[0])}>{Math.round(pct)}%</span>
        <span className="text-muted-foreground">{sla.firstResponseTargetMin}m</span>
      </div>
      <Progress value={pct} className={cn("h-1", tone)} />
    </div>
  );
}

function AgentChip({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="flex items-center gap-1.5">
      <Avatar className="size-6">
        <AvatarFallback className="text-[10px] font-semibold">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm text-foreground/90">{name}</span>
    </div>
  );
}

// ───────────────────────── status bar badges ─────────────────────────

interface BadgeDef {
  key: string;
  label: string;
  tone: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
  predicate: (t: Ticket) => boolean;
}

function buildBadges(tickets: Ticket[]): BadgeDef[] {
  return [
    {
      key: "open",
      label: "Open Tickets",
      tone: "bg-info/10 text-info border-info/30",
      icon: Inbox,
      predicate: (t) => t.status === "open",
      count: tickets.filter((t) => t.status === "open").length,
    },
    {
      key: "pending",
      label: "Pending",
      tone: "bg-warning/10 text-warning border-warning/30",
      icon: Clock,
      predicate: (t) => t.status === "waiting_client" || t.status === "in_progress",
      count: tickets.filter((t) => t.status === "waiting_client" || t.status === "in_progress")
        .length,
    },
    {
      key: "escalated",
      label: "Escalated",
      tone: "bg-destructive/10 text-destructive border-destructive/30",
      icon: Flame,
      predicate: (t) => t.escalation.active,
      count: tickets.filter((t) => t.escalation.active).length,
    },
    {
      key: "vip",
      label: "VIP Client",
      tone: "bg-vip/15 text-vip-foreground border-vip/40",
      icon: Crown,
      predicate: (t) => t.vip,
      count: tickets.filter((t) => t.vip).length,
    },
    {
      key: "sla",
      label: "SLA Breached",
      tone: "bg-destructive/10 text-destructive border-destructive/30",
      icon: AlertOctagon,
      predicate: (t) => t.sla.breached,
      count: tickets.filter((t) => t.sla.breached).length,
    },
    {
      key: "compliance",
      label: "Compliance Hold",
      tone: "bg-[oklch(0.55_0.18_290)]/10 text-[oklch(0.55_0.18_290)] border-[oklch(0.55_0.18_290)]/30",
      icon: Shield,
      predicate: (t) => t.compliance,
      count: tickets.filter((t) => t.compliance).length,
    },
    {
      key: "aml",
      label: "AML Review",
      tone: "bg-[oklch(0.6_0.17_320)]/10 text-[oklch(0.6_0.17_320)] border-[oklch(0.6_0.17_320)]/30",
      icon: ShieldAlert,
      predicate: (t) => !!t.amlReview,
      count: tickets.filter((t) => t.amlReview).length,
    },
    {
      key: "finance",
      label: "Finance Escalation",
      tone: "bg-success/10 text-success border-success/30",
      icon: Wallet,
      predicate: (t) => t.assignedTeam === "Finance" && t.escalation.active,
      count: tickets.filter((t) => t.assignedTeam === "Finance" && t.escalation.active).length,
    },
    {
      key: "risk",
      label: "High Risk",
      tone: "bg-warning/15 text-warning border-warning/40",
      icon: Gauge,
      predicate: (t) => t.riskLevel === "high" || t.riskLevel === "critical",
      count: tickets.filter((t) => t.riskLevel === "high" || t.riskLevel === "critical").length,
    },
    {
      key: "restricted",
      label: "Restricted Account",
      tone: "bg-muted text-muted-foreground border-border",
      icon: Lock,
      predicate: (t) => t.category === "Compliance",
      count: tickets.filter((t) => t.category === "Compliance").length,
    },
    {
      key: "neg",
      label: "Negative Balance",
      tone: "bg-destructive/10 text-destructive border-destructive/30",
      icon: TrendingDown,
      predicate: (t) => /negative/i.test(t.subject),
      count: tickets.filter((t) => /negative/i.test(t.subject)).length,
    },
    {
      key: "cb",
      label: "Chargeback Risk",
      tone: "bg-[oklch(0.6_0.2_15)]/10 text-[oklch(0.6_0.2_15)] border-[oklch(0.6_0.2_15)]/30",
      icon: FileWarning,
      predicate: (t) => t.category === "Withdrawal" && t.priority === "critical",
      count: tickets.filter((t) => t.category === "Withdrawal" && t.priority === "critical").length,
    },
  ];
}

// ───────────────────────── KPI cards ─────────────────────────

interface KPI {
  label: string;
  value: string | number;
  sub: string;
  trend: number;
  icon: React.ComponentType<{ className?: string }>;
  tone: string;
}

function buildKPIs(tickets: Ticket[]): KPI[] {
  const open = tickets.filter((t) => t.status === "open").length;
  const closed = tickets.filter((t) => t.status === "closed" || t.status === "resolved").length;
  const pending = tickets.filter(
    (t) => t.status === "waiting_client" || t.status === "in_progress",
  ).length;
  const esc = tickets.filter((t) => t.escalation.active).length;
  const resTimes = tickets.map((t) => t.sla.resolutionActualH).filter(Boolean) as number[];
  const avgRes = resTimes.length
    ? (resTimes.reduce((a, b) => a + b, 0) / resTimes.length).toFixed(1)
    : "0";
  const firstResp = tickets.map((t) => t.sla.firstResponseActualMin).filter(Boolean) as number[];
  const avgFR = firstResp.length
    ? Math.round(firstResp.reduce((a, b) => a + b, 0) / firstResp.length)
    : 0;
  const breaches = tickets.filter((t) => t.sla.breached).length;
  const csats = tickets.map((t) => t.csat?.stars).filter(Boolean) as number[];
  const csat = csats.length ? (csats.reduce((a, b) => a + b, 0) / csats.length).toFixed(1) : "—";
  const health = Math.round(100 - (breaches / tickets.length) * 100 - (esc / tickets.length) * 20);
  const reopened = tickets.filter((t) => (t.reopened ?? 0) > 0).length;
  const complaints = COMPLAINTS.length;
  const live = CHATS.filter((c) => c.status === "Active").length;
  const calls = CALLS.length;
  const vipT = tickets.filter((t) => t.vip).length;
  const crit = tickets.filter((t) => t.priority === "critical").length;

  return [
    {
      label: "Open Tickets",
      value: open,
      sub: "Awaiting agent",
      trend: 8,
      icon: Inbox,
      tone: "text-info",
    },
    {
      label: "Closed Tickets",
      value: closed,
      sub: "Last 30 days",
      trend: 12,
      icon: CheckCircle2,
      tone: "text-success",
    },
    {
      label: "Pending",
      value: pending,
      sub: "In progress / waiting",
      trend: -3,
      icon: Clock,
      tone: "text-warning",
    },
    {
      label: "Escalated",
      value: esc,
      sub: "Active escalations",
      trend: 4,
      icon: Flame,
      tone: "text-destructive",
    },
    {
      label: "Avg Resolution",
      value: `${avgRes}h`,
      sub: "Across all tiers",
      trend: -6,
      icon: Gauge,
      tone: "text-foreground",
    },
    {
      label: "First Response",
      value: `${avgFR}m`,
      sub: "Median",
      trend: -11,
      icon: Zap,
      tone: "text-foreground",
    },
    {
      label: "SLA Breaches",
      value: breaches,
      sub: "Last 30 days",
      trend: -2,
      icon: AlertOctagon,
      tone: "text-destructive",
    },
    {
      label: "Support Health",
      value: `${Math.max(0, health)}%`,
      sub: "Composite score",
      trend: 3,
      icon: BadgeCheck,
      tone: "text-success",
    },
    {
      label: "Satisfaction",
      value: csat,
      sub: "CSAT avg (1–5)",
      trend: 5,
      icon: Star,
      tone: "text-vip",
    },
    {
      label: "Reopened",
      value: reopened,
      sub: "Reopened within 7d",
      trend: 1,
      icon: RefreshCw,
      tone: "text-warning",
    },
    {
      label: "Complaints",
      value: complaints,
      sub: "Open complaints",
      trend: -1,
      icon: FileWarning,
      tone: "text-destructive",
    },
    {
      label: "Live Chats",
      value: live,
      sub: "Currently active",
      trend: 9,
      icon: MessageSquare,
      tone: "text-info",
    },
    {
      label: "Phone Calls",
      value: calls,
      sub: "Last 24h",
      trend: 2,
      icon: Phone,
      tone: "text-foreground",
    },
    {
      label: "VIP Tickets",
      value: vipT,
      sub: "Premium clients",
      trend: 7,
      icon: Crown,
      tone: "text-vip",
    },
    {
      label: "Critical",
      value: crit,
      sub: "P1 incidents",
      trend: -4,
      icon: AlertTriangle,
      tone: "text-destructive",
    },
  ];
}

// ───────────────────────── main component ─────────────────────────

export default function SupportModule() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const [tickets, setTickets] = useState<Ticket[]>(TICKETS);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
    category?: string;
    department?: string;
    agent?: string;
    country?: string;
    vipOnly?: boolean;
    slaBreached?: boolean;
    compliance?: boolean;
  }>({});
  const [selected, setSelected] = useState<string[]>([]);
  const [openTicket, setOpenTicket] = useState<Ticket | null>(null);
  const [mainTab, setMainTab] = useState("open");
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const badges = useMemo(() => buildBadges(tickets), [tickets]);
  const kpis = useMemo(() => buildKPIs(tickets), [tickets]);

  const filteredTickets = useMemo(() => {
    let list = tickets;
    const badge = badges.find((b) => b.key === activeBadge);
    if (badge) list = list.filter(badge.predicate);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.clientName.toLowerCase().includes(q) ||
          t.clientEmail.toLowerCase().includes(q) ||
          t.accountNumber.toLowerCase().includes(q),
      );
    }
    if (filters.status) list = list.filter((t) => t.status === filters.status);
    if (filters.priority) list = list.filter((t) => t.priority === filters.priority);
    if (filters.category) list = list.filter((t) => t.category === filters.category);
    if (filters.department) list = list.filter((t) => t.department === filters.department);
    if (filters.agent) list = list.filter((t) => t.assignedAgent === filters.agent);
    if (filters.country) list = list.filter((t) => t.country === filters.country);
    if (filters.vipOnly) list = list.filter((t) => t.vip);
    if (filters.slaBreached) list = list.filter((t) => t.sla.breached);
    if (filters.compliance) list = list.filter((t) => t.compliance);
    return list;
  }, [tickets, badges, activeBadge, search, filters]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "/") {
        e.preventDefault();
        (document.getElementById("global-search") as HTMLInputElement)?.focus();
      } else if (e.key.toLowerCase() === "n") setNewTicketOpen(true);
      else if (e.key === "?") setShortcutsOpen(true);
      else if (e.key.toLowerCase() === "g") setMainTab("analytics");
      else if (e.key === "Escape") {
        setOpenTicket(null);
        setActiveBadge(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const exportRows = (fmt: "CSV" | "Excel" | "PDF") =>
    toast.success(`Exported ${filteredTickets.length} tickets as ${fmt}`);

  const bulkAction = (action: string) => {
    toast.success(`${action} applied to ${selected.length} tickets`);
    setSelected([]);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="min-h-screen bg-background text-foreground">
        <Toaster richColors position="top-right" />

        {/* ===== top app bar ===== */}
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-[oklch(0.6_0.2_290)] text-primary-foreground shadow-lg">
                <Headphones className="size-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">Apex CRM</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Support & Tickets
                </span>
              </div>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <nav className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
              <span>Clients</span>
              <span>/</span>
              <span className="text-foreground">Alex Chen · CL-50012</span>
              <span>/</span>
              <span className="text-foreground font-medium">Support & Tickets</span>
            </nav>
            <div className="relative ml-auto w-full max-w-md">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="global-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets, clients, accounts…"
                className="h-9 pl-8 pr-12"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                /
              </kbd>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setShortcutsOpen(true)}>
                  <KeyboardIcon className="size-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Keyboard shortcuts (?)</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotifOpen(true)}
                  className="relative"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)}>
                  {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
            <Button size="sm" className="gap-1.5" onClick={() => setNewTicketOpen(true)}>
              <Plus className="size-4" /> New Ticket
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] space-y-5 px-4 py-5 lg:px-6">
          {/* ===== client status bar ===== */}
          {/* <ClientStatusCard /> */}

          {/* ===== smart badges ===== */}
          {/* <section>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Smart Status
              </h2>
              {activeBadge && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveBadge(null)}
                  className="h-7 gap-1 text-xs"
                >
                  <X className="size-3" /> Clear filter
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => {
                const active = activeBadge === b.key;
                const Icon = b.icon;
                return (
                  <button
                    key={b.key}
                    onClick={() => {
                      setActiveBadge(active ? null : b.key);
                      setMainTab("open");
                    }}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all hover:scale-[1.02] hover:shadow-sm",
                      b.tone,
                      active &&
                        "ring-2 ring-ring ring-offset-2 ring-offset-background scale-[1.02]",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {b.label}
                    <span className="rounded-full bg-background/70 px-1.5 py-0.5 font-semibold tabular-nums">
                      {b.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </section> */}

          {/* ===== KPI grid ===== */}
          <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {kpis.map((k) => {
              const Icon = k.icon;
              const up = k.trend >= 0;
              return (
                <button
                  key={k.label}
                  onClick={() => {
                    setMainTab("analytics");
                    toast.info(`Drill-down · ${k.label}`);
                  }}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-3.5 text-left transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/[0.04] opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {k.label}
                      </span>
                      <span className="text-2xl font-semibold tabular-nums text-foreground">
                        {k.value}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center rounded-lg bg-muted/60",
                        k.tone,
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                  </div>
                  <div className="relative mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{k.sub}</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 font-medium",
                        up ? "text-success" : "text-destructive",
                      )}
                    >
                      {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                      {Math.abs(k.trend)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </section>

          {/* ===== main tabs ===== */}
          <Tabs value={mainTab} onValueChange={setMainTab} className="space-y-4">
            <div className="overflow-x-auto scrollbar-thin">
              <TabsList className="h-auto flex-nowrap justify-start gap-1 bg-muted/40 p-1">
                {[
                  {
                    v: "open",
                    l: "Open Tickets",
                    c: filteredTickets.filter(
                      (t) => t.status !== "closed" && t.status !== "resolved",
                    ).length,
                  },
                  { v: "history", l: "Ticket History", c: tickets.length },
                  { v: "chat", l: "Live Chat", c: CHATS.length },
                  { v: "calls", l: "Phone Calls", c: CALLS.length },
                  { v: "complaints", l: "Complaints", c: COMPLAINTS.length },
                  {
                    v: "escalations",
                    l: "Escalations",
                    c: tickets.filter((t) => t.escalation.active).length,
                  },
                  { v: "sla", l: "SLA Monitoring" },
                  { v: "analytics", l: "Analytics" },
                  { v: "satisfaction", l: "Satisfaction" },
                  { v: "notes", l: "Internal Notes" },
                  { v: "timeline", l: "Timeline" },
                  { v: "admin", l: "Admin Actions" },
                  { v: "audit", l: "Audit Trail" },
                ].map((t) => (
                  <TabsTrigger
                    key={t.v}
                    value={t.v}
                    className="gap-1.5 whitespace-nowrap data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    {t.l}
                    {t.c !== undefined && (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
                        {t.c}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* OPEN TICKETS */}
            <TabsContent value="open" className="space-y-3">
              <FiltersBar filters={filters} setFilters={setFilters} onExport={exportRows} />
              {selected.length > 0 && (
                <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-3 py-2">
                  <span className="text-sm font-medium">{selected.length} selected</span>
                  <div className="flex gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => bulkAction("Assign")}>
                      Assign
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => bulkAction("Escalate")}>
                      Escalate
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => bulkAction("Close")}>
                      Close
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => bulkAction("Export")}>
                      Export
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setSelected([])}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              <TicketsTable
                tickets={filteredTickets}
                selected={selected}
                setSelected={setSelected}
                onOpen={setOpenTicket}
              />
            </TabsContent>

            <TabsContent value="history" className="space-y-3">
              <FiltersBar filters={filters} setFilters={setFilters} onExport={exportRows} />
              <TicketsTable
                tickets={tickets}
                selected={selected}
                setSelected={setSelected}
                onOpen={setOpenTicket}
              />
            </TabsContent>

            <TabsContent value="chat">
              <LiveChatPanel />
            </TabsContent>
            <TabsContent value="calls">
              <PhoneCallsPanel />
            </TabsContent>
            <TabsContent value="complaints">
              <ComplaintsPanel />
            </TabsContent>
            <TabsContent value="escalations">
              <EscalationsPanel tickets={tickets} onOpen={setOpenTicket} />
            </TabsContent>
            <TabsContent value="sla">
              <SLAPanel tickets={tickets} onOpen={setOpenTicket} />
            </TabsContent>
            <TabsContent value="analytics">
              <AnalyticsPanel tickets={tickets} />
            </TabsContent>
            <TabsContent value="satisfaction">
              <SatisfactionPanel tickets={tickets} />
            </TabsContent>
            <TabsContent value="notes">
              <InternalNotesPanel tickets={tickets} onOpen={setOpenTicket} />
            </TabsContent>
            <TabsContent value="timeline">
              <TimelinePanel tickets={tickets} onOpen={setOpenTicket} />
            </TabsContent>
            <TabsContent value="admin">
              <AdminActionsPanel />
            </TabsContent>
            <TabsContent value="audit">
              <AuditTrailPanel tickets={tickets} />
            </TabsContent>
          </Tabs>
        </main>

        {/* drawer */}
        <Sheet open={!!openTicket} onOpenChange={(o) => !o && setOpenTicket(null)}>
          <SheetContent side="right" className="w-[90vw] max-w-none p-0 sm:max-w-none">
            {openTicket && (
              <TicketDrawer
                ticket={openTicket}
                onClose={() => setOpenTicket(null)}
                onUpdate={(t) => {
                  setTickets((prev) => prev.map((p) => (p.id === t.id ? t : p)));
                  setOpenTicket(t);
                }}
              />
            )}
          </SheetContent>
        </Sheet>

        {/* new ticket */}
        <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create new ticket</DialogTitle>
              <DialogDescription>
                Tickets are routed automatically based on category & priority.
              </DialogDescription>
            </DialogHeader>
            <NewTicketForm
              onSubmit={() => {
                setNewTicketOpen(false);
                toast.success("Ticket created — routed to Support queue");
              }}
            />
          </DialogContent>
        </Dialog>

        {/* notifications */}
        <Sheet open={notifOpen} onOpenChange={setNotifOpen}>
          <SheetContent className="w-[400px] sm:max-w-[400px]">
            <NotificationCenter />
          </SheetContent>
        </Sheet>

        {/* shortcuts */}
        <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Keyboard Shortcuts</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              {[
                ["/", "Focus search"],
                ["N", "New ticket"],
                ["G", "Go to analytics"],
                ["?", "This dialog"],
                ["Esc", "Close drawer / clear filters"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between rounded border border-border bg-muted/30 px-3 py-2"
                >
                  <span>{v}</span>
                  <kbd className="rounded border border-border bg-background px-2 py-0.5 text-xs font-semibold">
                    {k}
                  </kbd>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}

// ───────────────────────── client status card ─────────────────────────

function ClientStatusCard() {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/[0.03] p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="size-14 ring-2 ring-vip/40 ring-offset-2 ring-offset-card">
              <AvatarFallback className="bg-gradient-to-br from-primary to-[oklch(0.6_0.2_290)] text-base font-semibold text-primary-foreground">
                AC
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-vip text-vip-foreground ring-2 ring-card">
              <Crown className="size-2.5" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">Alex Chen</h1>
              <Badge variant="outline" className="border-vip/40 bg-vip/10 text-vip">
                VIP Tier 2
              </Badge>
              <Badge variant="outline" className="border-success/40 bg-success/10 text-success">
                Verified
              </Badge>
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>CL-50012</span>
              <span>·</span>
              <span>alex.chen@mail.com</span>
              <span>·</span>
              <span>🇸🇬 Singapore</span>
              <span>·</span>
              <span>Joined Jan 2023</span>
              <span>·</span>
              <span>LTV $42,180</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" className="gap-1.5">
            <Eye className="size-3.5" /> Client Profile
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Wallet className="size-3.5" /> Trading Accounts
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <FileText className="size-3.5" /> KYC
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Building2 className="size-3.5" /> Affiliate
          </Button>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── filters bar ─────────────────────────

function FiltersBar({
  filters,
  setFilters,
  onExport,
}: {
  filters: any;
  setFilters: any;
  onExport: (f: "CSV" | "Excel" | "PDF") => void;
}) {
  const Sel = ({
    label,
    value,
    options,
    onChange,
  }: {
    label: string;
    value?: string;
    options: string[];
    onChange: (v: string | undefined) => void;
  }) => (
    <Select value={value ?? "__all"} onValueChange={(v) => onChange(v === "__all" ? undefined : v)}>
      <SelectTrigger className="h-9 w-auto min-w-[130px] gap-2 text-sm">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__all">All {label}</SelectItem>
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2">
      <Filter className="ml-1.5 size-4 text-muted-foreground" />
      <Sel
        label="Status"
        value={filters.status}
        options={["open", "in_progress", "waiting_client", "escalated", "resolved", "closed"]}
        onChange={(v) => setFilters({ ...filters, status: v })}
      />
      <Sel
        label="Priority"
        value={filters.priority}
        options={["low", "medium", "high", "critical"]}
        onChange={(v) => setFilters({ ...filters, priority: v })}
      />
      <Sel
        label="Category"
        value={filters.category}
        options={[
          "Deposit",
          "Withdrawal",
          "KYC",
          "AML",
          "Trading Platform",
          "Account",
          "Bonus",
          "Copy Trading",
          "IB / Affiliate",
          "Technical",
          "Compliance",
        ]}
        onChange={(v) => setFilters({ ...filters, category: v })}
      />
      <Sel
        label="Department"
        value={filters.department}
        options={["Support", "Compliance", "Finance", "Risk", "Technical", "Dealing"]}
        onChange={(v) => setFilters({ ...filters, department: v })}
      />
      <Sel
        label="Agent"
        value={filters.agent}
        options={AGENT_LIST.map((a) => a.name)}
        onChange={(v) => setFilters({ ...filters, agent: v })}
      />
      <Sel
        label="Country"
        value={filters.country}
        options={["AE", "GB", "DE", "SG", "AU", "ZA", "BR", "JP", "CA", "FR"]}
        onChange={(v) => setFilters({ ...filters, country: v })}
      />
      <div className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs">
        <Switch
          checked={!!filters.vipOnly}
          onCheckedChange={(c) => setFilters({ ...filters, vipOnly: c })}
        />{" "}
        VIP
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs">
        <Switch
          checked={!!filters.slaBreached}
          onCheckedChange={(c) => setFilters({ ...filters, slaBreached: c })}
        />{" "}
        SLA Breach
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs">
        <Switch
          checked={!!filters.compliance}
          onCheckedChange={(c) => setFilters({ ...filters, compliance: c })}
        />{" "}
        Compliance
      </div>
      <div className="ml-auto flex items-center gap-1.5">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Download className="size-3.5" /> Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onExport("CSV")}>Export CSV</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("Excel")}>Export Excel</DropdownMenuItem>
            <DropdownMenuItem onClick={() => onExport("PDF")}>Export PDF</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Settings2 className="size-3.5" /> Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Visible columns</DropdownMenuLabel>
            {[
              "Ticket ID",
              "Subject",
              "Client",
              "Category",
              "Priority",
              "Agent",
              "Status",
              "SLA",
              "Updated",
            ].map((c) => (
              <DropdownMenuItem key={c} onSelect={(e) => e.preventDefault()}>
                <Checkbox defaultChecked className="mr-2" /> {c}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              <PinIcon className="size-3.5" /> Views
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Saved views</DropdownMenuLabel>
            <DropdownMenuItem>My open tickets</DropdownMenuItem>
            <DropdownMenuItem>VIP queue</DropdownMenuItem>
            <DropdownMenuItem>SLA breach watch</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast.success("View saved")}>
              + Save current view
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// ───────────────────────── tickets table ─────────────────────────

function TicketsTable({
  tickets,
  selected,
  setSelected,
  onOpen,
}: {
  tickets: Ticket[];
  selected: string[];
  setSelected: (s: string[]) => void;
  onOpen: (t: Ticket) => void;
}) {
  const allChecked = tickets.length > 0 && selected.length === tickets.length;
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <ScrollArea className="max-h-[640px]">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 bg-muted/60 backdrop-blur">
            <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="w-9 px-3 py-2.5">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(c) => setSelected(c ? tickets.map((t) => t.id) : [])}
                />
              </th>
              <th className="px-2 py-2.5">Ticket</th>
              <th className="px-2 py-2.5">Subject</th>
              <th className="px-2 py-2.5">Client</th>
              <th className="px-2 py-2.5">Category</th>
              <th className="px-2 py-2.5">Priority</th>
              <th className="px-2 py-2.5">Agent</th>
              <th className="px-2 py-2.5">Status</th>
              <th className="px-2 py-2.5">SLA</th>
              <th className="px-2 py-2.5">Updated</th>
              <th className="w-10 px-2 py-2.5"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => {
              const checked = selected.includes(t.id);
              return (
                <tr
                  key={t.id}
                  className={cn(
                    "group cursor-pointer border-t border-border transition-colors hover:bg-accent/40",
                    checked && "bg-primary/5",
                  )}
                  onClick={() => onOpen(t)}
                >
                  <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(c) =>
                        setSelected(c ? [...selected, t.id] : selected.filter((s) => s !== t.id))
                      }
                    />
                  </td>
                  <td className="px-2 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-muted-foreground">{t.id}</span>
                      {t.vip && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Crown className="size-3 text-vip" />
                          </TooltipTrigger>
                          <TooltipContent>VIP</TooltipContent>
                        </Tooltip>
                      )}
                      {t.compliance && (
                        <Tooltip>
                          <TooltipTrigger>
                            <Shield className="size-3 text-info" />
                          </TooltipTrigger>
                          <TooltipContent>Compliance</TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="max-w-[280px] px-2 py-2.5">
                    <div className="truncate font-medium text-foreground">{t.subject}</div>
                    <div className="text-[11px] text-muted-foreground">
                      #{t.source} · {t.department}
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <div className="font-medium">{t.clientName}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {t.country} · {t.accountNumber}
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <span className="rounded bg-muted px-1.5 py-0.5 text-xs">{t.category}</span>
                  </td>
                  <td className="px-2 py-2.5">
                    <PriorityPill p={t.priority} />
                  </td>
                  <td className="px-2 py-2.5">
                    <AgentChip name={t.assignedAgent} />
                  </td>
                  <td className="px-2 py-2.5">
                    <StatusPill status={t.status} />
                  </td>
                  <td className="px-2 py-2.5">
                    <SLAIndicator ticket={t} />
                  </td>
                  <td className="px-2 py-2.5 text-xs text-muted-foreground">
                    {formatRelative(t.updatedAt)}
                  </td>
                  <td className="px-2 py-2.5" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-7">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onOpen(t)}>Open</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Assigned to me")}>
                          Assign to me
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Escalated")}>
                          Escalate
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success("Transferred")}>
                          Transfer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => toast.success("Closed")}
                        >
                          Close
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
            {tickets.length === 0 && (
              <tr>
                <td colSpan={11} className="px-4 py-12 text-center text-sm text-muted-foreground">
                  No tickets match the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ScrollArea>
      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground">
        <span>{tickets.length} tickets · real-time sync active</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-pulse rounded-full bg-success" /> WebSocket connected
        </span>
      </div>
    </div>
  );
}

// ───────────────────────── live chat ─────────────────────────

function LiveChatPanel() {
  const [active, setActive] = useState(CHATS[0]);
  const [draft, setDraft] = useState("");
  return (
    <div className="grid grid-cols-12 gap-3 rounded-xl border border-border bg-card">
      <div className="col-span-4 border-r border-border">
        <div className="border-b border-border p-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Live Sessions
        </div>
        <ScrollArea className="h-[520px]">
          {CHATS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={cn(
                "flex w-full items-center gap-3 border-b border-border px-3 py-2.5 text-left hover:bg-accent/40",
                active.id === c.id && "bg-accent/60",
              )}
            >
              <Avatar className="size-8">
                <AvatarFallback className="text-xs">
                  {c.clientName
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <span className="truncate font-medium text-sm">{c.clientName}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatRelative(c.startedAt)}
                  </span>
                </div>
                <div className="truncate text-xs text-muted-foreground">{c.lastMessage}</div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-[10px]",
                  c.status === "Active"
                    ? "border-success/40 bg-success/10 text-success"
                    : c.status === "Waiting"
                      ? "border-warning/40 bg-warning/10 text-warning"
                      : "",
                )}
              >
                {c.status}
              </Badge>
            </button>
          ))}
        </ScrollArea>
      </div>
      <div className="col-span-8 flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-2">
            <Avatar className="size-9">
              <AvatarFallback>
                {active.clientName
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{active.clientName}</div>
              <div className="text-xs text-muted-foreground">
                Agent: {active.agent} · {active.messages} messages
              </div>
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button size="sm" variant="outline">
              Convert to Ticket
            </Button>
            <Button size="sm" variant="outline">
              Transfer
            </Button>
            <Button size="sm" variant="destructive">
              End Chat
            </Button>
          </div>
        </div>
        <ScrollArea className="h-[400px] flex-1 p-4">
          <div className="space-y-3">
            {[
              { from: "client", t: "Hi, my withdrawal is still pending after 72 hours." },
              {
                from: "agent",
                t: "Hello! Let me check that for you. Could you confirm the transaction ID?",
              },
              { from: "client", t: "Sure, it's TXN-700045 — sent via SWIFT." },
              { from: "system", t: "Compliance auto-check passed ✓" },
              {
                from: "agent",
                t: "Thanks! I see it's been flagged by our bank intermediary. Releasing now.",
              },
            ].map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex gap-2",
                  m.from === "client"
                    ? "flex-row"
                    : m.from === "system"
                      ? "justify-center"
                      : "flex-row-reverse",
                )}
              >
                {m.from !== "system" && (
                  <Avatar className="size-7">
                    <AvatarFallback className="text-[10px]">
                      {m.from === "client" ? "AC" : "SM"}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-3 py-2 text-sm",
                    m.from === "client" && "rounded-tl-sm bg-muted",
                    m.from === "agent" && "rounded-tr-sm bg-primary text-primary-foreground",
                    m.from === "system" && "rounded-md bg-info/10 px-2 py-1 text-xs text-info",
                  )}
                >
                  {m.t}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-border p-3">
          <div className="flex items-end gap-2">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a reply… (Shift+Enter for newline)"
              className="min-h-[44px] resize-none"
            />
            <Button
              onClick={() => {
                setDraft("");
                toast.success("Message sent");
              }}
            >
              Send
            </Button>
          </div>
          <div className="mt-1.5 flex gap-1.5 text-xs text-muted-foreground">
            <Button variant="ghost" size="sm" className="h-6 gap-1">
              <Sparkles className="size-3" /> AI Suggest
            </Button>
            <Button variant="ghost" size="sm" className="h-6">
              Templates
            </Button>
            <Button variant="ghost" size="sm" className="h-6">
              Translate
            </Button>
            <Button variant="ghost" size="sm" className="h-6">
              Attach
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── phone calls ─────────────────────────

function PhoneCallsPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2.5 text-left">Call ID</th>
            <th className="px-2 py-2.5 text-left">Client</th>
            <th className="px-2 py-2.5 text-left">Agent</th>
            <th className="px-2 py-2.5 text-left">Direction</th>
            <th className="px-2 py-2.5 text-left">Duration</th>
            <th className="px-2 py-2.5 text-left">Outcome</th>
            <th className="px-2 py-2.5 text-left">Ticket</th>
            <th className="px-2 py-2.5 text-left">When</th>
            <th className="px-2 py-2.5"></th>
          </tr>
        </thead>
        <tbody>
          {CALLS.map((c) => (
            <tr key={c.id} className="border-t border-border hover:bg-accent/40">
              <td className="px-3 py-2.5 font-mono text-xs">{c.id}</td>
              <td className="px-2 py-2.5">{c.clientName}</td>
              <td className="px-2 py-2.5">
                <AgentChip name={c.agent} />
              </td>
              <td className="px-2 py-2.5">
                <Badge
                  variant="outline"
                  className={
                    c.direction === "Inbound"
                      ? "border-info/40 text-info"
                      : "border-success/40 text-success"
                  }
                >
                  {c.direction}
                </Badge>
              </td>
              <td className="px-2 py-2.5 tabular-nums">
                {Math.floor(c.durationSec / 60)}m {c.durationSec % 60}s
              </td>
              <td className="px-2 py-2.5">
                <Badge variant="outline">{c.outcome}</Badge>
              </td>
              <td className="px-2 py-2.5 font-mono text-xs text-muted-foreground">
                {c.ticketId ?? "—"}
              </td>
              <td className="px-2 py-2.5 text-xs text-muted-foreground">{formatDateTime(c.at)}</td>
              <td className="px-2 py-2.5">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toast.success("Playing recording")}
                >
                  ▶ Play
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────── complaints ─────────────────────────

function ComplaintsPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-3 py-2.5 text-left">ID</th>
            <th className="px-2 py-2.5 text-left">Client</th>
            <th className="px-2 py-2.5 text-left">Category</th>
            <th className="px-2 py-2.5 text-left">Severity</th>
            <th className="px-2 py-2.5 text-left">Status</th>
            <th className="px-2 py-2.5 text-left">Regulator</th>
            <th className="px-2 py-2.5 text-left">Linked Ticket</th>
            <th className="px-2 py-2.5 text-left">Filed</th>
          </tr>
        </thead>
        <tbody>
          {COMPLAINTS.map((c) => (
            <tr key={c.id} className="border-t border-border hover:bg-accent/40">
              <td className="px-3 py-2.5 font-mono text-xs">{c.id}</td>
              <td className="px-2 py-2.5">{c.clientName}</td>
              <td className="px-2 py-2.5">{c.category}</td>
              <td className="px-2 py-2.5">
                <Badge
                  variant="outline"
                  className={
                    c.severity === "Critical"
                      ? "border-destructive/40 text-destructive"
                      : c.severity === "High"
                        ? "border-warning/40 text-warning"
                        : ""
                  }
                >
                  {c.severity}
                </Badge>
              </td>
              <td className="px-2 py-2.5">
                <Badge variant="outline">{c.status}</Badge>
              </td>
              <td className="px-2 py-2.5">{c.regulator ?? "—"}</td>
              <td className="px-2 py-2.5 font-mono text-xs text-muted-foreground">{c.ticketId}</td>
              <td className="px-2 py-2.5 text-xs text-muted-foreground">
                {formatDateTime(c.filedAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────── escalations ─────────────────────────

function EscalationsPanel({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (t: Ticket) => void }) {
  const esc = tickets.filter((t) => t.escalation.active);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        {(["L1", "L2", "L3", "Management"] as const).map((lvl, i) => (
          <div key={lvl} className="rounded-xl border border-border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {lvl}
            </div>
            <div className="mt-1 text-2xl font-semibold tabular-nums">
              {Math.max(1, esc.length - i * 2)}
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              {lvl === "L1"
                ? "Initial review"
                : lvl === "L2"
                  ? "Senior agent"
                  : lvl === "L3"
                    ? "Specialist team"
                    : "Director sign-off"}
            </div>
          </div>
        ))}
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2.5 text-left">Ticket</th>
              <th className="px-2 py-2.5 text-left">Subject</th>
              <th className="px-2 py-2.5 text-left">Level</th>
              <th className="px-2 py-2.5 text-left">Rule</th>
              <th className="px-2 py-2.5 text-left">By</th>
              <th className="px-2 py-2.5 text-left">When</th>
            </tr>
          </thead>
          <tbody>
            {esc.map((t) => (
              <tr
                key={t.id}
                className="cursor-pointer border-t border-border hover:bg-accent/40"
                onClick={() => onOpen(t)}
              >
                <td className="px-3 py-2.5 font-mono text-xs">{t.id}</td>
                <td className="px-2 py-2.5">{t.subject}</td>
                <td className="px-2 py-2.5">
                  <Badge variant="outline" className="border-destructive/40 text-destructive">
                    {t.escalations[0]?.level ?? "L2"}
                  </Badge>
                </td>
                <td className="px-2 py-2.5">{t.escalations[0]?.rule ?? "Manual"}</td>
                <td className="px-2 py-2.5">
                  <AgentChip name={t.assignedAgent} />
                </td>
                <td className="px-2 py-2.5 text-xs text-muted-foreground">
                  {formatRelative(t.updatedAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ───────────────────────── SLA panel ─────────────────────────

function SLAPanel({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (t: Ticket) => void }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
          <tr>
            <th className="px-3 py-2.5 text-left">Ticket</th>
            <th className="px-2 py-2.5 text-left">Client</th>
            <th className="px-2 py-2.5 text-left">First Response</th>
            <th className="px-2 py-2.5 text-left">Resolution</th>
            <th className="px-2 py-2.5 text-left">Breach</th>
            <th className="px-2 py-2.5 text-left">Countdown</th>
          </tr>
        </thead>
        <tbody>
          {tickets.slice(0, 24).map((t) => {
            const pct = t.sla.firstResponseActualMin
              ? Math.min(100, (t.sla.firstResponseActualMin / t.sla.firstResponseTargetMin) * 100)
              : 25;
            return (
              <tr
                key={t.id}
                className="cursor-pointer border-t border-border hover:bg-accent/40"
                onClick={() => onOpen(t)}
              >
                <td className="px-3 py-2.5 font-mono text-xs">{t.id}</td>
                <td className="px-2 py-2.5">{t.clientName}</td>
                <td className="px-2 py-2.5">
                  <div className="flex w-44 items-center gap-2">
                    <Progress
                      value={pct}
                      className={cn(
                        "h-1.5",
                        t.sla.breached
                          ? "[&>div]:bg-destructive"
                          : pct > 80
                            ? "[&>div]:bg-warning"
                            : "[&>div]:bg-success",
                      )}
                    />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {t.sla.firstResponseActualMin ?? "—"}/{t.sla.firstResponseTargetMin}m
                    </span>
                  </div>
                </td>
                <td className="px-2 py-2.5 text-xs text-muted-foreground">
                  {t.sla.resolutionActualH ?? "—"}/{t.sla.resolutionTargetH}h
                </td>
                <td className="px-2 py-2.5">
                  {t.sla.breached ? (
                    <Badge className="bg-destructive/15 text-destructive">Breached</Badge>
                  ) : (
                    <Badge className="bg-success/15 text-success">On track</Badge>
                  )}
                </td>
                <td className="px-2 py-2.5 font-mono text-xs">
                  {t.sla.breached ? "+02:14:00" : "01:42:18"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ───────────────────────── analytics ─────────────────────────

function AnalyticsPanel({ tickets }: { tickets: Ticket[] }) {
  const [range, setRange] = useState("Monthly");
  const volumeData = Array.from({ length: 12 }, (_, i) => ({
    name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    opened: 40 + ((i * 13) % 35),
    closed: 30 + ((i * 11) % 30),
    escalated: 5 + (i % 7),
  }));
  const catData = [...new Set(tickets.map((t) => t.category))].map((c) => ({
    name: c,
    value: tickets.filter((t) => t.category === c).length,
  }));
  const resData = Array.from({ length: 7 }, (_, i) => ({
    name: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    avg: 8 + ((i * 3) % 14),
    first: 18 + ((i * 5) % 20),
  }));
  const agentData = AGENT_LIST.map((a) => ({
    name: a.name.split(" ")[0],
    handled: 20 + (a.id.charCodeAt(1) % 25),
    csat: 4.2 + (a.id.charCodeAt(1) % 7) / 10,
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Performance & Trends</h3>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="h-9 w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Daily", "Weekly", "Monthly", "Quarterly", "Yearly"].map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <ChartCard title="Ticket Volume" subtitle="Opened vs closed vs escalated">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={volumeData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[0]} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={CHART_COLORS[1]} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={CHART_COLORS[1]} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <RTooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Area type="monotone" dataKey="opened" stroke={CHART_COLORS[0]} fill="url(#g1)" />
              <Area type="monotone" dataKey="closed" stroke={CHART_COLORS[1]} fill="url(#g2)" />
              <Line type="monotone" dataKey="escalated" stroke={CHART_COLORS[4]} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Issue Categories" subtitle="Distribution">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={catData}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
              >
                {catData.map((_, i) => (
                  <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                ))}
              </Pie>
              <RTooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Resolution & First Response" subtitle="Hours / minutes by day">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={resData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <RTooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="avg" stroke={CHART_COLORS[0]} strokeWidth={2} />
              <Line type="monotone" dataKey="first" stroke={CHART_COLORS[2]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Agent Performance" subtitle="Tickets handled & CSAT">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={agentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
              <RTooltip
                contentStyle={{
                  background: "var(--color-popover)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="handled" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
              <Bar dataKey="csat" fill={CHART_COLORS[3]} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-muted-foreground">{subtitle}</div>}
        </div>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
          <ArrowUpRight className="size-3" /> Expand
        </Button>
      </div>
      {children}
    </div>
  );
}

// ───────────────────────── satisfaction ─────────────────────────

function SatisfactionPanel({ tickets }: { tickets: Ticket[] }) {
  const withCsat = tickets.filter((t) => t.csat);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-4 gap-3">
        <StatCard label="CSAT" value="4.6 / 5" sub="Last 30 days" tone="text-success" />
        <StatCard label="NPS" value="+62" sub="Promoters - Detractors" tone="text-info" />
        <StatCard
          label="Responses"
          value={withCsat.length}
          sub="With feedback"
          tone="text-foreground"
        />
        <StatCard
          label="Avg Resolution"
          value="14.2h"
          sub="From CSAT respondents"
          tone="text-warning"
        />
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2.5 text-left">Ticket</th>
              <th className="px-2 py-2.5 text-left">Rating</th>
              <th className="px-2 py-2.5 text-left">Agent</th>
              <th className="px-2 py-2.5 text-left">Resolution</th>
              <th className="px-2 py-2.5 text-left">Comment</th>
            </tr>
          </thead>
          <tbody>
            {withCsat.map((t) => (
              <tr key={t.id} className="border-t border-border hover:bg-accent/40">
                <td className="px-3 py-2.5 font-mono text-xs">{t.id}</td>
                <td className="px-2 py-2.5">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "size-3.5",
                          i < (t.csat?.stars ?? 0) ? "fill-vip text-vip" : "text-muted",
                        )}
                      />
                    ))}
                  </div>
                </td>
                <td className="px-2 py-2.5">
                  <AgentChip name={t.csat!.agent} />
                </td>
                <td className="px-2 py-2.5">{t.csat!.resolutionH}h</td>
                <td className="px-2 py-2.5 italic text-muted-foreground">"{t.csat!.comment}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string | number;
  sub: string;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className={cn("mt-1 text-2xl font-semibold tabular-nums", tone)}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}

// ───────────────────────── internal notes ─────────────────────────

function InternalNotesPanel({
  tickets,
  onOpen,
}: {
  tickets: Ticket[];
  onOpen: (t: Ticket) => void;
}) {
  const all = tickets.flatMap((t) => t.notes.map((n) => ({ ...n, ticket: t })));
  return (
    <div className="space-y-3">
      {all.map((n) => (
        <div key={n.id} className="rounded-xl border border-border bg-card p-3">
          <div className="flex items-start gap-3">
            <Avatar className="size-8">
              <AvatarFallback className="text-xs">
                {n.author
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{n.author}</span> ·{" "}
                <span>{formatRelative(n.at)}</span>
                {n.pinned && (
                  <Badge variant="outline" className="gap-1 border-vip/40 text-vip">
                    <PinIcon className="size-2.5" /> Pinned
                  </Badge>
                )}
                <button
                  onClick={() => onOpen(n.ticket)}
                  className="ml-auto font-mono text-xs text-primary hover:underline"
                >
                  {n.ticket.id}
                </button>
              </div>
              <p className="mt-1 text-sm">{n.text}</p>
              {n.mentions?.length ? (
                <div className="mt-1 flex gap-1">
                  {n.mentions.map((m) => (
                    <Badge key={m} variant="outline" className="text-[10px]">
                      {m}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────── timeline panel ─────────────────────────

function TimelinePanel({ tickets, onOpen }: { tickets: Ticket[]; onOpen: (t: Ticket) => void }) {
  const events = tickets
    .flatMap((t) => t.timeline.map((e) => ({ ...e, ticket: t })))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 40);
  const kindIcon: Record<string, React.ComponentType<{ className?: string }>> = {
    created: TicketIcon,
    assigned: Users,
    transferred: ArrowUpRight,
    escalated: Flame,
    client_reply: MessageSquare,
    agent_reply: MessageSquare,
    sla_breach: AlertTriangle,
    resolved: CheckCircle2,
    closed: X,
    note: NotebookPen,
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <ol className="relative ml-3 space-y-3 border-l border-border pl-5">
        {events.map((e) => {
          const I = kindIcon[e.kind] ?? ListTree;
          return (
            <li key={e.id + e.ticket.id} className="relative">
              <span className="absolute -left-[27px] flex size-5 items-center justify-center rounded-full bg-card ring-2 ring-border">
                <I className="size-3 text-muted-foreground" />
              </span>
              <div className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2">
                <div>
                  <div className="text-sm font-medium">
                    {e.label}{" "}
                    <button
                      className="ml-1 font-mono text-xs text-primary hover:underline"
                      onClick={() => onOpen(e.ticket)}
                    >
                      {e.ticket.id}
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {e.by ?? "—"} · {formatDateTime(e.at)}
                  </div>
                </div>
                <Badge variant="outline" className="text-[10px] uppercase">
                  {e.kind.replace("_", " ")}
                </Badge>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ───────────────────────── admin actions ─────────────────────────

function AdminActionsPanel() {
  const [confirmOpen, setConfirmOpen] = useState<null | { title: string; desc: string }>(null);
  const [reason, setReason] = useState("");
  const Section = ({
    title,
    tone,
    actions,
  }: {
    title: string;
    tone: string;
    actions: { label: string; danger?: boolean; danger2?: boolean }[];
  }) => (
    <div className={cn("rounded-xl border p-4", tone)}>
      <h4 className="mb-3 text-sm font-semibold">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {actions.map((a) => (
          <Button
            key={a.label}
            variant={a.danger2 ? "destructive" : a.danger ? "outline" : "outline"}
            className={cn(
              a.danger && !a.danger2 && "border-warning/40 text-warning hover:bg-warning/10",
            )}
            size="sm"
            onClick={() =>
              a.danger2 || a.danger
                ? setConfirmOpen({
                    title: a.label,
                    desc: `${a.label} requires permission + audit. Provide a reason.`,
                  })
                : toast.success(`${a.label} done`)
            }
          >
            {a.label}
          </Button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="space-y-3">
      <Section
        title="Safe Actions"
        tone="border-success/30 bg-success/5"
        actions={[
          { label: "Create Ticket" },
          { label: "Reply" },
          { label: "Assign" },
          { label: "Export" },
          { label: "View Records" },
        ]}
      />
      <Section
        title="Moderate Actions"
        tone="border-warning/30 bg-warning/5"
        actions={[
          { label: "Transfer", danger: true },
          { label: "Escalate", danger: true },
          { label: "Merge Tickets", danger: true },
          { label: "Request Documents", danger: true },
          { label: "Schedule Call", danger: true },
        ]}
      />
      <Section
        title="Dangerous Actions"
        tone="border-destructive/30 bg-destructive/5"
        actions={[
          { label: "Force Close", danger2: true },
          { label: "Override Resolution", danger2: true },
          { label: "Mark Regulatory Complaint", danger2: true },
          { label: "Reopen Ticket", danger2: true },
          { label: "Restrict Ticket Creation", danger2: true },
        ]}
      />
      <div className="rounded-xl border border-border bg-card p-4">
        <h4 className="mb-2 text-sm font-semibold">Permission Matrix</h4>
        <div className="overflow-hidden rounded border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/60 text-xs">
              <tr>
                <th className="px-3 py-2 text-left">Role</th>
                <th className="px-3 py-2">Safe</th>
                <th className="px-3 py-2">Moderate</th>
                <th className="px-3 py-2">Dangerous</th>
                <th className="px-3 py-2">Audit View</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Agent L1", "✓", "—", "—", "—"],
                ["Agent L2", "✓", "✓", "—", "—"],
                ["Team Lead", "✓", "✓", "Partial", "✓"],
                ["Manager", "✓", "✓", "✓", "✓"],
                ["Compliance", "✓", "✓", "✓", "✓"],
              ].map((r) => (
                <tr key={r[0]} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">{r[0]}</td>
                  {r.slice(1).map((c, i) => (
                    <td
                      key={i}
                      className={cn(
                        "px-3 py-2 text-center",
                        c === "✓"
                          ? "text-success"
                          : c === "—"
                            ? "text-muted-foreground"
                            : "text-warning",
                      )}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!confirmOpen} onOpenChange={(o) => !o && setConfirmOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-destructive" /> Confirm: {confirmOpen?.title}
            </DialogTitle>
            <DialogDescription>{confirmOpen?.desc}</DialogDescription>
          </DialogHeader>
          <Textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason (required for audit log)…"
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={!reason.trim()}
              onClick={() => {
                toast.success(`${confirmOpen?.title} executed — logged to audit trail`);
                setConfirmOpen(null);
                setReason("");
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ───────────────────────── audit trail ─────────────────────────

function AuditTrailPanel({ tickets }: { tickets: Ticket[] }) {
  const entries = tickets
    .flatMap((t) => t.audit.map((a) => ({ ...a, ticket: t.id })))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())
    .slice(0, 60);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end">
        <Button
          size="sm"
          variant="outline"
          className="gap-1.5"
          onClick={() => toast.success("Audit log exported")}
        >
          <Download className="size-3.5" /> Export Audit Log
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-3 py-2 text-left">Action</th>
              <th className="px-2 py-2 text-left">By</th>
              <th className="px-2 py-2 text-left">Role</th>
              <th className="px-2 py-2 text-left">IP</th>
              <th className="px-2 py-2 text-left">Before</th>
              <th className="px-2 py-2 text-left">After</th>
              <th className="px-2 py-2 text-left">Reason</th>
              <th className="px-2 py-2 text-left">Ticket</th>
              <th className="px-2 py-2 text-left">When</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((a) => (
              <tr key={a.id + a.ticket} className="border-t border-border hover:bg-accent/40">
                <td className="px-3 py-2 font-mono text-xs text-primary">{a.action}</td>
                <td className="px-2 py-2">{a.by}</td>
                <td className="px-2 py-2 text-xs text-muted-foreground">{a.role}</td>
                <td className="px-2 py-2 font-mono text-xs">{a.ip}</td>
                <td className="px-2 py-2 text-xs text-muted-foreground">{a.before ?? "—"}</td>
                <td className="px-2 py-2 text-xs">{a.after ?? "—"}</td>
                <td className="px-2 py-2 text-xs text-muted-foreground">{a.reason ?? "—"}</td>
                <td className="px-2 py-2 font-mono text-xs">{a.ticket}</td>
                <td className="px-2 py-2 text-xs text-muted-foreground">{formatDateTime(a.at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ───────────────────────── new ticket form ─────────────────────────

function NewTicketForm({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <Input placeholder="Subject" />
      </div>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {[
            "Deposit",
            "Withdrawal",
            "KYC",
            "AML",
            "Trading Platform",
            "Account",
            "Bonus",
            "Copy Trading",
            "IB / Affiliate",
            "Technical",
            "Compliance",
          ].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {["Low", "Medium", "High", "Critical"].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Department" />
        </SelectTrigger>
        <SelectContent>
          {["Support", "Compliance", "Finance", "Risk", "Technical", "Dealing"].map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Assign to" />
        </SelectTrigger>
        <SelectContent>
          {AGENT_LIST.map((a) => (
            <SelectItem key={a.id} value={a.id}>
              {a.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Textarea className="col-span-2 min-h-[120px]" placeholder="Describe the issue…" />
      <DialogFooter className="col-span-2">
        <Button onClick={onSubmit}>Create Ticket</Button>
      </DialogFooter>
    </div>
  );
}

// ───────────────────────── notification center ─────────────────────────

function NotificationCenter() {
  const items = [
    {
      icon: AlertOctagon,
      tone: "text-destructive",
      title: "SLA breach risk",
      desc: "TKT-10248 · 5 min over target",
      time: "2m ago",
    },
    {
      icon: Flame,
      tone: "text-warning",
      title: "Escalated to L2",
      desc: "TKT-10251 by Sarah Mendoza",
      time: "12m ago",
    },
    {
      icon: MessageSquare,
      tone: "text-info",
      title: "New client reply",
      desc: "Alex Chen on TKT-10241",
      time: "20m ago",
    },
    {
      icon: Star,
      tone: "text-vip",
      title: "5-star CSAT",
      desc: "TKT-10238 · resolved in 3h",
      time: "1h ago",
    },
    {
      icon: Shield,
      tone: "text-info",
      title: "Compliance hold",
      desc: "AML review required on TKT-10256",
      time: "2h ago",
    },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border pb-3">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <p className="text-xs text-muted-foreground">Real-time updates · WebSocket connected</p>
      </div>
      <ScrollArea className="flex-1 pt-3">
        <div className="space-y-2">
          {items.map((n, i) => {
            const I = n.icon;
            return (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-card p-3 hover:bg-accent/30"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted",
                    n.tone,
                  )}
                >
                  <I className="size-4" />
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.desc}</div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

// ───────────────────────── full ticket drawer ─────────────────────────

function TicketDrawer({
  ticket,
  onClose,
  onUpdate,
}: {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (t: Ticket) => void;
}) {
  const [tab, setTab] = useState("overview");
  const [reply, setReply] = useState("");
  const [internal, setInternal] = useState(false);

  const sendReply = () => {
    if (!reply.trim()) return;
    const m = {
      id: `m-${Date.now()}`,
      author: "You",
      role: "agent" as const,
      text: reply,
      at: new Date().toISOString(),
      internal,
    };
    onUpdate({ ...ticket, messages: [...ticket.messages, m], lastResponse: m.at, updatedAt: m.at });
    setReply("");
    toast.success(internal ? "Internal note added" : "Reply sent to client");
  };

  return (
    <div className="flex h-full flex-col bg-background">
      {/* drawer header */}
      <div className="border-b border-border bg-card px-5 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-mono">{ticket.id}</span>
              <span>·</span>
              <span>{ticket.category}</span>
              <span>·</span>
              <span>{ticket.department}</span>
              <span>·</span>
              <span>via {ticket.source}</span>
            </div>
            <h2 className="mt-0.5 truncate text-lg font-semibold">{ticket.subject}</h2>
            <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
              <StatusPill status={ticket.status} />
              <PriorityPill p={ticket.priority} />
              {ticket.vip && (
                <Badge variant="outline" className="gap-1 border-vip/40 bg-vip/10 text-vip">
                  <Crown className="size-3" /> VIP
                </Badge>
              )}
              {ticket.compliance && (
                <Badge variant="outline" className="gap-1 border-info/40 bg-info/10 text-info">
                  <Shield className="size-3" /> Compliance
                </Badge>
              )}
              {ticket.sla.breached && (
                <Badge
                  variant="outline"
                  className="gap-1 border-destructive/40 bg-destructive/10 text-destructive"
                >
                  <AlertTriangle className="size-3" /> SLA Breach
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px]">
                Risk: {ticket.riskLevel}
              </Badge>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <Button variant="outline" size="sm" onClick={() => toast.success("Assigned to me")}>
              Assign to me
            </Button>
            <Button variant="outline" size="sm" onClick={() => toast.success("Escalated to L2")}>
              Escalate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate({ ...ticket, status: "resolved" })}
            >
              Resolve
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1">
                  More <ChevronDown className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast.success("Transferred")}>
                  Transfer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Merged")}>Merge</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Call scheduled")}>
                  Schedule Call
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.success("Documents requested")}>
                  Request Documents
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => onUpdate({ ...ticket, status: "closed" })}
                >
                  Force Close
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* drawer body */}
      <div className="flex min-h-0 flex-1">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <Tabs value={tab} onValueChange={setTab} className="h-full">
            <div className="sticky top-0 z-10 border-b border-border bg-background px-5">
              <TabsList className="h-11 flex-nowrap gap-1 overflow-x-auto bg-transparent p-0">
                {[
                  ["overview", "Overview"],
                  ["conversation", "Conversation"],
                  ["ownership", "Ownership History"],
                  ["chat", "Live Chat Logs"],
                  ["phone", "Phone Logs"],
                  ["attachments", "Attachments"],
                  ["related", "Related Records"],
                  ["notes", "Internal Notes"],
                  ["escalations", "Escalations"],
                  ["sla", "SLA"],
                  ["timeline", "Timeline"],
                  ["audit", "Audit"],
                ].map(([v, l]) => (
                  <TabsTrigger
                    key={v}
                    value={v}
                    className="h-11 rounded-none border-b-2 border-transparent bg-transparent px-3 text-sm data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {l}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-5">
              <TabsContent value="overview" className="m-0 space-y-4">
                <div className="grid grid-cols-2 gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-3">
                  {[
                    ["Ticket ID", ticket.id],
                    ["Subject", ticket.subject],
                    ["Category", ticket.category],
                    ["Priority", ticket.priority],
                    ["Status", STATUS_META[ticket.status].label],
                    ["Client", ticket.clientName],
                    ["Client ID", ticket.clientId],
                    ["Email", ticket.clientEmail],
                    ["Account #", ticket.accountNumber],
                    ["Trading Account", ticket.tradingAccount],
                    ["Country", ticket.country],
                    ["Language", ticket.language],
                    ["Created By", ticket.createdBy],
                    ["Created", formatDateTime(ticket.createdAt)],
                    ["Assigned Agent", ticket.assignedAgent],
                    ["Assigned Team", ticket.assignedTeam],
                    ["Current Owner", ticket.currentOwner],
                    ["Last Updated", formatDateTime(ticket.updatedAt)],
                    ["Risk Level", ticket.riskLevel],
                    ["VIP", ticket.vip ? "Yes" : "No"],
                    ["Compliance", ticket.compliance ? "Hold" : "Clear"],
                    ["AML", ticket.amlReview ? "Under Review" : "Clear"],
                  ].map(([k, v]) => (
                    <div key={k as string} className="space-y-0.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {k}
                      </div>
                      <div className="text-sm">{v as string}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="conversation" className="m-0">
                <div className="rounded-xl border border-border bg-card">
                  <ScrollArea className="h-[460px] p-4">
                    <div className="space-y-3">
                      {ticket.messages.map((m) => (
                        <div
                          key={m.id}
                          className={cn(
                            "flex gap-2",
                            m.role === "agent" ? "flex-row-reverse" : "flex-row",
                            m.role === "system" && "justify-center",
                          )}
                        >
                          {m.role !== "system" && (
                            <Avatar className="size-8">
                              <AvatarFallback className="text-[10px]">
                                {m.author
                                  .split(" ")
                                  .map((s) => s[0])
                                  .slice(0, 2)
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={cn(
                              "max-w-[70%] space-y-1",
                              m.role === "system" && "max-w-full",
                            )}
                          >
                            {m.role !== "system" && (
                              <div
                                className={cn(
                                  "flex items-center gap-2 text-[10px] text-muted-foreground",
                                  m.role === "agent" && "justify-end",
                                )}
                              >
                                <span className="font-medium text-foreground">{m.author}</span>
                                <span>·</span>
                                <span>{formatRelative(m.at)}</span>
                                {m.internal && (
                                  <Badge
                                    variant="outline"
                                    className="border-warning/40 bg-warning/10 text-[9px] text-warning"
                                  >
                                    Internal
                                  </Badge>
                                )}
                              </div>
                            )}
                            <div
                              className={cn(
                                "rounded-2xl px-3 py-2 text-sm",
                                m.role === "client" && "rounded-tl-sm bg-muted",
                                m.role === "agent" &&
                                  !m.internal &&
                                  "rounded-tr-sm bg-primary text-primary-foreground",
                                m.role === "agent" &&
                                  m.internal &&
                                  "rounded-tr-sm border border-warning/40 bg-warning/10",
                                m.role === "system" &&
                                  "mx-auto inline-block rounded-md bg-info/10 px-2 py-1 text-xs text-info",
                                m.role === "bot" && "bg-accent",
                              )}
                            >
                              {m.text}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <div className="border-t border-border p-3">
                    <Textarea
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      placeholder={
                        internal ? "Internal note (not visible to client)…" : "Reply to client…"
                      }
                      className="min-h-[88px] resize-none"
                    />
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                          <Sparkles className="size-3" /> AI Suggest
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Templates
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Translate
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          @Mention
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs">
                          Attach
                        </Button>
                        <div className="ml-2 flex items-center gap-1.5 text-xs">
                          <Switch checked={internal} onCheckedChange={setInternal} /> Internal
                        </div>
                      </div>
                      <Button size="sm" onClick={sendReply}>
                        {internal ? "Add Note" : "Send Reply"}
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ownership" className="m-0">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left">Action</th>
                        <th className="px-2 py-2 text-left">From</th>
                        <th className="px-2 py-2 text-left">To</th>
                        <th className="px-2 py-2 text-left">By</th>
                        <th className="px-2 py-2 text-left">Reason</th>
                        <th className="px-2 py-2 text-left">When</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticket.ownership.map((o) => (
                        <tr key={o.id} className="border-t border-border">
                          <td className="px-3 py-2 font-medium">{o.action}</td>
                          <td className="px-2 py-2">{o.from ?? "—"}</td>
                          <td className="px-2 py-2">{o.to ?? "—"}</td>
                          <td className="px-2 py-2">{o.by}</td>
                          <td className="px-2 py-2 text-xs text-muted-foreground">
                            {o.reason ?? "—"}
                          </td>
                          <td className="px-2 py-2 text-xs text-muted-foreground">
                            {formatDateTime(o.at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="chat" className="m-0">
                <EmptyOrList
                  label="Live chat logs linked to this ticket"
                  items={[
                    { a: "Client", t: "Hi — need help with my withdrawal." },
                    { a: "Agent", t: "Looking into it now." },
                  ]}
                />
              </TabsContent>
              <TabsContent value="phone" className="m-0">
                <div className="rounded-xl border border-border bg-card p-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="size-4 text-info" />
                    <span>Inbound · 04:12</span>
                    <span className="text-muted-foreground">
                      · Agent Sarah Mendoza · {formatDateTime(ticket.updatedAt)}
                    </span>
                  </div>
                  <Button size="sm" variant="ghost" className="mt-2">
                    ▶ Play recording
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="m-0">
                <div className="rounded-xl border border-border bg-card">
                  <div className="flex items-center justify-between border-b border-border p-3">
                    <h4 className="text-sm font-semibold">
                      Attachments ({ticket.attachments.length})
                    </h4>
                    <Button size="sm" variant="outline">
                      Upload New
                    </Button>
                  </div>
                  <div className="divide-y divide-border">
                    {ticket.attachments.map((a) => (
                      <div key={a.id} className="flex items-center gap-3 p-3">
                        <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-[10px] font-semibold uppercase">
                          {a.type}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-sm font-medium">{a.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {a.size} · {a.uploadedBy} · {formatRelative(a.uploadedAt)} · v
                            {a.versions}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            a.virusScan === "clean"
                              ? "border-success/40 text-success"
                              : a.virusScan === "scanning"
                                ? "border-warning/40 text-warning"
                                : "border-destructive/40 text-destructive"
                          }
                        >
                          {a.virusScan}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          Preview
                        </Button>
                        <Button size="sm" variant="ghost">
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <History className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="related" className="m-0">
                <div className="grid grid-cols-2 gap-2">
                  {ticket.related.map((r) => (
                    <button
                      key={r.id}
                      className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 text-left hover:border-primary/40"
                      onClick={() => toast.info(`Opening ${r.type}: ${r.label}`)}
                    >
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {r.type}
                        </div>
                        <div className="text-sm font-medium">{r.label}</div>
                        {r.meta && <div className="text-xs text-muted-foreground">{r.meta}</div>}
                      </div>
                      <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary" />
                    </button>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notes" className="m-0 space-y-2">
                {ticket.notes.map((n) => (
                  <div key={n.id} className="rounded-xl border border-border bg-card p-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{n.author}</span> ·{" "}
                      {formatRelative(n.at)}
                      {n.pinned && (
                        <Badge variant="outline" className="ml-1 gap-1 border-vip/40 text-vip">
                          <PinIcon className="size-2.5" /> Pinned
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-sm">{n.text}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-border bg-card p-3">
                  <Textarea
                    placeholder="Add internal note… (staff only)"
                    className="min-h-[70px]"
                  />
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={() => toast.success("Note added")}>
                      Pin note
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="escalations" className="m-0">
                {ticket.escalations.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
                    No active escalations.{" "}
                    <Button
                      variant="link"
                      className="px-1"
                      onClick={() => toast.success("Escalated to L2")}
                    >
                      Escalate now →
                    </Button>
                  </div>
                ) : (
                  ticket.escalations.map((e) => (
                    <div
                      key={e.id}
                      className="rounded-xl border border-destructive/30 bg-destructive/5 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Escalated to {e.level}</div>
                        <Badge variant="outline">{e.status}</Badge>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        By {e.by} · Rule: {e.rule} · {formatDateTime(e.at)}
                      </div>
                      <div className="mt-1 text-sm">Reason: {e.reason}</div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="sla" className="m-0">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <SLABlock
                      label="First Response Target"
                      value={`${ticket.sla.firstResponseTargetMin} min`}
                    />
                    <SLABlock
                      label="First Response Actual"
                      value={
                        ticket.sla.firstResponseActualMin
                          ? `${ticket.sla.firstResponseActualMin} min`
                          : "—"
                      }
                    />
                    <SLABlock
                      label="Resolution Target"
                      value={`${ticket.sla.resolutionTargetH}h`}
                    />
                    <SLABlock
                      label="Resolution Actual"
                      value={
                        ticket.sla.resolutionActualH ? `${ticket.sla.resolutionActualH}h` : "—"
                      }
                    />
                  </div>
                  <div className="rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-semibold">First Response Progress</div>
                      <div className="font-mono text-sm">
                        {ticket.sla.breached ? "+02:14:00" : "01:42:18 remaining"}
                      </div>
                    </div>
                    <Progress
                      value={
                        ticket.sla.firstResponseActualMin
                          ? Math.min(
                              100,
                              (ticket.sla.firstResponseActualMin /
                                ticket.sla.firstResponseTargetMin) *
                                100,
                            )
                          : 30
                      }
                      className={cn(
                        "h-2",
                        ticket.sla.breached ? "[&>div]:bg-destructive" : "[&>div]:bg-success",
                      )}
                    />
                  </div>
                  {ticket.sla.breached && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm">
                      <div className="font-semibold text-destructive">Breach reason</div>
                      <div className="text-muted-foreground">{ticket.sla.breachReason}</div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="m-0">
                <ol className="relative ml-3 space-y-3 border-l border-border pl-5">
                  {ticket.timeline.map((e) => (
                    <li key={e.id} className="relative">
                      <span className="absolute -left-[27px] flex size-5 items-center justify-center rounded-full bg-card ring-2 ring-border">
                        <span className="size-1.5 rounded-full bg-primary" />
                      </span>
                      <div className="rounded-lg border border-border bg-background/40 px-3 py-2">
                        <div className="text-sm font-medium">{e.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {e.by ?? "—"} · {formatDateTime(e.at)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </TabsContent>

              <TabsContent value="audit" className="m-0">
                <div className="overflow-hidden rounded-xl border border-border bg-card">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/60 text-xs uppercase text-muted-foreground">
                      <tr>
                        <th className="px-3 py-2 text-left">Action</th>
                        <th className="px-2 py-2 text-left">By</th>
                        <th className="px-2 py-2 text-left">Role</th>
                        <th className="px-2 py-2 text-left">IP</th>
                        <th className="px-2 py-2 text-left">Before</th>
                        <th className="px-2 py-2 text-left">After</th>
                        <th className="px-2 py-2 text-left">When</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ticket.audit.map((a) => (
                        <tr key={a.id} className="border-t border-border">
                          <td className="px-3 py-2 font-mono text-xs text-primary">{a.action}</td>
                          <td className="px-2 py-2">{a.by}</td>
                          <td className="px-2 py-2 text-xs text-muted-foreground">{a.role}</td>
                          <td className="px-2 py-2 font-mono text-xs">{a.ip}</td>
                          <td className="px-2 py-2 text-xs text-muted-foreground">
                            {a.before ?? "—"}
                          </td>
                          <td className="px-2 py-2 text-xs">{a.after ?? "—"}</td>
                          <td className="px-2 py-2 text-xs text-muted-foreground">
                            {formatDateTime(a.at)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* right sidebar */}
        <aside className="hidden w-80 shrink-0 border-l border-border bg-card/60 p-4 lg:block">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Client
          </h4>
          <div className="rounded-lg border border-border bg-card p-3">
            <div className="flex items-center gap-2">
              <Avatar className="size-9">
                <AvatarFallback>
                  {ticket.clientName
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{ticket.clientName}</div>
                <div className="text-xs text-muted-foreground">{ticket.clientEmail}</div>
              </div>
            </div>
            <Separator className="my-3" />
            <dl className="space-y-1.5 text-xs">
              <Row k="Client ID" v={ticket.clientId} />
              <Row k="Account" v={ticket.accountNumber} />
              <Row k="Trading" v={ticket.tradingAccount} />
              <Row k="Country" v={ticket.country} />
              <Row k="Language" v={ticket.language} />
              <Row k="VIP" v={ticket.vip ? "Yes" : "No"} />
              <Row k="Risk" v={ticket.riskLevel} />
            </dl>
          </div>
          <h4 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Assignment
          </h4>
          <div className="rounded-lg border border-border bg-card p-3 text-xs">
            <Row k="Agent" v={ticket.assignedAgent} />
            <Row k="Team" v={ticket.assignedTeam} />
            <Row k="Owner" v={ticket.currentOwner} />
            <Row k="Department" v={ticket.department} />
          </div>
          <h4 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Quick Actions
          </h4>
          <div className="grid grid-cols-2 gap-1.5">
            {["Reply", "Internal Note", "Escalate", "Transfer", "Resolve", "Schedule Call"].map(
              (a) => (
                <Button
                  key={a}
                  variant="outline"
                  size="sm"
                  onClick={() => toast.success(a)}
                  className="h-8 text-xs"
                >
                  {a}
                </Button>
              ),
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium">{v}</dd>
    </div>
  );
}
function SLABlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}
function EmptyOrList({ label, items }: { label: string; items: { a: string; t: string }[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="space-y-2">
        {items.map((m, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <Avatar className="size-6">
              <AvatarFallback className="text-[10px]">{m.a[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-xs font-medium">{m.a}</div>
              <div className="text-sm">{m.t}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
