// Enterprise Support & Tickets — mock dataset + types
export type TicketStatus = "open" | "in_progress" | "waiting_client" | "escalated" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "critical";
export type TicketCategory =
  | "Deposit" | "Withdrawal" | "KYC" | "AML" | "Trading Platform"
  | "Account" | "Bonus" | "Copy Trading" | "IB / Affiliate" | "Technical" | "Compliance";
export type Department = "Support" | "Compliance" | "Finance" | "Risk" | "Technical" | "Dealing";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type EscalationLevel = "L1" | "L2" | "L3" | "Management" | "Compliance" | "Risk" | "Finance" | "Technical";

export interface Agent { id: string; name: string; role: string; team: Department; avatar: string; online: boolean; }
export interface Attachment {
  id: string; name: string; size: string; type: "pdf" | "docx" | "jpg" | "png" | "zip" | "csv";
  uploadedBy: string; uploadedAt: string; virusScan: "clean" | "scanning" | "infected"; versions: number;
}
export interface Message {
  id: string; author: string; role: "client" | "agent" | "system" | "bot";
  text: string; at: string; internal?: boolean; attachments?: string[];
}
export interface OwnershipEvent { id: string; at: string; action: "Created" | "Assigned" | "Transferred" | "Escalated" | "Reassigned" | "Merged" | "Closed" | "Reopened"; from?: string; to?: string; by: string; reason?: string; }
export interface AuditEntry { id: string; at: string; action: string; by: string; role: string; ip: string; before?: string; after?: string; reason?: string; }
export interface SLA {
  firstResponseTargetMin: number;
  firstResponseActualMin: number | null;
  resolutionTargetH: number;
  resolutionActualH: number | null;
  breached: boolean;
  breachReason?: string;
  dueAt: string;
}
export interface RelatedRecord { id: string; type: "Client" | "Trading Account" | "Transaction" | "Deposit" | "Withdrawal" | "Complaint" | "AML Case" | "KYC Case" | "Copy Trading" | "Affiliate" | "IB"; label: string; meta?: string; }
export interface InternalNote { id: string; author: string; at: string; text: string; pinned?: boolean; priority?: boolean; mentions?: string[]; }
export interface TimelineEvent { id: string; at: string; kind: "created" | "assigned" | "transferred" | "escalated" | "client_reply" | "agent_reply" | "sla_breach" | "resolved" | "closed" | "note"; label: string; by?: string; }
export interface CSAT { score: number; nps: number; stars: number; comment: string; agent: string; resolutionH: number; }
export interface Escalation { id: string; level: EscalationLevel; reason: string; by: string; at: string; rule: "Auto" | "Manual" | "SLA"; status: "Active" | "Resolved"; }

export interface Ticket {
  id: string;
  subject: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  department: Department;
  clientId: string;
  clientName: string;
  clientEmail: string;
  accountNumber: string;
  tradingAccount: string;
  country: string;
  language: string;
  vip: boolean;
  riskLevel: RiskLevel;
  compliance: boolean;
  amlReview?: boolean;
  assignedAgent: string;
  assignedTeam: Department;
  currentOwner: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  lastResponse: string;
  escalation: { active: boolean; level?: EscalationLevel };
  sla: SLA;
  messages: Message[];
  ownership: OwnershipEvent[];
  attachments: Attachment[];
  related: RelatedRecord[];
  escalations: Escalation[];
  notes: InternalNote[];
  timeline: TimelineEvent[];
  audit: AuditEntry[];
  csat?: CSAT;
  reopened?: number;
  source: "Email" | "Live Chat" | "Phone" | "Portal" | "API";
}

