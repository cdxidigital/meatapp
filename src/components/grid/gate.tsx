import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AREAS, LOOKING, PEOPLE, PRONOUNS, TAGS, adultCutoff, isAdultYear, toggleItem, type Looking } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { Button, Chip, Portrait, Toggle, Wordmark } from "@/components/grid/ui";

export function Gate() {
  const hydrated = useGrid((s) => s.hydrated);
  const birthYear = useGrid((s) => s.gate.birthYear);
  const onboarded = useGrid((s) => s.onboarded);
  const me = useGrid((s) => s.me);
  const setHydrated = useGrid((s) => s.setHydrated);
  const setGateYear = useGrid((s) => s.setGateYear);
  const clearGate = useGrid((s) => s.clearGate);
  const patchMe = useGrid((s) => s.patchMe);
  const finish = useGrid((s) => s.finishOnboarding);
  const [year, setYear] = useState("");
  const [checked, setChecked] = useState(false);
  const [step, setStep] = useState(0);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    void useGrid.persist.rehydrate();
    const id = window.setTimeout(() => setHydrated(), 1200);
    return () => window.clearTimeout(id);
  }, [setHydrated]);

  if (pathname === "/info") return null;

  if (hydrated && isAdultYear(birthYear) && onboarded) return null;

  if (birthYear !== null && !isAdultYear(birthYear)) {
    return (
      <div className="fixed inset-0 z-40 grid place-items-center bg-bg px-6">
        <div className="rise max-w-md text-center">
          <Wordmark />
          <h1 className="mt-8 font-display text-4xl font-extrabold">You can’t use MEAT yet.</h1>
          <p className="mt-3 text-muted">This space is for people who are already 18. A birth year is a check, not an identity proof.</p>
          <Button className="mt-8" variant="ghost" onClick={clearGate}>
            Entered the wrong year
          </Button>
        </div>
      </div>
    );
  }

  if (!isAdultYear(birthYear)) {
    const cutoff = adultCutoff();
    const years = Array.from({ length: cutoff - 1940 + 1 }, (_, index) => cutoff - index);
    return (
      <div className="fixed inset-0 z-40 overflow-y-auto bg-bg">
        <div className="grid min-h-dvh lg:grid-cols-2">
          <div className="relative hidden lg:block">
            <div className="grid h-full grid-cols-2">
              {PEOPLE.slice(0, 6).map((person, index) => (
                <div key={person.id} className="relative min-h-24 overflow-hidden">
                  <Portrait id={person.id} name={person.name} eager={index < 2} />
                </div>
              ))}
            </div>
          </div>
          <div className="rise flex flex-col px-5 pt-5 pb-8 lg:justify-center lg:px-12 lg:py-8">
            <Wordmark />
            <p className="mt-5 font-mono text-xs uppercase tracking-wide text-ember">Perth · men</p>
            <h1 className="mt-2 font-display text-3xl font-extrabold leading-none lg:text-4xl">Nearby, without the pin.</h1>
            <p className="mt-3 max-w-md text-sm text-muted">
              A social space for men seeking men. Distance is a band, never a pin. What you add stays on this device.
            </p>
            <div className="mt-4 flex lg:hidden">
              {PEOPLE.slice(0, 5).map((person) => (
                <span key={person.id} className="relative -ml-2 size-11 overflow-hidden rounded-full border-2 border-bg first:ml-0">
                  <Portrait id={person.id} name={person.name} eager size="sm" />
                </span>
              ))}
            </div>
            <form
              className="mt-5 max-w-md space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                if (!year || !checked) return;
                setGateYear(Number(year));
              }}
            >
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
              <label className="flex min-h-11 items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 size-5"
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                />
                <span>I am 18 or older. If I turn 18 this year but haven’t yet, I’ll wait.</span>
              </label>
              <Button type="submit" className="w-full" disabled={!year || !checked}>
                Continue
              </Button>
              <p className="text-xs text-faint">Your birth year stays in this browser. It is not uploaded.</p>
              <Link to="/info" className="inline-flex min-h-11 items-center text-sm font-semibold text-ember">
                Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const progress = (step + 1) / 3;
  return (
    <div className="fixed inset-0 z-40 overflow-y-auto bg-bg">
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col px-5 pt-6 pb-28">
        <Wordmark />
        <div className="mt-6 h-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <div className="h-full bg-ember" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted">Step {step + 1} of 3</p>
        {step === 0 ? (
          <div className="rise mt-4">
            <h1 className="font-display text-4xl font-extrabold">What should people call you?</h1>
            <p className="mt-3 text-muted">Display name only. MEAT never asks for a legal name.</p>
            <label className="mt-6 block">
              <span className="mb-1 block text-sm text-muted">Display name</span>
              <input
                className="field"
                maxLength={40}
                value={me.name}
                placeholder="What people call you"
                onChange={(event) => patchMe({ name: event.target.value })}
              />
            </label>
            <p className="mb-2 mt-5 text-sm text-muted">Pronouns, if you want them shown</p>
            <div className="flex flex-wrap gap-2">
              {PRONOUNS.map((pronoun) => (
                <Chip key={pronoun} on={me.pronouns === pronoun} onClick={() => patchMe({ pronouns: pronoun })}>
                  {pronoun}
                </Chip>
              ))}
            </div>
            <label className="mt-3 block">
              <span className="sr-only">Custom pronouns</span>
              <input
                className="field"
                maxLength={24}
                value={PRONOUNS.includes(me.pronouns as (typeof PRONOUNS)[number]) ? "" : me.pronouns}
                placeholder="Or write your own"
                onChange={(event) => patchMe({ pronouns: event.target.value })}
              />
            </label>
          </div>
        ) : null}
        {step === 1 ? (
          <div className="rise mt-4">
            <h1 className="font-display text-4xl font-extrabold">What are you open to?</h1>
            <p className="mt-3 text-muted">Pick at least one intent. Interests help explain why someone appears.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {LOOKING.map((item) => (
                <Chip
                  key={item.id}
                  on={me.lookingFor.includes(item.id)}
                  onClick={() => patchMe({ lookingFor: toggleItem(me.lookingFor, item.id) })}
                >
                  {item.label}
                </Chip>
              ))}
            </div>
            <p className="mb-2 mt-6 text-sm text-muted">Interests</p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <Chip key={tag} on={me.tags.includes(tag)} onClick={() => patchMe({ tags: toggleItem(me.tags, tag) })}>
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
        {step === 2 ? (
          <div className="rise mt-4">
            <h1 className="font-display text-4xl font-extrabold">Where are you local?</h1>
            <p className="mt-3 text-muted">This sets your home area in Perth. It is not a live pin, and travel later only changes what you browse.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <Chip key={area.id} on={me.areaId === area.id} onClick={() => patchMe({ areaId: area.id })}>
                  {area.name}
                </Chip>
              ))}
            </div>
            <div className="mt-6 divide-y divide-line border-y border-line">
              <Toggle
                on={me.showOnline}
                label="Show that I’m around"
                hint="People can see a live mark. Turn it off and you stay quiet."
                onChange={(showOnline) => patchMe({ showOnline })}
              />
              <Toggle
                on={me.showDistance}
                label="Show a distance band"
                hint="Off by default. Others only see that you’re in range, not how close."
                onChange={(showDistance) => patchMe({ showDistance })}
              />
              <Toggle
                on={me.incognito}
                label="Incognito"
                hint="You can browse. You won’t be listed."
                onChange={(incognito) => patchMe({ incognito })}
              />
            </div>
          </div>
        ) : null}
        <div className="mt-auto flex gap-2 pt-8">
          {step > 0 ? (
            <Button variant="ghost" onClick={() => setStep((value) => value - 1)}>
              Back
            </Button>
          ) : null}
          {step < 2 ? (
            <Button
              className="flex-1"
              disabled={step === 0 ? me.name.trim().length < 1 : me.lookingFor.length < 1}
              onClick={() => setStep((value) => value + 1)}
            >
              Next
            </Button>
          ) : (
            <Button className="flex-1" onClick={finish} disabled={me.name.trim().length < 1 || me.lookingFor.length < 1}>
              Enter the grid
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export type { Looking };
