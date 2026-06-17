import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { SecuritySessionsTab } from "@/lib/risk-source";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security & Sessions · Atlas CRM" },
      { name: "description", content: "Sessions, devices and security events for this client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <SecuritySessionsTab />
    </ClientShell>
  ),
});
