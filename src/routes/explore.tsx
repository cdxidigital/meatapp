import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Frame, NoticesButton } from "@/components/grid/ui";
import { AREAS, PEOPLE, areaById, bandText, kmBetween } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/explore")({
  component: ExplorePage,
});

function ExplorePage() {
  const browseId = useGrid((s) => s.browseAreaId);
  const homeId = useGrid((s) => s.me.areaId);
  const soft = useGrid((s) => s.me.softDistance);
  const setBrowse = useGrid((s) => s.setBrowse);
  const setPassport = useGrid((s) => s.setPassport);
  const plus = useGrid((s) => s.plus);
  const [selected, setSelected] = useState(browseId);
  const navigate = useNavigate();
  const area = areaById(selected);
  const home = areaById(homeId);
  const km = kmBetween(home, area);
  const locals = PEOPLE.filter((person) => person.areaId === area.id);

  return (
    <Frame>
      <header className="safe-top px-3 pb-2 pt-4 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Explore</h1>
            <p className="mt-1 max-w-xl text-sm text-muted">
              Pick a suburb to browse. The map moves your view, not your location, and it never plots another person.
            </p>
          </div>
          <NoticesButton />
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-4 px-3 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-card border border-line bg-surface">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d="M10 6 C 20 18, 12 36, 14 52 C 16 68, 12 82, 20 96" fill="none" stroke="var(--color-line)" strokeWidth="1.4" />
            <path d="M98 38 C 74 40, 62 50, 50 56 C 36 64, 30 78, 16 88" fill="none" stroke="var(--color-ember)" strokeWidth="1.3" opacity="0.85" />
          </svg>
          {AREAS.map((item) => {
            const active = item.id === selected;
            return (
              <button
                key={item.id}
                type="button"
                className="press absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                aria-pressed={active}
                aria-label={item.name}
                onClick={() => setSelected(item.id)}
              >
                <span className={cn("block rounded-full", active ? "size-4 bg-ember" : "size-2.5 bg-fg")} />
              </button>
            );
          })}
          <p className="absolute bottom-3 left-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-xs uppercase tracking-wide">
            Swan river · schematic
          </p>
        </div>
        <section className="rounded-card border border-line bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wide text-ember">{area.id === homeId ? "Home area" : "Browse target"}</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold">{area.name}</h2>
          <p className="mt-1 text-sm text-muted">{area.note}</p>
          <p className="mt-3 text-sm">
            {area.id === homeId
              ? "This is the area you called home."
              : `${bandText(km, true, soft)} from your home area.`}
          </p>
          <p className="mt-2 text-sm text-muted">
            {locals.length === 0
              ? "Nobody lists this as home. You can still browse from here."
              : `${locals.length === 1 ? "1 man lists" : `${locals.length} men list`} this as home. Their exact spots stay hidden.`}
          </p>
          <button
            type="button"
            className="press mt-5 min-h-11 w-full rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink"
            onClick={() => {
              setBrowse(area.id);
              void navigate({ to: "/" });
            }}
          >
            Browse from {area.name}
          </button>
          {area.id !== homeId ? (
            <button type="button" className="press mt-2 min-h-11 w-full rounded-2xl border border-line px-4 text-sm font-semibold" onClick={() => setPassport(area.id)}>
              Passport · {plus ? "72 hours" : "24 hours"}
            </button>
          ) : null}
          <p className="mt-2 text-xs text-faint">A passport moves your view and expires. It does not publish a pin.</p>
          <ul className="mt-5 divide-y divide-line border-t border-line">
            {AREAS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="press flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left"
                  aria-pressed={item.id === selected}
                  onClick={() => setSelected(item.id)}
                >
                  <span>
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted">{item.note}</span>
                  </span>
                  <span className="font-mono text-xs text-faint">{PEOPLE.filter((person) => person.areaId === item.id).length}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Frame>
  );
}
