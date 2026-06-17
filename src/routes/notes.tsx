import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import { NotesTab } from "@/lib/risk-source";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes · Atlas CRM" },
      { name: "description", content: "Internal notes pinned to this client's timeline." },
    ],
  }),
  component: () => (
    <ClientShell>
      <NotesTab />
    </ClientShell>
  ),
});
