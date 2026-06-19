import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { InteractiveTab } from "@/components/client/InteractiveTab";
// import { CopyTradingTab } from "@/lib/pixel-source";
import { CopyTradingTab } from "@/components/client/CopyTradingTab";

export const Route = createFileRoute("/copy-trading")({
  head: () => ({
    meta: [
      { title: "Copy Trading · Atlas CRM" },
      {
        name: "description",
        content: "Strategy providers, followers and copy-trading allocations.",
      },
    ],
  }),
  component: () => (
    <ClientShell>
      <InteractiveTab render={({ openDrawer }) => <CopyTradingTab />} />
    </ClientShell>
  ),
});