export interface PhoneCall {
  id: string; clientName: string; clientId: string; agent: string; durationSec: number;
  direction: "Inbound" | "Outbound"; outcome: "Resolved" | "Callback" | "Escalated" | "Voicemail";
  at: string; recordingUrl?: string; ticketId?: string;
}
export interface ChatSession {
  id: string; clientName: string; agent: string; status: "Active" | "Waiting" | "Closed";
  startedAt: string; lastMessage: string; messages: number; ticketId?: string;
}
export interface Complaint {
  id: string; clientName: string; category: "Service" | "Trading" | "Payment" | "Regulatory";
  severity: "Low" | "Medium" | "High" | "Critical"; status: "Open" | "Investigating" | "Closed";
  filedAt: string; regulator?: string; ticketId?: string;
}

const AGENTS: Agent[] = [
  { id: "a1", name: "Sarah Mendoza", role: "Senior Agent", team: "Support", avatar: "SM", online: true },
  { id: "a2", name: "Daniel Okafor", role: "Compliance Officer", team: "Compliance", avatar: "DO", online: true },
  { id: "a3", name: "Priya Raman", role: "Finance Lead", team: "Finance", avatar: "PR", online: false },
  { id: "a4", name: "Lucas Hartmann", role: "Risk Analyst", team: "Risk", avatar: "LH", online: true },
  { id: "a5", name: "Mei Tanaka", role: "Tech Support", team: "Technical", avatar: "MT", online: true },
  { id: "a6", name: "Omar El-Sayed", role: "Dealing Desk", team: "Dealing", avatar: "OE", online: false },
];
export const AGENT_LIST = AGENTS;

const COUNTRIES = ["AE", "GB", "DE", "SG", "AU", "ZA", "BR", "JP", "CA", "FR", "ES", "NG", "IN", "CH"];
const LANGS = ["EN", "AR", "DE", "ES", "FR", "JA", "PT", "ZH"];
const CATEGORIES: TicketCategory[] = ["Deposit", "Withdrawal", "KYC", "AML", "Trading Platform", "Account", "Bonus", "Copy Trading", "IB / Affiliate", "Technical", "Compliance"];
const PRIORITIES: TicketPriority[] = ["low", "medium", "high", "critical"];
const STATUSES: TicketStatus[] = ["open", "in_progress", "waiting_client", "escalated", "resolved", "closed"];
const SOURCES: Ticket["source"][] = ["Email", "Live Chat", "Phone", "Portal", "API"];

const SUBJECTS = [
  "Withdrawal pending over 72h via SWIFT",
  "MT5 password reset not received",
  "Bonus credit not applied after deposit",
  "Copy trading subscription failed silently",
  "KYC document rejected — passport blur",
  "AML source-of-funds request",
  "Slippage complaint on EURUSD news event",
  "Margin call dispute — cTrader",
  "IB commission shortfall Q3",
  "Negative balance after CHF flash move",
  "Crypto deposit credited to wrong wallet",
  "Account closure request — GDPR",
  "Two-factor lockout",
  "Platform downtime during NFP",
  "Spread widened beyond advertised",
  "Withdrawal rejected — name mismatch",
  "Bridge latency to LP",
  "Affiliate tracking link broken",
];

const FIRST_NAMES = ["Alex", "Maria", "Jin", "Fatima", "Hiroshi", "Anna", "Liam", "Noor", "Pablo", "Sofia", "Ravi", "Yara", "Hugo", "Aiko"];
const LAST_NAMES = ["Chen", "Garcia", "Yamada", "Kovacs", "Andersen", "Singh", "Ferreira", "Hassan", "Walker", "Dubois", "Müller", "Costa"];

function rand<T>(arr: T[], seed: number): T { return arr[seed % arr.length]; }
function pseudoDate(daysAgo: number, hour = 9): string {
  const d = new Date(Date.UTC(2025, 5, 19, hour, 0, 0));
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString();
}

