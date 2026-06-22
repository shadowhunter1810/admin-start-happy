// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { ClientShell } from "@/components/client/ClientShell";
// import { toast } from "sonner";

// export const Route = createFileRoute("/referrals")({
//   head: () => ({
//     meta: [
//       { title: "Referrals · Atlas CRM" },
//       {
//         name: "description",
//         content:
//           "Referred clients, segmentation, funnel, deposit & trading analytics, lifecycle and audit.",
//       },
//     ],
//   }),
//   component: () => (
//     <ClientShell>
//       <ReferralsPage />
//     </ClientShell>
//   ),
// });

// /* ---------------- atoms ---------------- */

// const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
//   <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
//     {children}
//   </div>
// );
// const Section = ({
//   title,
//   subtitle,
//   action,
//   children,
//   className = "",
// }: {
//   title: string;
//   subtitle?: string;
//   action?: React.ReactNode;
//   children: React.ReactNode;
//   className?: string;
// }) => (
//   <Card className={`p-6 ${className}`}>
//     <div className="mb-4 flex items-start justify-between gap-3">
//       <div>
//         <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
//         {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
//       </div>
//       {action}
//     </div>
//     {children}
//   </Card>
// );
// const Pill = ({
//   tone = "gray",
//   children,
// }: {
//   tone?: "gray" | "green" | "amber" | "red" | "blue" | "violet";
//   children: React.ReactNode;
// }) => {
//   const map: Record<string, string> = {
//     gray: "bg-gray-100 text-gray-700 ring-gray-200",
//     green: "bg-emerald-50 text-emerald-700 ring-emerald-200",
//     amber: "bg-amber-50 text-amber-700 ring-amber-200",
//     red: "bg-rose-50 text-rose-700 ring-rose-200",
//     blue: "bg-sky-50 text-sky-700 ring-sky-200",
//     violet: "bg-violet-50 text-violet-700 ring-violet-200",
//   };
//   return (
//     <span
//       className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// };
// const KV = ({
//   k,
//   v,
//   tone,
// }: {
//   k: string;
//   v: React.ReactNode;
//   tone?: "green" | "amber" | "red";
// }) => (
//   <div className="flex items-baseline justify-between gap-3 border-b border-gray-100 py-2 last:border-0">
//     <span className="text-xs text-gray-500">{k}</span>
//     <span
//       className={`text-sm font-medium ${tone === "green" ? "text-emerald-600" : tone === "red" ? "text-rose-600" : tone === "amber" ? "text-amber-600" : "text-gray-900"}`}
//     >
//       {v}
//     </span>
//   </div>
// );
// const Kpi = ({
//   label,
//   value,
//   sub,
//   tone,
// }: {
//   label: string;
//   value: string;
//   sub?: string;
//   tone?: "green" | "red" | "amber" | "blue" | "violet";
// }) => (
//   <Card className="p-4">
//     <div className="text-[11px] uppercase tracking-wide text-gray-500">{label}</div>
//     <div
//       className={`mt-1 text-2xl font-semibold ${tone === "green" ? "text-emerald-600" : tone === "red" ? "text-rose-600" : tone === "amber" ? "text-amber-600" : tone === "blue" ? "text-sky-600" : tone === "violet" ? "text-violet-600" : "text-gray-900"}`}
//     >
//       {value}
//     </div>
//     {sub && <div className="mt-0.5 text-xs text-gray-500">{sub}</div>}
//   </Card>
// );
// const Btn = ({
//   children,
//   variant = "default",
//   onClick,
// }: {
//   children: React.ReactNode;
//   variant?: "default" | "outline" | "danger" | "ghost";
//   onClick?: () => void;
// }) => {
//   const cls =
//     variant === "outline"
//       ? "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
//       : variant === "danger"
//         ? "bg-rose-600 text-white hover:bg-rose-700"
//         : variant === "ghost"
//           ? "text-gray-600 hover:bg-gray-100"
//           : "bg-gray-900 text-white hover:bg-gray-800";
//   return (
//     <button
//       onClick={onClick}
//       className={`inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-medium transition ${cls}`}
//     >
//       {children}
//     </button>
//   );
// };

// /* ---------------- data ---------------- */

// type Status = "Active" | "Dormant" | "Restricted";
// type Risk = "Low" | "Medium" | "High";
// const CLIENTS = [
//   {
//     id: "CLT-1041",
//     name: "Mohammed Al-Rashid",
//     country: "AE",
//     status: "Active" as Status,
//     kyc: "Approved",
//     deposit: 245000,
//     volume: 12400,
//     revenue: 18200,
//     risk: "Low" as Risk,
//     vip: true,
//     segment: "VIP",
//   },
//   {
//     id: "CLT-1037",
//     name: "Emma Richardson",
//     country: "GB",
//     status: "Active" as Status,
//     kyc: "Approved",
//     deposit: 128000,
//     volume: 8210,
//     revenue: 9840,
//     risk: "Low" as Risk,
//     vip: true,
//     segment: "Pro",
//   },
//   {
//     id: "CLT-1029",
//     name: "Rahul Mehta",
//     country: "IN",
//     status: "Active" as Status,
//     kyc: "Approved",
//     deposit: 54000,
//     volume: 3870,
//     revenue: 4120,
//     risk: "Medium" as Risk,
//     vip: false,
//     segment: "Retail",
//   },
//   {
//     id: "CLT-1022",
//     name: "Lena Fischer",
//     country: "DE",
//     status: "Dormant" as Status,
//     kyc: "Approved",
//     deposit: 12500,
//     volume: 410,
//     revenue: 620,
//     risk: "Low" as Risk,
//     vip: false,
//     segment: "Dormant",
//   },
//   {
//     id: "CLT-1018",
//     name: "Kevin Tan",
//     country: "SG",
//     status: "Active" as Status,
//     kyc: "Approved",
//     deposit: 87000,
//     volume: 5640,
//     revenue: 6780,
//     risk: "Medium" as Risk,
//     vip: false,
//     segment: "Pro",
//   },
//   {
//     id: "CLT-1014",
//     name: "Sara Johansson",
//     country: "SE",
//     status: "Restricted" as Status,
//     kyc: "Approved",
//     deposit: 31000,
//     volume: 890,
//     revenue: 1040,
//     risk: "High" as Risk,
//     vip: false,
//     segment: "Restricted",
//   },
//   {
//     id: "CLT-1011",
//     name: "James Whitford",
//     country: "US",
//     status: "Active" as Status,
//     kyc: "Approved",
//     deposit: 48200,
//     volume: 2840,
//     revenue: 3120,
//     risk: "Low" as Risk,
//     vip: false,
//     segment: "Retail",
//   },
//   {
//     id: "CLT-1009",
//     name: "Aiko Tanaka",
//     country: "JP",
//     status: "Active" as Status,
//     kyc: "Pending",
//     deposit: 18900,
//     volume: 520,
//     revenue: 740,
//     risk: "Medium" as Risk,
//     vip: false,
//     segment: "Retail",
//   },
// ];

// type SectionKey =
//   | "summary"
//   | "clients"
//   | "segmentation"
//   | "riskdist"
//   | "performance"
//   | "funnel"
//   | "deposit"
//   | "trading"
//   | "revenue"
//   | "top"
//   | "lifecycle"
//   | "monitoring"
//   | "restrictions"
//   | "timeline"
//   | "notes"
//   | "actions"
//   | "audit";
// const SECTIONS: { key: SectionKey; label: string }[] = [
//   { key: "summary", label: "Referral Summary" },
//   { key: "clients", label: "Referred Clients" },
//   { key: "segmentation", label: "Client Segmentation" },
//   { key: "riskdist", label: "Risk Distribution" },
//   { key: "performance", label: "Referral Performance" },
//   { key: "funnel", label: "Conversion Funnel" },
//   { key: "deposit", label: "Deposit Analytics" },
//   { key: "trading", label: "Trading Analytics" },
//   { key: "revenue", label: "Revenue Contribution" },
//   { key: "top", label: "Top Revenue Clients" },
//   { key: "lifecycle", label: "Client Lifecycle" },
//   { key: "monitoring", label: "Risk Monitoring" },
//   { key: "restrictions", label: "Client Restrictions" },
//   { key: "timeline", label: "Timeline" },
//   { key: "notes", label: "Notes" },
//   { key: "actions", label: "Admin Actions" },
//   { key: "audit", label: "Audit Trail" },
// ];

// /* ---------------- page ---------------- */

