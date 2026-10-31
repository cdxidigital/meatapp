import { createFileRoute, Link } from "@tanstack/react-router";
import { Frame, NoticesButton, Portrait } from "@/components/grid/ui";
import { PEOPLE, getPerson, shortTime } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
});

function InboxPage() {
  const threads = useGrid((s) => s.threads);
  const readAt = useGrid((s) => s.readAt);
  const blocked = useGrid((s) => s.blocked);
  const muted = useGrid((s) => s.muted);
  const rows = Object.entries(threads)
    .map(([id, msgs]) => ({ id, last: msgs[msgs.length - 1] }))
    .filter((row) => row.last && !blocked.includes(row.id))
    .sort((a, b) => (b.last?.at ?? 0) - (a.last?.at ?? 0));
  const suggestions = PEOPLE.filter((person) => person.repliesFast && !blocked.includes(person.id)).slice(0, 4);

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto flex max-w-xl items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-extrabold">Inbox</h1>
            <p className="mt-1 text-sm text-muted">Messages stay on this device.</p>
          </div>
          <NoticesButton />
        </div>
      </header>
      <div className="mx-auto max-w-xl px-3 py-4 lg:px-8">
        {rows.length === 0 ? (
          <div>
            <p className="rounded-card border border-line bg-surface px-4 py-6 text-sm text-muted">
              No messages yet. Wave from a profile, or open someone who usually replies.
            </p>
            <h2 className="mt-6 text-sm font-semibold">Often replies</h2>
            <ul className="mt-2 divide-y divide-line">
              {suggestions.map((person) => (
                <li key={person.id}>
                  <Link to="/p/$id" params={{ id: person.id }} className="flex min-h-16 items-center gap-3 py-2">
                    <span className="relative size-12 overflow-hidden rounded-2xl bg-raised">
                      <Portrait id={person.id} name={person.name} size="sm" />
                    </span>
                    <span>
                      <span className="block font-semibold">{person.name}</span>
                      <span className="block text-sm text-muted">{person.availability}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {rows.map((row) => {
              const person = getPerson(row.id);
              if (!person || !row.last) return null;
              const unread = row.last.from === "them" && row.last.at > (readAt[row.id] ?? 0) && !muted.includes(row.id);
              const preview = row.last.seal === "expired" ? "Note expired" : row.last.seal ? "Sealed note" : row.last.voice ? "Voice note" : row.last.text;
              return (
                <li key={row.id}>
                  <Link to="/c/$id" params={{ id: row.id }} className="flex min-h-16 items-center gap-3 py-3">
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-2xl bg-raised">
                      <Portrait id={person.id} name={person.name} size="sm" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline justify-between gap-2">
                        <span className="truncate font-semibold">{person.name}</span>
                        <span className="shrink-0 font-mono text-xs text-faint">{shortTime(row.last.at)}</span>
                      </span>
                      <span className={cnText(unread)}>{row.last.from === "me" ? `You: ${preview}` : preview}</span>
                      {muted.includes(row.id) ? <span className="mt-0.5 block text-xs text-faint">Muted</span> : null}
                    </span>
                    {unread ? <span className="size-2 shrink-0 rounded-full bg-ember" aria-label="Unread" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Frame>
  );
}

function cnText(unread: boolean) {
  return unread ? "block truncate text-sm text-fg" : "block truncate text-sm text-muted";
}
