import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { PermissionsAccessTab } from "@/lib/risk-source";

export const Route = createFileRoute("/permissions")({
  head: () => ({
    meta: [
      { title: "Permissions · Atlas CRM" },
      { name: "description", content: "Account permissions, restrictions and feature flags." },
    ],
  }),
  component: () => (
    <ClientShell>
      <PermissionsAccessTab />
    </ClientShell>
  ),
});
