import { Link } from "@tanstack/react-router";
import { MODES, modeLabel, type MeatMode } from "@/lib/grid/upgrade";
import { useGrid } from "@/lib/grid/store";

const LINKS = [
  { to: "/match", label: "Match" },
  { to: "/radar", label: "Radar" },
  { to: "/now", label: "Right now" },
  { to: "/scene", label: "Scene" },
] as const;

export function ModuleLinks() {
  return (
    <div className="strip mb-3">
      {LINKS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="press inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-raised px-3 text-sm font-semibold"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export function ModeStrip() {
  const mode = useGrid((s) => s.mode);
  const setMode = useGrid((s) => s.setMode);
  return (
    <div className="strip mb-3" role="group" aria-label="Mode">
      {MODES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={mode === item.id}
          className={
            mode === item.id
              ? "press inline-flex min-h-11 shrink-0 items-center rounded-full bg-ember px-3 text-sm font-semibold text-ember-ink"
              : "press inline-flex min-h-11 shrink-0 items-center rounded-full border border-line bg-raised px-3 text-sm"
          }
          onClick={() => setMode(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function modeHint(mode: MeatMode) {
  return MODES.find((item) => item.id === mode)?.hint ?? modeLabel(mode);
}
