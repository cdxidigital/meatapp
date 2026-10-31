import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Frame } from "@/components/grid/ui";
import { radarPoint } from "@/lib/grid/upgrade";
import { useRanked } from "@/lib/grid/use-ranked";

export const Route = createFileRoute("/radar")({
  component: RadarPage,
});

function RadarPage() {
  const rows = useRanked();
  const [active, setActive] = useState<string | null>(null);
  const selected = rows.find((row) => row.person.id === active) ?? null;

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/" className="text-sm font-semibold text-muted">
            Nearby
          </Link>
          <h1 className="font-display text-3xl font-extrabold">Radar</h1>
          <p className="mt-1 text-sm text-muted">
            A coarse ring, not a map. Dots sit in a distance band. Nobody is pinned to a street.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-xl px-3 py-4 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-surface">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="50" cy="50" r="18" fill="none" stroke="var(--color-line)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="34" fill="none" stroke="var(--color-line)" strokeWidth="0.4" />
            <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-line)" strokeWidth="0.4" />
          </svg>
          <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember" aria-hidden="true" />
          <span className="absolute left-1/2 top-[calc(50%+0.8rem)] -translate-x-1/2 text-xs text-muted">You</span>
          {rows.map((row) => {
            const point = radarPoint(row.person.id, row.km);
            const on = active === row.person.id;
            return (
              <button
                key={row.person.id}
                type="button"
                className="press absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                aria-pressed={on}
                aria-label={`${row.person.name.split(" ")[0]}, ${row.band}`}
                onClick={() => setActive(row.person.id)}
              >
                <span className={on ? "size-4 rounded-full bg-ember" : "size-3 rounded-full bg-fg/80 blur-[1px]"} />
              </button>
            );
          })}
        </div>
        {selected ? (
          <div className="mt-4 rounded-card border border-line bg-surface p-4">
            <h2 className="text-xl font-semibold">{selected.person.name.split(" ")[0]}</h2>
            <p className="mt-1 text-sm text-muted">{selected.band}. No exact spot.</p>
            <Link to="/p/$id" params={{ id: selected.person.id }} className="press mt-3 inline-flex min-h-11 items-center font-semibold text-ember">
              Open profile
            </Link>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">Tap a dot. You get a band, not a pin.</p>
        )}
      </div>
    </Frame>
  );
}
