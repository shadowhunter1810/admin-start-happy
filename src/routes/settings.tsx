import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Atlas CRM" },
      { name: "description", content: "Account configuration, workflow, notifications, custom fields, integrations, automation and admin actions." },
    ],
  }),
  component: () => (
    <ClientShell>
      <SettingsPage />
    </ClientShell>
  ),
});

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
  return <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${toneMap[tone]}`}>{children}</span>;
}
function Section({ title, subtitle, right, children }: { title: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
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

type Setting = {
  key: string; label: string; group: string; value: string; prev?: string;
  changedBy?: string; reason?: string; effective?: string; valueTone?: Tone;
};

const SETTINGS: Setting[] = [
  // Account Config
  { key: "client_template", label: "Client Template", group: "Account Configuration", value: "VIP Client Template", prev: "Standard", changedBy: "CRM Admin", reason: "Upgraded to VIP", effective: "12 Jun 2026", valueTone: "violet" },
  { key: "service_level", label: "Service Level", group: "Account Configuration", value: "Premium Support", prev: "Standard", changedBy: "Support Manager", effective: "12 Jun 2026", valueTone: "success" },
  { key: "account_workflow", label: "Account Workflow", group: "Account Configuration", value: "VIP Workflow", changedBy: "CRM Admin", effective: "12 Jun 2026" },
  { key: "handling_team", label: "Default Handling Team", group: "Account Configuration", value: "VIP Desk", effective: "12 Jun 2026", valueTone: "violet" },
  { key: "internal_class", label: "Internal Classification", group: "Account Configuration", value: "High Value", valueTone: "success" },
  { key: "account_category", label: "Account Category", group: "Account Configuration", value: "Retail" },
  { key: "profile_tags", label: "Profile Tags", group: "Account Configuration", value: "Gold Client", valueTone: "warn" },
  // Workflow
  { key: "approval_workflow", label: "Approval Workflow", group: "Workflow", value: "VIP Withdrawal Flow", valueTone: "info" },
  { key: "escalation", label: "Escalation Rule", group: "Workflow", value: "Risk Team" },
  { key: "case_priority", label: "Case Priority", group: "Workflow", value: "High", valueTone: "danger" },
  { key: "auto_assign", label: "Auto Assignment", group: "Workflow", value: "Enabled", valueTone: "success" },
  { key: "review_cycle", label: "Review Cycle", group: "Workflow", value: "Monthly" },
  // Notifications
  { key: "email_alerts", label: "Email Alerts", group: "Notifications", value: "Enabled", valueTone: "success" },
  { key: "sms_alerts", label: "SMS Alerts", group: "Notifications", value: "Disabled", valueTone: "danger" },
  { key: "push_notif", label: "Push Notification", group: "Notifications", value: "Enabled", valueTone: "success" },
  { key: "trading_alerts", label: "Trading Alerts", group: "Notifications", value: "Enabled", valueTone: "success" },
  { key: "statement_notif", label: "Statement Notification", group: "Notifications", value: "Enabled", valueTone: "success" },
  { key: "marketing_msgs", label: "Marketing Messages", group: "Notifications", value: "Disabled", valueTone: "danger", prev: "Enabled", changedBy: "Client", reason: "User Preference Update", effective: "18 Jun 2026" },
  // Language
  { key: "lang", label: "Language", group: "Language & Localization", value: "English" },
  { key: "time_fmt", label: "Time Format", group: "Language & Localization", value: "24 Hours" },
  { key: "date_fmt", label: "Date Format", group: "Language & Localization", value: "DD/MM/YYYY" },
  { key: "currency", label: "Currency Display", group: "Language & Localization", value: "USD" },
  { key: "num_fmt", label: "Number Format", group: "Language & Localization", value: "International" },
  // Privacy
  { key: "mkt_consent", label: "Marketing Consent", group: "Data & Privacy", value: "Accepted", valueTone: "success" },
  { key: "data_share", label: "Data Sharing", group: "Data & Privacy", value: "Disabled", valueTone: "danger" },
  { key: "data_export", label: "Data Export Request", group: "Data & Privacy", value: "Allowed", valueTone: "success" },
  { key: "privacy_region", label: "Privacy Region", group: "Data & Privacy", value: "GDPR", valueTone: "violet" },
  { key: "retention", label: "Data Retention", group: "Data & Privacy", value: "7 Years" },
  // UI
  { key: "default_dash", label: "Default Dashboard", group: "UI Preferences", value: "Overview" },
  { key: "table_view", label: "Table View", group: "UI Preferences", value: "Compact" },
  { key: "fav_modules", label: "Favorite Modules", group: "UI Preferences", value: "Financial" },
  { key: "default_filters", label: "Default Filters", group: "UI Preferences", value: "Active Clients" },
  // Document
  { key: "stmt_fmt", label: "Statement Format", group: "Document Preferences", value: "PDF" },
  { key: "delivery_method", label: "Delivery Method", group: "Document Preferences", value: "Email" },
  { key: "report_freq", label: "Report Frequency", group: "Document Preferences", value: "Monthly" },
  { key: "doc_lang", label: "Language", group: "Document Preferences", value: "English" },
  // Report
  { key: "report_type", label: "Report Type", group: "Report Preferences", value: "Trading Summary" },
  { key: "rep_freq", label: "Frequency", group: "Report Preferences", value: "Weekly" },
  { key: "rep_delivery", label: "Delivery", group: "Report Preferences", value: "Email" },
  { key: "rep_recipients", label: "Recipients", group: "Report Preferences", value: "Client + Manager" },
];

const CUSTOM_FIELDS = [
  { field: "VIP Segment", value: "Diamond", by: "CRM" },
  { field: "Acquisition Type", value: "Event", by: "Marketing" },
  { field: "Lead Source", value: "Dubai Expo", by: "Sales" },
  { field: "Partner Region", value: "Asia", by: "IB Team" },
];

const INTEGRATIONS = [
  { system: "MT5 Sync", status: "Connected", tone: "success" as Tone, since: "Jan 2025" },
  { system: "CRM Sync", status: "Active", tone: "success" as Tone, since: "Jan 2025" },
  { system: "Payment Gateway", status: "Connected", tone: "success" as Tone, since: "Mar 2025" },
  { system: "Marketing Platform", status: "Connected", tone: "success" as Tone, since: "May 2025" },
];

const AUTOMATIONS = [
  { rule: "VIP Assignment — IF Deposit > $100,000 THEN Assign VIP Manager", status: "Active", tone: "success" as Tone },
  { rule: "Dormant Reminder — IF inactive > 60d THEN Send re-engagement email", status: "Active", tone: "success" as Tone },
  { rule: "Statement Generation — Monthly trading statement to client", status: "Active", tone: "success" as Tone },
  { rule: "High Risk Alert — IF risk score > 80 THEN Notify Risk Team", status: "Paused", tone: "warn" as Tone },
];

const SECTIONS = [
  { k: "summary", label: "Settings Summary" },
  { k: "account", label: "Account Configuration" },
  { k: "workflow", label: "Workflow Configuration" },
  { k: "notifications", label: "Notification Preferences" },
  { k: "language", label: "Language & Localization" },
  { k: "privacy", label: "Data & Privacy" },
  { k: "custom", label: "Custom Fields" },
  { k: "integration", label: "Integration Configuration" },
  { k: "automation", label: "Automation Rules" },
  { k: "ui", label: "UI Preferences" },
  { k: "document", label: "Document Preferences" },
  { k: "report", label: "Report Preferences" },
  { k: "timeline", label: "Timeline" },
  { k: "notes", label: "Notes" },
  { k: "actions", label: "Admin Actions" },
  { k: "audit", label: "Audit Trail" },
] as const;
type SK = typeof SECTIONS[number]["k"];

function SettingsPage() {
  const [active, setActive] = useState<SK>("summary");
  const [drawer, setDrawer] = useState<Setting | null>(null);

  const byGroup = (g: string) => SETTINGS.filter((s) => s.group === g);

  return (
    <div className="grid grid-cols-[220px_1fr] gap-5">
      <aside className="sticky top-[140px] h-fit rounded-xl border border-slate-200 bg-white p-2">
        <div className="px-2 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Sections</div>
        <nav className="flex flex-col">
          {SECTIONS.map((s) => (
            <button key={s.k} onClick={() => setActive(s.k)} className={`rounded-md px-2.5 py-1.5 text-left text-xs transition ${active === s.k ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-50"}`}>
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="space-y-5">
        <header className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900">Settings</h2>
                <Pill tone="violet">Enterprise</Pill>
                <Pill tone="info">No duplication</Pill>
              </div>
              <p className="mt-1 text-xs text-slate-500">System-level account behaviour, workflow, preferences, custom fields, integrations and automations.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Btn tone="info" onClick={() => toast.success("Settings exported")}>Export Settings</Btn>
              <Btn tone="success" onClick={() => toast.success("Template applied")}>Apply Template</Btn>
              <Btn tone="warn" onClick={() => toast.success("Custom field added")}>Add Custom Field</Btn>
            </div>
          </div>
        </header>

        {active === "summary" && (
          <Section title="1. Settings Summary" subtitle="Quick view of configuration status.">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-6">
              <Kpi label="Total Configurations" value="25" tone="info" />
              <Kpi label="Custom Fields" value="8" tone="violet" />
              <Kpi label="Active Automations" value="5" tone="success" />
              <Kpi label="Connected Systems" value="3" tone="success" />
              <Kpi label="Last Updated" value="Today" tone="info" />
              <Kpi label="Updated By" value="CRM Admin" />
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 text-sm">
                <div className="mb-1 text-xs font-semibold text-slate-700">Final Separation (Enterprise Correct)</div>
                <div className="grid grid-cols-2 gap-x-3 text-xs">
                  {[
                    ["Name, Email, Country","Overview"],["Balance, Deposit, Withdrawal","Financial"],
                    ["MT5 Account, Leverage","Trading Accounts"],["Trading Permission","Permissions"],
                    ["Login Security","Security & Sessions"],["KYC Data","KYC & Compliance"],
                    ["Commission","Commissions"],["Preferences & System Config","Settings"],
                  ].map(([info, tab]) => (
                    <div key={info} className="flex items-center justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-600">{info}</span><Pill tone="info">{tab}</Pill>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-1 text-xs font-semibold text-slate-700">Recent changes</div>
                <ul className="space-y-1 text-xs">
                  {SETTINGS.filter(s=>s.prev).map(s=>(
                    <li key={s.key} className="flex items-center justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-700">{s.label}</span>
                      <span className="flex items-center gap-1"><Pill>{s.prev}</Pill>→<Pill tone="success">{s.value}</Pill></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>
        )}

        {active === "account" && <GroupTable title="2. Account Configuration" subtitle="System-level account behaviour (not financial/trading data)." rows={byGroup("Account Configuration")} onOpen={setDrawer} />}
        {active === "workflow" && (
          <>
            <GroupTable title="3. Workflow Configuration" subtitle="Defines internal process — approval, escalation, priority." rows={byGroup("Workflow")} onOpen={setDrawer} />
            <Section title="Workflow Example" subtitle="When client requests withdrawal">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-slate-200 p-3"><div className="mb-1 text-xs font-semibold text-slate-700">Normal Client</div><div className="flex items-center gap-2 text-xs"><Pill>Requested</Pill>→<Pill tone="info">Finance Approval</Pill></div></div>
                <div className="rounded-lg border border-slate-200 p-3"><div className="mb-1 text-xs font-semibold text-slate-700">VIP Client</div><div className="flex items-center gap-2 text-xs"><Pill tone="violet">Requested</Pill>→<Pill tone="success">Priority Approval</Pill></div></div>
              </div>
            </Section>
          </>
        )}
        {active === "notifications" && <GroupTable title="4. Notification Preferences" subtitle="Future communication rules — not history." rows={byGroup("Notifications")} onOpen={setDrawer} />}
        {active === "language" && <GroupTable title="5. Language & Localization" subtitle="User experience settings." rows={byGroup("Language & Localization")} onOpen={setDrawer} />}
        {active === "privacy" && <GroupTable title="6. Data & Privacy Preferences" subtitle="Data usage preferences." rows={byGroup("Data & Privacy")} onOpen={setDrawer} />}

        {active === "custom" && (
          <Section title="7. Custom Fields" subtitle="Enterprise-specific extra information — every broker has different requirements." right={<Btn tone="violet" onClick={()=>toast.success("Custom field added")}>+ Add Field</Btn>}>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">Field</th><th className="px-3 py-2">Value</th><th className="px-3 py-2">Created By</th><th className="px-3 py-2"></th></tr>
                </thead>
                <tbody>
                  {CUSTOM_FIELDS.map(c => (
                    <tr key={c.field} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium text-slate-900">{c.field}</td>
                      <td className="px-3 py-2"><Pill tone="violet">{c.value}</Pill></td>
                      <td className="px-3 py-2 text-slate-600">{c.by}</td>
                      <td className="px-3 py-2 text-right"><Btn onClick={()=>toast.success("Edited")}>Edit</Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {active === "integration" && (
          <Section title="8. Integration Configuration" subtitle="External system connections.">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">System</th><th className="px-3 py-2">Status</th><th className="px-3 py-2">Since</th><th className="px-3 py-2"></th></tr>
                </thead>
                <tbody>
                  {INTEGRATIONS.map(i => (
                    <tr key={i.system} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-medium text-slate-900">{i.system}</td>
                      <td className="px-3 py-2"><Pill tone={i.tone}>{i.status}</Pill></td>
                      <td className="px-3 py-2 text-slate-600">{i.since}</td>
                      <td className="px-3 py-2 text-right space-x-1"><Btn onClick={()=>toast.success("Reconnected")} tone="info">Reconnect</Btn><Btn onClick={()=>toast.error("Disconnected")} tone="danger">Disconnect</Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {active === "automation" && (
          <Section title="9. Automation Rules" subtitle="Automatic actions." right={<Btn tone="success" onClick={()=>toast.success("Rule created")}>+ Create Rule</Btn>}>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">Rule</th><th className="px-3 py-2">Status</th><th className="px-3 py-2"></th></tr>
                </thead>
                <tbody>
                  {AUTOMATIONS.map(a => (
                    <tr key={a.rule} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-800">{a.rule}</td>
                      <td className="px-3 py-2"><Pill tone={a.tone}>{a.status}</Pill></td>
                      <td className="px-3 py-2 text-right space-x-1"><Btn onClick={()=>toast.success("Edited")}>Edit</Btn><Btn onClick={()=>toast.error("Disabled")} tone="danger">Disable</Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}

        {active === "ui" && <GroupTable title="10. User Interface Preferences" subtitle="Personal dashboard customization." rows={byGroup("UI Preferences")} onOpen={setDrawer} />}
        {active === "document" && <GroupTable title="11. Document Preferences" subtitle="Document delivery settings." rows={byGroup("Document Preferences")} onOpen={setDrawer} />}
        {active === "report" && <GroupTable title="12. Report Preferences" subtitle="Automatic reports." rows={byGroup("Report Preferences")} onOpen={setDrawer} />}

        {active === "timeline" && (
          <Section title="Settings Timeline" subtitle="History of recent configuration changes.">
            <ol className="relative ml-4 border-l border-slate-200">
              {SETTINGS.filter(s=>s.prev).map(s => (
                <li key={s.key} className="mb-3 ml-4">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-violet-500 ring-2 ring-white" />
                  <div className="text-[11px] text-slate-500">{s.effective ?? "—"} · {s.changedBy ?? "—"}</div>
                  <div className="text-sm font-medium text-slate-900">{s.label}: <span className="font-normal text-slate-600">{s.prev} → {s.value}</span></div>
                </li>
              ))}
            </ol>
          </Section>
        )}

        {active === "notes" && (
          <Section title="Notes" subtitle="Internal notes on settings configuration.">
            <textarea className="w-full rounded-lg border border-slate-200 p-2 text-sm" rows={4} placeholder="Add internal note about settings…" />
            <div className="mt-2"><Btn tone="info" onClick={()=>toast.success("Note saved")}>Save Note</Btn></div>
          </Section>
        )}

        {active === "actions" && (
          <Section title="Admin Actions" subtitle="Safe, moderate, dangerous — with permission, reason, confirmation and audit log.">
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-emerald-700">Safe</div>
                <div className="flex flex-wrap gap-1.5">
                  {[["View Settings","Check configuration"],["Export Settings","Download"],["Add Note","Internal record"],["Compare Changes","Difference view"]].map(([a,p])=>(
                    <Btn key={a} tone="success" onClick={()=>toast.success(`${a}: ${p}`)}>{a}</Btn>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-amber-700">Moderate</div>
                <div className="flex flex-wrap gap-1.5">
                  {[["Update Configuration","Change setting"],["Add Custom Field","Extend profile"],["Apply Template","Apply workflow"],["Create Automation","Add rule"]].map(([a,p])=>(
                    <Btn key={a} tone="warn" onClick={()=>toast.success(`${a}: ${p}`)}>{a}</Btn>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="mb-2 text-xs font-semibold text-rose-700">Dangerous (permission + reason + confirm + log)</div>
                <div className="flex flex-wrap gap-1.5">
                  {[["Reset Settings","Restore default"],["Delete Custom Field","Remove custom data"],["Disable Automation","Stop process"],["Remove Integration","Disconnect system"]].map(([a,p])=>(
                    <Btn key={a} tone="danger" onClick={()=>toast.error(`${a}: ${p}`)}>{a}</Btn>
                  ))}
                </div>
              </div>
            </div>
          </Section>
        )}

        {active === "audit" && (
          <Section title="Audit Trail" subtitle="All configuration changes logged with who / when / why / before / after.">
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
                  <tr><th className="px-3 py-2">Date</th><th className="px-3 py-2">Setting</th><th className="px-3 py-2">Before</th><th className="px-3 py-2">After</th><th className="px-3 py-2">By</th><th className="px-3 py-2">Reason</th></tr>
                </thead>
                <tbody>
                  {SETTINGS.filter(s=>s.prev).map(s => (
                    <tr key={s.key} className="border-t border-slate-100">
                      <td className="px-3 py-2 text-slate-600">{s.effective ?? "—"}</td>
                      <td className="px-3 py-2 font-medium text-slate-900">{s.label}</td>
                      <td className="px-3 py-2"><Pill>{s.prev}</Pill></td>
                      <td className="px-3 py-2"><Pill tone="success">{s.value}</Pill></td>
                      <td className="px-3 py-2 text-slate-600">{s.changedBy ?? "—"}</td>
                      <td className="px-3 py-2 text-slate-600">{s.reason ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>
        )}
      </div>

      {drawer && <SettingDrawer s={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}

function GroupTable({ title, subtitle, rows, onOpen }: { title: string; subtitle?: string; rows: Setting[]; onOpen: (s: Setting) => void }) {
  return (
    <Section title={title} subtitle={subtitle}>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Field</th>
              <th className="px-3 py-2">Value</th>
              <th className="px-3 py-2">Last Changed</th>
              <th className="px-3 py-2">By</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.key} onClick={() => onOpen(r)} className="cursor-pointer border-t border-slate-100 hover:bg-slate-50/60">
                <td className="px-3 py-2 font-medium text-slate-900">{r.label}</td>
                <td className="px-3 py-2"><Pill tone={r.valueTone ?? "neutral"}>{r.value}</Pill></td>
                <td className="px-3 py-2 text-slate-600">{r.effective ?? "—"}</td>
                <td className="px-3 py-2 text-slate-600">{r.changedBy ?? "—"}</td>
                <td className="px-3 py-2 text-right"><Btn onClick={(e?: any) => { e?.stopPropagation?.(); onOpen(r); }}>Details</Btn></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function SettingDrawer({ s, onClose }: { s: Setting; onClose: () => void }) {
  const [tab, setTab] = useState<"current"|"timeline"|"automation"|"history">("current");
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-slate-900/40" onClick={onClose} />
      <aside className="flex w-full max-w-[560px] flex-col border-l border-slate-200 bg-white shadow-2xl">
        <header className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500">{s.group}</div>
              <div className="mt-0.5 text-base font-semibold text-slate-900">{s.label}</div>
            </div>
            <button onClick={onClose} className="rounded-md p-1.5 text-slate-500 hover:bg-slate-100">✕</button>
          </div>
        </header>
        <nav className="flex flex-wrap gap-1 border-b border-slate-200 px-3 py-2">
          {([["current","Current Value"],["timeline","Timeline"],["automation","Related Automation"],["history","Audit History"]] as const).map(([k,l]) => (
            <button key={k} onClick={() => setTab(k)} className={`rounded px-2 py-1 text-[11px] ${tab === k ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-700 hover:bg-slate-100"}`}>{l}</button>
          ))}
        </nav>
        <div className="flex-1 overflow-y-auto p-4 space-y-1 text-sm">
          {tab === "current" && (
            <>
              <KV k="Current Value" v={<Pill tone={s.valueTone ?? "neutral"}>{s.value}</Pill>} />
              <KV k="Previous Value" v={s.prev ? <Pill>{s.prev}</Pill> : "—"} />
              <KV k="Changed By" v={s.changedBy ?? "—"} />
              <KV k="Change Reason" v={s.reason ?? "—"} />
              <KV k="Effective Date" v={s.effective ?? "—"} />
              <KV k="Group" v={s.group} />
            </>
          )}
          {tab === "timeline" && (
            <ol className="relative ml-3 border-l border-slate-200">
              {[["18 Jun","Updated by Client"],["12 Jun","Reviewed by CRM Admin"],["01 Jun","Initial value set"]].map(([t,a]) => (
                <li key={t} className="mb-3 ml-4">
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-violet-500 ring-2 ring-white" />
                  <div className="text-[11px] text-slate-500">{t}</div>
                  <div className="text-sm font-medium text-slate-900">{a}</div>
                </li>
              ))}
            </ol>
          )}
          {tab === "automation" && (
            <div className="text-xs text-slate-600">
              Linked automation: <Pill tone="success">VIP Assignment Rule</Pill>
              <p className="mt-2">If this setting changes, the linked automation re-evaluates the client profile.</p>
            </div>
          )}
          {tab === "history" && (
            <ul className="space-y-1">
              <li className="flex items-center justify-between border-b border-slate-100 py-1.5">{s.label} updated<Pill tone="success">Completed</Pill></li>
              <li className="flex items-center justify-between border-b border-slate-100 py-1.5">{s.label} reviewed<Pill tone="info">Reviewed</Pill></li>
              <li className="flex items-center justify-between border-b border-slate-100 py-1.5">{s.label} created<Pill>Initial</Pill></li>
            </ul>
          )}
        </div>
        <footer className="flex flex-wrap gap-2 border-t border-slate-200 p-3">
          <Btn tone="info" onClick={()=>toast.success("Compare opened")}>Compare Changes</Btn>
          <Btn tone="warn" onClick={()=>toast.success("Edit mode")}>Update Value</Btn>
          <Btn tone="danger" onClick={()=>toast.error("Reset to default")}>Reset</Btn>
          <div className="ml-auto"><Btn onClick={onClose}>Close</Btn></div>
        </footer>
      </aside>
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 py-1.5 last:border-0">
      <span className="text-slate-500">{k}</span>
      <span className="font-medium text-slate-900">{v}</span>
    </div>
  );
}