// function ReferralsPage() {
//   const [active, setActive] = useState<SectionKey>("summary");
//   const [drawer, setDrawer] = useState<null | (typeof CLIENTS)[number]>(null);

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <div className="border-b border-gray-200 bg-white">
//         {/* <div className="px-6 py-5">
//           <div className="flex flex-wrap items-start justify-between gap-4">
//             <div>
//               <h1 className="text-xl font-semibold">Referrals / Clients</h1>
//               <p className="mt-0.5 text-sm text-gray-500">All clients referred by partner <span className="font-medium text-gray-700">IB-00412 · AR Financial Services</span></p>
//               <div className="mt-2 flex gap-2 text-xs text-gray-500">
//                 <Pill tone="amber">3 open tickets</Pill>
//                 <Pill tone="red">1 high-risk case</Pill>
//                 <Pill tone="violet">Priority support</Pill>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Btn variant="outline" onClick={()=>toast.success("Export started")}>Export</Btn>
//               <Btn onClick={()=>toast("Note added")}>+ Add Note</Btn>
//             </div>
//           </div>
//           <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
//             <Kpi label="Total Referrals" value="248" sub="All time" />
//             <Kpi label="Active Referrals" value="184" sub="74.2% active rate" tone="green"/>
//             <Kpi label="Trading Volume" value="$126M" sub="All time lots" tone="blue"/>
//             <Kpi label="Generated Revenue" value="$189K" sub="This month +12%" tone="green"/>
//           </div>
//         </div> */}
//         <div className="overflow-x-auto border-t border-gray-200">
//           <div className="flex gap-1 px-4">
//             {SECTIONS.map((s) => (
//               <button
//                 key={s.key}
//                 onClick={() => setActive(s.key)}
//                 className={`whitespace-nowrap border-b-2 px-3 py-3 text-xs font-medium transition ${active === s.key ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-800"}`}
//               >
//                 {s.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="space-y-6 p-6">
//         {active === "summary" && <Summary />}
//         {active === "clients" && <ClientsTable onOpen={setDrawer} />}
//         {active === "segmentation" && <Segmentation />}
//         {active === "riskdist" && <RiskDistribution />}
//         {active === "performance" && <Performance />}
//         {active === "funnel" && <Funnel />}
//         {active === "deposit" && <DepositAnalytics />}
//         {active === "trading" && <TradingAnalytics />}
//         {active === "revenue" && <RevenueContribution />}
//         {active === "top" && <TopRevenue onOpen={setDrawer} />}
//         {active === "lifecycle" && <Lifecycle />}
//         {active === "monitoring" && <Monitoring />}
//         {active === "restrictions" && <Restrictions />}
//         {active === "timeline" && <Timeline />}
//         {active === "notes" && <Notes />}
//         {active === "actions" && <AdminActions />}
//         {active === "audit" && <Audit />}
//       </div>

//       {drawer && <ClientDrawer client={drawer} onClose={() => setDrawer(null)} />}
//     </div>
//   );
// }

// /* ---------------- sections ---------------- */

// function Summary() {
//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//       <Kpi label="Total Referrals" value="248" />
//       <Kpi label="Active Referrals" value="184" tone="green" />
//       <Kpi label="VIP Clients" value="31" tone="violet" />
//       <Kpi label="Total Deposits" value="$4.8M" tone="blue" />
//       <Kpi label="Total Withdrawals" value="$1.7M" />
//       <Kpi label="Trading Volume" value="$126M" />
//       <Kpi label="Generated Revenue" value="$189K" tone="green" />
//       <Kpi label="Dormant Clients" value="19" tone="amber" />
//       <Kpi label="High Risk Clients" value="7" tone="red" />
//       <Kpi label="AML Review" value="5" tone="amber" />
//       <Kpi label="Restricted Clients" value="9" tone="red" />
//       <Kpi label="Funded Clients" value="248" />
//     </div>
//   );
// }

// function ClientsTable({ onOpen }: { onOpen: (c: (typeof CLIENTS)[number]) => void }) {
//   const [status, setStatus] = useState("All");
//   const [country, setCountry] = useState("All");
//   const [risk, setRisk] = useState("All");
//   const [kyc, setKyc] = useState("All");
//   const [vip, setVip] = useState("All");
//   const [q, setQ] = useState("");
//   const rows = useMemo(
//     () =>
//       CLIENTS.filter(
//         (c) =>
//           (status === "All" || c.status === status) &&
//           (country === "All" || c.country === country) &&
//           (risk === "All" || c.risk === risk) &&
//           (kyc === "All" || c.kyc === kyc) &&
//           (vip === "All" || (vip === "VIP" ? c.vip : !c.vip)) &&
//           (q === "" ||
//             c.name.toLowerCase().includes(q.toLowerCase()) ||
//             c.id.toLowerCase().includes(q.toLowerCase())),
//       ),
//     [status, country, risk, kyc, vip, q],
//   );

//   const Sel = ({ val, set, opts }: { val: string; set: (v: string) => void; opts: string[] }) => (
//     <select
//       value={val}
//       onChange={(e) => set(e.target.value)}
//       className="h-8 rounded-md border border-gray-300 bg-white px-2 text-xs"
//     >
//       {opts.map((o) => (
//         <option key={o}>{o}</option>
//       ))}
//     </select>
//   );

//   return (
//     <Section
//       title="Referred Clients"
//       subtitle="Click any row to open full client drawer"
//       action={
//         <Btn variant="outline" onClick={() => toast.success("Exported")}>
//           Export
//         </Btn>
//       }
//     >
//       <div className="mb-3 flex flex-wrap items-center gap-2">
//         <Sel val={status} set={setStatus} opts={["All", "Active", "Dormant", "Restricted"]} />
//         <Sel
//           val={country}
//           set={setCountry}
//           opts={["All", "AE", "GB", "IN", "DE", "SG", "SE", "US", "JP"]}
//         />
//         <Sel val={risk} set={setRisk} opts={["All", "Low", "Medium", "High"]} />
//         <Sel val={kyc} set={setKyc} opts={["All", "Approved", "Pending"]} />
//         <Sel val={vip} set={setVip} opts={["All", "VIP", "Non-VIP"]} />
//         <input
//           value={q}
//           onChange={(e) => setQ(e.target.value)}
//           placeholder="Search client ID or name…"
//           className="h-8 flex-1 min-w-[200px] rounded-md border border-gray-300 px-3 text-xs"
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
//             <tr>
//               {[
//                 "Client ID",
//                 "Client Name",
//                 "Country",
//                 "Status",
//                 "KYC",
//                 "Deposit",
//                 "Volume",
//                 "Revenue",
//                 "Risk",
//               ].map((h) => (
//                 <th key={h} className="px-3 py-2 font-medium">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((c) => (
//               <tr
//                 key={c.id}
//                 onClick={() => onOpen(c)}
//                 className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
//               >
//                 <td className="px-3 py-2 font-mono text-xs text-gray-600">{c.id}</td>
//                 <td className="px-3 py-2 font-medium">
//                   {c.vip && <span className="mr-1 text-amber-500">★</span>}
//                   {c.name}
//                 </td>
//                 <td className="px-3 py-2 text-gray-600">{c.country}</td>
//                 <td className="px-3 py-2">
//                   <Pill
//                     tone={
//                       c.status === "Active" ? "green" : c.status === "Dormant" ? "amber" : "red"
//                     }
//                   >
//                     {c.status}
//                   </Pill>
//                 </td>
//                 <td className="px-3 py-2">
//                   <Pill tone={c.kyc === "Approved" ? "green" : "amber"}>{c.kyc}</Pill>
//                 </td>
//                 <td className="px-3 py-2">${c.deposit.toLocaleString()}</td>
//                 <td className="px-3 py-2">{c.volume.toLocaleString()} lots</td>
//                 <td className="px-3 py-2 font-medium text-emerald-600">
//                   ${c.revenue.toLocaleString()}
//                 </td>
//                 <td className="px-3 py-2">
//                   <Pill tone={c.risk === "Low" ? "green" : c.risk === "Medium" ? "amber" : "red"}>
//                     {c.risk}
//                   </Pill>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </Section>
//   );
// }

// function Segmentation() {
//   const segs = [
//     { name: "VIP Clients", count: 31, tone: "violet" as const },
//     { name: "Retail Clients", count: 142, tone: "blue" as const },
//     { name: "Professional Traders", count: 28, tone: "green" as const },
//     { name: "Copy Traders", count: 22, tone: "blue" as const },
//     { name: "Dormant Clients", count: 19, tone: "amber" as const },
//     { name: "Restricted Clients", count: 9, tone: "red" as const },
//     { name: "High Risk Clients", count: 7, tone: "red" as const },
//     { name: "AML Review Clients", count: 5, tone: "amber" as const },
//   ];
//   return (
//     <Section title="Client Segmentation">
//       <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//         {segs.map((s) => (
//           <div key={s.name} className="rounded-lg border border-gray-200 p-4">
//             <div className="text-xs text-gray-500">{s.name}</div>
//             <div className="mt-1 text-2xl font-semibold">{s.count}</div>
//             <Pill tone={s.tone}>{s.name.split(" ")[0]}</Pill>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function RiskDistribution() {
//   const dist = [
//     { l: "Low", v: 152, c: "bg-emerald-500" },
//     { l: "Medium", v: 64, c: "bg-amber-500" },
//     { l: "High", v: 7, c: "bg-rose-500" },
//     { l: "AML", v: 5, c: "bg-orange-500" },
//     { l: "Restricted", v: 9, c: "bg-gray-700" },
//   ];
//   const total = dist.reduce((a, b) => a + b.v, 0);
//   return (
//     <div className="grid gap-4 lg:grid-cols-2">
//       <Section title="Risk KPIs">
//         <KV k="Low Risk Clients" v="152" tone="green" />
//         <KV k="Medium Risk Clients" v="64" tone="amber" />
//         <KV k="High Risk Clients" v="7" tone="red" />
//         <KV k="AML Review Clients" v="5" tone="amber" />
//         <KV k="Restricted Clients" v="9" tone="red" />
//       </Section>
//       <Section title="Risk Distribution Bar">
//         <div className="flex h-6 w-full overflow-hidden rounded-full">
//           {dist.map((d) => (
//             <div
//               key={d.l}
//               className={d.c}
//               style={{ width: `${(d.v / total) * 100}%` }}
//               title={`${d.l}: ${d.v}`}
//             />
//           ))}
//         </div>
//         <div className="mt-3 grid grid-cols-2 gap-2 text-xs md:grid-cols-5">
//           {dist.map((d) => (
//             <div key={d.l} className="flex items-center gap-2">
//               <span className={`h-3 w-3 rounded ${d.c}`} />
//               <span>
//                 {d.l} · {d.v}
//               </span>
//             </div>
//           ))}
//         </div>
//       </Section>
//     </div>
//   );
// }

