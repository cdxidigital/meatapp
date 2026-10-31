import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { A as shortTime, M as useGrid, f as Portrait, l as NoticesButton, o as Frame, u as PEOPLE, w as getPerson } from "./ui-DkqkjVF3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inbox-DDfxMjsG.js
var import_jsx_runtime = require_jsx_runtime();
function InboxPage() {
	const threads = useGrid((s) => s.threads);
	const readAt = useGrid((s) => s.readAt);
	const blocked = useGrid((s) => s.blocked);
	const muted = useGrid((s) => s.muted);
	const rows = Object.entries(threads).map(([id, msgs]) => ({
		id,
		last: msgs[msgs.length - 1]
	})).filter((row) => row.last && !blocked.includes(row.id)).sort((a, b) => (b.last?.at ?? 0) - (a.last?.at ?? 0));
	const suggestions = PEOPLE.filter((person) => person.repliesFast && !blocked.includes(person.id)).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "safe-top px-3 pt-4 lg:px-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-xl items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-extrabold",
				children: "Inbox"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Messages stay on this device."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticesButton, {})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-3 py-4 lg:px-8",
		children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-card border border-line bg-surface px-4 py-6 text-sm text-muted",
				children: "No messages yet. Wave from a profile, or open someone who usually replies."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-sm font-semibold",
				children: "Often replies"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-line",
				children: suggestions.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/p/$id",
					params: { id: person.id },
					className: "flex min-h-16 items-center gap-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative size-12 overflow-hidden rounded-2xl bg-raised",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
							id: person.id,
							name: person.name,
							size: "sm"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-semibold",
						children: person.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: person.availability
					})] })]
				}) }, person.id))
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-line",
			children: rows.map((row) => {
				const person = getPerson(row.id);
				if (!person || !row.last) return null;
				const unread = row.last.from === "them" && row.last.at > (readAt[row.id] ?? 0) && !muted.includes(row.id);
				const preview = row.last.seal === "expired" ? "Note expired" : row.last.seal ? "Sealed note" : row.last.voice ? "Voice note" : row.last.text;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/c/$id",
					params: { id: row.id },
					className: "flex min-h-16 items-center gap-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "relative size-12 shrink-0 overflow-hidden rounded-2xl bg-raised",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, {
								id: person.id,
								name: person.name,
								size: "sm"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate font-semibold",
										children: person.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 font-mono text-xs text-faint",
										children: shortTime(row.last.at)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cnText(unread),
									children: row.last.from === "me" ? `You: ${preview}` : preview
								}),
								muted.includes(row.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 block text-xs text-faint",
									children: "Muted"
								}) : null
							]
						}),
						unread ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2 shrink-0 rounded-full bg-ember",
							"aria-label": "Unread"
						}) : null
					]
				}) }, row.id);
			})
		})
	})] });
}
function cnText(unread) {
	return unread ? "block truncate text-sm text-fg" : "block truncate text-sm text-muted";
}
//#endregion
export { InboxPage as component };
