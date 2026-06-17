import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { InteractiveTab } from "@/components/client/InteractiveTab";
import { SupportTab } from "@/lib/pixel-source";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support · Atlas CRM" },
      { name: "description", content: "Support tickets, SLAs and CSAT for this client." },
    ],
  }),
  component: () => (
    <ClientShell>
      <InteractiveTab
        render={({ openDrawer, openAction }) => (
          <SupportTab openDrawer={openDrawer} openAction={openAction} />
        )}
      />
    </ClientShell>
  ),
});
