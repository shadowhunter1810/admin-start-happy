import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { CommunicationHistoryTab } from "@/lib/risk-source";

export const Route = createFileRoute("/comms")({
  head: () => ({
    meta: [
      { title: "Communications · Atlas CRM" },
      { name: "description", content: "Full email, SMS, call and chat history with this client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <CommunicationHistoryTab />
    </ClientShell>
  ),
});