// function Performance() {
//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//       <Kpi label="Conversion Rate" value="40.6%" tone="green" />
//       <Kpi label="Active Rate" value="74.2%" tone="green" />
//       <Kpi label="Retention Rate" value="68%" />
//       <Kpi label="Churn Rate" value="12%" tone="amber" />
//       <Kpi label="Revenue Per Client" value="$762" />
//       <Kpi label="Avg Deposit Per Client" value="$19.4K" tone="blue" />
//       <Kpi label="Funded Clients" value="248" />
//       <Kpi label="Growth (MoM)" value="+12%" tone="green" />
//     </div>
//   );
// }

// function Funnel() {
//   const stages = [
//     { name: "Leads", v: 362, pct: 100 },
//     { name: "Registered", v: 311, pct: 85 },
//     { name: "KYC Approved", v: 286, pct: 79 },
//     { name: "Funded", v: 248, pct: 68 },
//     { name: "Trading Active", v: 184, pct: 50 },
//     { name: "VIP", v: 31, pct: 8 },
//   ];
//   return (
//     <Section title="Conversion Funnel">
//       <div className="space-y-2">
//         {stages.map((s) => (
//           <div key={s.name} className="flex items-center gap-3">
//             <div className="w-32 text-sm">{s.name}</div>
//             <div className="flex-1 overflow-hidden rounded-md bg-gray-100">
//               <div
//                 className="bg-gradient-to-r from-sky-500 to-violet-500 py-2 pl-3 text-xs text-white"
//                 style={{ width: `${s.pct}%` }}
//               >
//                 {s.pct}%
//               </div>
//             </div>
//             <div className="w-16 text-right text-sm font-medium">{s.v}</div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function DepositAnalytics() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-2">
//       <Section title="Deposit Metrics">
//         <KV k="Total Deposits" v="$4.8M" tone="green" />
//         <KV k="Average Deposit" v="$19.4K" />
//         <KV k="Largest Deposit" v="$245K" />
//         <KV k="Deposit Growth" v="+18.4%" tone="green" />
//         <KV k="Deposit Frequency" v="2.3x / client / month" />
//         <KV k="Refund Ratio" v="0.8%" tone="amber" />
//       </Section>
//       <Section title="Deposit Trend (last 6 months)">
//         <div className="flex h-40 items-end gap-2">
//           {[420, 510, 640, 720, 810, 940].map((v, i) => (
//             <div key={i} className="flex flex-1 flex-col items-center gap-1">
//               <div
//                 className="w-full rounded-t bg-gradient-to-t from-sky-500 to-sky-300"
//                 style={{ height: `${(v / 940) * 100}%` }}
//               />
//               <div className="text-[10px] text-gray-500">M{i + 1}</div>
//             </div>
//           ))}
//         </div>
//       </Section>
//     </div>
//   );
// }

// function TradingAnalytics() {
//   return (
//     <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
//       <Kpi label="Total Lots" value="126,400" />
//       <Kpi label="Active Traders" value="184" tone="green" />
//       <Kpi label="Average Volume" value="687 lots" />
//       <Kpi label="Profitable Clients" value="118" tone="green" />
//       <Kpi label="Losing Clients" value="66" tone="red" />
//       <Kpi label="Copy Traders" value="22" tone="violet" />
//       <Kpi label="High Volume Traders" value="38" tone="blue" />
//       <Kpi label="Avg Win Rate" value="61%" tone="green" />
//     </div>
//   );
// }

// function RevenueContribution() {
//   return (
//     <div className="grid gap-4 lg:grid-cols-2">
//       <Section title="Revenue Metrics">
//         <KV k="Generated Revenue" v="$189,420" tone="green" />
//         <KV k="Revenue Per Client" v="$762" />
//         <KV k="Revenue Per Lot" v="$1.50" />
//         <KV k="Top 10% Contribution" v={<Pill tone="violet">62%</Pill>} />
//         <KV k="Monthly Growth" v="+12%" tone="green" />
//       </Section>
//       <Section title="Revenue by Segment">
//         <div className="space-y-2 text-sm">
//           {[
//             { l: "VIP", v: 62 },
//             { l: "Pro", v: 21 },
//             { l: "Retail", v: 14 },
//             { l: "Copy", v: 3 },
//           ].map((r) => (
//             <div key={r.l} className="flex items-center gap-3">
//               <div className="w-20">{r.l}</div>
//               <div className="flex-1 overflow-hidden rounded bg-gray-100">
//                 <div className="h-3 bg-emerald-500" style={{ width: `${r.v}%` }} />
//               </div>
//               <div className="w-10 text-right">{r.v}%</div>
//             </div>
//           ))}
//         </div>
//       </Section>
//     </div>
//   );
// }

// function TopRevenue({ onOpen }: { onOpen: (c: (typeof CLIENTS)[number]) => void }) {
//   const sorted = [...CLIENTS].sort((a, b) => b.revenue - a.revenue);
//   return (
//     <Section title="Top Revenue Clients">
//       <table className="w-full text-sm">
//         <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
//           <tr>
//             {["Rank", "Client ID", "Name", "Revenue", "Volume", "Avg Revenue / Lot"].map((h) => (
//               <th key={h} className="px-3 py-2 font-medium">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {sorted.map((c, i) => (
//             <tr
//               key={c.id}
//               onClick={() => onOpen(c)}
//               className="cursor-pointer border-b border-gray-100 hover:bg-gray-50"
//             >
//               <td className="px-3 py-2 font-mono text-xs">#{i + 1}</td>
//               <td className="px-3 py-2 font-mono text-xs">{c.id}</td>
//               <td className="px-3 py-2 font-medium">{c.name}</td>
//               <td className="px-3 py-2 text-emerald-600 font-medium">
//                 ${c.revenue.toLocaleString()}
//               </td>
//               <td className="px-3 py-2">{c.volume.toLocaleString()} lots</td>
//               <td className="px-3 py-2">${(c.revenue / Math.max(c.volume, 1)).toFixed(2)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Section>
//   );
// }

// function Lifecycle() {
//   const stages = [
//     { l: "Lead", v: 114, tone: "gray" as const },
//     { l: "Registered", v: 63, tone: "blue" as const },
//     { l: "KYC Pending", v: 26, tone: "amber" as const },
//     { l: "Funded", v: 248, tone: "green" as const },
//     { l: "Trading Active", v: 184, tone: "green" as const },
//     { l: "VIP", v: 31, tone: "violet" as const },
//     { l: "Dormant", v: 19, tone: "amber" as const },
//     { l: "Closed", v: 8, tone: "red" as const },
//   ];
//   return (
//     <Section title="Client Lifecycle">
//       <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
//         {stages.map((s) => (
//           <div key={s.l} className="rounded-lg border border-gray-200 p-4">
//             <Pill tone={s.tone}>{s.l}</Pill>
//             <div className="mt-2 text-2xl font-semibold">{s.v}</div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function Monitoring() {
//   const alerts = [
//     { name: "Bonus Abuse", count: 2 },
//     { name: "Device Sharing", count: 1 },
//     { name: "Multi Accounting", count: 0 },
//     { name: "AML Alert", count: 5 },
//     { name: "Chargeback Risk", count: 3 },
//     { name: "Referral Fraud", count: 0 },
//     { name: "Copy Trading Abuse", count: 0 },
//   ];
//   return (
//     <Section title="Risk Monitoring">
//       <div className="grid gap-2 md:grid-cols-2">
//         {alerts.map((a) => (
//           <div
//             key={a.name}
//             className={`flex items-center justify-between rounded-md border p-3 text-sm ${a.count > 0 ? "border-rose-200 bg-rose-50" : "border-gray-200"}`}
//           >
//             <span>{a.name}</span>
//             <Pill tone={a.count > 0 ? "red" : "green"}>
//               {a.count > 0 ? `${a.count} active` : "No active flags"}
//             </Pill>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function Restrictions() {
//   const rs = [
//     { name: "Trading Disabled", count: 2 },
//     { name: "Withdrawal Locked", count: 3 },
//     { name: "KYC Pending", count: 26 },
//     { name: "AML Review", count: 5 },
//     { name: "Account Suspended", count: 0 },
//   ];
//   return (
//     <Section title="Client Restrictions">
//       <table className="w-full text-sm">
//         <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
//           <tr>
//             {["Restriction", "Count", "Status", "Action"].map((h) => (
//               <th key={h} className="px-3 py-2 font-medium">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rs.map((r) => (
//             <tr key={r.name} className="border-b border-gray-100">
//               <td className="px-3 py-2">{r.name}</td>
//               <td className="px-3 py-2">{r.count}</td>
//               <td className="px-3 py-2">
//                 <Pill tone={r.count > 0 ? "amber" : "green"}>
//                   {r.count > 0 ? "Active" : "None"}
//                 </Pill>
//               </td>
//               <td className="px-3 py-2">
//                 <Btn variant="outline" onClick={() => toast(`Reviewing ${r.name}`)}>
//                   Review
//                 </Btn>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Section>
//   );
// }

