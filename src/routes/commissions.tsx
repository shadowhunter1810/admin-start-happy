import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { CommissionsTab } from "@/lib/pixel-source";

export const Route = createFileRoute("/commissions")({
  head: () => ({
    meta: [
      { title: "Commissions · Atlas CRM" },
      { name: "description", content: "IB commission earnings and payouts." },
    ],
  }),
  component: () => (
    <ClientShell>
      <CommissionsTab />
    </ClientShell>
  ),
});
