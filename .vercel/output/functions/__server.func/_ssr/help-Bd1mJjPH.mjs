import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as NoticesButton, o as Frame } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/help-Bd1mJjPH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		title: "The list",
		body: "Nearby is men in range, ordered with a short reason. You see a band such as Nearby or Across town. Never a pin."
	},
	{
		title: "Filters",
		body: "Search, filters, and Why this order change who is in the list. Saving a filter keeps that set on this device."
	},
	{
		title: "A wave, then a chat",
		body: "Wave first. If you both want a conversation, open the thread. A sealed note expires. A voice note plays in this session and is not uploaded."
	},
	{
		title: "Explore and plans",
		body: "Explore is areas, not a live map of people. A plan names a public place. Check in from the plan when you leave."
	},
	{
		title: "You",
		body: "Your photo and profile stay in this browser. Hide your live mark, hide distance, or turn on incognito so you are not listed."
	},
	{
		title: "Safety",
		body: "Block, report, and hide are in the Safety centre. They are never behind a paywall. Reports stay on this device."
	}
];
var TOPICS = [
	{
		q: "Where is my information?",
		a: "In this browser. Photos, chats, waves, and your profile are not uploaded. Clearing site data erases them."
	},
	{
		q: "Why can’t I see how many metres away someone is?",
		a: "Distance is a band on purpose. Exact location is not a feature."
	},
	{
		q: "How do I install it?",
		a: "There is no store file. Add this site to your home screen. The info page has the steps for iPhone, Android, and a computer."
	},
	{
		q: "Who is this for?",
		a: "Men seeking men, 18 and over. A birth year is the check."
	}
];
function HelpPage() {
	const [step, setStep] = (0, import_react.useState)(0);
	const current = STEPS[step];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "safe-top flex items-center justify-between px-3 pt-4 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex w-full max-w-xl items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/you",
				className: "text-sm font-semibold text-muted",
				children: "You"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold",
				children: "Help"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesButton, {})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl space-y-8 px-3 py-4 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "Tutorial"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs uppercase tracking-wide text-muted",
					children: [
						step + 1,
						" of ",
						STEPS.length
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1 overflow-hidden rounded-full bg-line",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-ember",
					style: { width: `${(step + 1) / STEPS.length * 100}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-4 rounded-card border border-line bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl font-bold",
					children: current.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: current.body
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press min-h-11 flex-1 rounded-2xl border border-line bg-raised text-sm font-semibold disabled:opacity-40",
					disabled: step === 0,
					onClick: () => setStep((value) => Math.max(0, value - 1)),
					children: "Back"
				}), step === STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "press inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-ember text-sm font-semibold text-ember-ink",
					children: "Open nearby"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "press min-h-11 flex-1 rounded-2xl bg-ember text-sm font-semibold text-ember-ink",
					onClick: () => setStep((value) => value + 1),
					children: "Next"
				})]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-bold",
				children: "Questions"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 divide-y divide-line border-y border-line",
				children: TOPICS.map((topic) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: topic.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: topic.a
					})]
				}, topic.q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/info",
				className: "press mt-4 flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
				children: ["Install and product info", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "→"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/safety",
				className: "press mt-2 flex min-h-11 items-center justify-between rounded-2xl border border-line bg-raised px-4 text-sm font-semibold",
				children: ["Safety centre", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: "→"
				})]
			})
		] })]
	})] });
}
//#endregion
export { HelpPage as component };
