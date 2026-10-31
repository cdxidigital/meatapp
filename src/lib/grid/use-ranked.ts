import { useEffect, useMemo, useState } from "react";
import { rankPeople } from "@/lib/grid/model";
import { useGrid } from "@/lib/grid/store";
import { fitsMode } from "@/lib/grid/upgrade";

export function useNow() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function useRanked() {
  const filters = useGrid((s) => s.filters);
  const browseAreaId = useGrid((s) => s.browseAreaId);
  const me = useGrid((s) => s.me);
  const hidden = useGrid((s) => s.hidden);
  const blocked = useGrid((s) => s.blocked);
  const favourites = useGrid((s) => s.favourites);
  const mode = useGrid((s) => s.mode);
  const now = useNow();
  return useMemo(
    () => rankPeople({ filters, browseAreaId, me, hidden, blocked, favourites, now }).filter((row) => fitsMode(row.person, mode)),
    [filters, browseAreaId, me, hidden, blocked, favourites, now, mode],
  );
}
