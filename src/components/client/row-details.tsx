/**
 * Row-detail section builders.
 *
 * Each builder takes the clicked row (column headers + cell values) plus the
 * page context and returns a structured set of sections that the drawer
 * renders as tabs. The structure follows the enterprise spec PDFs for every
 * tab (Trading Accounts, Trade History, Copy Trading, KYC, Risk, Security,
 * Support, Activity, IB Partner, Referrals).
 *
 * Design rules:
 *  - The Overview tab NEVER just echoes the table row (that was static / a
 *    duplicate of what the user already sees). Instead it shows curated
 *    identity, status and quick-action fields specific to the record.
 *  - Every spec section from the PDFs is represented as its own tab.
 *  - Tables are used wherever the spec calls for lists (positions, audit,
 *    payouts, conversation, lifecycle, etc.).
 */

export type DetailField = {
  label: string;
  value: string;
  tone?: "default" | "good" | "warning" | "bad" | "info";
};
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
  pills: {
    tone: "primary" | "info" | "success" | "warning" | "destructive";
    label: string;
  }[];
  sections: DetailSection[];
};

const pick = (cols: string[], vals: string[], key: string) => {
  const i = cols.findIndex((c) => c.toLowerCase().includes(key.toLowerCase()));
  return i >= 0 ? vals[i] || "—" : "—";
};

