import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bot,
  Clock,
  Download,
  Filter,
  History,
  Layers,
  LineChart,
  Search,
  ShieldAlert,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { ClientShell } from "@/components/client/ClientShell";
import { KPI, Pill, Row, Section, Table, Td, Th, Bar } from "@/components/client/primitives";
import { notify, confirmAction } from "@/lib/actions";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Trade History · Arjun Raghunathan — Atlas CRM" },
      { name: "description", content: "Open, closed and pending trades with execution and risk analytics." },
    ],
  }),
  component: HistoryPage,
});

type Trade = {
  ticket: string;
  acct: string;
  platform: "MT4" | "MT5";
  symbol: string;
  side: "Buy" | "Sell";
  vol: string;
  open: string;
  curr: string;
  pnl: string;
  status: "Open" | "Closed" | "Pending";
  source: "Manual" | "EA" | "Copy";
  time: string;
  win: boolean;
  tags: string[];
};

const TRADES: Trade[] = [
  { ticket: "#892311", acct: "MT5-100421", platform: "MT5", symbol: "XAU/USD", side: "Buy", vol: "5.00", open: "2352.12", curr: "2361.20", pnl: "+$4,540", status: "Open", source: "Manual", time: "Today 09:12", win: true, tags: ["Large Volume", "High Risk"] },
  { ticket: "#892355", acct: "MT5-88221", platform: "MT5", symbol: "BTC/USD", side: "Sell", vol: "1.00", open: "62,000", curr: "61,500", pnl: "+$500", status: "Closed", source: "Copy", time: "Yesterday", win: true, tags: ["Copy"] },
  { ticket: "#892400", acct: "MT4-77212", platform: "MT4", symbol: "EUR/USD", side: "Buy", vol: "2.00", open: "1.0842", curr: "1.0821", pnl: "-$420", status: "Open", source: "EA", time: "Today 10:05", win: false, tags: ["EA", "Negative P&L"] },
  { ticket: "#892390", acct: "MT5-100421", platform: "MT5", symbol: "GBP/JPY", side: "Buy", vol: "1.00", open: "188.420", curr: "188.220", pnl: "-$200", status: "Open", source: "Manual", time: "Today 11:20", win: false, tags: ["Negative P&L"] },
  { ticket: "#892422", acct: "MT5-100421", platform: "MT5", symbol: "NAS100", side: "Sell", vol: "0.50", open: "18,420", curr: "18,460", pnl: "-$20", status: "Open", source: "Manual", time: "Today 12:42", win: false, tags: ["Scalping", "Negative P&L"] },
  { ticket: "#800112", acct: "MT4-204112", platform: "MT4", symbol: "EUR/USD", side: "Buy", vol: "0.30", open: "1.08100", curr: "1.08640", pnl: "+$162", status: "Open", source: "Manual", time: "Yesterday", win: true, tags: ["Overnight"] },
  { ticket: "#880900", acct: "MT5-100421", platform: "MT5", symbol: "GBP/USD", side: "Sell", vol: "1.00", open: "1.26540", curr: "1.26120", pnl: "+$420", status: "Closed", source: "Manual", time: "4 days ago", win: true, tags: [] },
  { ticket: "#880612", acct: "MT5-100899", platform: "MT5", symbol: "USD/JPY", side: "Buy", vol: "3.00", open: "156.420", curr: "156.020", pnl: "-$1,200", status: "Closed", source: "EA", time: "5 days ago", win: false, tags: ["EA", "Negative P&L", "Large Volume"] },
  { ticket: "#P-9001", acct: "MT5-100421", platform: "MT5", symbol: "EUR/USD", side: "Buy", vol: "1.00", open: "1.0790", curr: "—", pnl: "—", status: "Pending", source: "Manual", time: "Awaiting trigger", win: false, tags: [] },
  { ticket: "#P-9002", acct: "MT5-100421", platform: "MT5", symbol: "XAU/USD", side: "Sell", vol: "2.00", open: "2,340.00", curr: "—", pnl: "—", status: "Pending", source: "Manual", time: "Awaiting trigger", win: false, tags: [] },
];

const STATUS_TABS = ["All", "Open", "Closed", "Pending"] as const;
const TAGS = ["Manual", "EA", "Copy", "High Risk", "Large Volume", "Scalping", "Overnight", "Negative P&L"];

const DRAWER_TABS = ["Overview", "Execution", "Position", "SL/TP history", "P&L & fees", "Margin impact", "Trade source", "EA details", "Copy details", "Risk analysis", "Compliance", "Timeline", "Related orders", "Audit trail"];

function HistoryPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_TABS)[number]>("All");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [selectedTicket, setSelectedTicket] = useState("#892311");
  const [drawerTab, setDrawerTab] = useState(DRAWER_TABS[0]);

  const filtered = useMemo(() => {
    return TRADES.filter((t) => {
      if (query && !t.ticket.toLowerCase().includes(query.toLowerCase()) && !t.symbol.toLowerCase().includes(query.toLowerCase()) && !t.acct.toLowerCase().includes(query.toLowerCase())) return false;
      if (status !== "All" && t.status !== status) return false;
      if (activeTags.length > 0 && !activeTags.every((tag) => t.tags.includes(tag) || t.source === tag)) return false;
      return true;
    });
  }, [query, status, activeTags]);

  const selected = TRADES.find((t) => t.ticket === selectedTicket) ?? TRADES[0];

  function toggleTag(tag: string) {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  return (
    <ClientShell>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <KPI label="Total trades" value="8,420" sub="Lifetime" icon={<Activity className="h-4 w-4" />} />
        <KPI label="Open positions" value={String(TRADES.filter((t) => t.status === "Open").length)} sub="Active" tone="info" />
        <KPI label="Closed trades" value="8,396" sub="Completed" />
        <KPI label="Pending orders" value={String(TRADES.filter((t) => t.status === "Pending").length)} sub="Limit / stop" tone="warning" />
        <KPI label="Total volume" value="12,420" sub="Lots" icon={<Layers className="h-4 w-4" />} />
        <KPI label="Net P&L" value="+$82,400" sub="All time" tone="success" icon={<TrendingUp className="h-4 w-4" />} />
        <KPI label="Win rate" value="61%" sub="Profit factor 1.82" tone="success" />
        <KPI label="Largest exposure" value="XAU/USD" sub="$84K" tone="warning" />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 xl:col-span-8">
          {/* Filters */}
          <Section
            title={`Global Trade Table — ${filtered.length} of ${TRADES.length}`}
            icon={<History className="h-4 w-4" />}
            right={
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search ticket / symbol / acct…"
                    className="h-7 w-56 rounded-md border border-border bg-surface pl-7 pr-2 text-[11px] outline-none placeholder:text-muted-foreground focus:border-ring"
                  />
                </div>
                <button onClick={() => { setQuery(""); setStatus("All"); setActiveTags([]); notify("Filters cleared"); }} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2"><Filter className="h-3 w-3" /> Reset</button>
                <button onClick={() => notify("Trades exported", `${filtered.length} rows exported as CSV.`, "success")} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2"><Download className="h-3 w-3" /> Export</button>
              </div>
            }
          >
            <div className="mb-3 flex flex-wrap gap-1 border-b border-border/60 pb-2">
              {STATUS_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setStatus(t)}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${status === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {t}
                </button>
              ))}
              <div className="mx-2 h-5 w-px bg-border" />
              {TAGS.map((t) => {
                const on = activeTags.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`rounded-md px-2 py-1 text-[10px] ${on ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <Table>
              <thead>
                <tr>
                  <Th>Ticket</Th><Th>Account</Th><Th>Platform</Th><Th>Symbol</Th><Th>Side</Th><Th>Vol</Th>
                  <Th className="text-right">Open</Th><Th className="text-right">Current/Close</Th><Th className="text-right">P&L</Th>
                  <Th>Status</Th><Th>Type</Th><Th>Time</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><Td className="text-muted-foreground" >No trades match the current filters.</Td></tr>
                )}
                {filtered.map((t) => (
                  <tr key={t.ticket} onClick={() => setSelectedTicket(t.ticket)} className={`cursor-pointer hover:bg-surface/40 ${selectedTicket === t.ticket ? "bg-primary/5" : ""}`}>
                    <Td className="font-mono text-[10px] font-semibold">{t.ticket}</Td>
                    <Td className="font-mono text-[10px] text-muted-foreground">{t.acct}</Td>
                    <Td><Pill tone="info">{t.platform}</Pill></Td>
                    <Td className="font-medium">{t.symbol}</Td>
                    <Td><Pill tone={t.side === "Buy" ? "success" : "destructive"}>{t.side}</Pill></Td>
                    <Td>{t.vol}</Td>
                    <Td className="text-right text-muted-foreground">{t.open}</Td>
                    <Td className="text-right">{t.curr}</Td>
                    <Td className={`text-right font-semibold ${t.pnl === "—" ? "" : t.win ? "text-success" : "text-destructive"}`}>{t.pnl}</Td>
                    <Td><Pill tone={t.status === "Open" ? "info" : t.status === "Closed" ? "muted" : "warning"}>{t.status}</Pill></Td>
                    <Td>
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                        {t.source === "EA" ? <Bot className="h-3 w-3" /> : t.source === "Copy" ? <Users className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                        {t.source}
                      </span>
                    </Td>
                    <Td className="text-muted-foreground">{t.time}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Trade Drawer */}
          <Section
            title={`${selected.ticket} — ${selected.symbol} ${selected.side}`}
            icon={<Activity className="h-4 w-4" />}
            right={
              <div className="flex gap-2">
                <Pill tone={selected.status === "Open" ? "info" : selected.status === "Closed" ? "muted" : "warning"}>{selected.status}</Pill>
                {selected.tags.slice(0, 2).map((t) => <Pill key={t} tone="warning">{t}</Pill>)}
              </div>
            }
          >
            <div className="mb-3 flex gap-1 overflow-x-auto border-b border-border/60 pb-2 text-[11px]">
              {DRAWER_TABS.map((t) => (
                <button key={t} onClick={() => setDrawerTab(t)} className={`whitespace-nowrap rounded-md px-2 py-1 font-medium ${drawerTab === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{t}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <SubHeading>Overview</SubHeading>
                <Row label="Ticket" value={selected.ticket} />
                <Row label="Account" value={selected.acct} />
                <Row label="Symbol" value={selected.symbol} />
                <Row label="Side" value={<Pill tone={selected.side === "Buy" ? "success" : "destructive"}>{selected.side}</Pill>} />
                <Row label="Volume" value={`${selected.vol} lots`} />
                <Row label="Open price" value={selected.open} />
                <Row label="Current price" value={selected.curr} />
                <Row label="Stop loss" value="2,340.00" />
                <Row label="Take profit" value="2,375.00" />
                <Row label="Open time" value={selected.time} />
                <Row label="Duration" value="3h 12m" />
                <Row label="Trade source" value={selected.source} />
              </div>
              <div>
                <SubHeading>P&L & Fees</SubHeading>
                <Row label="Floating P&L" value={<span className={`font-semibold ${selected.win ? "text-success" : "text-destructive"}`}>{selected.pnl}</span>} />
                <Row label="Swap" value={<span className="text-destructive">-$18</span>} />
                <Row label="Commission" value={<span className="text-destructive">-$24</span>} />
                <Row label="Net P&L" value={<span className={`font-semibold ${selected.win ? "text-success" : "text-destructive"}`}>{selected.win ? "+$4,498" : "-$462"}</span>} />

                <SubHeading className="mt-4">Margin Impact</SubHeading>
                <Row label="Required margin" value="$2,352" />
                <Row label="Margin level after" value="420%" badge={<Pill tone="success">Healthy</Pill>} />
                <Row label="Account exposure" value="$84K" />
                <Row label="Symbol exposure" value="$84K · 100%" />

                <SubHeading className="mt-4">Execution</SubHeading>
                <Row label="Execution type" value="Market" />
                <Row label="LP / Route" value="LP-1 (B-Book)" />
                <Row label="Latency" value="34 ms" />
                <Row label="Slippage" value="0.4 pips" />
                <Row label="Requotes" value="0" />
              </div>
              <div>
                <SubHeading>Risk Analysis</SubHeading>
                <Row label="Trade risk" value={<Pill tone="warning">Medium</Pill>} />
                <Row label="Abnormal volume" value={<Pill tone="warning">Yes</Pill>} />
                <Row label="Scalping detection" value={<Pill tone="success">No</Pill>} />
                <Row label="Latency arb." value={<Pill tone="success">No</Pill>} />
                <Row label="Toxic flow score" value="0.18 / 1.00" />
                <Row label="AML flag" value={<Pill tone="success">None</Pill>} />
                <Row label="Sanctions" value={<Pill tone="success">Passed</Pill>} />

                <SubHeading className="mt-4">Timeline</SubHeading>
                <ol className="relative ml-2 space-y-2 border-l border-border/60 pl-4 text-[11px]">
                  {[
                    ["09:12", "Order opened — 5.0 lots @ 2,352.12"],
                    ["09:14", "Margin usage +$2,352"],
                    ["10:30", "Price hits +$2,000 floating P&L"],
                    ["12:24", `Current floating ${selected.pnl}`],
                  ].map(([t, d]) => (
                    <li key={t} className="relative">
                      <span className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="font-medium">{t}</div>
                      <div className="text-muted-foreground">{d}</div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/60 pt-3">
              <MiniBtn onClick={() => notify("Modify SL/TP", `Editor opened for ${selected.ticket}.`)}>Modify SL/TP</MiniBtn>
              <MiniBtn onClick={() => notify("Trade flagged", `${selected.ticket} marked for review.`, "warning")}>Flag for review</MiniBtn>
              <MiniBtn onClick={() => { navigator.clipboard?.writeText(selected.ticket); notify("Copied", `${selected.ticket} ticket copied.`, "success"); }}>Copy ticket</MiniBtn>
              <MiniBtn onClick={() => notify("Statement exported", `PDF generated for ${selected.ticket}.`, "success")}>Export PDF</MiniBtn>
              <MiniBtn tone="destructive" onClick={() => confirmAction(`Force close ${selected.ticket}`, `Close at market — net ${selected.pnl}.`, "danger")}>Force close</MiniBtn>
            </div>
          </Section>

          {/* Symbol Analytics */}
          <Section title="Symbol Analytics" icon={<BarChart3 className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Symbol</Th><Th className="text-right">Trades</Th><Th className="text-right">Volume</Th><Th className="text-right">Net P&L</Th><Th className="text-right">Win %</Th><Th>Exposure</Th></tr></thead>
              <tbody>
                {[
                  ["XAU/USD", "420", "820 Lots", "+$12,400", "64%", "High", "destructive"],
                  ["EUR/USD", "1,820", "2,420 Lots", "+$24,100", "62%", "Medium", "warning"],
                  ["BTC/USD", "82", "42 Lots", "-$4,100", "38%", "Very High", "destructive"],
                  ["GBP/JPY", "240", "320 Lots", "+$3,200", "58%", "Low", "success"],
                  ["NAS100", "118", "92 Lots", "+$1,800", "55%", "Low", "success"],
                  ["USD/JPY", "612", "780 Lots", "+$5,420", "60%", "Low", "success"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <Td className="font-medium">{r[0]}</Td>
                    <Td className="text-right">{r[1]}</Td>
                    <Td className="text-right">{r[2]}</Td>
                    <Td className={`text-right font-semibold ${String(r[3]).startsWith("+") ? "text-success" : "text-destructive"}`}>{r[3]}</Td>
                    <Td className="text-right">{r[4]}</Td>
                    <Td><Pill tone={r[6] as any}>{r[5]}</Pill></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Daily P&L breakdown */}
          <Section title="Daily P&L (last 10 sessions)" icon={<LineChart className="h-4 w-4" />}>
            <div className="grid grid-cols-10 gap-1.5">
              {[+590, +1240, -320, +820, +180, -1100, +2200, +420, -240, +780].map((v, i) => {
                const pct = Math.min(100, Math.abs(v) / 25);
                return (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <div className="relative flex h-24 w-full items-end justify-center">
                      <div className={`w-full rounded-sm ${v >= 0 ? "bg-success/70" : "bg-destructive/70"}`} style={{ height: `${pct}%` }} />
                    </div>
                    <div className={`text-[9px] num ${v >= 0 ? "text-success" : "text-destructive"}`}>{v >= 0 ? "+" : ""}{v}</div>
                    <div className="text-[9px] text-muted-foreground">D-{9 - i}</div>
                  </div>
                );
              })}
            </div>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-4 xl:col-span-4">
          <Section title="Trade Analytics" icon={<LineChart className="h-4 w-4" />}>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["61%", "Win rate", "success"],
                ["1.82", "Profit factor", "success"],
                ["+$420", "Avg win", "success"],
                ["-$220", "Avg loss", "destructive"],
                ["1.4", "Avg lot", "default"],
                ["3h 42m", "Avg hold", "default"],
                ["+$2.2K", "Best day", "success"],
                ["-$1.1K", "Worst day", "destructive"],
              ].map(([v, l, tone]) => (
                <div key={l} className="rounded-md border border-border/50 bg-surface/40 p-2 text-center">
                  <div className={`text-base font-semibold num ${tone === "success" ? "text-success" : tone === "destructive" ? "text-destructive" : ""}`}>{v}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Win / Loss distribution</div>
              <div className="flex h-2.5 overflow-hidden rounded-full">
                <div className="bg-success" style={{ width: "61%" }} />
                <div className="bg-destructive" style={{ width: "39%" }} />
              </div>
              <div className="flex justify-between text-[10px] num">
                <span className="text-success">5,134 wins · 61%</span>
                <span className="text-destructive">3,286 losses · 39%</span>
              </div>
            </div>
          </Section>

          <Section title="Pending Orders" icon={<Clock className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Order</Th><Th>Symbol</Th><Th>Type</Th><Th>Trigger</Th><Th>{""}</Th></tr></thead>
              <tbody>
                {[
                  ["#P-9001", "EUR/USD", "Buy Limit", "1.0790"],
                  ["#P-9002", "XAU/USD", "Sell Stop", "2,340.00"],
                  ["#P-9003", "BTC/USD", "Buy Stop", "63,800"],
                  ["#P-9004", "NAS100", "Sell Limit", "18,520"],
                ].map((r) => (
                  <tr key={r[0] as string}>
                    <Td className="font-mono text-[10px]">{r[0]}</Td>
                    <Td className="font-medium">{r[1]}</Td>
                    <Td><Pill tone="info">{r[2]}</Pill></Td>
                    <Td className="num">{r[3]}</Td>
                    <Td className="text-right">
                      <button onClick={() => confirmAction(`Cancel ${r[0]}`, `${r[1]} ${r[2]} @ ${r[3]}`)} className="text-[10px] text-muted-foreground hover:text-destructive">Cancel</button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          <Section title="Execution Analytics" icon={<Zap className="h-4 w-4" />}>
            <Row label="Avg execution speed" value="42 ms" />
            <Row label="Median latency" value="38 ms" />
            <Row label="Avg slippage" value="0.6 pips" />
            <Row label="Requotes" value="0.2%" />
            <Row label="Rejections" value="0.04%" />
            <Row label="Fill ratio" value="99.96%" />
            <div className="mt-2 text-[10px] uppercase tracking-wider text-muted-foreground">Liquidity quality</div>
            <Bar value={88} tone="success" />
            <div className="mt-1 text-[10px] text-muted-foreground">88 / 100 · excellent fill quality</div>
          </Section>

          <Section title="Copy Trade Activity" icon={<Users className="h-4 w-4" />}>
            <Row label="Role" value="Follower" />
            <Row label="Master" value="PRO-8821" />
            <Row label="Allocation" value="40%" />
            <Row label="Copied trades" value="218" />
            <Row label="P&L from copy" value={<span className="text-success">+$3,420</span>} />
            <Row label="Last copied" value="2h ago" />
          </Section>

          <Section title="Risk Trade Monitoring" icon={<ShieldAlert className="h-4 w-4" />}>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-warning" />Excessive leverage</span><Pill tone="warning">Medium</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-destructive" />Margin risk</span><Pill tone="destructive">High</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-warning" />Toxic scalping</span><Pill tone="warning">Medium</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-destructive" />Abnormal lot size</span><Pill tone="destructive">High</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-warning" />Overnight exposure</span><Pill tone="warning">Medium</Pill></li>
            </ul>
          </Section>

          <Section title="Admin Actions" icon={<Activity className="h-4 w-4" />}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Safe</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {[
                ["View logs", "Audit log viewer opened."],
                ["Export statement", "PDF generated."],
                ["Add note", "Note pinned to trade."],
                ["Notify client", "Email sent to client."],
              ].map(([a, m]) => <MiniBtn key={a} onClick={() => notify(a, m, "success")}>{a}</MiniBtn>)}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider">Moderate</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Modify SL/TP", "Disable EA", "Restrict symbol", "Flag trade"].map((a) => <MiniBtn key={a} onClick={() => confirmAction(a, `Apply to ${selected.ticket}?`)}>{a}</MiniBtn>)}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-destructive/80">Danger zone</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Force close", "Disable trading", "Lock account", "Escalate"].map((a) => <MiniBtn key={a} tone="destructive" onClick={() => confirmAction(a, `${a} on ${selected.ticket}?`, "danger")}>{a}</MiniBtn>)}
            </div>
          </Section>
        </div>
      </div>
    </ClientShell>
  );
}

function SubHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`mb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground ${className}`}>{children}</h3>;
}

function MiniBtn({ children, tone = "default", onClick }: { children: React.ReactNode; tone?: "default" | "destructive"; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${
        tone === "destructive"
          ? "border-destructive/40 bg-destructive/10 text-destructive hover:bg-destructive/20"
          : "border-border bg-surface hover:bg-surface-2"
      }`}
    >
      {children}
    </button>
  );
}
