// File Name: InvestigationCasesTab.jsx
import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Shield,
  CheckCircle,
  Clock,
  FileText,
  User,
  Layers,
  Eye,
  X,
  ChevronRight,
  Lock,
  Unlock,
  HelpCircle,
  Filter,
  Search,
  ArrowRight,
  Download,
  RefreshCw,
  AlertCircle,
  Ban,
  History,
} from "lucide-react";

export default function InvestigationCasesTab() {
  // Navigation & Active Layout States
  const [activeSubSection, setActiveSubSection] = useState("current-status");
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedLock, setSelectedLock] = useState(null);
  const [selectedHold, setSelectedHold] = useState(null);
  const [selectedRestriction, setSelectedRestriction] = useState(null);
  const [drawerTab, setDrawerTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // SECTION 1: ACCOUNT STATUS SUMMARY DATA MATRIX
  const accountStatusSummary = {
    accountStatus: "Suspended",
    riskLevel: "Critical",
    investigationStatus: "Under Review",
    accountAccess: "Disabled",
    lastReview: "18-May-2026",
    activeBannerId: "SUS-001245",
    caseReference: "CASE-0891",
  };

  // SECTION 2: ACTIVE RESTRICTIONS DATA MATRIX
  const activeRestrictions = [
    {
      id: "WF-001",
      restriction: "Login Access",
      status: "Disabled",
      appliedBy: "Security Engine",
      date: "18-May",
      reason: "Failed Logins",
    },
    {
      id: "WF-002",
      restriction: "Withdrawals",
      status: "Frozen",
      appliedBy: "AML Team",
      date: "18-May",
      reason: "AML Review",
    },
    {
      id: "TD-001",
      restriction: "Trading",
      status: "Disabled",
      appliedBy: "Risk Team",
      date: "19-May",
      reason: "Trading Abuse",
    },
    {
      id: "CTD-001",
      restriction: "Copy Trading",
      status: "Disabled",
      appliedBy: "Risk Team",
      date: "19-May",
      reason: "Strategy Abuse",
    },
  ];

  // SECTION 3: ACTIVE HOLDS DATA MATRIX
  const activeHolds = [
    {
      id: "AML-H001",
      holdType: "AML Hold",
      team: "AML",
      since: "18-May",
      reason: "Suspicious Deposits",
      details: "$70,700 flagged",
    },
    {
      id: "FIN-H001",
      holdType: "Finance Hold",
      team: "Finance",
      since: "18-May",
      reason: "Withdrawal Review",
      details: "$22,500 pending",
    },
  ];

  // SECTION 4 & 6: SYSTEM MASTER INVESTIGATION REGISTRY
  const investigationCases = [
    {
      id: "CASE-0891",
      type: "AML",
      status: "Under Review",
      severity: "High",
      priority: "Critical",
      created: "18 May 2026",
      closed: "—",
      investigator: "Sarah Johnson",
      team: "Compliance",
      stage: "SOF Review",
      pendingDocs: "3 items",
      pendingApprovals: "2 levels",
      slaDeadline: "20 May 2026 - Breached",
      linkedSuspension: "SUS-001245",
      linkedHolds: "AML-H001, FIN-H001",
      linkedRestrictions: "WF-001, TD-001, CTD-001",
      totalAmountFlagged: "$70,700",
      approvals: [
        { step: "Step 1 - Investigator", owner: "Sarah Johnson", status: "In Progress" },
        { step: "Step 2 - AML Lead", owner: "Maria Santos", status: "Awaiting step 1" },
        { step: "Step 3 - Compliance Head", owner: "Awaiting steps 1 & 2", status: "Pending" },
        { step: "SAR Sign-off", owner: "Maria Santos", status: "In Progress" },
      ],
      evidence: [
        { label: "Deposit 1", detail: "$48,200 - 3rd party wire - 18 May 2026" },
        { label: "Deposit 2", detail: "$22,500 cash equivalent - 18 May 2026" },
        { label: "AML score", detail: "94/100 - High risk" },
        { label: "Rule triggered", detail: "AML-R14 - large atypical inflow" },
        { label: "IP logs (18 May)", detail: "Tor exit node VPN - 2 malicious IPs" },
        { label: "Login events", detail: "7 failed attempts before suspension" },
        { label: "Trade pattern", detail: "Wash trading - CASE-0744 (prior - closed)" },
        { label: "Linked accounts", detail: "3 sub-accounts same beneficial owner" },
      ],
    },
    {
      id: "CASE-0744",
      type: "Trading abuse",
      status: "Closed",
      severity: "Medium",
      priority: "High",
      created: "3 Mar 2026",
      closed: "10 Mar 2026",
      investigator: "Omar Khalid",
      team: "Risk",
      stage: "Archived",
      pendingDocs: "None",
      pendingApprovals: "Approved",
      slaDeadline: "Passed - Met",
      linkedSuspension: "SUS-000844",
      linkedHolds: "None",
      linkedRestrictions: "None",
      totalAmountFlagged: "$14,500",
      approvals: [],
      evidence: [],
    },
    {
      id: "CASE-0512",
      type: "KYC",
      status: "Closed",
      severity: "Low",
      priority: "Normal",
      created: "9 Jan 2026",
      closed: "14 Jan 2026",
      investigator: "Compliance bot",
      team: "Compliance",
      stage: "Archived",
      pendingDocs: "None",
      pendingApprovals: "Approved",
      slaDeadline: "Passed",
      linkedSuspension: "None",
      linkedHolds: "KYC-H001",
      linkedRestrictions: "DEP-000",
      totalAmountFlagged: "$0",
      approvals: [],
      evidence: [],
    },
  ];

  // SECTION 2 (PAGE 5): HISTORICAL LOCK LEDGER
  const lockHistory = [
    {
      id: "LCK-003",
      type: "Login lock",
      lockedBy: "Security Engine",
      date: "18 May 2026",
      unlockDate: "Active",
      reason: "Failed logins x7",
      source: "System",
      duration: "Active 23 days",
      trigger: "7 consecutive failed login attempts",
      impact: "Account login fully disabled",
      sessionImpact: "All active sessions terminated",
      linkedInvestigation: "CASE-0891",
      linkedSuspension: "SUS-001245",
      attempts: [
        "18 May 09:01 - Wrong password",
        "18 May 09:02 - Wrong password",
        "18 May 09:04 - Wrong password",
        "18 May 09:05 - Wrong password",
        "18 May 09:07 - Incorrect 2FA code",
        "18 May 09:09 - Wrong password",
        "18 May 09:12 - Wrong password",
      ],
      ips: [
        "185.220.101.47 - Tor exit node",
        "45.33.32.156 - VPN/proxy detected",
        "91.108.4.1 - Previously flagged",
      ],
      geoMismatch: "Yes - different country from usual",
      riskFlag: "High - anonymisation tools used",
      timeline: [
        { t: "18 May 09:14", m: "Lock applied - Security Engine" },
        { t: "18 May 09:15", m: "Compliance alert sent automatically" },
        { t: "18 May 10:00", m: "Reviewed by Sarah Johnson" },
        { t: "18 May 10:05", m: "Lock confirmed pending investigation" },
      ],
    },
    {
      id: "LCK-002",
      type: "Security lock",
      lockedBy: "Security Team",
      date: "10 Jun 2026",
      unlockDate: "Active",
      reason: "Account takeover attempt",
      source: "Manual",
      duration: "Active",
      trigger: "Session hardware mismatch",
      impact: "Full platform freeze",
      sessionImpact: "Terminated",
      linkedInvestigation: "None",
      linkedSuspension: "None",
      attempts: [],
      ips: [],
      geoMismatch: "No",
      riskFlag: "Critical",
      timeline: [],
    },
    {
      id: "LCK-001",
      type: "Login lock",
      lockedBy: "System",
      date: "2 Apr 2026",
      unlockDate: "4 Apr 2026",
      reason: "Failed logins x5",
      source: "System",
      duration: "2 Days",
      trigger: "5 incorrect credentials",
      impact: "Temp lockout",
      sessionImpact: "None",
      linkedInvestigation: "None",
      linkedSuspension: "None",
      attempts: [],
      ips: [],
      geoMismatch: "No",
      riskFlag: "Low",
      timeline: [],
    },
  ];

  // SECTION 3 (PAGE 6): HISTORICAL RESTRICTIONS LEDGER
  const restrictionHistory = [
    {
      id: "WF-001",
      restriction: "Withdrawal freeze",
      appliedBy: "AML Team",
      date: "18 May 2026",
      removedDate: "Active",
      reason: "AML review - suspicious deposits",
      status: "Active",
    },
    {
      id: "TD-001",
      restriction: "Trading disabled",
      appliedBy: "Risk Team",
      date: "19 May 2026",
      removedDate: "Active",
      reason: "Trading abuse detected",
      status: "Active",
    },
    {
      id: "CTD-001",
      restriction: "Copy trading disabled",
      appliedBy: "Risk Team",
      date: "19 May 2026",
      removedDate: "Active",
      reason: "Strategy/circular copying",
      status: "Active",
    },
    {
      id: "DEP-000",
      restriction: "Deposit restriction",
      appliedBy: "Compliance",
      date: "15 Jan 2026",
      removedDate: "20 Jan 2026",
      reason: "Pending KYC verification",
      status: "Removed",
    },
  ];

  // SECTION 4 (PAGE 6): HISTORICAL HOLD LEDGER
  const holdHistory = [
    {
      id: "AML-H001",
      type: "AML hold",
      team: "AML",
      startDate: "18 May 2026",
      endDate: "Active",
      reason: "Suspicious deposits $70,700",
      status: "Active",
      appliedBy: "Maria Santos - AML Lead",
      totalAmount: "$70,700",
      linkedCase: "CASE-0891",
      linkedRestriction: "WF-001 (withdrawal freeze)",
    },
    {
      id: "FIN-H001",
      type: "Finance hold",
      team: "Finance",
      startDate: "18 May 2026",
      endDate: "Active",
      reason: "Withdrawal review $22,500",
      status: "Active",
      appliedBy: "Finance Desk System",
      totalAmount: "$22,500",
      linkedCase: "CASE-0891",
      linkedRestriction: "None",
    },
    {
      id: "KYC-H001",
      type: "KYC hold",
      team: "Compliance",
      startDate: "10 Jan 2026",
      endDate: "14 Jan 2026",
      reason: "Initial KYC document check",
      status: "Released",
      appliedBy: "Compliance Bot",
      totalAmount: "$0",
      linkedCase: "CASE-0512",
      linkedRestriction: "DEP-000",
    },
  ];

  // SECTION 5 (PAGE 7): HISTORICAL SUSPENSION HISTORY
  const suspensionHistory = [
    {
      id: "SUS-001245",
      date: "18 May 2026",
      appliedBy: "AML Engine",
      reason: "Suspicious deposits - AML alert",
      case: "CASE-0891",
      outcome: "Pending",
      status: "Active",
    },
    {
      id: "SUS-000844",
      date: "3 Mar 2026",
      appliedBy: "Risk Team",
      reason: "Trading abuse suspected",
      case: "CASE-0744",
      outcome: "Unsuspended",
      status: "Closed",
    },
  ];

  // SECTION 9: CHRONOLOGICAL ACCOUNT EVENT TIMELINE LAYOUT
  const accountEventTimeline = [
    {
      date: "18 May 2026",
      event: "Login locked - 7 failed attempts from Tor/VPN IPs (LCK-003)",
      type: "lock",
    },
    {
      date: "18 May 2026",
      event:
        "AML hold (AML-H001) and Finance hold (FIN-H001) applied. CASE-0891 opened assigned Sarah Johnson",
      type: "hold",
    },
    {
      date: "18 May 2026",
      event: "Account auto-suspended - SUS-001245 applied by AML Engine",
      type: "suspension",
    },
    {
      date: "18 May 2026",
      event:
        "Suspicious deposits flagged $48,200 + $22,500 ($70,700 total). AML alert triggered (score 94/100)",
      type: "alert",
    },
    {
      date: "10 Mar 2026",
      event:
        "CASE-0744 closed - insufficient evidence. SUS-000844 resolved, account unsuspended (DEC-001, DEC-003)",
      type: "system",
    },
    {
      date: "7 Mar 2026",
      event: "Trade records analysed by risk team (14 days reviewed)",
      type: "trading",
    },
    {
      date: "3 Mar 2026",
      event: "Trading anomaly flagged possible wash trading. CASE-0744 opened, SUS-000844 applied",
      type: "trading",
    },
    {
      date: "4 Apr 2026",
      event: "Identity verified by phone. LCK-001 removed - login restored",
      type: "system",
    },
    { date: "3 Apr 2026", event: "Client contacted support - SLA-0214 opened", type: "support" },
    {
      date: "2 Apr 2026",
      event: "5 failed login attempts - Login lock applied (LCK-001)",
      type: "lock",
    },
    { date: "20 Jan 2026", event: "Account fully active onboarding complete", type: "system" },
    {
      date: "14 Jan 2026",
      event: "KYC approved all documents passed. Deposit restriction DEP-000 removed",
      type: "kyc",
    },
    {
      date: "10 Jan 2026",
      event: "KYC hold applied (KYC-H001) - verification in progress",
      type: "kyc",
    },
    { date: "9 Jan 2026", event: "KYC documents submitted by client", type: "kyc" },
    { date: "6 Jan 2026", event: "Account created onboarding started", type: "system" },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans antialiased p-6">
      {/* COMPLIANCE CORE: DYNAMIC MULTI-LAYERED ACTIVE INVESTIGATION BANNER[cite: 7] */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="bg-red-100 p-2 rounded-lg text-red-700 mt-0.5">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-red-950">
                Active Investigation — {accountStatusSummary.activeBannerId}
              </h2>
              <span className="bg-red-200 text-red-800 text-[10px] px-1.5 py-0.2 rounded font-bold font-mono">
                BREACHED
              </span>
            </div>
            <p className="text-xs text-red-800/90 mt-1 font-medium">
              AML • Critical priority • Under review • Assigned Desk: Administrator Controls • SLA
              Breached
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const masterCase = investigationCases.find(
              (c) => c.id === accountStatusSummary.caseReference,
            );
            setSelectedCase(masterCase);
            setDrawerTab("overview");
          }}
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-xs transition-all flex items-center gap-1 shrink-0"
        >
          Open Investigation Workspace <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* ACCOUNT CONTROL CENTER ENTITY CONTAINER HEADER */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block font-mono">
              USR-1001 • Martin Cooper
            </span>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight mt-0.5">
              Account Investigation Control Center
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Unified compliance auditing ledger detailing automated sub-system freezes, hold
              allocations, and risk state timelines[cite: 7].
            </p>
          </div>

          {/* SECTION 1: ACCOUNT STATUS KPI MATRIX GRID[cite: 7] */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200/60 flex-1 lg:max-w-3xl">
            <div className="px-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Account Status
              </span>
              <span className="text-xs font-extrabold text-red-600 block mt-0.5">
                {accountStatusSummary.accountStatus}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">Since 18 May 2026</span>
            </div>
            <div className="px-2 border-l border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Risk Level
              </span>
              <span className="text-xs font-extrabold text-red-600 block mt-0.5">
                {accountStatusSummary.riskLevel}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">AML score 94/100</span>
            </div>
            <div className="px-2 border-l border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Investigation
              </span>
              <span className="text-xs font-extrabold text-amber-600 block mt-0.5">
                {accountStatusSummary.investigationStatus}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">
                {accountStatusSummary.caseReference}
              </span>
            </div>
            <div className="px-2 border-l border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Account Access
              </span>
              <span className="text-xs font-extrabold text-slate-700 block mt-0.5">
                {accountStatusSummary.accountAccess}
              </span>
              <span className="text-[9px] text-slate-400 block">All vectors severed</span>
            </div>
            <div className="px-2 border-l border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Last Review
              </span>
              <span className="text-xs font-extrabold text-slate-900 block mt-0.5">
                {accountStatusSummary.lastReview}
              </span>
              <span className="text-[9px] text-slate-400 block font-mono">Compliance desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-SECTION INDEX ROUTING ROW[cite: 7] */}
      <div className="flex flex-wrap gap-1 border-b border-slate-200 mb-6 overflow-x-auto pb-1">
        {[
          {
            id: "current-status",
            label: "Current Controls Snapshot",
            count: activeRestrictions.length + activeHolds.length,
          },
          { id: "lock-history", label: "Lock History Log", count: lockHistory.length },
          {
            id: "restrictions-history",
            label: "Platform Restrictions",
            count: restrictionHistory.length,
          },
          { id: "hold-history", label: "Hold Records Matrix", count: holdHistory.length },
          {
            id: "suspension-history",
            label: "Suspension Segments",
            count: suspensionHistory.length,
          },
          {
            id: "cases-history",
            label: "All Investigation Cases",
            count: investigationCases.length,
          },
          {
            id: "timeline-stream",
            label: "Chronological Account Timeline",
            count: accountEventTimeline.length,
          },
        ].map((subTab) => (
          <button
            key={subTab.id}
            onClick={() => {
              setActiveSubSection(subTab.id);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
              activeSubSection === subTab.id
                ? "border-red-600 text-red-600 bg-white font-bold shadow-2xs"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            }`}
          >
            {subTab.label}
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeSubSection === subTab.id ? "bg-red-100 text-red-700" : "bg-slate-200 text-slate-600"}`}
            >
              {subTab.count}
            </span>
          </button>
        ))}
      </div>

      {/* CORE CONTROL INTERFACES & REGISTRIES SPLIT LAYOUT */}
      <div className="grid grid-cols-1 gap-6">
        {/* WORKSPACE SELECTION 1: CURRENT STATUS & QUICK RESOLUTIONS */}
        {activeSubSection === "current-status" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SECTION 2: ACTIVE RESTRICTIONS LISTING DATA GRID[cite: 7] */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5 lg:col-span-2">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                    <Ban className="w-4 h-4 text-red-600" /> Section 2: Active Constraints &
                    Restrictions Grid
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Individual components currently restricted from the user's workspace engine
                    node[cite: 7].
                  </p>
                </div>
                <span className="bg-red-50 text-red-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-red-100">
                  {activeRestrictions.length} Blocks Engaged
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                      <th className="p-3">Restriction Element Target</th>
                      <th className="p-3">Status State</th>
                      <th className="p-3">Applied By Node</th>
                      <th className="p-3 font-mono">Date</th>
                      <th className="p-3">Reason Summary Mapping</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {activeRestrictions.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/60 transition-all">
                        <td className="p-3 font-bold text-slate-900">{item.restriction}</td>
                        <td className="p-3">
                          <span className="bg-red-100 text-red-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-200">
                            {item.status}
                          </span>
                        </td>
                        <td className="p-3 font-sans font-semibold text-slate-600">
                          {item.appliedBy}
                        </td>
                        <td className="p-3 font-mono text-slate-500">{item.date}</td>
                        <td className="p-3 text-slate-500 italic text-[11px]">{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SECTION 3: ACTIVE RISK HOLDS MONITOR MATRIX[cite: 7] */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                  <Layers className="w-4 h-4 text-amber-600" /> Section 3: Active Compliance Holds
                  Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Asset locks separate from platform interaction restrictions[cite: 7].
                </p>
              </div>

              <div className="space-y-3">
                {activeHolds.map((hold) => (
                  <div
                    key={hold.id}
                    className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:border-slate-300 transition-all"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 block">
                          {hold.id}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-900">{hold.holdType}</h4>
                      </div>
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px] uppercase border border-amber-200">
                        Active
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1.5 border-t border-slate-200/60 font-medium text-slate-600">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Team:</span> {hold.team}
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Since:</span>{" "}
                        {hold.since}
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 block text-[10px]">Reason & Volume:</span>
                        <span className="text-slate-900 font-bold font-sans">{hold.reason} — </span>
                        <span className="text-red-600 font-bold font-mono">{hold.details}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 2: HISTORICAL LOCK EVENTS WITH DEEP DRILL DOWN[cite: 7] */}
        {activeSubSection === "lock-history" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Lock className="w-4 h-4 text-indigo-600" /> Section 2: Complete Account Lock
                History Ledger
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Comprehensive audit log mapping credential locks, automatic timeouts, and access
                status overrides. Click row to trigger verification metadata drawer[cite: 7].
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Lock ID Node</th>
                    <th className="p-3">Lock Configuration Type</th>
                    <th className="p-3">Enforcing Authority</th>
                    <th className="p-3">Enforcement Date</th>
                    <th className="p-3">Release Timestamp</th>
                    <th className="p-3">Reason Parameter Mapping</th>
                    <th className="p-3">Source Vector</th>
                    <th className="p-3 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {lockHistory.map((lock) => (
                    <tr
                      key={lock.id}
                      onClick={() => {
                        setSelectedLock(lock);
                        setDrawerTab("overview");
                      }}
                      className="hover:bg-indigo-50/40 transition-all cursor-pointer group"
                    >
                      <td className="p-3 font-mono font-bold text-indigo-600">{lock.id}</td>
                      <td className="p-3 font-bold text-slate-900">{lock.type}</td>
                      <td className="p-3 text-slate-600 font-semibold">{lock.lockedBy}</td>
                      <td className="p-3 font-mono text-slate-500">{lock.date}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${lock.unlockDate === "Active" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-500"}`}
                        >
                          {lock.unlockDate}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 italic text-[11px]">{lock.reason}</td>
                      <td className="p-3">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 border border-slate-200">
                          {lock.source}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-slate-400 group-hover:text-red-600 inline-flex items-center gap-0.5 font-bold">
                          Drill Down <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 3: HISTORICAL PLATFORM CONSTRAINTS[cite: 7] */}
        {activeSubSection === "restrictions-history" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <History className="w-4 h-4 text-red-600" /> Section 3: Platform Restrictions
                Historical Trail
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every restriction ever applied to individual sub-modules mapped
                chronologically[cite: 7].
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="p-3">ID Node</th>
                    <th className="p-3">Restriction Scope</th>
                    <th className="p-3">Applied By Team</th>
                    <th className="p-3 font-mono">Applied Date</th>
                    <th className="p-3 font-mono">Removed Date</th>
                    <th className="p-3">Core Operational Reason</th>
                    <th className="p-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {restrictionHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-500">{item.id}</td>
                      <td className="p-3 font-bold text-slate-900">{item.restriction}</td>
                      <td className="p-3 text-slate-600 font-semibold">{item.appliedBy}</td>
                      <td className="p-3 font-mono text-slate-500">{item.date}</td>
                      <td className="p-3 font-mono text-slate-400">{item.removedDate}</td>
                      <td className="p-3 text-slate-500 italic text-[11px]">{item.reason}</td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded font-bold ${item.status === "Active" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-400"}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 4: COMPLIANCE HOLD RECORD MATRIX[cite: 7] */}
        {activeSubSection === "hold-history" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Layers className="w-4 h-4 text-amber-600" /> Section 4: Hold History & Financial
                Asset Freezes Log
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Historical verification holds, clearing statuses, and regulatory asset monitoring
                locks[cite: 7].
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Hold ID Node</th>
                    <th className="p-3">Hold Classification Type</th>
                    <th className="p-3">Managing Desk Unit</th>
                    <th className="p-3 font-mono">Start Date</th>
                    <th className="p-3 font-mono">End Date</th>
                    <th className="p-3">Core Operational Reason Mapping</th>
                    <th className="p-3 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {holdHistory.map((hold) => (
                    <tr key={hold.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-amber-600">{hold.id}</td>
                      <td className="p-3 font-bold text-slate-900">{hold.type}</td>
                      <td className="p-3 text-slate-600 font-semibold">{hold.team}</td>
                      <td className="p-3 font-mono text-slate-500">{hold.startDate}</td>
                      <td className="p-3 font-mono text-slate-400">{hold.endDate}</td>
                      <td className="p-3 text-slate-500 italic text-[11px]">{hold.reason}</td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded font-bold ${hold.status === "Active" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}
                        >
                          {hold.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 5: SUSPENSION SECTOR TRACKER[cite: 7] */}
        {activeSubSection === "suspension-history" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <AlertTriangle className="w-4 h-4 text-red-600" /> Section 5: Master Suspension
                History Register
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Historical full-account suspension events and legal arbitration routing
                details[cite: 7].
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Suspension ID Node</th>
                    <th className="p-3">Enforcement Date</th>
                    <th className="p-3">Applied By Node</th>
                    <th className="p-3">Trigger Alert Reason</th>
                    <th className="p-3">Linked Investigation Case</th>
                    <th className="p-3">Case Outcome Target</th>
                    <th className="p-3 text-right">Status State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {suspensionHistory.map((susp) => (
                    <tr key={susp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-red-600">{susp.id}</td>
                      <td className="p-3 font-mono text-slate-500">{susp.date}</td>
                      <td className="p-3 font-sans font-bold text-slate-900">{susp.appliedBy}</td>
                      <td className="p-3 text-slate-500 font-medium text-[11px]">{susp.reason}</td>
                      <td className="p-3 font-mono text-indigo-600 font-bold">{susp.case}</td>
                      <td className="p-3 font-sans text-slate-600 font-semibold italic">
                        {susp.outcome}
                      </td>
                      <td className="p-3 text-right">
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded font-bold ${susp.status === "Active" ? "bg-red-100 text-red-800" : "bg-slate-100 text-slate-400"}`}
                        >
                          {susp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 6: ALL MASTER CASE REGISTRIES[cite: 7] */}
        {activeSubSection === "cases-history" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-5">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Shield className="w-4 h-4 text-indigo-600" /> Section 6: Comprehensive
                Investigation Registries Workspace
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click rows to open advanced sub-tab panels inside the deep evidence drawer
                system[cite: 7].
              </p>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 font-bold border-b border-slate-200 text-[10px] text-slate-500 uppercase tracking-wider">
                    <th className="p-3">Case ID Node</th>
                    <th className="p-3">Classification Type</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3">Severity Level</th>
                    <th className="p-3">Priority Vector</th>
                    <th className="p-3 font-mono">Created Date</th>
                    <th className="p-3 font-mono">Closed Date</th>
                    <th className="p-3">Assigned Compliance Officer</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {investigationCases.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => {
                        setSelectedCase(c);
                        setDrawerTab("overview");
                      }}
                      className="hover:bg-red-50/40 cursor-pointer transition-all group"
                    >
                      <td className="p-3 font-mono font-bold text-red-600">{c.id}</td>
                      <td className="p-3 font-bold text-slate-900">{c.type}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${c.status === "Under Review" ? "bg-amber-500 animate-pulse" : "bg-slate-400"}`}
                          />{" "}
                          {c.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{c.severity}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 text-[10px] rounded font-bold ${c.priority === "Critical" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"}`}
                        >
                          {c.priority}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-slate-500">{c.created}</td>
                      <td className="p-3 font-mono text-slate-400">{c.closed}</td>
                      <td className="p-3 font-sans font-bold text-slate-900">{c.investigator}</td>
                      <td className="p-3 text-right text-indigo-600 font-bold group-hover:text-red-600 text-[11px]">
                        Inspect File &rarr;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WORKSPACE SELECTION 7: ACCOUNT EVENT CHRONOLOGICAL STREAM[cite: 7] */}
        {activeSubSection === "timeline-stream" && (
          <div className="bg-white border border-slate-200 rounded-xl shadow-xs p-6">
            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide text-[11px]">
                <Clock className="w-4 h-4 text-slate-600" /> Section 9: Cryptographically Logged
                Event Timeline
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Chronological system tracking from account registration metrics up to the active
                multi-layered suspension blocks[cite: 7].
              </p>
            </div>

            <div className="relative border-l-2 border-slate-200 pl-6 ml-2 space-y-6 text-xs">
              {accountEventTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Dynamic Color Dots Mapped via Action Type Spec */}
                  <div
                    className={`absolute w-3 h-3 rounded-full -left-[31px] top-0.5 border-2 border-white transition-transform group-hover:scale-125 shadow-2xs ${
                      item.type === "lock"
                        ? "bg-red-600"
                        : item.type === "hold"
                          ? "bg-amber-500"
                          : item.type === "suspension"
                            ? "bg-purple-600"
                            : item.type === "alert"
                              ? "bg-rose-500"
                              : "bg-slate-600"
                    }`}
                  />

                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono font-bold text-slate-400 text-[11px]">
                      {item.date}
                    </span>
                    <span className="text-[9px] font-bold uppercase px-1 rounded bg-slate-100 border border-slate-200 text-slate-500">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-slate-800 font-bold font-sans tracking-tight text-xs leading-normal">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* DYNAMIC CASE WORKSPACE DEEP-INSPECTION ANALYTICAL DRAWER[cite: 7] */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedCase(null)} />

          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left">
            {/* Drawer Header Panel */}
            <div className="p-4 bg-slate-950 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-900/50 inline-block mb-1">
                  {selectedCase.id} • Active Workspace File
                </span>
                <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-tight">
                  {selectedCase.type} Investigation Log
                </h4>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg border border-slate-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-tab Selection Framework Row */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {["overview", "documents", "approvals", "evidence"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`flex-1 text-center py-3 border-b-2 transition-all ${
                    drawerTab === tab
                      ? "border-red-600 text-red-600 bg-white font-bold shadow-2xs"
                      : "border-transparent hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable Workspace Core Body Area[cite: 7] */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs font-medium text-slate-700">
              {drawerTab === "overview" && (
                <div className="space-y-3 font-sans text-[11px]">
                  <div className="bg-red-50 border border-red-100 p-3 rounded-lg text-red-900 font-bold text-xs flex justify-between">
                    <span>Status Matrix Evaluation:</span>
                    <span className="font-mono bg-red-100 px-1.5 rounded">
                      {selectedCase.status} / {selectedCase.priority}
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
                      Detailed Mapping Attributes
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Investigator Assigned:</span>
                        <span className="font-bold text-slate-900">
                          {selectedCase.investigator}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Team Desk Unit:</span>
                        <span className="font-bold text-slate-900">{selectedCase.team}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">SLA Milestone Tracking:</span>
                        <span className="font-bold text-red-600">{selectedCase.slaDeadline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Linked Suspension Token:</span>
                        <span className="font-bold font-mono text-slate-900">
                          {selectedCase.linkedSuspension}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Linked Holds Registry:</span>
                        <span className="font-bold font-mono text-slate-900">
                          {selectedCase.linkedHolds}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Linked Constraints applied:</span>
                        <span className="font-bold font-mono text-slate-900">
                          {selectedCase.linkedRestrictions}
                        </span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 border-dashed">
                        <span className="text-slate-900 font-bold">
                          Total Exposure Volume Flagged:
                        </span>
                        <span className="font-bold font-mono text-red-600 text-xs">
                          {selectedCase.totalAmountFlagged}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "documents" && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    Pending Compliance Verification Artifacts:
                  </span>
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg space-y-2">
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                      <FileText className="w-4 h-4 text-indigo-500" /> Source of Funds (SOF)
                      Statement
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                      <FileText className="w-4 h-4 text-indigo-500" /> Authorized Identity Notarized
                      Selfie
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 font-bold">
                      <FileText className="w-4 h-4 text-indigo-500" /> Global Proof of Address Match
                      Log
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "approvals" && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    Authorization Sequence Sign-Off Chain:
                  </span>
                  <div className="space-y-2">
                    {selectedCase.approvals?.map((step, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-slate-50 border border-slate-200 p-2.5 rounded-lg"
                      >
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{step.step}</p>
                          <p className="text-[11px] text-slate-400">{step.owner}</p>
                        </div>
                        <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded">
                          {step.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {drawerTab === "evidence" && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    Isolate Verification Metrics Payload:
                  </span>
                  <div className="space-y-1.5 font-mono text-[11px]">
                    {selectedCase.evidence?.map((ev, i) => (
                      <div
                        key={i}
                        className="bg-slate-950 p-2.5 rounded-lg text-slate-300 border border-slate-900 flex justify-between gap-4"
                      >
                        <span className="text-indigo-400 font-sans shrink-0">{ev.label}:</span>
                        <span className="text-right text-slate-100 font-bold">{ev.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Lower Bottom Action Core Rig */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs font-bold font-sans">
              <button
                onClick={() => alert("Downloading analytical case payloads.")}
                className="py-2.5 px-3 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-center transition-all shadow-2xs"
              >
                Export Audit Archive
              </button>
              <button
                onClick={() => {
                  alert("Resolution Committed.");
                  setSelectedCase(null);
                }}
                className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-center transition-all shadow-xs"
              >
                Commit Compliance Overrides
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC SECONDARY DRILL DOWN DRAWER FOR LOCK HISTORIES[cite: 7] */}
      {selectedLock && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex justify-end z-50 animate-fade-in">
          <div className="absolute inset-0 -z-10" onClick={() => setSelectedLock(null)} />

          <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-slide-left">
            <div className="p-4 bg-indigo-950 text-white flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-900/50 px-2 py-0.5 rounded border border-indigo-900 inline-block mb-1">
                  {selectedLock.id} • Historical Lock Node
                </span>
                <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-tight">
                  Access Lock Verification Metrics
                </h4>
              </div>
              <button
                onClick={() => setSelectedLock(null)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-indigo-900 rounded-lg border border-indigo-900 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              {["overview", "failed-attempts", "ip-log", "history"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDrawerTab(tab)}
                  className={`flex-1 text-center py-3 border-b-2 transition-all ${
                    drawerTab === tab
                      ? "border-indigo-600 text-indigo-600 bg-white font-bold shadow-2xs"
                      : "border-transparent hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {tab.replace("-", " ")}
                </button>
              ))}
            </div>

            {/* Scrollable Body Content mapped exactly to specification blocks[cite: 7] */}
            <div className="p-5 flex-1 overflow-y-auto space-y-4 text-xs font-medium text-slate-700">
              {drawerTab === "overview" && (
                <div className="space-y-3 font-sans text-[11px]">
                  <div className="border border-slate-200 rounded-xl p-4 space-y-2 bg-slate-50/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
                      Lock Meta Coordinates
                    </span>
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Lock Type:</span>
                        <span className="font-bold text-slate-900">{selectedLock.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Status State:</span>
                        <span className="font-bold text-red-600">{selectedLock.unlockDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Applied By Auto:</span>
                        <span className="font-bold text-slate-900">{selectedLock.lockedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Enforcement Time:</span>
                        <span className="font-mono text-slate-900">{selectedLock.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Trigger Alert Parameter:</span>
                        <span className="font-bold text-slate-900">{selectedLock.trigger}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Running Track Duration:</span>
                        <span className="font-bold text-slate-700">{selectedLock.duration}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-slate-200 border-dashed">
                        <span className="text-slate-400">Linked Case:</span>
                        <span className="font-mono font-bold text-indigo-600">
                          {selectedLock.linkedInvestigation}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "failed-attempts" && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    Consecutive Credentials Ingress Failure Queue[cite: 7]:
                  </span>
                  <div className="bg-slate-900 text-slate-300 font-mono text-[11px] p-4 rounded-xl space-y-1.5 border border-slate-950">
                    {selectedLock.attempts?.map((att, i) => (
                      <p key={i} className="text-slate-300">
                        <span className="text-red-400 font-bold">Attempt {i + 1}:</span> {att}
                      </p>
                    ))}
                    <p className="text-red-400 border-t border-slate-800 pt-2 font-bold font-sans">
                      System Trigger: Automated account lock deployed after attempt 7.
                    </p>
                  </div>
                </div>
              )}

              {drawerTab === "ip-log" && (
                <div className="space-y-3 font-sans">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block border-b border-slate-200 pb-1">
                      Network & Anonymization Audit
                    </span>
                    {selectedLock.ips?.map((ip, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[11px] font-mono py-1 border-b border-slate-100 last:border-0"
                      >
                        <span className="text-slate-400 font-sans">IP Node Address {i + 1}:</span>
                        <span className="font-bold text-slate-900">{ip}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 text-[11px]">
                      <span className="text-slate-400">Geographical Mismatch:</span>
                      <span className="font-bold text-red-600">{selectedLock.geoMismatch}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400">Threat Risk Flag:</span>
                      <span className="font-bold text-red-600">{selectedLock.riskFlag}</span>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "history" && (
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-slate-600 block">
                    Cryptographic Action Chain Timeline[cite: 7]:
                  </span>
                  <div className="border border-slate-200 rounded-xl overflow-hidden font-mono text-[11px]">
                    <div className="bg-slate-50 p-3 divide-y divide-slate-100 space-y-2">
                      {selectedLock.timeline?.map((tl, i) => (
                        <div key={i} className="pt-2 first:pt-0">
                          <p className="text-indigo-600 font-bold">{tl.t}</p>
                          <p className="text-slate-700 font-sans mt-0.5">{tl.m}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200">
              <button
                onClick={() => {
                  alert("Manual override unlock executed.");
                  setSelectedLock(null);
                }}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-center shadow-xs transition-all text-xs"
              >
                Force Manual Security Unlock Override
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER AUDIT LOG BUNDLE SYSTEM STAMP */}
      <div className="mt-6 bg-white border border-slate-200 p-4 rounded-xl text-center shadow-2xs">
        <p className="text-[10px] font-mono font-bold tracking-tight text-slate-400 uppercase">
          Enterprise Account Control Framework • Active Investigation Banner Modules • Historical
          Locks Ledgers • System Constraints Registry Validation Nodes[cite: 7]
        </p>
      </div>
    </div>
  );
}