function buildTicket(i: number): Ticket {
  const status = rand(STATUSES, i * 3 + 1);
  const priority = rand(PRIORITIES, i * 7 + 2);
  const category = rand(CATEGORIES, i * 5);
  const agent = rand(AGENTS, i);
  const team = agent.team;
  const subject = rand(SUBJECTS, i);
  const fn = rand(FIRST_NAMES, i * 2);
  const ln = rand(LAST_NAMES, i * 3);
  const clientName = `${fn} ${ln}`;
  const vip = i % 9 === 0;
  const compliance = category === "AML" || category === "Compliance" || i % 11 === 0;
  const breached = i % 8 === 0;
  const createdDaysAgo = (i % 21) + 1;

  const messages: Message[] = [
    { id: `m-${i}-1`, author: clientName, role: "client", text: `Hi team, I have an issue: ${subject.toLowerCase()}. Please help urgently.`, at: pseudoDate(createdDaysAgo, 9) },
    { id: `m-${i}-2`, author: "System", role: "system", text: `Ticket auto-routed to ${team} based on category "${category}".`, at: pseudoDate(createdDaysAgo, 9) },
    { id: `m-${i}-3`, author: agent.name, role: "agent", text: `Hello ${fn}, thanks for reaching out. I'm reviewing your account now and will revert within the SLA window.`, at: pseudoDate(createdDaysAgo, 10) },
    ...(i % 3 === 0 ? [{ id: `m-${i}-4`, author: clientName, role: "client" as const, text: `Any update? This is blocking my trading.`, at: pseudoDate(Math.max(createdDaysAgo - 1, 0), 14) }] : []),
    ...(i % 4 === 0 ? [{ id: `m-${i}-5`, author: agent.name, role: "agent" as const, internal: true, text: `Internal: Escalating to ${team === "Support" ? "Finance" : "L2"} — needs override.`, at: pseudoDate(Math.max(createdDaysAgo - 1, 0), 15) }] : []),
  ];

  return {
    id: `TKT-${10240 + i}`,
    subject,
    category,
    priority,
    status,
    department: team,
    clientId: `CL-${50000 + i}`,
    clientName,
    clientEmail: `${fn}.${ln}@mail.com`.toLowerCase(),
    accountNumber: `ACC-${800000 + i * 17}`,
    tradingAccount: `MT5-${900000 + i * 31}`,
    country: rand(COUNTRIES, i),
    language: rand(LANGS, i),
    vip,
    riskLevel: (["low", "medium", "high", "critical"] as RiskLevel[])[i % 4],
    compliance,
    amlReview: i % 13 === 0,
    assignedAgent: agent.name,
    assignedTeam: team,
    currentOwner: agent.name,
    createdBy: i % 5 === 0 ? clientName : agent.name,
    createdAt: pseudoDate(createdDaysAgo, 9),
    updatedAt: pseudoDate(Math.max(createdDaysAgo - 1, 0), 16),
    lastResponse: pseudoDate(Math.max(createdDaysAgo - 1, 0), 16),
    escalation: { active: status === "escalated", level: status === "escalated" ? "L2" : undefined },
    source: rand(SOURCES, i),
    sla: {
      firstResponseTargetMin: vip ? 15 : 60,
      firstResponseActualMin: breached ? null : (vip ? 12 : 38),
      resolutionTargetH: vip ? 4 : 24,
      resolutionActualH: status === "resolved" || status === "closed" ? (vip ? 3 : 18) : null,
      breached,
      breachReason: breached ? "Awaiting compliance approval beyond SLA" : undefined,
      dueAt: pseudoDate(-1, 12),
    },
    messages,
    ownership: [
      { id: `o-${i}-1`, at: pseudoDate(createdDaysAgo, 9), action: "Created", by: clientName, to: "Support Queue" },
      { id: `o-${i}-2`, at: pseudoDate(createdDaysAgo, 9), action: "Assigned", by: "Router Bot", to: agent.name },
      ...(status === "escalated" ? [{ id: `o-${i}-3`, at: pseudoDate(Math.max(createdDaysAgo - 1, 0), 11), action: "Escalated" as const, by: agent.name, from: agent.name, to: "Compliance L2", reason: "Regulatory review" }] : []),
    ],
    attachments: [
      { id: `att-${i}-1`, name: "passport.pdf", size: "412 KB", type: "pdf", uploadedBy: clientName, uploadedAt: pseudoDate(createdDaysAgo, 9), virusScan: "clean", versions: 1 },
      ...(i % 2 === 0 ? [{ id: `att-${i}-2`, name: "bank-statement.pdf", size: "1.2 MB", type: "pdf" as const, uploadedBy: clientName, uploadedAt: pseudoDate(createdDaysAgo, 10), virusScan: "clean" as const, versions: 2 }] : []),
      ...(i % 3 === 0 ? [{ id: `att-${i}-3`, name: "screenshot.png", size: "284 KB", type: "png" as const, uploadedBy: clientName, uploadedAt: pseudoDate(createdDaysAgo, 11), virusScan: "scanning" as const, versions: 1 }] : []),
    ],
    related: [
      { id: `rel-${i}-1`, type: "Client", label: clientName, meta: `CL-${50000 + i}` },
      { id: `rel-${i}-2`, type: "Trading Account", label: `MT5-${900000 + i * 31}`, meta: "Live · USD" },
      ...(category === "Deposit" || category === "Withdrawal" ? [{ id: `rel-${i}-3`, type: (category === "Deposit" ? "Deposit" : "Withdrawal") as RelatedRecord["type"], label: `TXN-${700000 + i}`, meta: "USD 2,500" }] : []),
      ...(category === "KYC" ? [{ id: `rel-${i}-4`, type: "KYC Case" as const, label: `KYC-${i + 1000}`, meta: "Pending review" }] : []),
      ...(category === "AML" ? [{ id: `rel-${i}-5`, type: "AML Case" as const, label: `AML-${i + 2000}`, meta: "Open" }] : []),
    ],
    escalations: status === "escalated" ? [
      { id: `e-${i}-1`, level: "L2", reason: "SLA breach risk", by: agent.name, at: pseudoDate(createdDaysAgo, 11), rule: breached ? "SLA" : "Manual", status: "Active" },
    ] : [],
    notes: [
      { id: `n-${i}-1`, author: agent.name, at: pseudoDate(createdDaysAgo, 10), text: "Verified client identity via secondary email. Proceeding.", pinned: i % 7 === 0, mentions: i % 5 === 0 ? ["@compliance"] : [] },
    ],
    timeline: [
      { id: `t-${i}-1`, at: pseudoDate(createdDaysAgo, 9), kind: "created", label: "Ticket created", by: clientName },
      { id: `t-${i}-2`, at: pseudoDate(createdDaysAgo, 9), kind: "assigned", label: `Assigned to ${agent.name}`, by: "Router Bot" },
      { id: `t-${i}-3`, at: pseudoDate(createdDaysAgo, 10), kind: "agent_reply", label: "Agent replied", by: agent.name },
      ...(breached ? [{ id: `t-${i}-4`, at: pseudoDate(Math.max(createdDaysAgo - 1, 0), 9), kind: "sla_breach" as const, label: "SLA breached — first response", by: "System" }] : []),
      ...(status === "resolved" || status === "closed" ? [{ id: `t-${i}-5`, at: pseudoDate(0, 16), kind: status as "resolved" | "closed", label: `Ticket ${status}`, by: agent.name }] : []),
    ],
    audit: [
      { id: `au-${i}-1`, at: pseudoDate(createdDaysAgo, 9), action: "ticket.create", by: clientName, role: "Client", ip: "203.0.113.4" },
      { id: `au-${i}-2`, at: pseudoDate(createdDaysAgo, 9), action: "ticket.assign", by: "Router Bot", role: "System", ip: "10.0.0.2", after: agent.name },
      { id: `au-${i}-3`, at: pseudoDate(createdDaysAgo, 10), action: "ticket.reply", by: agent.name, role: "Agent", ip: "10.0.4.21" },
      ...(status === "escalated" ? [{ id: `au-${i}-4`, at: pseudoDate(Math.max(createdDaysAgo - 1, 0), 11), action: "ticket.escalate", by: agent.name, role: "Agent", ip: "10.0.4.21", before: "L1", after: "L2", reason: "Regulatory" }] : []),
    ],
    csat: status === "resolved" || status === "closed" ? {
      score: 4 + (i % 2 ? 0 : 1), nps: 8 + (i % 3), stars: 4 + (i % 2 ? 0 : 1),
      comment: "Quick and professional handling. Thanks!", agent: agent.name, resolutionH: vip ? 3 : 18,
    } : undefined,
    reopened: i % 14 === 0 ? 1 : 0,
  };
}

