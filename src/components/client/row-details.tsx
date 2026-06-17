/**
 * Row-detail section builders.
 *
 * Each builder takes the clicked row (column headers + cell values) plus
 * the page context, and returns a structured set of sections that the
 * RowDetailDrawer renders as tabs. Content matches the enterprise spec
 * PDFs (Trading, History, Copy Trading, KYC, Risk, Security, Support,
 * Activity, IB Partner, Referrals) and falls back to a generic layout
 * for anything else.
 */

export type DetailField = { label: string; value: string; tone?: "default" | "good" | "warn" | "bad" | "info" };
export type DetailTable = { title: string; columns: string[]; rows: string[][] };
export type DetailSection = {
  key: string;
  label: string;
  fields?: DetailField[];
  tables?: DetailTable[];
  notes?: string[];
};

export type DetailPayload = {
  title: string;
  subtitle: string;
  pills: { tone: "primary" | "info" | "success" | "warn" | "danger"; label: string }[];
  sections: DetailSection[];
};

const pick = (cols: string[], vals: string[], key: string) => {
  const i = cols.findIndex((c) => c.toLowerCase().includes(key.toLowerCase()));
  return i >= 0 ? vals[i] || "—" : "—";
};

const rowMap = (cols: string[], vals: string[]): DetailField[] =>
  cols.map((c, i) => ({ label: c, value: vals[i] || "—" }));

