import { useState, type ReactNode } from "react";
import {
  DetailDrawer,
  ActionDialog,
  type DrawerData,
  type ActionKind,
} from "@/lib/pixel-source";

type RenderProps = {
  openDrawer: (d: DrawerData) => void;
  openAction: (k: ActionKind) => void;
  search: string;
};

/**
 * Wraps a tab that needs drawer/action state. Manages the DetailDrawer
 * and ActionDialog overlays so every interactive table row, ticket and
 * provider card opens a full detail sheet.
 */
export function InteractiveTab({
  render,
}: {
  render: (props: RenderProps) => ReactNode;
}) {
  const [drawer, setDrawer] = useState<DrawerData>(null);
  const [action, setAction] = useState<ActionKind>(null);
  const [search] = useState("");

  return (
    <>
      {render({ openDrawer: setDrawer, openAction: setAction, search })}
      <DetailDrawer data={drawer} onClose={() => setDrawer(null)} />
      <ActionDialog kind={action} onClose={() => setAction(null)} />
    </>
  );
}
