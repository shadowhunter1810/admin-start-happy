import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { InteractiveTab } from "@/components/client/InteractiveTab";
import { ReferralsTab } from "@/lib/pixel-source";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "Referrals · Atlas CRM" },
      { name: "description", content: "Referred clients and activation funnel." },
    ],
  }),
  component: () => (
    <ClientShell>
      <InteractiveTab
        render={({ openDrawer, search }) => (
          <ReferralsTab openDrawer={openDrawer} search={search} />
        )}
      />
    </ClientShell>
  ),
});
