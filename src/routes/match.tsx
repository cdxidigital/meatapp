import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Frame, Portrait } from "@/components/grid/ui";
import { areaById, getPerson } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { chemistry, draftLine, modeLabel } from "@/lib/grid/upgrade";
import { useRanked } from "@/lib/grid/use-ranked";

export const Route = createFileRoute("/match")({
  component: MatchPage,
});

function MatchPage() {
  const rows = useRanked();
  const interests = useGrid((s) => s.interests);
  const matches = useGrid((s) => s.matches);
  const interest = useGrid((s) => s.interest);
  const chemistryOn = useGrid((s) => s.chemistry);
  const me = useGrid((s) => s.me);
  const mode = useGrid((s) => s.mode);
  const setDraft = useGrid((s) => s.setDraft);
  const navigate = useNavigate();
  const deck = rows.filter((row) => !interests[row.person.id]);
  const current = deck[0];

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/" className="text-sm font-semibold text-muted">
            Nearby
          </Link>
          <h1 className="font-display text-3xl font-extrabold">Match</h1>
          <p className="mt-1 text-sm text-muted">
            A yes only counts when you both give it. This deck follows {modeLabel(mode)}. Nothing here is sent off the device.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-6 px-3 py-4 lg:px-8">
        {current ? (
          <article className="overflow-hidden rounded-card border border-line bg-surface">
            <div className="relative h-64 overflow-hidden bg-raised">
              <Portrait id={current.person.id} name={current.person.name} eager />
            </div>
            <div className="p-4">
              <h2 className="font-display text-3xl font-extrabold">{current.person.name.split(" ")[0]}</h2>
              <p className="mt-1 text-sm text-muted">
                {current.person.age} · {areaById(current.person.areaId).name} · {current.band}
              </p>
              <p className="mt-3 text-sm">{current.person.bio}</p>
              {chemistryOn ? <Chemistry me={me} person={current.person} /> : null}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="press min-h-11 flex-1 rounded-2xl border border-line bg-raised text-sm font-semibold"
                  onClick={() => interest(current.person.id, "pass")}
                >
                  Pass
                </button>
                <button
                  type="button"
                  className="press min-h-11 flex-1 rounded-2xl bg-ember text-sm font-semibold text-ember-ink"
                  onClick={() => interest(current.person.id, "yes")}
                >
                  Interested
                </button>
              </div>
              <button
                type="button"
                className="press mt-3 min-h-11 text-sm font-semibold text-ember"
                onClick={() => {
                  setDraft(current.person.id, draftLine(me, current.person));
                  void navigate({ to: "/c/$id", params: { id: current.person.id } });
                }}
              >
                Draft a first line
              </button>
            </div>
          </article>
        ) : (
          <p className="rounded-card border border-line bg-surface px-4 py-6 text-sm text-muted">
            No one left in this deck. Change mode, or reset a pass from a profile you already decided on.
          </p>
        )}
        <section>
          <h2 className="font-display text-2xl font-bold">Mutual</h2>
          {matches.length === 0 ? (
            <p className="mt-2 text-sm text-muted">When you both say yes, the chat opens here.</p>
          ) : (
            <ul className="mt-2 divide-y divide-line">
              {matches.map((id) => {
                const person = getPerson(id);
                if (!person) return null;
                return (
                  <li key={id}>
                    <Link to="/c/$id" params={{ id }} className="flex min-h-14 items-center gap-3 py-2">
                      <span className="relative size-12 overflow-hidden rounded-2xl bg-raised">
                        <Portrait id={person.id} name={person.name} size="sm" />
                      </span>
                      <span>
                        <span className="block font-semibold">{person.name}</span>
                        <span className="block text-sm text-muted">Both said yes</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </Frame>
  );
}

function Chemistry({ me, person }: { me: ReturnType<typeof useGrid.getState>["me"]; person: NonNullable<ReturnType<typeof getPerson>> }) {
  const result = chemistry(me, person);
  return (
    <div className="mt-3 rounded-2xl bg-raised px-3 py-3">
      <p className="text-sm font-semibold">Chemistry {result.score}</p>
      <ul className="mt-1 space-y-1 text-sm text-muted">
        {result.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-faint">From what you both wrote. Not a promise.</p>
    </div>
  );
}