export const TICKETS: Ticket[] = Array.from({ length: 42 }, (_, i) => buildTicket(i));

export const CALLS: PhoneCall[] = Array.from({ length: 14 }, (_, i) => ({
  id: `CALL-${5000 + i}`,
  clientName: `${rand(FIRST_NAMES, i)} ${rand(LAST_NAMES, i + 2)}`,
  clientId: `CL-${50000 + i}`,
  agent: rand(AGENTS, i).name,
  durationSec: 60 + (i * 53) % 1200,
  direction: i % 2 ? "Inbound" : "Outbound",
  outcome: (["Resolved", "Callback", "Escalated", "Voicemail"] as const)[i % 4],
  at: pseudoDate(i % 10, 9 + (i % 8)),
  recordingUrl: "#",
  ticketId: i % 3 === 0 ? TICKETS[i % TICKETS.length].id : undefined,
}));

export const CHATS: ChatSession[] = Array.from({ length: 10 }, (_, i) => ({
  id: `CHAT-${3000 + i}`,
  clientName: `${rand(FIRST_NAMES, i + 1)} ${rand(LAST_NAMES, i + 3)}`,
  agent: rand(AGENTS, i).name,
  status: (["Active", "Waiting", "Closed"] as const)[i % 3],
  startedAt: pseudoDate(i % 5, 9 + i),
  lastMessage: ["I need help with my withdrawal", "Hello?", "Thanks, sorted!", "Can you check my MT5?", "Bonus missing"][i % 5],
  messages: 4 + (i * 3) % 20,
  ticketId: TICKETS[i].id,
}));

