import type { ReactNode } from "react";
import { Pill } from "./ClientShell";
import { cn } from "@/lib/utils";

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
      <div
        className={`pointer-events-none absolute inset-x-0 -top-12 h-24 bg-gradient-to-b ${accent}`}
      />
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

export function Bar({
  value,
  tone = "primary",
}: {
  value: number;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
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

type Tone = "success" | "info" | "warning" | "critical" | "neutral" | "primary";

const toneClasses: Record<Tone, string> = {
  success: "bg-success/15 text-success border-success/30",
  info: "bg-info/15 text-info border-info/30",
  warning: "bg-warning/15 text-warning border-warning/30",
  critical: "bg-critical/15 text-critical border-critical/40",
  neutral: "bg-muted text-muted-foreground border-border",
  primary: "bg-primary/15 text-primary border-primary/30",
};

export function StatusPill({
  children,
  tone = "neutral",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Dot({ tone = "neutral" }: { tone?: Tone }) {
  const map: Record<Tone, string> = {
    success: "bg-success",
    info: "bg-info",
    warning: "bg-warning",
    critical: "bg-critical",
    neutral: "bg-muted-foreground",
    primary: "bg-primary",
  };
  return (
    <span className="relative inline-flex h-2 w-2">
      <span className={cn("absolute inset-0 rounded-full opacity-60 animate-ping", map[tone])} />
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", map[tone])} />
    </span>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card/60 backdrop-blur-sm shadow-[0_1px_0_0_color-mix(in_oklab,var(--color-foreground)_5%,transparent)]",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 border-b border-border/60 px-5 py-4">
        <div>
          <h3 className="font-display text-base font-semibold tracking-tight">{title}</h3>
          {description ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </header>
      <div className="p-5">{children}</div>
    </section>
  );
}

export function MonoText({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[0.78rem]", className)}>{children}</span>;
}

export function Empty({ title = "Nothing here yet", hint }: { title?: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-8 text-center">
      <p className="font-display text-sm font-semibold">{title}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
