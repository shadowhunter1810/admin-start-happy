// Mock data + types for the Security & Sessions module.
// All timestamps are ISO strings; ids are stable for demo.

export type Severity = "low" | "medium" | "high" | "critical";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type AlertStatus = "open" | "investigating" | "resolved" | "closed";
export type SessionStatus = "active" | "idle" | "terminated" | "blocked";

export const CLIENT = {
  name: "Arjun Mehta",
  id: "CL-948271",
  email: "arjun.mehta@northcap.io",
  phone: "+91 98765 41203",
  country: "India",
  accountStatus: "Active" as "Active" | "Suspended" | "Closed",
  kycStatus: "Verified" as "Verified" | "Pending" | "Rejected",
  riskLevel: "medium" as RiskLevel,
  securityScore: 72,
  lastLogin: "2026-06-20T05:42:00Z",
  joined: "2023-11-14",
  tier: "Gold",
  ibTag: "IB Partner — Tier 2",
};

export const KPIS = {
  securityScore: 72,
  activeSessions: 4,
  trustedDevices: 6,
  alerts: 3,
  failedLogins: 12,
  lastLoginHours: 2,
  twoFA: true,
  vpnDetected: true,
  torDetected: false,
  deviceSharingRisk: "medium" as RiskLevel,
};

export const SCORE_FACTORS = [
  { label: "2FA Enabled", impact: +18, status: "good" },
  { label: "Failed Logins (12 in 7d)", impact: -6, status: "warn" },
  { label: "VPN Usage Detected", impact: -8, status: "warn" },
  { label: "TOR Usage", impact: 0, status: "good" },
  { label: "Device Sharing (2 accts)", impact: -5, status: "warn" },
  { label: "Recent Password Reset", impact: -2, status: "warn" },
  { label: "Open Security Alerts", impact: -7, status: "bad" },
  { label: "Multi-country Logins (3)", impact: -4, status: "warn" },
  { label: "Brute Force Attempts", impact: -3, status: "bad" },
  { label: "Hardware Key Registered", impact: +9, status: "good" },
];

export const SCORE_HISTORY = [
  { d: "Jun 13", score: 81 },
  { d: "Jun 14", score: 79 },
  { d: "Jun 15", score: 77 },
  { d: "Jun 16", score: 74 },
  { d: "Jun 17", score: 76 },
  { d: "Jun 18", score: 73 },
  { d: "Jun 19", score: 72 },
];

export const AUTH_STATUS = [
  { factor: "Email Verified", status: "Verified", detail: "arjun.mehta@northcap.io", updated: "2023-11-14" },
  { factor: "Phone Verified", status: "Verified", detail: "+91 98765 41203", updated: "2023-11-14" },
  { factor: "2FA Enabled", status: "Verified", detail: "Google Authenticator", updated: "2024-03-02" },
  { factor: "Biometric Login", status: "Verified", detail: "Face ID — iPhone 15 Pro", updated: "2025-08-21" },
  { factor: "Recovery Email", status: "Pending", detail: "arjun.backup@proton.me", updated: "2026-05-18" },
  { factor: "Recovery Phone", status: "Verified", detail: "+91 98201 00091", updated: "2024-06-12" },
  { factor: "Backup Codes", status: "Verified", detail: "8 of 10 remaining", updated: "2025-12-04" },
  { factor: "Hardware Key", status: "Verified", detail: "YubiKey 5C NFC", updated: "2025-09-09" },
  { factor: "Password Age", status: "Pending", detail: "98 days old", updated: "2026-03-14" },
  { factor: "Password Strength", status: "Verified", detail: "Strong (entropy 92)", updated: "2026-03-14" },
  { factor: "Session Timeout Policy", status: "Verified", detail: "30 min idle / 12 h max", updated: "2025-01-01" },
];

export type Session = {
  id: string;
  device: string;
  os: string;
  browser: string;
  ip: string;
  country: string;
  city: string;
  isp: string;
  loginAt: string;
  lastActivity: string;
  vpn: boolean;
  tor: boolean;
  datacenter: boolean;
  risk: number; // 0-100
  status: SessionStatus;
  flags: string[];
};

