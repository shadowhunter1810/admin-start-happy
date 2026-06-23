import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/audit-trail")({
  head: () => ({
    meta: [
      { title: "Audit Trail · Atlas CRM" },
      { name: "description", content: "Master audit log — who, what, when, why, before/after, evidence and approval for every action." },
    ],
  }),
  component: () => (
    <ClientShell>
      <AuditTrailPage />
    </ClientShell>
  ),
});

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

type Tone = "neutral" | "info" | "success" | "warn" | "danger" | "violet";

const toneMap: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  info: "bg-sky-50 text-sky-700 ring-sky-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warn: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-rose-50 text-rose-700 ring-rose-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
};

function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${toneMap[tone]}`}>
      {children}
    </span>
  );
}

function Section({ id, title, subtitle, right, children }: { id?: string; title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
        </div>
        {right}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

function Kpi({ label, value, tone = "neutral", hint }: { label: string; value: string | number; tone?: Tone; hint?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-lg font-semibold text-slate-900">{value}</div>
        {hint && <Pill tone={tone}>{hint}</Pill>}
      </div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-1.5 text-sm last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium text-slate-900">{v}</span>
    </div>
  );
}

function Btn({ children, onClick, tone = "neutral" }: { children: React.ReactNode; onClick?: () => void; tone?: Tone }) {
  const t: Record<Tone, string> = {
    neutral: "bg-white text-slate-700 ring-slate-200 hover:bg-slate-50",
    info: "bg-sky-50 text-sky-700 ring-sky-200 hover:bg-sky-100",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100",
    warn: "bg-amber-50 text-amber-700 ring-amber-200 hover:bg-amber-100",
    danger: "bg-rose-50 text-rose-700 ring-rose-200 hover:bg-rose-100",
    violet: "bg-violet-50 text-violet-700 ring-violet-200 hover:bg-violet-100",
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium ring-1 transition ${t[tone]}`}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Sections list                                                       */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { k: "summary", label: "Audit Summary" },
  { k: "all", label: "All Audit Events" },
  { k: "financial", label: "Financial Audit" },
  { k: "trading", label: "Trading Audit" },
  { k: "risk", label: "Risk Audit" },
  { k: "compliance", label: "Compliance Audit" },
  { k: "security", label: "Security Audit" },
  { k: "permission", label: "Permission Audit" },
  { k: "ib", label: "IB / Partner Audit" },
  { k: "support", label: "Support Audit" },
  { k: "communication", label: "Communication Audit" },
  { k: "marketing", label: "Marketing Audit" },
  { k: "automation", label: "System Automation" },
  { k: "api", label: "API Audit" },
  { k: "approval", label: "Approval Workflow" },
  { k: "failed", label: "Failed Actions" },
  { k: "timeline", label: "Timeline View" },
  { k: "filters", label: "Filters & Search" },
  { k: "export", label: "Export Center" },
  { k: "actions", label: "Admin Actions" },
  { k: "config", label: "Audit Configuration" },
] as const;
type SK = typeof SECTIONS[number]["k"];

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type AuditEvent = {
  id: string; date: string; category: string; action: string; by: string; role: string;
  source: string; severity: Tone; severityLabel: string; status: string; statusTone: Tone;
  before?: string; after?: string; reason?: string; ip?: string; device?: string; ref?: string;
};

