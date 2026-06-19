import React, { useState } from "react";

// Main Component
const KycTab = () => {
  // Navigation and Interactive State
  const [selectedStep, setSelectedStep] = useState(5); // Default open Step 5 as requested
  const [activeSubTab, setActiveSubTab] = useState("Overview");

  // KPI Header Cards Data
  const kpiData = [
    {
      title: "Overall KYC Status",
      value: "Under Review",
      desc: "Address doc pending",
      color: "text-amber-600",
      bg: "bg-amber-50 border-amber-200",
    },
    {
      title: "AML Status",
      value: "Needs Review",
      desc: "PEP match - 1 open case",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
    },
    {
      title: "Risk Level",
      value: "High Risk",
      desc: "Score 82/100 - Tier 2",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
    },
    {
      title: "Verification Progress",
      value: "82%",
      desc: "Provider: SumSub",
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-200",
      progress: 82,
    },
    {
      title: "Trading Status",
      value: "Enabled",
      desc: "All accounts active",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200",
    },
    {
      title: "Withdrawal Status",
      value: "Blocked",
      desc: "PEP approval pending",
      color: "text-rose-600",
      bg: "bg-rose-50 border-rose-200",
    },
    {
      title: "Last Reviewer",
      value: "Rajan Mehta",
      desc: "Compliance Officer",
      color: "text-slate-700",
      bg: "bg-slate-50 border-slate-200",
    },
    {
      title: "Verification Provider",
      value: "SumSub",
      desc: "Last check: Today 06:00",
      color: "text-slate-700",
      bg: "bg-slate-50 border-slate-200",
    },
  ];

  // Critical System Banners
  const alerts = [
    {
      type: "danger",
      message:
        "Politically exposed person match requires senior compliance approval before withdrawals are released.",
    },
    {
      type: "danger",
      message:
        "Withdrawal hold active — All withdrawals blocked pending AML case AML-2026-0041 resolution.",
    },
    {
      type: "warning",
      message:
        "Address proof pending review — Utility bill submitted 10 May 2026. Awaiting compliance officer decision.",
    },
    {
      type: "warning",
      message:
        "AML screening in progress — Case AML-2026-0041 - Rapid deposit pattern. Assigned to Rajan Mehta.",
    },
    {
      type: "info",
      message:
        "EDD (Enhanced Due Diligence) required — Client classified as high-risk PEP. Additional documentation mandatory.",
    },
  ];

  // Verification Progress Matrix Data
  const matrixSteps = [
    {
      id: 1,
      name: "Registration",
      status: "Approved",
      decision: "Auto",
      reviewer: "System",
      attempts: 1,
      updated: "20 May 2026",
    },
    {
      id: 2,
      name: "Personal Information",
      status: "Approved",
      decision: "Manual",
      reviewer: "admin_22",
      attempts: 1,
      updated: "21 May 2026",
    },
    {
      id: 3,
      name: "Financial Details",
      status: "Re-submitted",
      decision: "Manual",
      reviewer: "admin_81",
      attempts: 2,
      updated: "22 May 2026",
    },
    {
      id: 4,
      name: "Trading Experience",
      status: "Approved",
      decision: "Auto",
      reviewer: "System",
      attempts: 1,
      updated: "21 May 2026",
    },
    {
      id: 5,
      name: "Agreements & Consent",
      status: "Approved",
      decision: "Auto",
      reviewer: "System",
      attempts: 1,
      updated: "21 May 2026",
    },
    {
      id: 6,
      name: "Identity Documents",
      status: "Approved",
      decision: "Manual",
      reviewer: "SumSub/co_12",
      attempts: 3,
      updated: "22 May 2026",
    },
    {
      id: 7,
      name: "Address Verification",
      status: "Under Review",
      decision: "Manual",
      reviewer: "Rajan Mehta",
      attempts: 1,
      updated: "10 May 2026",
    },
    {
      id: 8,
      name: "Source of Funds",
      status: "Approved",
      decision: "Manual",
      reviewer: "admin_22",
      attempts: 1,
      updated: "02 Aug 2023",
    },
    {
      id: 9,
      name: "AML Screening",
      status: "Needs Review",
      decision: "Manual",
      reviewer: "Rajan Mehta",
      attempts: 1,
      updated: "16 May 2026",
    },
    {
      id: 10,
      name: "Final Approval",
      status: "Pending",
      decision: "—",
      reviewer: "—",
      attempts: 0,
      updated: "—",
    },
  ];

  // Tab List Setup
  const subTabs = [
    "Overview",
    "Identity",
    "Address",
    "AML Screening",
    "Risk Analysis",
    "Source of Funds",
    "Documents Vault",
    "Rejections",
    "Linked Accounts",
    "Device & IP",
    "Restrictions",
    "Timeline",
    "Notes",
    "Audit Logs",
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 font-sans p-4 lg:p-6 selection:bg-indigo-500 selection:text-white">
      {/* 1. TOP METRIC CARDS HEADER SECTION */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
        {kpiData.map((kpi, idx) => (
          <div
            key={idx}
            className={`border rounded-xl p-4 flex flex-col justify-between shadow-sm bg-white ${kpi.bg}`}
          >
            <div>
              <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase">
                {kpi.title}
              </p>
              <h3 className={`text-base lg:text-lg font-bold mt-1 ${kpi.color}`}>{kpi.value}</h3>
            </div>
            <div className="mt-2">
              {kpi.progress !== undefined && (
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mb-1">
                  <div className="bg-indigo-600 h-full" style={{ width: `${kpi.progress}%` }} />
                </div>
              )}
              <p className="text-[11px] text-slate-500 truncate">{kpi.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. DYNAMIC SYSTEM ALERT BANNERS */}
      <div className="space-y-2 mb-6">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 px-4 py-2.5 rounded-lg border text-xs font-medium shadow-sm ${
              alert.type === "danger"
                ? "bg-rose-50 border-rose-200 text-rose-700"
                : alert.type === "warning"
                  ? "bg-amber-50 border-amber-200 text-amber-700"
                  : "bg-sky-50 border-sky-200 text-sky-700"
            }`}
          >
            <span className="mt-0.5">⚠️</span>
            <p>{alert.message}</p>
          </div>
        ))}
      </div>

      {/* 3. VERIFICATION PROGRESS MATRIX & STEP SPECIFIC DETAILS PANEL */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mb-6">
        {/* Progress Matrix Side List */}
        <div className="xl:col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <h4 className="text-sm font-bold tracking-wide uppercase text-indigo-600 flex items-center gap-2">
              <span>📊</span> Verification Progress Matrix
            </h4>
            <span className="text-[11px] text-slate-500 italic">
              Click step to view fields & actions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Step</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2">Decision</th>
                  <th className="py-2.5 px-2">Reviewer</th>
                  <th className="py-2.5 px-2 text-center">Attempts</th>
                  <th className="py-2.5 px-2">Updated Date</th>
                  <th className="py-2.5 px-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {matrixSteps.map((step) => (
                  <tr
                    key={step.id}
                    onClick={() => step.status !== "Pending" && setSelectedStep(step.id)}
                    className={`hover:bg-slate-50 transition-colors cursor-pointer group ${selectedStep === step.id ? "bg-indigo-50/60 border-l-2 border-l-indigo-600" : ""}`}
                  >
                    <td className="py-3 px-2 text-slate-400">{step.id}</td>
                    <td className="py-3 px-2 font-semibold text-slate-700 group-hover:text-indigo-600">
                      {step.name}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${
                          step.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : step.status === "Under Review"
                              ? "bg-amber-100 text-amber-700"
                              : step.status === "Re-submitted"
                                ? "bg-sky-100 text-sky-700"
                                : step.status === "Needs Review"
                                  ? "bg-rose-100 text-rose-700"
                                  : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {step.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-slate-600">{step.decision}</td>
                    <td className="py-3 px-2 text-slate-600">{step.reviewer}</td>
                    <td className="py-3 px-2 text-center text-slate-600">{step.attempts || "—"}</td>
                    <td className="py-3 px-2 text-slate-500">{step.updated}</td>
                    <td className="py-3 px-2 text-right">
                      <button
                        className={`px-2.5 py-1 text-[11px] font-medium rounded border transition-all ${
                          selectedStep === step.id
                            ? "bg-indigo-600 border-indigo-600 text-white"
                            : "bg-white border-slate-300 text-slate-600 group-hover:bg-slate-50"
                        }`}
                      >
                        {step.status === "Pending" ? "Locked" : "View"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Details Drawer Display Area */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-sm font-bold text-slate-800">
                Step {selectedStep}: {matrixSteps.find((s) => s.id === selectedStep)?.name}
              </h4>
              <span className="px-2 py-0.5 text-[10px] bg-slate-100 text-indigo-600 font-mono rounded-md">
                Details Panel
              </span>
            </div>

            {/* CONDITIONAL RENDERING: STEP 5 SPECIFIC CONFIGURATION DETAILS */}
            {selectedStep === 5 && (
              <div className="space-y-4">
                {/* Core Header Stats */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-[11px] text-slate-500 block">Decision Mechanism</span>
                    <span className="text-xs font-semibold text-emerald-700">
                      Automated Match Verification
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-500 block">Execution System</span>
                    <span className="text-xs font-semibold text-slate-700">
                      SumSub Contract Engine
                    </span>
                  </div>
                </div>

                {/* Field-Level Extractions & Validation Metrics */}
                <div>
                  <h5 className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase mb-2">
                    Field-Level Contract Validations
                  </h5>
                  <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                    {[
                      {
                        label: "Terms of Business Version",
                        val: "v2026.1.2",
                        check: "✔ Verified Match",
                      },
                      {
                        label: "Client Explicit Consent Timestamp",
                        val: "21 May 2026 10:14:02",
                        check: "✔ Authenticated",
                      },
                      {
                        label: "Risk & Leverage Disclosure Signature",
                        val: "Digitally Signed (SHA-256)",
                        check: "✔ Valid Integrity",
                      },
                      {
                        label: "Privacy Policy Acknowledgment",
                        val: "Accepted Status",
                        check: "✔ Compliant",
                      },
                      {
                        label: "Copy Trading Terms Agreement",
                        val: "Accepted Status",
                        check: "✔ Active Relationship",
                      },
                      {
                        label: "IP Signature Match Tracker",
                        val: "103.21.48.12 (Mumbai, IN)",
                        check: "✔ Match Registered",
                      },
                    ].map((f, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-slate-50 p-2 rounded border border-slate-200 text-xs"
                      >
                        <div>
                          <span className="text-slate-500 block font-medium">{f.label}</span>
                          <span className="text-slate-700 font-mono text-[11px] font-semibold">
                            {f.val}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                          {f.check}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* FALLBACK FIELD SCHEMAS FOR OTHER STEPS */}
            {selectedStep === 2 && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                  <div>
                    <span className="text-slate-500 block">First Name</span>
                    <span className="font-bold text-slate-800">Arjun</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Last Name</span>
                    <span className="font-bold text-slate-800">Raghunathan</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">DOB</span>
                    <span className="font-mono text-slate-800">12 Aug 1987</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Nationality</span>
                    <span className="font-bold text-slate-800">Indian</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Gender</span>
                    <span className="text-slate-800">Male</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tax ID / PAN</span>
                    <span className="font-mono text-slate-800">ABCPR1234N</span>
                  </div>
                </div>
                <div className="bg-emerald-50 text-emerald-700 p-2 rounded border border-emerald-200 font-medium">
                  ✔ All core identity parameters passed manual system verification cross-checks
                  safely.
                </div>
              </div>
            )}

            {selectedStep !== 5 && selectedStep !== 2 && (
              <div className="py-12 text-center text-xs text-slate-400 italic">
                Showing placeholder dataset for system step validation #{selectedStep}. Core
                attributes fully mapped down under specific module sub-tabs.
              </div>
            )}
          </div>

          {/* Core Action Command Panel */}
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-4 mt-4">
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg py-2 text-xs font-bold transition-all shadow-sm">
              ✓ Approve Step
            </button>
            <button className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-lg py-2 text-xs font-bold transition-all">
              Reject / Flag
            </button>
            <button className="col-span-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg py-1.5 text-xs font-medium transition-all text-center border border-slate-200">
              Request Documentation Re-submission
            </button>
          </div>
        </div>
      </div>

      {/* 4. COMPREHENSIVE SUB-TAB HORIZONTAL CONTROL SEGMENT */}
      <div className="w-full bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="flex overflow-x-auto border-b border-slate-200 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {subTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`flex-shrink-0 px-5 py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
                activeSubTab === tab
                  ? "bg-white border-b-indigo-600 text-indigo-600"
                  : "border-b-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 5. MULTI-TAB EXPANDED CONTENT VAULT */}
        {/* 5. MULTI-TAB EXPANDED CONTENT VAULT */}
        <div className="p-5 min-h-[400px] bg-white text-xs">
          {/* TAB 1: OVERVIEW COMPLIANCE MATRIX */}
          {activeSubTab === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h5 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1.5">
                  Compliance Profile
                </h5>
                <div className="space-y-2">
                  {[
                    { l: "Client Category", v: "Individual" },
                    { l: "Jurisdiction", v: "India" },
                    { l: "Risk Level", v: "High Risk" },
                    { l: "Lifecycle Stage", v: "Enhanced Due Diligence (EDD)" },
                    { l: "Verification Score", v: "72 / 100" },
                    { l: "Watchlist Match", v: "Tier 2 PEP" },
                    { l: "EDD Status", v: "In Progress" },
                    { l: "Next Review Date", v: "08 Nov 2026" },
                  ].map((x, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-100 py-1">
                      <span className="text-slate-500 font-medium">{x.l}</span>
                      <span className="font-semibold text-slate-800">{x.v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1.5 mb-2">
                    Operational Permissions
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        p: "Deposits",
                        s: "Allowed",
                        c: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        p: "Withdrawals",
                        s: "Blocked (PEP Hold)",
                        c: "bg-rose-50 text-rose-700 border-rose-200",
                      },
                      {
                        p: "Trading Terminal",
                        s: "Enabled",
                        c: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        p: "IB Commissions",
                        s: "Active",
                        c: "bg-emerald-50 text-emerald-700 border-emerald-200",
                      },
                      {
                        p: "Internal Transfers",
                        s: "Restricted",
                        c: "bg-rose-50 text-rose-700 border-rose-200",
                      },
                      {
                        p: "Crypto Gateways",
                        s: "Manual Escrow",
                        c: "bg-amber-50 text-amber-700 border-amber-200",
                      },
                    ].map((p, i) => (
                      <div
                        key={i}
                        className="bg-slate-50 p-2 rounded-md border border-slate-200 flex flex-col justify-between"
                      >
                        <span className="text-[11px] text-slate-500 mb-1 font-medium">{p.p}</span>
                        <span
                          className={`px-2 py-0.5 text-center font-bold text-[10px] rounded border ${p.c}`}
                        >
                          {p.s}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-600 block mb-2">
                    Global Override Controls
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded transition-all shadow-sm">
                      Approve KYC
                    </button>
                    <button className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-3 py-1.5 rounded transition-all">
                      Reject File
                    </button>
                    <button className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium px-3 py-1.5 rounded transition-all">
                      Freeze Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: IDENTITY OCR EXTRACTION */}
          {activeSubTab === "Identity" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block">
                  Submitted Files
                </span>
                <div className="border border-indigo-200 bg-indigo-50/50 p-4 rounded-lg text-center cursor-pointer shadow-sm">
                  <div className="text-xl mb-1">🪪</div>
                  <span className="text-slate-800 font-bold block">Passport Front (Active)</span>
                  <span className="text-[10px] text-slate-500">Verified via SumSub OCR</span>
                </div>
                <div className="border border-slate-200 bg-white p-3 rounded-lg text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <span className="text-slate-700 font-medium text-xs block">
                    📸 Biometric Selfie Match
                  </span>
                </div>
                <div className="border border-slate-200 bg-white p-3 rounded-lg text-center hover:bg-slate-50 transition-colors cursor-pointer">
                  <span className="text-slate-700 font-medium text-xs block">
                    📄 Passport Back Sheet
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8">
                <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center justify-between">
                  <span>OCR Extraction Data</span>
                  <span className="text-xs text-emerald-600 font-mono font-bold">
                    Status: Auto Approved
                  </span>
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  {[
                    { field: "Document Type", value: "Passport", integrity: "Verified" },
                    { field: "Full Name", value: "ARJUN RAGHUNATHAN", integrity: "100% Match" },
                    { field: "Date of Birth", value: "12 Aug 1987", integrity: "Age 38" },
                    { field: "Nationality", value: "Indian (IN)", integrity: "Match Clear" },
                    { field: "Document Number", value: "P8821044X", integrity: "Unique" },
                    { field: "Issue Date", value: "18 Jul 2018", integrity: "Valid" },
                    { field: "Expiry Date", value: "18 Jul 2028", integrity: "Active" },
                    { field: "Face Match Score", value: "97.4%", integrity: "Pass" },
                    { field: "Fraud Score", value: "2.1%", integrity: "Low Risk" },
                    { field: "Duplicate Check", value: "No duplicates found", integrity: "Clear" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="border-b border-slate-200 pb-2 flex flex-col justify-between"
                    >
                      <span className="text-slate-500 font-medium mb-0.5">{item.field}</span>
                      <div className="flex justify-between items-center text-slate-800">
                        <span className="font-mono font-bold text-indigo-600">{item.value}</span>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                          {item.integrity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ADDRESS VERIFICATION */}
          {activeSubTab === "Address" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-center items-center">
                <span className="text-3xl mb-2">🏠</span>
                <h6 className="font-bold text-slate-800">Utility Bill (Electricity)</h6>
                <p className="text-[11px] text-amber-700 mt-1 bg-amber-100 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                  Under Manual Review
                </p>
                <span className="text-[10px] text-slate-500 mt-2">
                  utility_bill_v1.pdf (10 May 2026)
                </span>
              </div>

              <div className="md:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                  Extracted Address Details
                </span>
                <div className="space-y-2">
                  {[
                    { field: "Extracted Address", val: "42 Marine Drive, Mumbai, 400002" },
                    { field: "Issue Date", val: "01 May 2026 (Within 3 Months)" },
                    { field: "Name Match", val: "Matched (ARJUN RAGHUNATHAN)" },
                    { field: "Country Index", val: "India (Matched)" },
                    { field: "File Quality", val: "High Definition - Clear" },
                    { field: "Utility Provider", val: "BEST Utilities Corp Ltd" },
                    { field: "Assigned Reviewer", val: "Rajan Mehta" },
                  ].map((addr, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-start border-b border-slate-200 pb-2"
                    >
                      <span className="text-slate-500 w-1/3 font-medium">{addr.field}</span>
                      <span className="text-slate-800 w-2/3 text-right font-mono font-semibold">
                        {addr.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AML SCREENING */}
          {activeSubTab === "AML Screening" && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h6 className="font-bold text-slate-800 text-sm border-b border-slate-200 pb-2">
                  AML Check Records
                </h6>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { t: "Screening Gateway", v: "Refinitiv World-Check via SumSub" },
                    { t: "Sanctions List Check", v: "CLEAR — No Record Match", ok: true },
                    { t: "PEP Watchlist Ledger", v: "POSSIBLE MATCH (Tier 2 Alert)", alert: true },
                    { t: "Adverse Media Index", v: "None Found Across Global Indexes", ok: true },
                    { t: "Enforcement Agency Watch", v: "CLEAR — No Active Alerts", ok: true },
                    { t: "US OFAC Registry", v: "CLEAR — Profile Registration Clear", ok: true },
                    { t: "UN Security Council Pool", v: "CLEAR — No Overlap Found", ok: true },
                    { t: "Case Reference ID", v: "AML-2026-0041" },
                  ].map((aml, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2.5 rounded border border-slate-200 shadow-sm"
                    >
                      <span className="text-slate-500 block font-medium mb-1">{aml.t}</span>
                      <span
                        className={`font-mono font-bold text-xs ${aml.alert ? "text-rose-600" : aml.ok ? "text-emerald-600" : "text-slate-800"}`}
                      >
                        {aml.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="bg-rose-100 border border-rose-200 text-rose-700 p-3 rounded-lg mb-3">
                    <span className="font-bold block text-xs mb-1">🚨 WATCHLIST TARGET ALERT</span>
                    <p className="text-[11px] leading-relaxed">
                      System identified a 78% name matching affinity logic tracking back to a Tier 2
                      PEP profile protocol.
                    </p>
                  </div>
                  <div className="text-xs space-y-1 bg-white p-2.5 rounded border border-slate-200">
                    <div>
                      <span className="text-slate-500">Target Name:</span>{" "}
                      <span className="text-slate-800 font-bold">Arjun Raghunathan</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Match Affinity:</span>{" "}
                      <span className="text-rose-600 font-mono font-bold">78% Match</span>
                    </div>
                    <div>
                      <span className="text-slate-500">EDD Escalation:</span>{" "}
                      <span className="text-rose-600 font-bold">Mandatory</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5 mt-4 pt-3 border-t border-slate-200">
                  <button className="w-full bg-white hover:bg-slate-100 text-emerald-600 font-bold py-1.5 rounded border border-slate-300 transition-colors shadow-sm">
                    Dismiss False Positive
                  </button>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-1.5 rounded transition-colors shadow-sm">
                    Trigger EDD Workflow
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RISK ANALYSIS */}
          {activeSubTab === "Risk Analysis" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center flex flex-col justify-center items-center">
                <div className="w-24 h-24 rounded-full border-4 border-rose-500 flex flex-col items-center justify-center bg-rose-50 mb-2">
                  <span className="text-3xl font-black text-rose-600">82</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                    Risk Score
                  </span>
                </div>
                <h6 className="font-bold text-rose-600 text-sm uppercase tracking-wide">
                  HIGH RISK CATEGORY
                </h6>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[200px]">
                  Triggers mandatory high-level compliance monitoring scrutiny.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                  Risk Category Breakdown
                </span>
                <div className="space-y-3">
                  {[
                    { cat: "PEP / Sanctions Proximity", score: 80, color: "bg-rose-500" },
                    { cat: "Financial Behavior Profile", score: 68, color: "bg-amber-500" },
                    { cat: "Jurisdiction & Geography", score: 60, color: "bg-amber-500" },
                    { cat: "Transactional Routes", score: 45, color: "bg-indigo-600" },
                    { cat: "Device/Interface Activity", score: 55, color: "bg-amber-500" },
                  ].map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500 font-medium">{r.cat}</span>
                        <span className="font-bold text-slate-700">{r.score}/100</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div className={`${r.color} h-full`} style={{ width: `${r.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                  Anti-Fraud Countermeasures
                </span>
                <div className="space-y-2">
                  {[
                    { sig: "VPN/Proxy Detection", status: "Clean — No Footprint", pass: true },
                    {
                      sig: "Fingerprint Overlap",
                      status: "ALERT — 2 Profiles Matched",
                      alert: true,
                    },
                    {
                      sig: "Sanction Country Exposure",
                      status: "Moderate Systematic Risk",
                      warn: true,
                    },
                    {
                      sig: "Deposit Velocity Engine",
                      status: "ALERT — Rapid Pattern Trigger",
                      alert: true,
                    },
                    { sig: "Withdrawal Wave Matrix", status: "Clean — Zero Vectors", pass: true },
                    { sig: "Device Hardware Match", status: "Unique Valid Signature", pass: true },
                  ].map((s, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-200 py-1.5">
                      <span className="text-slate-500 font-medium">{s.sig}</span>
                      <span
                        className={`font-bold font-mono text-[11px] ${s.alert ? "text-rose-600" : s.warn ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {s.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SOURCE OF FUNDS */}
          {activeSubTab === "Source of Funds" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h6 className="font-bold text-indigo-600 uppercase tracking-wider text-[11px] mb-2">
                  Wealth Generation Declaration
                </h6>
                {[
                  { lbl: "Primary Income Source", val: "Business Owner / Self-Employed" },
                  { lbl: "Annual Net Income Band", val: "$120,000 to $250,000 USD" },
                  { lbl: "Employment Status", val: "Self-Employed Entrepreneur" },
                  { lbl: "Operating Industry", val: "Financial Services / Markets" },
                  { lbl: "Geographical Origin", val: "Republic of India (Mumbai Region)" },
                  { lbl: "Estimated Net Worth", val: "$500,000 to $1,000,000 USD" },
                  { lbl: "Verification Status", val: "Approved" },
                  { lbl: "Assigned Audit Desk", val: "admin_22 Operations" },
                ].map((sof, idx) => (
                  <div key={idx} className="flex justify-between border-b border-slate-200 py-1.5">
                    <span className="text-slate-500 font-medium">{sof.lbl}</span>
                    <span className="text-slate-800 font-bold font-mono text-right">{sof.val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h6 className="font-bold text-indigo-600 uppercase tracking-wider text-[11px] mb-3">
                  Supporting Asset Documentation
                </h6>
                <div className="space-y-2">
                  {[
                    { name: "6-Month Personal Bank Statement", status: "Verified & Audited" },
                    { name: "FY 2024 Corporate Tax Returns Filings", status: "Verified & Audited" },
                    { name: "Business Registration License Dossier", status: "Verified & Audited" },
                    { name: "Monthly Corporate Revenue Proof", status: "Not Applicable" },
                    {
                      name: "Supplementary Wealth Proof (EDD)",
                      status: "Pending — Requested by Desk",
                    },
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-2 rounded bg-white border border-slate-200 shadow-sm"
                    >
                      <span className="text-slate-700 font-medium">{doc.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${
                          doc.status.includes("Verified")
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : doc.status.includes("Pending")
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: DOCUMENTS VAULT */}
          {activeSubTab === "Documents Vault" && (
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-4">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Encrypted File Storage Vault
                </span>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1 rounded transition-all shadow-sm">
                  + Upload New Document
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    file: "Passport Document v3",
                    type: "Identity Module",
                    date: "22 May 2026",
                    res: "Approved",
                    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
                  },
                  {
                    file: "Passport Document v2",
                    type: "Identity Module",
                    date: "21 May 2026",
                    res: "Rejected",
                    color: "border-rose-200 bg-rose-50 text-rose-700",
                  },
                  {
                    file: "Passport Document v1",
                    type: "Identity Module",
                    date: "20 May 2026",
                    res: "Rejected",
                    color: "border-rose-200 bg-rose-50 text-rose-700",
                  },
                  {
                    file: "Utility Bill Statement",
                    type: "Address Module",
                    date: "10 May 2026",
                    res: "Under Review",
                    color: "border-amber-200 bg-amber-50 text-amber-700",
                  },
                  {
                    file: "Banking Portfolio Records",
                    type: "Source of Funds",
                    date: "02 Aug 2023",
                    res: "Approved",
                    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
                  },
                  {
                    file: "Corporate Tax returns 2024",
                    type: "Source of Funds",
                    date: "02 Aug 2023",
                    res: "Approved",
                    color: "border-emerald-200 bg-emerald-50 text-emerald-700",
                  },
                  {
                    file: "Signed T&C Contract Setup",
                    type: "Legal Operations",
                    date: "20 May 2024",
                    res: "Locked",
                    color: "border-indigo-200 bg-indigo-50 text-indigo-700",
                  },
                ].map((box, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border text-center shadow-sm flex flex-col justify-between items-center bg-white ${box.color}`}
                  >
                    <span className="text-2xl mb-1">📄</span>
                    <div>
                      <span className="font-bold block text-slate-800 text-xs">{box.file}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{box.type}</span>
                    </div>
                    <div className="mt-3 w-full pt-1.5 border-t border-slate-100 text-[10px] flex justify-between text-slate-500 font-mono">
                      <span>{box.date}</span>
                      <span className="font-bold">{box.res}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: REJECTIONS MONITOR */}
          {activeSubTab === "Rejections" && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                Rejection Logs & Resubmission Life-Cycle
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200 bg-white">
                      <th className="p-2">Document Name</th>
                      <th className="p-2">Version</th>
                      <th className="p-2">Result</th>
                      <th className="p-2">System Rejection Reason</th>
                      <th className="p-2">Reviewed By</th>
                      <th className="p-2">Mechanism</th>
                      <th className="p-2">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {[
                      {
                        d: "Passport File",
                        v: "v1 Node",
                        r: "Rejected",
                        rsn: "Image too blurry — edge framework bounds fail",
                        by: "admin_22 Desk",
                        t: "Manual Action",
                        dt: "20 May 2026 16:00",
                      },
                      {
                        d: "Passport File",
                        v: "v2 Node",
                        r: "Rejected",
                        rsn: "Document cropped — corner marker data cut off",
                        by: "SumSub Engine",
                        t: "Auto Action",
                        dt: "21 May 2026 09:30",
                      },
                      {
                        d: "Passport File",
                        v: "v3 Node",
                        r: "Approved",
                        rsn: "Pass Clear Match Criteria Confirmed safely",
                        by: "compliance_12",
                        t: "Manual Override",
                        dt: "22 May 2026 14:12",
                      },
                      {
                        d: "Financial Profile Info",
                        v: "v1 Node",
                        r: "Rejected",
                        rsn: "Annual income reference validation links missing",
                        by: "admin_81 Desk",
                        t: "Manual Action",
                        dt: "21 May 2026 11:24",
                      },
                      {
                        d: "Financial Profile Info",
                        v: "v2 Node",
                        r: "Approved",
                        rsn: "Pass Correlated with Tax Filing Attachments",
                        by: "admin_81 Desk",
                        t: "Manual Action",
                        dt: "22 May 2026 10:05",
                      },
                    ].map((rej, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 font-sans font-bold text-slate-800">{rej.d}</td>
                        <td className="p-2 text-slate-500">{rej.v}</td>
                        <td
                          className={`p-2 font-bold ${rej.r.includes("Approved") ? "text-emerald-600" : "text-rose-600"}`}
                        >
                          {rej.r}
                        </td>
                        <td
                          className="p-2 text-xs text-slate-500 max-w-xs truncate"
                          title={rej.rsn}
                        >
                          {rej.rsn}
                        </td>
                        <td className="p-2 text-slate-700">{rej.by}</td>
                        <td className="p-2 text-slate-500">{rej.t}</td>
                        <td className="p-2 text-slate-400">{rej.dt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: LINKED ACCOUNTS */}
          {activeSubTab === "Linked Accounts" && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
              <div className="bg-amber-100 border border-amber-200 text-amber-800 p-3 rounded-lg flex items-center gap-3">
                <span>⚠️</span>
                <p className="font-medium text-xs">
                  <strong>Link Trigger Alert:</strong> 2 cross-linked profiles flagged using
                  identical hardware fingerprints and IP grouping history clusters.
                </p>
              </div>

              <div className="overflow-x-auto bg-white rounded-lg border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200 bg-slate-50">
                      <th className="p-2.5">Client ID</th>
                      <th className="p-2.5">Profile Name</th>
                      <th className="p-2.5">Overlap Signal</th>
                      <th className="p-2.5">Analytics Strength</th>
                      <th className="p-2.5">Operational Status</th>
                      <th className="p-2.5 text-right">Audit Core</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {[
                      {
                        id: "CL-00022011",
                        name: "Arjun R. (Alternate Vector)",
                        sig: "Identical Hardware Device Fingerprint Token",
                        str: "High — 91% Probability Overlap",
                        st: "Under Active Review",
                        act: "Investigate Node",
                      },
                      {
                        id: "CL-00022015",
                        name: "Rekha Raj (Affiliated Node)",
                        sig: "Shared Class-C IP Subnet Pool History",
                        str: "Medium — 62% Probability Index",
                        st: "Integrity Cleared",
                        act: "View Profile",
                      },
                    ].map((link, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-2.5 font-mono font-bold text-indigo-600">{link.id}</td>
                        <td className="p-2.5 font-semibold text-slate-800">{link.name}</td>
                        <td className="p-2.5 text-amber-700 font-mono text-[11px]">{link.sig}</td>
                        <td className="p-2.5 font-mono font-bold text-slate-800">{link.str}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${link.st.includes("Active") ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}
                          >
                            {link.st}
                          </span>
                        </td>
                        <td className="p-2.5 text-right">
                          <button className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-2.5 py-1 rounded transition-colors shadow-sm">
                            {link.act}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: DEVICE & IP HISTORY */}
          {activeSubTab === "Device & IP" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                  Hardware Fingerprints
                </span>
                <div className="space-y-2">
                  {[
                    { label: "Operating System Node", val: "Windows 11 Enterprise Architecture" },
                    { label: "Browser Agent Pipeline", val: "Chrome Desktop Engine (v124)" },
                    {
                      label: "Hardware Environment Uniqueness",
                      val: "Unique-Clean Hardware Token",
                    },
                    { label: "Linked Mobile App Core", val: "iOS Device Framework (iPhone 15 PM)" },
                    {
                      label: "Tor Network Proxy Match",
                      val: "Negative — No Footprint Found",
                      ok: true,
                    },
                    {
                      label: "Emulator Environment Layer",
                      val: "Negative — Bare-Metal Confirmed",
                      ok: true,
                    },
                  ].map((dev, i) => (
                    <div key={i} className="flex justify-between border-b border-slate-200 py-1">
                      <span className="text-slate-500 font-medium">{dev.label}</span>
                      <span
                        className={`font-mono font-bold text-right ${dev.ok ? "text-emerald-600" : "text-slate-800"}`}
                      >
                        {dev.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                  IP Access History
                </span>
                <div className="space-y-2">
                  {[
                    {
                      label: "Active IP Address Endpoint",
                      val: "103.21.48.12",
                      flag: "Stable Consistent Signature",
                    },
                    {
                      label: "Geolocation Registry Mapping",
                      val: "India (Mumbai Sub-Nodes)",
                      flag: "Aligned Target Match",
                    },
                    { label: "Telecommunications Provider", val: "Reliance Jio Infocomm Fiber" },
                    {
                      label: "Datacenter/VPN Detection",
                      val: "Negative — Residential IP Pool",
                      ok: true,
                    },
                    {
                      label: "Coordinate Geo-Leap Mismatch",
                      val: "Negative — No Fraud Vectors Found",
                      ok: true,
                    },
                    {
                      label: "Historical Log Network Pool",
                      val: "49.36.112.8 (IN), 185.142.22.1 (Atypical Cluster)",
                      alert: true,
                    },
                  ].map((ip, i) => (
                    <div key={i} className="flex flex-col border-b border-slate-200 py-1">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 font-medium">{ip.label}</span>
                        <span className="font-mono font-bold text-slate-800">{ip.val}</span>
                      </div>
                      <span
                        className={`text-[10px] mt-0.5 font-medium ${ip.alert ? "text-amber-700" : "text-slate-400"}`}
                      >
                        {ip.flag || "Verified Framework"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: RESTRICTIONS OPERATIONAL OVERRIDE */}
          {activeSubTab === "Restrictions" && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <h6 className="font-bold text-slate-800 text-sm mb-3 border-b border-slate-200 pb-2">
                Active Controls & Restrictions Matrix
              </h6>
              <div className="space-y-3">
                {[
                  {
                    res: "Outbound Withdrawals Pipeline",
                    status: "Blocked (PEP Hold Active Imposed)",
                    color: "text-rose-600",
                    desc: "Prevents outward financial balance execution routing until senior manual override codes are safe.",
                    act: "Release Escrow Hold",
                  },
                  {
                    res: "Crypto Gateway Settlements Core",
                    status: "Manual Ingestion Required",
                    color: "text-amber-700",
                    desc: "Forces automated blockchain payload logs into senior compliance operational queues.",
                    act: "Override Token",
                  },
                  {
                    res: "Inbound Deposit Routing Pipelines",
                    status: "Allowed / Unlocked",
                    color: "text-emerald-600",
                    desc: "Enables structural incoming capital processing metrics frameworks to route transactions.",
                    act: "Stop Pipeline Cap",
                  },
                  {
                    res: "Live MT5 Trading Server Core Node",
                    status: "Allowed / Unlocked",
                    color: "text-emerald-600",
                    desc: "Maintains clear connection path throughput for user algorithmic trade environments.",
                    act: "Disable Terminal",
                  },
                  {
                    res: "High-Value Balance Transfers (> $2k)",
                    status: "Restricted Boundary Triggered",
                    color: "text-rose-600",
                    desc: "Triggers secondary dual-auth cross-checks if a single internal log transfer crosses limits.",
                    act: "Modify Threshold",
                  },
                ].map((r, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-0.5 max-w-xl">
                      <span className="font-bold text-slate-800 block text-xs">{r.res}</span>
                      <span className={`font-mono text-[11px] font-bold ${r.color} block`}>
                        {r.status}
                      </span>
                      <p className="text-[11px] text-slate-500 font-sans leading-relaxed">
                        {r.desc}
                      </p>
                    </div>
                    <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-bold px-3 py-1.5 rounded-md transition-all self-start md:self-center text-center whitespace-nowrap shadow-sm">
                      {r.act}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 12: LIFECYCLE TIMELINE TIMESTAMPS */}
          {activeSubTab === "Timeline" && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block border-b border-slate-200 pb-1.5">
                Unified KYC Lifecycle History Stream
              </span>
              <div className="relative border-l-2 border-slate-200 ml-3 space-y-5 py-2">
                {[
                  {
                    time: "20 May 2026 10:00",
                    title: "Account Registration Sequence Completed",
                    text: "Customer user profile initialized via external IP gateway connection matrix safely.",
                  },
                  {
                    time: "20 May 2026 15:45",
                    title: "Identity Document Uploaded — Passport v1",
                    text: "User submitted image file dataset for passport registration validation parameters checks.",
                  },
                  {
                    time: "20 May 2026 16:00",
                    title: "Automated Rejection Sent — Passport v1",
                    text: "Flagged by checking rules: focus matrix blur index exceeded system limits benchmarks.",
                  },
                  {
                    time: "21 May 2026 09:12",
                    title: "Identity Document Resubmitted — Passport v2",
                    text: "Client initiated profile recovery documentation pipeline upload with higher scan parameters.",
                  },
                  {
                    time: "21 May 2026 09:30",
                    title: "SumSub Auto Rejection Triggered — Passport v2",
                    text: "Rejected by service validator logic: image layout frame corner bounds cropped off markers.",
                  },
                  {
                    time: "22 May 2026 13:50",
                    title: "Identity Document Final Submission — Passport v3",
                    text: "Client uploaded full frame high-fidelity resource files into the cluster secure node.",
                  },
                  {
                    time: "22 May 2026 14:12",
                    title: "Manual Approval Override Applied — Passport v3",
                    text: "Auditor 'compliance_12' processed check records. Biometric similarity score clear at 97.4%.",
                  },
                  {
                    time: "10 May 2026 05:30",
                    title: "Address Verification Document Submitted",
                    text: "Utility electricity bill ingested into database queue, locked for manual analyst review.",
                  },
                  {
                    time: "16 May 2026 10:00",
                    title: "Risk Engine Warning — Rule R-14 Triggered",
                    text: "Rapid capital deposit velocity pattern matched. Compliance Investigation Case initialized.",
                  },
                  {
                    time: "16 May 2026 10:01",
                    title: "System Operational Escrow Hold Imposed",
                    text: "Watchlist matching correlation algorithm flagged Tier 2 PEP proximity name mapping at 78%.",
                  },
                ].map((evt, i) => (
                  <div key={i} className="relative pl-6 group">
                    <div className="absolute -left-[7px] mt-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white group-hover:bg-emerald-500 transition-colors shadow-sm" />
                    <span className="font-mono text-[10px] text-slate-400 block font-bold">
                      {evt.time}
                    </span>
                    <span className="text-xs font-bold text-slate-800 block mt-0.5 group-hover:text-indigo-600 transition-colors">
                      {evt.title}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-3xl leading-relaxed">
                      {evt.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: INTERNAL NOTES */}
          {activeSubTab === "Notes" && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">
                  Internal Compliance Notes (Confidential — Hidden From Client)
                </span>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Compile and record an internal encrypted operational observation note entry..."
                    className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 flex-grow focus:outline-none focus:border-indigo-600 shadow-sm"
                  />
                  <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-sm">
                    Commit Note
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  {
                    author: "Rajan Mehta (Senior Officer)",
                    role: "AML Desk Group",
                    date: "Today 09:55",
                    note: "PEP Tier 2 matching metrics remain under active field query exploration. Core identity structural passport file logs are cleared safely, but withdrawal escrow holds stay systematically locked pending multi-source incoming economic wealth source document extraction data streams. Enhanced Due Diligence (EDD) sequence remains open.",
                  },
                  {
                    author: "compliance_12 (Auditor Analyst)",
                    role: "Identity Validation Unit",
                    date: "22 May 2026",
                    note: "Passport file cleared manually on v3 structure pipeline following user delivery of a full un-cropped high-resolution source configuration photography matrix. Face match parameters confirmed authentic at 97.4% accuracy threshold. Internal registry cross-checks returned completely clean with zero duplicate customer profiles.",
                  },
                  {
                    author: "admin_22 (Desk Officer)",
                    role: "KYC Team Unit",
                    date: "21 May 2026",
                    note: "Client made 3 sequential attempts to clear identity checks. Initial 2 configuration setups rejected auto arrays for legibility edge failures. Third attempt registered clean. Operational note: Flagging timeline sequence details for manual monitoring parameters to detect possible artifact manipulation attempts.",
                  },
                ].map((nt, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1.5 hover:border-slate-300 transition-all shadow-sm"
                  >
                    <div className="flex justify-between text-[11px] font-medium">
                      <div>
                        <span className="text-slate-800 font-bold">{nt.author}</span>
                        <span className="text-slate-400 mx-1.5">|</span>
                        <span className="text-indigo-600 font-mono text-[10px]">{nt.role}</span>
                      </div>
                      <span className="text-slate-400 font-mono">{nt.date}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed font-sans">{nt.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 14: FORENSIC EVIDENCE AUDIT LOGS */}
          {activeSubTab === "Audit Logs" && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-3">
                Forensic Compliance Audit Trail Logs
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-200 bg-white">
                      <th className="p-2">Event Action String</th>
                      <th className="p-2">Old Value</th>
                      <th className="p-2">New Value</th>
                      <th className="p-2">Admin Node</th>
                      <th className="p-2">Role Context</th>
                      <th className="p-2">Network IP</th>
                      <th className="p-2 text-right">Timestamp Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                    {[
                      {
                        act: "AML Investigation Case Initialized",
                        old: "NULL STATE",
                        new: "OPEN REGISTRY ACTIVE",
                        adm: "SYSTEM RISK REASONING",
                        role: "Automated Engine",
                        ip: "127.0.0.1 Internal",
                        time: "16 May 2026 10:00",
                      },
                      {
                        act: "Outbound Account Escrow Hold Applied",
                        old: "TRANSACTIONS_ALLOWED",
                        new: "WITHDRAWALS_BLOCKED_PEP",
                        adm: "SYSTEM OPERATIONS CORE",
                        role: "Automated Rule Engine",
                        ip: "127.0.0.1 Internal",
                        time: "16 May 2026 10:01",
                      },
                      {
                        act: "Identity Document Structure Approved",
                        old: "UNDER_REVIEW_STATE",
                        new: "VERIFIED_VALID_ASSET",
                        adm: "compliance_12 Officer",
                        role: "Senior Auditor Unit",
                        ip: "10.0.1.55 Secure VPN",
                        time: "22 May 2026 14:12",
                      },
                      {
                        act: "Identity Document Structure Rejected",
                        old: "SUBMITTED_STATE",
                        new: "REJECTED_BOUNDS_FAIL",
                        adm: "SumSub Provider Engine",
                        role: "External Service Auto",
                        ip: "Webhook Protocol Node",
                        time: "21 May 2026 09:30",
                      },
                      {
                        act: "Identity Document Structure Rejected",
                        old: "SUBMITTED_STATE",
                        new: "REJECTED_RESOLUTION_BLUR",
                        adm: "admin_22 Desk Operator",
                        role: "KYC Verification Team",
                        ip: "10.0.1.20 Intranet",
                        time: "20 May 2026 16:00",
                      },
                      {
                        act: "PEP Watchlist Proximity Adjusted",
                        old: "POSSIBLE_THREAT_FLAG",
                        new: "UNDER_INVESTIGATION",
                        adm: "Rajan Mehta Lead",
                        role: "Compliance Lead Chair",
                        ip: "10.0.1.42 Secure VPN",
                        time: "17 May 2026 09:00",
                      },
                    ].map((aud, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-2 font-sans font-bold text-slate-800">{aud.act}</td>
                        <td className="p-2 text-slate-400 font-mono text-[11px]">{aud.old}</td>
                        <td className="p-2 text-emerald-600 font-mono text-[11px] font-bold">
                          {aud.new}
                        </td>
                        <td className="p-2 text-slate-700">{aud.adm}</td>
                        <td className="p-2 text-indigo-600 font-sans">{aud.role}</td>
                        <td className="p-2 text-slate-400">{aud.ip}</td>
                        <td className="p-2 text-right text-slate-500 font-mono">{aud.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KycTab;