export const SESSIONS: Session[] = [
  {
    id: "SES-9F23A1",
    device: "MacBook Pro 16",
    os: "macOS 14.5",
    browser: "Chrome 126",
    ip: "103.21.244.78",
    country: "India",
    city: "Mumbai",
    isp: "Tata Communications",
    loginAt: "2026-06-20T05:42:00Z",
    lastActivity: "2026-06-20T07:18:00Z",
    vpn: false,
    tor: false,
    datacenter: false,
    risk: 12,
    status: "active",
    flags: ["Trusted Device"],
  },
  {
    id: "SES-7B12CD",
    device: "iPhone 15 Pro",
    os: "iOS 17.5",
    browser: "Safari Mobile",
    ip: "49.205.88.12",
    country: "India",
    city: "Bengaluru",
    isp: "Jio Infocomm",
    loginAt: "2026-06-20T03:11:00Z",
    lastActivity: "2026-06-20T07:02:00Z",
    vpn: false,
    tor: false,
    datacenter: false,
    risk: 8,
    status: "active",
    flags: ["Trusted Device", "Biometric"],
  },
  {
    id: "SES-44A0E9",
    device: "Windows Desktop",
    os: "Windows 11",
    browser: "Edge 125",
    ip: "185.220.101.45",
    country: "Germany",
    city: "Frankfurt",
    isp: "Hetzner Online",
    loginAt: "2026-06-19T22:09:00Z",
    lastActivity: "2026-06-20T06:54:00Z",
    vpn: true,
    tor: false,
    datacenter: true,
    risk: 78,
    status: "active",
    flags: ["VPN", "Datacenter IP", "Unknown Device"],
  },
  {
    id: "SES-2C81F0",
    device: "Samsung Galaxy S24",
    os: "Android 14",
    browser: "Chrome Mobile",
    ip: "27.97.16.211",
    country: "United Arab Emirates",
    city: "Dubai",
    isp: "Etisalat",
    loginAt: "2026-06-20T06:30:00Z",
    lastActivity: "2026-06-20T06:48:00Z",
    vpn: false,
    tor: false,
    datacenter: false,
    risk: 64,
    status: "active",
    flags: ["Multiple Countries", "New Device"],
  },
  {
    id: "SES-018BAA",
    device: "Linux Workstation",
    os: "Ubuntu 22.04",
    browser: "Firefox 128",
    ip: "171.25.193.78",
    country: "Sweden",
    city: "Stockholm",
    isp: "Tor Exit Node",
    loginAt: "2026-06-18T19:21:00Z",
    lastActivity: "2026-06-18T19:34:00Z",
    vpn: false,
    tor: true,
    datacenter: true,
    risk: 96,
    status: "terminated",
    flags: ["TOR", "Datacenter IP", "Account Takeover Risk"],
  },
  {
    id: "SES-66E1B3",
    device: "iPad Pro 12.9",
    os: "iPadOS 17.5",
    browser: "Safari",
    ip: "103.21.244.79",
    country: "India",
    city: "Mumbai",
    isp: "Tata Communications",
    loginAt: "2026-06-19T14:02:00Z",
    lastActivity: "2026-06-19T16:11:00Z",
    vpn: false,
    tor: false,
    datacenter: false,
    risk: 18,
    status: "idle",
    flags: ["Trusted Device"],
  },
];

export type LoginEvent = {
  id: string;
  time: string;
  device: string;
  browser: string;
  os: string;
  ip: string;
  country: string;
  city: string;
  result: "success" | "failed" | "blocked";
  twoFA: "passed" | "failed" | "skipped";
  risk: number;
  vpn: boolean;
  tor: boolean;
};