const EVENTS: AuditEvent[] = [
  { id: "AUD-88291", date: "18 Jun 2026 10:20", category: "Financial", action: "Withdrawal Approved", by: "Finance Admin", role: "Finance Manager", source: "Admin Panel", severity: "warn", severityLabel: "Medium", status: "Completed", statusTone: "success", before: "Pending", after: "Approved", reason: "Verified bank match", ip: "103.21.44.10", device: "Windows · Chrome", ref: "TXN-8821" },
  { id: "AUD-88290", date: "18 Jun 2026 10:11", category: "Risk", action: "Risk Score Updated", by: "Risk Engine", role: "Automation", source: "Automation", severity: "danger", severityLabel: "High", status: "Completed", statusTone: "success", before: "55", after: "85", reason: "Multiple high leverage trades", ip: "-", device: "System", ref: "CLT-2210" },
  { id: "AUD-88289", date: "18 Jun 2026 09:58", category: "Compliance", action: "KYC Approved", by: "Compliance Officer", role: "Compliance", source: "Admin Panel", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", before: "Pending", after: "Approved", reason: "Passport + Utility Bill", ip: "103.21.44.12", device: "macOS · Safari", ref: "KYC-441" },
  { id: "AUD-88288", date: "18 Jun 2026 09:42", category: "Trading", action: "Leverage Reduced", by: "Risk Manager", role: "Risk", source: "Admin Panel", severity: "warn", severityLabel: "Medium", status: "Completed", statusTone: "success", before: "1:500", after: "1:100", reason: "Risk Management Action", ip: "103.21.44.10", device: "Windows · Chrome", ref: "MT5-77231" },
  { id: "AUD-88287", date: "18 Jun 2026 09:30", category: "Security", action: "Force Logout", by: "Security Admin", role: "Security", source: "Admin Panel", severity: "danger", severityLabel: "High", status: "Completed", statusTone: "success", before: "Active", after: "All Sessions Terminated", reason: "Suspicious Login", ip: "103.21.44.10", device: "Windows · Chrome", ref: "SES-221" },
  { id: "AUD-88286", date: "18 Jun 2026 09:21", category: "Permission", action: "API Access Granted", by: "CRM Admin", role: "Admin", source: "Admin Panel", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", before: "Disabled", after: "Enabled", reason: "Client requested API key", ip: "103.21.44.11", device: "Windows · Chrome", ref: "API-992" },
  { id: "AUD-88285", date: "18 Jun 2026 09:05", category: "Support", action: "Assigned Agent", by: "Support Manager", role: "Support", source: "Admin Panel", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", before: "Rahul", after: "Priya", reason: "Load balancing", ref: "SUP-8821" },
  { id: "AUD-88284", date: "18 Jun 2026 08:50", category: "Communication", action: "Email Sent", by: "Marketing Auto", role: "Automation", source: "Automation", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", before: "-", after: "Welcome Pack", ref: "EML-1142" },
  { id: "AUD-88283", date: "18 Jun 2026 08:30", category: "IB / Partner", action: "IB Tier Changed", by: "Partnership Lead", role: "IB", source: "Admin Panel", severity: "warn", severityLabel: "Medium", status: "Completed", statusTone: "success", before: "Silver", after: "Gold", reason: "Volume threshold reached", ref: "IB-3320" },
  { id: "AUD-88282", date: "18 Jun 2026 08:12", category: "Marketing", action: "Bonus Granted", by: "Marketing Ops", role: "Marketing", source: "Admin Panel", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", before: "0", after: "$200", reason: "Welcome bonus", ref: "BNS-7711" },
  { id: "AUD-88281", date: "18 Jun 2026 07:55", category: "API", action: "API Request", by: "External App", role: "System", source: "API", severity: "info", severityLabel: "Low", status: "Completed", statusTone: "success", ref: "API-993" },
  { id: "AUD-88280", date: "18 Jun 2026 07:40", category: "Permission", action: "2FA Reset Failed", by: "Junior Admin", role: "Admin", source: "Admin Panel", severity: "danger", severityLabel: "High", status: "Failed", statusTone: "danger", reason: "No Permission" },
];

const CATEGORY_TONE: Record<string, Tone> = {
  Financial: "success", Trading: "info", Risk: "danger", Compliance: "violet",
  Security: "warn", Permission: "info", Support: "neutral", Communication: "info",
  "IB / Partner": "violet", Marketing: "warn", API: "neutral", Automation: "neutral",
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function AuditTrailPage() {
  const [active, setActive] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<AuditEvent | null>(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState<string>("All");
  const [sevFilter, setSevFilter] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  const events = useMemo(() => {
    return EVENTS.filter((e) => {
      if (catFilter !== "All" && e.category !== catFilter) return false;
      if (sevFilter !== "All" && e.severityLabel !== sevFilter) return false;
      if (statusFilter !== "All" && e.status !== statusFilter) return false;
      if (search && !`${e.id} ${e.action} ${e.by} ${e.ref ?? ""}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, catFilter, sevFilter, statusFilter]);

  return (
    <div className="grid grid-cols-[220px_1fr] gap-5">
      {/* Side rail */}
      <aside className="sticky top-[140px] h-fit rounded-xl border border-slate-200 bg-white p-2">
        <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sections</div>
        <nav className="flex flex-col">
          {SECTIONS.map((s) => (
            <button
              key={s.k}
              onClick={() => setActive(s.k)}
              className={`rounded-md px-2.5 py-1.5 text-left text-xs transition ${
                active === s.k ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <div className="space-y-5">
        <header className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">Audit Trail</h2>
                <Pill tone="violet">Enterprise</Pill>
                <Pill tone="info">Regulatory grade</Pill>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Who changed what · When · Why · From where · Before → After · Manual / Automated / API · Team · Permission used.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn onClick={() => toast.success("Audit exported")} tone="info">Export CSV</Btn>
              <Btn onClick={() => toast.success("PDF generated")}>Export PDF</Btn>
              <Btn onClick={() => toast.success("Investigation opened")} tone="danger">Open Investigation</Btn>
            </div>
          </div>
        </header>

        {active === "summary" && (
          <Section title="1. Audit Summary" subtitle="Quick overview of account changes and activities.">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              <Kpi label="Total Audit Events" value="48,291" tone="info" hint="all time" />
              <Kpi label="Today Events" value="245" tone="success" hint="+12%" />
              <Kpi label="High Risk Events" value="12" tone="danger" hint="review" />
              <Kpi label="Manual Changes" value="180" />
              <Kpi label="Automated Changes" value="65" tone="info" />
              <Kpi label="API Actions" value="20" />
              <Kpi label="Failed Actions" value="5" tone="danger" />
              <Kpi label="Pending Approvals" value="8" tone="warn" />
              <Kpi label="Last Action" value="10m ago" />
              <Kpi label="Last Modified By" value="Compliance" tone="violet" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs font-semibold text-slate-700">Used by</div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {["Admin","Compliance","Risk","Finance","Support","IB","Management","Regulatory Audit"].map(t => <Pill key={t}>{t}</Pill>)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs font-semibold text-slate-700">Category breakdown (24h)</div>
                <div className="mt-2 space-y-1.5">
                  {[
                    ["Financial", 88, "success"],["Trading", 56, "info"],["Compliance", 34, "violet"],
                    ["Security", 22, "warn"],["Risk", 18, "danger"],["Other", 27, "neutral"],
                  ].map(([k, v, tone]) => (
                    <div key={k as string} className="flex items-center gap-2 text-xs">
                      <span className="w-20 text-slate-500">{k}</span>
                      <div className="h-1.5 flex-1 rounded bg-slate-100">
                        <div className={`h-full rounded ${tone === "success" ? "bg-emerald-500" : tone === "info" ? "bg-sky-500" : tone === "violet" ? "bg-violet-500" : tone === "warn" ? "bg-amber-500" : tone === "danger" ? "bg-rose-500" : "bg-slate-400"}`} style={{ width: `${v as number}%` }} />
                      </div>
                      <span className="w-8 text-right text-slate-700">{v as number}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="text-xs font-semibold text-slate-700">Latest 5 events</div>
                <ul className="mt-2 space-y-1.5 text-xs">
                  {EVENTS.slice(0,5).map(e => (
                    <li key={e.id} className="flex items-center justify-between">
                      <span className="truncate text-slate-700">{e.action}</span>
                      <Pill tone={e.severity}>{e.severityLabel}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        )}

        {active === "all" && (
          <>
            <Section title="13. Filters & Advanced Search" subtitle="Date, user, department, category, source, status, severity, entity.">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ID / action / ref…" className="col-span-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs outline-none focus:border-slate-400" />
                <select value={catFilter} onChange={(e)=>setCatFilter(e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-xs">
                  <option>All</option>{Object.keys(CATEGORY_TONE).map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={sevFilter} onChange={(e)=>setSevFilter(e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-xs">
                  <option>All</option><option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
                </select>
                <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-md border border-slate-200 px-2 py-1.5 text-xs">
                  <option>All</option><option>Completed</option><option>Pending Approval</option><option>Rejected</option><option>Failed</option><option>Cancelled</option>
                </select>
                <Btn onClick={() => { setSearch(""); setCatFilter("All"); setSevFilter("All"); setStatusFilter("All"); }}>Reset</Btn>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                {["Today","Yesterday","Last 7 Days","Last 30 Days","Custom"].map(d => <Pill key={d}>{d}</Pill>)}
                <span className="mx-1 text-slate-300">|</span>
                {["Admin Panel","Client Portal","IB Portal","API","Automation"].map(d => <Pill key={d} tone="info">{d}</Pill>)}
                <span className="mx-1 text-slate-300">|</span>
                {["Compliance","Finance","Risk","Support","IB","Marketing"].map(d => <Pill key={d} tone="violet">{d}</Pill>)}
              </div>
            </Section>

            <Section title="2. All Audit Events" subtitle="Master audit log. Click a row to inspect full event drawer." right={<Pill tone="info">{events.length} rows</Pill>}>
              <EventTable rows={events} onOpen={setDrawer} />
            </Section>
          </>
        )}

        {active === "financial" && (
          <Section title="3. Financial Audit" subtitle="Money-related changes: deposits, withdrawals, transfers, bonuses, commissions, rebates.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Financial")} onOpen={setDrawer} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["Deposit Created","Deposit Approved","Deposit Rejected","Withdrawal Requested","Withdrawal Approved","Withdrawal Rejected","Wallet Transfer","Bonus Added","Bonus Removed","Commission Paid","Rebate Adjusted"].map(t => <Pill key={t} tone="success">{t}</Pill>)}
            </div>
          </Section>
        )}

        {active === "trading" && (
          <Section title="4. Trading Audit" subtitle="Trading permission and account changes.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Trading")} onOpen={setDrawer} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["Trading Account Created","Trading Account Disabled","Leverage Changed","Margin Rule Changed","Trade Restriction Applied","Copy Trading Enabled","Copy Trading Disabled","EA Permission Changed"].map(t => <Pill key={t} tone="info">{t}</Pill>)}
            </div>
          </Section>
        )}

        {active === "risk" && (
          <Section title="5. Risk Audit" subtitle="Risk team investigation history.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Risk")} onOpen={setDrawer} />
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 text-sm">
                <div className="mb-1 text-xs font-semibold text-slate-700">Example</div>
                <KV k="Risk Score Before" v="55" />
                <KV k="Risk Score After" v="85" />
                <KV k="Reason" v="Multiple high leverage trades" />
                <KV k="Team" v="Risk" />
              </div>
              <div className="rounded-lg border border-slate-200 p-3 text-xs">
                <div className="mb-1 font-semibold text-slate-700">Tracks</div>
                <ul className="list-inside list-disc space-y-0.5 text-slate-600">
                  <li>Risk score changes</li><li>Alerts</li><li>Restrictions</li><li>Fraud decisions</li>
                </ul>
              </div>
            </div>
          </Section>
        )}

        {active === "compliance" && (
          <Section title="6. Compliance Audit" subtitle="KYC, AML, document changes, regulatory actions.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Compliance")} onOpen={setDrawer} />
            <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm">
              <KV k="Action" v="KYC Approved" />
              <KV k="Previous" v="Pending" />
              <KV k="New" v={<Pill tone="success">Approved</Pill>} />
              <KV k="Approved By" v="Compliance Officer" />
              <KV k="Evidence" v="Passport + Utility Bill" />
            </div>
          </Section>
        )}

        {active === "security" && (
          <Section title="7. Security Audit" subtitle="Login events, password, 2FA, devices, sessions.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Security")} onOpen={setDrawer} />
            <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm">
              <KV k="Action" v="Force Logout" />
              <KV k="Affected" v="All Sessions" />
              <KV k="Performed By" v="Security Admin" />
              <KV k="Reason" v="Suspicious Login" />
            </div>
          </Section>
        )}

        {active === "permission" && (
          <Section title="8. Permission Audit" subtitle="Tracks access changes.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Permission")} onOpen={setDrawer} />
            <div className="mt-3 overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">Permission</th><th className="px-3 py-2">Old</th><th className="px-3 py-2">New</th></tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100"><td className="px-3 py-2">API Access</td><td className="px-3 py-2">Disabled</td><td className="px-3 py-2"><Pill tone="success">Enabled</Pill></td></tr>
                  <tr className="border-t border-slate-100"><td className="px-3 py-2">Withdrawal</td><td className="px-3 py-2">Enabled</td><td className="px-3 py-2"><Pill tone="warn">Restricted</Pill></td></tr>
                  <tr className="border-t border-slate-100"><td className="px-3 py-2">MT5 Access</td><td className="px-3 py-2">Disabled</td><td className="px-3 py-2"><Pill tone="success">Enabled</Pill></td></tr>
                  <tr className="border-t border-slate-100"><td className="px-3 py-2">Copy Trading</td><td className="px-3 py-2">Enabled</td><td className="px-3 py-2"><Pill tone="danger">Disabled</Pill></td></tr>
                  <tr className="border-t border-slate-100"><td className="px-3 py-2">IB Permission</td><td className="px-3 py-2">View</td><td className="px-3 py-2"><Pill tone="info">Manage</Pill></td></tr>
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {active === "ib" && (
          <Section title="9. IB / Partner Audit" subtitle="Tier, commission, partner & sub-IB changes.">
            <EventTable rows={EVENTS.filter(e=>e.category==="IB / Partner")} onOpen={setDrawer} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["IB Tier Changed","Commission Plan Updated","Partner Suspended","Referral Mapping Changed","Sub IB Added"].map(t => <Pill key={t} tone="violet">{t}</Pill>)}
            </div>
          </Section>
        )}

        {active === "support" && (
          <Section title="10. Support Audit" subtitle="Support team activity.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Support")} onOpen={setDrawer} />
            <div className="mt-3 rounded-lg border border-slate-200 p-3 text-sm">
              <KV k="Ticket" v="SUP-8821" />
              <KV k="Action" v="Assigned Agent" />
              <KV k="Before" v="Rahul" />
              <KV k="After" v="Priya" />
              <KV k="Changed By" v="Support Manager" />
            </div>
          </Section>
        )}

        {active === "communication" && (
          <Section title="11. Communication Audit" subtitle="Email, SMS, WhatsApp, consent, opt-out.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Communication")} onOpen={setDrawer} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["Email Sent","SMS Sent","WhatsApp Sent","Consent Updated","Marketing Opt-Out"].map(t => <Pill key={t} tone="info">{t}</Pill>)}
            </div>
          </Section>
        )}

        {active === "marketing" && (
          <Section title="12. Marketing Audit" subtitle="Campaigns, bonuses, promotions, coupons.">
            <EventTable rows={EVENTS.filter(e=>e.category==="Marketing")} onOpen={setDrawer} />
            <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
              {["Campaign Assigned","Bonus Granted","Promotion Removed","Coupon Used"].map(t => <Pill key={t} tone="warn">{t}</Pill>)}
            </div>
          </Section>
        )}

        {active === "automation" && (
          <Section title="13. System Automation Audit" subtitle="Engine-driven actions, scheduled tasks, rule executions.">
            <EventTable rows={EVENTS.filter(e=>e.source==="Automation")} onOpen={setDrawer} />
          </Section>
        )}

        {active === "api" && (
          <Section title="14. API Audit" subtitle="Inbound and outbound API actions.">
            <EventTable rows={EVENTS.filter(e=>e.source==="API")} onOpen={setDrawer} />
          </Section>
        )}

        {active === "approval" && (
          <Section title="10. Approval Workflow Audit" subtitle="Multi-step approvals — important for enterprise brokers.">
            <div className="rounded-lg border border-slate-200 p-3 text-sm">
              <div className="mb-2 text-xs font-semibold text-slate-700">Example — Withdrawal over $50,000</div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Pill>Requested By · Agent</Pill><span className="text-slate-400">→</span>
                <Pill tone="info">Reviewed · Finance Manager</Pill><span className="text-slate-400">→</span>
                <Pill tone="success">Approved · Compliance Head</Pill>
              </div>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                <KV k="Request ID" v="REQ-882" />
                <KV k="Action" v="Large Withdrawal Approval" />
                <KV k="Requested By" v="Agent" />
                <KV k="Approved By" v="Manager" />
                <KV k="Status" v={<Pill tone="success">Approved</Pill>} />
              </div>
            </div>
          </Section>
        )}

        {active === "failed" && (
          <Section title="11. Failed Actions" subtitle="Security monitoring — failed permission updates, withdrawal approvals, API requests, logins.">
            <EventTable rows={EVENTS.filter(e=>e.status==="Failed")} onOpen={setDrawer} />
          </Section>
        )}

        {active === "timeline" && (
          <Section title="12. Timeline View" subtitle="Visual history of the day.">
            <ol className="relative ml-4 border-l border-slate-200">
              {[
                ["09:10","KYC Approved","success"],
                ["09:20","Deposit Created","info"],
                ["09:45","Trade Account Opened","info"],
                ["10:10","Leverage Reduced","warn"],
                ["10:30","Withdrawal Restricted","danger"],
              ].map(([t, a, tone]) => (
                <li key={t as string} className="mb-3 ml-4">
                  <span className={`absolute -left-1.5 h-3 w-3 rounded-full ring-2 ring-white ${tone === "success" ? "bg-emerald-500" : tone === "info" ? "bg-sky-500" : tone === "warn" ? "bg-amber-500" : "bg-rose-500"}`} />
                  <div className="text-[11px] text-slate-500">{t}</div>
                  <div className="text-sm font-medium text-slate-900">{a}</div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {active === "filters" && (
          <Section title="13. Filters & Advanced Search" subtitle="All filter dimensions available across the audit trail.">
            <div className="grid gap-3 md:grid-cols-3">
              {[
                ["Date", ["Today","Yesterday","Last 7 Days","Last 30 Days","Custom Date Range"]],
                ["User", ["Admin Name","Support Agent","Compliance Officer","Finance User","System"]],
                ["Department", ["Compliance","Finance","Risk","Support","IB","Marketing"]],
                ["Category", ["Financial","Trading","Security","KYC","Permission","Support","IB"]],
                ["Source", ["Admin Panel","Client Portal","IB Portal","API","Automation"]],
                ["Status", ["Completed","Pending Approval","Rejected","Failed","Cancelled"]],
                ["Severity", ["Low","Medium","High","Critical"]],
                ["Entity", ["Client ID","IB ID","Account ID","Transaction ID","Trade ID","Ticket ID","Device ID"]],
              ].map(([t, items]) => (
                <div key={t as string} className="rounded-lg border border-slate-200 p-3">
                  <div className="mb-1.5 text-xs font-semibold text-slate-700">{t}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {(items as string[]).map(i => <Pill key={i}>{i}</Pill>)}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {active === "export" && (
          <Section title="14. Export Center" subtitle="Regulatory reporting — CSV, Excel, PDF, JSON.">
            <div className="grid gap-3 md:grid-cols-4">
              {["CSV","Excel","PDF","JSON"].map(f => (
                <div key={f} className="rounded-lg border border-slate-200 p-3">
                  <div className="text-sm font-semibold text-slate-900">{f}</div>
                  <div className="mt-1 text-xs text-slate-500">Generate {f} export</div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Btn onClick={() => toast.success(`${f} export started`)} tone="info">Export</Btn>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-2 md:grid-cols-5">
              {["Full Audit","Financial Audit","Compliance Audit","Security Audit","Custom Range"].map(s => <Pill key={s} tone="violet">{s}</Pill>)}
            </div>
          </Section>
        )}

        {active === "actions" && (
          <Section title="16. Admin Actions" subtitle="Safe, moderate and dangerous actions, with permission, reason, confirmation and audit logging.">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-xs font-semibold text-emerald-700">Safe</div>
                <div className="flex flex-wrap gap-1.5">
                  {["View Audit","Export Audit","Download Evidence","Add Internal Comment"].map(a => <Btn key={a} onClick={()=>toast.success(a)} tone="success">{a}</Btn>)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-xs font-semibold text-amber-700">Moderate (permission)</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Flag Event","Assign Investigation","Request Review"].map(a => <Btn key={a} onClick={()=>toast.success(a)} tone="warn">{a}</Btn>)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-xs font-semibold text-rose-700">Dangerous (permission + reason + confirm + log)</div>
                <div className="flex flex-wrap gap-1.5">
                  {["Lock Audit Record","Open Regulatory Case","Start Investigation"].map(a => <Btn key={a} onClick={()=>toast.error(a)} tone="danger">{a}</Btn>)}
                </div>
              </div>
            </div>
          </Section>
        )}

        {active === "config" && (
          <Section title="17. Audit Configuration" subtitle="Enterprise admin controls.">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3 text-sm">
                <KV k="Retention Period" v="7 Years" />
                <KV k="Logging Level" v={<Pill tone="info">Full</Pill>} />
                <KV k="Immutable Storage" v={<Pill tone="success">On</Pill>} />
                <KV k="Hash Chain" v={<Pill tone="success">Enabled</Pill>} />
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-xs font-semibold text-slate-700">Required Categories</div>
                <ul className="space-y-1 text-sm">
                  {["Financial","Security","Compliance","Trading","Permission","IB / Partner"].map(c => (
                    <li key={c} className="flex items-center justify-between">{c}<Pill tone="success">✓ On</Pill></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1.5 text-xs font-semibold text-slate-700">Final Enterprise Flow</div>
                <ol className="space-y-1 text-xs text-slate-600">
                  <li>1. Withdrawal Requested</li>
                  <li>2. Support Reviews</li>
                  <li>3. Finance Approves</li>
                  <li>4. Compliance Checks</li>
                  <li>5. Payment Completed</li>
                </ol>
                <div className="mt-2 text-[11px] text-slate-500">Audit stores: Who · What · When · Why · Before · After · Evidence · Approval.</div>
              </div>
            </div>
          </Section>
        )}
      </div>

      {drawer && <EventDrawer ev={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Table + Drawer                                                      */
/* ------------------------------------------------------------------ */

function EventTable({ rows, onOpen }: { rows: AuditEvent[]; onOpen: (e: AuditEvent) => void }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-3 py-2">Event ID</th>
            <th className="px-3 py-2">Date & Time</th>
            <th className="px-3 py-2">Category</th>
            <th className="px-3 py-2">Action</th>
            <th className="px-3 py-2">Performed By</th>
            <th className="px-3 py-2">Role</th>
            <th className="px-3 py-2">Source</th>
            <th className="px-3 py-2">Severity</th>
            <th className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && <tr><td colSpan={9} className="px-3 py-6 text-center text-xs text-slate-500">No events match the current filters.</td></tr>}
          {rows.map(e => (
            <tr key={e.id} onClick={() => onOpen(e)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50/60">
              <td className="px-3 py-2 font-mono text-xs text-slate-700">{e.id}</td>
              <td className="px-3 py-2 text-slate-700">{e.date}</td>
              <td className="px-3 py-2"><Pill tone={CATEGORY_TONE[e.category] ?? "neutral"}>{e.category}</Pill></td>
              <td className="px-3 py-2 font-medium text-slate-900">{e.action}</td>
              <td className="px-3 py-2 text-slate-700">{e.by}</td>
              <td className="px-3 py-2 text-slate-600">{e.role}</td>
              <td className="px-3 py-2 text-slate-600">{e.source}</td>
              <td className="px-3 py-2"><Pill tone={e.severity}>{e.severityLabel}</Pill></td>
              <td className="px-3 py-2"><Pill tone={e.statusTone}>{e.status}</Pill></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EventDrawer({ ev, onClose }: { ev: AuditEvent; onClose: () => void }) {
  const [tab, setTab] = useState<"overview"|"action"|"diff"|"workflow"|"related"|"evidence"|"metadata"|"timeline"|"comments"|"history">("overview");
  const TABS: [typeof tab, string][] = [
    ["overview","Event Overview"],["action","Action Details"],["diff","Before / After"],
    ["workflow","Approval Workflow"],["related","Related Records"],["evidence","Evidence"],
    ["metadata","Metadata"],["timeline","Timeline"],["comments","Comments"],["history","Audit History"],
  ];
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-slate-900/40" onClick={onClose} />
      <aside className="flex w-full max-w-[640px] flex-col border-l border-slate-200 bg-white shadow-2xl">
        <header className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500">{ev.id} · {ev.date}</div>
              <div className="mt-0.5 text-base font-semibold text-slate-900">{ev.action}</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                <Pill tone={CATEGORY_TONE[ev.category] ?? "neutral"}>{ev.category}</Pill>
                <Pill tone={ev.severity}>{ev.severityLabel}</Pill>
                <Pill tone={ev.statusTone}>{ev.status}</Pill>
              </div>
            </div>
            <button onClick={onClose} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100">✕</button>
          </div>
        </header>
        <nav className="flex flex-wrap gap-1 border-b border-slate-200 px-3 py-2">
          {TABS.map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded px-2 py-1 text-[11px] ${tab === k ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>{l}</button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-4">
          {tab === "overview" && (
            <div className="space-y-1">
              <KV k="Event ID" v={ev.id} />
              <KV k="Category" v={ev.category} />
              <KV k="Action" v={ev.action} />
              <KV k="Performed By" v={ev.by} />
              <KV k="Role" v={ev.role} />
              <KV k="Date" v={ev.date} />
              <KV k="Source" v={ev.source} />
              <KV k="Severity" v={<Pill tone={ev.severity}>{ev.severityLabel}</Pill>} />
              <KV k="Status" v={<Pill tone={ev.statusTone}>{ev.status}</Pill>} />
            </div>
          )}
          {tab === "action" && (
            <div className="space-y-1">
              <KV k="Action" v={ev.action} />
              <KV k="Reason" v={ev.reason ?? "—"} />
              <KV k="Reference" v={ev.ref ?? "—"} />
              <KV k="Performed By" v={`${ev.by} (${ev.role})`} />
              <KV k="Source" v={ev.source} />
            </div>
          )}
          {tab === "diff" && (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">Field</th><th className="px-3 py-2">Before</th><th className="px-3 py-2">After</th></tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-100">
                    <td className="px-3 py-2">{ev.action.split(" ")[0]} State</td>
                    <td className="px-3 py-2"><Pill>{ev.before ?? "—"}</Pill></td>
                    <td className="px-3 py-2"><Pill tone="success">{ev.after ?? "—"}</Pill></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {tab === "workflow" && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Pill>Requested · Agent</Pill><span className="text-slate-400">→</span>
              <Pill tone="info">Reviewed · Manager</Pill><span className="text-slate-400">→</span>
              <Pill tone="success">Approved · Compliance Head</Pill>
            </div>
          )}
          {tab === "related" && (
            <ul className="space-y-1 text-sm">
              <li>• Transaction: <span className="font-mono text-xs">{ev.ref ?? "—"}</span></li>
              <li>• Client: <span className="font-mono text-xs">CLT-2210</span></li>
              <li>• Ticket: <span className="font-mono text-xs">SUP-8821</span></li>
            </ul>
          )}
          {tab === "evidence" && (
            <div className="grid grid-cols-2 gap-2">
              {["Passport.pdf","Utility-Bill.jpg","Bank-Statement.pdf","Screenshot.png"].map(f => (
                <div key={f} className="rounded-lg border border-slate-200 p-2 text-xs">
                  <div className="mb-1 grid h-20 place-items-center rounded bg-slate-50 text-slate-400">📎</div>
                  <div className="truncate font-medium text-slate-700">{f}</div>
                  <div className="text-slate-500">Uploaded · 18 Jun</div>
                </div>
              ))}
            </div>
          )}
          {tab === "metadata" && (
            <div className="space-y-1">
              <KV k="IP Address" v={ev.ip ?? "103.xxx.xxx"} />
              <KV k="Device" v={ev.device ?? "Windows PC"} />
              <KV k="Browser" v="Chrome 124" />
              <KV k="Session ID" v="SES-221" />
              <KV k="API Request ID" v="API-992" />
              <KV k="Geo" v="Mumbai, IN" />
            </div>
          )}
          {tab === "timeline" && (
            <ol className="relative ml-3 border-l border-slate-200">
              {[["10:20","Approved"],["10:14","Reviewed"],["10:05","Requested"]].map(([t,a]) => (
                <li key={t} className="mb-3 ml-4">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-slate-400 ring-2 ring-white" />
                  <div className="text-[11px] text-slate-500">{t}</div>
                  <div className="text-sm font-medium text-slate-900">{a}</div>
                </li>
              ))}
            </ol>
          )}
          {tab === "comments" && (
            <div className="space-y-2 text-sm">
              <div className="rounded-lg border border-slate-200 p-2"><div className="text-[11px] text-slate-500">Compliance Officer · 10:25</div>All evidence verified.</div>
              <textarea placeholder="Add internal comment…" className="w-full rounded-lg border border-slate-200 p-2 text-xs" rows={3} />
              <Btn tone="info" onClick={() => toast.success("Comment added")}>Add Comment</Btn>
            </div>
          )}
          {tab === "history" && (
            <ul className="space-y-1 text-sm">
              {EVENTS.slice(0,4).map(e => (
                <li key={e.id} className="flex items-center justify-between border-b border-slate-100 py-1.5">
                  <span>{e.action}</span><Pill tone={e.statusTone}>{e.status}</Pill>
                </li>
              ))}
            </ul>
          )}
        </div>
        <footer className="flex flex-wrap gap-2 border-t border-slate-200 p-3">
          <Btn onClick={()=>toast.success("Evidence downloaded")} tone="info">Download Evidence</Btn>
          <Btn onClick={()=>toast.success("Flagged for review")} tone="warn">Flag</Btn>
          <Btn onClick={()=>toast.error("Investigation started")} tone="danger">Investigate</Btn>
          <div className="ml-auto"><Btn onClick={onClose}>Close</Btn></div>
        </footer>
      </aside>
    </div>
  );
}
