import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { ReportForm } from "@/components/grid/report-form";
import { Button, Frame, Portrait, Sheet } from "@/components/grid/ui";
import { areaById, bandText, getPerson, kmBetween, lookingLabel, presence } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { chemistry } from "@/lib/grid/upgrade";
import { useNow } from "@/lib/grid/use-ranked";

export const Route = createFileRoute("/p/$id")({
  component: PersonPage,
});

function PersonPage() {
  const { id } = Route.useParams();
  return (
    <Frame immersive>
      <PersonView id={id} />
    </Frame>
  );
}

function PersonView({ id }: { id: string }) {
  const person = getPerson(id);
  const now = useNow();
  const me = useGrid((s) => s.me);
  const browseId = useGrid((s) => s.browseAreaId);
  const blocked = useGrid((s) => s.blocked);
  const hidden = useGrid((s) => s.hidden);
  const muted = useGrid((s) => s.muted);
  const waves = useGrid((s) => s.waves);
  const favourites = useGrid((s) => s.favourites);
  const album = useGrid((s) => s.album[id]);
  const wave = useGrid((s) => s.wave);
  const toggleFavourite = useGrid((s) => s.toggleFavourite);
  const hide = useGrid((s) => s.hide);
  const unhide = useGrid((s) => s.unhide);
  const mute = useGrid((s) => s.mute);
  const unmute = useGrid((s) => s.unmute);
  const block = useGrid((s) => s.block);
  const requestShelf = useGrid((s) => s.requestShelf);
  const revokeShelf = useGrid((s) => s.revokeShelf);
  const chemistryOn = useGrid((s) => s.chemistry);
  const vaultLog = useGrid((s) => s.vaultLog);
  const [verify, setVerify] = useState(false);
  const [safety, setSafety] = useState<"block" | "report" | null>(null);

  const view = useMemo(() => {
    if (!person) return null;
    const km = kmBetween(areaById(browseId), areaById(person.areaId));
    const shared = person.tags.filter((tag) => me.tags.includes(tag));
    const same = person.lookingFor.some((item) => me.lookingFor.includes(item));
    const online = presence(person, now);
    const reasons: string[] = [];
    if (person.showDistance && km < 8) reasons.push(km < 1 ? "Very close" : km < 3 ? "Nearby" : "A short ride");
    if (online) reasons.push("Live now");
    if (shared.length) reasons.push(shared.length === 1 ? "1 shared interest" : `${shared.length} shared interests`);
    if (same) reasons.push("Same intent");
    return { km, shared, online, reasons, band: bandText(km, person.showDistance, me.softDistance) };
  }, [person, browseId, me.tags, me.lookingFor, me.softDistance, now]);

  if (!person || !view) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl font-extrabold">This profile isn’t here.</h1>
          <Link to="/" className="mt-4 inline-flex min-h-11 items-center font-semibold text-ember">
            Back to nearby
          </Link>
        </div>
      </div>
    );
  }

  if (blocked.includes(person.id)) {
    return (
      <div className="grid min-h-dvh place-items-center px-6 text-center">
        <div className="max-w-sm">
          <h1 className="font-display text-3xl font-extrabold">{person.name.split(" ")[0]} is blocked.</h1>
          <p className="mt-2 text-sm text-muted">They stay out of your grid and inbox until you undo it.</p>
          <button type="button" className="press mt-4 min-h-11 font-semibold text-ember" onClick={() => useGrid.getState().unblock(person.id)}>
            Unblock
          </button>
          <div>
            <Link to="/" className="mt-2 inline-flex min-h-11 items-center text-sm text-muted">
              Back to nearby
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shelf = album?.status === "open" && album.until && album.until < Date.now() ? { status: "expired" as const } : album;
  const hoursLeft = album?.until ? Math.max(1, Math.round((album.until - Date.now()) / 3_600_000)) : null;

  return (
    <div>
      <div className="hero relative bg-raised">
        <Portrait id={person.id} name={person.name} eager />
        <div className="safe-top absolute inset-x-0 top-0 flex items-center justify-between px-3">
          <Link to="/" aria-label="Back to nearby" className="press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold">
            Back
          </Link>
          <button type="button" className="press inline-flex min-h-11 items-center rounded-full bg-bg/80 px-3 text-sm font-semibold" onClick={() => setSafety("block")}>
            Block
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-xl px-4 pb-36 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-4xl font-extrabold leading-none">{person.name}</h1>
              <p className="mt-2 text-sm text-muted">
                {person.pronouns} · {person.age} · {areaById(person.areaId).name}
              </p>
            </div>
            {person.verified ? (
              <button type="button" className="press inline-flex min-h-11 items-center gap-1 text-sm font-semibold" onClick={() => setVerify(true)}>
                <BadgeCheck className="size-4" aria-hidden="true" /> Verified
              </button>
            ) : null}
          </div>
          <p className="mt-3 font-mono text-xs uppercase tracking-wide text-muted">
            {view.band}
            {view.online ? " · Live" : person.recency === "today" ? " · Active today" : " · Active this week"}
            {" · "}
            {person.availability}
          </p>
          {view.reasons.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {view.reasons.map((reason) => (
                <li key={reason} className="rounded-full border border-line bg-raised px-3 py-1 text-sm">
                  {reason}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-5 text-base">{person.bio}</p>
          {chemistryOn ? (
            <div className="mt-4 rounded-2xl bg-raised px-3 py-3">
              <p className="text-sm font-semibold">Chemistry {chemistry(me, person).score}</p>
              <ul className="mt-1 space-y-1 text-sm text-muted">
                {chemistry(me, person).notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-faint">From what you both wrote. Not a promise.</p>
            </div>
          ) : null}
          <h2 className="mt-6 text-sm font-semibold">Open to</h2>
          <p className="mt-1 text-sm text-muted">{person.lookingFor.map(lookingLabel).join(" · ")}</p>
          <h2 className="mt-5 text-sm font-semibold">Interests</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {person.tags.map((tag) => (
              <li key={tag} className={view.shared.includes(tag) ? "rounded-full border border-ember px-3 py-1 text-sm" : "rounded-full border border-line px-3 py-1 text-sm text-muted"}>
                {tag}
              </li>
            ))}
          </ul>
          <h2 className="mt-6 text-sm font-semibold">Boundaries</h2>
          <p className="mt-1 text-sm text-muted">{person.boundaries}</p>

          {person.shelf ? (
            <section className="mt-6 rounded-card border border-line bg-surface p-4">
              <div className="flex items-center gap-2">
                <Lock className="size-4" aria-hidden="true" />
                <h2 className="text-sm font-semibold">Private shelf</h2>
              </div>
              <p className="mt-2 text-sm text-muted">Notes, songs, and places. Not public. Access expires, and either of you can close it.</p>
              {shelf?.status === "open" && person.shelf ? (
                <div className="mt-3 space-y-2">
                  {person.shelf.map((note) => (
                    <article key={note.title} className="rounded-2xl bg-raised px-3 py-3">
                      <h3 className="text-sm font-semibold">{note.title}</h3>
                      <p className="mt-1 text-sm text-muted">{note.body}</p>
                    </article>
                  ))}
                  <p className="font-mono text-xs text-faint tabular-nums">{hoursLeft ? `${hoursLeft}h left` : "Open"}</p>
                  <button type="button" className="press min-h-11 text-sm font-semibold text-ember" onClick={() => revokeShelf(person.id)}>
                    Revoke access
                  </button>
                </div>
              ) : null}
              {shelf?.status === "pending" ? (
                <p className="mt-3 text-sm">
                  {person.shelfPolicy === "pending" ? "Request waiting." : "Asked. Nothing opens until they say yes."}
                </p>
              ) : null}
              {shelf?.status === "declined" ? <p className="mt-3 text-sm">The shelf stayed closed.</p> : null}
              {shelf?.status === "expired" ? <p className="mt-3 text-sm">Access expired.</p> : null}
              {!shelf || shelf.status === "revoked" || shelf.status === "expired" ? (
                <button type="button" className="press mt-3 min-h-11 rounded-2xl bg-fg px-4 text-sm font-semibold text-bg" onClick={() => requestShelf(person.id)}>
                  Request access
                </button>
              ) : null}
              <VaultNotes personId={person.id} log={vaultLog} />
            </section>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-2">
            <button type="button" className="press min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => (hidden.includes(person.id) ? unhide(person.id) : hide(person.id))}>
              {hidden.includes(person.id) ? "Unhide" : "Hide"}
            </button>
            <button type="button" className="press min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => (muted.includes(person.id) ? unmute(person.id) : mute(person.id))}>
              {muted.includes(person.id) ? "Unmute" : "Mute"}
            </button>
            <Link to="/plan/$id" params={{ id: person.id }} className="press inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm">
              Plan a meetup
            </Link>
            <button type="button" className="press min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => setSafety("report")}>
              Report
            </button>
          </div>
      </div>
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-20 border-t border-line bg-bg px-3 py-3">
        <div className="mx-auto flex max-w-xl gap-2">
          <Button variant="ghost" className="flex-1" aria-pressed={Boolean(waves[person.id])} onClick={() => wave(person.id)}>
            {waves[person.id] ? "Waved" : "Wave"}
          </Button>
          <Button variant="ghost" className="flex-1" aria-pressed={favourites.includes(person.id)} onClick={() => toggleFavourite(person.id)}>
            {favourites.includes(person.id) ? "Saved" : "Save"}
          </Button>
          <Link to="/c/$id" params={{ id: person.id }} className="press inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
            Message
          </Link>
        </div>
      </div>
      <Sheet open={verify} onOpenChange={setVerify} title="Verified" description="What the badge does, and what it doesn’t.">
        <p className="text-sm text-muted">
          A verified badge means an independent check matched this profile to a real adult. It is not a character reference and it is not a promise. If something feels off, block or report. Those stay free.
        </p>
      </Sheet>
      <Sheet open={safety === "block"} onOpenChange={(open) => setSafety(open ? "block" : null)} title={`Block ${person.name.split(" ")[0]}?`} description="They leave your grid and chats. You can undo this later.">
        <Button
          className="w-full"
          onClick={() => {
            block(person.id);
            setSafety(null);
          }}
        >
          Block
        </Button>
      </Sheet>
      <Sheet open={safety === "report"} onOpenChange={(open) => setSafety(open ? "report" : null)} title="Report" description="Tell us what happened. This also blocks them.">
        <ReportForm personId={person.id} onDone={() => setSafety(null)} />
      </Sheet>
    </div>
  );
}

function VaultNotes({ personId, log }: { personId: string; log: { id: string; personId: string; action: string; at: number }[] }) {
  const rows = log.filter((item) => item.personId === personId);
  const label: Record<string, string> = {
    asked: "You asked",
    opened: "They opened it",
    closed: "They kept it closed",
    revoked: "You revoked it",
  };
  if (!rows.length) return <p className="mt-3 text-xs text-faint">Access record is empty.</p>;
  return (
    <ul className="mt-3 space-y-1 text-xs text-faint">
      {rows.slice(0, 6).map((item) => (
        <li key={item.id}>
          {label[item.action] ?? item.action} · {new Date(item.at).toLocaleString([], { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
        </li>
      ))}
    </ul>
  );
}
