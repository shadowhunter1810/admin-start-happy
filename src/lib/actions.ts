import { toast } from "sonner";

type Kind = "success" | "info" | "warning" | "danger";

export function notify(action: string, detail?: string, kind: Kind = "info") {
  const opts = detail ? { description: detail } : undefined;
  switch (kind) {
    case "success":
      return toast.success(action, opts);
    case "warning":
      return toast.warning(action, opts);
    case "danger":
      return toast.error(action, opts);
    default:
      return toast(action, opts);
  }
}

export function confirmAction(action: string, detail?: string, kind: Kind = "warning") {
  return new Promise<boolean>((resolve) => {
    const id = toast(action, {
      description: detail ?? "Click confirm to proceed.",
      duration: 8000,
      action: {
        label: "Confirm",
        onClick: () => {
          notify(`${action} — done`, undefined, kind === "danger" ? "danger" : "success");
          resolve(true);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => resolve(false),
      },
    });
    void id;
  });
}
