import { useState } from "react";
import { REPORT_REASONS, getPerson } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { Button } from "@/components/grid/ui";

export function ReportForm({ personId, onDone }: { personId: string; onDone: () => void }) {
  const person = getPerson(personId);
  const report = useGrid((s) => s.report);
  const [reason, setReason] = useState<(typeof REPORT_REASONS)[number]>(REPORT_REASONS[0]);
  const [note, setNote] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        report(personId, reason, note);
        onDone();
      }}
    >
      <fieldset>
        <legend className="sr-only">Reason</legend>
        <div className="space-y-2">
          {REPORT_REASONS.map((item) => (
            <label key={item} className="flex min-h-11 items-center gap-3 rounded-2xl border border-line bg-raised px-3 text-sm">
              <input type="radio" name="reason" checked={reason === item} onChange={() => setReason(item)} />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="mt-4 block">
        <span className="mb-1 block text-sm text-muted">Note, optional</span>
        <textarea className="field min-h-24 resize-none" maxLength={400} value={note} onChange={(event) => setNote(event.target.value)} />
      </label>
      <p className="mt-3 text-sm text-muted">
        Filing this also blocks {person?.name.split(" ")[0] ?? "them"}. The report stays on this device and is not shown to them.
      </p>
      <Button type="submit" className="mt-4 w-full">
        File report and block
      </Button>
    </form>
  );
}
