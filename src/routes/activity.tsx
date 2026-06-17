import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { ActivityTab } from "@/lib/pixel-source";

export const Route = createFileRoute("/activity")({
  head: () => ({
    meta: [
      { title: "Activity · Atlas CRM" },
      { name: "description", content: "Activity timeline for this client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <ActivityTab />
    </ClientShell>
  ),
});
