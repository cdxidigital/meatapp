import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Portrait, Wordmark } from "@/components/grid/ui";
import { AREAS, LOOKING, PEOPLE, adultCutoff, isAdultYear, toggleItem, type Looking } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";

export const Route = createFileRoute("/info")({
  component: InfoPage,
});

const STEPS = [
  { n: "01", title: "Join on this device", body: "A display name and a birth year. No legal name, and nothing is uploaded." },
  { n: "02", title: "See men nearby", body: "A list in distance bands. Nearby, a short ride, or across town. Never a pin." },
  { n: "03", title: "Wave, then decide", body: "Chat if you both want to. Plans name a public place. You can leave the list any time." },
];

const OFFER = [
  { title: "Men seeking men", body: "The list is men near you. That is the whole brief." },
  { title: "Private by default", body: "Photo, chats, and profile stay in this browser. Clear the site data and they go." },
  { title: "Safety is included", body: "Block, report, hide, and a check-in when you head out. None of that is locked." },
];

function InfoPage() {
  const navigate = useNavigate();
  const onboarded = useGrid((s) => s.onboarded);
  const birthYear = useGrid((s) => s.gate.birthYear);
  const alreadyIn = onboarded && isAdultYear(birthYear);
  const patchMe = useGrid((s) => s.patchMe);
  const setGateYear = useGrid((s) => s.setGateYear);
  const finish = useGrid((s) => s.finishOnboarding);

  const cutoff = adultCutoff();
  const years = Array.from({ length: cutoff - 1940 + 1 }, (_, index) => cutoff - index);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [looking, setLooking] = useState<Looking[]>([]);
  const [areaId, setAreaId] = useState("cbd");
  const [checked, setChecked] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);

  const emailOk = email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const ready = name.trim().length > 0 && year !== "" && looking.length > 0 && checked && emailOk;

  function join(event: FormEvent) {
    event.preventDefault();
    const born = Number(year);
    if (!isAdultYear(born)) {
      setBlocked(true);
      return;
    }
    if (!ready) return;
    patchMe({ name: name.trim(), lookingFor: looking, areaId, email: email.trim() });
    setGateYear(born);
    finish();
    void navigate({ to: "/" });
  }

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="safe-top sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-3">
          <Wordmark />
          {alreadyIn ? (
            <Link to="/" className="press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
              Open MEAT
            </Link>
          ) : (
            <a href="#join" className="press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
              Sign up
            </a>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-24">
        <section className="pt-10">
          <p className="font-mono text-xs uppercase tracking-wide text-ember">Perth · men seeking men</p>
          <h1 className="mt-3 max-w-xl font-display text-5xl font-extrabold leading-none">Nearby, without the pin.</h1>
          <p className="mt-4 max-w-lg text-muted">
            MEAT is a private list of men near you. Join on this device, see who is in range, and decide what happens next.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {alreadyIn ? (
              <Link to="/" className="press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
                Open MEAT
              </Link>
            ) : (
              <a href="#join" className="press inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
                Sign up free
              </a>
            )}
            <button
              type="button"
              className="press inline-flex min-h-11 items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold"
              onClick={() => {
                const url = `${location.origin}/info`;
                const done = () => setCopied(true);
                if (navigator.share) {
                  void navigator.share({ title: "MEAT", text: "Men nearby, without the pin.", url }).catch(() => undefined);
                  return;
                }
                void navigator.clipboard.writeText(url).then(done).catch(() => undefined);
              }}
            >
              {copied ? "Link copied" : "Invite someone"}
            </button>
            <a href="#how" className="press inline-flex min-h-11 items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
              How it works
            </a>
          </div>
          <div className="mt-8 flex">
            {PEOPLE.slice(0, 6).map((person) => (
              <span key={person.id} className="relative -ml-3 size-14 overflow-hidden rounded-full border-2 border-bg first:ml-0">
                <Portrait id={person.id} name={person.name} size="sm" eager />
              </span>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-3 sm:grid-cols-3">
          {OFFER.map((item) => (
            <article key={item.title} className="rounded-card border border-line bg-surface p-4">
              <h2 className="font-display text-xl font-bold">{item.title}</h2>
              <p className="mt-2 text-sm text-muted">{item.body}</p>
            </article>
          ))}
        </section>

        <section id="how" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-3xl font-extrabold">How it works</h2>
          <ol className="mt-5 grid gap-3">
            {STEPS.map((step) => (
              <li key={step.n} className="flex gap-4 rounded-card border border-line bg-surface p-4">
                <span className="font-mono text-sm text-ember">{step.n}</span>
                <div>
                  <h3 className="font-display text-xl font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <Install />

        <section id="join" className="mt-14 scroll-mt-24 rounded-card border border-line bg-raised p-5">
          {alreadyIn ? (
            <>
              <h2 className="font-display text-3xl font-extrabold">You’re already in.</h2>
              <p className="mt-2 text-sm text-muted">Your profile is on this device. Open the list, or read Help from You.</p>
              <Link to="/" className="press mt-5 inline-flex min-h-11 items-center rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink">
                Open MEAT
              </Link>
            </>
          ) : blocked ? (
            <>
              <h2 className="font-display text-3xl font-extrabold">You can’t join yet.</h2>
              <p className="mt-2 text-sm text-muted">MEAT is for people who are already 18. A birth year is a check, not an identity proof.</p>
              <button type="button" className="press mt-5 min-h-11 text-sm font-semibold text-ember" onClick={() => setBlocked(false)}>
                Entered the wrong year
              </button>
            </>
          ) : (
            <>
              <p className="font-mono text-xs uppercase tracking-wide text-ember">Sign up</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold">Create your profile.</h2>
              <p className="mt-2 text-sm text-muted">Optional, and free. Stored on this device. Skip it and you can still read this page. You can change any of it later under You.</p>
              <form className="mt-5 space-y-4" onSubmit={join}>
                <label className="block">
                  <span className="mb-1 block text-sm text-muted">Display name</span>
                  <input className="field" maxLength={40} value={name} placeholder="What people call you" onChange={(event) => setName(event.target.value)} required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm text-muted">Year of birth</span>
                  <select className="field" value={year} autoComplete="bday-year" onChange={(event) => setYear(event.target.value)} required>
                    <option value="">Select a year</option>
                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <fieldset>
                  <legend className="mb-2 text-sm text-muted">Open to</legend>
                  <div className="flex flex-wrap gap-2">
                    {LOOKING.map((item) => {
                      const on = looking.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={on}
                          className={on ? "press min-h-11 rounded-full bg-ember px-3 text-sm font-medium text-ember-ink" : "press min-h-11 rounded-full border border-line bg-surface px-3 text-sm font-medium"}
                          onClick={() => setLooking((current) => toggleItem(current, item.id))}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
                <label className="block">
                  <span className="mb-1 block text-sm text-muted">Email, if you want one</span>
                  <input className="field" type="email" autoComplete="email" inputMode="email" maxLength={80} value={email} placeholder="Stays on this device" onChange={(event) => setEmail(event.target.value)} />
                  {email.trim() && !emailOk ? <span className="mt-1 block text-xs text-ember">That doesn’t look like an email.</span> : null}
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm text-muted">Home area</span>
                  <select className="field" value={areaId} onChange={(event) => setAreaId(event.target.value)}>
                    {AREAS.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex min-h-11 items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 size-5" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
                  <span>I am 18 or older. If I turn 18 this year but haven’t yet, I’ll wait.</span>
                </label>
                <button type="submit" className="press min-h-11 w-full rounded-2xl bg-ember text-sm font-semibold text-ember-ink disabled:opacity-40" disabled={!ready}>
                  Sign up and open the list
                </button>
                <p className="text-xs text-faint">Your birth year stays in this browser. It is not uploaded. After you join, add a passkey or a QR under You so the next visit locks.</p>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

function Install() {
  const [here, setHere] = useState<"ios" | "android" | "desktop">("desktop");
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPad|iPhone|iPod/.test(ua)) setHere("ios");
    else if (/Android/.test(ua)) setHere("android");
  }, []);
  const copy =
    here === "ios"
      ? "On iPhone, open this page in Safari, tap Share, then Add to Home Screen."
      : here === "android"
        ? "On Android, open the browser menu and choose Install app or Add to Home screen."
        : "On a computer, bookmark this page or use the install icon in the address bar if you see one.";
  return (
    <section className="mt-14">
      <h2 className="font-display text-3xl font-extrabold">Keep it on your phone</h2>
      <p className="mt-2 max-w-lg text-sm text-muted">There is no store download. MEAT is this site. Adding it to your home screen is the install. {copy}</p>
    </section>
  );
}
