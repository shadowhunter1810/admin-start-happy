import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  CircleDollarSign,
  Download,
  FileText,
  Filter,
  Gift,
  History,
  LineChart,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { ClientShell } from "@/components/client/ClientShell";
import { KPI, Pill, Row, Section, Table, Td, Th } from "@/components/client/primitives";

export const Route = createFileRoute("/financial")({
  head: () => ({
    meta: [
      { title: "Financial · Arjun Raghunathan — Atlas CRM" },
      { name: "description", content: "Deposits, withdrawals, transfers, fees, and financial audit trail." },
    ],
  }),
  component: FinancialPage,
});

const TXNS = [
  ["TXN-8821049", "Deposit", "Wire transfer", "USD", "+$2,000", "Completed", "Low", "Today 08:12", "success", "in"],
  ["TXN-8819934", "Withdrawal", "Bank wire", "USD", "-$500", "Under Review", "Medium", "Yesterday 14:20", "warning", "out"],
  ["TXN-8818201", "Deposit", "USDT TRC-20", "USDT", "+$7,998", "Completed", "Medium", "3 days ago", "success", "in"],
  ["TXN-8816003", "Transfer", "Internal", "USD", "$800", "Completed", "Low", "5 days ago", "info", "in"],
  ["TXN-8812240", "Bonus", "Admin credit", "USD", "+$250", "Completed", "Low", "8 days ago", "success", "in"],
  ["TXN-8810120", "Fee", "Platform", "USD", "-$48", "Completed", "Low", "10 days ago", "muted", "out"],
  ["TXN-8808441", "Conversion", "FX engine", "EUR→USD", "$2,160", "Completed", "Low", "12 days ago", "info", "in"],
  ["TXN-8805901", "Withdrawal", "Visa card", "USD", "-$1,000", "Rejected", "High", "14 days ago", "destructive", "out"],
];