export const LOGINS: LoginEvent[] = [
  { id: "LOG-1001", time: "2026-06-20T05:42:00Z", device: "MacBook Pro 16", browser: "Chrome 126", os: "macOS 14.5", ip: "103.21.244.78", country: "India", city: "Mumbai", result: "success", twoFA: "passed", risk: 10, vpn: false, tor: false },
  { id: "LOG-1000", time: "2026-06-20T03:11:00Z", device: "iPhone 15 Pro", browser: "Safari", os: "iOS 17.5", ip: "49.205.88.12", country: "India", city: "Bengaluru", result: "success", twoFA: "passed", risk: 8, vpn: false, tor: false },
  { id: "LOG-0999", time: "2026-06-19T22:09:00Z", device: "Windows Desktop", browser: "Edge", os: "Win 11", ip: "185.220.101.45", country: "Germany", city: "Frankfurt", result: "success", twoFA: "passed", risk: 78, vpn: true, tor: false },
  { id: "LOG-0998", time: "2026-06-19T19:48:00Z", device: "Unknown", browser: "curl/8.6", os: "Linux", ip: "45.83.91.220", country: "Netherlands", city: "Amsterdam", result: "blocked", twoFA: "failed", risk: 94, vpn: true, tor: false },
  { id: "LOG-0997", time: "2026-06-19T19:46:00Z", device: "Unknown", browser: "curl/8.6", os: "Linux", ip: "45.83.91.220", country: "Netherlands", city: "Amsterdam", result: "failed", twoFA: "failed", risk: 94, vpn: true, tor: false },
  { id: "LOG-0996", time: "2026-06-19T19:45:00Z", device: "Unknown", browser: "python-requests", os: "Linux", ip: "45.83.91.220", country: "Netherlands", city: "Amsterdam", result: "failed", twoFA: "failed", risk: 96, vpn: true, tor: false },
  { id: "LOG-0995", time: "2026-06-18T19:21:00Z", device: "Linux Workstation", browser: "Firefox 128", os: "Ubuntu 22.04", ip: "171.25.193.78", country: "Sweden", city: "Stockholm", result: "success", twoFA: "passed", risk: 96, vpn: false, tor: true },
  { id: "LOG-0994", time: "2026-06-18T11:09:00Z", device: "iPhone 15 Pro", browser: "Safari", os: "iOS 17.5", ip: "49.205.88.12", country: "India", city: "Bengaluru", result: "success", twoFA: "passed", risk: 6, vpn: false, tor: false },
  { id: "LOG-0993", time: "2026-06-17T08:32:00Z", device: "MacBook Pro 16", browser: "Chrome 126", os: "macOS 14.4", ip: "103.21.244.78", country: "India", city: "Mumbai", result: "success", twoFA: "passed", risk: 11, vpn: false, tor: false },
  { id: "LOG-0992", time: "2026-06-16T22:14:00Z", device: "Windows Desktop", browser: "Edge", os: "Win 11", ip: "185.220.101.45", country: "Germany", city: "Frankfurt", result: "failed", twoFA: "failed", risk: 72, vpn: true, tor: false },
  { id: "LOG-0991", time: "2026-06-16T22:13:00Z", device: "Windows Desktop", browser: "Edge", os: "Win 11", ip: "185.220.101.45", country: "Germany", city: "Frankfurt", result: "failed", twoFA: "skipped", risk: 70, vpn: true, tor: false },
  { id: "LOG-0990", time: "2026-06-15T07:22:00Z", device: "iPad Pro", browser: "Safari", os: "iPadOS 17.5", ip: "103.21.244.79", country: "India", city: "Mumbai", result: "success", twoFA: "passed", risk: 14, vpn: false, tor: false },
];

export type Device = {
  id: string;
  name: string;
  type: "Desktop" | "Mobile" | "Tablet" | "Server";
  os: string;
  fingerprint: string;
  firstSeen: string;
  lastSeen: string;
  trusted: boolean;
  risk: RiskLevel;
  accounts: number;
  flags: string[];
};

