import { useRef, useState, type ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/client/ClientShell";
import { notify } from "@/lib/actions";
import { buildDetail, type DetailPayload, type DetailField } from "@/components/client/row-details";
import { Download, Eye, Flag, X } from "lucide-react";

function toneClass(tone?: DetailField["tone"]) {
  switch (tone) {
    case "good":
      return "text-emerald-400";
    case "warn":
      return "text-amber-400";
    case "bad":
      return "text-red-400";
    case "info":
      return "text-sky-400";
    default:
      return "text-foreground";
  }
}

/**
 * Click delegation wrapper. Any <tr> click inside the wrapped subtree
 * opens a wide right-side Sheet with section tabs built from the page
 * context (Trading, History, Copy Trading, KYC, Risk, Security,
 * Support, Activity, IB Partner, Referrals). Falls back to a generic
 * "Overview + Notes" layout for other contexts.
 */
export function RowClickWrapper({
  children,
  context,
}: {
  children: ReactNode;
  context: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [detail, setDetail] = useState<DetailPayload | null>(null);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
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
    if (cells.length === 0) return;
    setDetail(buildDetail(context, heads, cells));
  };

  const initial = detail?.sections[0]?.key ?? "overview";

  return (
    <div ref={ref} onClick={onClick}>
      {children}
      <Sheet open={!!detail} onOpenChange={(o) => !o && setDetail(null)}>
        <SheetContent
          side="right"
          className="bg-card border-border w-full sm:max-w-[820px] p-0 flex flex-col"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b border-border/60">
            <div className="flex flex-wrap items-center gap-2">
              {detail?.pills.map((p, i) => (
                <Pill key={i} tone={p.tone}>
                  {p.label}
                </Pill>
              ))}
            </div>
            <SheetTitle className="font-display text-2xl mt-2 truncate">
              {detail?.title}
            </SheetTitle>
            <SheetDescription className="text-sm text-muted-foreground">
              {detail?.subtitle}
            </SheetDescription>
          </SheetHeader>

          {detail && (
            <Tabs
              key={detail.title}
              defaultValue={initial}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="border-b border-border/60 px-4 overflow-x-auto">
                <TabsList className="h-auto bg-transparent p-0 gap-1 flex-nowrap">
                  {detail.sections.map((s) => (
                    <TabsTrigger
                      key={s.key}
                      value={s.key}
                      className="text-xs px-3 py-2 data-[state=active]:bg-muted whitespace-nowrap"
                    >
                      {s.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {detail.sections.map((s) => (
                  <TabsContent key={s.key} value={s.key} className="mt-0 space-y-5">
                    {s.fields && s.fields.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {s.fields.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-start justify-between gap-3 rounded-md border border-border/40 bg-background/40 px-3 py-2"
                          >
                            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                              {f.label}
                            </span>
                            <span
                              className={`text-sm font-medium text-right break-words ${toneClass(
                                f.tone,
                              )}`}
                            >
                              {f.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {s.tables?.map((t, ti) => (
                      <div
                        key={ti}
                        className="rounded-md border border-border/40 bg-background/40 overflow-hidden"
                      >
                        <div className="px-3 py-2 border-b border-border/40 text-[11px] uppercase tracking-wider text-muted-foreground">
                          {t.title}
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="text-muted-foreground">
                              <tr>
                                {t.columns.map((c, i) => (
                                  <th
                                    key={i}
                                    className="text-left font-medium px-3 py-2 border-b border-border/30"
                                  >
                                    {c}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {t.rows.map((r, ri) => (
                                <tr key={ri} className="border-b border-border/20 last:border-b-0">
                                  {r.map((cell, ci) => (
                                    <td key={ci} className="px-3 py-2 align-top">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {s.notes?.map((n, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {n}
                      </p>
                    ))}
                  </TabsContent>
                ))}
              </div>

              <div className="border-t border-border/60 px-6 py-3 flex flex-wrap gap-2">
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
                  onClick={() =>
                    notify("Export started", "CSV download initiated.", "success")
                  }
                >
                  <Download className="h-3.5 w-3.5" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    notify("Flagged for review", "Compliance team notified.", "warning")
                  }
                >
                  <Flag className="h-3.5 w-3.5" />
                  Flag
                </Button>
                <Button size="sm" className="ml-auto" onClick={() => setDetail(null)}>
                  <X className="h-3.5 w-3.5" />
                  Close
                </Button>
              </div>
            </Tabs>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