// function Timeline() {
//   const events = [
//     {
//       d: "Today",
//       t: "New deposit $12,000",
//       note: "CLT-1041 Mohammed Al-Rashid",
//       tone: "green" as const,
//     },
//     {
//       d: "Yesterday",
//       t: "First Trade opened",
//       note: "CLT-1018 Kevin Tan — EURUSD",
//       tone: "blue" as const,
//     },
//     {
//       d: "3 days ago",
//       t: "AML review opened",
//       note: "CLT-1014 Sara Johansson",
//       tone: "amber" as const,
//     },
//     {
//       d: "1 week ago",
//       t: "VIP upgrade",
//       note: "CLT-1037 Emma Richardson",
//       tone: "violet" as const,
//     },
//     {
//       d: "2 weeks ago",
//       t: "Dormant status applied",
//       note: "CLT-1022 Lena Fischer",
//       tone: "amber" as const,
//     },
//     {
//       d: "1 month ago",
//       t: "KYC Approved batch",
//       note: "12 clients moved to Funded",
//       tone: "green" as const,
//     },
//   ];
//   return (
//     <Section title="Referral Lifecycle Timeline">
//       <ol className="space-y-3">
//         {events.map((e, i) => (
//           <li key={i} className="flex gap-3">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`mt-1.5 h-2 w-2 rounded-full ${e.tone === "green" ? "bg-emerald-500" : e.tone === "amber" ? "bg-amber-500" : e.tone === "violet" ? "bg-violet-500" : "bg-sky-500"}`}
//               />
//               <div className="w-px flex-1 bg-gray-200" />
//             </div>
//             <div className="pb-3">
//               <div className="text-xs text-gray-500">{e.d}</div>
//               <div className="text-sm font-medium">{e.t}</div>
//               <div className="text-xs text-gray-500">{e.note}</div>
//             </div>
//           </li>
//         ))}
//       </ol>
//     </Section>
//   );
// }

// function Notes() {
//   const notes = [
//     {
//       tag: "Potential VIP",
//       text: "Increasing deposit cadence — propose VIP tier.",
//       c: "Mohammed Al-Rashid",
//       at: "Today",
//     },
//     {
//       tag: "High Value Client",
//       text: "Top revenue contributor in GB book.",
//       c: "Emma Richardson",
//       at: "2d ago",
//     },
//     {
//       tag: "Requires Follow-up",
//       text: "Awaiting reply on KYC refresh.",
//       c: "Rahul Mehta",
//       at: "4d ago",
//     },
//     {
//       tag: "High Trading Volume",
//       text: "Avg 600 lots/week, monitor margin.",
//       c: "Kevin Tan",
//       at: "1w ago",
//     },
//   ];
//   return (
//     <Section title="Notes" action={<Btn onClick={() => toast.success("Note added")}>+ Note</Btn>}>
//       <div className="space-y-2">
//         {notes.map((n, i) => (
//           <div key={i} className="rounded-md border border-gray-200 p-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Pill tone="violet">{n.tag}</Pill>
//                 <span className="text-xs text-gray-500">{n.c}</span>
//               </div>
//               <span className="text-xs text-gray-500">{n.at}</span>
//             </div>
//             <div className="mt-1 text-sm text-gray-700">{n.text}</div>
//           </div>
//         ))}
//       </div>
//     </Section>
//   );
// }

// function AdminActions() {
//   const group = (
//     title: string,
//     items: string[],
//     variant: "default" | "outline" | "danger" = "outline",
//   ) => (
//     <Section title={title}>
//       <div className="flex flex-wrap gap-2">
//         {items.map((i) => (
//           <Btn key={i} variant={variant} onClick={() => toast(`${i} triggered`)}>
//             {i}
//           </Btn>
//         ))}
//       </div>
//     </Section>
//   );
//   return (
//     <div className="grid gap-4 lg:grid-cols-3">
//       {group(
//         "Safe Actions",
//         ["View Client", "Notify Client", "Export List", "Add Note"],
//         "outline",
//       )}
//       {group(
//         "Moderate Actions",
//         ["Assign Manager", "Change Segment", "Mark VIP", "Create Campaign"],
//         "default",
//       )}
//       {group(
//         "Dangerous Actions",
//         [
//           "Remove Referral Mapping",
//           "Restrict Client",
//           "Escalate Compliance Review",
//           "Suspend Referral Benefits",
//         ],
//         "danger",
//       )}
//     </div>
//   );
// }

// function Audit() {
//   const rows = [
//     { a: "Client CLT-1041 marked VIP", by: "Priya Nair", at: "Today 10:14" },
//     { a: "AML review opened for CLT-1014", by: "Compliance Bot", at: "3d ago 09:02" },
//     { a: "Referral mapping updated", by: "System", at: "5d ago 16:30" },
//     { a: "Note added — CLT-1029", by: "Priya Nair", at: "6d ago 11:05" },
//     { a: "Campaign created for IN segment", by: "Marketing", at: "1w ago" },
//   ];
//   return (
//     <Section
//       title="Audit Trail"
//       action={
//         <Btn variant="outline" onClick={() => toast.success("Exported")}>
//           Export
//         </Btn>
//       }
//     >
//       <table className="w-full text-sm">
//         <thead className="border-b border-gray-200 bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
//           <tr>
//             {["Action", "By", "Time"].map((h) => (
//               <th key={h} className="px-3 py-2 font-medium">
//                 {h}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((r, i) => (
//             <tr key={i} className="border-b border-gray-100">
//               <td className="px-3 py-2">{r.a}</td>
//               <td className="px-3 py-2">{r.by}</td>
//               <td className="px-3 py-2 text-gray-500">{r.at}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </Section>
//   );
// }

// /* ---------------- client drawer ---------------- */

// function ClientDrawer({
//   client,
//   onClose,
// }: {
//   client: (typeof CLIENTS)[number];
//   onClose: () => void;
// }) {
//   const [tab, setTab] = useState<
//     "overview" | "trading" | "financial" | "risk" | "compliance" | "timeline" | "actions"
//   >("overview");
//   const tabs = [
//     { k: "overview", l: "Overview" },
//     { k: "trading", l: "Trading" },
//     { k: "financial", l: "Financial" },
//     { k: "risk", l: "Risk" },
//     { k: "compliance", l: "Compliance" },
//     { k: "timeline", l: "Timeline" },
//     { k: "actions", l: "Actions" },
//   ] as const;
//   const actions = [
//     "View Full Profile",
//     "Send Notification",
//     "Add Note",
//     "Assign Manager",
//     "Mark as VIP",
//     "Change Segment",
//     "Create Campaign",
//     "Restrict Client",
//     "Escalate Compliance Review",
//     "Remove Referral Mapping",
//     "Suspend Referral Benefits",
//   ];

