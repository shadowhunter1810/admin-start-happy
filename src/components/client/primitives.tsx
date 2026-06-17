import type { ReactNode } from "react";
import { Pill } from "./ClientShell";

export function Section({
  title,
  icon,
  right,
  children,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-border/70 bg-card/80 backdrop-blur-sm ${className}`}
    >
      <header className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          {icon && <span className="text-muted-foreground">{icon}</span>}
          <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground/90">
            {title}
          </h2>
        </div>
        {right}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function KPI({
  label,
  value,
  sub,
  tone = "default",
  icon,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "default" | "success" | "warning" | "destructive" | "info";
  icon?: ReactNode;
}) {
  const accent = {
    default: "from-primary/0 to-primary/0",
    success: "from-success/20 to-transparent",
    warning: "from-warning/20 to-transparent",
    destructive: "from-destructive/20 to-transparent",
    info: "from-info/20 to-transparent",
  }[tone];
  const valColor = {
    default: "text-foreground",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    info: "text-info",
  }[tone];
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/80 p-4 transition-colors hover:border-border">
      <div className={`pointer-events-none absolute inset-x-0 -top-12 h-24 bg-gradient-to-b ${accent}`} />
      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {icon && <span className="text-muted-foreground/80">{icon}</span>}
      </div>
      <div className={`relative mt-2 text-2xl font-semibold tracking-tight num ${valColor}`}>
        {value}
      </div>
      {sub && <div className="relative mt-1 text-[11px] text-muted-foreground">{sub}</div>}
    </div>
  );
}

export function Row({
  label,
  value,
  badge,
}: {
  label: string;
  value: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/40 py-2 last:border-b-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 text-right text-xs font-medium num">
        {badge}
        <span>{value}</span>
      </div>
    </div>
  );
}

export function Bar({ value, tone = "primary" }: { value: number; tone?: "primary" | "success" | "warning" | "destructive" }) {
  const cls = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <div className={`h-full rounded-full ${cls}`} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}

export function Progress({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
  return (
    <div className="py-1.5">
      <div className="mb-1 flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium num">{value}%</span>
      </div>
      <Bar value={value} tone={tone} />
    </div>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">{children}</table>
    </div>
  );
}

export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <th
      className={`whitespace-nowrap border-b border-border/60 px-3 py-2 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <td className={`whitespace-nowrap border-b border-border/30 px-3 py-2.5 num ${className}`}>
      {children}
    </td>
  );
}

export { Pill };

export function RiskDot({ level }: { level: "Low" | "Medium" | "High" | "V. High" | "Very High" }) {
  const map: Record<string, string> = {
    Low: "bg-success",
    Medium: "bg-warning",
    High: "bg-destructive",
    "V. High": "bg-destructive",
    "Very High": "bg-destructive",
  };
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${map[level]}`} />
      <span>{level}</span>
    </span>
  );
}