export const DEVICES: Device[] = [
  { id: "DEV-A1", name: "MacBook Pro 16 — Arjun", type: "Desktop", os: "macOS 14.5", fingerprint: "fp_3a91c0e8b7d4", firstSeen: "2023-11-14", lastSeen: "2026-06-20", trusted: true, risk: "low", accounts: 1, flags: [] },
  { id: "DEV-A2", name: "iPhone 15 Pro", type: "Mobile", os: "iOS 17.5", fingerprint: "fp_77af12cc9b01", firstSeen: "2024-01-09", lastSeen: "2026-06-20", trusted: true, risk: "low", accounts: 1, flags: ["Biometric"] },
  { id: "DEV-A3", name: "iPad Pro 12.9", type: "Tablet", os: "iPadOS 17.5", fingerprint: "fp_91b2ee30aa55", firstSeen: "2024-05-22", lastSeen: "2026-06-19", trusted: true, risk: "low", accounts: 1, flags: [] },
  { id: "DEV-B1", name: "Windows Desktop — Frankfurt", type: "Desktop", os: "Windows 11", fingerprint: "fp_de44091188cc", firstSeen: "2026-05-28", lastSeen: "2026-06-20", trusted: false, risk: "high", accounts: 2, flags: ["New Device", "VPN", "Device Sharing"] },
  { id: "DEV-B2", name: "Samsung Galaxy S24", type: "Mobile", os: "Android 14", fingerprint: "fp_2bbf7c109a12", firstSeen: "2026-06-15", lastSeen: "2026-06-20", trusted: false, risk: "medium", accounts: 1, flags: ["New Device", "Rooted"] },
  { id: "DEV-X1", name: "Tor Workstation", type: "Server", os: "Ubuntu 22.04", fingerprint: "fp_0099aa44bbcc", firstSeen: "2026-06-18", lastSeen: "2026-06-18", trusted: false, risk: "critical", accounts: 1, flags: ["TOR", "Suspicious"] },
  { id: "DEV-C1", name: "MacBook Air — Office", type: "Desktop", os: "macOS 13.6", fingerprint: "fp_5f1190b2e9a0", firstSeen: "2024-09-02", lastSeen: "2026-06-12", trusted: true, risk: "low", accounts: 1, flags: [] },
];

export type IPRecord = {
  ip: string;
  country: string;
  city: string;
  isp: string;
  connection: "Broadband" | "Mobile" | "Datacenter" | "Business";
  risk: RiskLevel;
  vpn: boolean;
  proxy: boolean;
  tor: boolean;
  datacenter: boolean;
  firstSeen: string;
  lastSeen: string;
  hits: number;
};

export const IPS: IPRecord[] = [
  { ip: "103.21.244.78", country: "India", city: "Mumbai", isp: "Tata Communications", connection: "Broadband", risk: "low", vpn: false, proxy: false, tor: false, datacenter: false, firstSeen: "2023-11-14", lastSeen: "2026-06-20", hits: 482 },
  { ip: "49.205.88.12", country: "India", city: "Bengaluru", isp: "Jio Infocomm", connection: "Mobile", risk: "low", vpn: false, proxy: false, tor: false, datacenter: false, firstSeen: "2024-01-09", lastSeen: "2026-06-20", hits: 311 },
  { ip: "185.220.101.45", country: "Germany", city: "Frankfurt", isp: "Hetzner Online", connection: "Datacenter", risk: "high", vpn: true, proxy: true, tor: false, datacenter: true, firstSeen: "2026-05-28", lastSeen: "2026-06-20", hits: 24 },
  { ip: "27.97.16.211", country: "UAE", city: "Dubai", isp: "Etisalat", connection: "Mobile", risk: "medium", vpn: false, proxy: false, tor: false, datacenter: false, firstSeen: "2026-06-20", lastSeen: "2026-06-20", hits: 3 },
  { ip: "171.25.193.78", country: "Sweden", city: "Stockholm", isp: "Tor Exit Node", connection: "Datacenter", risk: "critical", vpn: false, proxy: false, tor: true, datacenter: true, firstSeen: "2026-06-18", lastSeen: "2026-06-18", hits: 1 },
  { ip: "45.83.91.220", country: "Netherlands", city: "Amsterdam", isp: "M247 Europe", connection: "Datacenter", risk: "critical", vpn: true, proxy: true, tor: false, datacenter: true, firstSeen: "2026-06-19", lastSeen: "2026-06-19", hits: 18 },
  { ip: "103.21.244.79", country: "India", city: "Mumbai", isp: "Tata Communications", connection: "Broadband", risk: "low", vpn: false, proxy: false, tor: false, datacenter: false, firstSeen: "2024-05-22", lastSeen: "2026-06-19", hits: 96 },
];