/* ------------------------ TRADING ACCOUNTS ------------------------ */
function tradingDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "MT5-100421";
  const platform = pick(cols, vals, "platform") || "MT5";
  const type = pick(cols, vals, "type");
  const status = pick(cols, vals, "status");
  return {
    title: `${id} — ${type} ${status}`,
    subtitle: `${platform} live trading account · full operations view`,
    pills: [
      { tone: "primary", label: platform },
      { tone: "info", label: type },
      { tone: status.toLowerCase().includes("active") ? "success" : "warn", label: status },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          ...rowMap(cols, vals),
          { label: "Registration Date", value: "2026-01-12" },
          { label: "Investor Password", value: "Enabled", tone: "good" },
          { label: "EA Trading", value: "Allowed", tone: "good" },
        ],
      },
      {
        key: "metrics",
        label: "Trading Metrics",
        fields: [
          { label: "Total Trades", value: "1,240" },
          { label: "Win Rate", value: "61%", tone: "good" },
          { label: "Profit Factor", value: "1.82", tone: "good" },
          { label: "Average Lot Size", value: "1.4" },
          { label: "Total Volume", value: "2,840 Lots" },
          { label: "Daily PnL", value: "+$820", tone: "good" },
          { label: "Monthly PnL", value: "+$4,220", tone: "good" },
          { label: "Largest Win", value: "+$8,200", tone: "good" },
          { label: "Largest Loss", value: "-$4,100", tone: "bad" },
        ],
      },
      {
        key: "margin",
        label: "Margin & Exposure",
        fields: [
          { label: "Balance", value: pick(cols, vals, "balance") || "$12,400" },
          { label: "Equity", value: pick(cols, vals, "equity") || "$13,020" },
          { label: "Used Margin", value: "$3,800" },
          { label: "Free Margin", value: "$9,220" },
          { label: "Margin Level", value: pick(cols, vals, "margin") || "420%", tone: "good" },
          { label: "Largest Exposure", value: "XAUUSD" },
          { label: "Net Exposure", value: "$180K" },
          { label: "Open Risk", value: "Medium", tone: "warn" },
        ],
      },
      {
        key: "positions",
        label: "Open Positions",
        tables: [
          {
            title: "Currently open",
            columns: ["Ticket", "Symbol", "Side", "Volume", "Open", "Current", "Floating P&L", "Duration"],
            rows: [
              ["892311", "XAUUSD", "Buy", "5.00", "2352.12", "2361.20", "+$4,540", "3h 12m"],
              ["892355", "EURUSD", "Sell", "2.00", "1.0842", "1.0821", "+$420", "42m"],
              ["890800", "GBPUSD", "Sell", "1.00", "1.26540", "1.26120", "+$420", "6h 30m"],
            ],
          },
        ],
      },
      {
        key: "funding",
        label: "Funding Links",
        fields: [
          { label: "Main Wallet", value: "USD Wallet → MT5-100421" },
          { label: "Bonus Wallet", value: "Promo Bonus (Expired)" },
          { label: "Copy Trading Wallet", value: "Social Trading" },
          { label: "Total Deposits", value: "$20,000", tone: "good" },
          { label: "Total Withdrawals", value: "$1,600" },
        ],
      },
      {
        key: "permissions",
        label: "Permissions",
        fields: [
          { label: "Open Trades", value: "Allowed", tone: "good" },
          { label: "Close Trades", value: "Allowed", tone: "good" },
          { label: "Hedging", value: "Allowed", tone: "good" },
          { label: "EA Trading", value: "Enabled", tone: "good" },
          { label: "Copy Trading", value: "Enabled", tone: "good" },
          { label: "Withdrawals", value: "Allowed", tone: "good" },
        ],
      },
      {
        key: "restrictions",
        label: "Restrictions",
        fields: [
          { label: "Trading Disabled", value: "No", tone: "good" },
          { label: "Withdrawals Locked", value: "No", tone: "good" },
          { label: "Deposits Blocked", value: "No", tone: "good" },
          { label: "Risk Review Hold", value: "No", tone: "good" },
          { label: "AML Hold", value: "No", tone: "good" },
        ],
      },
      {
        key: "platform",
        label: "Platform Access",
        fields: [
          { label: "MT5 Desktop", value: "Enabled", tone: "good" },
          { label: "WebTrader", value: "Enabled", tone: "good" },
          { label: "Mobile App", value: "Enabled", tone: "good" },
          { label: "API Access", value: "Disabled", tone: "warn" },
          { label: "Investor Password", value: "Active", tone: "good" },
        ],
      },
      {
        key: "copy",
        label: "Copy Trading",
        fields: [
          { label: "Active", value: "No" },
          { label: "Role", value: "—" },
          { label: "Master Account", value: "—" },
          { label: "Allocation", value: "—" },
          { label: "Profit Share", value: "—" },
        ],
      },
      {
        key: "risk",
        label: "Risk Alerts",
        tables: [
          {
            title: "Recent alerts",
            columns: ["Alert", "Severity", "Time"],
            rows: [
              ["High Leverage Usage", "Medium", "09:12"],
              ["Margin Level Below 120%", "High", "10:22"],
              ["Toxic Scalping Detected", "Medium", "11:08"],
              ["Abnormal Lot Size", "High", "Yesterday"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Recent activity",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Account opened", "System", "2026-01-12"],
              ["First deposit", "Client", "2026-01-13"],
              ["Leverage changed 1:200 → 1:500", "Priya Nair", "09:12"],
              ["EA enabled", "Client", "Yesterday"],
            ],
          },
        ],
      },
      {
        key: "audit",
        label: "Audit Logs",
        tables: [
          {
            title: "Admin actions",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Leverage Changed", "Priya Nair", "09:12"],
              ["Trading Disabled", "System", "10:22"],
              ["Group Changed", "Rahul Shah", "11:08"],
            ],
          },
        ],
      },
    ],
  };
}

/* ---------------------------- HISTORY ---------------------------- */
function historyDetail(cols: string[], vals: string[]): DetailPayload {
  const ticket = vals[0] || "#892311";
  const symbol = pick(cols, vals, "symbol") || "XAUUSD";
  const side = pick(cols, vals, "side") || pick(cols, vals, "type") || "Buy";
  return {
    title: `Trade ${ticket} — ${symbol} ${side}`,
    subtitle: "Full trade lifecycle, execution quality and P&L breakdown",
    pills: [
      { tone: "primary", label: symbol },
      { tone: side.toLowerCase().includes("buy") ? "success" : "danger", label: side },
      { tone: "info", label: "Closed" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "execution",
        label: "Execution",
        fields: [
          { label: "Open Time", value: "2026-06-12 09:12:04" },
          { label: "Close Time", value: "2026-06-12 12:24:10" },
          { label: "Open Price", value: "2352.12" },
          { label: "Close Price", value: "2361.20" },
          { label: "Volume", value: "5.00 lots" },
          { label: "Slippage", value: "0.2 pips", tone: "good" },
          { label: "Spread Cost", value: "$24.50" },
          { label: "Commission", value: "$35.00" },
          { label: "Swap", value: "-$2.80" },
        ],
      },
      {
        key: "pnl",
        label: "P&L Breakdown",
        fields: [
          { label: "Gross P&L", value: "+$4,540", tone: "good" },
          { label: "Net P&L", value: "+$4,477.70", tone: "good" },
          { label: "Pips", value: "+90.8" },
          { label: "Return %", value: "+3.62%", tone: "good" },
        ],
      },
      {
        key: "risk",
        label: "Risk Tags",
        fields: [
          { label: "Stop Loss", value: "2345.00" },
          { label: "Take Profit", value: "2365.00" },
          { label: "Risk:Reward", value: "1:2.8", tone: "good" },
          { label: "Scalping Flag", value: "No", tone: "good" },
          { label: "Hedge Flag", value: "No", tone: "good" },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Lifecycle events",
            columns: ["Event", "Source", "Time"],
            rows: [
              ["Order placed", "MT5 Desktop", "09:12:04"],
              ["Order filled", "LP-Equinix-LD4", "09:12:04"],
              ["Modified S/L", "MT5 Mobile", "10:05:21"],
              ["Closed by client", "MT5 Desktop", "12:24:10"],
            ],
          },
        ],
      },
    ],
  };
}

