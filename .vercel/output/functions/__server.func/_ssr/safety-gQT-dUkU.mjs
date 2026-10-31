import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as shortTime, M as useGrid, h as Sheet, o as Frame, r as Button, w as getPerson } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safety-gQT-dUkU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SafetyPage() {
	const blocked = useGrid((s) => s.blocked);
	const hidden = useGrid((s) => s.hidden);
	const muted = useGrid((s) => s.muted);
	const reports = useGrid((s) => s.reports);
	const log = useGrid((s) => s.log);
	const trusted = useGrid((s) => s.trusted);
	const unblock = useGrid((s) => s.unblock);
	const unhide = useGrid((s) => s.unhide);
	const unmute = useGrid((s) => s.unmute);
	const setTrusted = useGrid((s) => s.setTrusted);
	const erase = useGrid((s) => s.erase);
	const [confirm, setConfirm] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "safe-top px-3 pt-4 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/you",
						className: "text-sm font-semibold text-ember",
						children: "Back to you"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-3xl font-extrabold",
						children: "Safety centre"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "Block, report, hide, and erase stay free. None of this is sold back to you."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-xl space-y-8 px-3 py-5 lg:px-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Blocked",
					empty: "No one is blocked.",
					children: blocked.map((id) => {
						const person = getPerson(id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: person?.name ?? "Profile",
							action: "Unblock",
							onAction: () => unblock(id)
						}, id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Hidden",
					empty: "Your grid isn’t hiding anyone.",
					children: hidden.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: getPerson(id)?.name ?? "Profile",
						action: "Unhide",
						onAction: () => unhide(id)
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
					title: "Muted",
					empty: "No muted chats.",
					children: muted.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: getPerson(id)?.name ?? "Profile",
						action: "Unmute",
						onAction: () => unmute(id)
					}, id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold",
					children: "Reports"
				}), reports.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "No reports filed on this device."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: reports.map((report) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-raised px-3 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: getPerson(report.personId)?.name ?? "Profile"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: report.reason
							}),
							report.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: report.note
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-mono text-xs text-faint",
								children: shortTime(report.at)
							})
						]
					}, report.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-sm font-semibold",
							children: "Trusted contact"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-2 block text-sm text-muted",
							children: "A name for copied check-in notes. MEAT does not message them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							maxLength: 40,
							value: trusted,
							onChange: (event) => setTrusted(event.target.value)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: "On this device"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "This browser only. Another phone does not see this log."
					}),
					log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "No safety events yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2",
						children: log.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0 font-mono text-xs text-faint",
								children: shortTime(item.at)
							})]
						}, item.id))
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					className: "w-full",
					onClick: () => setConfirm(true),
					children: "Erase MEAT on this device"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			open: confirm,
			onOpenChange: setConfirm,
			title: "Erase this device?",
			description: "Chats, your profile, filters, and the safety log on this phone will be removed.",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				onClick: () => {
					erase();
					setConfirm(false);
				},
				children: "Erase"
			})
		})
	] });
}
function Section({ title, empty, children }) {
	const filled = (Array.isArray(children) ? children : children ? [children] : []).some(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-sm font-semibold",
		children: title
	}), filled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-2 divide-y divide-line",
		children
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-sm text-muted",
		children: empty
	})] });
}
function Row({ label, action, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-center justify-between gap-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "press min-h-11 text-sm font-semibold text-ember",
			onClick: onAction,
			children: action
		})]
	});
}
//#endregion
export { SafetyPage as component };
