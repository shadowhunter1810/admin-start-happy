import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { AnalyticsTab } from "@/lib/pixel-source";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · Atlas CRM" },
      { name: "description", content: "Performance analytics across the client portfolio." },
    ],
  }),
  component: () => (
    <ClientShell>
      <AnalyticsTab />
    </ClientShell>
  ),
});
