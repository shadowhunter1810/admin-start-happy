import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { MarketingCampaignsTab } from "@/components/MarketingCampaignsTab";

export const Route = createFileRoute("/marketing")({
  head: () => ({
    meta: [
      { title: "Marketing Campaigns · Atlas CRM" },
      { name: "description", content: "Marketing campaigns targeting this client segment." },
    ],
  }),
  component: () => (
    <ClientShell>
      <MarketingCampaignsTab />
    </ClientShell>
  ),
});
