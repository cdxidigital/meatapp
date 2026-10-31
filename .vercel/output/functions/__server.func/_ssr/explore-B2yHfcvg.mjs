import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { C as cn, E as kmBetween, M as useGrid, S as bandText, l as NoticesButton, o as Frame, t as AREAS, u as PEOPLE, x as areaById } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/explore-B2yHfcvg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ExplorePage() {
	const browseId = useGrid((s) => s.browseAreaId);
	const homeId = useGrid((s) => s.me.areaId);
	const soft = useGrid((s) => s.me.softDistance);
	const setBrowse = useGrid((s) => s.setBrowse);
	const [selected, setSelected] = (0, import_react.useState)(browseId);
	const navigate = useNavigate();
	const area = areaById(selected);
	const home = areaById(homeId);
	const km = kmBetween(home, area);
	const locals = PEOPLE.filter((person) => person.areaId === area.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "safe-top px-3 pb-2 pt-4 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold",
				children: "Explore"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted",
				children: "Pick a suburb to browse. The map moves your view, not your location, and it never plots another person."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesButton, {})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-4 px-3 pb-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square overflow-hidden rounded-card border border-line bg-surface",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 100",
					className: "absolute inset-0 h-full w-full",
					"aria-hidden": "true",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M10 6 C 20 18, 12 36, 14 52 C 16 68, 12 82, 20 96",
						fill: "none",
						stroke: "var(--color-line)",
						strokeWidth: "1.4"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M98 38 C 74 40, 62 50, 50 56 C 36 64, 30 78, 16 88",
						fill: "none",
						stroke: "var(--color-ember)",
						strokeWidth: "1.3",
						opacity: "0.85"
					})]
				}),
				AREAS.map((item) => {
					const active = item.id === selected;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press absolute grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center",
						style: {
							left: `${item.x}%`,
							top: `${item.y}%`
						},
						"aria-pressed": active,
						"aria-label": item.name,
						onClick: () => setSelected(item.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block rounded-full", active ? "size-4 bg-ember" : "size-2.5 bg-fg") })
					}, item.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute bottom-3 left-3 rounded-full bg-bg/80 px-3 py-1 font-mono text-xs uppercase tracking-wide",
					children: "Swan river · schematic"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-card border border-line bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs uppercase tracking-wide text-ember",
					children: area.id === homeId ? "Home area" : "Browse target"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl font-extrabold",
					children: area.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: area.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm",
					children: area.id === homeId ? "This is the area you called home." : `${bandText(km, true, soft)} from your home area.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: locals.length === 0 ? "Nobody lists this as home. You can still browse from here." : `${locals.length === 1 ? "1 man lists" : `${locals.length} men list`} this as home. Their exact spots stay hidden.`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "press mt-5 min-h-11 w-full rounded-2xl bg-ember px-4 text-sm font-semibold text-ember-ink",
					onClick: () => {
						setBrowse(area.id);
						navigate({ to: "/" });
					},
					children: ["Browse from ", area.name]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-line border-t border-line",
					children: AREAS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "press flex min-h-11 w-full items-center justify-between gap-3 py-2 text-left",
						"aria-pressed": item.id === selected,
						onClick: () => setSelected(item.id),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: item.note
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-faint",
							children: PEOPLE.filter((person) => person.areaId === item.id).length
						})]
					}) }, item.id))
				})
			]
		})]
	})] });
}
//#endregion
export { ExplorePage as component };