/* -------------------------- COPY TRADING -------------------------- */
function copyDetail(cols: string[], vals: string[]): DetailPayload {
  const name = vals[0] || "PRO-8821";
  return {
    title: `${name} — Copy trading link`,
    subtitle: "Provider/follower relationship, allocation and performance",
    pills: [
      { tone: "primary", label: "Copy Trading" },
      { tone: "info", label: "Live" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "relation",
        label: "Provider / Follower",
        fields: [
          { label: "Role", value: "Follower" },
          { label: "Master Account", value: "PRO-8821" },
          { label: "Allocation", value: "40%" },
          { label: "Profit Share", value: "20%" },
          { label: "Subscription Fee", value: "$15 / month" },
          { label: "Subscribed Since", value: "2026-03-04" },
        ],
      },
      {
        key: "performance",
        label: "Performance",
        fields: [
          { label: "Total Copied Trades", value: "412" },
          { label: "Win Rate", value: "58%", tone: "good" },
          { label: "Total P&L", value: "+$3,820", tone: "good" },
          { label: "Max Drawdown", value: "-12%", tone: "warn" },
          { label: "Sharpe Ratio", value: "1.42", tone: "good" },
        ],
      },
      {
        key: "limits",
        label: "Limits & Risk",
        fields: [
          { label: "Max Lot per Trade", value: "2.0" },
          { label: "Stop on Loss", value: "20%" },
          { label: "Copy Mode", value: "Proportional" },
          { label: "Symbols Filter", value: "Majors + Gold" },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Subscription events",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Subscribed", "Client", "2026-03-04"],
              ["Allocation changed 30%→40%", "Client", "2026-04-12"],
              ["Paused 24h", "Risk", "Yesterday"],
              ["Resumed", "Client", "Today"],
            ],
          },
        ],
      },
    ],
  };
}

/* ----------------------------- KYC ----------------------------- */
function kycDetail(cols: string[], vals: string[]): DetailPayload {
  const docName = vals[0] || "Passport";
  const status = pick(cols, vals, "status") || "Approved";
  return {
    title: `${docName} — KYC document`,
    subtitle: "Verification status, AML screening and document trail",
    pills: [
      { tone: "primary", label: "KYC" },
      { tone: status.toLowerCase().includes("approved") ? "success" : "warn", label: status },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "document",
        label: "Document",
        fields: [
          { label: "Type", value: docName },
          { label: "Issuing Country", value: "United Arab Emirates" },
          { label: "Document Number", value: "P-AE-887421" },
          { label: "Issue Date", value: "2022-04-12" },
          { label: "Expiry", value: "2032-04-11" },
          { label: "Uploaded", value: "2026-01-14" },
          { label: "Verified By", value: "Compliance · Priya Nair" },
        ],
      },
      {
        key: "aml",
        label: "AML / Sanctions",
        fields: [
          { label: "PEP Check", value: "Clear", tone: "good" },
          { label: "Sanctions", value: "Clear", tone: "good" },
          { label: "Adverse Media", value: "None", tone: "good" },
          { label: "Risk Score", value: "Low", tone: "good" },
          { label: "Last Screened", value: "Today 09:14" },
        ],
      },
      {
        key: "address",
        label: "Address Proof",
        fields: [
          { label: "Type", value: "Utility Bill" },
          { label: "Issued", value: "2026-05-01" },
          { label: "Status", value: "Approved", tone: "good" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Document lifecycle",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Uploaded", "Client", "2026-01-14"],
              ["OCR completed", "System", "2026-01-14"],
              ["Manually reviewed", "Priya Nair", "2026-01-15"],
              ["Approved", "Priya Nair", "2026-01-15"],
            ],
          },
        ],
      },
    ],
  };
}

