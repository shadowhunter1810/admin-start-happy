import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { client, lifecycleStages, currentStageIndex } from "@/lib/mock";
import { notify } from "@/lib/actions";
import { RowClickWrapper } from "@/components/client/RowClickWrapper";
import {
  Activity,
  Bell,
  CircleDollarSign,
  Search,
  Shield,
  Sparkles,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  BadgeCheck,
} from "lucide-react";

const TABS = [
  { to: "/", label: "Overview", exact: true },
  { to: "/wallet", label: "Wallet" },
  { to: "/financial", label: "Financial" },
  { to: "/trading", label: "Trading" },
  { to: "/history", label: "History" },
  { to: "/copy-trading", label: "Copy Trading" },
  { to: "/kyc", label: "KYC" },
  { to: "/support", label: "Support" },
  { to: "/activity", label: "Activity" },
  { to: "/ib", label: "IB Partner" },
  { to: "/referrals", label: "Referrals" },
  { to: "/commissions", label: "Commissions" },
  { to: "/analytics", label: "Analytics" },
  { to: "/risk", label: "Risk" },
  { to: "/security", label: "Security" },
  { to: "/permissions", label: "Permissions" },
  { to: "/marketing", label: "Marketing" },
  { to: "/comms", label: "Comms" },
  { to: "/notes", label: "Notes" },
  { to: "/audit-trail", label: "Audit Trail" },
  { to: "/settings", label: "Settings" },
] as const;

export function ClientShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const ctx =
    (TABS as readonly { to: string; label: string; exact?: boolean }[]).find(
      (t) => (t.exact ? pathname === t.to : pathname.startsWith(t.to)),
    )?.label ?? "Detail";

  return (
    <div className="min-h-screen text-foreground">
      <TopBar />
      <main className="mx-auto max-w-[1480px] px-6 pb-16 pt-6">
        <Breadcrumbs />
        <ClientHeader />
        <TabBar pathname={pathname} />
        <div className="mt-6">
          <RowClickWrapper context={ctx}>{children}</RowClickWrapper>
        </div>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[1480px] items-center gap-4 px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Atlas CRM</span>
          <span className="ml-1 rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            Enterprise
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-1 text-xs text-muted-foreground md:flex">
          {["Dashboard", "Clients", "IBs", "Compliance", "Treasury", "Reports"].map((n) => (
            <button
              key={n}
              className="rounded-md px-2.5 py-1.5 hover:bg-muted hover:text-foreground"
            >
              {n}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search client, txn, ticket…"
              className="h-8 w-72 rounded-md border border-border bg-surface pl-8 pr-3 text-xs outline-none placeholder:text-muted-foreground/70 focus:border-ring"
            />
          </div>
          <button className="relative grid h-8 w-8 place-items-center rounded-md border border-border bg-surface text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-2 py-1">
            <div className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-chart-4 text-[10px] font-semibold text-primary-foreground">
              PN
            </div>
            <span className="text-xs font-medium">Priya N.</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Breadcrumbs() {
  return (
    <div className="mb-3 flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>Clients</span>
      <ChevronRight className="h-3 w-3" />
      <span>Gold IB Partners</span>
      <ChevronRight className="h-3 w-3" />
      <span className="text-foreground">{client.name}</span>
    </div>
  );
}

function ClientHeader() {
  return (
    <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-surface to-surface-2/60 p-5">
      <div className="flex flex-wrap items-start gap-5">
        <div className="relative">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary via-chart-4 to-chart-2 text-xl font-semibold text-primary-foreground shadow-lg shadow-primary/20">
            AR
          </div>
          <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-success ring-4 ring-background">
            <BadgeCheck className="h-3.5 w-3.5 text-success-foreground" />
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">{client.name}</h1>
            <Pill tone="warning">{client.tier}</Pill>
            <Pill tone="info">{client.segment}</Pill>
            <Pill tone="success">{client.status}</Pill>
            <Pill tone="muted">{client.id}</Pill>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{client.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{client.phone}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{client.city}, {client.country}</span>
            <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />{client.regulator}</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="h-3.5 w-3.5" />Last trade {client.lastTrade}</span>
          </div>

          {/* Lifecycle progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
              <span>Lifecycle</span>
              <span>Retention {client.retentionScore}/100 · Low churn risk</span>
            </div>
            <div className="mt-2 flex items-center">
              {lifecycleStages.map((s, i) => {
                const reached = i <= currentStageIndex;
                return (
                  <div key={s} className="flex flex-1 items-center last:flex-none">
                    <div
                      className={`grid h-7 min-w-7 place-items-center rounded-full px-2 text-[11px] font-medium ${
                        i === currentStageIndex
                          ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                          : reached
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {s}
                    </div>
                    {i < lifecycleStages.length - 1 && (
                      <div
                        className={`mx-1 h-px flex-1 ${
                          i < currentStageIndex ? "bg-primary/50" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <ActionBtn icon={<CircleDollarSign className="h-3.5 w-3.5" />} onClick={() => notify("Withdrawal approved", "TXN-8819934 · $500 released to client bank.", "success")}>Approve W/D</ActionBtn>
            <ActionBtn onClick={() => notify("Email drafted", "Compose window opened for arjun.r@protonmail.com")}>Send email</ActionBtn>
            <ActionBtn onClick={() => notify("Note added", "Empty note pinned to client timeline.", "success")}>Add note</ActionBtn>
          </div>
          <div className="flex gap-2">
            <ActionBtn tone="destructive" onClick={() => notify("Trading frozen", "All MT4/MT5 accounts disabled for this client.", "danger")}>Freeze trading</ActionBtn>
            <ActionBtn onClick={() => notify("Manager assignment", "Reassign dialog opened.")}>Assign mgr</ActionBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabBar({ pathname }: { pathname: string }) {
  return (
    <div className="mt-5 border-b border-border/70">
      <nav className="flex gap-1 overflow-x-auto">
        {TABS.map((t) => {
          const tt = t as { to: string; label: string; exact?: boolean };
          const active = tt.exact ? pathname === tt.to : pathname.startsWith(tt.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

function ActionBtn({
  children,
  icon,
  tone = "default",
  onClick,
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "default" | "destructive";
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        tone === "destructive"
          ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "border-border bg-surface hover:bg-surface-2"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

export function Pill({
  children,
  tone = "muted",
}: {
  children: ReactNode;
  tone?: "muted" | "success" | "warning" | "destructive" | "info" | "primary";
}) {
  const toneCls = {
    muted: "bg-muted text-muted-foreground border-border",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    destructive: "bg-destructive/15 text-destructive border-destructive/30",
    info: "bg-info/15 text-info border-info/30",
    primary: "bg-primary/15 text-primary border-primary/30",
  }[tone];
  return (
    <span
      className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${toneCls}`}
    >
      {children}
    </span>
  );
}