export const COMPLAINTS: Complaint[] = Array.from({ length: 8 }, (_, i) => ({
  id: `CMP-${2000 + i}`,
  clientName: `${rand(FIRST_NAMES, i)} ${rand(LAST_NAMES, i + 4)}`,
  category: (["Service", "Trading", "Payment", "Regulatory"] as const)[i % 4],
  severity: (["Low", "Medium", "High", "Critical"] as const)[i % 4],
  status: (["Open", "Investigating", "Closed"] as const)[i % 3],
  filedAt: pseudoDate(i, 10),
  regulator: i % 4 === 3 ? "FCA" : undefined,
  ticketId: TICKETS[i].id,
}));

export const STATUS_META: Record<TicketStatus, { label: string; tone: string; dot: string }> = {
  open: { label: "Open", tone: "bg-info/15 text-info border-info/30", dot: "bg-info" },
  in_progress: { label: "In Progress", tone: "bg-warning/15 text-warning border-warning/30", dot: "bg-warning" },
  waiting_client: { label: "Waiting Client", tone: "bg-[oklch(0.74_0.16_50)]/15 text-[oklch(0.65_0.16_50)] border-[oklch(0.74_0.16_50)]/30", dot: "bg-[oklch(0.74_0.16_50)]" },
  escalated: { label: "Escalated", tone: "bg-destructive/15 text-destructive border-destructive/30", dot: "bg-destructive" },
  resolved: { label: "Resolved", tone: "bg-success/15 text-success border-success/30", dot: "bg-success" },
  closed: { label: "Closed", tone: "bg-muted text-muted-foreground border-border", dot: "bg-muted-foreground" },
};

export const PRIORITY_META: Record<TicketPriority, { label: string; tone: string }> = {
  low: { label: "Low", tone: "bg-muted text-muted-foreground" },
  medium: { label: "Medium", tone: "bg-info/15 text-info" },
  high: { label: "High", tone: "bg-warning/20 text-warning" },
  critical: { label: "Critical", tone: "bg-destructive/15 text-destructive" },
};

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}
