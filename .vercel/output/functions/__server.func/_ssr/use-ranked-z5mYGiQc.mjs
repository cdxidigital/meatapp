import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { M as useGrid, k as rankPeople } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-ranked-z5mYGiQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useNow() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(Date.now());
		const id = window.setInterval(() => setNow(Date.now()), 3e4);
		return () => window.clearInterval(id);
	}, []);
	return now;
}
function useRanked() {
	const filters = useGrid((s) => s.filters);
	const browseAreaId = useGrid((s) => s.browseAreaId);
	const me = useGrid((s) => s.me);
	const hidden = useGrid((s) => s.hidden);
	const blocked = useGrid((s) => s.blocked);
	const favourites = useGrid((s) => s.favourites);
	const now = useNow();
	return (0, import_react.useMemo)(() => rankPeople({
		filters,
		browseAreaId,
		me,
		hidden,
		blocked,
		favourites,
		now
	}), [
		filters,
		browseAreaId,
		me,
		hidden,
		blocked,
		favourites,
		now
	]);
}
//#endregion
export { useRanked as n, useNow as t };
