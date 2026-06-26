import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CRM Admin" },
      { name: "description", content: "CRM Admin" },
      { property: "og:title", content: "CRM Admin" },
      { property: "og:description", content: "CRM Admin" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "CRM Admin" },
      { name: "twitter:description", content: "CRM Admin" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-4xl font-semibold text-foreground">CRM Admin</h1>
    </div>
  );
}
