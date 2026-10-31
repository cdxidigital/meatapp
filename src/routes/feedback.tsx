import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Frame } from "@/components/grid/ui";
import type { Assessment, FeedbackItem } from "@/lib/grid/feedback";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/feedback")({
  component: FeedbackPage,
});

const BARS: { key: keyof Pick<Assessment, "app" | "lives" | "profit" | "durable">; label: string }[] = [
  { key: "app", label: "The app" },
  { key: "lives", label: "People using it" },
  { key: "profit", label: "It can pay for itself" },
  { key: "durable", label: "Still useful later" },
];

function FeedbackPage() {
  const items = useGrid((s) => s.feedback);
  const submit = useGrid((s) => s.submitFeedback);
  const decide = useGrid((s) => s.decideFeedback);
  const [text, setText] = useState("");
  const latest = items[0];

  return (
    <Frame>
      <header className="safe-top px-3 pt-4 lg:px-8">
        <div className="mx-auto max-w-xl">
          <Link to="/you" className="text-sm font-semibold text-muted">
            You
          </Link>
          <h1 className="font-display text-3xl font-extrabold">Feedback</h1>
          <p className="mt-1 text-sm text-muted">
            A note is kept only if it improves the app, the people using it, or the chance it pays for itself. You choose whether it continues. Nothing here rewrites MEAT on its own.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-4 px-3 py-4 lg:px-8">
        <form
          className="rounded-card border border-line bg-surface p-4"
          onSubmit={(event) => {
            event.preventDefault();
            submit(text);
            if (text.trim().length >= 8) setText("");
          }}
        >
          <label className="block text-sm font-semibold" htmlFor="feedback-note">
            What should change?
          </label>
          <textarea
            id="feedback-note"
            className="field mt-2 min-h-28 resize-y"
            maxLength={600}
            value={text}
            placeholder="A clearer filter. A quieter night. A reason to come back."
            onChange={(event) => setText(event.target.value)}
          />
          <button type="submit" className="press mt-3 min-h-11 rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
            Review this
          </button>
        </form>
        {latest?.decision === "pending" ? <Review item={latest} onDecide={decide} /> : null}
        {items.length > (latest?.decision === "pending" ? 1 : 0) ? (
          <section>
            <h2 className="font-display text-2xl font-bold">Record</h2>
            <ul className="mt-2 divide-y divide-line">
              {items
                .filter((item) => item.id !== latest?.id || latest.decision !== "pending")
                .map((item) => (
                  <li key={item.id} className="py-3">
                    <p className="text-sm">{item.text}</p>
                    <p className="mt-1 text-xs text-faint">
                      {labelFor(item)} · App {item.assessment.app} · People {item.assessment.lives} · Pays {item.assessment.profit}
                    </p>
                  </li>
                ))}
            </ul>
          </section>
        ) : null}
      </div>
    </Frame>
  );
}

function Review({ item, onDecide }: { item: FeedbackItem; onDecide: (id: string, decision: FeedbackItem["decision"]) => void }) {
  const { assessment } = item;
  const blocked = assessment.call === "pass";
  return (
    <section className="rounded-card border border-line bg-surface p-4">
      <p className="font-mono text-xs uppercase tracking-wide text-ember">{callLabel(assessment.call)}</p>
      <h2 className="mt-1 text-lg font-semibold">{assessment.summary}</h2>
      <ul className="mt-4 space-y-3">
        {BARS.map((bar) => (
          <li key={bar.key}>
            <div className="flex items-center justify-between text-sm">
              <span>{bar.label}</span>
              <span className="font-mono text-xs text-muted">{assessment[bar.key]}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-line">
              <div className="h-full bg-ember" style={{ width: `${assessment[bar.key]}%` }} />
            </div>
          </li>
        ))}
      </ul>
      <ul className="mt-4 space-y-1 text-sm text-muted">
        {assessment.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
        {assessment.harms.map((harm) => (
          <li key={harm}>{harm}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-faint">Safety, blocking, and reporting stay free. A queued note waits for a real release.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="press min-h-11 rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink disabled:opacity-40"
          disabled={blocked}
          onClick={() => onDecide(item.id, "continue")}
        >
          Continue
        </button>
        <button type="button" className="press min-h-11 rounded-2xl border border-line px-4 text-sm font-semibold" onClick={() => onDecide(item.id, "hold")}>
          Hold
        </button>
        <button type="button" className="press min-h-11 rounded-2xl border border-line px-4 text-sm font-semibold" onClick={() => onDecide(item.id, "pass")}>
          Pass
        </button>
      </div>
    </section>
  );
}

function callLabel(call: Assessment["call"]) {
  if (call === "continue") return "Worth continuing";
  if (call === "hold") return "Needs a sharper note";
  return "Don’t continue";
}

function labelFor(item: FeedbackItem) {
  if (item.decision === "continue") return "Queued";
  if (item.decision === "hold") return "Held";
  if (item.decision === "pass") return "Passed";
  return "Waiting";
}
