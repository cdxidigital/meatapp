import { useState } from "react";
import { LOOKING, RADII, TAGS, type Filters } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { Button, Chip, Sheet, Toggle } from "@/components/grid/ui";

export function FilterSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const filters = useGrid((s) => s.filters);
  const setFilters = useGrid((s) => s.setFilters);
  const resetFilters = useGrid((s) => s.resetFilters);
  const saved = useGrid((s) => s.saved);
  const saveFilter = useGrid((s) => s.saveFilter);
  const applySaved = useGrid((s) => s.applySaved);
  const deleteSaved = useGrid((s) => s.deleteSaved);
  const density = useGrid((s) => s.density);
  const setDensity = useGrid((s) => s.setDensity);
  const [name, setName] = useState("");

  function patch(next: Partial<Filters>) {
    setFilters(next);
  }

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title="Filters"
      description="Active filters stay visible as chips. Nothing here is a hidden paywall."
    >
      <p className="text-sm font-semibold">Radius</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {RADII.map((radius) => (
          <Chip key={radius} on={filters.radiusKm === radius} onClick={() => patch({ radiusKm: radius })}>
            {radius} km
          </Chip>
        ))}
      </div>
      <label className="mt-5 block">
        <span className="text-sm font-semibold">Minimum age {filters.minAge}</span>
        <input
          className="mt-2 w-full"
          type="range"
          min={18}
          max={80}
          value={filters.minAge}
          onChange={(event) => patch({ minAge: Math.min(Number(event.target.value), filters.maxAge) })}
        />
      </label>
      <label className="mt-3 block">
        <span className="text-sm font-semibold">Maximum age {filters.maxAge}</span>
        <input
          className="mt-2 w-full"
          type="range"
          min={18}
          max={80}
          value={filters.maxAge}
          onChange={(event) => patch({ maxAge: Math.max(Number(event.target.value), filters.minAge) })}
        />
      </label>
      <div className="mt-4 divide-y divide-line border-y border-line">
        <Toggle on={filters.onlineOnly} label="Live only" hint="Men who show that they’re around." onChange={(onlineOnly) => patch({ onlineOnly })} />
        <Toggle
          on={filters.verifiedOnly}
          label="Verified only"
          hint="A check that the profile belongs to an adult. Not a character reference."
          onChange={(verifiedOnly) => patch({ verifiedOnly })}
        />
        <Toggle
          on={filters.favouritesOnly}
          label="Favourites"
          hint="Only people you’ve saved."
          onChange={(favouritesOnly) => patch({ favouritesOnly })}
        />
      </div>
      <p className="mt-5 text-sm font-semibold">Intent</p>
      <p className="text-sm text-muted">Matches any you pick.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {LOOKING.map((item) => (
          <Chip
            key={item.id}
            on={filters.lookingFor.includes(item.id)}
            onClick={() =>
              patch({
                lookingFor: filters.lookingFor.includes(item.id)
                  ? filters.lookingFor.filter((id) => id !== item.id)
                  : [...filters.lookingFor, item.id],
              })
            }
          >
            {item.label}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold">Interests</p>
      <p className="text-sm text-muted">Matches all you pick.</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TAGS.map((tag) => (
          <Chip
            key={tag}
            on={filters.tags.includes(tag)}
            onClick={() =>
              patch({
                tags: filters.tags.includes(tag) ? filters.tags.filter((item) => item !== tag) : [...filters.tags, tag],
              })
            }
          >
            {tag}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold">Order</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(
          [
            ["smart", "Smart"],
            ["near", "Nearest"],
            ["active", "Live first"],
          ] as const
        ).map(([id, label]) => (
          <Chip key={id} on={filters.sort === id} onClick={() => patch({ sort: id })}>
            {label}
          </Chip>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold">Layout</p>
      <div className="mt-2 flex gap-2">
        <Chip on={density === "cozy"} onClick={() => setDensity("cozy")}>
          Cozy
        </Chip>
        <Chip on={density === "dense"} onClick={() => setDensity("dense")}>
          Dense
        </Chip>
      </div>
      <form
        className="mt-6 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          if (!name.trim()) return;
          saveFilter(name);
          setName("");
        }}
      >
        <label className="min-w-0 flex-1">
          <span className="sr-only">Name this filter set</span>
          <input className="field" maxLength={24} value={name} placeholder="Name this set" onChange={(event) => setName(event.target.value)} />
        </label>
        <Button type="submit" variant="ghost" disabled={!name.trim()}>
          Save
        </Button>
      </form>
      {saved.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {saved.map((item) => (
            <li key={item.id} className="flex items-center gap-2">
              <button type="button" className="press min-h-11 flex-1 rounded-2xl bg-raised px-3 text-left text-sm font-semibold" onClick={() => applySaved(item.id)}>
                {item.name}
              </button>
              <button type="button" className="press min-h-11 px-2 text-sm text-muted" onClick={() => deleteSaved(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <Button className="mt-6 w-full" variant="ghost" onClick={resetFilters}>
        Reset filters
      </Button>
    </Sheet>
  );
}
