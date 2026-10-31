import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, Portrait } from "@/components/grid/ui";
import { useGrid } from "@/lib/grid/store";
import { fitsMode } from "@/lib/grid/upgrade";
import { useNow, useRanked } from "@/lib/grid/use-ranked";

export const Route = createFileRoute("/now")({
  component: NowPage,
});

function NowPage() {
  const until = useGrid((s) => s.rightNowUntil);
  const start = useGrid((s) => s.startRightNow);
  const end = useGrid((s) => s.endRightNow);
  const now = useNow();
  const rows = useRanked().filter((row) => fitsMode(row.person, "now"));
  const live = until != null && (now == null || until > now);
  const left = live && now ? Math.max(1, Math.ceil((until - now) / 60_000)) : 0;

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/" className="text-sm font-semibold text-muted">
            Nearby
          </Link>
          <h1 className="font-display text-3xl font-extrabold">Right now</h1>
          <p className="mt-1 text-sm text-muted">A one-hour listing. You opt in, and it expires on its own. You can end it sooner.</p>
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-4 px-3 py-4 lg:px-8">
        <section className="rounded-card border border-line bg-surface p-4">
          <p className="font-mono text-xs uppercase tracking-wide text-ember">{live ? "Listed" : "Not listed"}</p>
          <h2 className="mt-1 font-display text-3xl font-extrabold">{live ? `${left} min left` : "Off"}</h2>
          <p className="mt-2 text-sm text-muted">While this is on, you can be seen in Right now. Block and report stay available.</p>
          {live ? (
            <button type="button" className="press mt-4 min-h-11 rounded-2xl border border-line px-4 text-sm font-semibold" onClick={end}>
              End now
            </button>
          ) : (
            <button type="button" className="press mt-4 min-h-11 rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink" onClick={start}>
              I’m around for an hour
            </button>
          )}
        </section>
        <section>
          <h2 className="text-sm font-semibold">Also around</h2>
          {rows.length === 0 ? (
            <p className="mt-2 text-sm text-muted">No one in range is showing Right now.</p>
          ) : (
            <ul className="mt-2 divide-y divide-line">
              {rows.map((row) => (
                <li key={row.person.id}>
                  <Link to="/p/$id" params={{ id: row.person.id }} className="flex min-h-14 items-center gap-3 py-2">
                    <span className="relative size-12 overflow-hidden rounded-2xl bg-raised">
                      <Portrait id={row.person.id} name={row.person.name} size="sm" />
                    </span>
                    <span>
                      <span className="block font-semibold">{row.person.name}</span>
                      <span className="block text-sm text-muted">{row.band}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Frame>
  );
}
