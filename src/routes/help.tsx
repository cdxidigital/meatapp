import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Frame, NoticesButton } from "@/components/grid/ui";

export const Route = createFileRoute("/help")({
  component: HelpPage,
});

const STEPS = [
  { title: "The list", body: "Nearby is men in range, ordered with a short reason. You see a band such as Nearby or Across town. Never a pin." },
  { title: "Filters", body: "Search, filters, and Why this order change who is in the list. Saving a filter keeps that set on this device." },
  { title: "A wave, then a chat", body: "Wave first. If you both want a conversation, open the thread. A sealed note expires. A voice note plays in this session and is not uploaded." },
  { title: "Explore and plans", body: "Explore is areas, not a live map of people. A plan names a public place. Check in from the plan when you leave." },
  { title: "You", body: "Your photo and profile stay in this browser. Hide your live mark, hide distance, or turn on incognito so you are not listed." },
  { title: "Safety", body: "Block, report, and hide are in the Safety centre. They are never behind a paywall. Reports stay on this device." },
];

const TOPICS = [
  { q: "Where is my information?", a: "In this browser. Photos, chats, waves, and your profile are not uploaded. Clearing site data erases them." },
  { q: "Why can’t I see how many metres away someone is?", a: "Distance is a band on purpose. Exact location is not a feature." },
  { q: "How do I install it?", a: "There is no store file. Add this site to your home screen. The info page has the steps for iPhone, Android, and a computer." },
  {
    q: "What are Match, Radar, Right now, and Scene?",
    a: "Match needs a yes from both of you. Radar shows a distance band, never a pin. Right now lasts an hour and you opt in. Scene is events, clubs, and joint profiles. RSVPs stay on this device.",
  },
  {
    q: "What happens to feedback?",
    a: "Each note is scored for the app, the people using it, and whether it can pay for itself. You can queue, hold, or pass it. Queueing does not change MEAT by itself, and safety stays free.",
  },
  { q: "Who is this for?", a: "Men seeking men, 18 and over. A birth year is the check." },
];

function HelpPage() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];
  return (
    <Frame>
      <header className="safe-top flex items-center justify-between px-3 pt-4 lg:px-8">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between gap-3">
          <div>
            <Link to="/you" className="text-sm font-semibold text-muted">
              You
            </Link>
            <h1 className="font-display text-3xl font-extrabold">Help</h1>
          </div>
          <NoticesButton />
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-8 px-3 py-4 lg:px-8">
        <section>
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-display text-2xl font-bold">Tutorial</h2>
            <p className="font-mono text-xs uppercase tracking-wide text-muted">
              {step + 1} of {STEPS.length}
            </p>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
            <div className="h-full bg-ember" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          </div>
          <article className="mt-4 rounded-card border border-line bg-surface p-4">
            <h3 className="font-display text-xl font-bold">{current.title}</h3>
            <p className="mt-2 text-sm text-muted">{current.body}</p>
          </article>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="press min-h-11 flex-1 rounded-2xl border border-line bg-raised text-sm font-semibold disabled:opacity-40"
              disabled={step === 0}
              onClick={() => setStep((value) => Math.max(0, value - 1))}
            >
              Back
            </button>
            {step === STEPS.length - 1 ? (
              <Link to="/" className="press inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-ember text-sm font-semibold text-ember-ink">
                Open nearby
              </Link>
            ) : (
              <button type="button" className="press min-h-11 flex-1 rounded-2xl bg-ember text-sm font-semibold text-ember-ink" onClick={() => setStep((value) => value + 1)}>
                Next
              </button>
            )}
          </div>
        </section>
        <section>
          <h2 className="font-display text-2xl font-bold">Questions</h2>
          <div className="mt-3 divide-y divide-line border-y border-line">
            {TOPICS.map((topic) => (
              <article key={topic.q} className="py-4">
                <h3 className="font-semibold">{topic.q}</h3>
                <p className="mt-1 text-sm text-muted">{topic.a}</p>
              </article>
            ))}
          </div>
          <Link to="/info" className="press mt-4 flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
            Install and product info
            <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    </Frame>
  );
}