/* ----------------------------- RISK ----------------------------- */
function riskDetail(cols: string[], vals: string[]): DetailPayload {
  const alert = vals[0] || "Margin Level Below 120%";
  const sev = pick(cols, vals, "sever") || "High";
  return {
    title: `${alert}`,
    subtitle: "Risk alert detail, exposure context and resolution",
    pills: [
      { tone: "primary", label: "Risk" },
      { tone: sev.toLowerCase().includes("high") ? "danger" : "warn", label: sev },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "exposure",
        label: "Exposure Snapshot",
        fields: [
          { label: "Account", value: "MT5-100421" },
          { label: "Symbol", value: "XAUUSD" },
          { label: "Net Position", value: "+12.5 lots Buy" },
          { label: "Notional", value: "$294,000" },
          { label: "Margin Used", value: "$58,800" },
          { label: "Margin Level", value: "112%", tone: "bad" },
          { label: "VaR (1d, 95%)", value: "$8,420", tone: "warn" },
        ],
      },
      {
        key: "trigger",
        label: "Trigger Rule",
        fields: [
          { label: "Rule", value: "Margin Level < 120%" },
          { label: "Threshold", value: "120%" },
          { label: "Observed", value: "112%" },
          { label: "Triggered At", value: "10:22:14" },
          { label: "Auto-Action", value: "Notify dealing desk" },
        ],
      },
      {
        key: "resolution",
        label: "Resolution",
        fields: [
          { label: "Assigned To", value: "Dealing Desk · Rahul Shah" },
          { label: "Status", value: "Investigating", tone: "warn" },
          { label: "SLA", value: "15 min" },
          { label: "Notes", value: "Client topping up via card; await confirmation." },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Events",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Alert raised", "System", "10:22"],
              ["Acknowledged", "Rahul Shah", "10:23"],
              ["Client called", "Support", "10:25"],
            ],
          },
        ],
      },
    ],
  };
}

/* --------------------------- SECURITY --------------------------- */
function securityDetail(cols: string[], vals: string[]): DetailPayload {
  const session = vals[0] || "sess_8821";
  return {
    title: `Session ${session}`,
    subtitle: "Device, geo, auth and revocation controls",
    pills: [
      { tone: "primary", label: "Security" },
      { tone: "info", label: "Active" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "device",
        label: "Device",
        fields: [
          { label: "Device", value: "iPhone 15 Pro" },
          { label: "OS", value: "iOS 19.2" },
          { label: "Browser / App", value: "Atlas Mobile 4.8.1" },
          { label: "IP", value: "94.207.12.55" },
          { label: "Geo", value: "Dubai, UAE" },
          { label: "ISP", value: "Etisalat" },
        ],
      },
      {
        key: "auth",
        label: "Auth & MFA",
        fields: [
          { label: "Method", value: "Password + TOTP", tone: "good" },
          { label: "MFA Type", value: "Authenticator App" },
          { label: "Last Login", value: "Today 09:12" },
          { label: "Risk Score", value: "Low", tone: "good" },
        ],
      },
      {
        key: "events",
        label: "Recent Events",
        tables: [
          {
            title: "Auth events",
            columns: ["Event", "Result", "Time"],
            rows: [
              ["Login attempt", "Success", "09:12"],
              ["Password change", "Success", "Yesterday"],
              ["MFA challenge", "Success", "Today 09:12"],
              ["Withdrawal 2FA", "Success", "10:40"],
            ],
          },
        ],
      },
      {
        key: "actions",
        label: "Admin Actions",
        fields: [
          { label: "Revoke Session", value: "Available" },
          { label: "Force Logout All", value: "Available" },
          { label: "Reset MFA", value: "Requires approval" },
        ],
      },
    ],
  };
}

