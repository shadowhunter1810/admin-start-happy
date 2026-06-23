import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  MessageCircle,
  Inbox,
  AlertTriangle,
  Clock,
  TrendingUp,
  Timer,
  Send,
  X,
  Search,
  ArrowUpRight,
  ArrowDownLeft,
  Star,
  Download,
  Play,
  Check,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/comms")({
  head: () => ({
    meta: [
      { title: "Communication History — Client / IB Details" },
      {
        name: "description",
        content:
          "Full communication history for client/IB with email, SMS, calls, chat, WhatsApp, notifications, risk flags, and audit trail.",
      },
      { property: "og:title", content: "Communication History — CRM" },
      { property: "og:description", content: "Trading broker CRM communication history tab." },
    ],
  }),
  component: CommunicationHistory,
});

type Tone = "success" | "info" | "warning" | "danger";
const toneCls: Record<Tone, string> = {
  success:
    "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30",
  info: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-400 dark:ring-sky-500/30",
  warning:
    "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/30",
  danger:
    "bg-rose-50 text-rose-700 ring-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:ring-rose-500/30",
};

const badges: { label: string; tone: Tone }[] = [
  { label: "Email verified", tone: "success" },
  { label: "Phone verified", tone: "success" },
  { label: "WhatsApp active", tone: "success" },
  { label: "Marketing consent", tone: "info" },
  { label: "VIP contact required", tone: "info" },
  { label: "High engagement", tone: "success" },
  { label: "Compliance notice sent", tone: "warning" },
  { label: "Unreachable client", tone: "danger" },
];

