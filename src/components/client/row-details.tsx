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