export type GeoEvent = {
  id: string;
  time: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  risk: RiskLevel;
  note: string;
};

export const GEO_EVENTS: GeoEvent[] = [
  { id: "GEO-1", time: "2026-06-20T03:11:00Z", country: "India", city: "Bengaluru", lat: 12.97, lng: 77.59, risk: "low", note: "Mobile login" },
  { id: "GEO-2", time: "2026-06-20T05:42:00Z", country: "India", city: "Mumbai", lat: 19.07, lng: 72.87, risk: "low", note: "Desktop login" },
  { id: "GEO-3", time: "2026-06-20T06:30:00Z", country: "UAE", city: "Dubai", lat: 25.20, lng: 55.27, risk: "medium", note: "New country" },
  { id: "GEO-4", time: "2026-06-19T22:09:00Z", country: "Germany", city: "Frankfurt", lat: 50.11, lng: 8.68, risk: "high", note: "VPN exit" },
  { id: "GEO-5", time: "2026-06-18T19:21:00Z", country: "Sweden", city: "Stockholm", lat: 59.33, lng: 18.06, risk: "critical", note: "TOR exit" },
];

export const IMPOSSIBLE_TRAVEL = [
  {
    id: "IT-1",
    from: { time: "2026-06-20T05:42:00Z", city: "Mumbai", country: "India" },
    to: { time: "2026-06-20T06:30:00Z", city: "Dubai", country: "UAE" },
    distanceKm: 1942,
    minutes: 48,
    requiredKmh: 2427,
    verdict: "Impossible Travel",
    risk: "critical" as RiskLevel,
  },
];

export type SecurityAlert = {
  id: string;
  type: string;
  severity: Severity;
  status: AlertStatus;
  created: string;
  assignee: string;
  summary: string;
};

export const ALERTS: SecurityAlert[] = [
  { id: "ALR-2041", type: "Impossible Travel", severity: "critical", status: "investigating", created: "2026-06-20T06:32:00Z", assignee: "Priya Nair", summary: "Mumbai → Dubai in 48 minutes" },
  { id: "ALR-2040", type: "TOR Login", severity: "critical", status: "open", created: "2026-06-18T19:22:00Z", assignee: "Unassigned", summary: "Login from known Tor exit node in Stockholm" },
  { id: "ALR-2039", type: "Brute Force Attack", severity: "high", status: "open", created: "2026-06-19T19:48:00Z", assignee: "Rahul S.", summary: "6 failed logins from 45.83.91.220" },
  { id: "ALR-2038", type: "VPN Usage", severity: "medium", status: "investigating", created: "2026-06-19T22:10:00Z", assignee: "Priya Nair", summary: "Persistent VPN sessions from Hetzner" },
  { id: "ALR-2037", type: "Device Sharing", severity: "medium", status: "open", created: "2026-06-15T09:11:00Z", assignee: "Fraud Bot", summary: "Fingerprint fp_de44091188cc seen on 2 accounts" },
  { id: "ALR-2036", type: "Multiple Failed OTP", severity: "high", status: "resolved", created: "2026-06-12T18:02:00Z", assignee: "Rahul S.", summary: "4 invalid OTPs in 90s" },
  { id: "ALR-2035", type: "Password Spray", severity: "high", status: "closed", created: "2026-06-08T11:30:00Z", assignee: "Priya Nair", summary: "Multiple accounts probed from same ASN" },
];