const kpis = [
  {
    label: "Total Emails",
    value: "284",
    sub: "↑ 12% vs last month",
    Icon: Mail,
    tint: "from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Total SMS",
    value: "142",
    sub: "↑ 4% vs last month",
    Icon: MessageSquare,
    tint: "from-sky-500/15 to-sky-500/5 text-sky-600 dark:text-sky-400",
  },
  {
    label: "Total Calls",
    value: "32",
    sub: "Avg 4m 18s",
    Icon: Phone,
    tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Total Chats",
    value: "14",
    sub: "★ 4.6/5 rating",
    Icon: MessageCircle,
    tint: "from-purple-500/15 to-purple-500/5 text-purple-600 dark:text-purple-400",
  },
  {
    label: "Unread Messages",
    value: "7",
    sub: "Needs attention",
    Icon: Inbox,
    tint: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  {
    label: "Failed Deliveries",
    value: "3",
    sub: "Review required",
    Icon: AlertTriangle,
    tint: "from-rose-500/15 to-rose-500/5 text-rose-600 dark:text-rose-400",
  },
  {
    label: "Last Communication",
    value: "Today",
    sub: "09:10 via WhatsApp",
    Icon: Clock,
    tint: "from-cyan-500/15 to-cyan-500/5 text-cyan-600 dark:text-cyan-400",
  },
  {
    label: "Response Rate",
    value: "92%",
    sub: "↑ from 88%",
    Icon: TrendingUp,
    tint: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
  {
    label: "Avg Response Time",
    value: "18 min",
    sub: "↓ from 24 min",
    Icon: Timer,
    tint: "from-indigo-500/15 to-indigo-500/5 text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Preferred Channel",
    value: "WhatsApp",
    sub: "64% of interactions",
    Icon: Send,
    tint: "from-green-500/15 to-green-500/5 text-green-600 dark:text-green-400",
  },
];

const tabs = [
  { id: "email", label: "Email History" },
  { id: "sms", label: "SMS History" },
  { id: "call", label: "Call History" },
  { id: "chat", label: "Live Chat" },
  { id: "whatsapp", label: "WhatsApp & Messaging" },
  { id: "notifications", label: "Notifications" },
  { id: "campaigns", label: "Campaigns" },
  { id: "preferences", label: "Preferences" },
  { id: "analytics", label: "Analytics" },
  { id: "risk", label: "Risk Flags" },
  { id: "timeline", label: "Timeline" },
  { id: "notes", label: "Notes" },
  { id: "admin", label: "Admin Actions" },
  { id: "audit", label: "Audit Trail" },
] as const;
type TabId = (typeof tabs)[number]["id"];

const statusTone: Record<string, string> = {
  Opened: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Delivered: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
  Read: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Bounced: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  Failed: "bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  Replied: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
  Resolved: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Escalated: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  "No Answer": "bg-slate-100 text-slate-600 dark:bg-slate-700/50 dark:text-slate-300",
};

export function CommunicationHistory() {
  const [activeTab, setActiveTab] = useState<TabId>("email");
  const [drawerType, setDrawerType] = useState<"email" | "call" | "chat" | "whatsapp" | null>(null);
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 p-4 sm:p-6 lg:p-8">
      {/* Header */}

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-lg transition group"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${k.tint} opacity-60 group-hover:opacity-100 transition`}
            />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {k.label}
                </span>
                <div
                  className={`h-7 w-7 rounded-lg bg-white/80 dark:bg-slate-900/80 flex items-center justify-center ${k.tint.split(" ").slice(-2).join(" ")}`}
                >
                  <k.Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">{k.value}</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{k.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          <nav className="flex min-w-max px-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  activeTab === t.id
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "email" && <EmailTab onView={() => setDrawerType("email")} />}
          {activeTab === "sms" && <SmsTab />}
          {activeTab === "call" && <CallTab onView={() => setDrawerType("call")} />}
          {activeTab === "chat" && <ChatTab onView={() => setDrawerType("chat")} />}
          {activeTab === "whatsapp" && <WhatsAppTab onView={() => setDrawerType("whatsapp")} />}
          {activeTab === "notifications" && <NotificationsTab />}
          {activeTab === "campaigns" && <CampaignsTab />}
          {activeTab === "preferences" && <PreferencesTab />}
          {activeTab === "analytics" && <AnalyticsTab />}
          {activeTab === "risk" && <RiskTab />}
          {activeTab === "timeline" && <TimelineTab />}
          {activeTab === "notes" && <NotesTab />}
          {activeTab === "admin" && <AdminTab onDanger={setConfirmAction} />}
          {activeTab === "audit" && <AuditTab />}
        </div>
      </div>

      {/* Drawer */}
      {drawerType && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setDrawerType(null)}
          />
          <aside className="fixed right-0 top-0 z-50 h-full w-full max-w-xl bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-right duration-300">
            <header className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {drawerType === "email" && "Email Details"}
                  {drawerType === "call" && "Call Details"}
                  {drawerType === "chat" && "Chat Transcript"}
                  {drawerType === "whatsapp" && "WhatsApp Conversation"}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full interaction details
                </p>
              </div>
              <button
                onClick={() => setDrawerType(null)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </header>
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {drawerType === "email" && <EmailDrawer />}
              {drawerType === "call" && <CallDrawer />}
              {drawerType === "chat" && <ChatDrawer />}
              {drawerType === "whatsapp" && <WhatsAppDrawer />}
            </div>
          </aside>
        </>
      )}

      {/* Confirm modal */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Confirm action</h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-5">
              Are you sure you want to <strong>{confirmAction}</strong> for this client?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------- Reusable Table shell ----------- */
function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-4 py-3 text-left font-medium">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function TableShell({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 dark:text-slate-400">
          <tr>
            {headers.map((h) => (
              <Th key={h}>{h}</Th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">{children}</tbody>
      </table>
    </div>
  );
}
function StatusPill({ s }: { s: string }) {
  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs font-medium ${statusTone[s] ?? "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}`}
    >
      {s}
    </span>
  );
}

/* ----------- Tabs ----------- */
function EmailTab({ onView }: { onView: () => void }) {
  const rows = [
    [
      "2026-06-22 09:10",
      "Your withdrawal request #WD-20841 is being processed",
      "out",
      "Opened",
      5,
      "noreply@broker.com",
      "Finance",
    ],
    [
      "2026-06-21 14:32",
      "KYC document verification required",
      "out",
      "Opened",
      3,
      "compliance@broker.com",
      "Compliance",
    ],
    [
      "2026-06-20 11:05",
      "Margin call warning on MT5 account #500214",
      "out",
      "Opened",
      8,
      "risk@broker.com",
      "Risk",
    ],
    [
      "2026-06-19 17:48",
      "Re: Unable to access trading platform",
      "in",
      "Replied",
      1,
      "john.doe@gmail.com",
      "Support",
    ],
    [
      "2026-06-18 08:22",
      "Monthly account statement - May 2026",
      "out",
      "Delivered",
      0,
      "statements@broker.com",
      "Finance",
    ],
    [
      "2026-06-17 12:15",
      "Promotion: 30% deposit bonus",
      "out",
      "Bounced",
      0,
      "marketing@broker.com",
      "Marketing",
    ],
    ["2026-06-16 10:00", "Welcome to Gold tier", "out", "Opened", 2, "vip@broker.com", "VIP Desk"],
  ] as const;
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Email History</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Inbound & outbound emails with delivery tracking
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" />
            <input
              placeholder="Search emails..."
              className="pl-8 pr-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56"
            />
          </div>
          <select className="px-3 py-2 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <option>All Status</option>
            <option>Opened</option>
            <option>Delivered</option>
            <option>Bounced</option>
          </select>
        </div>
      </div>
      <TableShell headers={["Date", "Subject", "Direction", "Status", "Opens", "Sender", "Dept."]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
            <Td className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{r[0]}</Td>
            <Td className="font-medium text-slate-900 dark:text-white max-w-xs truncate">{r[1]}</Td>
            <Td>
              {r[2] === "out" ? (
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                  <ArrowUpRight className="w-3 h-3" />
                  Outbound
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                  <ArrowDownLeft className="w-3 h-3" />
                  Inbound
                </span>
              )}
            </Td>
            <Td>
              <StatusPill s={r[3] as string} />
            </Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[4]}</Td>
            <Td className="text-slate-600 dark:text-slate-300 truncate max-w-[180px]">{r[5]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[6]}</Td>
            <Td className="text-right">
              <button
                onClick={onView}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
              >
                View
              </button>
            </Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function SmsTab() {
  const rows = [
    [
      "2026-06-22 08:55",
      "Your OTP code is 482910. Valid for 5 min.",
      "Delivered",
      "+44 20 7946 1842",
      "Security",
    ],
    [
      "2026-06-21 18:00",
      "Withdrawal of $2,500 processed successfully.",
      "Delivered",
      "+44 20 7946 1842",
      "Transactional",
    ],
    [
      "2026-06-20 11:10",
      "Margin call warning: top up your MT5 account.",
      "Delivered",
      "+44 20 7946 1842",
      "Risk Alert",
    ],
    [
      "2026-06-19 09:30",
      "Reminder: complete your KYC by 25 June.",
      "Failed",
      "+44 20 7946 1842",
      "Compliance",
    ],
    [
      "2026-06-18 12:00",
      "Get a 30% deposit bonus this week!",
      "Delivered",
      "+44 20 7946 1842",
      "Marketing",
    ],
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">SMS History</h3>
      <TableShell headers={["Date", "Message", "Status", "Phone", "Type"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{r[0]}</Td>
            <Td className="text-slate-900 dark:text-white max-w-md truncate">{r[1]}</Td>
            <Td>
              <StatusPill s={r[2]} />
            </Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[3]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[4]}</Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function CallTab({ onView }: { onView: () => void }) {
  const rows = [
    ["2026-06-22 10:15", "Inbound", "Sarah Wells", "06m 32s", "Resolved", true],
    ["2026-06-20 14:00", "Outbound", "Mike Chen", "03m 11s", "Escalated", true],
    ["2026-06-18 09:45", "Outbound", "Sarah Wells", "01m 48s", "No Answer", false],
    ["2026-06-15 16:20", "Inbound", "James Patel", "08m 02s", "Resolved", true],
  ] as const;
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Call History</h3>
      <TableShell headers={["Date", "Direction", "Agent", "Duration", "Outcome", "Recording"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{r[0]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[1]}</Td>
            <Td className="text-slate-900 dark:text-white font-medium">{r[2]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[3]}</Td>
            <Td>
              <StatusPill s={r[4] as string} />
            </Td>
            <Td>
              {r[5] ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs">
                  ● Available
                </span>
              ) : (
                <span className="text-xs text-slate-400">—</span>
              )}
            </Td>
            <Td className="text-right">
              <button
                onClick={onView}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
              >
                View
              </button>
            </Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function ChatTab({ onView }: { onView: () => void }) {
  const rows = [
    ["2026-06-22 09:10", "Sarah Wells", "12m 04s", "Resolved", 5],
    ["2026-06-18 15:22", "Mike Chen", "08m 51s", "Resolved", 4],
    ["2026-06-12 11:00", "James Patel", "22m 30s", "Escalated", 3],
  ] as const;
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Live Chat Sessions
      </h3>
      <TableShell headers={["Date", "Agent", "Duration", "Outcome", "Rating"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="text-slate-500 dark:text-slate-400">{r[0]}</Td>
            <Td className="text-slate-900 dark:text-white font-medium">{r[1]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[2]}</Td>
            <Td>
              <StatusPill s={r[3] as string} />
            </Td>
            <Td className="text-amber-500">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`inline w-3.5 h-3.5 ${j < (r[4] as number) ? "fill-current" : ""}`}
                />
              ))}
            </Td>
            <Td className="text-right">
              <button
                onClick={onView}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
              >
                Transcript
              </button>
            </Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function WhatsAppTab({ onView }: { onView: () => void }) {
  const rows = [
    ["2026-06-22 09:10", "WhatsApp", "Hi, my withdrawal is delayed — any update?", "in", "Read"],
    ["2026-06-22 09:12", "WhatsApp", "Hi John, processing now. ETA 2h.", "out", "Read"],
    ["2026-06-21 18:30", "Telegram", "Thanks for the bonus!", "in", "Read"],
    [
      "2026-06-20 10:00",
      "WhatsApp",
      "Margin alert: please review your positions.",
      "out",
      "Delivered",
    ],
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        WhatsApp & Messaging
      </h3>
      <TableShell headers={["Date", "Platform", "Preview", "Direction", "Status"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="text-slate-500 dark:text-slate-400">{r[0]}</Td>
            <Td>
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                {r[1]}
              </span>
            </Td>
            <Td className="text-slate-900 dark:text-white max-w-md truncate">{r[2]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">
              {r[3] === "in" ? "Inbound" : "Outbound"}
            </Td>
            <Td>
              <StatusPill s={r[4]} />
            </Td>
            <Td className="text-right">
              <button
                onClick={onView}
                className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs font-medium"
              >
                Open Chat
              </button>
            </Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function NotificationsTab() {
  const rows = [
    ["2026-06-22 09:00", "Finance", "Withdrawal processing #WD-20841", "Push + Email", "Delivered"],
    ["2026-06-20 11:05", "Risk", "Margin Call on MT5 #500214", "Push + SMS", "Delivered"],
    [
      "2026-06-19 22:14",
      "Security",
      "New login detected from London, UK",
      "Push + Email",
      "Delivered",
    ],
    ["2026-06-18 09:30", "Compliance", "KYC reminder: 3 days remaining", "Email", "Opened"],
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        System Notifications
      </h3>
      <TableShell headers={["Date", "Type", "Title", "Channel", "Status"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="text-slate-500 dark:text-slate-400">{r[0]}</Td>
            <Td>
              <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400">
                {r[1]}
              </span>
            </Td>
            <Td className="text-slate-900 dark:text-white">{r[2]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[3]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[4]}</Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

function CampaignsTab() {
  const cps: { name: string; ch: string; status: string; metric: string; tone: string }[] = [
    {
      name: "Q2 Deposit Bonus",
      ch: "Email",
      status: "Sent",
      metric: "Open 64% · Click 22%",
      tone: "emerald",
    },
    {
      name: "VIP Webinar Invite",
      ch: "Email",
      status: "Sent",
      metric: "Open 78% · Click 41%",
      tone: "indigo",
    },
    { name: "Telegram Signals", ch: "WhatsApp", status: "Active", metric: "Read 92%", tone: "sky" },
    { name: "Re-engagement", ch: "SMS", status: "Scheduled", metric: "—", tone: "amber" },
  ];
  const toneMap: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
    indigo: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
    sky: "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-400",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  };
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Marketing Campaigns
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cps.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900/40"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900 dark:text-white">{c.name}</h4>
              <span
                className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${toneMap[c.tone]}`}
              >
                {c.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Channel: {c.ch}</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">{c.metric}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function PreferencesTab() {
  const consents = [
    { label: "Marketing emails", on: true },
    { label: "Transactional emails", on: true },
    { label: "SMS notifications", on: true },
    { label: "WhatsApp messages", on: true },
    { label: "Push notifications", on: false },
    { label: "Cold call permission", on: false },
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Communication Preferences
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Channel Preferences</h4>
          <dl className="space-y-3 text-sm">
            {[
              ["Preferred channel", "WhatsApp"],
              ["Language", "English (UK)"],
              ["Timezone", "Europe/London (UTC+1)"],
              ["Quiet hours", "22:00 - 08:00"],
              ["Frequency cap", "Max 3 / day"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-slate-500 dark:text-slate-400">{k}</dt>
                <dd className="font-medium text-slate-900 dark:text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Consent Settings</h4>
          <div className="space-y-4">
            {consents.map((c) => (
              <ConsentToggle key={c.label} label={c.label} initial={c.on} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
function ConsentToggle({ label, initial }: { label: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <button
        type="button"
        onClick={() => setOn(!on)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${on ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${on ? "translate-x-5" : "translate-x-1"}`}
        />
      </button>
    </label>
  );
}

function AnalyticsTab() {
  const bars = [
    40, 55, 30, 70, 90, 60, 80, 45, 65, 75, 50, 85, 95, 70, 60, 55, 80, 90, 65, 75, 40, 55, 70, 85,
    95, 80, 70, 60, 75, 90,
  ];
  const mix = [
    ["WhatsApp", 64],
    ["Email", 22],
    ["SMS", 9],
    ["Call", 5],
  ] as const;
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Communication Analytics
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-slate-900 dark:text-white">
              Activity (Last 30 days)
            </h4>
            <span className="text-xs text-slate-500">Emails · SMS · Calls</span>
          </div>
          <div className="flex items-end gap-1 h-40">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-gradient-to-t from-indigo-500 to-purple-500 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-900/40">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Channel Mix</h4>
          <div className="space-y-3">
            {mix.map(([ch, pc]) => (
              <div key={ch}>
                <div className="flex justify-between text-xs mb-1 text-slate-600 dark:text-slate-300">
                  <span>{ch}</span>
                  <span>{pc}%</span>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${pc}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function RiskTab() {
  const flags = [
    {
      t: "Unreachable client",
      d: "Last 4 attempts failed across phone & WhatsApp.",
      tone: "rose",
      sev: "Critical",
    },
    {
      t: "Email bounce detected",
      d: "john.doe@gmail.com bounced 2x in last 24h.",
      tone: "amber",
      sev: "High",
    },
    {
      t: "Compliance notice pending",
      d: "Client must acknowledge updated T&Cs by 28 Jun.",
      tone: "amber",
      sev: "High",
    },
  ];
  const cls: Record<string, string> = {
    rose: "border-rose-200 dark:border-rose-500/30 bg-rose-50/50 dark:bg-rose-500/5 text-rose-700 dark:text-rose-300",
    amber:
      "border-amber-200 dark:border-amber-500/30 bg-amber-50/50 dark:bg-amber-500/5 text-amber-700 dark:text-amber-300",
  };
  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Risk Flags</h3>
        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400">
          3 active
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flags.map((f) => (
          <div key={f.t} className={`rounded-xl border-2 p-5 ${cls[f.tone]}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-semibold">{f.t}</h4>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{f.d}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold">Severity: {f.sev}</span>
              <button className="text-xs font-medium hover:underline">Resolve →</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function TimelineTab() {
  const items: { t: string; h: string; d: string; tone: string }[] = [
    {
      t: "09:10 · Today",
      h: "WhatsApp received",
      d: "Client asked about withdrawal #WD-20841",
      tone: "bg-emerald-500",
    },
    {
      t: "09:00 · Today",
      h: "Email sent",
      d: "Withdrawal processing confirmation",
      tone: "bg-indigo-500",
    },
    {
      t: "Yesterday 18:00",
      h: "SMS delivered",
      d: "Withdrawal of $2,500 processed",
      tone: "bg-sky-500",
    },
    {
      t: "Yesterday 14:32",
      h: "Email opened",
      d: "KYC document verification required",
      tone: "bg-indigo-500",
    },
    {
      t: "2 days ago 11:05",
      h: "Risk alert",
      d: "Margin call on MT5 #500214",
      tone: "bg-rose-500",
    },
    {
      t: "2 days ago 10:15",
      h: "Inbound call",
      d: "06m 32s · Resolved by Sarah Wells",
      tone: "bg-purple-500",
    },
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
        Interaction Timeline
      </h3>
      <ol className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-6">
        {items.map((i) => (
          <li key={i.h + i.t} className="ml-6 relative">
            <span
              className={`absolute -left-[33px] mt-1.5 h-4 w-4 rounded-full ${i.tone} ring-4 ring-white dark:ring-slate-950`}
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">{i.t}</p>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{i.h}</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300">{i.d}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

function NotesTab() {
  const notes = [
    [
      "Sarah Wells",
      "2026-06-22",
      "Client prefers WhatsApp over email. Always responds within 10 min.",
    ],
    [
      "Mike Chen",
      "2026-06-19",
      "Escalated margin issue to risk team. Client agreed to deposit by Friday.",
    ],
    [
      "James Patel",
      "2026-06-12",
      "Discussed VIP upgrade. Client interested in Gold tier benefits.",
    ],
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Internal Notes</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900/40">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Add a note
            </label>
            <textarea
              rows={5}
              className="mt-2 w-full p-3 text-sm rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write something about this client..."
            />
            <div className="flex justify-between items-center mt-3">
              <select className="text-xs px-2 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <option>Internal</option>
                <option>Pinned</option>
              </select>
              <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Save Note
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-3">
          {notes.map((n) => (
            <div
              key={n[2]}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-white dark:bg-slate-900/40"
            >
              <div className="flex justify-between text-xs mb-2">
                <span className="font-medium text-slate-900 dark:text-white">{n[0]}</span>
                <span className="text-slate-500">{n[1]}</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">{n[2]}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AdminTab({ onDanger }: { onDanger: (a: string) => void }) {
  const safe = ["View communication", "Export history", "Add note", "Resend email"];
  const moderate = [
    "Change preferences",
    "Schedule follow-up",
    "Assign agent",
    "Send message",
    "Create ticket",
  ];
  const danger = [
    "Disable marketing",
    "Block communication",
    "Remove consent",
    "Force compliance notice",
    "Restrict channels",
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Admin Actions</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Safe Actions
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {safe.map((a) => (
              <button
                key={a}
                className="px-3 py-2.5 text-sm font-medium rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition text-left"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-3">
            Moderate Actions
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {moderate.map((a) => (
              <button
                key={a}
                className="px-3 py-2.5 text-sm font-medium rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30 transition text-left"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3">
            Dangerous Actions — Requires Confirmation
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {danger.map((a) => (
              <button
                key={a}
                onClick={() => onDanger(a)}
                className="px-3 py-2.5 text-sm font-medium rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30 transition text-left"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function AuditTab() {
  const rows = [
    [
      "Disabled marketing",
      "Sarah Wells",
      "Support Lead",
      "2026-06-22 10:42",
      "Channel: Email · Reason: client request",
    ],
    ["Added note", "Mike Chen", "Risk Analyst", "2026-06-19 16:01", "Note ID #N-2841"],
    ["Resent email", "System", "Auto-mailer", "2026-06-18 09:32", "Subject: KYC reminder"],
    [
      "Updated preferences",
      "James Patel",
      "VIP Manager",
      "2026-06-15 11:20",
      "Timezone changed to Europe/London",
    ],
    [
      "Blocked communication",
      "Compliance Bot",
      "System",
      "2026-06-12 08:00",
      "Reason: temporary hold during review",
    ],
  ];
  return (
    <>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Audit Trail</h3>
      <TableShell headers={["Action", "By", "Role", "Time", "Details"]}>
        {rows.map((r, i) => (
          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <Td className="font-medium text-slate-900 dark:text-white">{r[0]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[1]}</Td>
            <Td>
              <span className="px-2 py-0.5 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {r[2]}
              </span>
            </Td>
            <Td className="text-slate-500 dark:text-slate-400 whitespace-nowrap">{r[3]}</Td>
            <Td className="text-slate-600 dark:text-slate-300">{r[4]}</Td>
          </tr>
        ))}
      </TableShell>
    </>
  );
}

/* ----------- Drawers ----------- */
function EmailDrawer() {
  const steps = ["Queued", "Sent", "Delivered", "Opened", "Clicked"];
  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Overview</h4>
        <p className="text-sm text-slate-900 dark:text-white font-medium">
          Your withdrawal request #WD-20841 is being processed
        </p>
        <p className="text-xs text-slate-500 mt-1">
          2026-06-22 · 09:10 · Outbound · Department: Finance
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
          <p className="text-xs text-slate-500">From</p>
          <p className="font-medium">noreply@broker.com</p>
        </div>
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
          <p className="text-xs text-slate-500">To</p>
          <p className="font-medium">john.doe@gmail.com</p>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Content</h4>
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
          <p>Hi John,</p>
          <p>
            We've received your withdrawal request of <strong>$2,500</strong> from your MT5 Live
            account #500214. Your funds will be processed within 2 business hours.
          </p>
          <p>
            Reference: <strong>WD-20841</strong>
          </p>
          <p>— The Broker Team</p>
        </div>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-3">Delivery Journey</h4>
        <div className="flex items-center gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex-1">
              <div
                className={`h-1.5 rounded-full ${i < 4 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-700"}`}
              />
              <p className="text-[10px] mt-1.5 text-slate-600 dark:text-slate-400">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function CallDrawer() {
  return (
    <>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold">Sarah Wells · Inbound call</p>
            <p className="text-xs text-slate-500">2026-06-22 10:15 · 06m 32s · Resolved</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Recording</h4>
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700">
            <Play className="w-4 h-4 ml-0.5" />
          </button>
          <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-indigo-500" />
          </div>
          <span className="text-xs text-slate-500">02:11 / 06:32</span>
        </div>
      </div>
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
        <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Follow-up tasks</h4>
        <ul className="space-y-2 text-sm">
          {[
            ["Verify withdrawal status", true],
            ["Send confirmation email", false],
            ["Update CRM record", false],
          ].map(([t, d]) => (
            <li key={t as string} className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded border ${d ? "bg-emerald-500 border-emerald-500 text-white flex items-center justify-center" : "border-slate-300 dark:border-slate-600"}`}
              >
                {d ? <Check className="w-3 h-3" /> : null}
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function ChatDrawer() {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-3">
        Transcript · Sarah Wells
      </h4>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-xs text-slate-500">09:10 · John</span>
          <p className="bg-slate-100 dark:bg-slate-800 inline-block px-3 py-2 rounded-lg rounded-tl-none mt-1">
            Hi, my withdrawal hasn't arrived yet.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">09:11 · Sarah</span>
          <p className="bg-indigo-600 text-white inline-block px-3 py-2 rounded-lg rounded-tr-none mt-1">
            Checking now — one moment please.
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-500">09:14 · Sarah</span>
          <p className="bg-indigo-600 text-white inline-block px-3 py-2 rounded-lg rounded-tr-none mt-1">
            It's processing. ETA 2h. I'll email confirmation.
          </p>
        </div>
        <div>
          <span className="text-xs text-slate-500">09:15 · John</span>
          <p className="bg-slate-100 dark:bg-slate-800 inline-block px-3 py-2 rounded-lg rounded-tl-none mt-1">
            Perfect, thanks!
          </p>
        </div>
      </div>
    </div>
  );
}

function WhatsAppDrawer() {
  return (
    <div className="rounded-xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-500/5 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">
          W
        </div>
        <div>
          <p className="text-sm font-semibold">WhatsApp · +44 20 7946 1842</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">● Online</p>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <p className="bg-white dark:bg-slate-800 inline-block px-3 py-2 rounded-lg rounded-tl-none">
            Hi, my withdrawal is delayed — any update?
          </p>
          <span className="block text-[10px] text-slate-500 mt-1">09:10</span>
        </div>
        <div className="text-right">
          <p className="bg-emerald-500 text-white inline-block px-3 py-2 rounded-lg rounded-tr-none">
            Hi John, processing now. ETA 2h.
          </p>
          <span className="block text-[10px] text-slate-500 mt-1">09:12 ✓✓</span>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <input
          className="flex-1 px-3 py-2 text-sm rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
          placeholder="Type a reply..."
        />
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-1">
          <Send className="w-3.5 h-3.5" /> Send
        </button>
      </div>
    </div>
  );
}
