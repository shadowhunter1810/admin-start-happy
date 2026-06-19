import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
// import { KycTab } from "@/lib/pixel-source";
import KycTab from "@/components/client/KycTab";

export const Route = createFileRoute("/kyc")({
  head: () => ({
    meta: [
      { title: "KYC · Atlas CRM" },
      { name: "description", content: "KYC and AML status for the client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <KycTab />
    </ClientShell>
  ),
});
