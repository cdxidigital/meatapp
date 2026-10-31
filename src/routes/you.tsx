import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Frame, Monogram, NoticesButton, Toggle } from "@/components/grid/ui";
import { QrCard } from "@/components/grid/lock-screen";
import { compressImage } from "@/lib/grid/image";
import { createPasskey, hashCode, makeLoginCode, passkeySupported } from "@/lib/grid/lock";
import { AREAS, AVAILABILITY, LOOKING, PRONOUNS, TAGS, areaById, toggleItem } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { MODES } from "@/lib/grid/upgrade";
import { ModuleLinks } from "@/components/grid/modules";

export const Route = createFileRoute("/you")({
  component: YouPage,
});

function YouPage() {
  const me = useGrid((s) => s.me);
  const patchMe = useGrid((s) => s.patchMe);
  const pushToast = useGrid((s) => s.pushToast);
  const birthYear = useGrid((s) => s.gate.birthYear);
  const age = birthYear ? new Date().getFullYear() - birthYear : null;
  const [busy, setBusy] = useState(false);
  const [spare, setSpare] = useState<string | null>(null);
  const lock = useGrid((s) => s.lock);
  const devicePeople = useGrid((s) => s.devicePeople);
  const deviceAlerts = useGrid((s) => s.deviceAlerts);
  const area = areaById(me.areaId);
  const visibleModes = useGrid((s) => s.visibleModes);
  const chemistry = useGrid((s) => s.chemistry);
  const plus = useGrid((s) => s.plus);

  return (
    <Frame>
      <header className="safe-top flex items-center justify-between px-3 pt-4 lg:px-8">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between">
          <h1 className="font-display text-3xl font-extrabold">You</h1>
          <NoticesButton />
        </div>
      </header>
      <div className="mx-auto max-w-xl space-y-6 px-3 py-4 lg:px-8">
        <section className="overflow-hidden rounded-card border border-line bg-surface">
          <div className="grid grid-cols-[7.5rem_1fr]">
            <div className="relative aspect-portrait bg-raised">
              {me.photo ? <img src={me.photo} alt="" className="cover" /> : <Monogram id="you" name={me.name || "You"} />}
            </div>
            <div className="p-4">
              <p className="font-mono text-xs uppercase tracking-wide text-muted">How you appear</p>
              <h2 className="mt-1 text-xl font-semibold">{me.name || "Unnamed"}</h2>
              <p className="text-sm text-muted">
                {[me.pronouns, age ? `${age}` : null, area.name].filter(Boolean).join(" · ")}
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                <li>{me.incognito ? "Not listed" : "Listed nearby"}</li>
                <li>{me.showOnline ? "Live mark can show" : "Live mark hidden"}</li>
                <li>{me.showDistance ? "Distance band visible" : "Distance hidden"}</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center gap-3">
          <label className="press inline-flex min-h-11 cursor-pointer items-center rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
            {busy ? "Reading photo…" : me.photo ? "Replace photo" : "Add a photo"}
            <input
              className="sr-only"
              type="file"
              accept="image/*"
              disabled={busy}
              onChange={(event) => {
                const file = event.target.files?.[0];
                event.target.value = "";
                if (!file) return;
                setBusy(true);
                void compressImage(file)
                  .then((photo) => patchMe({ photo }))
                  .catch(() => pushToast("Couldn’t read that image"))
                  .finally(() => setBusy(false));
              }}
            />
          </label>
          {me.photo ? (
            <button type="button" className="press min-h-11 text-sm font-semibold text-ember" onClick={() => patchMe({ photo: null })}>
              Remove photo
            </button>
          ) : null}
        </div>
        <p className="-mt-3 text-xs text-faint">Kept on this device.</p>

        <label className="block">
          <span className="mb-1 block text-sm text-muted">Display name</span>
          <input className="field" maxLength={40} value={me.name} onChange={(event) => patchMe({ name: event.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Email, if you added one</span>
          <input className="field" type="email" autoComplete="email" maxLength={80} value={me.email ?? ""} onChange={(event) => patchMe({ email: event.target.value.trim() })} />
        </label>
        <div>
          <p className="mb-2 text-sm text-muted">Pronouns</p>
          <div className="flex flex-wrap gap-2">
            {PRONOUNS.map((pronoun) => (
              <button
                key={pronoun}
                type="button"
                aria-pressed={me.pronouns === pronoun}
                className={chip(me.pronouns === pronoun)}
                onClick={() => patchMe({ pronouns: pronoun })}
              >
                {pronoun}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">About</span>
          <textarea className="field min-h-28 resize-none" maxLength={280} value={me.bio} onChange={(event) => patchMe({ bio: event.target.value })} />
        </label>
        <div>
          <p className="mb-2 text-sm text-muted">Home area</p>
          <div className="flex flex-wrap gap-2">
            {AREAS.map((item) => (
              <button key={item.id} type="button" aria-pressed={me.areaId === item.id} className={chip(me.areaId === item.id)} onClick={() => patchMe({ areaId: item.id })}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-muted">Open to</p>
          <div className="flex flex-wrap gap-2">
            {LOOKING.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={me.lookingFor.includes(item.id)}
                className={chip(me.lookingFor.includes(item.id))}
                onClick={() => patchMe({ lookingFor: toggleItem(me.lookingFor, item.id) })}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-muted">Interests</p>
          <div className="flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <button key={tag} type="button" aria-pressed={me.tags.includes(tag)} className={chip(me.tags.includes(tag))} onClick={() => patchMe({ tags: toggleItem(me.tags, tag) })}>
                {tag}
              </button>
            ))}
          </div>
        </div>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Usually free</span>
          <select className="field" value={me.availability} onChange={(event) => patchMe({ availability: event.target.value })}>
            {AVAILABILITY.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-sm text-muted">Boundaries</span>
          <textarea className="field min-h-24 resize-none" maxLength={240} value={me.boundaries} onChange={(event) => patchMe({ boundaries: event.target.value })} />
        </label>

        <section id="lock" className="scroll-mt-24">
          <h2 className="font-display text-2xl font-bold">Login</h2>
          <p className="mt-1 text-sm text-muted">A passkey uses this phone. A QR is a spare key you keep. The next visit stays locked until one of them opens it.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lock.credentialId ? (
              <button type="button" className="press min-h-11 rounded-full border border-line px-4 text-sm" onClick={() => useGrid.getState().setLock({ credentialId: null })}>
                Remove passkey
              </button>
            ) : (
              <button
                type="button"
                className="press min-h-11 rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink disabled:opacity-40"
                disabled={!passkeySupported()}
                onClick={() => {
                  void createPasskey(me.name || "You")
                    .then((credentialId) => {
                      useGrid.getState().setLock({ credentialId });
                      pushToast("Passkey saved on this device");
                    })
                    .catch(() => pushToast("Passkey wasn’t created"));
                }}
              >
                Add a passkey
              </button>
            )}
            <button
              type="button"
              className="press min-h-11 rounded-2xl border border-line bg-raised px-4 text-sm font-semibold"
              onClick={() => {
                const code = makeLoginCode();
                void hashCode(code).then((codeHash) => {
                  useGrid.getState().setLock({ codeHash });
                  setSpare(code);
                });
              }}
            >
              {lock.codeHash ? "New QR spare key" : "Create a QR spare key"}
            </button>
          </div>
          {!passkeySupported() ? <p className="mt-2 text-sm text-muted">This browser can’t make a passkey. Use a QR spare key.</p> : null}
          {lock.credentialId ? <p className="mt-2 text-sm">Passkey is on.</p> : null}
          {spare ? (
            <div className="mt-4">
              <QrCard code={spare} />
            </div>
          ) : lock.codeHash ? (
            <p className="mt-2 text-sm text-muted">A spare key is saved. A new QR replaces the old one.</p>
          ) : null}
          {lock.credentialId || lock.codeHash ? (
            <button type="button" className="press mt-3 min-h-11 text-sm font-semibold text-ember" onClick={() => useGrid.getState().clearLock()}>
              Remove login
            </button>
          ) : null}
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Mode</h2>
          <p className="mt-1 text-sm text-muted">Dating, Social, Exploring, and Right now use different lists. Visibility is separate from what you’re browsing.</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={visibleModes.includes(item.id)}
                className={chip(visibleModes.includes(item.id))}
                onClick={() => useGrid.getState().toggleVisibleMode(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <ModuleLinks />
          </div>
        </section>

        <section className="divide-y divide-line border-y border-line">
          <Toggle
            on={chemistry}
            label="Chemistry"
            hint="Shows overlap in intentions and interests. It is not a score of a person."
            onChange={(on) => useGrid.getState().setChemistry(on)}
          />
          <Toggle
            on={plus}
            label="MEAT+ on this device"
            hint="Longer passports and more saved filters. Block, report, and hide stay free."
            onChange={(on) => useGrid.getState().setPlus(on)}
          />
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">On this device</h2>
          <p className="mt-1 text-sm text-muted">Your profile is stored in this browser. Anyone you save is copied here too, including their photo.</p>
          {devicePeople.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No one else is saved yet. Open a profile and choose Save.</p>
          ) : (
            <ul className="mt-3 divide-y divide-line border-y border-line">
              {devicePeople.map((person) => (
                <li key={person.id}>
                  <Link to="/p/$id" params={{ id: person.id }} className="flex min-h-11 items-center justify-between text-sm font-semibold">
                    {person.name}
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold">Privacy</h2>
          <div className="mt-2 divide-y divide-line border-y border-line">
            <Toggle on={me.showOnline} label="Show that I’m around" hint="Turn off to hide a live mark." onChange={(showOnline) => patchMe({ showOnline })} />
            <Toggle on={me.showDistance} label="Show a distance band" hint="Off means people in range only see that distance is hidden." onChange={(showDistance) => patchMe({ showDistance })} />
            <Toggle on={me.softDistance} label="Soft distance labels" hint="Nearby, instead of a kilometre band. Exact distance is never shown." onChange={(softDistance) => patchMe({ softDistance })} />
            <Toggle on={me.incognito} label="Incognito" hint="Browse without being listed." onChange={(incognito) => patchMe({ incognito })} />
            <Toggle
              on={deviceAlerts}
              label="Alerts on this device"
              hint="Replies, plans, and check-ins can alert this browser when MEAT is in the background."
              onChange={(on) => {
                if (!on) {
                  useGrid.getState().setDeviceAlerts(false);
                  return;
                }
                if (typeof Notification === "undefined") {
                  pushToast("This browser has no alerts");
                  return;
                }
                if (Notification.permission === "denied") {
                  pushToast("This browser is blocking alerts");
                  return;
                }
                if (Notification.permission === "granted") {
                  useGrid.getState().setDeviceAlerts(true);
                  return;
                }
                void Notification.requestPermission().then((result) => {
                  if (result === "granted") useGrid.getState().setDeviceAlerts(true);
                  else pushToast("Alerts stay inside MEAT");
                });
              }}
            />
          </div>
        </section>

        <Link to="/feedback" className="press flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
          Feedback
          <span aria-hidden="true">→</span>
        </Link>
        <Link to="/help" className="press flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
          Help and tutorial
          <span aria-hidden="true">→</span>
        </Link>
        <Link to="/safety" className="press flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold">
          Safety centre
          <span aria-hidden="true">→</span>
        </Link>
        <p className="text-xs text-faint">Photos, chats, and this profile stay in this browser. Age uses your birth year, not the exact day.</p>
      </div>
    </Frame>
  );
}

function chip(on: boolean) {
  return on
    ? "press min-h-11 rounded-full border border-ember bg-ember px-3 text-sm font-medium text-ember-ink"
    : "press min-h-11 rounded-full border border-line bg-raised px-3 text-sm font-medium";
}
