import { useRef, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/client/ClientShell";
import { notify } from "@/lib/actions";
import { Eye, Download, Flag, X } from "lucide-react";

type RowDetail = {
  title: string;
  context: string;
  columns: string[];
  values: string[];
};

/**
 * Wraps any tab/page in a click-delegation handler. Clicking any
 * <tr class="cursor-pointer"> (or any element with data-rowclick)
 * opens a universal "Row Details" modal that reads the row's column
 * headers and cell text — giving every table on every page a working
 * detail view without editing the tab source.
 */
export function RowClickWrapper({
  children,
  context,
}: {
  children: ReactNode;
  context: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<RowDetail | null>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't hijack clicks on real buttons / links / inputs
    if (target.closest("button, a, input, select, textarea, [role='button']")) return;
    const tr = target.closest("tr") as HTMLTableRowElement | null;
    if (!tr) return;
    const table = tr.closest("table");
    if (!table) return;
    const headRow = table.querySelector("thead tr");
    if (!headRow) return;
    const heads = Array.from(headRow.querySelectorAll("th")).map(
      (th) => (th.textContent || "").trim() || "—",
    );
    const cells = Array.from(tr.querySelectorAll("td")).map(
      (td) => (td.textContent || "").trim() || "—",
    );
    if (cells.length === 0) return; // header row click

    // Try to find a section/card title above the table
    let sectionTitle = context;
    let parent: HTMLElement | null = table.parentElement;
    while (parent) {
      const h = parent.querySelector(":scope > header h2, :scope > h2, :scope > h3");
      if (h?.textContent) {
        sectionTitle = h.textContent.trim();
        break;
      }
      parent = parent.parentElement;
    }

    setDetail({
      title: cells[0] || "Row details",
      context: sectionTitle,
      columns: heads,
      values: cells,
    });
  };

  return (
    <div ref={ref} onClick={onClick}>
      {children}
      <Dialog open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-2 flex-wrap">
              <Pill tone="primary">{detail?.context}</Pill>
              <Pill tone="info">Detail view</Pill>
            </div>
            <DialogTitle className="font-display text-xl mt-1 truncate">
              {detail?.title}
            </DialogTitle>
            <DialogDescription>
              Full record — all columns from this row, plus contextual actions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            {detail?.columns.map((col, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 border-b border-border/40 py-2 last:border-b-0"
              >
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground shrink-0 w-32">
                  {col}
                </span>
                <span className="text-sm font-medium text-right break-words">
                  {detail.values[i] || "—"}
                </span>
              </div>
            ))}
          </div>

          <DialogFooter className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => notify("Opening full record", "Drill-down loading…")}
            >
              <Eye className="h-3.5 w-3.5" />
              View full
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => notify("Export started", "CSV download initiated.", "success")}
            >
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => notify("Flagged for review", "Compliance team notified.", "warning")}
            >
              <Flag className="h-3.5 w-3.5" />
              Flag
            </Button>
            <Button size="sm" onClick={() => setDetail(null)}>
              <X className="h-3.5 w-3.5" />
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
