import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { RiskMonitoringTab } from "@/lib/risk-source";

export const Route = createFileRoute("/risk")({
  head: () => ({
    meta: [
      { title: "Risk Monitoring · Atlas CRM" },
      { name: "description", content: "Real-time risk, fraud and AML monitoring." },
    ],
  }),
  component: () => (
    <ClientShell>
      <RiskMonitoringTab />
    </ClientShell>
  ),
});