/* --------------------------- SUPPORT --------------------------- */
function supportDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "TCK-44821";
  const status = pick(cols, vals, "status") || "Open";
  return {
    title: `${id} — Support ticket`,
    subtitle: "Conversation, SLA, attachments and resolution",
    pills: [
      { tone: "primary", label: "Support" },
      { tone: status.toLowerCase().includes("open") ? "warn" : "success", label: status },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "details",
        label: "Ticket",
        fields: [
          { label: "Subject", value: pick(cols, vals, "subject") || "Withdrawal pending > 24h" },
          { label: "Category", value: "Payments" },
          { label: "Priority", value: "High", tone: "warn" },
          { label: "Channel", value: "Web Chat" },
          { label: "Opened", value: "Yesterday 14:22" },
          { label: "Assigned To", value: "Support · Aisha" },
          { label: "SLA Remaining", value: "1h 12m", tone: "warn" },
        ],
      },
      {
        key: "conversation",
        label: "Conversation",
        tables: [
          {
            title: "Last messages",
            columns: ["From", "Message", "Time"],
            rows: [
              ["Client", "My withdrawal hasn't arrived.", "14:22"],
              ["Aisha", "Checking with treasury, one moment.", "14:25"],
              ["Treasury", "Sent via SWIFT, ETA 24h.", "15:10"],
              ["Aisha", "Shared SWIFT reference with client.", "15:12"],
            ],
          },
        ],
      },
      {
        key: "linked",
        label: "Linked Records",
        fields: [
          { label: "Withdrawal", value: "WD-9921 · $4,500" },
          { label: "Account", value: "MT5-100421" },
          { label: "Wallet", value: "USD Wallet" },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Lifecycle",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Ticket opened", "Client", "Yesterday 14:22"],
              ["Assigned", "Router", "14:22"],
              ["Escalated to Treasury", "Aisha", "14:30"],
              ["Awaiting client", "Aisha", "15:12"],
            ],
          },
        ],
      },
    ],
  };
}

/* --------------------------- ACTIVITY --------------------------- */
function activityDetail(cols: string[], vals: string[]): DetailPayload {
  const ev = vals[0] || "Login";
  return {
    title: `${ev} — Activity event`,
    subtitle: "Actor, context, device and downstream effects",
    pills: [
      { tone: "primary", label: "Activity" },
      { tone: "info", label: "Logged" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "actor",
        label: "Actor",
        fields: [
          { label: "User", value: "Client · Hassan A." },
          { label: "Role", value: "Client" },
          { label: "IP", value: "94.207.12.55" },
          { label: "Device", value: "iPhone 15 Pro · Atlas Mobile" },
          { label: "Geo", value: "Dubai, UAE" },
        ],
      },
      {
        key: "context",
        label: "Context",
        fields: [
          { label: "Resource", value: "Account MT5-100421" },
          { label: "Module", value: "Trading" },
          { label: "Outcome", value: "Success", tone: "good" },
          { label: "Latency", value: "182 ms" },
        ],
      },
      {
        key: "effects",
        label: "Downstream Effects",
        tables: [
          {
            title: "Linked events",
            columns: ["Event", "Module", "Time"],
            rows: [
              ["Session created", "Auth", "09:12:04"],
              ["Token issued", "Auth", "09:12:04"],
              ["Quote stream opened", "MT5", "09:12:06"],
            ],
          },
        ],
      },
    ],
  };
}