//   return (
//     <div className="fixed inset-0 z-50 flex">
//       <div className="flex-1 bg-black/30" onClick={onClose} />
//       <div className="flex h-full w-full max-w-xl flex-col border-l border-gray-200 bg-white shadow-xl">
//         <div className="border-b border-gray-200 p-5">
//           <div className="flex items-start justify-between">
//             <div>
//               <div className="text-xs text-gray-500">
//                 {client.id} · {client.country}
//               </div>
//               <div className="text-lg font-semibold">
//                 {client.vip && <span className="text-amber-500">★ </span>}
//                 {client.name}
//               </div>
//               <div className="mt-2 flex flex-wrap gap-1">
//                 {client.vip && <Pill tone="violet">VIP</Pill>}
//                 <Pill
//                   tone={
//                     client.status === "Active"
//                       ? "green"
//                       : client.status === "Dormant"
//                         ? "amber"
//                         : "red"
//                   }
//                 >
//                   {client.status}
//                 </Pill>
//                 <Pill
//                   tone={
//                     client.risk === "Low" ? "green" : client.risk === "Medium" ? "amber" : "red"
//                   }
//                 >
//                   {client.risk} risk
//                 </Pill>
//                 <Pill tone="blue">{client.segment}</Pill>
//               </div>
//             </div>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
//               ✕
//             </button>
//           </div>
//           <div className="mt-3 flex gap-1 overflow-x-auto">
//             {tabs.map((t) => (
//               <button
//                 key={t.k}
//                 onClick={() => setTab(t.k)}
//                 className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium ${tab === t.k ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}
//               >
//                 {t.l}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="flex-1 overflow-y-auto p-5 space-y-4">
//           {tab === "overview" && (
//             <>
//               <div className="grid grid-cols-2 gap-2">
//                 <Kpi
//                   label="Total Deposit"
//                   value={`$${client.deposit.toLocaleString()}`}
//                   tone="blue"
//                 />
//                 <Kpi
//                   label="Total Revenue"
//                   value={`$${client.revenue.toLocaleString()}`}
//                   tone="green"
//                 />
//                 <Kpi label="Trading Volume" value={`${client.volume.toLocaleString()} lots`} />
//                 <Kpi label="Open Positions" value="8" />
//               </div>
//               <Section title="Client Details">
//                 <KV k="Client ID" v={client.id} />
//                 <KV k="Status" v={<Pill tone="green">{client.status}</Pill>} />
//                 <KV k="KYC Status" v={<Pill tone="green">{client.kyc}</Pill>} />
//                 <KV k="AML Status" v={<Pill tone="green">Clear</Pill>} />
//                 <KV k="Account Type" v="ECN Pro" />
//                 <KV k="Segment" v={client.segment} />
//                 <KV k="Risk Level" v={client.risk} />
//                 <KV k="Manager" v="Priya Nair" />
//                 <KV k="Referred By" v="IB-00412" />
//               </Section>
//             </>
//           )}
//           {tab === "trading" && (
//             <Section title="Trading Summary">
//               <KV k="Total Lots" v={client.volume.toLocaleString()} />
//               <KV k="Total Trades" v="284" />
//               <KV k="Win Rate" v="71%" tone="green" />
//               <KV k="Avg Trade Size" v="43.7 lots" />
//               <KV k="Best Month" v="$4,200 (Mar)" />
//               <KV k="Instruments Traded" v="XAUUSD, EURUSD, WTI" />
//               <KV k="Copy Trading" v="No" />
//               <KV k="Last Trade Date" v="Today" />
//             </Section>
//           )}
//           {tab === "financial" && (
//             <Section title="Financial Summary">
//               <KV k="Total Deposits" v={`$${client.deposit.toLocaleString()}`} tone="green" />
//               <KV k="Total Withdrawals" v="$85,000" />
//               <KV k="Net Balance" v="$160,000" />
//               <KV k="Open P&L" v="+$3,400" tone="green" />
//               <KV k="Commission Generated" v={`$${client.revenue.toLocaleString()}`} />
//               <KV k="Bonus Used" v="$0" />
//               <KV k="Last Deposit Date" v="3 days ago" />
//               <KV k="Last Withdrawal Date" v="1 week ago" />
//             </Section>
//           )}
//           {tab === "risk" && (
//             <Section title="Risk Summary">
//               <KV
//                 k="Risk Level"
//                 v={
//                   <Pill
//                     tone={
//                       client.risk === "Low" ? "green" : client.risk === "Medium" ? "amber" : "red"
//                     }
//                   >
//                     {client.risk}
//                   </Pill>
//                 }
//               />
//               <KV k="Margin Level" v="284%" tone="green" />
//               <KV k="Chargebacks" v="0" />
//               <KV k="Flags" v="None" tone="green" />
//               <KV k="Last Risk Review" v="14 May 2026" />
//             </Section>
//           )}
//           {tab === "compliance" && (
//             <Section title="Compliance Summary">
//               <KV k="KYC" v={<Pill tone="green">{client.kyc}</Pill>} />
//               <KV k="AML" v={<Pill tone="green">Clear</Pill>} />
//               <KV k="Sanctions" v={<Pill tone="green">Pass</Pill>} />
//               <KV k="PEP Review" v={<Pill tone="green">Negative</Pill>} />
//               <KV k="Documents on file" v="Passport · POA · Bank Statement" />
//               <KV k="Last Review" v="08 May 2026" />
//               <KV k="Officer" v="Rajan Mehta" />
//             </Section>
//           )}
//           {tab === "timeline" && (
//             <Section title="Timeline">
//               <ol className="space-y-2 text-sm">
//                 <li>• Registered 14 Jan 2024</li>
//                 <li>• KYC approved 16 Jan 2024</li>
//                 <li>• First deposit $5,000 — 20 Jan 2024</li>
//                 <li>• First trade — 22 Jan 2024</li>
//                 <li>• VIP upgrade — 02 Mar 2025</li>
//                 <li>• Last deposit — 3 days ago</li>
//                 <li>• Last trade — today</li>
//               </ol>
//             </Section>
//           )}
//           {tab === "actions" && (
//             <Section title="Client Actions">
//               <div className="flex flex-wrap gap-2">
//                 {actions.map((a) => (
//                   <Btn
//                     key={a}
//                     variant={
//                       a.includes("Restrict") ||
//                       a.includes("Remove") ||
//                       a.includes("Suspend") ||
//                       a.includes("Escalate")
//                         ? "danger"
//                         : "outline"
//                     }
//                     onClick={() => toast(`${a} requested`)}
//                   >
//                     {a}
//                   </Btn>
//                 ))}
//               </div>
//             </Section>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client/ClientShell";
import { toast } from "sonner";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      {
        title: "Referrals · Atlas CRM",
      },
      {
        name: "description",
        content:
          "Referral clients, acquisition, financial, trading, revenue and compliance analytics.",
      },
    ],
  }),

  component: () => (
    <ClientShell>
      <ReferralsPage />
    </ClientShell>
  ),
});

/* =====================================================
   UI COMPONENTS
===================================================== */

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

