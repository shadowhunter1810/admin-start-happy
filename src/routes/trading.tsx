import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Briefcase,
  Copy,
  Download,
  History,
  Layers,
  Monitor,
  Search,
  Server,
  Settings2,
  ShieldAlert,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";
import { ClientShell } from "@/components/client/ClientShell";
import { KPI, Pill, Row, Section, Table, Td, Th, Bar } from "@/components/client/primitives";
import { notify, confirmAction } from "@/lib/actions";

export const Route = createFileRoute("/trading")({
  head: () => ({
    meta: [
      { title: "Trading Accounts · Arjun Raghunathan — Atlas CRM" },
      { name: "description", content: "MT4/MT5 accounts, margin, risk, and platform permissions." },
    ],
  }),
  component: TradingPage,
});

type Account = {
  id: string;
  platform: "MT4" | "MT5";
  server: string;
  type: string;
  ccy: string;
  lev: string;
  balance: string;
  equity: string;
  marginLvl: number;
  status: "Active" | "Dormant" | "Demo" | "Disabled";
  last: string;
  tone: "success" | "warning" | "muted" | "info" | "destructive";
};

const ACCOUNTS: Account[] = [
  { id: "MT5-100421", platform: "MT5", server: "IC-Live-01", type: "ECN Raw", ccy: "USD", lev: "1:500", balance: "$12,400", equity: "$13,020", marginLvl: 420, status: "Active", last: "12 mins ago", tone: "success" },
  { id: "MT5-100899", platform: "MT5", server: "IC-VIP-02", type: "VIP", ccy: "EUR", lev: "1:200", balance: "€52,000", equity: "€49,300", marginLvl: 188, status: "Active", last: "3 mins ago", tone: "success" },
  { id: "MT5-101204", platform: "MT5", server: "IC-Live-01", type: "Standard", ccy: "USD", lev: "1:100", balance: "$8,200", equity: "$8,420", marginLvl: 612, status: "Active", last: "1h ago", tone: "success" },
  { id: "MT4-77212", platform: "MT4", server: "IC-Live-04", type: "Standard", ccy: "USD", lev: "1:200", balance: "$4,100", equity: "$3,980", marginLvl: 145, status: "Active", last: "2h ago", tone: "warning" },
  { id: "MT5-90021", platform: "MT5", server: "IC-Live-01", type: "Cent", ccy: "USD¢", lev: "1:500", balance: "$520", equity: "$498", marginLvl: 280, status: "Dormant", last: "21 days ago", tone: "muted" },
  { id: "MT4-204112", platform: "MT4", server: "IC-Demo-01", type: "Demo", ccy: "USD", lev: "1:1000", balance: "$100,000", equity: "$98,000", marginLvl: 620, status: "Demo", last: "Yesterday", tone: "info" },
  { id: "MT5-300118", platform: "MT5", server: "IC-Demo-02", type: "Demo", ccy: "EUR", lev: "1:500", balance: "€50,000", equity: "€51,200", marginLvl: 510, status: "Demo", last: "3d ago", tone: "info" },
  { id: "MT5-400221", platform: "MT5", server: "IC-VIP-02", type: "VIP", ccy: "USD", lev: "1:100", balance: "$0", equity: "$0", marginLvl: 0, status: "Disabled", last: "—", tone: "destructive" },
];

const DRAWER_TABS = ["Overview", "Financials", "Metrics", "Positions", "Closed trades", "Margin", "Funding", "Permissions", "Restrictions", "Platform", "Copy trading", "Risk alerts", "Timeline", "Audit logs", "Actions"];