export const RESTRICTIONS = [
  { id: "RST-01", type: "IP Restriction", target: "45.83.91.220", status: "Active", reason: "Brute force source", createdBy: "Priya Nair", createdAt: "2026-06-19", expiry: "Permanent" },
  { id: "RST-02", type: "Country Restriction", target: "Russia, North Korea", status: "Active", reason: "Compliance policy", createdBy: "Compliance Bot", createdAt: "2025-01-01", expiry: "Permanent" },
  { id: "RST-03", type: "Device Restriction", target: "fp_0099aa44bbcc", status: "Active", reason: "Tor workstation", createdBy: "Rahul S.", createdAt: "2026-06-18", expiry: "Permanent" },
  { id: "RST-04", type: "Withdrawal Restriction", target: "Account-wide", status: "Active", reason: "KYC re-verification pending", createdBy: "KYC Team", createdAt: "2026-06-20", expiry: "2026-06-27" },
  { id: "RST-05", type: "Login Restriction", target: "Outside India/UAE", status: "Paused", reason: "Travel exemption", createdBy: "Arjun Mehta", createdAt: "2026-06-19", expiry: "2026-07-05" },
];

export const PASSWORD_EVENTS = [
  { id: "PWD-1", time: "2026-06-19T19:48:00Z", event: "Failed Reset Attempt", source: "45.83.91.220", risk: "critical" as RiskLevel, note: "Credential stuffing pattern" },
  { id: "PWD-2", time: "2026-03-14T10:11:00Z", event: "Password Changed", source: "103.21.244.78", risk: "low" as RiskLevel, note: "Self-service" },
  { id: "PWD-3", time: "2026-03-14T10:09:00Z", event: "Reset Completed", source: "103.21.244.78", risk: "low" as RiskLevel, note: "Email link verified" },
  { id: "PWD-4", time: "2026-03-14T10:01:00Z", event: "Reset Requested", source: "103.21.244.78", risk: "low" as RiskLevel, note: "" },
  { id: "PWD-5", time: "2025-11-02T08:42:00Z", event: "Password Leak Match", source: "HIBP feed", risk: "high" as RiskLevel, note: "Old hash matched in breach corpus" },
];

export const TWO_FA_METHODS = [
  { method: "Google Authenticator", status: "Active", lastUsed: "2026-06-20T05:42:00Z", failures: 1, setup: "2024-03-02" },
  { method: "SMS OTP", status: "Active", lastUsed: "2026-06-12T18:02:00Z", failures: 4, setup: "2023-11-14" },
  { method: "Email OTP", status: "Active", lastUsed: "2026-05-18T09:30:00Z", failures: 0, setup: "2023-11-14" },
  { method: "Hardware Key", status: "Active", lastUsed: "2026-06-17T08:32:00Z", failures: 0, setup: "2025-09-09" },
  { method: "Authenticator App (Authy)", status: "Disabled", lastUsed: "2024-01-20T11:00:00Z", failures: 0, setup: "2023-11-14" },
  { method: "Backup Codes", status: "Active", lastUsed: "2025-12-04T14:11:00Z", failures: 0, setup: "2023-11-14" },
];

export const LINKED_DEVICES = [
  { fingerprint: "fp_de44091188cc", accounts: 2, firstSeen: "2026-05-28", lastSeen: "2026-06-20", risk: 78, abuse: "Account Sharing" },
  { fingerprint: "fp_2bbf7c109a12", accounts: 1, firstSeen: "2026-06-15", lastSeen: "2026-06-20", risk: 52, abuse: "Referral Abuse (suspected)" },
  { fingerprint: "fp_0099aa44bbcc", accounts: 1, firstSeen: "2026-06-18", lastSeen: "2026-06-18", risk: 96, abuse: "Multi Account Activity" },
];