const Section = ({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Card className="p-6">
    <div className="mb-4 flex items-start justify-between">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

        {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
      </div>

      {action}
    </div>

    {children}
  </Card>
);

const Pill = ({
  children,
  tone = "gray",
}: {
  children: React.ReactNode;
  tone?: "gray" | "green" | "amber" | "red" | "blue" | "violet";
}) => {
  const styles = {
    gray: "bg-gray-100 text-gray-700 ring-gray-200",

    green: "bg-emerald-50 text-emerald-700 ring-emerald-200",

    amber: "bg-amber-50 text-amber-700 ring-amber-200",

    red: "bg-rose-50 text-rose-700 ring-rose-200",

    blue: "bg-sky-50 text-sky-700 ring-sky-200",

    violet: "bg-violet-50 text-violet-700 ring-violet-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${styles[tone]}`}
    >
      {children}
    </span>
  );
};

const KV = ({
  k,
  v,
  tone,
}: {
  k: string;
  v: React.ReactNode;
  tone?: "green" | "amber" | "red";
}) => (
  <div className="flex justify-between border-b border-gray-100 py-2 last:border-none">
    <span className="text-xs text-gray-500">{k}</span>

    <span
      className={`text-sm font-medium ${
        tone === "green"
          ? "text-emerald-600"
          : tone === "amber"
            ? "text-amber-600"
            : tone === "red"
              ? "text-rose-600"
              : "text-gray-900"
      }`}
    >
      {v}
    </span>
  </div>
);

const Kpi = ({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub?: string;
  tone?: "green" | "red" | "amber" | "blue" | "violet";
}) => (
  <Card className="p-4">
    <div className="text-[11px] uppercase text-gray-500">{label}</div>

    <div
      className={`mt-1 text-2xl font-semibold ${
        tone === "green"
          ? "text-emerald-600"
          : tone === "red"
            ? "text-rose-600"
            : tone === "amber"
              ? "text-amber-600"
              : tone === "blue"
                ? "text-sky-600"
                : tone === "violet"
                  ? "text-violet-600"
                  : "text-gray-900"
      }`}
    >
      {value}
    </div>

    {sub && <div className="text-xs text-gray-500">{sub}</div>}
  </Card>
);

const Btn = ({
  children,
  variant = "default",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "danger" | "ghost";
  onClick?: () => void;
}) => {
  const style =
    variant === "outline"
      ? "border bg-white text-gray-700 hover:bg-gray-50"
      : variant === "danger"
        ? "bg-rose-600 text-white"
        : variant === "ghost"
          ? "text-gray-600 hover:bg-gray-100"
          : "bg-gray-900 text-white";

  return (
    <button onClick={onClick} className={`rounded-md px-3 py-2 text-xs font-medium ${style}`}>
      {children}
    </button>
  );
};

/* =====================================================
   DATA TYPES
===================================================== */

type Status = "Active" | "Dormant" | "Restricted";

type Risk = "Low" | "Medium" | "High";

const CLIENTS = [
  {
    id: "CLT-1041",
    name: "Mohammed Al-Rashid",
    country: "AE",
    status: "Active" as Status,
    kyc: "Approved",
    deposit: 245000,
    volume: 12400,
    revenue: 18200,
    risk: "Low" as Risk,
    vip: true,
    segment: "VIP",
  },

  {
    id: "CLT-1037",
    name: "Emma Richardson",
    country: "GB",
    status: "Active" as Status,
    kyc: "Approved",
    deposit: 128000,
    volume: 8210,
    revenue: 9840,
    risk: "Low" as Risk,
    vip: true,
    segment: "Professional",
  },

  {
    id: "CLT-1029",
    name: "Rahul Mehta",
    country: "IN",
    status: "Active" as Status,
    kyc: "Approved",
    deposit: 54000,
    volume: 3870,
    revenue: 4120,
    risk: "Medium" as Risk,
    vip: false,
    segment: "Retail",
  },

  {
    id: "CLT-1022",
    name: "Lena Fischer",
    country: "DE",
    status: "Dormant" as Status,
    kyc: "Approved",
    deposit: 12500,
    volume: 410,
    revenue: 620,
    risk: "Low" as Risk,
    vip: false,
    segment: "Dormant",
  },

  {
    id: "CLT-1018",
    name: "Kevin Tan",
    country: "SG",
    status: "Active" as Status,
    kyc: "Approved",
    deposit: 87000,
    volume: 5640,
    revenue: 6780,
    risk: "Medium" as Risk,
    vip: false,
    segment: "Professional",
  },

  {
    id: "CLT-1014",
    name: "Sara Johansson",
    country: "SE",
    status: "Restricted" as Status,
    kyc: "Approved",
    deposit: 31000,
    volume: 890,
    revenue: 1040,
    risk: "High" as Risk,
    vip: false,
    segment: "Restricted",
  },
];

/* =====================================================
   TABS
===================================================== */

type SectionKey =
  | "overview"
  | "clients"
  | "segmentation"
  | "funnel"
  | "financial"
  | "trading"
  | "revenue"
  | "risk"
  | "lifecycle"
  | "timeline"
  | "notes"
  | "actions"
  | "audit";

const SECTIONS: {
  key: SectionKey;
  label: string;
}[] = [
  {
    key: "overview",
    label: "Overview",
  },

  {
    key: "clients",
    label: "Clients",
  },

  {
    key: "segmentation",
    label: "Segmentation",
  },

  {
    key: "funnel",
    label: "Acquisition Funnel",
  },

  {
    key: "financial",
    label: "Financial Analytics",
  },

  {
    key: "trading",
    label: "Trading Analytics",
  },

  {
    key: "revenue",
    label: "Revenue Analytics",
  },

  {
    key: "risk",
    label: "Risk & Compliance",
  },

  {
    key: "lifecycle",
    label: "Lifecycle",
  },

  {
    key: "timeline",
    label: "Timeline",
  },

  {
    key: "notes",
    label: "Notes",
  },

  {
    key: "actions",
    label: "Admin Actions",
  },

  {
    key: "audit",
    label: "Audit Trail",
  },
];

/* =====================================================
   MAIN PAGE
===================================================== */

function ReferralsPage() {
  const [active, setActive] = useState<SectionKey>("overview");

  const [drawer, setDrawer] = useState<null | (typeof CLIENTS)[number]>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex overflow-x-auto px-4">
          {SECTIONS.map((section) => (
            <button
              key={section.key}
              onClick={() => setActive(section.key)}
              className={`border-b-2 px-4 py-3 text-xs font-medium ${
                active === section.key
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6 p-6">
        {active === "overview" && <Overview />}

        {active === "clients" && <ClientsTable onOpen={setDrawer} />}

        {active === "segmentation" && <Segmentation />}

        {active === "funnel" && <AcquisitionFunnel />}

        {active === "financial" && <FinancialAnalytics />}

        {active === "trading" && <TradingAnalytics />}

        {active === "revenue" && <RevenueAnalytics />}

        {active === "risk" && <RiskCompliance />}

        {active === "lifecycle" && <Lifecycle />}

        {active === "timeline" && <Timeline />}

        {active === "notes" && <Notes />}

        {active === "actions" && <AdminActions />}

        {active === "audit" && <AuditTrail />}
      </div>

      {drawer && <ClientDrawer client={drawer} onClose={() => setDrawer(null)} />}
    </div>
  );
}

/* =====================================================
   OVERVIEW
===================================================== */

function Overview() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Kpi label="Total Referred Clients" value="248" />

      <Kpi label="Active Clients" value="184" tone="green" sub="74.2% active rate" />

      <Kpi label="Funded Clients" value="162" tone="blue" />

      <Kpi label="VIP Clients" value="31" tone="violet" />

      <Kpi label="Conversion Rate" value="68%" tone="green" />

      <Kpi label="Total Revenue" value="$189K" tone="green" />

      <Kpi label="Total Deposits" value="$4.8M" tone="blue" />

      <Kpi label="Risk Alerts" value="12" tone="red" />
    </div>
  );
}

/* =====================================================
   CLIENT TABLE
===================================================== */

function ClientsTable({ onOpen }: { onOpen: (client: (typeof CLIENTS)[number]) => void }) {
  const [status, setStatus] = useState("All");
  const [country, setCountry] = useState("All");
  const [risk, setRisk] = useState("All");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    return CLIENTS.filter((client) => {
      return (
        (status === "All" || client.status === status) &&
        (country === "All" || client.country === country) &&
        (risk === "All" || client.risk === risk) &&
        (q === "" ||
          client.name.toLowerCase().includes(q.toLowerCase()) ||
          client.id.toLowerCase().includes(q.toLowerCase()))
      );
    });
  }, [status, country, risk, q]);

  return (
    <Section
      title="Referred Clients"
      subtitle="Click client row to open detailed profile"
      action={
        <Btn variant="outline" onClick={() => toast.success("Export started")}>
          Export
        </Btn>
      }
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <select
          className="h-8 rounded border px-2 text-xs"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Active</option>
          <option>Dormant</option>
          <option>Restricted</option>
        </select>

        <select
          className="h-8 rounded border px-2 text-xs"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option>All</option>
          <option>AE</option>
          <option>GB</option>
          <option>IN</option>
          <option>DE</option>
          <option>SG</option>
          <option>SE</option>
        </select>

        <select
          className="h-8 rounded border px-2 text-xs"
          value={risk}
          onChange={(e) => setRisk(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search client..."
          className="h-8 min-w-[220px] rounded border px-3 text-xs"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              {[
                "Client ID",
                "Name",
                "Country",
                "Status",
                "KYC",
                "Segment",
                "Deposit",
                "Volume",
                "Revenue",
                "Risk",
              ].map((header) => (
                <th key={header} className="px-3 py-2">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((client) => (
              <tr
                key={client.id}
                onClick={() => onOpen(client)}
                className="cursor-pointer border-b hover:bg-gray-50"
              >
                <td className="px-3 py-2 font-mono text-xs">{client.id}</td>

                <td className="px-3 py-2 font-medium">
                  {client.vip && <span className="text-amber-500">★</span>} {client.name}
                </td>

                <td className="px-3 py-2">{client.country}</td>

                <td className="px-3 py-2">
                  <Pill
                    tone={
                      client.status === "Active"
                        ? "green"
                        : client.status === "Dormant"
                          ? "amber"
                          : "red"
                    }
                  >
                    {client.status}
                  </Pill>
                </td>

                <td className="px-3 py-2">
                  <Pill tone="green">{client.kyc}</Pill>
                </td>

                <td className="px-3 py-2">
                  <Pill tone="blue">{client.segment}</Pill>
                </td>

                <td className="px-3 py-2">${client.deposit.toLocaleString()}</td>

                <td className="px-3 py-2">{client.volume.toLocaleString()} lots</td>

                <td className="px-3 py-2 text-emerald-600 font-medium">
                  ${client.revenue.toLocaleString()}
                </td>

                <td className="px-3 py-2">
                  <Pill
                    tone={
                      client.risk === "Low" ? "green" : client.risk === "Medium" ? "amber" : "red"
                    }
                  >
                    {client.risk}
                  </Pill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* =====================================================
   SEGMENTATION
===================================================== */

function Segmentation() {
  const segments = [
    {
      name: "VIP Clients",
      count: 31,
      tone: "violet" as const,
    },

    {
      name: "Professional Traders",
      count: 28,
      tone: "green" as const,
    },

    {
      name: "Retail Clients",
      count: 142,
      tone: "blue" as const,
    },

    {
      name: "Copy Traders",
      count: 22,
      tone: "blue" as const,
    },

    {
      name: "Dormant Clients",
      count: 19,
      tone: "amber" as const,
    },

    {
      name: "Restricted Clients",
      count: 9,
      tone: "red" as const,
    },
  ];

  return (
    <Section title="Client Segmentation">
      <div className="grid gap-3 md:grid-cols-3">
        {segments.map((segment) => (
          <div key={segment.name} className="rounded-lg border p-4">
            <div className="text-xs text-gray-500">{segment.name}</div>

            <div className="mt-2 text-2xl font-semibold">{segment.count}</div>

            <Pill tone={segment.tone}>{segment.name}</Pill>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =====================================================
   ACQUISITION FUNNEL
===================================================== */

function AcquisitionFunnel() {
  const stages = [
    {
      name: "Leads",
      value: 362,
      percent: 100,
    },

    {
      name: "Registered",
      value: 311,
      percent: 86,
    },

    {
      name: "KYC Approved",
      value: 286,
      percent: 79,
    },

    {
      name: "Funded",
      value: 248,
      percent: 68,
    },

    {
      name: "Trading Active",
      value: 184,
      percent: 50,
    },

    {
      name: "VIP",
      value: 31,
      percent: 8,
    },
  ];

  return (
    <Section title="Acquisition Funnel" subtitle="Referral conversion journey">
      <div className="space-y-3">
        {stages.map((stage) => (
          <div key={stage.name} className="flex items-center gap-3">
            <div className="w-32 text-sm">{stage.name}</div>

            <div className="flex-1 overflow-hidden rounded bg-gray-100">
              <div
                className="bg-gray-900 py-2 pl-3 text-xs text-white"
                style={{
                  width: `${stage.percent}%`,
                }}
              >
                {stage.percent}%
              </div>
            </div>

            <div className="w-16 text-right text-sm font-medium">{stage.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
/* =====================================================
   FINANCIAL ANALYTICS
===================================================== */

function FinancialAnalytics() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Financial Metrics">
        <KV k="Total Deposits" v="$4.8M" tone="green" />

        <KV k="Total Withdrawals" v="$1.7M" />

        <KV k="Net Deposits" v="$3.1M" tone="green" />

        <KV k="Average Deposit" v="$19.4K" />

        <KV k="Largest Deposit" v="$245K" />

        <KV k="Deposit Growth" v="+18.4%" tone="green" />

        <KV k="Withdrawal Ratio" v="0.8%" tone="amber" />

        <KV k="Deposit Frequency" v="2.3x / Client / Month" />
      </Section>

      <Section title="Deposit Trend">
        <div className="flex h-44 items-end gap-3">
          {[420, 510, 640, 720, 810, 940].map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-gray-900"
                style={{
                  height: `${(value / 940) * 100}%`,
                }}
              ></div>

              <span className="text-[10px] text-gray-500">M{index + 1}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* =====================================================
   TRADING ANALYTICS
===================================================== */

function TradingAnalytics() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Kpi label="Trading Volume" value="126,400 Lots" tone="blue" />

      <Kpi label="Active Traders" value="184" tone="green" />

      <Kpi label="Average Volume" value="687 Lots" />

      <Kpi label="Profitable Clients" value="118" tone="green" />

      <Kpi label="Losing Clients" value="66" tone="red" />

      <Kpi label="Copy Traders" value="22" tone="violet" />

      <Kpi label="High Volume Traders" value="38" tone="blue" />

      <Kpi label="Average Win Rate" value="61%" tone="green" />
    </div>
  );
}

/* =====================================================
   REVENUE ANALYTICS
===================================================== */

function RevenueAnalytics() {
  const revenueSegments = [
    {
      name: "VIP",
      value: 62,
    },

    {
      name: "Professional",
      value: 21,
    },

    {
      name: "Retail",
      value: 14,
    },

    {
      name: "Copy Trading",
      value: 3,
    },
  ];

  const topClients = [
    {
      rank: 1,
      name: "Mohammed Al-Rashid",
      revenue: "$18,200",
      volume: "12,400",
    },

    {
      rank: 2,
      name: "Emma Richardson",
      revenue: "$9,840",
      volume: "8,210",
    },

    {
      rank: 3,
      name: "Kevin Tan",
      revenue: "$6,780",
      volume: "5,640",
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Revenue Metrics">
        <KV k="Generated Revenue" v="$189,420" tone="green" />

        <KV k="Revenue Per Client" v="$762" />

        <KV k="Revenue Per Lot" v="$1.50" />

        <KV k="Monthly Growth" v="+12%" tone="green" />

        <KV k="Top Client Contribution" v="62%" />
      </Section>

      <Section title="Revenue By Segment">
        <div className="space-y-4">
          {revenueSegments.map((segment) => (
            <div key={segment.name}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{segment.name}</span>

                <span className="font-medium">{segment.value}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded bg-gray-100">
                <div
                  className="h-full bg-gray-900"
                  style={{
                    width: `${segment.value}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Top Revenue Clients" className="lg:col-span-2">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-3 py-2">Rank</th>

              <th className="px-3 py-2">Client</th>

              <th className="px-3 py-2">Revenue</th>

              <th className="px-3 py-2">Volume</th>
            </tr>
          </thead>

          <tbody>
            {topClients.map((client) => (
              <tr key={client.rank} className="border-b">
                <td className="px-3 py-2">#{client.rank}</td>

                <td className="px-3 py-2 font-medium">{client.name}</td>

                <td className="px-3 py-2 text-emerald-600">{client.revenue}</td>

                <td className="px-3 py-2">{client.volume} Lots</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

/* =====================================================
   RISK & COMPLIANCE
===================================================== */

function RiskCompliance() {
  const risks = [
    {
      name: "Low Risk Clients",
      value: 152,
      tone: "green" as const,
    },

    {
      name: "Medium Risk Clients",
      value: 64,
      tone: "amber" as const,
    },

    {
      name: "High Risk Clients",
      value: 7,
      tone: "red" as const,
    },

    {
      name: "AML Review",
      value: 5,
      tone: "amber" as const,
    },

    {
      name: "Restricted Clients",
      value: 9,
      tone: "red" as const,
    },
  ];

  const alerts = [
    "Bonus Abuse",

    "Device Sharing",

    "Multi Accounting",

    "AML Alert",

    "Chargeback Risk",

    "Referral Fraud",

    "Copy Trading Abuse",
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Section title="Risk Overview">
        {risks.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between border-b border-gray-100 py-3"
          >
            <div className="text-sm">{item.name}</div>

            <Pill tone={item.tone}>{item.value}</Pill>
          </div>
        ))}
      </Section>

      <Section title="Risk Monitoring">
        <div className="space-y-2">
          {alerts.map((alert, index) => (
            <div key={alert} className="flex items-center justify-between rounded border p-3">
              <span className="text-sm">{alert}</span>

              <Pill tone={index < 4 ? "red" : "green"}>
                {index < 4 ? `${index + 1} Active` : "No Flags"}
              </Pill>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Client Restrictions" className="lg:col-span-2">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-xs text-gray-500">
            <tr>
              <th className="px-3 py-2">Restriction</th>

              <th className="px-3 py-2">Count</th>

              <th className="px-3 py-2">Status</th>

              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {[
              {
                name: "Trading Disabled",
                count: 2,
              },

              {
                name: "Withdrawal Locked",
                count: 3,
              },

              {
                name: "KYC Pending",
                count: 26,
              },

              {
                name: "AML Review",
                count: 5,
              },

              {
                name: "Account Suspended",
                count: 0,
              },
            ].map((item) => (
              <tr key={item.name} className="border-b">
                <td className="px-3 py-2">{item.name}</td>

                <td className="px-3 py-2">{item.count}</td>

                <td className="px-3 py-2">
                  <Pill tone={item.count > 0 ? "amber" : "green"}>
                    {item.count > 0 ? "Active" : "None"}
                  </Pill>
                </td>

                <td className="px-3 py-2">
                  <Btn variant="outline" onClick={() => toast(`Review ${item.name}`)}>
                    Review
                  </Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

/* =====================================================
   CLIENT LIFECYCLE
===================================================== */

function Lifecycle() {
  const stages = [
    {
      name: "Registered",
      count: 311,
      tone: "blue" as const,
    },

    {
      name: "KYC Approved",
      count: 286,
      tone: "green" as const,
    },

    {
      name: "Funded",
      count: 248,
      tone: "green" as const,
    },

    {
      name: "Trading Active",
      count: 184,
      tone: "green" as const,
    },

    {
      name: "VIP",
      count: 31,
      tone: "violet" as const,
    },

    {
      name: "Dormant",
      count: 19,
      tone: "amber" as const,
    },

    {
      name: "Closed",
      count: 8,
      tone: "red" as const,
    },
  ];

  return (
    <Section title="Client Lifecycle">
      <div className="grid gap-3 md:grid-cols-4">
        {stages.map((stage) => (
          <div key={stage.name} className="rounded-lg border p-4">
            <Pill tone={stage.tone}>{stage.name}</Pill>

            <div className="mt-2 text-2xl font-semibold">{stage.count}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =====================================================
   TIMELINE
===================================================== */

function Timeline() {
  const events = [
    {
      date: "Today",
      title: "New Deposit $12,000",
      client: "CLT-1041 Mohammed Al-Rashid",
    },

    {
      date: "Yesterday",
      title: "First Trade Opened",
      client: "CLT-1018 Kevin Tan",
    },

    {
      date: "3 days ago",
      title: "AML Review Started",
      client: "CLT-1014 Sara Johansson",
    },

    {
      date: "1 week ago",
      title: "VIP Upgrade",
      client: "CLT-1037 Emma Richardson",
    },
  ];

  return (
    <Section title="Referral Activity Timeline">
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="border-l-2 border-gray-200 pl-4">
            <div className="text-xs text-gray-500">{event.date}</div>

            <div className="text-sm font-medium">{event.title}</div>

            <div className="text-xs text-gray-500">{event.client}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =====================================================
   NOTES
===================================================== */

function Notes() {
  const notes = [
    {
      tag: "Potential VIP",
      text: "Increasing deposit activity. Consider VIP upgrade.",
      client: "Mohammed Al-Rashid",
    },

    {
      tag: "High Value",
      text: "Top revenue contributor.",
      client: "Emma Richardson",
    },

    {
      tag: "Follow Up",
      text: "Pending KYC refresh.",
      client: "Rahul Mehta",
    },
  ];

  return (
    <Section
      title="Notes"
      action={<Btn onClick={() => toast.success("Note added")}>+ Add Note</Btn>}
    >
      <div className="space-y-3">
        {notes.map((note, index) => (
          <div key={index} className="rounded border p-3">
            <div className="flex justify-between">
              <Pill tone="violet">{note.tag}</Pill>

              <span className="text-xs text-gray-500">{note.client}</span>
            </div>

            <p className="mt-2 text-sm text-gray-700">{note.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* =====================================================
   ADMIN ACTIONS
===================================================== */

function AdminActions() {
  const groups = [
    {
      title: "Safe Actions",
      items: ["View Client", "Notify Client", "Export List", "Add Note"],
    },

    {
      title: "Management Actions",
      items: ["Assign Manager", "Change Segment", "Mark VIP", "Create Campaign"],
    },

    {
      title: "Risk Actions",
      items: [
        "Restrict Client",
        "Escalate Compliance Review",
        "Remove Referral Mapping",
        "Suspend Referral Benefits",
      ],
    },
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {groups.map((group) => (
        <Section key={group.title} title={group.title}>
          <div className="flex flex-wrap gap-2">
            {group.items.map((action) => (
              <Btn
                key={action}
                variant={group.title === "Risk Actions" ? "danger" : "outline"}
                onClick={() => toast(`${action} triggered`)}
              >
                {action}
              </Btn>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

/* =====================================================
   AUDIT TRAIL
===================================================== */

function AuditTrail() {
  const logs = [
    {
      action: "Client marked VIP",
      by: "Priya Nair",
      time: "Today 10:14",
    },

    {
      action: "AML Review Opened",
      by: "Compliance Bot",
      time: "3 days ago",
    },

    {
      action: "Referral mapping updated",
      by: "System",
      time: "5 days ago",
    },

    {
      action: "Campaign created",
      by: "Marketing",
      time: "1 week ago",
    },
  ];

  return (
    <Section
      title="Audit Trail"
      action={
        <Btn variant="outline" onClick={() => toast.success("Exported")}>
          Export
        </Btn>
      }
    >
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 text-left text-xs text-gray-500">
          <tr>
            <th className="px-3 py-2">Action</th>

            <th className="px-3 py-2">By</th>

            <th className="px-3 py-2">Time</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log, index) => (
            <tr key={index} className="border-b">
              <td className="px-3 py-2">{log.action}</td>

              <td className="px-3 py-2">{log.by}</td>

              <td className="px-3 py-2 text-gray-500">{log.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
/* =====================================================
   CLIENT DRAWER
===================================================== */

function ClientDrawer({
  client,

  onClose,
}: {
  client: (typeof CLIENTS)[number];

  onClose: () => void;
}) {
  type DrawerTab = "overview" | "financial" | "trading" | "compliance" | "timeline" | "actions";

  const [tab, setTab] = useState<DrawerTab>("overview");

  const tabs: [DrawerTab, string][] = [
    ["overview", "Overview"],

    ["financial", "Financial"],

    ["trading", "Trading"],

    ["compliance", "Compliance"],

    ["timeline", "Timeline"],

    ["actions", "Actions"],
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}

      <div className="flex-1 bg-black/30" onClick={onClose} />

      {/* Drawer */}

      <div className="flex h-full w-full max-w-xl flex-col bg-white shadow-xl">
        {/* Header */}

        <div className="border-b p-5">
          <div className="flex justify-between">
            <div>
              <div className="text-xs text-gray-500">
                {client.id} · {client.country}
              </div>

              <h2 className="mt-1 text-xl font-semibold">
                {client.vip && <span className="text-amber-500">★</span>} {client.name}
              </h2>

              <div className="mt-3 flex flex-wrap gap-2">
                <Pill
                  tone={
                    client.status === "Active"
                      ? "green"
                      : client.status === "Dormant"
                        ? "amber"
                        : "red"
                  }
                >
                  {client.status}
                </Pill>

                <Pill tone="blue">{client.segment}</Pill>

                <Pill
                  tone={
                    client.risk === "Low" ? "green" : client.risk === "Medium" ? "amber" : "red"
                  }
                >
                  {client.risk} Risk
                </Pill>

                <Pill tone="green">KYC Approved</Pill>
              </div>
            </div>

            <button onClick={onClose} className="text-gray-400 hover:text-gray-800">
              ✕
            </button>
          </div>

          {/* Drawer navigation */}

          <div className="mt-5 flex gap-2 overflow-x-auto">
            {tabs.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`rounded-md px-3 py-2 text-xs ${
                  tab === key ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-5">
          {/* ================= OVERVIEW ================= */}

          {tab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Kpi label="Deposit" value={`$${client.deposit.toLocaleString()}`} tone="blue" />

                <Kpi label="Revenue" value={`$${client.revenue.toLocaleString()}`} tone="green" />

                <Kpi label="Trading Volume" value={`${client.volume.toLocaleString()} Lots`} />

                <Kpi label="Segment" value={client.segment} tone="violet" />
              </div>

              <Section title="Client Information">
                <KV k="Client ID" v={client.id} />

                <KV k="Country" v={client.country} />

                <KV k="Account Status" v={client.status} />

                <KV k="KYC Status" v={client.kyc} />

                <KV k="Risk Level" v={client.risk} />

                <KV k="Referral Partner" v="IB-00412" />

                <KV k="Account Manager" v="Priya Nair" />
              </Section>
            </div>
          )}

          {/* ================= FINANCIAL ================= */}

          {tab === "financial" && (
            <Section title="Financial Details">
              <KV k="Total Deposit" v={`$${client.deposit.toLocaleString()}`} />

              <KV k="Total Withdrawal" v="$85,000" />

              <KV k="Current Balance" v="$160,000" />

              <KV k="Net Deposit" v="$160,000" tone="green" />

              <KV k="Generated Revenue" v={`$${client.revenue.toLocaleString()}`} tone="green" />

              <KV k="Commission Earned" v="$2,450" />

              <KV k="Last Deposit" v="3 days ago" />
            </Section>
          )}

          {/* ================= TRADING ================= */}

          {tab === "trading" && (
            <Section title="Trading Details">
              <KV k="Trading Volume" v={`${client.volume.toLocaleString()} Lots`} />

              <KV k="Total Trades" v="284" />

              <KV k="Winning Trades" v="201" tone="green" />

              <KV k="Losing Trades" v="83" tone="red" />

              <KV k="Win Rate" v="71%" tone="green" />

              <KV k="Main Instruments" v="XAUUSD, EURUSD, NAS100" />

              <KV k="Copy Trading" v="Disabled" />
            </Section>
          )}

          {/* ================= COMPLIANCE ================= */}

          {tab === "compliance" && (
            <Section title="Compliance Details">
              <KV k="KYC" v={<Pill tone="green">Approved</Pill>} />

              <KV k="AML Check" v={<Pill tone="green">Clear</Pill>} />

              <KV k="Sanctions" v={<Pill tone="green">Passed</Pill>} />

              <KV k="PEP Screening" v={<Pill tone="green">Negative</Pill>} />

              <KV k="Document Status" v="Complete" />

              <KV k="Last Review" v="08 June 2026" />

              <KV k="Reviewed By" v="Compliance Team" />
            </Section>
          )}

          {/* ================= TIMELINE ================= */}

          {tab === "timeline" && (
            <Section title="Client Timeline">
              <div className="space-y-4">
                <div className="border-l-2 pl-4">
                  <div className="text-xs text-gray-500">Jan 2024</div>

                  <div className="text-sm font-medium">Account Registered</div>
                </div>

                <div className="border-l-2 pl-4">
                  <div className="text-xs text-gray-500">Jan 2024</div>

                  <div className="text-sm font-medium">KYC Approved</div>
                </div>

                <div className="border-l-2 pl-4">
                  <div className="text-xs text-gray-500">Feb 2024</div>

                  <div className="text-sm font-medium">First Deposit Completed</div>
                </div>

                <div className="border-l-2 pl-4">
                  <div className="text-xs text-gray-500">May 2026</div>

                  <div className="text-sm font-medium">VIP Review Completed</div>
                </div>
              </div>
            </Section>
          )}

          {/* ================= ACTIONS ================= */}

          {tab === "actions" && (
            <Section title="Available Actions">
              <div className="flex flex-wrap gap-2">
                <Btn variant="outline" onClick={() => toast("Opening profile")}>
                  View Full Profile
                </Btn>

                <Btn variant="outline" onClick={() => toast("Notification sent")}>
                  Send Notification
                </Btn>

                <Btn variant="outline" onClick={() => toast("Note added")}>
                  Add Note
                </Btn>

                <Btn variant="outline" onClick={() => toast("Assigned manager")}>
                  Assign Manager
                </Btn>

                <Btn variant="outline" onClick={() => toast("VIP upgrade started")}>
                  Mark VIP
                </Btn>

                <Btn variant="danger" onClick={() => toast("Compliance review opened")}>
                  Compliance Review
                </Btn>

                <Btn variant="danger" onClick={() => toast("Client restricted")}>
                  Restrict Client
                </Btn>
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}