function TradingPage() {
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState<"All" | "MT4" | "MT5">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Dormant" | "Demo" | "Disabled">("All");
  const [selectedId, setSelectedId] = useState("MT5-100421");
  const [drawerTab, setDrawerTab] = useState(DRAWER_TABS[0]);

  const filtered = useMemo(() => {
    return ACCOUNTS.filter((a) => {
      if (query && !a.id.toLowerCase().includes(query.toLowerCase()) && !a.type.toLowerCase().includes(query.toLowerCase())) return false;
      if (platform !== "All" && a.platform !== platform) return false;
      if (statusFilter !== "All" && a.status !== statusFilter) return false;
      return true;
    });
  }, [query, platform, statusFilter]);

  const selected = ACCOUNTS.find((a) => a.id === selectedId) ?? ACCOUNTS[0];

  return (
    <ClientShell>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        <KPI label="Total accounts" value={String(ACCOUNTS.length)} sub="Live & demo" icon={<Layers className="h-4 w-4" />} />
        <KPI label="Live accounts" value="4" tone="success" />
        <KPI label="Demo accounts" value="2" />
        <KPI label="Active" value={String(ACCOUNTS.filter((a) => a.status === "Active").length)} tone="success" />
        <KPI label="Total equity" value="$82,000" sub="Combined USD eq." tone="success" />
        <KPI label="Open positions" value="14" sub="Across all accts" />
        <KPI label="Margin usage" value="38%" tone="warning" />
        <KPI label="Largest exposure" value="XAU/USD" sub="$84K" tone="warning" />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 xl:col-span-8">
          <Section
            title={`Trading Accounts — ${filtered.length} of ${ACCOUNTS.length}`}
            icon={<Briefcase className="h-4 w-4" />}
            right={
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search account ID / type…"
                    className="h-7 w-52 rounded-md border border-border bg-surface pl-7 pr-2 text-[11px] outline-none placeholder:text-muted-foreground focus:border-ring"
                  />
                </div>
                <select value={platform} onChange={(e) => setPlatform(e.target.value as any)} className="h-7 rounded-md border border-border bg-surface px-2 text-[11px] outline-none">
                  <option>All</option><option>MT4</option><option>MT5</option>
                </select>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="h-7 rounded-md border border-border bg-surface px-2 text-[11px] outline-none">
                  <option>All</option><option>Active</option><option>Dormant</option><option>Demo</option><option>Disabled</option>
                </select>
                <button onClick={() => notify("Statement exported", "CSV downloaded for filtered accounts.", "success")} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2"><Download className="h-3 w-3" /> Export</button>
              </div>
            }
          >
            <Table>
              <thead>
                <tr>
                  <Th>Account ID</Th><Th>Platform</Th><Th>Server</Th><Th>Type</Th><Th>CCY</Th><Th>Lev.</Th>
                  <Th className="text-right">Balance</Th><Th className="text-right">Equity</Th><Th>Margin Lvl</Th><Th>Status</Th><Th>Last Activity</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><Td className="text-muted-foreground" >No accounts match the current filters.</Td></tr>
                )}
                {filtered.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`cursor-pointer hover:bg-surface/40 ${selectedId === r.id ? "bg-primary/5" : ""}`}
                  >
                    <Td className="font-mono text-[10px] font-semibold">{r.id}</Td>
                    <Td><Pill tone="info">{r.platform}</Pill></Td>
                    <Td className="text-muted-foreground">{r.server}</Td>
                    <Td><Pill tone="muted">{r.type}</Pill></Td>
                    <Td>{r.ccy}</Td>
                    <Td className="font-medium">{r.lev}</Td>
                    <Td className="text-right">{r.balance}</Td>
                    <Td className="text-right font-semibold">{r.equity}</Td>
                    <Td>
                      <div className="flex items-center gap-2">
                        <Bar value={Math.min(100, r.marginLvl / 6)} tone={r.marginLvl < 150 ? "destructive" : r.marginLvl < 300 ? "warning" : "success"} />
                        <span className="w-10 text-right text-[11px]">{r.marginLvl}%</span>
                      </div>
                    </Td>
                    <Td><Pill tone={r.tone}>{r.status}</Pill></Td>
                    <Td className="text-muted-foreground">{r.last}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Account Drawer */}
          <Section
            title={`${selected.id} — ${selected.type}`}
            icon={<Briefcase className="h-4 w-4" />}
            right={
              <div className="flex items-center gap-2">
                <Pill tone={selected.tone}>{selected.status}</Pill>
                <Pill tone="muted">{selected.platform}</Pill>
                <button onClick={() => { navigator.clipboard?.writeText(selected.id); notify("Copied", `${selected.id} copied to clipboard.`, "success"); }} className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[10px] hover:bg-surface-2"><Copy className="h-3 w-3" /> ID</button>
              </div>
            }
          >
            <div className="mb-3 flex gap-1 overflow-x-auto border-b border-border/60 pb-2 text-[11px]">
              {DRAWER_TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setDrawerTab(t)}
                  className={`whitespace-nowrap rounded-md px-2 py-1 font-medium ${drawerTab === t ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <SubHeading>Account Identity</SubHeading>
                <Row label="Account ID" value={selected.id} />
                <Row label="Platform" value={selected.platform} />
                <Row label="Server" value={selected.server} />
                <Row label="Type" value={selected.type} />
                <Row label="Base CCY" value={selected.ccy} />
                <Row label="Leverage" value={selected.lev} />
                <Row label="Registered" value="2026-01-12" />
                <Row label="Group" value="IC-Live-01-PRO" />
                <Row label="EA Trading" value={<Pill tone="success">Allowed</Pill>} />
                <Row label="Investor pwd" value="Set 12 May" />
              </div>

              <div>
                <SubHeading>Performance</SubHeading>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[["847", "Total trades"], ["61%", "Win rate"], ["1.82", "Profit factor"], ["1.4", "Avg lot"], ["2,840", "Lots (vol)"], ["+$8.2K", "Largest win"]].map(([v, l]) => (
                    <div key={l} className="rounded-md border border-border/50 bg-surface/40 p-2">
                      <div className="text-sm font-semibold num">{v}</div>
                      <div className="text-[9px] uppercase tracking-wide text-muted-foreground">{l}</div>
                    </div>
                  ))}
                </div>
                <SubHeading className="mt-4">P&L</SubHeading>
                <Row label="Daily P&L" value={<span className="text-success">+$590</span>} />
                <Row label="Weekly P&L" value={<span className="text-success">+$1,890</span>} />
                <Row label="Monthly P&L" value={<span className="text-success">+$4,220</span>} />
                <Row label="YTD P&L" value={<span className="text-success">+$28,420</span>} />
                <Row label="Largest loss" value={<span className="text-destructive">-$4,100</span>} />
                <Row label="Max drawdown" value={<span className="text-destructive">-$6,280 · 7.4%</span>} />
              </div>

              <div>
                <SubHeading>Margin & Exposure</SubHeading>
                <Row label="Balance" value={selected.balance} />
                <Row label="Equity" value={selected.equity} />
                <Row label="Used margin" value="$3,800" />
                <Row label="Free margin" value="$9,220" />
                <Row label="Margin level" value={`${selected.marginLvl}%`} badge={<Pill tone={selected.marginLvl < 150 ? "destructive" : selected.marginLvl < 300 ? "warning" : "success"}>{selected.marginLvl < 150 ? "Critical" : selected.marginLvl < 300 ? "Warning" : "Healthy"}</Pill>} />
                <Row label="Stop-out level" value="50%" />
                <Row label="Margin call level" value="100%" />
                <Row label="Largest exposure" value="XAU/USD" />
                <Row label="Net exposure" value="$180K" />
                <Row label="Hedging" value={<Pill tone="success">Enabled</Pill>} />
                <Row label="Open risk" value={<Pill tone="warning">Medium</Pill>} />
              </div>
            </div>
          </Section>

          {/* Spread / Commission settings */}
          <Section title="Spread, Commission & Swap" icon={<Settings2 className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Symbol</Th><Th>Spread</Th><Th>Commission</Th><Th>Swap long</Th><Th>Swap short</Th><Th>Margin</Th></tr></thead>
              <tbody>
                {[
                  ["EUR/USD", "0.1 pip", "$3.5 / lot", "-2.1", "+0.4", "0.20%"],
                  ["XAU/USD", "12 cents", "$5 / lot", "-6.8", "+1.2", "1.00%"],
                  ["GBP/JPY", "0.8 pip", "$3.5 / lot", "-3.4", "-1.0", "0.50%"],
                  ["BTC/USD", "12 USD", "0.05%", "-0.12%", "-0.12%", "5.00%"],
                  ["NAS100", "1.0 pt", "$0.5 / lot", "-1.8", "+0.6", "0.50%"],
                ].map((r) => (
                  <tr key={r[0]}>
                    <Td className="font-medium">{r[0]}</Td>
                    <Td>{r[1]}</Td><Td>{r[2]}</Td><Td className="text-destructive">{r[3]}</Td><Td>{r[4]}</Td><Td>{r[5]}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Open Positions */}
          <Section title={`Open Positions — ${selected.id}`} icon={<Activity className="h-4 w-4" />} right={<Pill tone="info">12 open</Pill>}>
            <Table>
              <thead><tr><Th>Ticket</Th><Th>Symbol</Th><Th>Type</Th><Th>Vol</Th><Th className="text-right">Open</Th><Th className="text-right">Current</Th><Th className="text-right">Floating P&L</Th><Th>Duration</Th><Th>{""}</Th></tr></thead>
              <tbody>
                {[
                  ["#892311", "XAU/USD", "Buy", "5.00", "2352.12", "2361.20", "+$4,540", "3h 12m", "success"],
                  ["#892355", "EUR/USD", "Sell", "2.00", "1.0842", "1.0821", "+$420", "42m", "success"],
                  ["#892390", "GBP/JPY", "Buy", "1.00", "188.420", "188.220", "-$200", "1h 20m", "destructive"],
                  ["#892410", "BTC/USD", "Buy", "0.10", "62,500", "62,890", "+$39", "5h", "success"],
                  ["#892422", "NAS100", "Sell", "0.50", "18,420", "18,460", "-$20", "18m", "destructive"],
                  ["#800112", "EUR/USD", "Buy", "0.30", "1.08100", "1.08640", "+$162", "Yesterday", "success"],
                ].map((r) => (
                  <tr key={r[0] as string}>
                    <Td className="font-mono text-[10px]">{r[0]}</Td>
                    <Td className="font-medium">{r[1]}</Td>
                    <Td><Pill tone={r[2] === "Buy" ? "success" : "destructive"}>{r[2]}</Pill></Td>
                    <Td>{r[3]}</Td>
                    <Td className="text-right text-muted-foreground">{r[4]}</Td>
                    <Td className="text-right">{r[5]}</Td>
                    <Td className={`text-right font-semibold ${r[8] === "success" ? "text-success" : "text-destructive"}`}>{r[6]}</Td>
                    <Td className="text-muted-foreground">{r[7]}</Td>
                    <Td className="text-right">
                      <button onClick={() => confirmAction(`Force close ${r[0]}`, `${r[1]} · ${r[2]} · ${r[3]} lots will be closed at market.`, "danger")} className="rounded-md border border-destructive/40 bg-destructive/10 px-2 py-0.5 text-[10px] text-destructive hover:bg-destructive/20">Close</button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Audit */}
          <Section title="Account Audit Trail" icon={<History className="h-4 w-4" />}>
            <Table>
              <thead><tr><Th>Action</Th><Th>By</Th><Th>Role</Th><Th>Time</Th></tr></thead>
              <tbody>
                {[
                  ["Leverage changed 1:200 → 1:500", "Priya Nair", "Manager", "09:12"],
                  ["Trading disabled — risk hold", "System", "Auto", "10:22"],
                  ["Group changed IC-Std → IC-Live-01", "Rahul Shah", "Risk", "11:08"],
                  ["EA trading enabled", "Priya Nair", "Manager", "Yesterday"],
                  ["Investor password reset", "System", "Auto", "3d ago"],
                  ["Account funded $5,000 from main", "Client", "Self", "5d ago"],
                ].map((r) => (
                  <tr key={r[0] as string}>
                    <Td>{r[0]}</Td>
                    <Td className="text-muted-foreground">{r[1]}</Td>
                    <Td><Pill tone="muted">{r[2]}</Pill></Td>
                    <Td className="text-muted-foreground">{r[3]}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-4 xl:col-span-4">
          <Section title="Trading Permissions" icon={<Settings2 className="h-4 w-4" />}>
            <Toggles
              items={[
                ["Open trades", true],
                ["Close trades", true],
                ["Hedging allowed", true],
                ["EA trading", true],
                ["Copy trading", false],
                ["Withdrawals", true],
                ["Crypto symbols", true],
                ["Synthetic indices", false],
              ]}
            />
          </Section>

          <Section title="Account Limits" icon={<ShieldAlert className="h-4 w-4" />}>
            <Row label="Max leverage" value="1:500" />
            <Row label="Max lot size" value="50 lots" />
            <Row label="Max open positions" value="200" />
            <Row label="Max daily volume" value="500 lots" />
            <Row label="Daily loss limit" value="$5,000" />
            <Row label="Stop-out trigger" value="50% margin level" />
          </Section>

          <Section title="Account Restrictions" icon={<ShieldAlert className="h-4 w-4" />}>
            {[
              ["Trading disabled", "No", "success"],
              ["Withdrawals locked", "No", "success"],
              ["Deposits blocked", "No", "success"],
              ["Risk review hold", "No", "success"],
              ["AML hold", "No", "success"],
              ["Symbol blacklist", "BTC futures", "warning"],
            ].map(([k, v, tone]) => (
              <Row key={k as string} label={k as string} value={<Pill tone={tone as any}>{v}</Pill>} />
            ))}
          </Section>

          <Section title="Platform Access" icon={<Monitor className="h-4 w-4" />}>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["MT5 Desktop", Monitor, true],
                ["WebTrader", Monitor, true],
                ["Mobile App", Smartphone, true],
                ["API access", Server, false],
              ].map(([n, Icon, on]: any) => (
                <button
                  key={n}
                  onClick={() => notify(`${n} ${on ? "disabled" : "enabled"}`, `Permission updated for ${selected.id}.`, on ? "warning" : "success")}
                  className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-colors hover:border-primary/60 ${on ? "border-success/30 bg-success/5" : "border-border bg-surface/40 opacity-60"}`}
                >
                  <Icon className={`h-4 w-4 ${on ? "text-success" : "text-muted-foreground"}`} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium">{n}</div>
                    <div className="text-[10px] text-muted-foreground">{on ? "Enabled · click to disable" : "Disabled · click to enable"}</div>
                  </div>
                </button>
              ))}
            </div>
          </Section>

          <Section title="Funding Links" icon={<Wallet className="h-4 w-4" />}>
            <Row label="Main wallet" value="Linked" badge={<Pill tone="success">Active</Pill>} />
            <Row label="Bonus wallet" value="Promo bonus" badge={<Pill tone="warning">Locked</Pill>} />
            <Row label="Copy trading wallet" value="Social trading" badge={<Pill tone="muted">Off</Pill>} />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <MiniBtn onClick={() => notify("Funded $1,000", `Transferred from main wallet → ${selected.id}.`, "success")}>Fund from main</MiniBtn>
              <MiniBtn onClick={() => notify("Withdrew $500", `Transferred from ${selected.id} → main wallet.`, "success")}>Withdraw to main</MiniBtn>
            </div>
          </Section>

          <Section title="Copy Trading" icon={<Users className="h-4 w-4" />}>
            <Row label="Active" value={<Pill tone="muted">No</Pill>} />
            <Row label="Role" value="—" />
            <Row label="Master account" value="—" />
            <Row label="Allocation" value="—" />
            <Row label="Profit share" value="—" />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <MiniBtn onClick={() => notify("Follower enabled", "Account can now mirror trades from a master.", "success")}>Enable follower</MiniBtn>
              <MiniBtn onClick={() => notify("Provider enabled", "Account is now a copy trading master.", "success")}>Enable provider</MiniBtn>
            </div>
          </Section>

          <Section title={`Risk Alerts — ${selected.id}`} icon={<AlertTriangle className="h-4 w-4" />} right={<Pill tone="warning">3</Pill>}>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-warning" />High leverage usage</span><Pill tone="warning">Medium</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-warning" />Toxic scalping suspected</span><Pill tone="warning">Medium</Pill></li>
              <li className="flex items-center justify-between"><span className="inline-flex items-center gap-2"><AlertTriangle className="h-3.5 w-3.5 text-destructive" />Abnormal lot size</span><Pill tone="destructive">High</Pill></li>
            </ul>
          </Section>

          <Section title="Admin Actions" icon={<Settings2 className="h-4 w-4" />}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Safe</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {[
                ["Add note", "Note added to account."],
                ["Notify client", "Email sent to client."],
                ["Reset password", "New master password emailed."],
                ["Resend creds", "Credentials resent securely."],
              ].map(([a, m]) => <MiniBtn key={a} onClick={() => notify(a, m, "success")}>{a}</MiniBtn>)}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider">Moderate</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Change leverage", "Move group", "Toggle EA", "Toggle copy"].map((a) => <MiniBtn key={a} onClick={() => confirmAction(a, `Apply change to ${selected.id}?`)}>{a}</MiniBtn>)}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-destructive/80">Danger zone</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Disable trading", "Lock withdrawals", "Close account", "Force liquidate"].map((a) => <MiniBtn key={a} tone="destructive" onClick={() => confirmAction(a, `${a} on ${selected.id}?`, "danger")}>{a}</MiniBtn>)}
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

function Toggles({ items }: { items: [string, boolean][] }) {
  const [state, setState] = useState(() => Object.fromEntries(items));
  return (
    <>
      {Object.entries(state).map(([k, on]) => (
        <div key={k} className="flex items-center justify-between border-b border-border/40 py-2 last:border-b-0">
          <span className="text-xs text-muted-foreground">{k}</span>
          <button
            onClick={() => {
              setState((s) => ({ ...s, [k]: !s[k] }));
              notify(`${k} ${!on ? "enabled" : "disabled"}`, undefined, !on ? "success" : "warning");
            }}
            className={`relative h-4 w-7 rounded-full transition-colors ${on ? "bg-success" : "bg-muted"}`}
          >
            <span className={`absolute top-0.5 h-3 w-3 rounded-full bg-background transition-all ${on ? "left-3.5" : "left-0.5"}`} />
          </button>
        </div>
      ))}
    </>
  );
}
