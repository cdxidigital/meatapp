import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Portrait } from "@/components/grid/ui";
import { areaById } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { CIRCLES, SCENE, circleMembers } from "@/lib/grid/upgrade";

export const Route = createFileRoute("/scene")({
  component: ScenePage,
});

function ScenePage() {
  const rsvps = useGrid((s) => s.rsvps);
  const rsvp = useGrid((s) => s.rsvp);
  const events = SCENE.filter((item) => item.kind === "event");
  const clubs = SCENE.filter((item) => item.kind === "club");

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/" className="text-sm font-semibold text-muted">
            Nearby
          </Link>
          <h1 className="font-display text-3xl font-extrabold">Scene</h1>
          <p className="mt-1 text-sm text-muted">Public listings and joint profiles. An RSVP stays on this device. It does not share your exact spot.</p>
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-8 px-3 py-4 lg:px-8">
        <section>
          <h2 className="font-display text-2xl font-bold">Events</h2>
          <ul className="mt-3 space-y-3">
            {events.map((item) => (
              <li key={item.id} className="rounded-card border border-line bg-surface p-4">
                <p className="font-mono text-xs uppercase tracking-wide text-ember">{item.when}</p>
                <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted">{areaById(item.areaId).name}</p>
                <p className="mt-2 text-sm">{item.detail}</p>
                <div className="mt-3 flex gap-2">
                  <RsvpButton on={rsvps[item.id] === "going"} label="Going" onClick={() => rsvp(item.id, "going")} />
                  <RsvpButton on={rsvps[item.id] === "maybe"} label="Maybe" onClick={() => rsvp(item.id, "maybe")} />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Clubs</h2>
          <ul className="mt-3 space-y-3">
            {clubs.map((item) => (
              <li key={item.id} className="rounded-card border border-line bg-surface p-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted">
                  {item.when} · {areaById(item.areaId).name}
                </p>
                <p className="mt-2 text-sm">{item.detail}</p>
                <div className="mt-3 flex gap-2">
                  <RsvpButton on={rsvps[item.id] === "going"} label="Going" onClick={() => rsvp(item.id, "going")} />
                  <RsvpButton on={rsvps[item.id] === "maybe"} label="Maybe" onClick={() => rsvp(item.id, "maybe")} />
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Circles</h2>
          <ul className="mt-3 space-y-3">
            {CIRCLES.map((circle) => (
              <li key={circle.id} className="rounded-card border border-line bg-surface p-4">
                <h3 className="text-lg font-semibold">{circle.name}</h3>
                <p className="mt-1 text-sm text-muted">{circle.detail}</p>
                <ul className="mt-3 space-y-2">
                  {circleMembers(circle).map((person) => (
                    <li key={person.id}>
                      <Link to="/p/$id" params={{ id: person.id }} className="flex min-h-11 items-center gap-3">
                        <span className="relative size-10 overflow-hidden rounded-2xl bg-raised">
                          <Portrait id={person.id} name={person.name} size="sm" />
                        </span>
                        <span className="text-sm font-semibold">{person.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Frame>
  );
}

function RsvpButton({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      className={
        on
          ? "press min-h-11 flex-1 rounded-2xl bg-ember text-sm font-semibold text-ember-ink"
          : "press min-h-11 flex-1 rounded-2xl border border-line text-sm font-semibold"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
}