/* ============================================================== */
/*                      TRADING ACCOUNTS                          */
/* ============================================================== */
function tradingDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "MT5-100421";
  const platform = pick(cols, vals, "platform");
  const type = pick(cols, vals, "type");
  const status = pick(cols, vals, "status");
  return {
    title: `${id} — ${type !== "—" ? type : "Live"} ${status !== "—" ? status : ""}`,
    subtitle: `${platform !== "—" ? platform : "MT5"} trading account · full operations view`,
    pills: [
      { tone: "primary", label: platform !== "—" ? platform : "MT5" },
      { tone: "info", label: type !== "—" ? type : "Standard" },
      {
        tone: status.toLowerCase().includes("active") ? "success" : "warning",
        label: status !== "—" ? status : "Active",
      },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Account ID", value: id },
          { label: "Platform", value: platform !== "—" ? platform : "MT5" },
          { label: "Account Type", value: type !== "—" ? type : "Standard ECN" },
          { label: "Currency", value: "USD" },
          { label: "Leverage", value: "1:500" },
          { label: "Registration", value: "2026-01-12" },
          { label: "Last Login", value: "Today 09:12" },
          { label: "Server", value: "Atlas-Live-01" },
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
          { label: "Balance", value: pick(cols, vals, "balance") !== "—" ? pick(cols, vals, "balance") : "$12,400" },
          { label: "Equity", value: pick(cols, vals, "equity") !== "—" ? pick(cols, vals, "equity") : "$13,020" },
          { label: "Used Margin", value: "$3,800" },
          { label: "Free Margin", value: "$9,220" },
          { label: "Margin Level", value: pick(cols, vals, "margin") !== "—" ? pick(cols, vals, "margin") : "420%", tone: "good" },
          { label: "Largest Exposure", value: "XAUUSD" },
          { label: "Net Exposure", value: "$180K" },
          { label: "Open Risk", value: "Medium", tone: "warning" },
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
          { label: "API Access", value: "Disabled", tone: "warning" },
          { label: "Investor Password", value: "Active", tone: "good" },
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
        label: "Audit Trail",
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

/* ============================================================== */
/*                        TRADE HISTORY                           */
/* ============================================================== */
function historyDetail(cols: string[], vals: string[]): DetailPayload {
  const ticket = vals[0] || "#892311";
  const symbol = pick(cols, vals, "symbol") !== "—" ? pick(cols, vals, "symbol") : "XAUUSD";
  const side = pick(cols, vals, "side") !== "—" ? pick(cols, vals, "side") : pick(cols, vals, "type") !== "—" ? pick(cols, vals, "type") : "Buy";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Open";
  return {
    title: `${ticket} — ${symbol} ${side} ${status}`,
    subtitle: "Full trade lifecycle, execution quality, P&L breakdown and compliance",
    pills: [
      { tone: "primary", label: symbol },
      { tone: side.toLowerCase().includes("buy") ? "success" : "destructive", label: side },
      { tone: status.toLowerCase().includes("open") ? "info" : "success", label: status },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Ticket", value: ticket },
          { label: "Account", value: "MT5-10293" },
          { label: "Platform", value: "MT5" },
          { label: "Symbol", value: symbol },
          { label: "Side", value: side },
          { label: "Volume", value: "5.00 lots" },
          { label: "Trade Type", value: "Manual" },
          { label: "Status", value: status },
          { label: "Open Time", value: "Today 09:12" },
          { label: "Duration", value: "3h 12m" },
        ],
      },
      {
        key: "execution",
        label: "Execution",
        fields: [
          { label: "Execution Type", value: "Market" },
          { label: "Execution Speed", value: "42 ms", tone: "good" },
          { label: "Slippage", value: "0.2 pips", tone: "good" },
          { label: "Open Price", value: "2352.12" },
          { label: "Current / Close", value: "2361.20" },
          { label: "Liquidity Pool", value: "LP-Equinix-LD4" },
          { label: "Spread Cost", value: "$24.50" },
          { label: "Commission", value: "$35.00" },
          { label: "Swap", value: "-$2.80" },
        ],
      },
      {
        key: "position",
        label: "Position",
        fields: [
          { label: "Net Exposure", value: "$294,000" },
          { label: "Contract Size", value: "100 oz" },
          { label: "Pip Value", value: "$50" },
          { label: "Margin Used", value: "$5,880" },
          { label: "Required Margin", value: "$5,880" },
          { label: "Margin Currency", value: "USD" },
        ],
      },
      {
        key: "sltp",
        label: "SL / TP History",
        tables: [
          {
            title: "Modifications",
            columns: ["Time", "Field", "From", "To", "By"],
            rows: [
              ["09:12:04", "Stop Loss", "—", "2345.00", "Client"],
              ["09:12:04", "Take Profit", "—", "2365.00", "Client"],
              ["10:05:21", "Take Profit", "2365.00", "2375.00", "MT5 Mobile"],
            ],
          },
        ],
      },
      {
        key: "pnl",
        label: "P&L & Fees",
        fields: [
          { label: "Gross P&L", value: "+$4,540", tone: "good" },
          { label: "Net P&L", value: "+$4,477.70", tone: "good" },
          { label: "Pips", value: "+90.8" },
          { label: "Return %", value: "+3.62%", tone: "good" },
          { label: "Spread Cost", value: "$24.50" },
          { label: "Commission", value: "$35.00" },
          { label: "Swap", value: "-$2.80" },
        ],
      },
      {
        key: "margin-impact",
        label: "Margin Impact",
        fields: [
          { label: "Pre-Trade Margin", value: "$3,800" },
          { label: "Post-Trade Margin", value: "$9,680" },
          { label: "Margin Level Before", value: "420%", tone: "good" },
          { label: "Margin Level After", value: "212%", tone: "warning" },
          { label: "Free Margin Impact", value: "-$5,880" },
        ],
      },
      {
        key: "source",
        label: "Trade Source",
        fields: [
          { label: "Origin", value: "MT5 Desktop" },
          { label: "Device", value: "Windows 11 · build 4.8.2" },
          { label: "IP", value: "94.207.12.55" },
          { label: "Geo", value: "Dubai, UAE" },
          { label: "Session", value: "sess_8821" },
        ],
      },
      {
        key: "ea",
        label: "EA / Bot",
        notes: ["This trade was not placed by an EA / bot."],
      },
      {
        key: "copy",
        label: "Copy Details",
        notes: ["Trade is not part of a copy trading relationship."],
      },
      {
        key: "risk-analysis",
        label: "Risk Analysis",
        fields: [
          { label: "Risk:Reward", value: "1:2.8", tone: "good" },
          { label: "Scalping Flag", value: "No", tone: "good" },
          { label: "Hedge Flag", value: "No", tone: "good" },
          { label: "Abnormal Volume Flag", value: "Yes", tone: "warning" },
          { label: "Excessive Leverage", value: "Medium", tone: "warning" },
        ],
      },
      {
        key: "compliance",
        label: "Compliance",
        fields: [
          { label: "AML Flag", value: "None", tone: "good" },
          { label: "Sanctions Check", value: "Passed", tone: "good" },
          { label: "News Trading", value: "Allowed" },
          { label: "Restricted Symbol", value: "No", tone: "good" },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Lifecycle events",
            columns: ["Event", "Source", "Time"],
            rows: [
              ["Order placed", "MT5 Desktop", "09:12:04"],
              ["Order filled", "LP-Equinix-LD4", "09:12:04"],
              ["Modified S/L", "MT5 Mobile", "10:05:21"],
              ["TP updated", "MT5 Mobile", "10:05:21"],
            ],
          },
        ],
      },
      {
        key: "related",
        label: "Related Orders",
        tables: [
          {
            title: "Same symbol / account",
            columns: ["Ticket", "Symbol", "Side", "Volume", "Status"],
            rows: [
              ["892355", "XAUUSD", "Buy", "2.00", "Open"],
              ["892120", "XAUUSD", "Sell", "1.00", "Closed"],
            ],
          },
        ],
      },
      {
        key: "logs",
        label: "Documents & Logs",
        fields: [
          { label: "Server Log", value: "MT5-LIVE-01 · trace_8821" },
          { label: "Dealer Notes", value: "News event, manual entry" },
          { label: "API Log", value: "—" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Modifications",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Trade opened", "Client", "09:12:04"],
              ["SL modified", "MT5 Mobile", "10:05:21"],
              ["Flag added: Abnormal Volume", "Risk", "10:30"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                        COPY TRADING                            */
/* ============================================================== */
function copyDetail(cols: string[], vals: string[]): DetailPayload {
  const name = vals[0] || "CT-8821";
  return {
    title: `${name} — Copy trading link`,
    subtitle: "Provider / follower relationship, allocation, execution and profit share",
    pills: [
      { tone: "primary", label: "Copy Trading" },
      { tone: "info", label: "Live" },
    ],
    sections: [
      {
        key: "overview",
        label: "Copy Overview",
        fields: [
          { label: "Relationship ID", value: name },
          { label: "Symbol", value: "XAUUSD" },
          { label: "Side", value: "Buy" },
          { label: "Status", value: "Active", tone: "good" },
          { label: "Started", value: "2026-03-04" },
          { label: "Mode", value: "Proportional" },
        ],
      },
      {
        key: "provider",
        label: "Provider",
        fields: [
          { label: "Provider Account", value: "MT5-10293" },
          { label: "Strategy", value: "Gold Scalper" },
          { label: "Followers", value: "842" },
          { label: "AUM", value: "$1.2M" },
          { label: "Monthly ROI", value: "+18%", tone: "good" },
          { label: "Drawdown", value: "-12%", tone: "warning" },
        ],
      },
      {
        key: "follower",
        label: "Follower",
        fields: [
          { label: "Follower Account", value: "MT5-88291" },
          { label: "Equity", value: "$24,800" },
          { label: "Allocation Type", value: "Percentage" },
          { label: "Allocation Value", value: "40%" },
          { label: "Copy Ratio", value: "0.4x" },
          { label: "Current PnL", value: "+$820", tone: "good" },
        ],
      },
      {
        key: "allocation",
        label: "Allocation",
        fields: [
          { label: "Mode", value: "Percentage" },
          { label: "Value", value: "40% of equity" },
          { label: "Max Lot per Trade", value: "2.0" },
          { label: "Symbols Filter", value: "Majors + Gold" },
          { label: "Max Drawdown", value: "20%" },
          { label: "Equity Protection", value: "Auto-stop at -20%", tone: "warning" },
        ],
      },
      {
        key: "execution",
        label: "Execution",
        fields: [
          { label: "Avg Copy Delay", value: "12 ms", tone: "good" },
          { label: "Slippage", value: "0.3 pips" },
          { label: "Execution Server", value: "Atlas-Copy-01" },
          { label: "Fill Rate", value: "99.4%", tone: "good" },
        ],
      },
      {
        key: "profit-share",
        label: "Profit Sharing",
        fields: [
          { label: "Provider Fee", value: "20%" },
          { label: "Subscription Fee", value: "$15 / month" },
          { label: "Provider Earnings", value: "$84 (if closed now)" },
          { label: "Follower Net Profit", value: "+$336 after fee", tone: "good" },
          { label: "Total Earned (Lifetime)", value: "$2,460", tone: "good" },
          { label: "Pending Earnings", value: "$420" },
        ],
      },
      {
        key: "performance",
        label: "Performance",
        fields: [
          { label: "Total Copied Trades", value: "412" },
          { label: "Win Rate", value: "58%", tone: "good" },
          { label: "Total P&L", value: "+$3,820", tone: "good" },
          { label: "Max Drawdown", value: "-12%", tone: "warning" },
          { label: "Sharpe Ratio", value: "1.42", tone: "good" },
        ],
      },
      {
        key: "risk",
        label: "Risk Checks",
        fields: [
          { label: "Equity Protection Triggered", value: "No", tone: "good" },
          { label: "Drawdown Alert", value: "14%", tone: "warning" },
          { label: "Symbol Risk", value: "Medium", tone: "warning" },
          { label: "Toxic Strategy Flag", value: "Clean", tone: "good" },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Subscription events",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Subscribed", "Client", "2026-03-04"],
              ["Allocation 30% → 40%", "Client", "2026-04-12"],
              ["Drawdown alert raised", "System", "Today 09:18"],
              ["Resumed", "Client", "Today"],
            ],
          },
        ],
      },
      {
        key: "audit",
        label: "Audit",
        tables: [
          {
            title: "Lifecycle",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Strategy Paused", "Risk Team", "09:12"],
              ["Allocation Updated", "Priya Nair", "10:08"],
              ["Provider Suspended", "Compliance", "11:22"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                              KYC                               */
/* ============================================================== */
function kycDetail(cols: string[], vals: string[]): DetailPayload {
  const docName = vals[0] || "Passport";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Approved";
  return {
    title: `${docName} — KYC document`,
    subtitle: "Verification status, AML screening, address proof and document trail",
    pills: [
      { tone: "primary", label: "KYC" },
      {
        tone: status.toLowerCase().includes("approved") ? "success" : "warning",
        label: status,
      },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Document", value: docName },
          { label: "Status", value: status, tone: "good" },
          { label: "Risk Score", value: "Low", tone: "good" },
          { label: "Reviewer", value: "Priya Nair" },
          { label: "Submitted", value: "2026-01-14" },
          { label: "Approved", value: "2026-01-15" },
        ],
      },
      {
        key: "document",
        label: "Document",
        fields: [
          { label: "Type", value: docName },
          { label: "Issuing Country", value: "United Arab Emirates" },
          { label: "Document Number", value: "P-AE-887421" },
          { label: "Issue Date", value: "2022-04-12" },
          { label: "Expiry", value: "2032-04-11" },
          { label: "OCR Confidence", value: "98.4%", tone: "good" },
          { label: "Face Match", value: "Verified", tone: "good" },
          { label: "Liveness", value: "Passed", tone: "good" },
        ],
      },
      {
        key: "personal",
        label: "Personal",
        fields: [
          { label: "Full Name", value: "Hassan A. Al-Mansouri" },
          { label: "DOB", value: "1989-03-22" },
          { label: "Nationality", value: "UAE" },
          { label: "Gender", value: "Male" },
          { label: "Tax ID", value: "AE-TX-44820" },
        ],
      },
      {
        key: "address",
        label: "Address Proof",
        fields: [
          { label: "Type", value: "Utility Bill" },
          { label: "Issued", value: "2026-05-01" },
          { label: "City", value: "Dubai" },
          { label: "Country", value: "UAE" },
          { label: "Status", value: "Approved", tone: "good" },
        ],
      },
      {
        key: "aml",
        label: "AML / Sanctions",
        fields: [
          { label: "PEP Check", value: "Clear", tone: "good" },
          { label: "Sanctions", value: "Clear", tone: "good" },
          { label: "Adverse Media", value: "None", tone: "good" },
          { label: "Watchlist Match", value: "None", tone: "good" },
          { label: "Risk Score", value: "Low (12)", tone: "good" },
          { label: "Last Screened", value: "Today 09:14" },
        ],
      },
      {
        key: "source",
        label: "Source of Funds",
        fields: [
          { label: "Declared Source", value: "Salary + Investments" },
          { label: "Employer", value: "Emirates NBD" },
          { label: "Annual Income", value: "$120,000" },
          { label: "Wealth Source", value: "Family business" },
          { label: "Verified", value: "Yes", tone: "good" },
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
              ["AML screening", "System", "2026-01-14"],
              ["Manually reviewed", "Priya Nair", "2026-01-15"],
              ["Approved", "Priya Nair", "2026-01-15"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                             RISK                               */
/* ============================================================== */
function riskDetail(cols: string[], vals: string[]): DetailPayload {
  const alert = vals[0] || "Margin Level Below 120%";
  const sev = pick(cols, vals, "sever") !== "—" ? pick(cols, vals, "sever") : "High";
  return {
    title: alert,
    subtitle: "Risk alert, exposure context, trigger rule and resolution",
    pills: [
      { tone: "primary", label: "Risk" },
      { tone: sev.toLowerCase().includes("high") ? "destructive" : "warning", label: sev },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Alert", value: alert },
          { label: "Severity", value: sev, tone: "warning" },
          { label: "Raised", value: "10:22:14" },
          { label: "Status", value: "Investigating", tone: "warning" },
          { label: "Owner", value: "Dealing Desk · Rahul Shah" },
        ],
      },
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
          { label: "VaR (1d, 95%)", value: "$8,420", tone: "warning" },
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
          { label: "Status", value: "Investigating", tone: "warning" },
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

/* ============================================================== */
/*                            SECURITY                            */
/* ============================================================== */
function securityDetail(cols: string[], vals: string[]): DetailPayload {
  const session = vals[0] || "sess_8821";
  return {
    title: `Session ${session}`,
    subtitle: "Device, geo, auth, MFA and revocation controls",
    pills: [
      { tone: "primary", label: "Security" },
      { tone: "info", label: "Active" },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Session", value: session },
          { label: "Started", value: "Today 09:12" },
          { label: "Last Active", value: "2 min ago" },
          { label: "Status", value: "Active", tone: "good" },
          { label: "Risk Score", value: "Low", tone: "good" },
        ],
      },
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
          { label: "Last Password Change", value: "2026-04-12" },
          { label: "MFA Enrolled", value: "Yes", tone: "good" },
          { label: "Trusted Device", value: "Yes", tone: "good" },
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
          { label: "Block IP", value: "Available" },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                            SUPPORT                             */
/* ============================================================== */
function supportDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "TCK-44821";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Open";
  return {
    title: `${id} — Support ticket`,
    subtitle: "Conversation, SLA, attachments, linked records and resolution",
    pills: [
      { tone: "primary", label: "Support" },
      {
        tone: status.toLowerCase().includes("open") ? "warning" : "success",
        label: status,
      },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Ticket", value: id },
          { label: "Status", value: status, tone: "warning" },
          { label: "Priority", value: "High", tone: "warning" },
          { label: "Channel", value: "Web Chat" },
          { label: "Assigned To", value: "Support · Aisha" },
          { label: "SLA Remaining", value: "1h 12m", tone: "warning" },
          { label: "Opened", value: "Yesterday 14:22" },
          { label: "Last Reply", value: "15:12" },
        ],
      },
      {
        key: "details",
        label: "Ticket Details",
        fields: [
          { label: "Subject", value: pick(cols, vals, "subject") !== "—" ? pick(cols, vals, "subject") : "Withdrawal pending > 24h" },
          { label: "Category", value: "Payments" },
          { label: "Sub-Category", value: "Withdrawal Delay" },
          { label: "Source", value: "Web Chat" },
          { label: "Reopens", value: "0" },
          { label: "Tags", value: "withdrawal, treasury, swift" },
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
        key: "attachments",
        label: "Attachments",
        tables: [
          {
            title: "Files",
            columns: ["Name", "Type", "Size", "By"],
            rows: [
              ["SWIFT-receipt.pdf", "PDF", "184 KB", "Treasury"],
              ["chat-export.txt", "Text", "12 KB", "System"],
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
          { label: "Related Tickets", value: "TCK-44120, TCK-44200" },
        ],
      },
      {
        key: "sla",
        label: "SLA",
        fields: [
          { label: "First Response", value: "3 min", tone: "good" },
          { label: "Resolution Target", value: "4h" },
          { label: "Time in Status", value: "1h 48m" },
          { label: "Breach Risk", value: "Medium", tone: "warning" },
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

/* ============================================================== */
/*                            ACTIVITY                            */
/* ============================================================== */
function activityDetail(cols: string[], vals: string[]): DetailPayload {
  const ev = vals[0] || "Login";
  return {
    title: `${ev} — Activity event`,
    subtitle: "Actor, context, device, downstream effects and raw payload",
    pills: [
      { tone: "primary", label: "Activity" },
      { tone: "info", label: "Logged" },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Event", value: ev },
          { label: "Module", value: "Trading" },
          { label: "Outcome", value: "Success", tone: "good" },
          { label: "Timestamp", value: "Today 09:12:04" },
          { label: "Severity", value: "Info", tone: "info" },
        ],
      },
      {
        key: "actor",
        label: "Actor",
        fields: [
          { label: "User", value: "Client · Hassan A." },
          { label: "Role", value: "Client" },
          { label: "User ID", value: "USR-88421" },
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
          { label: "Action", value: ev },
          { label: "Outcome", value: "Success", tone: "good" },
          { label: "Latency", value: "182 ms" },
          { label: "Request ID", value: "req_8821x4" },
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
      {
        key: "payload",
        label: "Payload",
        notes: [
          "{ event: \"" + ev + "\", actor: \"USR-88421\", ip: \"94.207.12.55\",",
          "  device: \"iOS\", session: \"sess_8821\", outcome: \"success\" }",
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                          IB PARTNER                            */
/* ============================================================== */
function ibDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "IB-1029";
  return {
    title: `${id} — IB partner`,
    subtitle: "Profile, tier, commercials, network, payouts and compliance",
    pills: [
      { tone: "primary", label: "IB Partner" },
      { tone: "success", label: "Active" },
      { tone: "info", label: "Gold IB" },
    ],
    sections: [
      {
        key: "overview",
        label: "Profile",
        fields: [
          { label: "Partner ID", value: id },
          { label: "Partner Code", value: "AR4120" },
          { label: "Full Name", value: "Arjun Raghunathan" },
          { label: "Company", value: "AR Financial Services Pvt Ltd" },
          { label: "Partner Type", value: "Corporate IB" },
          { label: "Country", value: "India" },
          { label: "Email", value: "arjun.r@gmail.com" },
          { label: "Phone", value: "+91 98760 12345" },
          { label: "Assigned Manager", value: "Priya Nair" },
          { label: "Upline IB", value: "IB-0042 — Apex Capital" },
        ],
      },
      {
        key: "tier",
        label: "Status & Tier",
        fields: [
          { label: "Current Tier", value: "Gold IB", tone: "good" },
          { label: "Previous Tier", value: "Silver IB" },
          { label: "Tier Upgrade", value: "2024-03-14" },
          { label: "Partner Score", value: "82/100", tone: "good" },
          { label: "Qualification", value: "Qualified", tone: "good" },
          { label: "Commission Rate", value: "$8 / lot" },
          { label: "Sub-IB Allowed", value: "Yes — up to 20" },
          { label: "Priority Support", value: "Yes", tone: "good" },
        ],
      },
      {
        key: "risk-profile",
        label: "Risk Profile",
        fields: [
          { label: "Risk Score", value: "62/100", tone: "warning" },
          { label: "Risk Level", value: "Medium", tone: "warning" },
          { label: "Referral Quality", value: "78/100 — Good", tone: "good" },
          { label: "Compliance Risk", value: "Medium — PEP", tone: "warning" },
          { label: "Partner Health", value: "82/100", tone: "good" },
        ],
      },
      {
        key: "commercials",
        label: "Commercials",
        fields: [
          { label: "Plan", value: "Hybrid (Rebate + CPA)" },
          { label: "Rebate / Lot", value: "$5.50" },
          { label: "CPA", value: "$300 per FTD" },
          { label: "Revenue Share", value: "20%" },
          { label: "Currency", value: "USD" },
          { label: "Payment Frequency", value: "Monthly" },
          { label: "Minimum Payout", value: "$100" },
        ],
      },
      {
        key: "network",
        label: "Referral Network",
        tables: [
          {
            title: "Direct referrals",
            columns: ["Client", "Status", "Deposits", "Volume", "Revenue"],
            rows: [
              ["CL-88421 · James Whitford", "Active", "$48,200", "2,840 lots", "$3,120"],
              ["CL-88500 · Sarah Khan", "Active", "$22,400", "1,420 lots", "$1,820"],
              ["CL-88611 · Omar Faruq", "Dormant", "$8,200", "240 lots", "$320"],
            ],
          },
        ],
      },
      {
        key: "subib",
        label: "Sub-IB Network",
        tables: [
          {
            title: "Sub-IBs",
            columns: ["Sub-IB", "Tier", "Clients", "Volume", "Revenue"],
            rows: [
              ["IB-1130 · Reza", "Silver", "42", "820 lots", "$2,120"],
              ["IB-1145 · Linh", "Silver", "28", "640 lots", "$1,440"],
            ],
          },
        ],
      },
      {
        key: "portfolio",
        label: "Client Portfolio",
        fields: [
          { label: "Total Clients", value: "147" },
          { label: "Active Clients", value: "38", tone: "good" },
          { label: "VIP Clients", value: "6", tone: "good" },
          { label: "Dormant Clients", value: "92" },
          { label: "Restricted Clients", value: "2", tone: "warning" },
          { label: "High Risk Clients", value: "4", tone: "warning" },
          { label: "KYC Pending", value: "5" },
        ],
      },
      {
        key: "revenue",
        label: "Revenue Analytics",
        fields: [
          { label: "Monthly Revenue", value: "$13,010", tone: "good" },
          { label: "Total Revenue", value: "$120,000", tone: "good" },
          { label: "Revenue / Client", value: "$816" },
          { label: "Revenue / Lot", value: "$8.00" },
          { label: "Pending Commission", value: "$1,240" },
        ],
      },
      {
        key: "payouts",
        label: "Payment History",
        tables: [
          {
            title: "Recent payouts",
            columns: ["Period", "Amount", "Method", "Status", "Date"],
            rows: [
              ["May 2026", "$13,010", "Bank Wire", "Paid", "2026-06-01"],
              ["Apr 2026", "$11,420", "Bank Wire", "Paid", "2026-05-01"],
              ["Mar 2026", "$10,270", "Bank Wire", "Paid", "2026-04-01"],
            ],
          },
        ],
      },
      {
        key: "marketing",
        label: "Marketing Resources",
        fields: [
          { label: "Referral Link", value: "broker.com/r/AR4120" },
          { label: "Landing Page", value: "broker.com/ib/ar-financial" },
          { label: "UTM Source", value: "google / cpc" },
          { label: "Tracking ID", value: "TRK-AR4120" },
          { label: "Total Clicks", value: "4,820" },
          { label: "Registrations", value: "147" },
          { label: "Conversion Rate", value: "3.05%", tone: "good" },
        ],
      },
      {
        key: "compliance",
        label: "Compliance",
        fields: [
          { label: "Agreement Signed", value: "2025-09-01" },
          { label: "KYB Status", value: "Approved", tone: "good" },
          { label: "AML Review", value: "Passed", tone: "good" },
          { label: "Sanctions", value: "Clear", tone: "good" },
          { label: "PEP Review", value: "Flagged — cleared", tone: "warning" },
          { label: "Last Review", value: "2026-05-08" },
          { label: "Compliance Officer", value: "Rajan Mehta" },
        ],
      },
      {
        key: "restrictions",
        label: "Restrictions",
        tables: [
          {
            title: "Active controls",
            columns: ["Restriction", "Status", "Reason", "Applied By"],
            rows: [
              ["Commission Hold", "Inactive", "—", "—"],
              ["Referral Lock", "Inactive", "—", "—"],
              ["Sub-IB Creation", "Allowed", "—", "—"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Lifecycle",
            columns: ["Event", "When"],
            rows: [
              ["Partner registered", "2022-06-02"],
              ["Upgraded to Silver", "2023-08-12"],
              ["Upgraded to Gold (50 active clients)", "2024-03-14"],
              ["$2,180 commission paid — Apr 2026", "2026-05-01"],
            ],
          },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Admin changes",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Tier Updated → Gold", "Priya Nair", "2024-03-14"],
              ["Commission Adjusted +$120", "Finance · Mehta", "2026-04-10"],
              ["Compliance Review", "Rajan Mehta", "2026-05-08"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                           REFERRALS                            */
/* ============================================================== */
function referralDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "CL-88421";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Funded";
  return {
    title: `${id} — Referred client`,
    subtitle: "Funnel stage, attribution, lifetime value and commission contribution",
    pills: [
      { tone: "primary", label: "Referral" },
      { tone: "info", label: status },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Client", value: id },
          { label: "Status", value: status, tone: "good" },
          { label: "Country", value: "United Arab Emirates" },
          { label: "Registered", value: "2026-02-04" },
          { label: "Referring IB", value: "IB-1029 — Arjun" },
          { label: "Account Manager", value: "Priya Nair" },
        ],
      },
      {
        key: "funnel",
        label: "Funnel",
        fields: [
          { label: "Registered", value: "2026-02-04" },
          { label: "KYC Submitted", value: "2026-02-04" },
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
          { label: "Trades", value: "612" },
          { label: "Avg Trade Size", value: "0.46 lots" },
        ],
      },
      {
        key: "commission",
        label: "Commission",
        fields: [
          { label: "Rebate Generated", value: "$1,562", tone: "good" },
          { label: "CPA Paid", value: "$300" },
          { label: "Revenue Share", value: "$420" },
          { label: "Total Commission", value: "$2,282", tone: "good" },
          { label: "Pending Commission", value: "$84" },
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
          { label: "Click ID", value: "clk_8821x" },
        ],
      },
      {
        key: "risk",
        label: "Risk",
        fields: [
          { label: "KYC", value: "Approved", tone: "good" },
          { label: "AML Score", value: "Low", tone: "good" },
          { label: "Trading Risk", value: "Medium", tone: "warning" },
          { label: "Bonus Abuse Flag", value: "Clean", tone: "good" },
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
              ["CPA credited to IB-1029", "Finance", "2026-02-06"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                    COMMISSIONS & REBATES                       */
/* ============================================================== */
function commissionsDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "TXN-8821";
  const amount = pick(cols, vals, "amount") !== "—" ? pick(cols, vals, "amount") : "$4,260";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Paid";
  const isRebate = id.toUpperCase().startsWith("RBT");
  const isPayment = id.toUpperCase().startsWith("PAY");
  const isDispute = id.toUpperCase().startsWith("DSP");
  const kind = isRebate ? "Rebate" : isPayment ? "Payment" : isDispute ? "Dispute" : "Commission";
  return {
    title: `${id} — ${kind} ${amount}`,
    subtitle: "Full commission lifecycle — source, calculation, payment, disputes and audit",
    pills: [
      { tone: "primary", label: kind },
      {
        tone: status.toLowerCase().includes("paid")
          ? "success"
          : status.toLowerCase().includes("hold") || status.toLowerCase().includes("dispute")
          ? "destructive"
          : "warning",
        label: status,
      },
      { tone: "info", label: "IB Partner" },
    ],
    sections: [
      {
        key: "overview",
        label: "Transaction Overview",
        fields: [
          { label: "Transaction ID", value: id },
          { label: "Amount", value: amount, tone: "good" },
          { label: "Status", value: status },
          { label: "Commission Type", value: isRebate ? "Rebate" : "Revenue Share" },
          { label: "Period", value: "May 2025" },
          { label: "Currency", value: "USD" },
          { label: "Created", value: "30 May 2025 11:42" },
          { label: "Settled", value: status === "Paid" ? "01 Jun 2025" : "Pending" },
        ],
      },
      {
        key: "source",
        label: "Source Client",
        fields: [
          { label: "Client Name", value: pick(cols, vals, "client") !== "—" ? pick(cols, vals, "client") : "John Martinez" },
          { label: "Client ID", value: "CL-88421" },
          { label: "Account", value: pick(cols, vals, "account") !== "—" ? pick(cols, vals, "account") : "ACC-1021" },
          { label: "Platform", value: "MT5" },
          { label: "Country", value: "United Arab Emirates" },
          { label: "Tier", value: "VIP", tone: "good" },
          { label: "Acquisition Date", value: "2024-08-12" },
        ],
      },
      {
        key: "activity",
        label: "Trading Activity",
        fields: [
          { label: "Lots Traded", value: "245.5" },
          { label: "Symbols", value: "EURUSD, XAUUSD, GBPJPY" },
          { label: "Trades Count", value: "412" },
          { label: "Avg Lot Size", value: "0.59" },
          { label: "Trading Days", value: "22 / 31" },
          { label: "Largest Position", value: "5.0 lots XAUUSD" },
        ],
      },
      {
        key: "calc",
        label: "Calculation Breakdown",
        fields: [
          { label: "Gross Revenue", value: "$14,200" },
          { label: "Spread Revenue", value: "$8,400" },
          { label: "Commission Revenue", value: "$4,200" },
          { label: "Swap Revenue", value: "$1,600" },
          { label: "Adjustments", value: "-$2,160" },
          { label: "Net Revenue", value: "$12,040", tone: "good" },
          { label: "Share Rate", value: "35%" },
          { label: "Commission Earned", value: amount, tone: "good" },
        ],
      },
      {
        key: "payment",
        label: "Payment Information",
        fields: [
          { label: "Payment ID", value: "PAY-5501" },
          { label: "Method", value: "Bank Wire (SWIFT)" },
          { label: "Bank Account", value: "ICICI · XXXX-4421" },
          { label: "Due Date", value: "01 Jun 2025" },
          { label: "Paid Date", value: status === "Paid" ? "01 Jun 2025" : "—" },
          { label: "Reference", value: "SWIFT-AR4120-0601" },
          { label: "Currency", value: "USD" },
          { label: "Fees", value: "$15.00" },
        ],
      },
      {
        key: "rebate",
        label: "Rebate Formula",
        fields: [
          { label: "Rate per Lot", value: "$2.00" },
          { label: "Lots", value: "520" },
          { label: "Gross Rebate", value: "$1,040", tone: "good" },
          { label: "Eligibility Filter", value: "Forex majors only" },
          { label: "Tier Multiplier", value: "1.0x" },
          { label: "Net Payable", value: "$1,040", tone: "good" },
        ],
      },
      {
        key: "client-contrib",
        label: "Client Contribution",
        tables: [
          {
            title: "Top revenue clients this period",
            columns: ["Client", "Lots", "Revenue", "Commission"],
            rows: [
              ["James Rodriguez", "245.5", "$8,400", "$2,520"],
              ["Sarah Chen", "189.0", "$6,300", "$1,890"],
              ["Mohammed Al-Farsi", "312.0", "$10,200", "$3,060"],
              ["Ravi Kumar", "420.0", "$14,700", "$4,410"],
              ["Priya Patel", "156.5", "$5,100", "$1,530"],
            ],
          },
        ],
      },
      {
        key: "adjustments",
        label: "Adjustments",
        tables: [
          {
            title: "Applied adjustments",
            columns: ["ID", "Type", "Amount", "Reason", "By"],
            rows: [
              ["ADJ-7710", "Manual Correction", "-$420", "Duplicate trade", "Finance L2"],
              ["ADJ-7702", "Bonus Adjustment", "+$240", "Tier upgrade backdate", "IB Manager"],
              ["ADJ-7654", "Fraud Reversal", "-$1,200", "Chargeback dispute", "Compliance"],
            ],
          },
        ],
      },
      {
        key: "dispute",
        label: "Disputes",
        tables: [
          {
            title: "Open disputes",
            columns: ["Dispute ID", "Amount", "Reason", "Status", "Team"],
            rows: [
              ["DSP-221", "$1,040", "Incorrect rate applied", "Under review", "IB Team"],
            ],
          },
        ],
      },
      {
        key: "rules",
        label: "Commission Rules",
        fields: [
          { label: "Commission Model", value: "Hybrid (CPA + Revenue Share)" },
          { label: "Rebate Rate", value: "$2.00 / lot" },
          { label: "Revenue Share", value: "35%" },
          { label: "CPA Rate", value: "$300 / FTD" },
          { label: "Payment Frequency", value: "Monthly" },
          { label: "Minimum Payout", value: "$100" },
          { label: "Hold Period", value: "30 days" },
        ],
      },
      {
        key: "approval",
        label: "Approval History",
        tables: [
          {
            title: "Sign-offs",
            columns: ["Stage", "By", "Decision", "Time"],
            rows: [
              ["Generated", "System", "Auto-created", "30 May 11:42"],
              ["Risk review", "Risk Team", "Cleared", "30 May 14:20"],
              ["Finance L1", "Meera Shah", "Approved", "31 May 09:10"],
              ["Finance L2", "Rajan Mehta", "Approved + scheduled", "31 May 16:30"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Lifecycle events",
            columns: ["Event", "By", "Time"],
            rows: [
              ["Commission generated", "System", "30 May 11:42"],
              ["Commission approved", "Finance L2", "31 May 16:30"],
              ["Payment scheduled", "Finance L2", "31 May 16:31"],
              ["Commission paid", "Bank wire", "01 Jun 09:00"],
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        notes: [
          "VIP partner — priority finance lane applied.",
          "Auto-clearance window 24h after risk review.",
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "View Earnings", value: "Safe" },
          { label: "Export Report", value: "Safe" },
          { label: "Approve Payment", value: "Moderate" },
          { label: "Reverse Commission", value: "Dangerous", tone: "bad" },
          { label: "Hold Commission", value: "Dangerous", tone: "bad" },
          { label: "Freeze Earnings", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Admin actions",
            columns: ["Action", "By", "Reference", "Time", "IP"],
            rows: [
              ["Commission Approved", "Finance L2", id, "31 May 16:30", "10.0.1.42"],
              ["Rebate Rate Changed", "Partner Manager", "ACC-2011", "15 May 11:00", "10.0.1.88"],
              ["Dispute Raised", "IB Team", "DSP-221", "22 May 10:30", "10.0.1.55"],
              ["Payment Released", "Bank API", "PAY-5501", "01 Jun 09:00", "—"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                        IB ANALYTICS                            */
/* ============================================================== */
function analyticsDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "Revenue Analysis";
  return {
    title: `${id} — IB analytics deep dive`,
    subtitle: "Business intelligence: growth, acquisition, revenue, retention, geo, campaigns",
    pills: [
      { tone: "primary", label: "Analytics" },
      { tone: "success", label: "Active IB" },
      { tone: "info", label: "Gold Tier" },
    ],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: [
          { label: "Total Revenue", value: "$48,320", tone: "good" },
          { label: "Monthly Revenue", value: "$48,320" },
          { label: "Revenue / Client", value: "$38.72" },
          { label: "Revenue / Lot", value: "$3.88" },
          { label: "Top Revenue Source", value: "Spread commission" },
          { label: "Growth vs Last Month", value: "+8.4%", tone: "good" },
          { label: "Forecast (next month)", value: "$52,400", tone: "good" },
          { label: "Conversion Rate", value: "34.2%", tone: "good" },
        ],
      },
      {
        key: "growth",
        label: "Growth",
        fields: [
          { label: "New Clients (MTD)", value: "138", tone: "good" },
          { label: "Monthly Growth", value: "12.3% (above target)", tone: "good" },
          { label: "Referral Growth", value: "84 (+18)", tone: "good" },
          { label: "Revenue Growth", value: "8.4% (+$3,740)", tone: "good" },
          { label: "Total Clients", value: "1,248" },
          { label: "Active Clients", value: "842 (67.5%)" },
        ],
      },
      {
        key: "acquisition",
        label: "Client Acquisition",
        tables: [
          {
            title: "Funnel — this month vs last",
            columns: ["Metric", "This month", "Last month", "Change", "Target", "Status"],
            rows: [
              ["Registrations", "412", "380", "↑8.4%", "400", "On track"],
              ["KYC Approved", "298", "271", "↑9.9%", "300", "Near target"],
              ["First Deposits", "189", "201", "↓6.0%", "210", "Below target"],
              ["Active Traders", "842", "861", "↓2.2%", "900", "Below target"],
              ["VIP Clients", "4", "3", "↑1 new", "5", "Near target"],
            ],
          },
        ],
      },
      {
        key: "revenue-sources",
        label: "Revenue Sources",
        fields: [
          { label: "Spread Commission", value: "$28,400 (58.8%)", tone: "good" },
          { label: "Lot-Based Commission", value: "$14,200 (29.4%)" },
          { label: "Swap / Overnight", value: "$5,720 (11.8%)" },
        ],
      },
      {
        key: "top-clients",
        label: "Top Clients",
        tables: [
          {
            title: "Top revenue generators",
            columns: ["Client", "Account", "Revenue", "Lots", "Rev/Lot", "Type"],
            rows: [
              ["Ahmed Al-Rashidi", "MT5-00421", "$4,820", "1,240", "$3.89", "VIP"],
              ["Priya Sharma", "MT5-00389", "$3,120", "804", "$3.88", "Standard"],
              ["Mohammed Hassan", "MT5-00512", "$2,890", "744", "$3.88", "Standard"],
              ["Sara Al-Zaabi", "MT5-00298", "$2,450", "630", "$3.89", "VIP"],
              ["James O'Brien", "MT5-00471", "$1,980", "510", "$3.88", "Standard"],
            ],
          },
        ],
      },
      {
        key: "trading",
        label: "Trading Analytics",
        tables: [
          {
            title: "Volume by instrument",
            columns: ["Symbol", "Lots"],
            rows: [
              ["EURUSD", "2,500"],
              ["GBPUSD", "2,000"],
              ["US30", "1,500"],
              ["NAS100", "1,000"],
              ["CRUDE", "500"],
              ["XAUUSD", "4,950"],
            ],
          },
        ],
      },
      {
        key: "deposits",
        label: "Deposits",
        fields: [
          { label: "Total Deposits", value: "$2.1M", tone: "good" },
          { label: "Average Deposit", value: "$1,820" },
          { label: "Deposit Growth", value: "+5.2% MoM", tone: "good" },
          { label: "First Deposit Rate", value: "45.9%" },
          { label: "Repeat Deposit Rate", value: "62%" },
        ],
      },
      {
        key: "retention",
        label: "Retention",
        fields: [
          { label: "Active Rate", value: "67.5%", tone: "good" },
          { label: "Churn Rate", value: "8.2%", tone: "warning" },
          { label: "Retention Rate", value: "71.4%", tone: "warning" },
          { label: "Dormant Clients", value: "406" },
          { label: "Reactivation Rate", value: "12%" },
        ],
      },
      {
        key: "geo",
        label: "Geographic",
        tables: [
          {
            title: "Top countries",
            columns: ["Country", "Clients", "Deposits", "Revenue"],
            rows: [
              ["United Arab Emirates", "284", "$620,000", "$14,200"],
              ["India", "412", "$540,000", "$11,800"],
              ["Saudi Arabia", "188", "$380,000", "$8,920"],
              ["United Kingdom", "94", "$220,000", "$5,400"],
              ["Singapore", "62", "$140,000", "$3,200"],
            ],
          },
        ],
      },
      {
        key: "campaigns",
        label: "Campaigns",
        tables: [
          {
            title: "Campaign performance",
            columns: ["Campaign", "Clicks", "Regs", "Deposits", "Revenue", "ROI"],
            rows: [
              ["UAE Summer Push", "4,820", "142", "$420,000", "$8,420", "312%"],
              ["VIP Onboarding", "1,820", "62", "$220,000", "$5,200", "284%"],
              ["Ramadan Promo", "3,240", "108", "$184,000", "$3,820", "240%"],
            ],
          },
        ],
      },
      {
        key: "funnel",
        label: "Conversion Funnel",
        tables: [
          {
            title: "End-to-end funnel",
            columns: ["Stage", "Count", "%"],
            rows: [
              ["Lead", "2,400", "100%"],
              ["Registered", "1,920", "80%"],
              ["KYC Approved", "1,248", "52%"],
              ["Deposited", "912", "38%"],
              ["Trading Active", "842", "35%"],
              ["VIP", "4", "0.2%"],
            ],
          },
        ],
      },
      {
        key: "cohort",
        label: "Cohort Analysis",
        fields: [
          { label: "Cohort", value: "Jan 2026 — 412 clients" },
          { label: "Month-1 Retention", value: "82%", tone: "good" },
          { label: "Month-3 Retention", value: "61%", tone: "warning" },
          { label: "Month-6 Retention", value: "44%", tone: "warning" },
          { label: "LTV (6mo)", value: "$420" },
          { label: "Revenue Contribution", value: "$172,400", tone: "good" },
        ],
      },
      {
        key: "forecast",
        label: "Forecast",
        tables: [
          {
            title: "Next 3 months",
            columns: ["Month", "Revenue"],
            rows: [
              ["July 2026", "$52,400"],
              ["Aug 2026", "$55,800"],
              ["Sep 2026", "$58,200"],
              ["Q3 Total", "$166,400"],
            ],
          },
        ],
      },
      {
        key: "benchmark",
        label: "Benchmark",
        tables: [
          {
            title: "vs peers",
            columns: ["Metric", "This IB", "Avg IB", "Top 10 IBs", "Tier Peers"],
            rows: [
              ["Revenue", "$48K", "$22K", "$120K", "$42K"],
              ["Clients", "1,248", "612", "3,200", "1,180"],
              ["Conversion", "34.2%", "28.4%", "44.8%", "32.1%"],
              ["Retention", "71.4%", "62.0%", "82.4%", "70.2%"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Recent milestones",
            columns: ["Event", "When", "By"],
            rows: [
              ["VIP client acquired (Ahmed)", "Apr 28, 2026", "Ahmed Al-Rashidi"],
              ["UAE summer campaign launched", "Apr 20, 2026", "Marketing"],
              ["Revenue milestone $40K/month", "Apr 1, 2026", "Finance"],
              ["Retention warning flagged", "Mar 18, 2026", "IB Manager"],
              ["1,000th client registered", "Feb 8, 2026", "System"],
            ],
          },
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "View Analytics", value: "Safe" },
          { label: "Export Report", value: "Safe" },
          { label: "Create Campaign", value: "Moderate" },
          { label: "Assign Manager", value: "Moderate" },
          { label: "Set Target", value: "Moderate" },
          { label: "Suspend Partner Program", value: "Dangerous", tone: "bad" },
          { label: "Remove Analytics Access", value: "Dangerous", tone: "bad" },
          { label: "Freeze Tracking", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Recent",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Exported revenue report", "Priya Nair", "Today 09:14"],
              ["Viewed revenue details", "Management", "May 29"],
              ["Target updated $45K → $50K", "IB Manager", "May 12"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                      MARKETING CAMPAIGNS                       */
/* ============================================================== */
function marketingDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "CAMP-2026-018";
  const name = pick(cols, vals, "name") !== "—" ? pick(cols, vals, "name") : "May Deposit Promo";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Active";
  return {
    title: `${id} — ${name}`,
    subtitle: "Campaign attribution, UTM tracking, bonuses, performance and fraud analysis",
    pills: [
      { tone: "primary", label: "Campaign" },
      { tone: status.toLowerCase().includes("active") ? "success" : "info", label: status },
      { tone: "warning", label: "Deposit Bonus" },
    ],
    sections: [
      {
        key: "overview",
        label: "Campaign Overview",
        fields: [
          { label: "Campaign ID", value: id },
          { label: "Campaign Name", value: name },
          { label: "Campaign Type", value: "Deposit Bonus" },
          { label: "Campaign Status", value: status, tone: "good" },
          { label: "Campaign Owner", value: "Marketing Team · Sara" },
          { label: "Start Date", value: "01 May 2026" },
          { label: "End Date", value: "31 May 2026" },
          { label: "Region", value: "GCC + India" },
        ],
      },
      {
        key: "attribution",
        label: "Attribution",
        fields: [
          { label: "First Touch Campaign", value: "Gold Trading Campaign" },
          { label: "Last Touch Campaign", value: "VIP Deposit Campaign" },
          { label: "Attribution Model", value: "Multi-touch linear" },
          { label: "Acquisition Channel", value: "Google Ads → IB referral" },
          { label: "Registration Source", value: "Google CPC · 14 Mar 2022" },
          { label: "Referral Source", value: "IB-00201 · Rajesh Kumar" },
          { label: "IB Source", value: "IB-00412 · Arjun Raghunathan" },
          { label: "Affiliate Source", value: "Google Ads network" },
          { label: "Tracking ID", value: "TRK-AR4120-G001" },
        ],
      },
      {
        key: "utm",
        label: "UTM Parameters",
        fields: [
          { label: "UTM Source", value: "google" },
          { label: "UTM Medium", value: "cpc" },
          { label: "UTM Campaign", value: "gold-trading-2022" },
          { label: "UTM Content", value: "banner-300x250" },
          { label: "UTM Term", value: "forex trading india" },
          { label: "Landing Page", value: "broker.com/gold-trading" },
          { label: "Device at Registration", value: "Chrome / Android" },
          { label: "Country at Registration", value: "India · Mumbai" },
        ],
      },
      {
        key: "participation",
        label: "Participation",
        tables: [
          {
            title: "All campaigns joined",
            columns: ["Campaign", "Type", "Joined", "Status", "Deposits", "Revenue"],
            rows: [
              ["May Deposit Promo", "Deposit bonus", "09 May 2026", "Active", "$2,000", "$0"],
              ["Ramadan Promotion", "Cashback", "01 Apr 2026", "Active", "$4,200", "$480"],
              ["VIP Deposit Campaign", "VIP exclusive", "Jan 2024", "Completed", "$18,000", "$2,100"],
              ["Gold Trading 2022", "Acquisition", "14 Mar 2022", "Completed", "$5,000", "$8,200"],
            ],
          },
        ],
      },
      {
        key: "analytics",
        label: "Performance",
        fields: [
          { label: "Total Clicks", value: "4,820" },
          { label: "Unique Visitors", value: "3,940" },
          { label: "Click-Through Rate", value: "4.2%", tone: "good" },
          { label: "Top Source", value: "WhatsApp link" },
          { label: "Mobile Clicks", value: "78%" },
          { label: "Registrations", value: "142" },
          { label: "First Deposits", value: "84" },
          { label: "Active Traders", value: "62" },
          { label: "Trading Volume", value: "8,500 lots" },
        ],
      },
      {
        key: "bonuses",
        label: "Promotions & Bonuses",
        tables: [
          {
            title: "Bonus history",
            columns: ["Bonus ID", "Name", "Type", "Amount", "Status", "Granted", "Expiry"],
            rows: [
              ["BON-2024-088", "Welcome Bonus", "Deposit Match 100%", "$500", "Active", "10 Jan 2024", "10 Jul 2024"],
              ["BON-2026-018", "May Deposit Promo", "Cashback 10%", "$200", "Active", "09 May 2026", "30 Jun 2026"],
              ["BON-2025-201", "VIP Loyalty", "Cash Credit", "$1,000", "Expired", "01 Dec 2025", "31 Mar 2026"],
              ["BON-2024-330", "Ramadan Cashback", "Trade Cashback", "$320", "Used", "15 Mar 2024", "—"],
            ],
          },
        ],
      },
      {
        key: "eligibility",
        label: "Eligibility",
        fields: [
          { label: "KYC Requirement", value: "Approved", tone: "good" },
          { label: "Deposit Requirement", value: "Min $500" },
          { label: "AML Requirement", value: "Cleared", tone: "good" },
          { label: "Region Eligibility", value: "India — allowed", tone: "good" },
          { label: "Device Sharing Risk", value: "None", tone: "good" },
          { label: "Self Referral Risk", value: "None", tone: "good" },
          { label: "IB Excluded", value: "No" },
        ],
      },
      {
        key: "referral",
        label: "Referral Campaigns",
        tables: [
          {
            title: "Referral program performance",
            columns: ["Program", "Total Refs", "Verified", "Deposits", "Volume", "Revenue", "Risk"],
            rows: [
              ["IB Referral Program", "147", "72", "$284K", "2,840L", "$8,924", "Clean"],
              ["Friend Referral", "38", "21", "$42K", "320L", "$1,420", "Clean"],
              ["Telegram Promo", "62", "28", "$58K", "480L", "$1,820", "Monitor"],
            ],
          },
        ],
      },
      {
        key: "email",
        label: "Email Campaigns",
        tables: [
          {
            title: "Recent email campaigns",
            columns: ["Campaign", "Sent", "Opened", "Clicked"],
            rows: [
              ["VIP Offer", "1", "Opened", "—"],
              ["Market Update", "1", "Opened", "Clicked"],
              ["Welcome Series 1/3", "1", "Opened", "Clicked"],
              ["May Promo Reminder", "1", "Opened", "—"],
            ],
          },
        ],
      },
      {
        key: "sms-push",
        label: "SMS & Push",
        tables: [
          {
            title: "Mobile campaign deliveries",
            columns: ["Notification", "Sent", "Opened", "Action Taken"],
            rows: [
              ["Deposit reminder", "12 May 09:00", "Yes", "Opened app"],
              ["May promo launch", "01 May 08:00", "Yes", "Clicked link"],
              ["Withdrawal complete", "30 Apr 14:22", "Yes", "—"],
            ],
          },
        ],
      },
      {
        key: "funnel",
        label: "Conversion Funnel",
        fields: [
          { label: "Lead", value: "2,400" },
          { label: "Registered", value: "1,920 (80%)" },
          { label: "KYC Approved", value: "1,248 (52%)" },
          { label: "Deposited", value: "912 (38%)" },
          { label: "Traded", value: "842 (35%)" },
          { label: "Active Client", value: "642 (27%)" },
          { label: "VIP Client", value: "4 (0.2%)", tone: "good" },
        ],
      },
      {
        key: "revenue-attr",
        label: "Revenue Attribution",
        fields: [
          { label: "Deposits Generated", value: "$420,000", tone: "good" },
          { label: "Commission Generated", value: "$18,240", tone: "good" },
          { label: "Trading Revenue", value: "$8,420" },
          { label: "Net Profit", value: "$6,280", tone: "good" },
          { label: "Marketing Cost", value: "$2,140" },
          { label: "ROI", value: "+312%", tone: "good" },
          { label: "Lifetime Value", value: "$1,820" },
          { label: "CPA", value: "$15.07" },
        ],
      },
      {
        key: "restrictions",
        label: "Restrictions",
        tables: [
          {
            title: "Active restrictions",
            columns: ["Restriction", "Status", "Description", "Source"],
            rows: [
              ["IB Excluded from Bonus", "Partial", "IB partners excluded from deposit bonuses", "IB policy"],
              ["Region Blocked — USA", "Full", "Not available in US jurisdiction", "Compliance"],
              ["First Deposit Only", "Full", "Bonus tied to FTD", "Marketing"],
            ],
          },
        ],
      },
      {
        key: "fraud",
        label: "Fraud Analysis",
        fields: [
          { label: "Self Referral Detection", value: "Clean", tone: "good" },
          { label: "Device Sharing", value: "Clean", tone: "good" },
          { label: "Multi Accounting", value: "Clean", tone: "good" },
          { label: "Referral Abuse", value: "Clean", tone: "good" },
          { label: "Bonus Abuse", value: "Low Risk", tone: "good" },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Campaign journey",
            columns: ["Time", "Event"],
            rows: [
              ["09:10", "Registered via Google Ad"],
              ["09:15", "Campaign assigned"],
              ["09:20", "KYC approved"],
              ["10:42", "First deposit $1,000"],
              ["11:02", "Welcome bonus credited"],
              ["14:30", "First trade executed"],
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        notes: [
          "High campaign engagement — promote to VIP track.",
          "Eligible for VIP promotion after next deposit.",
          "Bonus abuse review pending — flagged 12 May.",
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "Assign Campaign", value: "Moderate" },
          { label: "Remove Campaign", value: "Moderate" },
          { label: "Grant Bonus", value: "Moderate" },
          { label: "Revoke Bonus", value: "Moderate" },
          { label: "Ban Bonus Participation", value: "Dangerous", tone: "bad" },
          { label: "Revoke Rewards", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Recent admin changes",
            columns: ["Action", "Old", "New", "By", "Role", "Timestamp"],
            rows: [
              ["Bonus granted", "—", "$200", "Marketing", "Manager", "09 May 11:30"],
              ["Reward revoked", "$120", "—", "Compliance", "Officer", "12 May 15:10"],
              ["Campaign assigned", "—", "May Promo", "System", "Auto", "09 May 09:15"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                    PERMISSIONS & ACCESS                        */
/* ============================================================== */
function permissionsDetail(cols: string[], vals: string[]): DetailPayload {
  const name = vals[0] || "Withdrawal Access";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : pick(cols, vals, "new value") !== "—" ? pick(cols, vals, "new value") : "Enabled";
  return {
    title: `${name} — Permission record`,
    subtitle: "Current status, restriction rules, related accounts, change history and audit",
    pills: [
      { tone: "primary", label: "Permission" },
      {
        tone: status.toLowerCase().includes("enabled") || status.toLowerCase().includes("allowed")
          ? "success"
          : status.toLowerCase().includes("restrict") || status.toLowerCase().includes("disabled") || status.toLowerCase().includes("block")
          ? "destructive"
          : "warning",
        label: status,
      },
      { tone: "info", label: "VIP Trader" },
    ],
    sections: [
      {
        key: "overview",
        label: "Access Summary",
        fields: [
          { label: "Permission Profile", value: "VIP Trader" },
          { label: "Active Permissions", value: "28" },
          { label: "Restricted Features", value: "3", tone: "warning" },
          { label: "Trading Status", value: "Enabled", tone: "good" },
          { label: "Withdrawals", value: "Enabled", tone: "good" },
          { label: "Copy Trading", value: "Enabled", tone: "good" },
          { label: "IB Access", value: "Disabled" },
          { label: "Last Permission Change", value: "7 days ago" },
          { label: "Compliance Flags", value: "2 active", tone: "warning" },
          { label: "Feature Flags", value: "3 enabled" },
        ],
      },
      {
        key: "trading",
        label: "Trading Permissions",
        fields: [
          { label: "Open Trades", value: "Enabled", tone: "good" },
          { label: "Close Trades", value: "Enabled", tone: "good" },
          { label: "Modify Orders", value: "Enabled", tone: "good" },
          { label: "Create Pending Orders", value: "Enabled", tone: "good" },
          { label: "Expert Advisors (EA)", value: "Enabled", tone: "good" },
          { label: "Hedging", value: "Enabled", tone: "good" },
          { label: "Scalping", value: "Restricted", tone: "warning" },
          { label: "High Frequency Trading", value: "Disabled", tone: "bad" },
        ],
      },
      {
        key: "financial",
        label: "Financial Permissions",
        fields: [
          { label: "Deposit Funds", value: "Enabled", tone: "good" },
          { label: "Withdraw Funds", value: "Restricted — AML Review", tone: "bad" },
          { label: "Internal Transfers", value: "Enabled", tone: "good" },
          { label: "Bonus Eligibility", value: "Enabled", tone: "good" },
          { label: "Wallet Transfers", value: "Enabled", tone: "good" },
          { label: "Commission Withdrawals", value: "Enabled", tone: "good" },
          { label: "Profit Withdrawals", value: "Restricted", tone: "warning" },
        ],
      },
      {
        key: "platform",
        label: "Platform Access",
        fields: [
          { label: "MT4 Access", value: "Enabled", tone: "good" },
          { label: "MT5 Access", value: "Enabled", tone: "good" },
          { label: "WebTrader Access", value: "Enabled", tone: "good" },
          { label: "Mobile App Access", value: "Enabled", tone: "good" },
          { label: "API Access", value: "Disabled", tone: "warning" },
          { label: "FIX API Access", value: "Disabled", tone: "warning" },
        ],
      },
      {
        key: "copy",
        label: "Copy Trading",
        fields: [
          { label: "Become Provider", value: "Enabled", tone: "good" },
          { label: "Become Follower", value: "Enabled", tone: "good" },
          { label: "Create Strategy", value: "Disabled", tone: "warning" },
          { label: "Receive Followers", value: "Enabled", tone: "good" },
          { label: "Profit Sharing", value: "Enabled", tone: "good" },
          { label: "Provider Ranking Visibility", value: "Enabled", tone: "good" },
        ],
      },
      {
        key: "ib",
        label: "IB / Partner",
        fields: [
          { label: "Referral Program", value: "Enabled", tone: "good" },
          { label: "Commission Access", value: "Enabled", tone: "good" },
          { label: "Sub-IB Creation", value: "Disabled", tone: "warning" },
          { label: "Marketing Campaign Access", value: "Enabled", tone: "good" },
          { label: "Rebate Management", value: "Enabled", tone: "good" },
          { label: "Partner Portal", value: "Enabled", tone: "good" },
        ],
      },
      {
        key: "compliance",
        label: "Compliance Restrictions",
        tables: [
          {
            title: "Active compliance holds",
            columns: ["Restriction", "Status", "Since", "Case Ref", "Owner"],
            rows: [
              ["AML review — withdrawals blocked", "Active", "12 May 2026", "AML-2026-4421", "Compliance team"],
              ["Source of funds — document required", "Pending client upload", "10 May 2026", "SOF-2026-0510", "Compliance team"],
              ["KYC re-verification", "Scheduled", "—", "—", "KYC team"],
            ],
          },
        ],
      },
      {
        key: "geo",
        label: "Geographic Restrictions",
        tables: [
          {
            title: "Country status",
            columns: ["Country", "Code", "Status", "Reason"],
            rows: [
              ["United States", "US", "Blocked", "Jurisdiction restriction"],
              ["Iran", "IR", "Blocked", "Sanctions"],
              ["India", "IN", "Allowed", "—"],
              ["UAE", "AE", "Allowed", "—"],
              ["Nigeria", "NG", "Monitored", "Travel restriction"],
            ],
          },
        ],
      },
      {
        key: "instruments",
        label: "Instrument Access",
        fields: [
          { label: "Forex", value: "Enabled", tone: "good" },
          { label: "Indices", value: "Enabled", tone: "good" },
          { label: "Commodities", value: "Enabled", tone: "good" },
          { label: "Stocks", value: "Enabled", tone: "good" },
          { label: "Crypto", value: "Restricted", tone: "warning" },
          { label: "Options", value: "Disabled — risk monitoring", tone: "bad" },
          { label: "Futures", value: "Disabled", tone: "bad" },
        ],
      },
      {
        key: "leverage",
        label: "Leverage",
        fields: [
          { label: "Account (MT5-10291)", value: "1:100", tone: "warning" },
          { label: "Default Leverage", value: "1:500" },
          { label: "Maximum Allowed", value: "1:500" },
          { label: "Temporary Reduction", value: "Active — Risk team", tone: "warning" },
          { label: "Compliance Override", value: "None" },
          { label: "Reason", value: "High leverage XAUUSD pattern" },
        ],
      },
      {
        key: "flags",
        label: "Feature Flags",
        fields: [
          { label: "Beta Features", value: "Disabled" },
          { label: "VIP Features", value: "Enabled", tone: "good" },
          { label: "New Wallet System", value: "Enabled", tone: "good" },
          { label: "Advanced Analytics", value: "Enabled", tone: "good" },
          { label: "AI Trading Assistant", value: "Disabled" },
          { label: "Premium Reports", value: "Enabled", tone: "good" },
        ],
      },
      {
        key: "history",
        label: "Change History",
        tables: [
          {
            title: "Recent changes",
            columns: ["Permission", "Old", "New", "Changed By", "Date"],
            rows: [
              ["Withdrawal access", "Enabled", "Restricted", "Compliance", "12 May 10:12"],
              ["Leverage", "1:500", "1:100", "Risk team", "12 May 11:20"],
              ["Copy trading", "Disabled", "Enabled", "Admin", "15 May 15:10"],
              ["Profile", "Retail", "VIP", "Admin", "16 May 09:30"],
              ["Scalping", "Enabled", "Restricted", "Risk team", "11 May 14:22"],
            ],
          },
        ],
      },
      {
        key: "rules",
        label: "Restriction Rules",
        notes: [
          "Withdrawal restricted automatically when AML review is open.",
          "Leverage capped to 1:100 while account is in risk monitoring profile.",
          "Scalping restricted when toxic flow score exceeds 0.5.",
          "API & FIX access require manual compliance sign-off.",
        ],
      },
      {
        key: "related",
        label: "Related Accounts",
        tables: [
          {
            title: "Accounts inheriting this profile",
            columns: ["Account", "Platform", "Type", "Status"],
            rows: [
              ["MT5-10291", "MT5", "Live", "Restricted"],
              ["MT5-10344", "MT5", "Live", "Active"],
              ["MT4-77212", "MT4", "Demo", "Active"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Permission lifecycle",
            columns: ["Time", "Event", "By"],
            rows: [
              ["09:10", "KYC approved", "Compliance"],
              ["09:15", "Withdrawal access enabled", "Auto — KYC approved"],
              ["09:18", "MT5 access granted", "System"],
              ["09:40", "Copy trading enabled", "Admin"],
              ["10:20", "Leverage reduced 1:500 → 1:100", "Risk team"],
              ["11:05", "AML restriction applied", "Compliance"],
            ],
          },
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "View Permissions", value: "Safe" },
          { label: "Export Access Report", value: "Safe" },
          { label: "Enable Feature", value: "Moderate" },
          { label: "Disable Feature", value: "Moderate" },
          { label: "Adjust Leverage", value: "Moderate" },
          { label: "Suspend Trading", value: "Dangerous", tone: "bad" },
          { label: "Block Withdrawals", value: "Dangerous", tone: "bad" },
          { label: "Remove Copy Trading", value: "Dangerous", tone: "bad" },
          { label: "Disable IB Access", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Permission changes",
            columns: ["Action", "By", "Reason", "Time"],
            rows: [
              ["Withdrawal restricted", "Compliance", "AML open", "10:12"],
              ["Leverage reduced", "Risk team", "Risk flag", "11:20"],
              ["Copy trading disabled", "Admin", "Client request", "13:45"],
              ["Profile upgraded VIP", "Admin", "Volume tier", "15:10"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                      COMMUNICATION HISTORY                     */
/* ============================================================== */
function commsDetail(cols: string[], vals: string[]): DetailPayload {
  const subject = vals[0] || pick(cols, vals, "subject");
  const direction = pick(cols, vals, "direction");
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Delivered";
  const colsLc = cols.map((c) => c.toLowerCase()).join(" ");
  const subjLc = (subject || "").toLowerCase();
  const isCall = colsLc.includes("agent") || colsLc.includes("duration") || colsLc.includes("outcome") || subjLc.includes("call");
  const isSms = colsLc.includes("phone") || subjLc.includes("sms");
  const isChat = colsLc.includes("rating") || subjLc.includes("chat");
  const channel = isCall ? "Call" : isSms ? "SMS" : isChat ? "Live Chat" : "Email";
  return {
    title: `${channel} — ${subject || "Communication"}`,
    subtitle: "Full message lifecycle, delivery, engagement, escalation and audit",
    pills: [
      { tone: "primary", label: channel },
      {
        tone: status.toLowerCase().includes("fail")
          ? "destructive"
          : status.toLowerCase().includes("open") || status.toLowerCase().includes("click")
          ? "success"
          : "info",
        label: status,
      },
      { tone: "warning", label: direction !== "—" ? direction : "Outbound" },
    ],
    sections: [
      {
        key: "overview",
        label: "Communication Summary",
        fields: [
          { label: "Total Emails", value: "284" },
          { label: "Total SMS", value: "142" },
          { label: "Total Calls", value: "32" },
          { label: "Total Chats", value: "14" },
          { label: "Unread Messages", value: "7", tone: "warning" },
          { label: "Failed Deliveries", value: "3", tone: "bad" },
          { label: "Last Communication", value: "Today 09:10" },
          { label: "Response Rate", value: "92%", tone: "good" },
          { label: "Avg Response Time", value: "18 min", tone: "good" },
          { label: "Preferred Channel", value: "WhatsApp" },
        ],
      },
      {
        key: "details",
        label: `${channel} Overview`,
        fields: [
          { label: `${channel} ID`, value: channel === "Email" ? "EML-20260602-4821" : channel === "SMS" ? "SMS-20260602-3120" : channel === "Call" ? "CALL-20260602-0842" : "CHT-20260602-1422" },
          { label: "Subject", value: subject || "—" },
          { label: "Direction", value: direction !== "—" ? direction : "Outbound" },
          { label: "Status", value: status },
          { label: "Department", value: pick(cols, vals, "dept") !== "—" ? pick(cols, vals, "dept") : "Finance" },
          { label: "Sent Time", value: "Today 09:10" },
          { label: "Channel", value: channel },
          { label: "Priority", value: "High", tone: "warning" },
        ],
      },
      {
        key: "parties",
        label: "Sender & Recipient",
        fields: [
          { label: "Sender Name", value: "Support L2 — Meera Shah" },
          { label: "Sender Email", value: "support@broker.com" },
          { label: "Recipient Name", value: "Ahmed Al-Rashidi" },
          { label: "Recipient Email", value: "ahmed.r@email.com" },
          { label: "Reply-To", value: "support@broker.com" },
          { label: "CC", value: "finance@broker.com" },
          { label: "BCC", value: "audit@broker.com" },
        ],
      },
      {
        key: "content",
        label: "Full Content",
        notes: [
          "Dear Ahmed,",
          "Your withdrawal request TKT-4821 for $4,500 has been received and is currently in processing.",
          "Treasury has confirmed SWIFT dispatch with reference SWIFT-AR4120-0601.",
          "Estimated arrival: 24-48 hours to your registered ICICI account ending 4421.",
          "Reply to this thread if you need any further assistance.",
          "— Support L2, Meera Shah",
        ],
      },
      {
        key: "attachments",
        label: "Attachments",
        tables: [
          {
            title: "Files in this message",
            columns: ["Name", "Type", "Size", "Scanned"],
            rows: [
              ["SWIFT-receipt.pdf", "PDF", "184 KB", "Clean"],
              ["statement-may-2026.pdf", "PDF", "412 KB", "Clean"],
            ],
          },
        ],
      },
      {
        key: "delivery",
        label: "Delivery Tracking",
        fields: [
          { label: "Status", value: status, tone: "good" },
          { label: "Delivered At", value: "Today 09:10" },
          { label: "Provider", value: "SendGrid" },
          { label: "Message-ID", value: "<eml-4821@broker.com>" },
          { label: "Bounce", value: "None", tone: "good" },
          { label: "Spam Score", value: "0.4 / 10", tone: "good" },
        ],
      },
      {
        key: "engagement",
        label: "Engagement",
        fields: [
          { label: "Open Count", value: "2 opens" },
          { label: "Click Count", value: "0 clicks" },
          { label: "Last Opened", value: "Today 09:14" },
          { label: "Device Opened", value: "iPhone 15 Pro" },
          { label: "Geo Opened", value: "Dubai, UAE" },
          { label: "Reply Received", value: "No" },
        ],
      },
      {
        key: "transcript",
        label: "Transcript / Recording",
        notes: [
          channel === "Call"
            ? "Call recording — 8m 42s · CALL-20260602-0842.mp3 · Secure playback. Recording access requires manager permission. Playback is logged."
            : channel === "Live Chat"
            ? "Client — 15:10: Hi, my withdrawal hasn't arrived.\nAgent — 15:11: Let me check with treasury, one moment.\nAgent — 15:14: Sent via SWIFT, ETA 24h.\nClient — 15:16: OK thank you for the quick response."
            : "No transcript available for this channel.",
        ],
      },
      {
        key: "linked",
        label: "Linked Records",
        fields: [
          { label: "Related Ticket", value: "TKT-4821" },
          { label: "Related Campaign", value: "VIP Onboarding 2026" },
          { label: "Related Account", value: "MT5-100421" },
          { label: "Related Withdrawal", value: "WD-9921 · $4,500" },
          { label: "Related Note", value: "NOTE-8821" },
        ],
      },
      {
        key: "escalations",
        label: "Escalations",
        notes: [
          channel === "Live Chat"
            ? "No escalations during this chat session. Issue resolved at Support L2 level."
            : "Escalated to Finance team at 14:30 — SLA breach risk on withdrawal delay.",
        ],
      },
      {
        key: "preferences",
        label: "Client Preferences",
        fields: [
          { label: "Preferred Channel", value: "WhatsApp" },
          { label: "Marketing Consent", value: "Yes", tone: "good" },
          { label: "Email Consent", value: "Yes", tone: "good" },
          { label: "SMS Consent", value: "Yes", tone: "good" },
          { label: "WhatsApp Consent", value: "Yes", tone: "good" },
          { label: "Push Notification Consent", value: "Yes", tone: "good" },
          { label: "Language", value: "Arabic / English" },
        ],
      },
      {
        key: "analytics",
        label: "Communication Analytics",
        fields: [
          { label: "Total Volume (90d)", value: "472 messages" },
          { label: "Inbound vs Outbound", value: "62% / 38%" },
          { label: "Avg Resolution Time", value: "1h 12m", tone: "good" },
          { label: "Customer Sentiment", value: "Positive (4.6/5)", tone: "good" },
          { label: "Topic Cluster", value: "Withdrawals, KYC, VIP" },
        ],
      },
      {
        key: "risk",
        label: "Risk Flags",
        fields: [
          { label: "Unreachable Client", value: "No", tone: "good" },
          { label: "Email Bounce Detected", value: "No", tone: "good" },
          { label: "Invalid Phone Number", value: "No", tone: "good" },
          { label: "Marketing Opt-Out", value: "No", tone: "good" },
          { label: "Spam Complaint", value: "No", tone: "good" },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Communication thread",
            columns: ["Time", "Event"],
            rows: [
              ["09:00", "Email sent"],
              ["09:05", "Email opened"],
              ["09:10", "SMS delivered"],
              ["09:15", "Support chat started"],
              ["09:40", "Call completed"],
              ["10:10", "Campaign email clicked"],
            ],
          },
        ],
      },
      {
        key: "notes",
        label: "Notes",
        notes: [
          "Prefers WhatsApp for non-transactional updates.",
          "VIP communication required — manager CC on all replies.",
          "Avoid marketing emails between 10pm–6am client time.",
          "Call before withdrawal approval over $10k.",
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "Assign Agent", value: "Moderate" },
          { label: "Send Message", value: "Moderate" },
          { label: "Create Ticket", value: "Moderate" },
          { label: "Block Communication", value: "Dangerous", tone: "bad" },
          { label: "Revoke Consent", value: "Dangerous", tone: "bad" },
          { label: "Delete Thread", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "Lifecycle",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Email composed", "Support L2", "09:05"],
              ["Email sent", "System", "09:10"],
              ["Email viewed by agent", "Finance L2", "09:15"],
              ["Email opened 1st", "Client", "09:12"],
              ["Email opened 2nd", "Client", "09:14"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                              NOTES                             */
/* ============================================================== */
function notesDetail(cols: string[], vals: string[]): DetailPayload {
  const id = vals[0] || "NOTE-8821";
  const subject = pick(cols, vals, "subject") !== "—" ? pick(cols, vals, "subject") : "High leverage XAUUSD alert";
  const priority = pick(cols, vals, "priority") !== "—" ? pick(cols, vals, "priority") : "Critical";
  const status = pick(cols, vals, "status") !== "—" ? pick(cols, vals, "status") : "Open";
  return {
    title: `${id} — ${subject}`,
    subtitle: "Full internal note — context, comments, related records, attachments and history",
    pills: [
      { tone: "primary", label: "Risk Note" },
      {
        tone: priority.toLowerCase().includes("critical") || priority.toLowerCase().includes("high")
          ? "destructive"
          : "warning",
        label: priority,
      },
      { tone: status.toLowerCase().includes("open") ? "warning" : "success", label: status },
      { tone: "info", label: "Pinned" },
    ],
    sections: [
      {
        key: "overview",
        label: "Note Overview",
        fields: [
          { label: "Note ID", value: id },
          { label: "Category", value: "Risk" },
          { label: "Sub-Category", value: "High leverage trading" },
          { label: "Priority", value: priority, tone: "bad" },
          { label: "Severity", value: "Critical", tone: "bad" },
          { label: "Status", value: status, tone: "warning" },
          { label: "Risk Score", value: "88 / 100", tone: "bad" },
          { label: "Risk Level", value: "High risk", tone: "bad" },
          { label: "Alert Source", value: "Risk engine (automated)" },
          { label: "Review Status", value: "Under review", tone: "warning" },
          { label: "Created By", value: "Risk engine" },
          { label: "Assigned To", value: "Compliance team" },
          { label: "Visibility", value: "Internal — all teams" },
          { label: "Created Date", value: "14 May 2026" },
          { label: "Last Updated", value: "Today 10:30" },
        ],
      },
      {
        key: "summary",
        label: "Notes Summary (Client)",
        fields: [
          { label: "Total Notes", value: "82" },
          { label: "Open Notes", value: "14", tone: "warning" },
          { label: "Closed Notes", value: "68", tone: "good" },
          { label: "High Priority Notes", value: "7", tone: "bad" },
          { label: "Follow-Ups Pending", value: "4", tone: "warning" },
          { label: "Risk Notes", value: "8" },
          { label: "Compliance Notes", value: "5" },
          { label: "Last Note Added", value: "2 hours ago" },
          { label: "Last Updated By", value: "Priya Nair" },
        ],
      },
      {
        key: "full",
        label: "Full Note",
        notes: [
          "Client opened 38 high-leverage XAUUSD positions within 12 minutes on account MT5-10291.",
          "Risk monitoring system generated automated alert. Risk score increased from 62 to 88.",
          "Manual review required by dealing desk and compliance team. Potential excessive exposure.",
          "Trading activity appears consistent with Martingale strategy pattern — further investigation required before any withdrawal release.",
        ],
      },
      {
        key: "comments",
        label: "Comments & Discussion",
        tables: [
          {
            title: "Thread",
            columns: ["Author", "Department", "Comment", "Time"],
            rows: [
              ["Risk team", "Risk", "Exposure review completed. 38 positions totalling 12 lots on XAUUSD. Margin usage at 94%. Flagged to compliance and dealing desk.", "Today 09:20"],
              ["Compliance", "Compliance", "SOF documents requested from client. Awaiting response. Withdrawal hold confirmed until review completed.", "Today 10:00"],
              ["Finance", "Finance", "Withdrawal of $15,000 placed on hold pending compliance clearance. TXN-88231 frozen.", "Today 10:20"],
              ["VIP Team", "VIP", "Manager call scheduled with client for 14:00. Will gather context on trading rationale.", "Today 10:45"],
            ],
          },
        ],
      },
      {
        key: "accounts",
        label: "Related Accounts",
        tables: [
          {
            title: "Linked accounts",
            columns: ["Account", "Platform", "Status"],
            rows: [
              ["MT5-10291", "MT5", "Trading restricted"],
              ["MT5-10344", "MT5", "Active"],
              ["MT4-77212", "MT4", "Demo"],
            ],
          },
        ],
      },
      {
        key: "trades",
        label: "Related Trades",
        tables: [
          {
            title: "Flagged trades",
            columns: ["Ticket", "Symbol", "Side", "Lots", "Status"],
            rows: [
              ["#892311", "XAUUSD", "Buy", "5.00", "Open"],
              ["#892355", "XAUUSD", "Buy", "2.00", "Open"],
              ["#892400", "XAUUSD", "Buy", "1.50", "Closed"],
              ["#892422", "XAUUSD", "Buy", "3.00", "Open"],
            ],
          },
        ],
      },
      {
        key: "transactions",
        label: "Related Transactions",
        tables: [
          {
            title: "Linked transactions",
            columns: ["TXN ID", "Type", "Amount", "Status"],
            rows: [
              ["TXN-88231", "Withdrawal", "$15,000", "Held"],
              ["TXN-88102", "Deposit", "$25,000", "Cleared"],
              ["TXN-87900", "Internal Transfer", "$5,000", "Completed"],
            ],
          },
        ],
      },
      {
        key: "tickets",
        label: "Related Tickets",
        tables: [
          {
            title: "Open / recent",
            columns: ["Ticket", "Subject", "Status"],
            rows: [
              ["TKT-4821", "Withdrawal status — $15,000", "Pending compliance"],
              ["TKT-4790", "SOF documents request", "Awaiting client"],
            ],
          },
        ],
      },
      {
        key: "aml",
        label: "AML / KYC Cases",
        tables: [
          {
            title: "Open cases",
            columns: ["Case Ref", "Type", "Status", "Owner"],
            rows: [
              ["AML-2026-4421", "AML review", "Active", "Compliance"],
              ["SOF-2026-0510", "Source of funds", "Pending upload", "Compliance"],
              ["KYC-2026-0204", "Re-verification", "Scheduled", "KYC team"],
            ],
          },
        ],
      },
      {
        key: "campaigns",
        label: "Related Campaigns",
        tables: [
          {
            title: "Campaigns this client is in",
            columns: ["Campaign"],
            rows: [["VIP Cashback"], ["Gold Trading Promotion"]],
          },
        ],
      },
      {
        key: "attachments",
        label: "Attachments",
        tables: [
          {
            title: "Files",
            columns: ["Name", "Type", "Size", "Uploaded By"],
            rows: [
              ["risk-snapshot-2026-05-14.pdf", "PDF", "412 KB", "Risk engine"],
              ["margin-report.xlsx", "XLSX", "84 KB", "Risk team"],
              ["client-statement.pdf", "PDF", "248 KB", "Finance"],
            ],
          },
        ],
      },
      {
        key: "followups",
        label: "Follow-Up Tasks",
        tables: [
          {
            title: "Outstanding actions",
            columns: ["Task", "Owner", "Due", "Status"],
            rows: [
              ["Collect SOF documents", "Compliance", "20 May", "Pending"],
              ["Review trading — dealing desk sign-off", "Risk team", "22 May", "In progress"],
              ["Schedule VIP manager call", "VIP team", "18 May", "Done"],
              ["Decide on withdrawal release", "Finance L2", "25 May", "Blocked"],
            ],
          },
        ],
      },
      {
        key: "timeline",
        label: "Timeline",
        tables: [
          {
            title: "Note lifecycle",
            columns: ["Time", "Event"],
            rows: [
              ["09:10", "Note created"],
              ["09:20", "Risk team comment added"],
              ["10:00", "Compliance comment added"],
              ["10:20", "Withdrawal placed on hold"],
              ["10:30", "Note edited — priority updated"],
              ["10:45", "Legal hold activated"],
            ],
          },
        ],
      },
      {
        key: "history",
        label: "Note History",
        tables: [
          {
            title: "Modifications",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Note created", "Risk engine", "14 May 09:10"],
              ["Comment added", "Risk team", "Today 09:20"],
              ["Priority changed Medium → Critical", "Risk team", "Today 10:30"],
              ["Status changed Open → Under review", "Compliance", "Today 10:00"],
              ["Attachment added", "Risk team", "Today 10:25"],
            ],
          },
        ],
      },
      {
        key: "admin",
        label: "Admin Actions",
        fields: [
          { label: "Add Note", value: "Safe" },
          { label: "Edit Note", value: "Safe" },
          { label: "Add Comment", value: "Safe" },
          { label: "Reassign Note", value: "Moderate" },
          { label: "Change Priority", value: "Moderate" },
          { label: "Pin / Unpin", value: "Moderate" },
          { label: "Delete Note", value: "Dangerous", tone: "bad" },
          { label: "Bulk Delete", value: "Dangerous", tone: "bad" },
        ],
      },
      {
        key: "audit",
        label: "Audit Trail",
        tables: [
          {
            title: "All modifications",
            columns: ["Action", "By", "Time"],
            rows: [
              ["Note created", "Support", "09:10"],
              ["Priority updated", "Risk team", "10:30"],
              ["Legal hold activated", "Compliance", "10:45"],
              ["Comment added", "Finance", "10:20"],
              ["Attachment uploaded", "Risk team", "10:25"],
            ],
          },
        ],
      },
    ],
  };
}

/* ============================================================== */
/*                          DISPATCHER                            */
/* ============================================================== */
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
  if (ctx.includes("commission")) return commissionsDetail(columns, values);
  if (ctx.includes("analytic")) return analyticsDetail(columns, values);
  if (ctx.includes("marketing") || ctx.includes("campaign")) return marketingDetail(columns, values);
  if (ctx.includes("permission")) return permissionsDetail(columns, values);
  if (ctx.includes("comm") || ctx.includes("email") || ctx.includes("sms") || ctx.includes("chat") || ctx.includes("call")) return commsDetail(columns, values);
  if (ctx.includes("note")) return notesDetail(columns, values);
  if (ctx.includes("ib")) return ibDetail(columns, values);
  if (ctx.includes("referral")) return referralDetail(columns, values);

  // Generic fallback — split row data into Overview + Notes
  return {
    title: values[0] || "Record",
    subtitle: `${context} record · full detail`,
    pills: [{ tone: "primary", label: context }],
    sections: [
      {
        key: "overview",
        label: "Overview",
        fields: columns.map((c, i) => ({ label: c, value: values[i] || "—" })),
      },
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