function FinancialPage() {
  return (
    <ClientShell>
      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-5">
        <KPI label="Total deposits" value="$72,000" sub="Lifetime · 48 txns" tone="success" icon={<ArrowDownRight className="h-4 w-4" />} />
        <KPI label="Total withdrawals" value="$10,800" sub="Lifetime · 12 txns" icon={<ArrowUpRight className="h-4 w-4" />} />
        <KPI label="Net cashflow" value="$61,200" sub="Deposits − withdrawals" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <KPI label="Pending W/D" value="$500" sub="1 under review" tone="warning" />
        <KPI label="Internal transfers" value="$24,600" sub="Wallet ↔ MT5" icon={<History className="h-4 w-4" />} />
        <KPI label="Total fees paid" value="$1,120" sub="Comm + swap + W/D" />
        <KPI label="Current equity" value="$19,080" sub="All accounts live" tone="success" />
        <KPI label="Open P&L" value="+$840" sub="Floating · 12 positions" tone="success" />
        <KPI label="Trading volume" value="$4.2M" sub="Lifetime · 847 lots" icon={<LineChart className="h-4 w-4" />} />
        <KPI label="Bonus credit" value="$270" sub="Active · 41% progress" icon={<Gift className="h-4 w-4" />} />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        {/* LEFT */}
        <div className="col-span-12 space-y-4 xl:col-span-8">
          {/* Transaction History */}
          <Section
            title="Transaction History"
            icon={<History className="h-4 w-4" />}
            right={
              <div className="flex items-center gap-1.5">
                <button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2">
                  <Filter className="h-3 w-3" /> Filter
                </button>
                <button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2">
                  <Download className="h-3 w-3" /> Export
                </button>
              </div>
            }
          >
            <div className="mb-3 flex flex-wrap gap-1 border-b border-border/60 pb-2">
              {["All", "Deposits", "Withdrawals", "Transfers", "Bonus", "Fees", "Conversion"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${
                    i === 0 ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <Table>
              <thead>
                <tr>
                  <Th>TXN ID</Th><Th>Type</Th><Th>Method</Th><Th>CCY</Th><Th className="text-right">Amount</Th><Th>Status</Th><Th>Risk</Th><Th>Date</Th>
                </tr>
              </thead>
              <tbody>
                {TXNS.map((r) => (
                  <tr key={r[0] as string} className="cursor-pointer hover:bg-surface/40">
                    <Td className="font-mono text-[10px] text-muted-foreground">{r[0]}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <div className={`grid h-6 w-6 place-items-center rounded ${r[9] === "in" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"}`}>
                          {r[9] === "in" ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                        </div>
                        <span className="font-medium">{r[1]}</span>
                      </div>
                    </Td>
                    <Td className="text-muted-foreground">{r[2]}</Td>
                    <Td>{r[3]}</Td>
                    <Td className={`text-right font-semibold ${String(r[4]).startsWith("+") ? "text-success" : String(r[4]).startsWith("-") ? "text-destructive" : ""}`}>{r[4]}</Td>
                    <Td><Pill tone={r[8] as any}>{r[5]}</Pill></Td>
                    <Td><Pill tone={r[6] === "Low" ? "success" : r[6] === "Medium" ? "warning" : "destructive"}>{r[6]}</Pill></Td>
                    <Td className="text-muted-foreground">{r[7]}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* TXN Drawer simulation */}
          <Section title="TXN-8821049 — Deposit" icon={<CircleDollarSign className="h-4 w-4" />} right={<Pill tone="success">Completed</Pill>}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <SubHeading>Overview</SubHeading>
                <Row label="Transaction ID" value="TXN-8821049" />
                <Row label="Type" value="Deposit" />
                <Row label="Status" value={<Pill tone="success">Completed</Pill>} />
                <Row label="Amount" value="+$2,000" />
                <Row label="Currency" value="USD" />
                <Row label="Method" value="Wire transfer" />
              </div>
              <div>
                <SubHeading>Source & Destination</SubHeading>
                <Row label="Source" value="HDFC Bank ****4821" />
                <Row label="Destination" value="Main wallet" />
                <SubHeading className="mt-4">Compliance</SubHeading>
                <Row label="AML check" value={<Pill tone="success">Cleared</Pill>} />
                <Row label="Risk level" value={<Pill tone="success">Low</Pill>} />
                <Row label="Approved by" value="System (auto)" />
              </div>
              <div>
                <SubHeading>Processing Timeline</SubHeading>
                <ol className="relative ml-2 space-y-3 border-l border-border/60 pl-4 text-xs">
                  {[
                    ["Initiated", "Client submitted wire transfer request", "08:05"],
                    ["Bank received", "HDFC Bank confirmed outgoing wire", "08:10"],
                    ["AML check", "Passed — no flags", "08:12"],
                    ["Cleared", "Funds credited to main wallet", "08:18"],
                  ].map(([t, d, time], i) => (
                    <li key={t} className="relative">
                      <span className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 border-background ${i < 3 ? "bg-success" : "bg-primary"}`} />
                      <div className="font-medium">{t}</div>
                      <div className="text-[11px] text-muted-foreground">{d}</div>
                      <div className="text-[10px] text-muted-foreground">{time}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-4 flex gap-2 border-t border-border/60 pt-3">
              <MiniBtn icon={<Download className="h-3 w-3" />}>Export PDF</MiniBtn>
              <MiniBtn>Copy ID</MiniBtn>
              <MiniBtn>Notify client</MiniBtn>
            </div>
          </Section>

          {/* Internal Transfers */}
          <Section title="Internal Transfer History" icon={<History className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Transfer ID</Th><Th>Date</Th><Th>From</Th><Th>To</Th><Th>CCY</Th><Th className="text-right">Amount</Th><Th>Status</Th><Th>By</Th></tr></thead>
              <tbody>
                {[
                  ["TRF-90231", "Today 09:12", "Main Wallet", "MT5-100421", "USD", "$1,500", "Completed", "Client", "success"],
                  ["TRF-90232", "Today 10:01", "Commission", "Main Wallet", "USD", "$2,180", "Completed", "Admin", "success"],
                  ["TRF-90240", "Today 10:48", "MT5-10293", "Main Wallet", "USD", "$500", "Pending", "Priya Nair", "warning"],
                  ["TRF-90244", "Yesterday", "Main Wallet", "Bonus Wallet", "USD", "$250", "Completed", "System", "success"],
                ].map((r) => (
                  <tr key={r[0] as string}>
                    <Td className="font-mono text-[10px] text-muted-foreground">{r[0]}</Td>
                    <Td className="text-muted-foreground">{r[1]}</Td>
                    <Td className="font-medium">{r[2]}</Td>
                    <Td className="font-medium">{r[3]}</Td>
                    <Td>{r[4]}</Td>
                    <Td className="text-right font-semibold">{r[5]}</Td>
                    <Td><Pill tone={r[8] as any}>{r[6]}</Pill></Td>
                    <Td className="text-muted-foreground">{r[7]}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Financial Notes */}
          <Section title="Financial Notes" icon={<FileText className="h-4 w-4" />}>
            <div className="space-y-3">
              {[
                { who: "Priya Nair", when: "Yesterday 14:30", tag: "Withdrawal", tone: "warning", text: "Withdrawal $500 escalated to finance. PEP approval blocking release. ETA 48h." },
                { who: "Rajan Mehta", when: "16 May", tag: "AML", tone: "destructive", text: "AML case triggered by 4 deposits in 72h. Total $8,200. EDD docs requested from client." },
                { who: "Admin", when: "1 May", tag: "IB Commission", tone: "info", text: "IB commission payout $2,180 processed. Plan B confirmed. Next payout 1 Jun." },
              ].map((n, i) => (
                <div key={i} className="rounded-lg border border-border/60 bg-surface/40 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">{n.who}</span>
                    <div className="flex items-center gap-2">
                      <Pill tone={n.tone as any}>{n.tag}</Pill>
                      <span className="text-[10px] text-muted-foreground">{n.when}</span>
                    </div>
                  </div>
                  <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{n.text}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-4 xl:col-span-4">
          <Section title="Deposit Analytics" icon={<ArrowDownRight className="h-4 w-4" />}>
            <Row label="Total deposits" value="$72,000" />
            <Row label="Average deposit" value="$1,500" />
            <Row label="Largest deposit" value="$20,000" />
            <Row label="Frequency" value="~4 / month" />
            <Row label="Preferred method" value="USDT TRC-20" />
            <Row label="Last deposit" value="$2,000 · Today 08:12" />
            <Row label="First deposit" value="$5,000 · 14 Mar 2022" />
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Wire", "USDT TRC-20", "Visa card", "Skrill", "SEPA"].map((m) => (
                <Pill key={m} tone="muted">{m}</Pill>
              ))}
            </div>
          </Section>

          <Section title="Withdrawal Analytics" icon={<ArrowUpRight className="h-4 w-4" />}>
            <Row label="Total withdrawals" value="$10,800" />
            <Row label="Average withdrawal" value="$900" />
            <Row label="Largest withdrawal" value="$3,000" />
            <Row label="Frequency" value="~1 / month" />
            <Row label="Preferred method" value="Bank wire" />
            <Row label="Last withdrawal" value="$500 · Yesterday" />
            <Row label="Pending amount" value="$500" badge={<Pill tone="warning">Manual review</Pill>} />
          </Section>

          <Section title="P&L & Equity" icon={<LineChart className="h-4 w-4" />}>
            <Row label="Equity (live)" value="$19,080" />
            <Row label="Account balance" value="$18,240" />
            <Row label="Floating P&L" value={<span className="text-success">+$840</span>} />
            <Row label="Daily P&L" value={<span className="text-success">+$590</span>} />
            <Row label="Monthly P&L" value={<span className="text-success">+$4,220</span>} />
            <Row label="Largest win" value={<span className="text-success">+$8,200</span>} />
            <Row label="Largest loss" value={<span className="text-destructive">-$4,100</span>} />
          </Section>

          <Section title="Bonus & Credits" icon={<Gift className="h-4 w-4" />}>
            <Row label="Active bonus" value="$270" />
            <Row label="Total credited" value="$1,250" />
            <Row label="Locked until" value="50 lots (29.5 remaining)" />
            <Row label="Turnover" value="20.5 / 50 lots · 41%" />
          </Section>

          <Section title="Financial Risk Alerts" icon={<ShieldAlert className="h-4 w-4" />}>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2"><TrendingDown className="mt-0.5 h-3.5 w-3.5 text-destructive" /> Rapid deposit pattern (R-14)</li>
              <li className="flex items-start gap-2"><TrendingDown className="mt-0.5 h-3.5 w-3.5 text-warning" /> Chargeback-linked card detected</li>
              <li className="flex items-start gap-2"><TrendingDown className="mt-0.5 h-3.5 w-3.5 text-warning" /> Mixed crypto funding source</li>
            </ul>
          </Section>

          <Section title="Treasury Actions" icon={<Wallet className="h-4 w-4" />}>
            <div className="grid grid-cols-2 gap-1.5">
              {["Approve W/D", "Request docs", "Notify client", "Export CSV"].map((a) => (
                <MiniBtn key={a}>{a}</MiniBtn>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {["Freeze W/D", "Reverse txn", "Manual adjust", "Block method"].map((a) => (
                <MiniBtn key={a} tone="destructive">{a}</MiniBtn>
              ))}
            </div>
          </Section>

          <Section title="Audit Trail" icon={<History className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Action</Th><Th>By</Th><Th>Time</Th></tr></thead>
              <tbody>
                {[
                  ["W/D pending", "System", "Yesterday"],
                  ["Deposit cleared", "System", "Today"],
                  ["AML flagged", "System", "16 May"],
                  ["Note added", "Priya Nair", "Yesterday"],
                  ["Commission paid", "System", "1 May"],
                  ["Balance adjusted", "Rahul Shah", "22 Apr"],
                ].map((r) => (
                  <tr key={r[0] as string}><Td>{r[0]}</Td><Td className="text-muted-foreground">{r[1]}</Td><Td className="text-muted-foreground">{r[2]}</Td></tr>
                ))}
              </tbody>
            </Table>
          </Section>
        </div>
      </div>
    </ClientShell>
  );
}

function SubHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ${className}`}>{children}</h3>;
}

function MiniBtn({ children, icon, tone = "default" }: { children: React.ReactNode; icon?: React.ReactNode; tone?: "default" | "destructive" }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
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
