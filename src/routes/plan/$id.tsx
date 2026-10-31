import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button, Frame } from "@/components/grid/ui";
import { VENUES, getPerson, windowTarget } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/plan/$id")({
  component: PlanPage,
});

function PlanPage() {
  const { id } = Route.useParams();
  return (
    <Frame immersive>
      <PlanView id={id} />
    </Frame>
  );
}

function PlanView({ id }: { id: string }) {
  const person = getPerson(id);
  const meetup = useGrid((s) => s.meetups[id]);
  const trusted = useGrid((s) => s.trusted);
  const meArea = useGrid((s) => s.me.areaId);
  const setTrusted = useGrid((s) => s.setTrusted);
  const startMeetup = useGrid((s) => s.startMeetup);
  const checkMeetup = useGrid((s) => s.checkMeetup);
  const clearMeetup = useGrid((s) => s.clearMeetup);
  const pushToast = useGrid((s) => s.pushToast);
  const [venueId, setVenueId] = useState(VENUES[0].id);
  const [kind, setKind] = useState<"hour" | "evening" | "tomorrow">("hour");
  const [note, setNote] = useState("");
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  if (!person) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Link to="/" className="font-semibold text-ember">
          Back
        </Link>
      </div>
    );
  }

  const venue = VENUES.find((item) => item.id === (meetup?.venueId ?? venueId));
  const active = meetup && !meetup.closed;

  async function copyExit() {
    if (!meetup) return;
    const place = VENUES.find((item) => item.id === meetup.venueId)?.name ?? "a public place";
    const body = `Check-in from MEAT: I am leaving a plan with ${person?.name.split(" ")[0]} at ${place} (${meetup.windowLabel}). I am heading out now.${trusted ? ` Please look for a message to ${trusted}.` : ""}`;
    try {
      await navigator.clipboard.writeText(body);
      pushToast("Check-in note copied");
    } catch {
      pushToast("Couldn’t copy. The note is in your safety log.");
    }
  }

  return (
    <div className="safe-top mx-auto min-h-dvh max-w-lg px-4 pb-8">
      <Link to="/p/$id" params={{ id }} className="press inline-flex min-h-11 items-center text-sm font-semibold">
        Back
      </Link>
      <p className="mt-4 font-mono text-xs uppercase tracking-wide text-ember">Meetup</p>
      <h1 className="font-display text-4xl font-extrabold">A public plan with {person.name.split(" ")[0]}</h1>
      <p className="mt-2 text-sm text-muted">No home addresses. Check-ins stay on this device. Leaving is the biggest button, on purpose.</p>

      {active && meetup ? (
        <div className="mt-6">
          <p className="text-sm text-muted">{venue?.name}</p>
          <p className="text-sm text-muted">{venue?.detail}</p>
          <p className="mt-4 font-mono text-5xl font-medium tabular-nums">{formatLeft(meetup.target - now)}</p>
          <p className="mt-1 text-sm text-muted">{meetup.target <= now ? "The window is open." : meetup.windowLabel}</p>
          {meetup.note ? <p className="mt-3 text-sm">{meetup.note}</p> : null}
          <div className="mt-6 space-y-2">
            <Button className="w-full" onClick={() => void (checkMeetup(id, "leave"), copyExit())}>
              I need to leave
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="ghost" onClick={() => checkMeetup(id, "here")}>
                I’m here
              </Button>
              <Button variant="ghost" onClick={() => checkMeetup(id, "safe")}>
                I’m safe
              </Button>
            </div>
          </div>
          {meetup.checks.length > 0 ? (
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {meetup.checks.map((check) => (
                <li key={check.at}>
                  {check.kind === "here" ? "Here" : check.kind === "safe" ? "Safe" : "Left"} · {new Date(check.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const target = windowTarget(kind);
            startMeetup(id, { venueId, windowLabel: target.label, target: target.target, note: note.trim() });
          }}
        >
          <fieldset>
            <legend className="text-sm font-semibold">Public place</legend>
            <div className="mt-2 space-y-2">
              {VENUES.map((item) => (
                <label key={item.id} className="flex min-h-11 items-start gap-3 rounded-2xl border border-line bg-raised px-3 py-2">
                  <input className="mt-1" type="radio" name="venue" checked={venueId === item.id} onChange={() => setVenueId(item.id)} />
                  <span>
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted">
                      {item.detail}
                      {item.areaId === person.areaId ? " · Near them" : ""}
                      {item.areaId === meArea ? " · Near your home area" : ""}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-semibold">Window</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["hour", "In an hour"],
                  ["evening", "Evening, 7pm"],
                  ["tomorrow", "Tomorrow afternoon"],
                ] as const
              ).map(([value, label]) => (
                <button key={value} type="button" aria-pressed={kind === value} className={kind === value ? "press min-h-11 rounded-full bg-ember px-3 text-sm font-semibold text-ember-ink" : "press min-h-11 rounded-full border border-line px-3 text-sm"} onClick={() => setKind(value)}>
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">Note for yourself</span>
            <textarea className="field min-h-20 resize-none" maxLength={200} value={note} onChange={(event) => setNote(event.target.value)} />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm text-muted">Trusted contact name, optional</span>
            <input className="field" maxLength={40} value={trusted} placeholder="Who should a copied note mention?" onChange={(event) => setTrusted(event.target.value)} />
          </label>
          <Button type="submit" className="w-full">
            Start plan
          </Button>
        </form>
      )}
      {meetup?.closed ? (
        <div className="mt-6 rounded-card border border-line bg-surface p-4">
          <h2 className="font-display text-2xl font-bold">Exit logged</h2>
          <p className="mt-2 text-sm text-muted">Copy the note if you want someone to have it. MEAT does not text anyone.</p>
          <button type="button" className="press mt-3 min-h-11 font-semibold text-ember" onClick={() => void copyExit()}>
            Copy check-in note
          </button>
          <button type="button" className="press mt-2 block min-h-11 text-sm text-muted" onClick={() => clearMeetup(id)}>
            Plan another
          </button>
        </div>
      ) : null}
    </div>
  );
}

function formatLeft(ms: number) {
  if (ms <= 0) return "00:00:00";
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return [h, m, s].map((part) => String(part).padStart(2, "0")).join(":");
}
