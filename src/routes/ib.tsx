import { createFileRoute } from "@tanstack/react-router";
import { ClientShell } from "@/components/client/ClientShell";
import IbPartnerTab from "@/components/tabs/IbPartnerTab";

export const Route = createFileRoute("/ib")({
  head: () => ({
    meta: [
      { title: "IB / Partner · Atlas CRM" },
      { name: "description", content: "Full Introducing Broker partner dashboard — profile, tier, commissions, referrals, sub-IBs, risk, compliance, audit." },
    ],
  }),
  component: () => (
    <ClientShell>
      <IbPartnerTab />
    </ClientShell>
  ),
});
