import { createFileRoute } from "@tanstack/react-router";
import {
  Banknote,
  Bitcoin,
  CheckCircle2,
  Copy,
  CreditCard,
  Globe,
  Landmark,
  Lock,
  RefreshCw,
  ShieldCheck,
  Wallet,
  ArrowRight,
  AlertTriangle,
  Ban,
  Eye,
  KeyRound,
} from "lucide-react";
import { ClientShell } from "@/components/client/ClientShell";
import { KPI, Pill, Row, Section, Table, Td, Th } from "@/components/client/primitives";

export const Route = createFileRoute("/wallet")({
  head: () => ({
    meta: [
      { title: "Wallet & Banking · Arjun Raghunathan — Atlas CRM" },
      { name: "description", content: "Wallets, balances, payment methods, and banking verification." },
    ],
  }),
  component: WalletPage,
});

function WalletPage() {
  return (
    <ClientShell>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <KPI label="Total wallet value" value="$31,240" sub="All currencies · USD eq." tone="success" icon={<Wallet className="h-4 w-4" />} />
        <KPI label="Available" value="$28,960" sub="Unrestricted funds" />
        <KPI label="Locked" value="$2,280" sub="Bonus + margin hold" tone="warning" icon={<Lock className="h-4 w-4" />} />
        <KPI label="Pending W/D" value="$500" sub="1 under review" tone="warning" />
        <KPI label="Wallets / CCY" value="7 / 5" sub="Default USD" icon={<Globe className="h-4 w-4" />} />
        <KPI label="Linked methods" value="9" sub="3 bank · 2 card · 4 crypto" icon={<CreditCard className="h-4 w-4" />} />
      </div>

      {/* Fund flow */}
      <Section className="mt-4" title="Fund Flow Architecture" icon={<ArrowRight className="h-4 w-4" />}>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          {["Deposit method", "Main wallet", "MT4 / MT5 account", "Trade", "MT5 → Main wallet", "Withdrawal"].map((s, i, arr) => (
            <div key={s} className="flex items-center gap-2">
              <span className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-medium">{s}</span>
              {i < arr.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">
          Internal transfers do not use external payment gateways. FX conversion applied automatically at live mid-market rate.
        </p>
      </Section>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12 space-y-4 xl:col-span-8">
          {/* Wallet accounts */}
          <Section title="Wallet Accounts" icon={<Wallet className="h-4 w-4" />}>
            <Table>
              <thead>
                <tr>
                  <Th>Wallet</Th><Th>Type</Th><Th>Balance</Th><Th>Status</Th><Th>{""}</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Main wallet", "USD · Primary", "Main", "$18,240", "Active", "success"],
                  ["Trading wallet", "EUR · MT5 margin", "Trading", "€4,500", "Active", "success"],
                  ["Crypto wallet", "Multi-asset", "Crypto", "≈ $5,840", "Active", "success"],
                  ["Bonus wallet", "USD · Restricted", "Bonus", "$270", "Locked", "warning"],
                  ["Commission wallet", "USD · IB earnings", "Commission", "$2,890", "Active", "info"],
                  ["Vault wallet", "USD · Protected", "Vault", "$0", "Empty", "muted"],
                ].map((r) => (
                  <tr key={r[0] as string} className="hover:bg-surface/40">
                    <Td>
                      <div className="font-medium">{r[0]}</div>
                      <div className="text-[10px] text-muted-foreground">{r[1]}</div>
                    </Td>
                    <Td><Pill tone="muted">{r[2]}</Pill></Td>
                    <Td className="font-semibold">{r[3]}</Td>
                    <Td><Pill tone={r[5] as any}>{r[4]}</Pill></Td>
                    <Td className="text-right">
                      <button className="text-muted-foreground hover:text-foreground"><Eye className="h-3.5 w-3.5" /></button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Multi-currency */}
          <Section title="Multi-Currency Wallets" icon={<Globe className="h-4 w-4" />} right={<button className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2"><RefreshCw className="h-3 w-3" /> Refresh rates</button>}>
            <Table>
              <thead>
                <tr>
                  <Th>Currency</Th><Th>Balance</Th><Th>USD equiv.</Th><Th>Rate</Th><Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["USD", "US Dollar", "$18,240", "$18,240", "1.0000", "Active", "success"],
                  ["EUR", "Euro", "€4,500", "$4,860", "1.0800", "Active", "success"],
                  ["INR", "Indian Rupee", "₹168,200", "$2,016", "0.0120", "Dormant", "muted"],
                  ["AED", "Dirham", "AED 0", "$0", "3.6725", "Not open", "muted"],
                  ["GBP", "Pound Sterling", "£0", "$0", "1.2710", "Not open", "muted"],
                ].map((r) => (
                  <tr key={r[0] as string} className="hover:bg-surface/40">
                    <Td><div className="flex items-center gap-2"><span className="font-semibold">{r[0]}</span><span className="text-[10px] text-muted-foreground">{r[1]}</span></div></Td>
                    <Td>{r[2]}</Td>
                    <Td className="font-medium">{r[3]}</Td>
                    <Td className="text-muted-foreground">{r[4]}</Td>
                    <Td><Pill tone={r[6] as any}>{r[5]}</Pill></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Section>

          {/* Crypto */}
          <Section title="Saved Crypto Withdrawal Addresses" icon={<Bitcoin className="h-4 w-4" />}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {[
                { asset: "BTC", name: "Bitcoin", network: "Bitcoin mainnet", amt: "0.1840 BTC", usd: "$11,840", rate: "$64,348", risk: "Low", mixer: "No", sanctions: "Cleared", status: "Available", last: "3 days ago", addr: "bc1qar0srrr7xfkvy516431ydnw9re59gtzzwf5ndq" },
                { asset: "ETH", name: "Ethereum", network: "ERC-20", amt: "1.2400 ETH", usd: "$4,712", rate: "$3,800", risk: "Low", mixer: "No", sanctions: "Cleared", status: "Available", last: "1 week ago", addr: "0x742d35Cc6634C0532925a3b8D4C9E2F1e9b1234" },
                { asset: "USDT", name: "Tether USD", network: "TRC-20 (TRON)", amt: "8,000 USDT", usd: "$8,000", rate: "Stable", risk: "Medium", mixer: "Inconclusive", sanctions: "Cleared", status: "Manual review", last: "Today 08:12", addr: "TLa2f6VPqDgRE67v1736s7bJ8RQMYP6P5w", warn: true },
                { asset: "SOL", name: "Solana", network: "Solana mainnet", amt: "0 SOL", usd: "$0", rate: "Not funded", risk: "—", mixer: "N/A", sanctions: "Pending", status: "Not available", last: "Never", addr: "4Nd1m6QDCSVLkKJHQ3yWJMHzBNq7TY52e6gQcRqH7t5", muted: true },
              ].map((c) => (
                <div key={c.asset} className={`relative rounded-xl border p-3 ${c.warn ? "border-warning/40 bg-warning/5" : c.muted ? "border-border/50 bg-surface/30 opacity-80" : "border-border/60 bg-surface/40"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-warning to-chart-4 text-[11px] font-semibold text-warning-foreground">{c.asset}</div>
                      <div>
                        <div className="text-xs font-semibold">{c.name}</div>
                        <div className="text-[10px] text-muted-foreground">{c.network}</div>
                      </div>
                    </div>
                    <Pill tone={c.status === "Available" ? "success" : c.status === "Manual review" ? "warning" : "muted"}>{c.status}</Pill>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-lg font-semibold num">{c.amt}</span>
                    <span className="text-[11px] text-muted-foreground num">= {c.usd}</span>
                  </div>
                  <div className="mt-1 text-[10px] text-muted-foreground num">Rate · {c.rate}</div>
                  <div className="mt-2 break-all rounded-md border border-border/50 bg-card/60 p-2 font-mono text-[10px] text-muted-foreground">
                    {c.addr}
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-[10px]">
                    <Chip label="Risk" value={c.risk} tone={c.risk === "Low" ? "success" : c.risk === "Medium" ? "warning" : "muted"} />
                    <Chip label="Mixer" value={c.mixer} tone={c.mixer === "No" ? "success" : c.mixer === "Inconclusive" ? "warning" : "muted"} />
                    <Chip label="Sanctions" value={c.sanctions} tone={c.sanctions === "Cleared" ? "success" : "muted"} />
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    <MiniBtn icon={<ArrowRight className="h-3 w-3" />}>Withdraw</MiniBtn>
                    <MiniBtn icon={<Copy className="h-3 w-3" />}>Copy</MiniBtn>
                    <MiniBtn icon={<Ban className="h-3 w-3" />} tone="destructive">Block</MiniBtn>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              ⚙ Chain analytics powered by internal risk engine. Mixer detection, darknet exposure, and sanctions screening run on every inbound crypto transaction automatically.
            </p>
          </Section>

          {/* Banks & Cards */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Section title="Linked Bank Accounts" icon={<Landmark className="h-4 w-4" />}>
              <Table>
                <thead><tr><Th>Bank</Th><Th>Acct</Th><Th>CCY</Th><Th>Owner</Th><Th>Status</Th></tr></thead>
                <tbody>
                  {[
                    ["HDFC Bank", "Savings · India", "****4821", "INR", "Matched", "Verified", "success"],
                    ["Citibank India", "Current · India", "****9034", "USD", "Matched", "Verified", "success"],
                    ["ICICI Bank", "Savings · India", "****7712", "INR", "Pending", "Pending", "warning"],
                  ].map((r) => (
                    <tr key={r[0] as string}>
                      <Td><div className="font-medium">{r[0]}</div><div className="text-[10px] text-muted-foreground">{r[1]}</div></Td>
                      <Td>{r[2]}</Td><Td>{r[3]}</Td>
                      <Td><Pill tone={r[4] === "Matched" ? "success" : "warning"}>{r[4]}</Pill></Td>
                      <Td><Pill tone={r[6] as any}>{r[5]}</Pill></Td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section title="Linked Cards & E-Wallets" icon={<CreditCard className="h-4 w-4" />}>
              <Table>
                <thead><tr><Th>Type</Th><Th>Last 4</Th><Th>Expiry</Th><Th>CB</Th><Th>Status</Th></tr></thead>
                <tbody>
                  <tr><Td>Visa</Td><Td>4821</Td><Td>09/27</Td><Td>0</Td><Td><Pill tone="success">Verified</Pill></Td></tr>
                  <tr><Td>Mastercard</Td><Td>3390</Td><Td>03/26</Td><Td>1</Td><Td><Pill tone="destructive">Flagged</Pill></Td></tr>
                  <tr><Td>Skrill</Td><Td>arjun.r@…</Td><Td>—</Td><Td>—</Td><Td><Pill tone="success">Verified</Pill></Td></tr>
                  <tr><Td>Neteller</Td><Td>—</Td><Td>—</Td><Td>—</Td><Td><Pill tone="muted">Not linked</Pill></Td></tr>
                  <tr><Td>PayPal</Td><Td>—</Td><Td>—</Td><Td>—</Td><Td><Pill tone="muted">Not linked</Pill></Td></tr>
                </tbody>
              </Table>
            </Section>
          </div>

          {/* Risk flags */}
          <Section title="Wallet Risk Alerts" icon={<AlertTriangle className="h-4 w-4" />} right={<Pill tone="destructive">4</Pill>}>
            <ul className="space-y-2">
              {[
                ["Chargeback on Mastercard ••••3390", "1 chargeback detected. Card flagged for manual review before next use.", "destructive"],
                ["USDT TRC-20 inconclusive mixer check", "Address origin partially matched to mixing service. Manual chain analysis required.", "warning"],
                ["ICICI bank owner verification pending", "Bank account name does not yet match KYC name on file.", "warning"],
                ["3 bank accounts linked", "Multiple accounts may indicate layering risk. Monitor transfer patterns.", "info"],
              ].map(([t, d, tone]) => (
                <li key={t} className="flex items-start gap-3 rounded-lg border border-border/60 bg-surface/40 p-3">
                  <AlertTriangle className={`mt-0.5 h-4 w-4 ${tone === "destructive" ? "text-destructive" : tone === "warning" ? "text-warning" : "text-info"}`} />
                  <div className="min-w-0">
                    <div className="text-xs font-medium">{t}</div>
                    <div className="text-[11px] text-muted-foreground">{d}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Section>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 space-y-4 xl:col-span-4">
          <Section title="Currency Conversion" icon={<RefreshCw className="h-4 w-4" />}>
            {[["EUR", "USD", "1.0800"], ["INR", "USD", "0.01200"]].map(([f, t, r]) => (
              <div key={f} className="flex items-center justify-between border-b border-border/40 py-2 last:border-b-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium">{f}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  <span className="font-medium">{t}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-semibold num">{r}</div>
                  <div className="text-[10px] text-muted-foreground">Updated 2 min ago</div>
                </div>
                <button className="rounded-md border border-border bg-surface px-2 py-1 text-[11px] hover:bg-surface-2">Convert</button>
              </div>
            ))}
            <div className="mt-2 flex gap-2">
              <MiniBtn>Manual FX adjustment</MiniBtn>
              <MiniBtn>Lock conversion</MiniBtn>
            </div>
          </Section>

          <Section title="Wallet Permissions" icon={<ShieldCheck className="h-4 w-4" />}>
            {[
              ["Deposits allowed", true],
              ["Withdrawals allowed", true],
              ["Internal transfers allowed", true],
              ["Crypto withdrawals", true],
              ["High-risk payment methods", false],
              ["Third-party bank withdrawal", false],
              ["Currency conversion", true],
              ["Manual approval override", false],
            ].map(([k, on]) => (
              <Row key={k as string} label={k as string} value={on ? <Pill tone="success">On</Pill> : <Pill tone="muted">Off</Pill>} />
            ))}
          </Section>

          <Section title="Wallet Restrictions" icon={<Ban className="h-4 w-4" />}>
            <Row label="Crypto manual review" value={<Pill tone="warning">Active</Pill>} />
            <Row label="Withdrawal hold" value={<Pill tone="warning">Active</Pill>} />
            <Row label="Deposits" value={<Pill tone="success">Unrestricted</Pill>} />
          </Section>

          <Section title="Bonus Wallet" icon={<Wallet className="h-4 w-4" />}>
            <Row label="Bonus credited" value="$1,250" />
            <Row label="Bonus used" value="$980" />
            <Row label="Bonus remaining" value="$270" />
            <Row label="Turnover required" value="50 lots" />
            <Row label="Turnover completed" value="20.5 lots" />
            <Row label="Progress" value="41%" badge={<Pill tone="primary">In progress</Pill>} />
            <Row label="Expiry" value="31 Jul 2026" />
          </Section>

          <Section title="Commission Wallet (IB)" icon={<Banknote className="h-4 w-4" />}>
            <Row label="Total earned" value="$8,924" />
            <Row label="Pending rebates" value="$1,240" />
            <Row label="Available to withdraw" value="$2,890" badge={<Pill tone="success">Ready</Pill>} />
            <Row label="Next payout" value="01 Jun 2026" />
          </Section>

          <Section title="Wallet Security" icon={<KeyRound className="h-4 w-4" />}>
            {[
              ["2FA on withdrawals", "Enabled", "success"],
              ["Withdrawal whitelist", "2 addresses", "success"],
              ["IP restriction", "Active", "success"],
              ["Device verification", "Enabled", "success"],
              ["Email confirmation on W/D", "Enabled", "success"],
              ["Large W/D threshold", "$2,000", "info"],
            ].map(([k, v, tone]) => (
              <Row key={k as string} label={k as string} value={<Pill tone={tone as any}>{v}</Pill>} />
            ))}
          </Section>

          <Section title="Treasury Actions" icon={<ShieldCheck className="h-4 w-4" />}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Safe</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Notify client", "Add fin. note", "Request verify", "Approve W/D", "Refresh rates", "Export wallet"].map((a) => (
                <MiniBtn key={a}>{a}</MiniBtn>
              ))}
            </div>
            <div className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-destructive/80">Danger zone</div>
            <div className="mt-1 grid grid-cols-2 gap-1.5">
              {["Freeze wallet", "Disable W/D", "Block currency", "Manual adjust", "Block crypto", "Revoke methods"].map((a) => (
                <MiniBtn key={a} tone="destructive">{a}</MiniBtn>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </ClientShell>
  );
}

function Chip({ label, value, tone }: { label: string; value: string; tone: any }) {
  return (
    <div className="rounded-md border border-border/50 bg-card/50 px-1.5 py-1">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`text-[10px] font-medium ${tone === "success" ? "text-success" : tone === "warning" ? "text-warning" : tone === "destructive" ? "text-destructive" : "text-muted-foreground"}`}>{value}</div>
    </div>
  );
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
