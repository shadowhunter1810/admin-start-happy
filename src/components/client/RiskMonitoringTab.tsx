// File Name: RiskMonitoringTab.jsx
import React, { useState } from "react";
import {
  Shield,
  AlertTriangle,
  Activity,
  Brain,
  BarChart3,
  Layers,
  Zap,
  UserCheck,
  ArrowDownLeft,
  ArrowUpRight,
  Monitor,
  Globe,
  Link2,
  Users,
  Users2,
  Cpu,
  History,
  Sliders,
  Briefcase,
  Lock,
  Clock,
  FileText,
  Settings,
  HelpCircle,
  Search,
  Filter,
  Download,
  UserMinus,
  Plus,
  ChevronRight,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

export default function RiskMonitoringTab() {
  // Navigation & Drawer States
  const [activeTab, setActiveTab] = useState("active-alerts");
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [drawerTab, setDrawerTab] = useState("overview");
  const [riskTierOverride, setRiskTierOverride] = useState("HIGH");
  const [overrideReason, setOverrideReason] = useState("");

  // Sample Data matching exactly document definitions
  const topKpis = [
    {
      label: "Overall Risk Score",
      value: "72/100",
      purpose: "total risk",
      trend: "up",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Risk Tier",
      value: "HIGH",
      purpose: "LOW/HIGH tier stratification",
      trend: "stable",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Fraud Probability",
      value: "81%",
      purpose: "AI prediction metrics",
      trend: "up",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "AML Risk Score",
      value: "MEDIUM",
      purpose: "compliance risk level",
      trend: "stable",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },
    {
      label: "Active Alerts",
      value: "3 Active",
      purpose: "current critical threats",
      trend: "up",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Open Investigations",
      value: "2 Cases",
      purpose: "unresolved compliance cases",
      trend: "stable",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Current Margin Level",
      value: "145%",
      purpose: "liquidation risk check",
      trend: "down",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Max Leverage Used",
      value: "1:500",
      purpose: "leverage abuse metric",
      trend: "stable",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "Withdrawal Risk Score",
      value: "84/100",
      purpose: "payout fraud probability",
      trend: "up",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Device Trust Score",
      value: "42/100",
      purpose: "login safety matrix",
      trend: "down",
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Payment Risk Score",
      value: "68/100",
      purpose: "payment method abuse risk",
      trend: "up",
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Current Restrictions",
      value: "3 Active",
      purpose: "active operational blocks",
      trend: "stable",
      color: "text-red-600",
      bg: "bg-red-50",
    },
  ];

  const activeAlerts = [
    {
      id: "RSK-8821",
      type: "Quick Withdrawal",
      severity: "HIGH",
      status: "OPEN",
      triggered: "10:21 AM",
      details: "Deposit: $50,000 | Volume: 0.3 lots | Withdrawal: $48,500 after 12 mins",
    },
    {
      id: "AML-2291",
      type: "Suspicious Pattern",
      severity: "CRITICAL",
      status: "INVESTIGATING",
      triggered: "11:04 AM",
      details: "Rapid deposit pattern assigned to Rajan Mehta",
    },
    {
      id: "DEV-1144",
      type: "Device Sharing",
      severity: "MEDIUM",
      status: "MONITORING",
      triggered: "Yesterday",
      details: "Chrome/Windows Germany VPN usage detected",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased p-6">
      {/* HEADER SECTION (Section 2) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Risk Monitoring & Compliance
            </h1>
          </div>
          <p className="text-sm text-slate-500">
            Monitor client profiles, system fraud probabilities, trading exposure, AML state, and
            execution lifecycles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadowTransition transition-all">
            Risk Review
          </button>
          <button className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1">
            <Download className="w-3.5 h-3.5" /> Export Risk Report
          </button>
        </div>
      </div>

      {/* OVERVIEW DASHBOARD (Section 1) & TOP KPI CARDS (Section 1.1) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-md font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-500" /> Executive Overview Dashboard
          </h2>
          <div className="bg-orange-100 text-orange-800 px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" /> Risk Trend: Increasing (+18 last 7 days)
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topKpis.map((kpi, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {kpi.label}
                </span>
                {kpi.trend === "up" && <ArrowUpRight className="w-4 h-4 text-red-500" />}
                {kpi.trend === "down" && <ArrowDownLeft className="w-4 h-4 text-green-500" />}
              </div>
              <div className="flex items-baseline gap-2">
                <span className={`text-2xl font-bold tracking-tight ${kpi.color}`}>
                  {kpi.value}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 capitalize italic border-t border-slate-50 pt-1">
                Purpose: {kpi.purpose}
              </p>
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${kpi.bg}`} />
            </div>
          ))}
        </div>
      </div>

      {/* TABS ARCHITECTURE TO ACCOMMODATE ALL SPECIFIED SECTIONS WITHOUT MISSING ANY */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        {[
          { id: "active-alerts", label: "Active Alerts (2)", icon: AlertTriangle },
          { id: "risk-intel", label: "Risk Intelligence", icon: Brain },
          { id: "trading-risk", label: "Trading Risk Analysis", icon: BarChart3 },
          { id: "exposure", label: "Exposure Monitoring", icon: Layers },
          { id: "margin-leverage", label: "Margin & Leverage", icon: Zap },
          { id: "behavioral", label: "Behavioral Risk", icon: UserCheck },
          { id: "aml-compliance", label: "AML & Compliance", icon: Shield },
          { id: "withdrawal-deposit", label: "Withdrawal & Deposit Risk", icon: ArrowDownLeft },
          { id: "device-geo", label: "Device & Geo Risk", icon: Monitor },
          { id: "linked-accounts", label: "Linked Accounts", icon: Link2 },
          { id: "copy-referral", label: "Copy Trading & IB Abuse", icon: Users },
          { id: "rule-engine", label: "Automated Rule Engine", icon: Cpu },
          { id: "case-logs", label: "Cases & Audits Logs", icon: History },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600 bg-white shadow-sm"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* MAIN DYNAMIC CONTENT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* TAB 1: ACTIVE RISK ALERTS (Section 2) & SEVERITY COLORS (Section 2.2) */}
          {activeTab === "active-alerts" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-md font-bold text-slate-900">
                    Live Threats & Suspicious Fraud Signals
                  </h3>
                  <p className="text-xs text-slate-500">
                    Real-time compilation of financial anomalies, compliance triggers, and platform
                    abuse signals.
                  </p>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 bg-slate-50 border border-slate-200 rounded-lg">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                      <th className="p-3">Alert ID</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Severity</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Triggered</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeAlerts.map((alert) => (
                      <tr
                        key={alert.id}
                        className="hover:bg-indigo-50/30 transition-all cursor-pointer"
                        onClick={() => setSelectedAlert(alert)}
                      >
                        <td className="p-3 font-mono font-bold text-indigo-600">{alert.id}</td>
                        <td className="p-3 font-medium text-slate-800">{alert.type}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              alert.severity === "CRITICAL"
                                ? "bg-red-100 text-red-700 border border-red-200"
                                : alert.severity === "HIGH"
                                  ? "bg-orange-100 text-orange-700 border border-orange-200"
                                  : alert.severity === "MEDIUM"
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                    : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {alert.severity}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />{" "}
                            {alert.status}
                          </span>
                        </td>
                        <td className="p-3 text-slate-500">{alert.triggered}</td>
                        <td className="p-3 text-right">
                          <button className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-0.5">
                            Investigate <ChevronRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Alert Types Exhaustive Matrix (Section 2.1) */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Monitored Alert Rule Classifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    "Trading Abuse",
                    "Risk Withdrawal",
                    "Payment Fraud",
                    "AML",
                    "Device Risk",
                    "Copy Trading Abuse",
                    "Bonus Abuse",
                    "Referral Abuse",
                    "Behavioral Anomaly",
                    "Geo Risk",
                  ].map((t, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-center text-[11px] font-medium text-slate-600"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RISK INTELLIGENCE CENTER (Section 3) */}
          {activeTab === "risk-intel" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  AI + Rule-Engine Insights Platform
                </h3>
                <p className="text-xs text-slate-500">
                  Autonomous clustering engines mapped against machine learning validation
                  thresholds.
                </p>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3">
                <Brain className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-indigo-900">
                    Latest Predictive Model Generation
                  </h4>
                  <p className="text-xs text-indigo-700 mt-1">
                    "AI Insight: Behavior similarity 82% with previously banned arbitrage cluster."
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs font-bold text-indigo-900">
                    <span>
                      Fraud Confidence Score: <span className="text-red-600">81%</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Monitored AI Vectors:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { label: "Abnormal Trading", desc: "Outlier position size deviations" },
                    { label: "Correlated Accounts", desc: "Overlapping execution signatures" },
                    { label: "Suspicious Profits", desc: "Statistically impossible win curves" },
                    { label: "Likely Arbitrage", desc: "Cross-server latency gap lockouts" },
                    { label: "Coordinated Trading", desc: "Multi-profile symmetric positioning" },
                    { label: "Bonus Farming", desc: "Promotion structural hedging patterns" },
                    { label: "Fraud Probability", desc: "Real-time regression neural parsing" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    >
                      <span className="font-semibold text-slate-800">{item.label}</span>
                      <span className="text-slate-400 italic text-[11px]">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TRADING RISK ANALYSIS (Section 4) */}
          {activeTab === "trading-risk" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Trading Behavior Metric Profiling
                </h3>
                <p className="text-xs text-slate-500">
                  Statistical risk matrices quantifying technical structural anomalies.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: "Win Rate", val: "68%" },
                  { label: "Profit Factor", val: "2.4" },
                  { label: "Avg Holding", val: "42s" },
                  { label: "Max Drawdown", val: "18.4%" },
                  { label: "Sharpe Ratio", val: "1.85" },
                  { label: "Risk Reward", val: "1:3" },
                  { label: "Scalping Score", val: "88/100" },
                  { label: "Toxic Flow Score", val: "72" },
                  { label: "Arbitrage Prob", val: "94%" },
                  { label: "News Trade Score", val: "41%" },
                ].map((k, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center"
                  >
                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate">
                      {k.label}
                    </p>
                    <p className="text-sm font-bold text-slate-800 mt-1">{k.val}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2 text-red-600">
                    Active Real-Time Risk Flags
                  </h4>
                  <ul className="space-y-1.5 text-xs font-medium">
                    {[
                      "Scalping Detected",
                      "Martingale Detected",
                      "Grid Trading Detected",
                      "Latency Arbitrage",
                      "Toxic Flow",
                      "News Abuse",
                      "Copy Dependency",
                    ].map((flag, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-slate-700 bg-red-50/50 p-1.5 rounded border border-red-100"
                      >
                        <AlertCircle className="w-3.5 h-3.5 text-red-500" /> {flag}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Advanced Core Metrics
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {[
                      "Dealer Intervention Score",
                      "Slippage Abuse Score",
                      "HFT Detection",
                      "Position Concentration",
                      "Symbol Dependency",
                    ].map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between border-b border-slate-100 pb-1 text-slate-600"
                      >
                        <span>{metric}</span>
                        <span className="font-bold text-slate-800">High Risk Factor</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-orange-50 border border-orange-100 text-orange-800 p-2.5 rounded-lg text-xs italic">
                    <strong>Critical Exposure Instance:</strong> 92% trading volume concentrated on
                    XAUUSD. Huge broker net asset exposure risk profile.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPOSURE MONITORING (Section 5) */}
          {activeTab === "exposure" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Broker-Side Exposure & Balance Routing
                </h3>
                <p className="text-xs text-slate-500">
                  Critical netting verification engine mapping operational exposure to liquidity
                  providers.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Total Open Exposure",
                  "Largest Position",
                  "Concentration Risk",
                  "Correlated Exposure",
                  "Overnight Exposure",
                  "Country Exposure",
                ].map((k, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs"
                  >
                    <p className="text-slate-500 font-medium">{k}</p>
                    <p className="font-bold text-slate-900 mt-1">$250,000 High Netting</p>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Symbol</th>
                      <th className="p-3">Net Exposure</th>
                      <th className="p-3">Client Exposure</th>
                      <th className="p-3">Risk Assessment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-bold font-mono">XAUUSD</td>
                      <td className="p-3 font-semibold text-slate-900">$250,000</td>
                      <td className="p-3 text-red-600 font-bold">HIGH</td>
                      <td className="p-3">
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          HIGH
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold font-mono">EURUSD</td>
                      <td className="p-3 font-semibold text-slate-900">$180,000</td>
                      <td className="p-3 text-orange-600 font-bold">MEDIUM</td>
                      <td className="p-3">
                        <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          MEDIUM
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex justify-between items-center">
                <span className="font-bold text-slate-700 uppercase tracking-wide">
                  Hedging Route Management Engine Status:
                </span>
                <div className="flex gap-1">
                  {["A-Book", "B-Book", "Internalized", "Hedged"].map((status, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${status === "A-Book" ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}
                    >
                      {status}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MARGIN & LEVERAGE MONITORING (Section 6) */}
          {activeTab === "margin-leverage" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Liquidation & Leverage Abuse Real-Time Monitoring
                </h3>
                <p className="text-xs text-slate-500">
                  Margin call frequency records against margin level breakdown limits.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Current Margin Level",
                  "Free Margin",
                  "Used Margin",
                  "Highest Leverage Used",
                  "Liquidation Risk",
                  "Margin Call Frequency",
                ].map((k, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs"
                  >
                    <p className="text-slate-500 font-medium">{k}</p>
                    <p className="font-bold text-slate-900 mt-0.5">
                      {i === 0 ? "145%" : i === 3 ? "1:500" : "High Flagged"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                    Account Margin Matrix
                  </h4>
                  <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1 font-mono">
                    <p>
                      <strong>Account:</strong> MT5-10024
                    </p>
                    <p>
                      <strong>Margin %:</strong> 145%
                    </p>
                    <p>
                      <strong>Leverage:</strong> 1:500
                    </p>
                    <p className="text-red-600">
                      <strong>Risk State:</strong> HIGH
                    </p>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide text-red-600">
                    Leverage Exception Violations
                  </h4>
                  <div className="flex flex-wrap gap-1 text-[11px] font-medium">
                    {[
                      "Margin Below 120%",
                      "Near Stop Out",
                      "Repeated Margin Calls",
                      "Excessive Leverage",
                    ].map((a, i) => (
                      <span
                        key={i}
                        className="bg-red-50 text-red-700 px-2 py-1 rounded border border-red-100"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Predictive Liquidation Simulator Instance
                </h4>
                <p className="text-xs text-slate-300">
                  "Condition Analysis: If XAUUSD asset moves -2.1%, Estimated profile liquidation
                  probability scales immediately to 82%."
                </p>
              </div>
            </div>
          )}

          {/* TAB 6: BEHAVIORAL RISK ANALYSIS (Section 7) */}
          {activeTab === "behavioral" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Fraud Behavior & Trading Pattern Detection
                </h3>
                <p className="text-xs text-slate-500">
                  Heuristics tracking malicious manipulation networks and behavioral anomalies.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Detected Pattern Struct</th>
                      <th className="p-3">Behavior Score Mapping</th>
                      <th className="p-3">Assigned Risk State</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {[
                      { p: "Bonus Abuse", s: "85", r: "HIGH", c: "text-orange-600" },
                      { p: "Device Sharing", s: "92", r: "CRITICAL", c: "text-red-600" },
                      { p: "Referral Abuse", s: "15", r: "LOW", c: "text-green-600" },
                    ].map((row, i) => (
                      <tr key={i}>
                        <td className="p-3">{row.p}</td>
                        <td className="p-3 font-mono font-bold">{row.s}/100</td>
                        <td className={`p-3 font-bold ${row.c}`}>{row.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  "Arbitrage Abuse",
                  "Hedging Abuse",
                  "Multi Account Behavior",
                  "Copy Trading Manipulation",
                  "Revenge Trading",
                  "Login → Trade → Withdraw Pattern",
                ].map((pattern, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs font-semibold text-slate-700 text-center"
                  >
                    {pattern}
                  </div>
                ))}
              </div>

              <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg text-xs">
                <span className="font-bold text-indigo-900 block mb-1">
                  Advanced Pattern Analysis Integration Modules:
                </span>
                <div className="flex gap-4 font-semibold text-indigo-700">
                  <span>• Relation Graphs</span>
                  <span>• Behavior Clustering Models</span>
                  <span>• Network Proximity Analysis</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: AML & COMPLIANCE RISK (Section 8) */}
          {activeTab === "aml-compliance" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  AML Screening & Sanction Matrix Tracking
                </h3>
                <p className="text-xs text-slate-500">
                  Mandatory verification checks aligned with global compliance criteria frameworks.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  "AML Risk Score",
                  "PEP Status",
                  "Sanctions Status",
                  "KYC Risk Level",
                  "Source of Funds",
                ].map((k, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center text-xs font-bold text-slate-700"
                  >
                    <p className="text-[10px] text-slate-400 uppercase mb-1">{k}</p>
                    <span>
                      {i === 1 ? "PEP Tier 2 Match" : i === 3 ? "High Risk" : "Under Review"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 p-2.5 font-bold text-xs text-slate-600 border-b border-slate-200">
                    KYC/AML System Check Status
                  </div>
                  <div className="divide-y divide-slate-100 text-xs font-medium">
                    {["KYC Approved", "AML Under Review", "PEP No Match", "Sanctions Cleared"].map(
                      (check, i) => (
                        <div key={i} className="p-2.5 flex justify-between">
                          <span>{check}</span>
                          <span className="text-indigo-600 font-bold">Verified Logs</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                    Possible Dynamic Compliance Flags
                  </h4>
                  <div className="space-y-1 text-xs font-semibold">
                    {[
                      "Large Cash Movement",
                      "Suspicious Deposit Pattern",
                      "High-Risk Country Trigger",
                      "Missing Source of Funds Documentation",
                      "Crypto Mixer Platform Exposure",
                      "Sanction Wallet Proximity Exposure",
                    ].map((flag, idx) => (
                      <div
                        key={idx}
                        className="bg-orange-50 border border-orange-100 text-orange-800 px-2 py-1 rounded"
                      >
                        ⚠️ {flag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 justify-between bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs font-bold">
                <span className="text-slate-700">
                  AML Compliance Case Resolution Priority Queue:
                </span>
                <div className="flex gap-2">
                  {["LOW", "MEDIUM", "HIGH", "URGENT"].map((p, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 rounded ${p === "URGENT" ? "bg-red-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: WITHDRAWAL RISK & DEPOSIT RISK MONITORING (Sections 9 & 10) & PAYMENT METHOD RISK (Section 11) */}
          {activeTab === "withdrawal-deposit" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Liquidity Gateway Audit (Withdrawal, Deposit & Payment Processing)
                </h3>
                <p className="text-xs text-slate-500">
                  Tracks velocity thresholds, chargeback exploitation histories, and prepaid routing
                  vectors.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  "Withdrawal Requests",
                  "Rejected Withdrawals",
                  "Large Withdrawals",
                  "Withdrawal Risk Score",
                ].map((k, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs"
                  >
                    <p className="text-slate-400 font-bold uppercase text-[10px]">{k}</p>
                    <p className="font-bold text-slate-800 mt-1">
                      {i === 3 ? "84/100 High" : "Flagged Log Instance"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-red-600 tracking-wide mb-2">
                    Withdrawal Risk Detections
                  </h4>
                  <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                    {[
                      "Quick Deposit → Withdrawal",
                      "Bonus Claimed → Withdraw",
                      "Multiple Failed Withdrawals",
                      "Account Handover Risk",
                      "Unusual Withdrawal Destination",
                    ].map((item, idx) => (
                      <li key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-orange-600 tracking-wide mb-2">
                    Deposit Abuse Patterns
                  </h4>
                  <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                    {[
                      "Card Country Mismatch",
                      "Multiple Failed Deposits",
                      "Deposit Velocity Abuse",
                      "Crypto Mixer Platform Exposure",
                      "Prepaid Card Abuse",
                    ].map((item, idx) => (
                      <li key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide mb-2">
                    Payment Fraud Fingerprints
                  </h4>
                  <ul className="space-y-1.5 text-xs font-medium text-slate-700">
                    {[
                      "reused cards usage",
                      "stolen cards routing",
                      "suspicious e-wallets",
                      "mismatched holder names",
                      "risky payment processors",
                    ].map((item, idx) => (
                      <li key={idx} className="bg-slate-50 p-1.5 rounded border border-slate-100">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wide">
                  Gateway Fingerprint Field Mappings
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-semibold text-slate-600">
                  {[
                    "payment fingerprint",
                    "card BIN struct",
                    "issuer country log",
                    "wallet risk score",
                    "chargeback history tracker",
                  ].map((f, i) => (
                    <div
                      key={i}
                      className="bg-white border border-slate-200 p-2 rounded text-center"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3.5 bg-red-50 border border-red-100 text-red-900 rounded-xl text-xs font-medium">
                <strong>Real Fraud Case Signature Match:</strong> Deposit: $10,000 | Trading Volume:
                0.2 lots | Withdrawal: $9,800 after 8 minutes.{" "}
                <span className="font-bold underline">
                  Triggered Engine Logic: MINIMAL_TRADING_QUICK_WITHDRAWAL
                </span>
                .
              </div>
            </div>
          )}

          {/* TAB 9: DEVICE & LOGIN RISK (Section 12) & GEO & JURISDICTION RISK (Section 13) */}
          {activeTab === "device-geo" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Device Authenticity & Geo-Jurisdictional Sanction Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Tracks geolocation masking proxies, concurrent cross-nation authentication
                  sessions, and device trust bounds.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                {[
                  "Devices Used: 4",
                  "Countries Logged In: 2",
                  "VPN Detection: ACTIVE",
                  "Shared Device Alerts: 1",
                ].map((m, i) => (
                  <div
                    key={i}
                    className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-700 text-center"
                  >
                    {m}
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Device Agent Signature</th>
                      <th className="p-3">Detected Country</th>
                      <th className="p-3">System Flag Indicators</th>
                      <th className="p-3">Assigned Risk Index</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="font-medium text-slate-800">
                      <td className="p-3 font-mono">Chrome/Windows v124</td>
                      <td className="p-3">Germany</td>
                      <td className="p-3 text-red-600 font-bold">VPN Masking Triggered</td>
                      <td className="p-3">
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-[10px] font-bold">
                          HIGH
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                    Automated Geo Compliance & Anomaly Analysis
                  </h4>
                  <div className="space-y-1 text-xs font-semibold text-slate-600">
                    {[
                      "VPN Vector",
                      "TOR Endpoint Routing",
                      "Impossible Travel Sequences",
                      "Shared Hardware Fingerprint",
                      "New Device Session Invalidation",
                    ].map((det, i) => (
                      <div key={i} className="p-1.5 bg-slate-50 rounded border border-slate-100">
                        🔒 {det}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-700">
                    Real travel constraint anomaly event:
                  </h4>
                  <div className="bg-orange-50 text-orange-900 border border-orange-100 p-2.5 rounded text-xs space-y-1">
                    <p>
                      <strong>Login Trajectory:</strong> India → Germany logged within 5 minutes.
                    </p>
                    <p>
                      <strong>Jurisdiction Declared:</strong> India |{" "}
                      <strong>Current Session:</strong> Russia |{" "}
                      <span className="font-bold text-red-700">VPN: Detected</span>
                    </p>
                  </div>

                  <div className="flex justify-between items-center bg-slate-900 text-white p-2.5 rounded-lg text-xs font-mono">
                    <span>DEVICE TRUST SCORE:</span>
                    <span className="text-red-400 font-bold">
                      COMPROMISED (Suspicious / Masked)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: LINKED ACCOUNTS DETECTION (Section 14) */}
          {activeTab === "linked-accounts" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Linked Accounts Identification Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Multi-parameter weight mapping generating systemic graph proximities across active
                  trading pools.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Client Reference Match</th>
                      <th className="p-3">Overlapping Variable Type</th>
                      <th className="p-3">Algorithmic Confidence Weight</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium">
                    <tr>
                      <td className="p-3 font-mono font-bold text-indigo-600">Client-1042</td>
                      <td className="p-3">Same Hardware Fingerprint & IP Group</td>
                      <td className="p-3 text-red-600 font-bold">96% System Certainty</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                    Algorithmic Signal Weights Tracker
                  </h4>
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between">
                      <span>Same IP Configuration:</span>{" "}
                      <span className="font-bold">20% weight</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Same Device Hardware Profile:</span>{" "}
                      <span className="font-bold text-indigo-600">40% weight</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Same Payment Method Routing:</span>{" "}
                      <span className="font-bold text-orange-600">70% weight</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Same Document Upload (KYC):</span>{" "}
                      <span className="font-bold text-red-600">95% weight</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                    System Relation Graph Representation
                  </h4>
                  <div className="bg-slate-900 text-slate-300 font-mono text-[11px] p-3 rounded-lg space-y-1">
                    <p className="text-indigo-400">User Profile A (Root Node)</p>
                    <p>
                      ├── same device hardware fingerprint →{" "}
                      <span className="text-red-400">User B (Risk 92%)</span>
                    </p>
                    <p>
                      ├── same payment crypto e-wallet →{" "}
                      <span className="text-orange-400">User C (Risk 74%)</span>
                    </p>
                    <p>└── same gateway proxy network IP → User D</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: COPY TRADING RISK (Section 15) & REFERRAL & IB ABUSE RISK (Section 16) */}
          {activeTab === "copy-referral" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Social Architecture Safeguards (Copy Trading & Affiliate IB Abuse)
                </h3>
                <p className="text-xs text-slate-500">
                  Detects churn mitigation avoidance, systemic hedging, and commission harvesting
                  operations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1 text-indigo-600">
                    Copy Trading Abuse Mitigations
                  </h4>
                  <div className="space-y-1 text-xs font-semibold text-slate-600">
                    {[
                      "Wash trading generation",
                      "Fake provider profiles",
                      "Coordinated margin drainage losses",
                      "Self-copy structural abuse",
                      "Rebate volume farming",
                    ].map((d, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded border border-slate-100">
                        ✔ {d}
                      </div>
                    ))}
                  </div>
                  <div className="text-[11px] bg-slate-100 p-2 rounded font-medium text-slate-500 italic">
                    Monitored KPIs: copier concentration metrics, abnormal copy profit scaling,
                    provider dependency weights, suspicious copy clusters.
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1 text-orange-600">
                    Referral & IB Abuse Detection Vector
                  </h4>
                  <div className="space-y-1 text-xs font-semibold text-slate-600">
                    {[
                      "Self-referral tree structures",
                      "Fake client proxy generation",
                      "Same device referral tracking",
                      "Commission volume farming scripts",
                    ].map((d, i) => (
                      <div key={i} className="p-2 bg-slate-50 rounded border border-slate-100">
                        ✔ {d}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: AUTOMATED RULE ENGINE (Section 17) & RISK SCORE HISTORY (Section 18) & RISK TIER MANAGEMENT (Section 19) */}
          {activeTab === "rule-engine" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Central Fraud Rule Engine & Lifecycle Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Tracks core score history changes alongside rule threshold modifiers.
                </p>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-xl font-mono text-xs space-y-1">
                <p className="text-indigo-400">// Centralized Threshold Evaluator Instance</p>
                <p>
                  <span className="text-purple-400">IF:</span> withdrawal_request_time &lt; 15 mins
                  after deposit <span className="text-orange-400">AND</span> trading_volume &lt; 1
                  lot
                </p>
                <p>
                  <span className="text-purple-400">THEN:</span> profile_risk_score += 30;
                  trigger_alert = <span className="text-red-400">"QUICK_CASHOUT"</span>;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                    Active Core Rule States
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs font-medium">
                    <div className="py-2 flex justify-between">
                      <span>QUICK_WITHDRAWAL</span>{" "}
                      <span className="text-red-600 font-bold">Triggered Status</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span>MULTI_ACCOUNT</span>{" "}
                      <span className="text-red-600 font-bold">Triggered Status</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span>BONUS_ABUSE</span>{" "}
                      <span className="text-slate-500 font-bold">Monitoring Phase</span>
                    </div>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-xl p-4">
                  <h4 className="text-xs font-bold uppercase text-slate-700 mb-2">
                    Chronological Risk Score Variance Log
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs font-mono">
                    <div className="py-1.5 flex justify-between">
                      <span>May 20</span> <span className="font-bold">Score: 22</span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span>May 22</span>{" "}
                      <span className="font-bold text-orange-600">
                        Score: 48 (+20 linked account)
                      </span>
                    </div>
                    <div className="py-1.5 flex justify-between">
                      <span>May 25</span>{" "}
                      <span className="font-bold text-red-600">
                        Score: 72 (+15 withdrawal anomaly)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-2">
                <div className="flex justify-between items-center font-bold text-slate-700">
                  <span>SYSTEM RISK TIER DESIGNATION STRUCTURE:</span>
                  <div className="flex gap-1 font-mono text-[10px]">
                    {["LOW", "MEDIUM", "HIGH", "CRITICAL"].map((t, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded ${t === "HIGH" ? "bg-red-600 text-white" : "bg-white border border-slate-200 text-slate-500"}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-2.5 rounded border border-slate-200 font-mono text-[11px] text-slate-600">
                  {
                    '{ "oldTier": "MEDIUM", "newTier": "HIGH", "changedBy": "SYSTEM", "reason": "Linked account confidence exceeded threshold" }'
                  }
                </div>
              </div>
            </div>
          )}

          {/* TAB 13: INVESTIGATION CASES (Section 20) & RESTRICTIONS (Section 21) & AUDIT TRAIL (Section 25) */}
          {activeTab === "case-logs" && (
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-6">
              <div>
                <h3 className="text-md font-bold text-slate-900">
                  Investigation Case Management & Ultimate Audit Trail
                </h3>
                <p className="text-xs text-slate-500">
                  Immutable validation evidence trails matching state mandates.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-700">
                    Profile Restriction Enforcement Bounds
                  </h4>
                  <div className="divide-y divide-slate-100 text-xs font-medium">
                    <div className="py-2 flex justify-between">
                      <span>Withdrawals Locked Status</span>{" "}
                      <span className="text-red-600 font-bold">AUTO ACTIVE</span>
                    </div>
                    <div className="py-2 flex justify-between">
                      <span>Trading Suspended Bounds</span>{" "}
                      <span className="text-red-600 font-bold">MANUAL ACTIVE</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-indigo-600 font-semibold italic bg-indigo-50 p-2 rounded">
                    Notice: Trading operational restriction parameters expire automatically in 48
                    hours.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase text-slate-700">
                    Case Workflows Queue Framework
                  </h4>
                  <div className="flex gap-1 text-[10px] font-bold text-slate-600 font-mono">
                    {["Open", "Investigating", "Escalated", "Restricted", "Resolved"].map(
                      (step, idx) => (
                        <span
                          key={idx}
                          className={`p-1 rounded ${step === "Restricted" ? "bg-slate-900 text-white" : "bg-slate-100"}`}
                        >
                          {step} {idx !== 4 && "→"}
                        </span>
                      ),
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-500 pt-1">
                    Active Case Context Types: AML, payment fraud detection, bonus abuse logs,
                    withdrawal verification limits, multi-account cluster investigations.
                  </p>
                </div>
              </div>

              {/* CORE AUDIT TRAIL TABLE (Section 25) */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-4 py-2.5 font-bold text-xs text-slate-700 border-b border-slate-200 uppercase tracking-wider">
                  Compliance Audit Logs - Full Sovereign Evidence Trail
                </div>
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 border-b border-slate-200 font-semibold text-slate-600">
                    <tr>
                      <th className="p-3">Action Element Log</th>
                      <th className="p-3">Performed By Actor</th>
                      <th className="p-3">System Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium font-mono text-slate-700">
                    <tr>
                      <td className="p-3 text-red-600">Risk Flag Added Vector</td>
                      <td className="p-3">Risk Team Node</td>
                      <td className="p-3">10:15 UTC</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-red-600">Withdrawal Locked Enforced</td>
                      <td className="p-3">Compliance Officer Desk</td>
                      <td className="p-3">10:21 UTC</td>
                    </tr>
                    <tr>
                      <td className="p-3 text-indigo-600">AML Investigation Instantiated</td>
                      <td className="p-3">System Auto Automaton</td>
                      <td className="p-3">11:04 UTC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE PANEL: SYSTEM ACTION RIG, DRAWER LAYOUTS, TIMELINE, AND NOTES */}
        <div className="space-y-6">
          {/* RISK ALERT DRAWER INTERACTION IF SELECTED (Section 2.3) & INVESTIGATION CASE DRAWER LAYOUT (Section 20.3) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  Sovereign Investigation Drawer Panel
                </h3>
              </div>
              {selectedAlert && (
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-1 hover:bg-slate-800 rounded text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* DRAWER INTERNAL NAVIGATION STRUCTURE MAP */}
            <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto text-[10px] font-bold text-slate-500 uppercase tracking-tight">
              {[
                { id: "overview", label: "Overview" },
                { id: "evidence", label: "Evidence/Rule" },
                { id: "timeline", label: "Timeline/Logs" },
              ].map((dTab) => (
                <button
                  key={dTab.id}
                  onClick={() => setDrawerTab(dTab.id)}
                  className={`px-3 py-2 border-b-2 whitespace-nowrap ${drawerTab === dTab.id ? "border-indigo-600 text-indigo-600 bg-white" : "border-transparent"}`}
                >
                  {dTab.label}
                </button>
              ))}
            </div>

            <div className="p-4 space-y-4 text-xs">
              {drawerTab === "overview" && (
                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg space-y-1.5 font-medium text-slate-700">
                    <p>
                      <strong>Active Entity Identifier:</strong>{" "}
                      {selectedAlert ? selectedAlert.id : "ALRT-2026-0041"}
                    </p>
                    <p>
                      <strong>System Classification Type:</strong>{" "}
                      {selectedAlert ? selectedAlert.type : "AML — Rapid deposit pattern"}
                    </p>
                    <p>
                      <strong>Risk Target Scope:</strong> PEP Match Category Tier 2 Match
                    </p>
                    <p>
                      <strong>Reviewer Assignment:</strong> Rajan Mehta (Compliance Officer)
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    Drawer maps across fields: Overview, Evidence, Related Transactions, Affected
                    Accounts, Linked Devices, Triggered Risk Rules, Automated AI Risk Analysis model
                    arrays, and internal Audit Logs.
                  </div>
                </div>
              )}

              {drawerTab === "evidence" && (
                <div className="space-y-2 font-medium">
                  <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-900 space-y-1">
                    <p className="font-bold">Triggered Logic: QUICK_CASHOUT_PATTERN</p>
                    <p>• Initial Inbound Deposit Check: $50,000</p>
                    <p>• Intermediate Volume Execution: 0.3 lots</p>
                    <p>• Outbound Payout Request: $48,500 evaluated after 12 minutes</p>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded text-slate-600 font-mono text-[11px] space-y-0.5">
                    <p>Deposit 1: $2,000 | 11 May 08:00</p>
                    <p>Deposit 2: $1,800 | 13 May 14:30</p>
                    <p>Deposit 3: $42,500 | 14 May 09:40</p>
                    <p>Deposit 4: $1,700 | 15 May 11:00</p>
                  </div>
                </div>
              )}

              {drawerTab === "timeline" && (
                <div className="space-y-2">
                  <div className="border-l-2 border-slate-200 pl-3 ml-1 space-y-3 font-mono text-[11px] text-slate-600">
                    <div>
                      <p className="font-bold text-slate-800">Action: AML case opened</p>
                      <p className="text-slate-400 text-[10px]">
                        Actor: System Auto | 16 May 10:00
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Action: Withdrawal hold applied</p>
                      <p className="text-red-600 text-[10px]">
                        Enforced: BLOCKED state | 16 May 10:01
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Action: Passport Validation v3</p>
                      <p className="text-green-600 text-[10px]">
                        Approved (Face match 97.4%) | 22 May 14:12
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CHRONOLOGICAL RISK TIMELINE & FILTERS (Section 22) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Chronological Risk Timeline
              </h3>
              <div className="flex gap-1 text-[9px] font-bold text-slate-400">
                <span className="text-indigo-600 font-extrabold underline">AML</span>
                <span>WITHDRAWALS</span>
                <span>TRADING</span>
              </div>
            </div>
            <div className="space-y-2.5 font-mono text-[11px] text-slate-600 pl-1">
              <div className="flex gap-2">
                <span className="text-indigo-600 font-bold">09:14</span>
                <span className="text-slate-700">→ Margin system saturation alert triggered</span>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-600 font-bold">09:18</span>
                <span className="text-slate-700">
                  → Profile leverage allocation increased to 1:500
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-600 font-bold">Yest</span>
                <span className="text-slate-700">→ Outbound large withdrawal request queued</span>
              </div>
              <div className="flex gap-2">
                <span className="text-indigo-600 font-bold">3d ago</span>
                <span className="text-red-600 font-bold">
                  → Device sharing network detection flag
                </span>
              </div>
            </div>
          </div>

          {/* NOTES & INTERNAL COMMENTS CONTAINERS (Section 23) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Private Notes & Internal Compliance Comments
            </h3>
            <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs space-y-1.5 font-medium text-slate-700">
              <p className="italic text-slate-600">
                "Possible coordinated trading pattern isolated across terminal clusters. Escalated
                to core fraud investigation deck."
              </p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-200/60 pt-1">
                <span>Classification: FRAUD/AML</span>
                <span>By: Rajan Mehta</span>
              </div>
            </div>
            <textarea
              placeholder="Append internal compliance verification logs..."
              className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-indigo-600 h-16 resize-none"
            />
          </div>

          {/* ADMIN ACTIONS CONTROL RIG (Section 24) */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Settings className="w-3.5 h-3.5 text-red-500" /> Restricted Admin Execution Rig
            </h3>

            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
                <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-center">
                  Notify Client Agent
                </button>
                <button className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-center">
                  Instantiate Ticket
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1 text-[11px] font-bold">
                <button className="p-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-center">
                  Require Documents
                </button>
                <button className="p-1.5 bg-amber-50 border border-amber-200 text-amber-800 rounded text-center">
                  Escalate Case
                </button>
              </div>
            </div>

            {/* DANGEROUS CORE SYSTEM OVERRIDES */}
            <div className="border-t border-slate-100 pt-3 space-y-2">
              <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide block">
                ⚠️ Critical Destructive System Controls (Requires Conf & Reason Logging)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-bold text-white">
                <button className="p-2 bg-red-600 hover:bg-red-700 rounded shadow-sm text-center">
                  Suspend Trading
                </button>
                <button className="p-2 bg-red-600 hover:bg-red-700 rounded shadow-sm text-center">
                  Lock Withdrawals
                </button>
                <button className="p-2 bg-red-800 hover:bg-red-900 rounded shadow-sm text-center col-span-2">
                  Freeze Entire Account Node
                </button>
              </div>
            </div>

            {/* SENIOR ADMINISTRATIVE OVERRIDE CONTEXT UNIT */}
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-3 space-y-2.5">
              <span className="text-[11px] font-bold text-slate-700 block">
                Senior Admin Tier Override Dashboard
              </span>
              <div className="flex gap-2 items-center text-xs">
                <label className="font-semibold text-slate-600">Override State:</label>
                <select
                  value={riskTierOverride}
                  onChange={(e) => setRiskTierOverride(e.target.value)}
                  className="bg-white border border-slate-200 p-1 rounded font-mono text-xs focus:outline-indigo-600"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="CRITICAL">CRITICAL</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="Reason: e.g. False positive device-sharing validation..."
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:outline-red-500"
              />
              <button className="w-full py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded transition-all">
                Commit Strategic Override Authorization
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SYSTEM ENTITY UNDERSTANDING (Section 25.4) */}
      <div className="mt-6 bg-white border border-slate-200 p-4 rounded-xl text-center shadow-sm">
        <p className="text-[11px] font-bold tracking-tight text-slate-400 uppercase">
          Broker Risk Core Engine • AML Monitoring Platform • Fraud Detection Center • Behavior
          Analytics Cluster System • Compliance Investigation Platform • Dealing Desk Risk
          Infrastructure
        </p>
      </div>
    </div>
  );
}
