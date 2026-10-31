import { i as __toESM } from "./_runtime.mjs";
import { n as require_react } from "./_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "./_libs/radix-ui__react-context+react.mjs";
import { M as useGrid, N as windowTarget, o as Frame, r as Button, v as VENUES, w as getPerson } from "./_ssr/ui-DkqkjVF3.mjs";
import { n as Route } from "./_ssr/router-CCdndJ4K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CjfyrKPz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlanPage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
		immersive: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanView, { id })
	});
}
function PlanView({ id }) {
	const person = getPerson(id);
	const meetup = useGrid((s) => s.meetups[id]);
	const trusted = useGrid((s) => s.trusted);
	const meArea = useGrid((s) => s.me.areaId);
	const setTrusted = useGrid((s) => s.setTrusted);
	const startMeetup = useGrid((s) => s.startMeetup);
	const checkMeetup = useGrid((s) => s.checkMeetup);
	const clearMeetup = useGrid((s) => s.clearMeetup);
	const pushToast = useGrid((s) => s.pushToast);
	const [venueId, setVenueId] = (0, import_react.useState)(VENUES[0].id);
	const [kind, setKind] = (0, import_react.useState)("hour");
	const [note, setNote] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(timer);
	}, []);
	if (!person) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "font-semibold text-ember",
			children: "Back"
		})
	});
	const venue = VENUES.find((item) => item.id === (meetup?.venueId ?? venueId));
	const active = meetup && !meetup.closed;
	async function copyExit() {
		if (!meetup) return;
		const place = VENUES.find((item) => item.id === meetup.venueId)?.name ?? "a public place";
		const body = `Check-in from MEAT: I am leaving a plan with ${person?.name.split(" ")[0]} at ${place} (${meetup.windowLabel}). I am heading out now.${trusted ? ` Please look for a message to ${trusted}.` : ""}`;
		try {
			await navigator.clipboard.writeText(body);
			pushToast("Check-in note copied");
		} catch {
			pushToast("Couldn’t copy. The note is in your safety log.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "safe-top mx-auto min-h-dvh max-w-lg px-4 pb-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/p/$id",
				params: { id },
				className: "press inline-flex min-h-11 items-center text-sm font-semibold",
				children: "Back"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-mono text-xs uppercase tracking-wide text-ember",
				children: "Meetup"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-4xl font-extrabold",
				children: ["A public plan with ", person.name.split(" ")[0]]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "No home addresses. Check-ins stay on this device. Leaving is the biggest button, on purpose."
			}),
			active && meetup ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: venue?.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: venue?.detail
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 font-mono text-5xl font-medium tabular-nums",
						children: formatLeft(meetup.target - now)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: meetup.target <= now ? "The window is open." : meetup.windowLabel
					}),
					meetup.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm",
						children: meetup.note
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							onClick: () => void (checkMeetup(id, "leave"), copyExit()),
							children: "I need to leave"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => checkMeetup(id, "here"),
								children: "I’m here"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => checkMeetup(id, "safe"),
								children: "I’m safe"
							})]
						})]
					}),
					meetup.checks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1 text-sm text-muted",
						children: meetup.checks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							check.kind === "here" ? "Here" : check.kind === "safe" ? "Safe" : "Left",
							" · ",
							new Date(check.at).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit"
							})
						] }, check.at))
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-4",
				onSubmit: (event) => {
					event.preventDefault();
					const target = windowTarget(kind);
					startMeetup(id, {
						venueId,
						windowLabel: target.label,
						target: target.target,
						note: note.trim()
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-semibold",
						children: "Public place"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 space-y-2",
						children: VENUES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex min-h-11 items-start gap-3 rounded-2xl border border-line bg-raised px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "mt-1",
								type: "radio",
								name: "venue",
								checked: venueId === item.id,
								onChange: () => setVenueId(item.id)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "block text-xs text-muted",
								children: [
									item.detail,
									item.areaId === person.areaId ? " · Near them" : "",
									item.areaId === meArea ? " · Near your home area" : ""
								]
							})] })]
						}, item.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm font-semibold",
						children: "Window"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							["hour", "In an hour"],
							["evening", "Evening, 7pm"],
							["tomorrow", "Tomorrow afternoon"]
						].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": kind === value,
							className: kind === value ? "press min-h-11 rounded-full bg-ember px-3 text-sm font-semibold text-ember-ink" : "press min-h-11 rounded-full border border-line px-3 text-sm",
							onClick: () => setKind(value),
							children: label
						}, value))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-sm text-muted",
							children: "Note for yourself"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "field min-h-20 resize-none",
							maxLength: 200,
							value: note,
							onChange: (event) => setNote(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mb-1 block text-sm text-muted",
							children: "Trusted contact name, optional"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							maxLength: 40,
							value: trusted,
							placeholder: "Who should a copied note mention?",
							onChange: (event) => setTrusted(event.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Start plan"
					})
				]
			}),
			meetup?.closed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 rounded-card border border-line bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-bold",
						children: "Exit logged"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Copy the note if you want someone to have it. MEAT does not text anyone."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press mt-3 min-h-11 font-semibold text-ember",
						onClick: () => void copyExit(),
						children: "Copy check-in note"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "press mt-2 block min-h-11 text-sm text-muted",
						onClick: () => clearMeetup(id),
						children: "Plan another"
					})
				]
			}) : null
		]
	});
}
function formatLeft(ms) {
	if (ms <= 0) return "00:00:00";
	const total = Math.floor(ms / 1e3);
	return [
		Math.floor(total / 3600),
		Math.floor(total % 3600 / 60),
		total % 60
	].map((part) => String(part).padStart(2, "0")).join(":");
}
//#endregion
export { PlanPage as component };