/* --------------------------- IB PARTNER --------------------------- */
function ibDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "IB-1029";
  return {
    title: `${id} — IB partner`,
    subtitle: "Hierarchy, commercials, payouts and compliance",
    pills: [
      { tone: "primary", label: "IB Partner" },
      { tone: "success", label: "Active" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "structure",
        label: "Structure",
        fields: [
          { label: "Parent IB", value: "IB-0042 — Apex Capital" },
          { label: "Tier", value: "Master IB" },
          { label: "Sub-IBs", value: "14" },
          { label: "Active Clients", value: "284" },
          { label: "Country", value: "UAE" },
        ],
      },
      {
        key: "commercials",
        label: "Commercials",
        fields: [
          { label: "Plan", value: "Hybrid (Rebate + CPA)" },
          { label: "Rebate / Lot", value: "$5.50" },
          { label: "CPA", value: "$300 per FTD" },
          { label: "Currency", value: "USD" },
          { label: "Payment Cycle", value: "Monthly" },
        ],
      },
      {
        key: "payouts",
        label: "Payouts",
        tables: [
          {
            title: "Recent payouts",
            columns: ["Period", "Lots", "Rebate", "CPA", "Total", "Status"],
            rows: [
              ["May 2026", "1,820", "$10,010", "$3,000", "$13,010", "Paid"],
              ["Apr 2026", "1,640", "$9,020", "$2,400", "$11,420", "Paid"],
              ["Mar 2026", "1,540", "$8,470", "$1,800", "$10,270", "Paid"],
            ],
          },
        ],
      },
      {
        key: "compliance",
        label: "Compliance",
        fields: [
          { label: "Agreement Signed", value: "2025-09-01" },
          { label: "KYB Status", value: "Approved", tone: "good" },
          { label: "Sanctions", value: "Clear", tone: "good" },
          { label: "Marketing Approval", value: "Granted", tone: "good" },
        ],
      },
    ],
  };
}

/* --------------------------- REFERRALS --------------------------- */
function referralDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "CL-88421";
  return {
    title: `${id} — Referred client`,
    subtitle: "Funnel stage, lifetime value and attribution",
    pills: [
      { tone: "primary", label: "Referral" },
      { tone: "info", label: pick(cols, vals, "status") || "Funded" },
    ],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(cols, vals) },
      {
        key: "funnel",
        label: "Funnel",
        fields: [
          { label: "Registered", value: "2026-02-04" },
          { label: "KYC Approved", value: "2026-02-05", tone: "good" },
          { label: "First Deposit", value: "2026-02-06 · $1,000" },
          { label: "First Trade", value: "2026-02-06" },
          { label: "Status", value: "Active", tone: "good" },
        ],
      },
      {
        key: "ltv",
        label: "Lifetime Value",
        fields: [
          { label: "Total Deposits", value: "$18,400" },
          { label: "Total Withdrawals", value: "$4,200" },
          { label: "Net Funded", value: "$14,200", tone: "good" },
          { label: "Lots Traded", value: "284" },
          { label: "Rebate Generated", value: "$1,562", tone: "good" },
          { label: "CPA Paid", value: "$300" },
        ],
      },
      {
        key: "attribution",
        label: "Attribution",
        fields: [
          { label: "Source", value: "Telegram channel" },
          { label: "Campaign", value: "WC2026-Promo" },
          { label: "Landing", value: "/promo/world-cup" },
          { label: "UTM", value: "tg/wc26/banner-3" },
          { label: "Referring IB", value: "IB-1029" },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Lifecycle",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Registered", "Client", "2026-02-04"],
              ["KYC submitted", "Client", "2026-02-04"],
              ["KYC approved", "Compliance", "2026-02-05"],
              ["First deposit", "Client", "2026-02-06"],
            ],
          },
        ],
      },
    ],
  };
}

/* --------------------------- DISPATCHER --------------------------- */
export function buildDetail(
  context: string,
  columns: string[],
  values: string[],
): DetailPayload {
  const ctx = context.toLowerCase();
  if (ctx.includes("trading") && !ctx.includes("copy")) return tradingDetail(columns, values);
  if (ctx.includes("history")) return historyDetail(columns, values);
  if (ctx.includes("copy")) return copyDetail(columns, values);
  if (ctx.includes("kyc")) return kycDetail(columns, values);
  if (ctx.includes("risk")) return riskDetail(columns, values);
  if (ctx.includes("security")) return securityDetail(columns, values);
  if (ctx.includes("support")) return supportDetail(columns, values);
  if (ctx.includes("activity")) return activityDetail(columns, values);
  if (ctx.includes("ib")) return ibDetail(columns, values);
  if (ctx.includes("referral")) return referralDetail(columns, values);

  // Generic fallback — split row data into Overview + Notes
  return {
    title: values[0] || "Record",
    subtitle: `${context} record · full detail`,
    pills: [{ tone: "primary", label: context }],
    sections: [
      { key: "overview", label: "Overview", fields: rowMap(columns, values) },
      {
        key: "notes",
        label: "Notes",
        notes: [
          "No structured detail spec for this context — showing all row fields.",
          "Open the linked record for the full audit trail.",
        ],
      },
    ],
  };
}
