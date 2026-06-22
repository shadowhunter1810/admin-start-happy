import React, { useState } from "react";
import {
  Users,
  Layers,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Search,
  Download,
  PlusCircle,
  ShieldAlert,
  Ban,
  Clock,
  FileText,
  History,
  Trophy,
  Zap,
  X,
  CheckCircle,
  Pause,
  Play,
  RefreshCw,
  Eye,
} from "lucide-react";

// --- SAFE ICON COMPONENT WRAPPER (Prevents SSR crashes if lucide fails to load an export) ---
const SafeIcon = ({ icon: IconComponent, className = "w-5 h-5" }: { icon: any; className?: string }) => {
  if (!IconComponent) {
    // Fallback block if any icon named export returns undefined
    return <div className={`${className} bg-slate-200 rounded`} />;
  }
  return <IconComponent className={className} />;
};

// --- SIMULATED REAL SPECIFICATION DATA ---
const INITIAL_KPI_CARDS = [
  {
    id: "active-providers",
    title: "Active Providers",
    value: "24",
    desc: "Total live strategies",
    change: "+2 new today",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "active-followers",
    title: "Active Followers",
    value: "842",
    desc: "Connected unique accounts",
    change: "+14 this week",
    icon: Layers,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    id: "assets-copy",
    title: "Assets Under Copy (AUM)",
    value: "$5,212,400",
    desc: "Allocated copied funds",
    change: "+$420K growth",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "copy-pnl",
    title: "Copy Trading PnL",
    value: "+$124,500",
    desc: "Overall copy profitability",
    change: "78% Win Rate",
    icon: TrendingUp,
    color: "text-teal-600",
    bg: "bg-teal-50",
  },
  {
    id: "provider-earnings",
    title: "Provider Earnings",
    value: "$22,500",
    desc: "Profit shares distributed",
    change: "Next payout in 3d",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: "risk-alerts",
    title: "Risk Alerts",
    value: "12",
    desc: "Active critical violations",
    change: "3 High Priority",
    icon: AlertTriangle,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const INITIAL_PROVIDERS = [
  {
    account: "MT5-10293",
    strategy: "Gold Scalper",
    followers: 842,
    aum: "$1,200,000",
    roi: "+18%",
    drawdown: "12%",
    profitShare: "20%",
    status: "Active",
    risk: "Medium",
  },
  {
    account: "MT5-88211",
    strategy: "Swing Master",
    followers: 122,
    aum: "$420,000",
    roi: "+9%",
    drawdown: "4.2%",
    profitShare: "15%",
    status: "Active",
    risk: "Low",
  },
  {
    account: "MT5-99412",
    strategy: "Martingale Pro",
    followers: 12,
    aum: "$84,000",
    roi: "+45%",
    drawdown: "38%",
    profitShare: "30%",
    status: "Suspended",
    risk: "High",
  },
];

const INITIAL_FOLLOWERS = [
  {
    account: "MT5-88291",
    name: "Rahul FX",
    provider: "MT5-10293",
    allocationType: "Percentage",
    allocationValue: "40% Equity",
    pnl: "+$820",
    status: "Copying",
  },
  {
    account: "MT5-11920",
    name: "Alpha Trader",
    provider: "MT5-88211",
    allocationType: "Fixed Amount",
    allocationValue: "$5,000 Fixed",
    pnl: "-$120",
    status: "Paused",
  },
  {
    account: "MT5-33411",
    name: "Zayn Malik",
    provider: "MT5-10293",
    allocationType: "Multiplier",
    allocationValue: "2.0x Lots",
    pnl: "+$1,450",
    status: "Copying",
  },
];

const INITIAL_RELATIONSHIPS = [
  {
    id: "REL-0091",
    provider: "MT5-10293 (Gold Scalper)",
    follower: "MT5-88291 (Rahul FX)",
    allocation: "Percentage (40%)",
    value: "40% Equity",
    startedAt: "2026-02-14 09:12",
    status: "Active",
  },
  {
    id: "REL-0092",
    provider: "MT5-88211 (Swing Master)",
    follower: "MT5-11920 (Alpha Trader)",
    allocation: "Fixed Amount",
    value: "$5,000",
    startedAt: "2026-03-01 14:22",
    status: "Paused",
  },
];

const INITIAL_ALLOCATIONS = [
  {
    account: "MT5-88291",
    provider: "Gold Scalper",
    mode: "Percentage",
    value: "40%",
    maxDrawdown: "20%",
    protection: "Stop & Close Trades",
    status: "Protected",
  },
  {
    account: "MT5-11920",
    provider: "Swing Master",
    mode: "Fixed Amount",
    value: "$5,000",
    maxDrawdown: "15%",
    protection: "Stop Only",
    status: "Monitoring",
  },
];

const INITIAL_TRADES_HISTORY = [
  {
    ticket: "882311",
    provider: "MT5-10293",
    follower: "MT5-88291",
    symbol: "XAUUSD",
    volume: "0.40 Lots",
    pnl: "+$420.00",
    time: "2026-06-18 09:12",
    status: "Closed",
    masterTicket: "M-99210",
    delay: "45ms",
    price: "2324.50",
    slippage: "0.1 pips",
    server: "Live-Server-1",
  },
  {
    ticket: "882312",
    provider: "MT5-10293",
    follower: "MT5-33411",
    symbol: "XAUUSD",
    volume: "2.00 Lots",
    pnl: "+$2,100.00",
    time: "2026-06-18 09:12",
    status: "Closed",
    masterTicket: "M-99210",
    delay: "52ms",
    price: "2324.52",
    slippage: "0.3 pips",
    server: "Live-Server-1",
  },
  {
    ticket: "882455",
    provider: "MT5-88211",
    follower: "MT5-11920",
    symbol: "EURUSD",
    volume: "0.10 Lots",
    pnl: "-$12.50",
    time: "2026-06-18 11:04",
    status: "Open",
    masterTicket: "M-99341",
    delay: "38ms",
    price: "1.08420",
    slippage: "0.0 pips",
    server: "Live-Server-2",
  },
];

const INITIAL_PROFIT_SHARING = [
  {
    provider: "Gold Scalper (MT5-10293)",
    follower: "Rahul FX (MT5-88291)",
    grossProfit: "$1,000",
    sharePct: "20%",
    earned: "$200",
    distributed: "$800",
    status: "Paid",
  },
  {
    provider: "Swing Master (MT5-88211)",
    follower: "Alpha Trader (MT5-11920)",
    grossProfit: "$350",
    sharePct: "15%",
    earned: "$52.50",
    distributed: "$297.50",
    status: "Pending",
  },
];

const INITIAL_RISK_ALERTS = [
  {
    alert: "Martingale Detection",
    strategy: "Martingale Pro",
    severity: "High",
    details: "Dangerous lot size doubling detected over 5 consecutive losing cycles.",
    status: "Active",
  },
  {
    alert: "High Drawdown Escalation",
    strategy: "Gold Scalper",
    severity: "Medium",
    details: "Drawdown breached 12% peak constraint standard.",
    status: "Monitored",
  },
  {
    alert: "Toxic Scalping Patterns",
    strategy: "HFT-Bot-MT5",
    severity: "Critical",
    details: "Average holding time under 1.8 seconds detected.",
    status: "Action Required",
  },
];

const INITIAL_RESTRICTIONS = [
  {
    status: "Provider Suspended",
    strategy: "Martingale Pro",
    reason: "Risk profile review & excessive capital loss risk.",
    date: "2026-05-12",
  },
  {
    status: "Copy Disabled",
    strategy: "HFT-Bot-MT5",
    reason: "Compliance issue / Arbitrage strategies prohibited.",
    date: "2026-06-01",
  },
];

const INITIAL_FEED = [
  { time: "09:12", msg: 'Provider strategy "Gold Scalper" updated margins profile.', type: "info" },
  { time: "09:12", msg: "New follower account MT5-33411 connected to MT5-10293.", type: "success" },
  { time: "11:04", msg: "Equity protection triggered for account MT5-11920.", type: "warning" },
  { time: "14:30", msg: "Emergency force close action dispatched by risk desk.", type: "danger" },
];

const INITIAL_AUDIT = [
  {
    action: "Strategy Paused",
    by: "Risk Team Desk",
    time: "2026-06-18 09:12",
    target: "Martingale Pro",
  },
  {
    action: "Allocation Updated",
    by: "Priya Nair (Admin)",
    time: "2026-06-18 10:08",
    target: "Rahul FX Allocation",
  },
  {
    action: "Provider Suspended",
    by: "Compliance Unit",
    time: "2026-06-18 11:22",
    target: "HFT-Bot-MT5",
  },
];

export function CopyTradingTab() {
  // --- SUB TAB SYSTEM ---
  const [activeSubTab, setActiveSubTab] = useState("summary");

  // --- COMPONENT LIVE STATES ---
  const [providers, setProviders] = useState(INITIAL_PROVIDERS);
  const [followers, setFollowers] = useState(INITIAL_FOLLOWERS);
  const [trades, setTrades] = useState(INITIAL_TRADES_HISTORY);
  const [feed, setFeed] = useState(INITIAL_FEED);
  const [audit, setAudit] = useState(INITIAL_AUDIT);
  const [notes, setNotes] = useState([
    "VIP strategy provider verified by operations desk.",
    "Risk management holding account review on HFT models.",
  ]);

  // --- DRAWERS CONTROLLER STATES ---
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedFollower, setSelectedFollower] = useState<any>(null);
  const [selectedTrade, setSelectedTrade] = useState<any>(null);

  // Drawer inner pagination tabs
  const [providerDrawerTab, setProviderDrawerTab] = useState("Overview");
  const [followerDrawerTab, setFollowerDrawerTab] = useState("Overview");
  const [tradeDrawerTab, setTradeDrawerTab] = useState("Overview");

  // --- MODALS FOR ACTIONS ---
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    type: "",
    severity: "",
    title: "",
    purpose: "",
    target: "",
  });
  const [reasonInput, setReasonInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // --- UTILITY ACTION TRIGGER ---
  const openActionModal = (type: string, severity: string, title: string, purpose: string, target: string) => {
    setActionModal({ isOpen: true, type, severity, title, purpose, target });
    setReasonInput("");
  };

  const handleConfirmAction = () => {
    if (!reasonInput.trim()) return alert("Please enter a structured compliance reason.");

    const newAuditLog = {
      action: actionModal.title,
      by: "System Admin Desk",
      time: new Date().toISOString().replace("T", " ").substring(0, 19),
      target: actionModal.target + ` (${reasonInput})`,
    };

    setAudit([newAuditLog, ...audit]);
    setFeed([
      {
        time: "Now",
        msg: `Action executed: ${actionModal.title} on ${actionModal.target}`,
        type: "danger",
      },
      ...feed,
    ]);

    if (actionModal.type === "pause_strategy") {
      setProviders(
        providers.map((p) => (p.strategy === actionModal.target ? { ...p, status: "Paused" } : p)),
      );
    } else if (actionModal.type === "ban_provider") {
      setProviders(
        providers.map((p) => (p.strategy === actionModal.target ? { ...p, status: "Banned" } : p)),
      );
    } else if (actionModal.type === "force_close") {
      setTrades(
        trades.map((t) => (t.ticket === actionModal.target ? { ...t, status: "Force-Closed" } : t)),
      );
    }

    setActionModal({ isOpen: false, type: "", severity: "", title: "", purpose: "", target: "" });
  };

  const handleAddNote = () => {
    const note = prompt("Enter Internal Operational Note:");
    if (note) setNotes([note, ...notes]);
  };

  return (
    <div className="bg-slate-50 min-h-screen p-6 text-slate-800 font-sans">
      {/* 2. HEADER SECTION */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <SafeIcon icon={Layers} className="text-indigo-600 w-7 h-7" />
            Copy Trading & Social Trading
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor real-time system strategies providers, active connection frameworks, allocation
            margins, and comprehensive risk auditing dashboards.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              openActionModal(
                "add_provider",
                "safe",
                "+ Add Strategy Provider",
                "Register new high-tier portfolio to public leaderboards.",
                "New Provider Pipeline",
              )
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <SafeIcon icon={PlusCircle} className="w-4 h-4" /> + Add Provider
          </button>
          <button
            onClick={() =>
              openActionModal(
                "connect_follower",
                "safe",
                "+ Connect Follower Setup",
                "Manual overriding connection binding for client portfolios.",
                "New Follower Pipeline",
              )
            }
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <SafeIcon icon={Users} className="w-4 h-4" /> + Connect Follower
          </button>
          <button
            onClick={() =>
              alert("Exporting all data structures to CSV spreadsheet specification...")
            }
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <SafeIcon icon={Download} className="w-4 h-4" /> Export Report
          </button>
          <button
            onClick={() => setActiveSubTab("risk")}
            className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition"
          >
            <SafeIcon icon={ShieldAlert} className="w-4 h-4" /> Risk Review
          </button>
        </div>
      </div>

      {/* SUB-NAVIGATION MANAGEMENT SYSTEM */}
      <div className="border-b border-slate-200 mb-6 flex flex-wrap gap-1">
        {[
          { id: "summary", label: "Ecosystem Summary", icon: Layers },
          { id: "providers", label: "Provider Accounts", icon: Users },
          { id: "followers", label: "Follower Setups", icon: Users },
          { id: "trades", label: "Copy Trades Lifecycle", icon: History },
          { id: "risk", label: "Risk Control & Alerts", icon: ShieldAlert },
          { id: "audit", label: "Compliance Audit Logs", icon: FileText },
        ].map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg border-b-2 transition-all ${
                activeSubTab === tab.id
                  ? "border-indigo-600 text-indigo-600 bg-white shadow-sm"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <SafeIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. KPI SUMMARY SECTION */}
      {activeSubTab === "summary" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {INITIAL_KPI_CARDS.map((card) => {
            return (
              <div
                key={card.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {card.title}
                    </p>
                    <h3 className="text-2xl font-bold text-slate-900 mt-1">{card.value}</h3>
                  </div>
                  <div className={`p-2.5 rounded-lg ${card.bg} ${card.color}`}>
                    <SafeIcon icon={card.icon} className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-500">{card.desc}</span>
                  <span className="font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {card.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SEARCH AND FILTER BAR */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <SafeIcon icon={Search} className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search strategy name, ticket, account ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>
        <div className="text-xs text-slate-400 font-mono">
          System Operational Timestamp:{" "}
          <span className="text-slate-700 font-semibold">2026-06-18 15:40:00 UTC</span>
        </div>
      </div>

      {/* --- SUB TAB INTERFACE 1: SUMMARY TAB --- */}
      {activeSubTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* 4. ACTIVE COPY RELATIONSHIPS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <SafeIcon icon={Layers} className="w-4 h-4 text-indigo-500" /> Active Copy
                  Relationships Tracking
                </h2>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full">
                  Live Bindings
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Relationship ID</th>
                      <th className="p-3">Provider Account</th>
                      <th className="p-3">Follower Account</th>
                      <th className="p-3">Allocation Matrix</th>
                      <th className="p-3">Trigger Matrix</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INITIAL_RELATIONSHIPS.map((rel) => (
                      <tr key={rel.id} className="hover:bg-slate-50/80 transition font-mono">
                        <td className="p-3 font-semibold text-slate-900">{rel.id}</td>
                        <td className="p-3 text-slate-700">{rel.provider}</td>
                        <td className="p-3 text-slate-700">{rel.follower}</td>
                        <td className="p-3">
                          <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-sans font-medium">
                            {rel.allocation}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{rel.value}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-sans font-semibold ${rel.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                          >
                            {rel.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. ALLOCATION MANAGEMENT */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <SafeIcon icon={ShieldCheck} className="w-4 h-4 text-emerald-500" /> Allocation
                  Risk Mitigation & Equity Protection
                </h2>
                <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Enterprise Safety Feature
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Follower Account</th>
                      <th className="p-3">Target Provider</th>
                      <th className="p-3">Allocation Mode</th>
                      <th className="p-3">Max Drawdown Constraint</th>
                      <th className="p-3">Automated Safety Protocol</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {INITIAL_ALLOCATIONS.map((alloc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition font-mono">
                        <td className="p-3 font-semibold text-indigo-600">{alloc.account}</td>
                        <td className="p-3 text-slate-700">{alloc.provider}</td>
                        <td className="p-3 text-slate-500">
                          {alloc.mode} ({alloc.value})
                        </td>
                        <td className="p-3 text-rose-600 font-bold">{alloc.maxDrawdown}</td>
                        <td className="p-3 text-slate-700 font-sans">{alloc.protection}</td>
                        <td className="p-3">
                          <span className="bg-emerald-100 text-emerald-800 font-sans font-bold px-2 py-0.5 rounded">
                            {alloc.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Elements */}
          <div className="space-y-6">
            {/* 9. SOCIAL TRADING ACTIVITY FEED */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5 mb-3">
                <SafeIcon icon={Zap} className="w-3.5 h-3.5 text-amber-500" /> Real-Time Social
                Stream Feed
              </h3>
              <div className="space-y-3">
                {feed.map((f, i) => (
                  <div
                    key={i}
                    className="flex gap-2 text-xs items-start bg-slate-50 p-2.5 rounded border border-slate-100"
                  >
                    <span className="font-mono text-slate-400 font-semibold">{f.time}</span>
                    <p className="text-slate-700 flex-1">{f.msg}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12. PROVIDER RANKINGS */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800 flex items-center gap-1">
                <SafeIcon icon={Trophy} className="w-3.5 h-3.5 text-yellow-500" /> Leaderboard
                Ranking Array
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {[
                  {
                    rank: "🏆 1",
                    name: "Gold Scalper",
                    roi: "+18% Monthly",
                    followers: "842 users",
                  },
                  {
                    rank: "🥈 2",
                    name: "Swing Master",
                    roi: "+9% Monthly",
                    followers: "122 users",
                  },
                  {
                    rank: "🥉 3",
                    name: "Alpha FX Momentum",
                    roi: "+6.2% Monthly",
                    followers: "94 users",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="p-3 flex justify-between items-center hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-500">{r.rank}</span>
                      <span className="font-semibold text-slate-800">{r.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-600 font-bold font-mono">{r.roi}</span>
                      <p className="text-[10px] text-slate-400">{r.followers}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 14. INTERNAL NOTES MODULE */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <SafeIcon icon={FileText} className="w-3.5 h-3.5 text-blue-500" /> Operational
                  Action Notes
                </h3>
                <button
                  onClick={handleAddNote}
                  className="text-[11px] font-bold text-indigo-600 hover:underline"
                >
                  + Add Note
                </button>
              </div>
              <div className="space-y-2">
                {notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-amber-50/50 border border-amber-200/60 rounded text-xs text-slate-700 font-medium"
                  >
                    • {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB TAB INTERFACE 2: PROVIDER ACCOUNTS --- */}
      {activeSubTab === "providers" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900">
                Live Strategy Provider Accounts Master Deck
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="p-3">Provider Account</th>
                    <th className="p-3">Strategy Name</th>
                    <th className="p-3">Connected Followers</th>
                    <th className="p-3">AUM</th>
                    <th className="p-3">Monthly ROI</th>
                    <th className="p-3">Max Drawdown</th>
                    <th className="p-3">Profit Share</th>
                    <th className="p-3">Risk Assessment</th>
                    <th className="p-3">System Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {providers
                    .filter(
                      (p) =>
                        p.strategy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.account.includes(searchQuery),
                    )
                    .map((p, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-indigo-50/40 cursor-pointer transition font-mono group"
                        onClick={() => {
                          setSelectedProvider(p);
                          setProviderDrawerTab("Overview");
                        }}
                      >
                        <td className="p-3 font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                          <SafeIcon
                            icon={Eye}
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-500 transition"
                          />
                          {p.account}
                        </td>
                        <td className="p-3 font-sans font-semibold text-slate-700">{p.strategy}</td>
                        <td className="p-3 font-sans text-slate-800 font-medium">{p.followers}</td>
                        <td className="p-3 text-slate-900 font-bold">{p.aum}</td>
                        <td className="p-3 text-emerald-600 font-bold">{p.roi}</td>
                        <td className="p-3 text-rose-600 font-medium">{p.drawdown}</td>
                        <td className="p-3 text-slate-600">{p.profitShare}</td>
                        <td className="p-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
                              p.risk === "Low"
                                ? "bg-emerald-50 text-emerald-700"
                                : p.risk === "Medium"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            {p.risk} Score
                          </span>
                        </td>
                        <td className="p-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              p.status === "Active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td
                          className="p-3 text-center font-sans"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() =>
                                openActionModal(
                                  "pause_strategy",
                                  "moderate",
                                  "Pause Strategy execution",
                                  "Temporarily halt copy generation.",
                                  p.strategy,
                                )
                              }
                              className="p-1 hover:bg-slate-100 text-amber-600 rounded"
                            >
                              <SafeIcon icon={Pause} className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() =>
                                openActionModal(
                                  "ban_provider",
                                  "dangerous",
                                  "Ban Strategy Provider Portfolio",
                                  "Revoke permissions permanently.",
                                  p.strategy,
                                )
                              }
                              className="p-1 hover:bg-slate-100 text-rose-600 rounded"
                            >
                              <SafeIcon icon={Ban} className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB TAB INTERFACE 3: FOLLOWER SETUPS --- */}
      {activeSubTab === "followers" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h2 className="text-sm font-bold text-slate-900">
                Active Follower Accounts Master Configuration Matrix
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="p-3">Follower Account</th>
                    <th className="p-3">Client Name</th>
                    <th className="p-3">Following Strategy Provider</th>
                    <th className="p-3">Allocation Framework Matrix</th>
                    <th className="p-3">Dynamic Config Metrics</th>
                    <th className="p-3">Unrealized Copy PnL</th>
                    <th className="p-3">Copy Status</th>
                    <th className="p-3 text-center">Interventions Desk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {followers
                    .filter(
                      (f) =>
                        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        f.account.includes(searchQuery),
                    )
                    .map((f, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-indigo-50/40 cursor-pointer transition font-mono group"
                        onClick={() => {
                          setSelectedFollower(f);
                          setFollowerDrawerTab("Overview");
                        }}
                      >
                        <td className="p-3 font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                          <SafeIcon
                            icon={Eye}
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-500 transition"
                          />
                          {f.account}
                        </td>
                        <td className="p-3 font-sans font-medium text-slate-700">{f.name}</td>
                        <td className="p-3 text-slate-600">{f.provider}</td>
                        <td className="p-3 font-sans">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
                            {f.allocationType}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{f.allocationValue}</td>
                        <td
                          className={`p-3 font-bold ${f.pnl.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}
                        >
                          {f.pnl}
                        </td>
                        <td className="p-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              f.status === "Copying"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {f.status}
                          </span>
                        </td>
                        <td
                          className="p-3 text-center font-sans"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              openActionModal(
                                "adjust_allocation",
                                "moderate",
                                "Modify Follower Allocation Settings",
                                "Alter capital risk parameters.",
                                f.account,
                              )
                            }
                            className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 px-2 py-1 rounded font-semibold transition"
                          >
                            Adjust Allocation
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB TAB INTERFACE 4: COPY TRADES LIFECYCLE --- */}
      {activeSubTab === "trades" && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Isolated Copy Trade Execution Ledger
                </h2>
                <p className="text-[11px] text-rose-500 mt-0.5 font-medium">
                  ⚠️ Manual trades are fully excluded from this record.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="p-3">Ticket ID</th>
                    <th className="p-3">Master Ticket ID</th>
                    <th className="p-3">Source Provider</th>
                    <th className="p-3">Follower Account</th>
                    <th className="p-3">Symbol</th>
                    <th className="p-3">Volume Lots</th>
                    <th className="p-3">Execution Price</th>
                    <th className="p-3">Slippage</th>
                    <th className="p-3">Sync Latency</th>
                    <th className="p-3">PnL</th>
                    <th className="p-3">Execution Status</th>
                    <th className="p-3 text-center">Emergency Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trades
                    .filter(
                      (t) =>
                        t.symbol.includes(searchQuery.toUpperCase()) ||
                        t.ticket.includes(searchQuery),
                    )
                    .map((t, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-indigo-50/40 cursor-pointer transition font-mono group"
                        onClick={() => {
                          setSelectedTrade(t);
                          setTradeDrawerTab("Overview");
                        }}
                      >
                        <td className="p-3 font-bold text-slate-900 group-hover:text-indigo-600 flex items-center gap-1">
                          <SafeIcon
                            icon={Eye}
                            className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-indigo-500 transition"
                          />
                          #{t.ticket}
                        </td>
                        <td className="p-3 text-slate-400">{t.masterTicket}</td>
                        <td className="p-3 text-slate-700">{t.provider}</td>
                        <td className="p-3 text-indigo-600">{t.follower}</td>
                        <td className="p-3">
                          <span className="bg-slate-100 font-sans font-bold text-slate-800 px-1.5 py-0.5 rounded">
                            {t.symbol}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-slate-800">{t.volume}</td>
                        <td className="p-3 text-slate-600">{t.price}</td>
                        <td className="p-3 text-amber-600">{t.slippage}</td>
                        <td className="p-3 text-slate-500">{t.delay}</td>
                        <td
                          className={`p-3 font-bold ${t.pnl.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}
                        >
                          {t.pnl}
                        </td>
                        <td className="p-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              t.status === "Open"
                                ? "bg-blue-50 text-blue-700 ring-1 ring-blue-600/20"
                                : t.status === "Closed"
                                  ? "bg-slate-100 text-slate-700"
                                  : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>
                        <td
                          className="p-3 text-center font-sans"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t.status === "Open" ? (
                            <button
                              onClick={() =>
                                openActionModal(
                                  "force_close",
                                  "dangerous",
                                  "Force Close Live Copied Trade Order",
                                  "Instantly issue liquidation request.",
                                  t.ticket,
                                )
                              }
                              className="text-[11px] bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-2 py-1 rounded transition"
                            >
                              Force Close
                            </button>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 8. PROFIT SHARING */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <h2 className="text-sm font-bold text-slate-900">
                Profit Sharing Configurations & Real Earnings Distribution
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 uppercase font-semibold border-b border-slate-200 tracking-wider">
                  <tr>
                    <th className="p-3">Provider Strategy Profile</th>
                    <th className="p-3">Connected Follower Portfolio</th>
                    <th className="p-3">Gross Trading Yield Profit</th>
                    <th className="p-3">Provider Fee Matrix %</th>
                    <th className="p-3">Earned Fee Yield Amount</th>
                    <th className="p-3">Retained Follower Net Capital</th>
                    <th className="p-3">Fee Distribution Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {INITIAL_PROFIT_SHARING.map((ps, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 text-slate-900 font-sans font-semibold">{ps.provider}</td>
                      <td className="p-3 text-slate-600 font-sans">{ps.follower}</td>
                      <td className="p-3 text-slate-900 font-bold">{ps.grossProfit}</td>
                      <td className="p-3 text-indigo-600 font-bold">{ps.sharePct}</td>
                      <td className="p-3 text-emerald-600 font-bold">{ps.earned}</td>
                      <td className="p-3 text-slate-700">{ps.distributed}</td>
                      <td className="p-3 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${ps.status === "Paid" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {ps.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB TAB INTERFACE 5: RISK CONTROL & ALERTS --- */}
      {activeSubTab === "risk" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-900">
                  Algorithmic Strategy Risk Escalation Console
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {INITIAL_RISK_ALERTS.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                      alert.severity === "Critical"
                        ? "bg-rose-50/40 border-rose-200"
                        : alert.severity === "High"
                          ? "bg-amber-50/40 border-amber-200"
                          : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded font-mono font-bold text-[10px] ${
                            alert.severity === "Critical"
                              ? "bg-rose-600 text-white"
                              : alert.severity === "High"
                                ? "bg-amber-500 text-slate-900"
                                : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {alert.severity} Risk
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{alert.alert}</h4>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        Strategy Target:{" "}
                        <span className="text-indigo-600 font-mono font-bold">
                          {alert.strategy}
                        </span>
                      </p>
                      <p className="text-xs text-slate-500 max-w-xl">{alert.details}</p>
                    </div>
                    <button
                      onClick={() =>
                        openActionModal(
                          "pause_strategy",
                          "dangerous",
                          "Emergency Isolation Blockade",
                          "Instantly freeze connectivity bounds.",
                          alert.strategy,
                        )
                      }
                      className="whitespace-nowrap text-xs font-bold text-rose-600 hover:text-white border border-rose-300 bg-white hover:bg-rose-600 transition px-3 py-2 rounded-lg"
                    >
                      Isolate Strategy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <h2 className="text-sm font-bold text-slate-900">
                  Permissions Enforcement State Log
                </h2>
              </div>
              <div className="divide-y divide-slate-100 text-xs">
                {INITIAL_RESTRICTIONS.map((rest, idx) => (
                  <div key={idx} className="p-4 space-y-2 hover:bg-slate-50 transition">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded font-mono">
                        {rest.status}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{rest.date}</span>
                    </div>
                    <p className="text-slate-800 font-medium font-sans">
                      Target: <span className="font-mono text-indigo-600">{rest.strategy}</span>
                    </p>
                    <p className="text-slate-500 text-[11px]">Enforcement Cause: {rest.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- SUB TAB INTERFACE 6: COMPLIANCE AUDIT TRAIL --- */}
      {activeSubTab === "audit" && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200">
            <h2 className="text-sm font-bold text-slate-900">
              Complete Structural Audit Trail Framework Ledger
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Dispatched Action Event Type</th>
                  <th className="p-3">Authorized Operator Identity</th>
                  <th className="p-3">Target Object Binding Instance</th>
                  <th className="p-3">Execution Operational Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {audit.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition">
                    <td className="p-3 text-slate-900 font-bold flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      {log.action}
                    </td>
                    <td className="p-3 font-sans font-medium text-slate-700">{log.by}</td>
                    <td className="p-3 text-slate-600 font-sans">{log.target}</td>
                    <td className="p-3 text-slate-400 font-bold">{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- 1. STRATEGY PROVIDER DETAILS SIDE DRAWER --- */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedProvider(null)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-indigo-500 text-white px-2 py-0.5 rounded font-mono font-bold">
                      PROVIDER OVERVIEW
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Account ID: {selectedProvider.account}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-slate-100">
                    Strategy Matrix: {selectedProvider.strategy}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <SafeIcon icon={X} className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 flex gap-1 overflow-x-auto scrollbar-none touch-pan-x select-none snap-x">
                {[
                  "Provider Overview",
                  "Performance Metrics",
                  "Followers Analytics",
                  "Risk Analysis",
                  "Trading Style",
                  "Profit Sharing",
                  "Open Positions",
                  "Recent Copy Trades",
                  "Restrictions",
                  "Timeline",
                  "Notes",
                  "Audit Logs",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setProviderDrawerTab(tab)}
                    className={`px-3 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition snap-clamp ${
                      providerDrawerTab === tab
                        ? "border-indigo-600 text-indigo-600 font-extrabold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                {/* 1. Provider Overview */}
                {providerDrawerTab === "Provider Overview" && (
                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Account ID Binding
                      </span>
                      <span className="text-slate-900 font-bold text-base">
                        {selectedProvider.account}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Strategy Identity Name
                      </span>
                      <span className="text-indigo-600 font-bold text-base font-sans">
                        {selectedProvider.strategy}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Leaderboard Operational Status
                      </span>
                      <span className="text-emerald-600 font-bold font-sans">
                        {selectedProvider.status || "Active"}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Assets Under Management (AUM)
                      </span>
                      <span className="text-slate-900 font-bold">
                        {selectedProvider.aum || "$0.00"}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Performance Metrics */}
                {providerDrawerTab === "Performance Metrics" && (
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                      Historical Portfolio Trading Yield
                    </h3>
                    <div className="grid grid-cols-3 gap-4 font-mono text-center">
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <p className="text-xs text-emerald-700 font-sans font-semibold">
                          Monthly ROI
                        </p>
                        <span className="text-xl font-bold text-emerald-700">
                          {selectedProvider.roi || "0.00%"}
                        </span>
                      </div>
                      <div className="p-3 bg-rose-50 rounded-lg border border-rose-200">
                        <p className="text-xs text-rose-700 font-sans font-semibold">
                          Max Peak Drawdown
                        </p>
                        <span className="text-xl font-bold text-rose-700">
                          {selectedProvider.drawdown || "0.00%"}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-600 font-sans font-semibold">
                          Total PnL Generated
                        </p>
                        <span className="text-xl font-bold text-slate-900">
                          {selectedProvider.totalProfit || "$0.00"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Followers Analytics */}
                {providerDrawerTab === "Followers Analytics" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                        Connected Client Demographics
                      </h3>
                      <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        Active Capital Pool: {selectedProvider.aum || "$0.00"}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                      <p className="text-xs text-slate-500 font-medium">
                        Active Attached Followers Counter Bindings
                      </p>
                      <h4 className="text-3xl font-extrabold text-slate-900 font-mono mt-1">
                        {selectedProvider.followers || 0} Accounts
                      </h4>
                    </div>
                  </div>
                )}

                {/* 4. Risk Analysis */}
                {providerDrawerTab === "Risk Analysis" && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={AlertTriangle} className="w-4 h-4" /> Real-time Threat
                      Evaluation
                    </h4>
                    <p className="text-xs text-slate-700">
                      This strategy model architecture is evaluated as a{" "}
                      <span className="font-bold font-mono text-indigo-700">
                        {selectedProvider.risk || "Medium"} risk profile instance
                      </span>
                      .
                    </p>
                  </div>
                )}

                {/* 5. Trading Style */}
                {providerDrawerTab === "Trading Style" && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase">
                      Execution Framework Parameters
                    </h4>
                    <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                      <div>
                        <span className="text-slate-400">Trading Strategy Type:</span> Scalping /
                        Grid
                      </div>
                      <div>
                        <span className="text-slate-400">Avg Hold Time:</span> 2h 45m
                      </div>
                      <div>
                        <span className="text-slate-400">Most Traded Asset:</span> EURUSD, XAUUSD
                      </div>
                      <div>
                        <span className="text-slate-400">Profit Factor:</span> 1.64
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Profit Sharing */}
                {providerDrawerTab === "Profit Sharing" && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono space-y-1">
                    <p className="text-xs text-slate-400 font-sans font-semibold">
                      Automated Performance Billing Split
                    </p>
                    <p className="text-slate-800 font-sans text-xs">
                      Allocates{" "}
                      <span className="text-indigo-600 font-bold">
                        {selectedProvider.profitShare || "20%"}
                      </span>{" "}
                      directly as a layout target payout from all generated follower profits.
                    </p>
                  </div>
                )}

                {/* 7. Open Positions */}
                {providerDrawerTab === "Open Positions" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Live Master Float Orders
                    </h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-2">Ticket</th>
                            <th className="p-2">Symbol</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Volume</th>
                            <th className="p-2 text-right">PnL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="p-2">9823120</td>
                            <td className="p-2 font-sans font-bold">XAUUSD</td>
                            <td className="p-2 text-emerald-600 font-bold">BUY</td>
                            <td className="p-2">2.50 Lots</td>
                            <td className="p-2 text-right text-emerald-600 font-bold">+$420.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 8. Recent Copy Trades */}
                {providerDrawerTab === "Recent Copy Trades" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Historical Master Dispatched Logs
                    </h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-2">Ticket</th>
                            <th className="p-2">Symbol</th>
                            <th className="p-2">Type</th>
                            <th className="p-2">Close Price</th>
                            <th className="p-2 text-right">Final PnL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr className="hover:bg-slate-50">
                            <td className="p-2">9821092</td>
                            <td className="p-2 font-sans font-bold">EURUSD</td>
                            <td className="p-2 text-rose-600 font-bold">SELL</td>
                            <td className="p-2">1.08420</td>
                            <td className="p-2 text-right text-rose-600 font-bold">-$115.00</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 9. Restrictions */}
                {providerDrawerTab === "Restrictions" && (
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
                    <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={Lock} className="w-4 h-4" /> Operational Limitations &
                      Guardrails
                    </h4>
                    <div className="text-xs text-slate-700 space-y-1">
                      <p>
                        • Maximum Multiplier Allowed: <span className="font-bold">3.0x</span>
                      </p>
                      <p>
                        • News Trading Execution:{" "}
                        <span className="text-rose-600 font-bold">Restricted</span>
                      </p>
                      <p>
                        • Restricted Symbols Array:{" "}
                        <span className="font-mono bg-white px-1 border rounded">USDTWD</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* 10. Timeline */}
                {providerDrawerTab === "Timeline" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Lifecycle Milestones
                    </h4>
                    <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 font-mono text-xs">
                      <div className="relative">
                        <div className="absolute -left-[31px] bg-white p-0.5 border-2 border-indigo-500 rounded-full">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400">2026-04-12 10:20</span>
                        <p className="font-sans font-semibold text-slate-800">
                          Strategy Matrix Created & Verified
                        </p>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[31px] bg-white p-0.5 border-2 border-emerald-500 rounded-full">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400">2026-05-01 14:00</span>
                        <p className="font-sans font-semibold text-slate-800">
                          Switched state to Public Leaderboard
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 11. Notes */}
                {providerDrawerTab === "Notes" && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Internal Administrator Annotations
                    </h4>
                    <textarea
                      className="w-full h-24 p-2 border border-slate-200 rounded-lg text-xs font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      placeholder="Add administrative notes regarding strategy anomalies..."
                    />
                    <button className="bg-slate-800 hover:bg-slate-900 text-white text-xs px-3 py-1.5 rounded font-bold transition">
                      Save Context Note
                    </button>
                  </div>
                )}

                {/* 12. Audit Logs */}
                {providerDrawerTab === "Audit Logs" && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      System Level Mutate Trails
                    </h4>
                    <div className="bg-slate-50 border rounded-lg divide-y text-xs font-mono">
                      <div className="p-2.5 flex justify-between">
                        <div>
                          <span className="text-indigo-600 font-bold">[SYSTEM_MODERATE]</span> Max
                          Drawdown Config Updated
                        </div>
                        <span className="text-slate-400">Admin_01</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() =>
                    openActionModal &&
                    openActionModal(
                      "pause_strategy",
                      "moderate",
                      "Pause Strategy",
                      "Temporary halt copy mechanism.",
                      selectedProvider.strategy,
                    )
                  }
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded transition"
                >
                  Pause Strategy
                </button>
                <button
                  onClick={() =>
                    openActionModal &&
                    openActionModal(
                      "ban_provider",
                      "dangerous",
                      "Ban Strategy Portfolio Instance",
                      "Severe restriction.",
                      selectedProvider.strategy,
                    )
                  }
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded transition"
                >
                  Ban Strategy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 2. FOLLOWER DETAILS SIDE DRAWER --- */}
      {selectedFollower && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedFollower(null)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
              {/* Drawer Header */}
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-emerald-600 text-white px-2 py-0.5 rounded font-mono font-bold">
                      FOLLOWER SETUP SPECIFICATION
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      ID: {selectedFollower.account}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-slate-100">
                    Client: {selectedFollower.name}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedFollower(null)}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <SafeIcon icon={X} className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="bg-slate-100 border-b border-slate-200 px-4 flex gap-1 overflow-x-auto scrollbar-none touch-pan-x select-none snap-x">
                {[
                  "Follower Overview",
                  "Provider Connections",
                  "Allocation Settings",
                  "Protection Rules",
                  "Copy Performance",
                  "Copied Trades",
                  "Risk Monitoring",
                  "Restrictions",
                  "Timeline",
                  "Audit Logs",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFollowerDrawerTab(tab)}
                    className={`px-3 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition snap-clamp ${
                      followerDrawerTab === tab
                        ? "border-indigo-600 text-indigo-600 font-extrabold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                {/* 1. Follower Overview */}
                {followerDrawerTab === "Follower Overview" && (
                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Account Binding
                      </span>
                      <span className="text-slate-900 font-bold">{selectedFollower.account}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Client Registered Name
                      </span>
                      <span className="text-slate-900 font-bold font-sans">
                        {selectedFollower.name}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Unrealized Copy PnL Yield
                      </span>
                      <span className="text-emerald-600 font-bold font-sans text-base">
                        {selectedFollower.pnl || "$0.00"}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Connection Copy Status
                      </span>
                      <span className="text-indigo-600 font-bold font-sans">
                        {selectedFollower.status || "Syncing"}
                      </span>
                    </div>
                  </div>
                )}

                {/* 2. Provider Connections */}
                {followerDrawerTab === "Provider Connections" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 font-sans">
                      Active Target Strategy Binding
                    </h4>
                    <p className="text-slate-900 font-bold font-sans">
                      Currently copying Master Portfolio Instance:{" "}
                      <span className="text-indigo-600 font-mono font-bold">
                        {selectedFollower.provider || "N/A"}
                      </span>
                    </p>
                  </div>
                )}

                {/* 3. Allocation Settings */}
                {followerDrawerTab === "Allocation Settings" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 font-mono">
                    <h4 className="text-xs font-bold uppercase text-slate-400 font-sans">
                      Replication Engine Parameter Logic
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-slate-400 block font-sans">
                          Allocation Class Mode
                        </span>
                        <span className="text-slate-800 font-bold">
                          {selectedFollower.allocationType || "Fixed Multiplier"}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block font-sans">
                          Calculated Scalar Factor Value
                        </span>
                        <span className="text-indigo-600 font-bold">
                          {selectedFollower.allocationValue || "1.0x"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Protection Rules */}
                {followerDrawerTab === "Protection Rules" && (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={ShieldCheck} className="w-4 h-4" /> Core Equity Safeguard
                      Active
                    </h4>
                    <p className="text-xs text-slate-700">
                      If peak floating losses hit bounds:{" "}
                      <span className="font-bold text-emerald-700">
                        stalling copy binding generation and executing closeout.
                      </span>
                    </p>
                  </div>
                )}

                {/* 5. Copy Performance */}
                {followerDrawerTab === "Copy Performance" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Mirror Analytics Engine PnL Trace
                    </h4>
                    <div className="grid grid-cols-2 gap-4 font-mono text-center">
                      <div className="p-3 bg-slate-50 border rounded-lg">
                        <span className="text-xs text-slate-400 block font-sans">
                          Total Profit Copied
                        </span>
                        <span className="text-lg font-bold text-emerald-600">+$1,240.00</span>
                      </div>
                      <div className="p-3 bg-slate-50 border rounded-lg">
                        <span className="text-xs text-slate-400 block font-sans">
                          Copy Success Rate
                        </span>
                        <span className="text-lg font-bold text-indigo-600">94.2%</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. Copied Trades */}
                {followerDrawerTab === "Copied Trades" && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Child Account Mirror Execution Audit
                    </h4>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-left font-mono text-xs">
                        <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] border-b border-slate-200">
                          <tr>
                            <th className="p-2">Ticket</th>
                            <th className="p-2">Symbol</th>
                            <th className="p-2">Execution Price</th>
                            <th className="p-2">Slippage</th>
                            <th className="p-2 text-right">PnL</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="p-2">5541291</td>
                            <td className="p-2 font-sans font-bold">XAUUSD</td>
                            <td className="p-2">2341.20</td>
                            <td className="p-2 text-amber-600">12ms (+0.2 pips)</td>
                            <td className="p-2 text-right text-emerald-600 font-bold">+$41.80</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 7. Risk Monitoring */}
                {followerDrawerTab === "Risk Monitoring" && (
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-3">
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={ShieldAlert} className="w-4 h-4" /> Live Margin & Floating
                      Vector Risks
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-amber-900">Leverage Margin:</span> 1:500
                      </div>
                      <div>
                        <span className="text-amber-900">Exposure Drawdown:</span> 2.14%
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. Restrictions */}
                {followerDrawerTab === "Restrictions" && (
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
                    <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1">
                      <SafeIcon icon={Lock} className="w-4 h-4" /> Safety Limits & Blocks
                    </h4>
                    <div className="text-xs text-slate-700 space-y-1">
                      <p>
                        • Max Allowed Open Lots: <span className="font-bold">5.00 Lots</span>
                      </p>
                      <p>
                        • Force Close Stop Level:{" "}
                        <span className="text-rose-600 font-bold">30% Margin Level</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* 9. Timeline */}
                {followerDrawerTab === "Timeline" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Follower Activity Timeline
                    </h4>
                    <div className="relative pl-6 border-l-2 border-slate-200 space-y-4 font-mono text-xs">
                      <div className="relative">
                        <div className="absolute -left-[31px] bg-white p-0.5 border-2 border-indigo-500 rounded-full">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        </div>
                        <span className="text-slate-400">2026-05-10 09:15</span>
                        <p className="font-sans font-semibold text-slate-800">
                          Connected to Master Provider Account
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 10. Audit Logs */}
                {followerDrawerTab === "Audit Logs" && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">
                      Account Audit History
                    </h4>
                    <div className="bg-slate-50 border rounded-lg divide-y text-xs font-mono">
                      <div className="p-2.5 flex justify-between">
                        <div>Allocation logic scaled to 1.0x factor</div>
                        <span className="text-slate-400">System</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                <button
                  onClick={() =>
                    openActionModal &&
                    openActionModal(
                      "pause_copy",
                      "moderate",
                      "Pause Copying",
                      "Halt copy trade streaming.",
                      selectedFollower.account,
                    )
                  }
                  className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded transition"
                >
                  Pause Copying
                </button>
                <button
                  onClick={() =>
                    openActionModal &&
                    openActionModal(
                      "disconnect_provider",
                      "dangerous",
                      "Disconnect Provider",
                      "Unbind from master channel completely.",
                      selectedFollower.account,
                    )
                  }
                  className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded transition"
                >
                  Disconnect Provider
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- 3. COPY TRADE LIFECYCLE SIDE DRAWER --- */}
      {/* {selectedTrade && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSelectedTrade(null)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col">
              <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-500 text-slate-950 px-2 py-0.5 rounded font-mono font-bold">
                      SINGLE COPY TRADE INVESTIGATION
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Ticket: #{selectedTrade.ticket}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-slate-100">
                    Lifecycle: {selectedTrade.symbol} - {selectedTrade.volume}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedTrade(null)}
                  className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <SafeIcon icon={X} className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-slate-100 border-b border-slate-200 px-4 flex gap-1 overflow-x-auto">
                {[
                  "Overview Summary",
                  "Provider Master Node Details",
                  "Follower Terminal Replication",
                  "Execution Latency Quality Analysis",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTradeDrawerTab(tab)}
                    className={`px-3 py-2.5 text-xs font-bold whitespace-nowrap border-b-2 transition ${
                      tradeDrawerTab === tab
                        ? "border-indigo-600 text-indigo-600 font-extrabold"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
                {tradeDrawerTab === "Overview Summary" && (
                  <div className="grid grid-cols-2 gap-4 font-mono">
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Copy Ticket ID
                      </span>
                      <span className="text-slate-900 font-bold">#{selectedTrade.ticket}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Financial Instrument Symbol
                      </span>
                      <span className="text-indigo-600 font-bold font-sans text-base">
                        {selectedTrade.symbol}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Replicated Volume Allocated
                      </span>
                      <span className="text-slate-900 font-bold">{selectedTrade.volume}</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <span className="text-xs text-slate-400 block font-sans font-semibold">
                        Yield PnL
                      </span>
                      <span className="text-emerald-600 font-bold text-base">
                        {selectedTrade.pnl}
                      </span>
                    </div>
                  </div>
                )}

                {tradeDrawerTab === "Provider Master Node Details" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 font-sans">
                      Originating Primary Master Order
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <p className="text-slate-600">
                        Provider Node Account:{" "}
                        <span className="text-slate-900 font-bold font-mono">
                          {selectedTrade.provider}
                        </span>
                      </p>
                      <p className="text-slate-600">
                        Master Order Reference ID:{" "}
                        <span className="text-slate-900 font-bold font-mono">
                          {selectedTrade.masterTicket}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {tradeDrawerTab === "Follower Terminal Replication" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono space-y-2">
                    <h4 className="text-xs font-bold uppercase text-slate-400 font-sans">
                      Follower Execution Parameters
                    </h4>
                    <p className="text-slate-600">
                      Target Terminal Wallet Instance:{" "}
                      <span className="text-indigo-600 font-bold font-mono">
                        {selectedTrade.follower}
                      </span>
                    </p>
                    <p className="text-slate-600">
                      Assigned Strike Price Quote:{" "}
                      <span className="text-slate-900 font-bold font-mono">
                        {selectedTrade.price}
                      </span>
                    </p>
                  </div>
                )}

                {tradeDrawerTab === "Execution Latency Quality Analysis" && (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono space-y-3">
                    <h4 className="text-xs font-bold uppercase text-slate-400 font-sans">
                      Bridges Latency Metrology Report
                    </h4>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-sans">
                          Bridge Delay Time
                        </span>
                        <span className="font-bold text-slate-800">{selectedTrade.delay}</span>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-sans">
                          Replication Slippage
                        </span>
                        <span className="font-bold text-amber-600">{selectedTrade.slippage}</span>
                      </div>
                      <div className="p-2 bg-white rounded border border-slate-200">
                        <span className="text-[10px] text-slate-400 block font-sans">
                          Trading Node Core
                        </span>
                        <span className="font-bold text-indigo-600 font-sans">
                          {selectedTrade.server}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
                {selectedTrade.status === "Open" ? (
                  <button
                    onClick={() =>
                      openActionModal(
                        "force_close",
                        "dangerous",
                        "Force Close Live Trade Ticket Order",
                        "Instantly command liquidation.",
                        selectedTrade.ticket,
                      )
                    }
                    className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-4 py-2 rounded transition"
                  >
                    Force Close Position
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-medium font-mono p-2">
                    This historical trade entry lifecycle is fully closed out.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* --- GLOBAL CONFIRMATION COMPLIANCE MODAL --- */}
      {actionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setActionModal({ isOpen: false })}
          />
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden relative z-10">
            <div
              className={`p-4 text-white font-bold text-sm flex items-center gap-2 ${
                actionModal.severity === "dangerous"
                  ? "bg-rose-600"
                  : actionModal.severity === "moderate"
                    ? "bg-amber-500 text-slate-950"
                    : "bg-indigo-600"
              }`}
            >
              {actionModal.severity === "dangerous" ? (
                <SafeIcon icon={ShieldAlert} className="w-5 h-5" />
              ) : (
                <SafeIcon icon={CheckCircle} className="w-5 h-5" />
              )}
              {actionModal.title}
            </div>

            <div className="p-6 space-y-4">
              <div className="text-xs bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-700 space-y-1">
                <p className="font-bold">Operational Context Profile:</p>
                <p className="font-medium text-slate-600">{actionModal.purpose}</p>
                <p className="mt-2 text-slate-900">
                  Target Constraint Reference Entity:{" "}
                  <span className="font-mono font-bold text-indigo-600">{actionModal.target}</span>
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                  Compliance Justification Reason *
                </label>
                <textarea
                  rows={3}
                  required
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="Enter specific mandatory audit logs justification tracking reason..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() =>
                  setActionModal({
                    isOpen: false,
                    type: "",
                    severity: "",
                    title: "",
                    purpose: "",
                    target: "",
                  })
                }
                className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition"
              >
                Abort Event
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={!reasonInput.trim()}
                className={`text-xs font-bold px-4 py-2 rounded-lg text-white transition ${
                  !reasonInput.trim()
                    ? "bg-slate-300 cursor-not-allowed"
                    : actionModal.severity === "dangerous"
                      ? "bg-rose-600 hover:bg-rose-700"
                      : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Commit Compliance Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
