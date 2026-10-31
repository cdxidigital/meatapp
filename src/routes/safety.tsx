import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Frame, Sheet } from "@/components/grid/ui";
import { getPerson, shortTime } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/safety")({
  component: SafetyPage,
});

function SafetyPage() {
  const blocked = useGrid((s) => s.blocked);
  const hidden = useGrid((s) => s.hidden);
  const muted = useGrid((s) => s.muted);
  const reports = useGrid((s) => s.reports);
  const log = useGrid((s) => s.log);
  const trusted = useGrid((s) => s.trusted);
  const unblock = useGrid((s) => s.unblock);
  const unhide = useGrid((s) => s.unhide);
  const unmute = useGrid((s) => s.unmute);
  const setTrusted = useGrid((s) => s.setTrusted);
  const erase = useGrid((s) => s.erase);
  const [confirm, setConfirm] = useState(false);

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/you" className="text-sm font-semibold text-ember">
            Back to you
          </Link>
          <h1 className="mt-2 font-display text-3xl font-extrabold">Safety centre</h1>
          <p className="mt-1 text-sm text-muted">Block, report, hide, and erase stay free. None of this is sold back to you.</p>
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-8 px-3 py-5 lg:px-8">
        <Section title="Blocked" empty="No one is blocked.">
          {blocked.map((id) => {
            const person = getPerson(id);
            return (
              <Row key={id} label={person?.name ?? "Profile"} action="Unblock" onAction={() => unblock(id)} />
            );
          })}
        </Section>
        <Section title="Hidden" empty="Your grid isn’t hiding anyone.">
          {hidden.map((id) => (
            <Row key={id} label={getPerson(id)?.name ?? "Profile"} action="Unhide" onAction={() => unhide(id)} />
          ))}
        </Section>
        <Section title="Muted" empty="No muted chats.">
          {muted.map((id) => (
            <Row key={id} label={getPerson(id)?.name ?? "Profile"} action="Unmute" onAction={() => unmute(id)} />
          ))}
        </Section>
        <section>
          <h2 className="text-sm font-semibold">Reports</h2>
          {reports.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No reports filed on this device.</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {reports.map((report) => (
                <li key={report.id} className="rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
                  <p className="font-semibold">{getPerson(report.personId)?.name ?? "Profile"}</p>
                  <p className="text-muted">{report.reason}</p>
                  {report.note ? <p className="mt-1">{report.note}</p> : null}
                  <p className="mt-1 font-mono text-xs text-faint">{shortTime(report.at)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Trusted contact</span>
          <span className="mb-2 block text-sm text-muted">A name for copied check-in notes. MEAT does not message them.</span>
          <input className="field" maxLength={40} value={trusted} onChange={(event) => setTrusted(event.target.value)} />
        </label>
        <section>
          <h2 className="text-sm font-semibold">On this device</h2>
          <p className="mt-1 text-sm text-muted">This browser only. Another phone does not see this log.</p>
          {log.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No safety events yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {log.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-3 text-sm">
                  <span>{item.label}</span>
                  <span className="shrink-0 font-mono text-xs text-faint">{shortTime(item.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <Button variant="ghost" className="w-full" onClick={() => setConfirm(true)}>
          Erase MEAT on this device
        </Button>
      </div>
      <Sheet open={confirm} onOpenChange={setConfirm} title="Erase this device?" description="Chats, your profile, filters, and the safety log on this phone will be removed.">
        <Button
          className="w-full"
          onClick={() => {
            erase();
            setConfirm(false);
          }}
        >
          Erase
        </Button>
      </Sheet>
    </Frame>
  );
}

function Section({ title, empty, children }: { title: string; empty: string; children: React.ReactNode }) {
  const list = Array.isArray(children) ? children : children ? [children] : [];
  const filled = list.some(Boolean);
  return (
    <section>
      <h2 className="text-sm font-semibold">{title}</h2>
      {filled ? <ul className="mt-2 divide-y divide-line">{children}</ul> : <p className="mt-2 text-sm text-muted">{empty}</p>}
    </section>
  );
}

function Row({ label, action, onAction }: { label: string; action: string; onAction: () => void }) {
  return (
    <li className="flex items-center justify-between gap-3 py-2">
      <span className="text-sm">{label}</span>
      <button type="button" className="press min-h-11 text-sm font-semibold text-ember" onClick={onAction}>
        {action}
      </button>
    </li>
  );
}
