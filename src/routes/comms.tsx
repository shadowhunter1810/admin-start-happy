import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { CommunicationHistoryTab } from "@/lib/risk-source";
import { CommunicationHistory } from "@/components/client/CommunicationHistory";

export const Route = createFileRoute("/comms")({
  head: () => ({
    meta: [
      { title: "Communications · Atlas CRM" },
      { name: "description", content: "Full email, SMS, call and chat history with this client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <CommunicationHistory />
    </ClientShell>
  ),
});
