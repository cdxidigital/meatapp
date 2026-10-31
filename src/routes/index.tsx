import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import { FilterSheet } from "@/components/grid/filters";
import { ModuleLinks, ModeStrip } from "@/components/grid/modules";
import { Frame, NoticesButton, Portrait, Sheet, Wordmark } from "@/components/grid/ui";
import { DEFAULT_FILTERS, areaById, lookingLabel } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { modeLabel } from "@/lib/grid/upgrade";
import { useRanked } from "@/lib/grid/use-ranked";

export const Route = createFileRoute("/")({
  component: NearbyPage,
});

function NearbyPage() {
  const rows = useRanked();
  const filters = useGrid((s) => s.filters);
  const setFilters = useGrid((s) => s.setFilters);
  const resetFilters = useGrid((s) => s.resetFilters);
  const density = useGrid((s) => s.density);
  const browse = areaById(useGrid((s) => s.browseAreaId));
  const home = areaById(useGrid((s) => s.me.areaId));
  const incognito = useGrid((s) => s.me.incognito);
  const waves = useGrid((s) => s.waves);
  const lock = useGrid((s) => s.lock);
  const loginHint = useGrid((s) => s.loginHint);
  const dismissLoginHint = useGrid((s) => s.dismissLoginHint);
  const mode = useGrid((s) => s.mode);
  const setMode = useGrid((s) => s.setMode);
  const visibleModes = useGrid((s) => s.visibleModes);
  const rightNowUntil = useGrid((s) => s.rightNowUntil);
  const passportUntil = useGrid((s) => s.passportUntil);
  const favourites = useGrid((s) => s.favourites);
  const wave = useGrid((s) => s.wave);
  const setBrowse = useGrid((s) => s.setBrowse);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [whyOpen, setWhyOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const showSearch = searchOpen || filters.query.length > 0;

  const chips: { key: string; label: string; clear: () => void }[] = [];
  if (filters.radiusKm !== DEFAULT_FILTERS.radiusKm) {
    chips.push({ key: "radius", label: `${filters.radiusKm} km`, clear: () => setFilters({ radiusKm: 25 }) });
  }
  if (filters.minAge !== 18 || filters.maxAge !== 70) {
    chips.push({
      key: "age",
      label: `${filters.minAge}–${filters.maxAge}`,
      clear: () => setFilters({ minAge: 18, maxAge: 70 }),
    });
  }
  if (filters.onlineOnly) chips.push({ key: "live", label: "Live", clear: () => setFilters({ onlineOnly: false }) });
  if (filters.verifiedOnly) chips.push({ key: "ver", label: "Verified", clear: () => setFilters({ verifiedOnly: false }) });
  if (filters.favouritesOnly) chips.push({ key: "fav", label: "Favourites", clear: () => setFilters({ favouritesOnly: false }) });
  if (filters.sort !== "smart") {
    chips.push({
      key: "sort",
      label: filters.sort === "near" ? "Nearest" : "Live first",
      clear: () => setFilters({ sort: "smart" }),
    });
  }
  for (const tag of filters.tags) chips.push({ key: tag, label: tag, clear: () => setFilters({ tags: filters.tags.filter((item) => item !== tag) }) });
  for (const intent of filters.lookingFor) {
    chips.push({
      key: intent,
      label: lookingLabel(intent),
      clear: () => setFilters({ lookingFor: filters.lookingFor.filter((item) => item !== intent) }),
    });
  }
  if (filters.query) chips.push({ key: "q", label: `“${filters.query}”`, clear: () => setFilters({ query: "" }) });

  return (
    <Frame>
      <header className="safe-top sticky top-0 z-20 border-b border-line bg-bg/90 px-3 pb-3 backdrop-blur-md lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="min-w-0">
              <span className="lg:hidden">
                <Wordmark />
              </span>
              <span className="hidden font-display text-2xl font-extrabold lg:inline">Nearby</span>
            </h1>
            <p className="truncate font-mono text-xs uppercase tracking-wide text-muted">
              <Link to="/explore" className="underline-offset-2 hover:underline">
                {browse.name}
              </Link>
              <span> · {rows.length}</span>
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="press grid size-11 place-items-center rounded-full bg-raised"
              aria-label={showSearch ? "Close search" : "Search"}
              aria-expanded={showSearch}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {showSearch ? <X className="size-5" /> : <Search className="size-5" />}
            </button>
            <button
              type="button"
              className="press inline-flex min-h-11 items-center gap-2 rounded-full bg-raised px-3 text-sm font-semibold"
              onClick={() => setFiltersOpen(true)}
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {chips.length > 0 ? <span className="font-mono text-xs text-ember">{chips.length}</span> : null}
            </button>
            <NoticesButton />
          </div>
        </div>
        {showSearch ? (
          <div className="mx-auto mt-3 max-w-6xl">
            <label className="sr-only" htmlFor="grid-search">
              Search people
            </label>
            <input
              id="grid-search"
              className="field"
              value={filters.query}
              placeholder="Name, interest, suburb"
              onChange={(event) => setFilters({ query: event.target.value })}
            />
          </div>
        ) : null}
      </header>
      <div className="mx-auto max-w-6xl px-3 py-3 lg:px-8">
        {incognito ? (
          <p className="mb-3 rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
            Incognito is on. You can browse. You are not listed.
          </p>
        ) : null}
        {browse.id !== home.id ? (
          <p className="mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
            <span>
              Travel is on. Browsing {browse.name}. Home is {home.name}.
            </span>
            <button type="button" className="press min-h-11 font-semibold text-ember" onClick={() => setBrowse(home.id)}>
              Back to home
            </button>
          </p>
        ) : null}
        {chips.length > 0 ? (
          <div className="strip mb-3">
            {chips.map((chip) => (
              <button key={chip.key} type="button" className="press inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-line bg-raised px-3 text-sm" onClick={chip.clear}>
                {chip.label}
                <X className="size-3.5" aria-hidden="true" />
                <span className="sr-only">Remove {chip.label}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm text-muted">{rows.length === 1 ? "1 man nearby" : `${rows.length} men nearby`}</p>
          <button type="button" className="press min-h-11 text-sm font-semibold text-ember" onClick={() => setWhyOpen(true)}>
            Why this order
          </button>
        </div>
        <ModeStrip />
        <ModuleLinks />
        {!visibleModes.includes(mode) ? (
          <p className="mb-3 rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
            You’re browsing {modeLabel(mode)}. You are not visible in it. Change that in You.
          </p>
        ) : null}
        {mode === "now" && !rightNowUntil ? (
          <p className="mb-3 rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
            Right now is a look, not a listing.{" "}
            <Link to="/now" className="font-semibold text-ember">
              Opt in for an hour
            </Link>
          </p>
        ) : null}
        {passportUntil ? (
          <p className="mb-3 rounded-2xl border border-line bg-raised px-3 py-3 text-sm">
            Passport is open until {new Date(passportUntil).toLocaleString([], { weekday: "short", hour: "numeric", minute: "2-digit" })}.
          </p>
        ) : null}
        {rows.length > 0 ? (
          <div className="mb-3 flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-3 py-2">
            <p className="text-sm">Someone live. One hello.</p>
            <button
              type="button"
              className="press min-h-11 shrink-0 rounded-full bg-ember px-3 text-sm font-semibold text-ember-ink"
              onClick={() => {
                const live = rows.filter((row) => row.online);
                const pool = live.length ? live : rows;
                const pick = pool[Math.floor(Math.random() * pool.length)];
                void navigate({ to: "/p/$id", params: { id: pick.person.id } });
              }}
            >
              Surprise me
            </button>
          </div>
        ) : null}
        {!lock.credentialId && !lock.codeHash && loginHint ? (
          <p className="mb-3 flex items-center justify-between gap-3 text-sm text-muted">
            <span>
              No login on this device.{" "}
              <Link to="/you" hash="lock" className="font-semibold text-ember">
                Add a passkey or a QR
              </Link>
            </span>
            <button type="button" className="press min-h-11 shrink-0 text-sm font-semibold" onClick={dismissLoginHint}>
              Dismiss
            </button>
          </p>
        ) : null}
        {rows.length === 0 ? (
          <div className="rounded-card border border-line bg-surface px-4 py-10 text-center">
            <h2 className="font-display text-2xl font-bold">{mode === "exploring" ? "No one fits this view." : `No one in ${modeLabel(mode)}.`}</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
              {mode === "exploring"
                ? "Widen the radius, clear a filter, or browse another suburb. Hidden-distance profiles still have to fall inside the radius."
                : "This mode only shows men who fit it. Exploring shows everyone in range."}
            </p>
            {mode === "exploring" ? (
              <button type="button" className="press mt-4 min-h-11 font-semibold text-ember" onClick={resetFilters}>
                Reset filters
              </button>
            ) : (
              <button type="button" className="press mt-4 min-h-11 font-semibold text-ember" onClick={() => setMode("exploring")}>
                Show everyone
              </button>
            )}
          </div>
        ) : (
          <ul className={density === "dense" ? "grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-5" : "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4"}>
            {rows.map((row, index) => {
              const person = row.person;
              const area = areaById(person.areaId);
              return (
                <li key={person.id}>
                  <article className="overflow-hidden rounded-card bg-surface">
                    <Link
                      to="/p/$id"
                      params={{ id: person.id }}
                      aria-label={`${person.name}, ${person.pronouns}, ${person.age}, ${area.name}, ${row.band}${person.verified ? ", verified" : ""}. ${row.reasons.join(", ")}`}
                      className="relative block aspect-portrait bg-raised"
                    >
                      <Portrait id={person.id} name={person.name} eager={index < 4} />
                      {row.online ? <span className="live-dot absolute left-2 top-2" aria-hidden="true" /> : null}
                    </Link>
                    <div className="px-2.5 pb-2.5 pt-2">
                      <Link to="/p/$id" params={{ id: person.id }} className="block min-w-0">
                        <div className="flex items-center gap-1">
                          <h2 className="truncate text-sm font-semibold">{person.name.split(" ")[0]}</h2>
                          {person.verified ? <BadgeCheck className="size-3.5 shrink-0" aria-hidden="true" /> : null}
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wide text-muted">
                          {person.age} · {row.band}
                        </p>
                        {density === "cozy" ? (
                          <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-fg/80">{person.bio.split(". ")[0]}</p>
                        ) : null}
                      </Link>
                      <button
                        type="button"
                        className={
                          waves[person.id]
                            ? "press mt-2 min-h-11 w-full rounded-full bg-ember text-xs font-semibold text-ember-ink"
                            : "press mt-2 min-h-11 w-full rounded-full border border-ember/50 bg-raised text-xs font-semibold text-ember"
                        }
                        aria-pressed={Boolean(waves[person.id])}
                        onClick={() => wave(person.id)}
                      >
                        {waves[person.id] ? "Waved" : "Wave"}
                      </button>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <FilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} />
      <Sheet
        open={whyOpen}
        onOpenChange={setWhyOpen}
        title="Why this order"
        description="The score is readable. Popularity and payment do not move it."
      >
        <ul className="space-y-3 text-sm text-muted">
          <li>Closer areas rank higher. You see a band, never a pin or an exact kilometre.</li>
          <li>A live mark counts only if that person chooses to show it.</li>
          <li>Shared interests and the same intent add weight. Your own tags change this.</li>
          <li>People who often reply get a small boost. Follower counts do not exist here.</li>
          <li>Hidden-distance profiles can still appear inside your radius. The card says “Distance hidden”.</li>
        </ul>
      </Sheet>
    </Frame>
  );
}
