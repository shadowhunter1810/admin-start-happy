import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
// import { KycTab } from "@/lib/pixel-source";
import InvestigationCasesTab from "@/components/client/InvestigationCasesTab";

export const Route = createFileRoute("/investigate")({
  head: () => ({
    meta: [
      { title: "Investigation · Atlas CRM" },
      { name: "description", content: "Investigation status for the client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <InvestigationCasesTab />
    </ClientShell>
  ),
});