export const TIMELINE = [
  { id: "T1", time: "2026-06-20T07:18:00Z", type: "session", severity: "low" as Severity, title: "Activity on MacBook Pro 16", detail: "Dashboard viewed, 2 trades placed" },
  { id: "T2", time: "2026-06-20T06:32:00Z", type: "alert", severity: "critical" as Severity, title: "Security Alert Created", detail: "Impossible Travel: Mumbai → Dubai" },
  { id: "T3", time: "2026-06-20T06:30:00Z", type: "login", severity: "medium" as Severity, title: "New country login", detail: "Dubai, UAE — Samsung Galaxy S24" },
  { id: "T4", time: "2026-06-20T05:42:00Z", type: "login", severity: "low" as Severity, title: "2FA Challenge Passed", detail: "Google Authenticator — Mumbai" },
  { id: "T5", time: "2026-06-19T22:09:00Z", type: "alert", severity: "high" as Severity, title: "VPN Detected", detail: "Hetzner datacenter — Frankfurt" },
  { id: "T6", time: "2026-06-19T19:48:00Z", type: "block", severity: "critical" as Severity, title: "Login Blocked", detail: "Brute force from 45.83.91.220" },
  { id: "T7", time: "2026-06-18T19:21:00Z", type: "alert", severity: "critical" as Severity, title: "TOR Login Detected", detail: "Stockholm exit node" },
  { id: "T8", time: "2026-06-15T09:11:00Z", type: "device", severity: "medium" as Severity, title: "New Device Registered", detail: "Samsung Galaxy S24 — Bengaluru" },
  { id: "T9", time: "2026-03-14T10:11:00Z", type: "password", severity: "low" as Severity, title: "Password Changed", detail: "Self-service from trusted device" },
];

export const NOTES_SEED = [
  { id: "N1", author: "Priya Nair", role: "Security Analyst", time: "2026-06-20T06:45:00Z", text: "Client confirmed Dubai trip on 19th. Approving short-term geo exemption.", pinned: true },
  { id: "N2", author: "Rahul Sinha", role: "Fraud Team", time: "2026-06-19T22:35:00Z", text: "VPN sessions from Hetzner under review — possible IB ops team device.", pinned: false },
  { id: "N3", author: "Compliance Bot", role: "Automation", time: "2026-06-18T19:25:00Z", text: "TOR login auto-terminated. Account flagged for SOC review.", pinned: true },
];

export const AUDIT = [
  { id: "AU-9001", action: "Force Logout", by: "Priya Nair", role: "Security Analyst", reason: "Suspected hijack", time: "2026-06-18T19:25:00Z", entity: "Session SES-018BAA", oldValue: "active", newValue: "terminated" },
  { id: "AU-9000", action: "Device Blocked", by: "Rahul Sinha", role: "Fraud Team", reason: "Tor workstation", time: "2026-06-18T19:26:00Z", entity: "Device DEV-X1", oldValue: "unrestricted", newValue: "blocked" },
  { id: "AU-8999", action: "IP Blocked", by: "Priya Nair", role: "Security Analyst", reason: "Brute force source", time: "2026-06-19T19:50:00Z", entity: "IP 45.83.91.220", oldValue: "monitored", newValue: "blocked" },
  { id: "AU-8998", action: "2FA Reset Requested", by: "Arjun Mehta", role: "Client", reason: "Lost device", time: "2026-06-12T18:00:00Z", entity: "User CL-948271", oldValue: "—", newValue: "pending review" },
  { id: "AU-8997", action: "Country Restriction Added", by: "Compliance Bot", role: "Automation", reason: "Policy update", time: "2025-01-01T00:00:00Z", entity: "Account CL-948271", oldValue: "—", newValue: "RU, KP blocked" },
  { id: "AU-8996", action: "Withdrawal Freeze", by: "KYC Team", role: "KYC", reason: "Re-verification", time: "2026-06-20T07:01:00Z", entity: "Account CL-948271", oldValue: "enabled", newValue: "frozen 7d" },
];

export function scoreBand(score: number): { label: string; tone: "success" | "info" | "warning" | "critical" } {
  // Per spec: low score = excellent, high = critical (inverted)
  if (score <= 30) return { label: "Excellent", tone: "success" };
  if (score <= 60) return { label: "Good", tone: "info" };
  if (score <= 80) return { label: "Warning", tone: "warning" };
  return { label: "Critical", tone: "critical" };
}

export function riskTone(r: RiskLevel | Severity): "success" | "info" | "warning" | "critical" {
  if (r === "low") return "success";
  if (r === "medium") return "warning";
  if (r === "high") return "warning";
  return "critical";
}
